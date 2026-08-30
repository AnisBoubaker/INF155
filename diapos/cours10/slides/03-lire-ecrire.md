<!-- .slide: class="chapter" -->

<p class="section-kicker">03 · Transférer les données</p>

# Lire et écrire

<p class="lede">Choisir une fonction adaptée à l’unité logique : caractère, ligne, format ou bloc.</p>

---

## Lire un caractère avec <code>fgetc</code>

```c
int caractere;

while ((caractere = fgetc(fichier)) != EOF) {
    putchar(caractere);
}
```

La variable est un <code>int</code>, car elle doit représenter toutes les valeurs de <code>unsigned char</code> ainsi que <code>EOF</code>.

Après la boucle, utiliser <code>ferror</code> pour distinguer erreur et fin normale.

---

## Lire une ligne avec <code>fgets</code>

```c
char ligne[256];

while (fgets(ligne, sizeof ligne, fichier) != NULL) {
    fputs(ligne, stdout);
}

if (ferror(fichier)) {
    perror("lecture");
}
```

<code>fgets</code> conserve la fin de ligne si elle tient dans le tampon.

---

## Lire un format avec <code>fscanf</code>

```c
int identifiant;
double note;

if (fscanf(fichier, "%d %lf", &identifiant, &note) == 2) {
    /* deux conversions réussies */
}
```

Toujours vérifier le nombre de conversions réussies. Une entrée mal formée reste souvent dans le flux.

---

## Écrire du texte

```c
fputc('A', fichier);
fputs("Bonjour\n", fichier);
fprintf(fichier, "%s,%d\n", nom, note);
```

- <code>fputc</code> écrit un caractère;
- <code>fputs</code> écrit une chaîne sans ajouter de fin de ligne;
- <code>fprintf</code> produit une représentation formatée.

Vérifier les valeurs de retour lorsque la perte de données est importante.

---

## Lire et écrire des blocs binaires

```c
size_t lus = fread(tableau, sizeof tableau[0], nombre, fichier);
size_t ecrits = fwrite(tableau, sizeof tableau[0], nombre, fichier);
```

Les fonctions retournent un nombre d’éléments complets, pas un nombre d’octets.

<p class="warning small">Écrire directement une structure copie aussi son remplissage et sa représentation machine; ce n’est pas un format portable à long terme.</p>

---

## Patron complet de lecture

```c
FILE *f = fopen("notes.txt", "r");
if (f == NULL) {
    perror("notes.txt");
    return EXIT_FAILURE;
}

char ligne[256];
while (fgets(ligne, sizeof ligne, f) != NULL) {
    /* analyser ligne */
}

int statut = ferror(f) ? EXIT_FAILURE : EXIT_SUCCESS;
if (fclose(f) == EOF) {
    statut = EXIT_FAILURE;
}
return statut;
```
