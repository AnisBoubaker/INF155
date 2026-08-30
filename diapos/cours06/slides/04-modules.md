<!-- .slide: class="chapter" -->

<p class="section-kicker">04 · Séparer interface et implémentation</p>

# La programmation modulaire

<p class="lede">Regrouper des fonctions cohérentes et cacher leurs détails internes.</p>

---

## Pourquoi des modules ?

Découper un projet en modules permet de :

- réduire la taille de chaque fichier;
- réutiliser un service dans plusieurs programmes;
- tester une responsabilité indépendamment;
- limiter les dépendances visibles;
- répartir le travail dans une équipe.

<p class="definition"><strong>Module :</strong> interface publique accompagnée d’une implémentation privée.</p>

---

## Composition d’un module C

<div class="comparison">
  <div><h3><code>tableaux.h</code></h3><p>Types, constantes et prototypes publics.</p></div>
  <div><h3><code>tableaux.c</code></h3><p>Définitions des fonctions et éléments privés.</p></div>
</div>

Le programme client inclut le fichier d’en-tête et lie l’implémentation compilée.

---

## Interface · <code>tableaux.h</code>

```c
#ifndef TABLEAUX_H
#define TABLEAUX_H

#include <stddef.h>

void tri_insertion(int valeurs[], size_t nombre);
double moyenne(const int valeurs[], size_t nombre);

#endif
```

L’en-tête annonce les services sans révéler leur code.

---

## Implémentation · <code>tableaux.c</code>

```c
#include "tableaux.h"

void tri_insertion(int valeurs[], size_t nombre)
{
    /* implémentation */
}

double moyenne(const int valeurs[], size_t nombre)
{
    /* implémentation */
}
```

Le fichier source inclut sa propre interface pour vérifier la cohérence des déclarations.

---

## Programme client · <code>main.c</code>

```c
#include <stdio.h>
#include "tableaux.h"

int main(void)
{
    int valeurs[] = {8, 3, 5, 1};
    tri_insertion(valeurs, 4);
    printf("%.1f\n", moyenne(valeurs, 4));
    return 0;
}
```

Le client dépend du contrat public, pas de l’organisation interne du module.

---

## Protéger les inclusions multiples

Sans garde, inclure indirectement plusieurs fois un même en-tête peut répéter des définitions de types.

```c
#ifndef TABLEAUX_H
#define TABLEAUX_H

/* contenu de l'interface */

#endif
```

Choisir un identifiant de garde unique, dérivé du nom du module.

---

## Ce qui appartient à l’interface

- types nécessaires aux clients;
- constantes réellement publiques;
- prototypes des fonctions offertes;
- commentaires qui décrivent les contrats;
- inclusions indispensables à ces déclarations.

Ce qui est privé demeure dans le fichier <code>.c</code> et peut utiliser <code>static</code> pour limiter sa liaison au fichier.

---

## Commenter un module

Dans l’en-tête :

- objectif du module;
- contrat de chaque fonction;
- unités, limites et préconditions;
- propriété et mutabilité des données.

Dans l’implémentation :

- choix algorithmiques non évidents;
- invariants;
- raisons des décisions techniques.

---

## Compiler plusieurs fichiers

```sh
cc -std=c17 -Wall -Wextra -Wpedantic \
   main.c tableaux.c -o programme
```

Chaque fichier <code>.c</code> est une unité de traduction. L’éditeur de liens réunit ensuite les symboles compatibles.

---

<!-- .slide: class="chapter compact" -->

<p class="section-kicker">À retenir</p>

# Des données organisées, des algorithmes expliqués, un projet découpé

<ol class="plan">
  <li>Respecter chaque dimension et sa limite.</li>
  <li>Identifier l’invariant d’un algorithme de tri.</li>
  <li>Placer le contrat public dans le <code>.h</code>.</li>
  <li>Garder les détails d’implémentation dans le <code>.c</code>.</li>
</ol>
