<!-- .slide: class="chapter" -->

<p class="section-kicker">02 · Acquérir un flux</p>

# Ouvrir et fermer un fichier

<p class="lede">Toute opération commence par <code>fopen</code> et se termine par <code>fclose</code>.</p>

---

## Le type <code>FILE *</code>

```c
#include <stdio.h>

FILE *fichier = fopen("notes.txt", "r");
```

<code>FILE *</code> référence l’état interne du flux : tampon, position, indicateurs de fin et d’erreur. Le nom <code>FILE</code> est imposé par <code>stdio.h</code>.

Nous utilisons déjà trois flux standards : <code>stdin</code>, <code>stdout</code> et <code>stderr</code>.

---

## Vérifier l’ouverture

```c
FILE *fichier = fopen("notes.txt", "r");

if (fichier == NULL) {
	printf("Impossible d'ouvrir notes.txt.\n");
	return EXIT_FAILURE;
}
```

L’ouverture peut échouer : fichier absent, chemin invalide, permissions insuffisantes ou ressources épuisées.

---

## Chemin relatif ou absolu

- un chemin absolu part d’une racine du système;
- un chemin relatif est interprété depuis le répertoire de travail courant du processus;
- le répertoire de travail n’est pas nécessairement celui du code source ou de l’exécutable.

```text
donnees/notes.txt
../config/options.txt
```

<p class="callout small">Documenter où le programme s’attend à trouver ses fichiers.</p>

---

## Modes d’ouverture texte

| Mode            | Lecture               | Écriture             | Effet à l’ouverture                                |
| --------------- | --------------------- | --------------------- | ---------------------------------------------------- |
| <code>r</code>  | oui, position choisie | non                   | doit exister, contenu conservé                      |
| <code>w</code>  | non                   | oui, position choisie | crée le fichier ou le vide s’il existe             |
| <code>a</code>  | non                   | fin seulement         | crée le fichier ou conserve son contenu s'il existe |
| <code>r+</code> | oui, position choisie | oui, position choisie | doit exister, contenu conservé                      |
| <code>w+</code> | oui, position choisie | oui, position choisie | crée le fichier ou le vide s’il existe             |
| <code>a+</code> | oui, position choisie | fin seulement         | crée le fichier ou conserve son contenu s'il existe |

<p class="small"><strong>Position :</strong> lecture et écriture partagent une position courante qui avance après chaque opération. <code>rewind</code> revient au début et <code>fseek</code> change de position. En <code>a</code>/<code>a+</code>, toute écriture reste à la fin, même après un déplacement.</p>

<p class="small"><strong>Écrire au milieu :</strong> remplace le contenu à cet endroit, sans insérer ni décaler la suite.</p>

<p class="small"><strong>Modes <code>+</code> :</strong> intercaler un repositionnement (<code>fseek</code> ou <code>rewind</code>) entre lecture et écriture. Après une écriture, <code>fflush</code> suffit aussi avant de lire.</p>

<p class="tiny">En mode texte, <code>fseek</code> accepte un déplacement nul, ou une position obtenue par <code>ftell</code> avec <code>SEEK_SET</code>.</p>

<aside class="notes">
<p>Les accès ont lieu à la position courante. « Position choisie » suppose un fichier qui permet le repositionnement et un appel valide qui réussit. Les modes r, r+, w et w+ commencent au début. Avec w et w+, le fichier est vide dès l’ouverture. w+ permet de relire ce que le programme y écrit ensuite.</p>
<p>En a+, utiliser rewind avant de lire depuis le début, car la position initiale de lecture dépend de l’implémentation. Les écritures en a et a+ vont toujours à la fin, indépendamment de la position choisie pour lire.</p>
<p>Pour les modes +, une lecture doit être suivie d’un repositionnement avant une écriture, sauf si la lecture a rencontré la fin du fichier. Une écriture doit être suivie de fflush ou d’un repositionnement avant une lecture. fflush seul après une lecture ne remplace pas le repositionnement en C portable.</p>
<p>L’écriture au milieu remplace les données, sans insertion. Sur les systèmes usuels, la suite reste en place. En C portable, une écriture dans un flux texte peut aussi tronquer la suite selon l’implémentation.</p>
<p>Références : <a href="https://sourceware.org/glibc/manual/latest/html_node/Opening-Streams.html">GNU C Library, Opening Streams</a> et <a href="https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf">C11, N1570, sections 7.21.3, 7.21.5.3 et 7.21.9.2</a>.</p>
</aside>

---

## Mode binaire

Ajouter <code>b</code> au mode :

```c
fopen("image.bin", "rb");
fopen("resultat.bin", "wb");
fopen("journal.bin", "ab");
```

Sur certains systèmes, texte et binaire sont identiques; sur d’autres, le mode texte transforme certaines séquences, notamment les fins de ligne.

---

## Fermer le flux

```c
if (fclose(fichier) == EOF) {
	printf("Erreur lors de la fermeture du fichier.\n");
	return EXIT_FAILURE;
}
```

La fermeture vide les tampons et libère les ressources du flux. Une erreur d’écriture peut n’apparaître qu’à ce moment.

<p class="warning">Après <code>fclose</code>, le pointeur <code>FILE *</code> ne doit plus être utilisé.</p>
