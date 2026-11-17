<!-- .slide: class="chapter" -->

<p class="section-kicker">02 · Réserver un bloc</p>

# <code>malloc</code> et <code>calloc</code>

<p class="lede">Deux fonctions de <code>stdlib.h</code> qui retournent une adresse ou <code>NULL</code>.</p>

---

## <code>void *</code> · pointeur générique

```c
#include <stdlib.h>

int nombre_octets = 64;
int nombre_elements = 10;
int octets_par_element = (int)sizeof(int);

void *bloc = malloc(nombre_octets);
void *bloc_initialise = calloc(nombre_elements, octets_par_element);
```

Ces fonctions retournent un <code>void *</code>. Le cast <code>(int *)</code> convertit cette adresse en pointeur vers <code>int</code>.

```c
int *entier = (int *)malloc(sizeof(int));
```

<p class="callout small">Dans ce cours, utiliser un cast explicite vers le type de pointeur attendu. Inclure <code>&lt;stdlib.h&gt;</code> pour déclarer les fonctions d’allocation.</p>

---

## Allouer un objet avec <code>malloc</code>

```c
int *entier = (int *)malloc(sizeof(int));

if (entier == NULL) {
    /* traiter l'échec */
}

*entier = 10;
```

La mémoire retournée est non initialisée. Elle doit être écrite avant d’être lue.

---

## Allouer un tableau

```c
int nombre = 30;
double *valeurs = (double *)malloc(nombre * (int)sizeof(double));

if (valeurs == NULL) {
    return EXIT_FAILURE;
}

valeurs[3] = 25.2;
```

Le nombre d’octets est le nombre d’éléments multiplié par <code>sizeof(double)</code>.

---

## Vérifier le produit des tailles

Le calcul du nombre d’octets peut lui-même dépasser la capacité d’un <code>int</code>.

```c
#include <limits.h>

if (nombre < 0 || nombre > INT_MAX / (int)sizeof(double)) {
    /* taille impossible */
}

int nombre_octets = nombre * (int)sizeof(double);
valeurs = (double *)malloc(nombre_octets);
```

---

## Initialiser avec <code>calloc</code>

```c
int *compteurs = (int *)calloc(nombre, (int)sizeof(int));
```

<code>calloc</code> réserve l’espace de <code>nombre</code> éléments et met tous les bits à zéro.

Pour les types entiers usuels, les cases valent alors zéro.

---

## <code>malloc</code> ou <code>calloc</code> ?

| Besoin | Choix naturel |
|---|---|
| contenu immédiatement remplacé | <code>malloc</code> |
| tableau initialisé à zéro | <code>calloc</code> |
| un seul entier | <code>(int *)malloc(sizeof(int))</code> |
| <code>n</code> entiers | <code>(int *)calloc(n, sizeof(int))</code> |

Le critère principal est l’état initial requis, pas une hypothèse de performance.
