<!-- .slide: class="chapter" -->

<p class="section-kicker">03 · Modifier chez l’appelant</p>

# Pointeurs et fonctions

<p class="lede">Le C passe toujours les arguments par valeur — y compris les adresses.</p>

---

## Le problème

Créer une fonction qui reçoit deux entiers et renvoie leur minimum et leur maximum.

```c
int minimum;
int maximum;

trouver_extremes(8, 3, /* comment produire deux résultats ? */);
```

Une fonction ne retourne directement qu’une valeur. Les variables locales de la fonction disparaissent à son retour.

---

## Une fausse solution

```c
void trouver_extremes(int a, int b)
{
    int minimum = a < b ? a : b;
    int maximum = a > b ? a : b;
}
```

Les deux variables appartiennent à l’appel. Elles cessent d’exister à la fin de la fonction et l’appelant ne peut pas les lire.

---

## Transmettre les destinations

```c
void trouver_extremes(int a, int b, int *min, int *max)
{
    *min = a < b ? a : b;
    *max = a > b ? a : b;
}
```

L’appelant fournit les adresses des variables à remplir :

```c
trouver_extremes(8, 3, &minimum, &maximum);
```

---

## Tracer l’appel

<div class="pointer-flow"><span><code>&minimum</code><small>argument copié</small></span><b>→</b><span><code>min</code><small>paramètre pointeur</small></span><b>→</b><span><code>*min</code><small>variable de l’appelant</small></span></div>

La copie du pointeur désigne le même objet que l’adresse originale.

<p class="definition"><strong>Passage par adresse :</strong> idiome qui simule un passage par référence en transmettant une adresse par valeur.</p>

---

<!-- .slide: class="compact" -->

## Exemple complet

```c
#include <stdio.h>

void trouver_extremes(int a, int b, int *min, int *max)
{
    *min = a < b ? a : b;
    *max = a > b ? a : b;
}

int main(void)
{
    int min;
    int max;

    trouver_extremes(8, 3, &min, &max);
    printf("min = %d, max = %d\n", min, max);
    return 0;
}
```

---

## Contrat d’un paramètre pointeur

Le prototype seul ne dit pas tout :

```c
bool lire_entier(int *resultat);
```

Le commentaire doit préciser :

- si le pointeur peut être <code>NULL</code>;
- si l’objet pointé sera lu, modifié ou les deux;
- combien d’éléments sont accessibles;
- qui demeure propriétaire de la mémoire.

---

## <code>const</code> pour annoncer « lecture seule »

```c
void afficher_valeur(const int *valeur)
{
    if (valeur != NULL) {
        printf("%d\n", *valeur);
    }
}
```

<code>const int *</code> interdit à cette fonction de modifier l’objet par ce pointeur.

<p class="callout small"><code>const</code> documente le contrat et permet au compilateur de détecter certaines erreurs.</p>
