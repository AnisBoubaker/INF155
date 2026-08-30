<!-- .slide: class="chapter" -->

<p class="section-kicker">05 · Transformer une ligne en données</p>

# Analyser un fichier texte

<p class="lede">Lire d’abord une ligne bornée, puis valider ses champs.</p>

---

## Une ligne structurée

```text
LOVA12345678;Lovelace;Ada;95
```

La ligne contient plusieurs champs séparés par <code>;</code>. Une stratégie robuste :

1. lire avec <code>fgets</code>;
2. retirer la fin de ligne;
3. séparer ou repérer les champs;
4. convertir les nombres avec validation;
5. rejeter la ligne si le schéma n’est pas respecté.

---

## Découper avec <code>strtok</code>

```c
char *code = strtok(ligne, ";");
char *nom = strtok(NULL, ";");
char *prenom = strtok(NULL, ";");
char *note = strtok(NULL, ";");
```

<code>strtok</code> modifie la chaîne en remplaçant les séparateurs par <code>'\0'</code> et conserve un état interne entre les appels.

<p class="warning small">Il ne représente pas bien les champs vides et n’est pas adapté à tous les formats, notamment CSV avec guillemets.</p>

---

## Convertir et valider un champ

```c
char *fin;
errno = 0;
long valeur = strtol(note, &fin, 10);

if (errno == ERANGE || fin == note || *fin != '\0' ||
    valeur < 0 || valeur > 100) {
    /* note invalide */
}
```

La syntaxe et le domaine métier sont vérifiés séparément.

---

## Ne pas confondre fin et erreur

Une fonction de lecture qui retourne <code>EOF</code> ou <code>NULL</code> peut signaler :

- une fin de fichier normale;
- une erreur d’entrée/sortie.

```c
if (ferror(fichier)) {
    perror("lecture");
} else if (feof(fichier)) {
    /* fin normale */
}
```

---

<!-- .slide: class="chapter" -->

<p class="section-kicker">À retenir</p>

# Un fichier fiable est un protocole, pas seulement une suite d’octets

<ol class="plan">
  <li>Vérifier ouverture, lecture, écriture et fermeture.</li>
  <li>Choisir explicitement texte ou binaire.</li>
  <li>Lire des lignes bornées avant de les analyser.</li>
  <li>Valider chaque conversion et chaque chemin.</li>
</ol>
