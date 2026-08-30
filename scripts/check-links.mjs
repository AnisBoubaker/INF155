import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checkedExtensions = new Set([".html", ".md", ".css"]);
const ignoredDirectories = new Set([".git"]);
const broken = [];
let slideCount = 0;

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignoredDirectories.has(entry.name)) return [];
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

function isLocalReference(reference) {
  return reference
    && !reference.startsWith("#")
    && !reference.startsWith("//")
    && !/^[a-z][a-z0-9+.-]*:/i.test(reference)
    && !reference.includes("${{");
}

function normalizeReference(reference) {
  return decodeURIComponent(reference.split("#")[0].split("?")[0]);
}

function existsFrom(sourceFile, reference) {
  const clean = normalizeReference(reference);
  // Reveal insère le Markdown externe dans la page du cours : les URL du
  // contenu sont donc résolues depuis le dossier qui contient index.html.
  const sourceDirectory = path.extname(sourceFile) === ".md"
    && path.basename(path.dirname(sourceFile)) === "slides"
    ? path.dirname(path.dirname(sourceFile))
    : path.dirname(sourceFile);
  const target = path.resolve(sourceDirectory, clean);
  if (fs.existsSync(target) && fs.statSync(target).isFile()) return true;
  return fs.existsSync(path.join(target, "index.html"));
}

for (const file of walk(root)) {
  if (!checkedExtensions.has(path.extname(file))) continue;

  const text = fs.readFileSync(file, "utf8");
  const references = [];

  for (const match of text.matchAll(/(?:href|src|data-markdown)=["']([^"']+)["']/gi)) {
    references.push(match[1]);
  }
  for (const match of text.matchAll(/!\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g)) {
    references.push(match[1]);
  }
  for (const match of text.matchAll(/url\(["']?([^)'"\s]+)["']?\)/gi)) {
    references.push(match[1]);
  }

  if (path.extname(file) === ".md" && file.includes(`${path.sep}slides${path.sep}`)) {
    slideCount += 1 + (text.match(/^---$/gm) || []).length;
  }

  for (const reference of references.filter(isLocalReference)) {
    if (!existsFrom(file, reference)) {
      broken.push(`${path.relative(root, file)} -> ${reference}`);
    }
  }
}

if (broken.length) {
  console.error("Références locales introuvables :");
  broken.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}

console.log(`Validation réussie : ${slideCount} diapositives Markdown, aucun lien local brisé.`);
