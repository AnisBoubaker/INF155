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

double *mesures = (double *)malloc(nombre * (int)sizeof(double));
if (mesures == NULL) {
	return EXIT_FAILURE;
}

/* utiliser mesures[0] à mesures[nombre - 1] */
mesures[0] = 25.4;
free(mesures);
```

---

## Chaîne dynamique

```c
const char *source = "Allô le monde!";
int taille = (int)strlen(source) + 1;

char *copie = (char *)malloc(taille);
if (copie != NULL) {
	memcpy(copie, source, taille);
}
```

La taille comprend le zéro terminal. Le propriétaire de <code>copie</code> devra appeler <code>free</code>.

---

## Matrice comme tableau de pointeurs

On suppose les dimensions positives et les produits des tailles déjà vérifiés.

```c
double **m = (double **)malloc(lignes * (int)sizeof(double *));
if (m == NULL) {
	return EXIT_FAILURE;
}

for (int i = 0; i < lignes; ++i) {
	m[i] = (double *)malloc(colonnes * (int)sizeof(double));
	if (m[i] == NULL) {
		for (int j = 0; j < i; ++j) {
			free(m[j]);
		}
		free(m);
		return EXIT_FAILURE;
	}
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
  <li>Calculer les tailles avec <code>sizeof(type)</code>.</li>
  <li>Écrire le cast vers le type de pointeur attendu.</li>
  <li>Utiliser un temporaire avec <code>realloc</code>.</li>
  <li>Libérer exactement une fois chaque bloc acquis.</li>
</ol>
