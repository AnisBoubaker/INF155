<!-- .slide: class="chapter" -->

<p class="section-kicker">02 · Réserver un bloc</p>

# <code>malloc</code> et <code>calloc</code>

<p class="lede">Deux fonctions de <code>stdlib.h</code> qui retournent une adresse ou <code>NULL</code>.</p>

---

## <code>void *</code> · pointeur générique

```c
int nombre_octets = 64;
int nombre_elements = 10;
int octets_par_element = (int)sizeof(int);

void *bloc = malloc(nombre_octets);
void *bloc_initialise = calloc(nombre_elements, octets_par_element);
```

Ces fonctions reçoivent des nombres d’octets et retournent un <code>void *</code>, qui peut être converti implicitement vers un pointeur d’objet en C.

```c
int *entier = malloc(sizeof *entier);
```

<p class="callout small">Ne pas ajouter de conversion explicite en C : elle est inutile et peut masquer l’oubli de <code>#include &lt;stdlib.h&gt;</code>.</p>

---

## Allouer un objet avec <code>malloc</code>

```c
int *entier = malloc(sizeof *entier);

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
double *valeurs = malloc(nombre * (int)sizeof *valeurs);

if (valeurs == NULL) {
    return EXIT_FAILURE;
}

valeurs[3] = 25.2;
```

<code>sizeof *valeurs</code> demeure correct si le type du pointeur change.

---

## Vérifier le produit des tailles

Le calcul du nombre d’octets peut lui-même dépasser la capacité d’un <code>int</code>.

```c
#include <limits.h>

if (nombre < 0 || nombre > INT_MAX / (int)sizeof *valeurs) {
    /* taille impossible */
}

int nombre_octets = nombre * (int)sizeof *valeurs;
valeurs = malloc(nombre_octets);
```

<p class="warning small">Un produit débordé peut réserver un bloc plus petit que prévu et mener à un dépassement de tampon.</p>

---

## Initialiser avec <code>calloc</code>

```c
int *compteurs = calloc(nombre, (int)sizeof *compteurs);
```

<code>calloc</code> réserve l’espace de <code>nombre</code> éléments et met tous les bits à zéro.

Pour les types entiers usuels, les cases valent alors zéro. La fonction vérifie également le débordement du produit sur les implémentations conformes.

---

## <code>malloc</code> ou <code>calloc</code> ?

| Besoin | Choix naturel |
|---|---|
| contenu immédiatement remplacé | <code>malloc</code> |
| tableau initialisé à zéro | <code>calloc</code> |
| un seul objet | <code>malloc(sizeof *ptr)</code> |
| <code>n</code> éléments | <code>calloc(n, sizeof *ptr)</code> |

Le critère principal est l’état initial requis, pas une hypothèse de performance.
