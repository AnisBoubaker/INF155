<!-- .slide: class="chapter" -->

<p class="section-kicker">04 · Cas d’utilisation</p>

# Collections dynamiques

<p class="lede">Tableaux, chaînes et matrices dont la taille naît à l’exécution.</p>

---

## Tableau dynamique 1D

```c
int nombre;
if (scanf("%d", &nombre) != 1 || nombre <= 0) {
    return EXIT_FAILURE;
}

double *mesures = malloc(nombre * (int)sizeof *mesures);
if (mesures == NULL) {
    return EXIT_FAILURE;
}

/* utiliser mesures[0] à mesures[nombre - 1] */
free(mesures);
```

---

## Chaîne dynamique

```c
const char *source = "Allô le monde!";
int taille = (int)strlen(source) + 1;

char *copie = malloc(taille);
if (copie != NULL) {
    memcpy(copie, source, taille);
}
```

La taille comprend le zéro terminal. Le propriétaire de <code>copie</code> devra appeler <code>free</code>.

---

## Matrice dynamique contiguë

```c
double *matrice = malloc(lignes * colonnes * (int)sizeof *matrice);

if (matrice != NULL) {
    matrice[ligne * colonnes + colonne] = 3.5;
}
```

Avantages : une seule allocation, une seule libération et bonne localité mémoire.

---

## Matrice comme tableau de pointeurs

```c
double **m = malloc(lignes * (int)sizeof *m);

for (int i = 0; i < lignes; ++i) {
    m[i] = malloc(colonnes * (int)sizeof *m[i]);
}
```

Cette représentation permet des lignes de tailles différentes, mais exige de gérer les échecs partiels et de libérer chaque ligne avant le tableau de pointeurs.

---

## Libérer une matrice de lignes

```c
for (int i = 0; i < lignes; ++i) {
    free(m[i]);
}
free(m);
```

Si une allocation de ligne échoue, seules les lignes déjà créées doivent être libérées.

<p class="definition"><strong>Ordre :</strong> libérer les objets contenus avant le conteneur qui mémorise leurs adresses.</p>

---

<!-- .slide: class="chapter" -->

<p class="section-kicker">À retenir</p>

# Chaque bloc a un propriétaire et une fin

<ol class="plan">
  <li>Vérifier chaque allocation.</li>
  <li>Calculer les tailles avec <code>sizeof *ptr</code>.</li>
  <li>Utiliser un temporaire avec <code>realloc</code>.</li>
  <li>Libérer exactement une fois chaque bloc acquis.</li>
</ol>
