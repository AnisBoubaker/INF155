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
#define CAPACITE_LIGNE 256
char ligne[CAPACITE_LIGNE];

while (fgets(ligne, CAPACITE_LIGNE, fichier) != NULL) {
	printf("%s", ligne);
}

if (ferror(fichier)) {
	printf("Erreur lors de la lecture du fichier.\n");
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

## Lecture d'une ligne formatée avec <code>fscanf</code>

```c
int identifiant;
double note;
char nom[100];
if (fscanf(fichier, "%d,%lf,%99[^,\r\n]", &identifiant, &note, nom) == 3) {
	/* trois conversions réussies */
}
```

Le format `%[^,]` permet de lire une chaine de caractère jusqu'à la virgule (`,`). `%99[^,\r\n]` lit jusqu’à 99 caractères, jusqu’à une virgule ou une fin de ligne, sans consommer ce séparateur. La limite laisse une place pour le caractère terminal '\0' dans `nom`.

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

Pour un tableau de <code>int</code> :

```c
int lus = (int)fread(tableau, sizeof(int), nombre, fichier);
int ecrits = (int)fwrite(tableau, sizeof(int), nombre, fichier);
```

Les fonctions retournent un nombre d’éléments complets, pas un nombre d’octets.

<p class="warning small">Écrire directement une structure copie aussi son remplissage et sa représentation machine; ce n’est pas un format portable à long terme.</p>

---

<!-- .slide: class="compact" -->

## Patron complet de lecture

```c
#define CAPACITE_LIGNE 256

FILE *f = fopen("notes.txt", "r");
if (f == NULL) {
	printf("Impossible d'ouvrir notes.txt.\n");
	return EXIT_FAILURE;
}

char ligne[CAPACITE_LIGNE];
while (fgets(ligne, CAPACITE_LIGNE, f) != NULL) {
	/* analyser ligne */
}

int statut = ferror(f) ? EXIT_FAILURE : EXIT_SUCCESS;
if (fclose(f) == EOF) {
	statut = EXIT_FAILURE;
}
return statut;
```
