<!-- .slide: class="chapter" -->

<p class="section-kicker">02 · Remettre une collection en ordre</p>

# Les algorithmes de tri

<p class="lede">Observer comment une stratégie transforme progressivement un tableau.</p>

---

## Trier un tableau

<div class="sort-transform"><div class="array-strip"><span>3</span><span>10</span><span>78</span><span>8</span><span>10</span><span>145</span><span>55</span></div><b>→</b><div class="array-strip"><span>3</span><span>8</span><span>10</span><span>10</span><span>55</span><span>78</span><span>145</span></div></div>

Trier consiste à placer les éléments selon un ordre défini : croissant, décroissant, lexicographique ou selon une clé.

---

## Plusieurs familles de tri

Les algorithmes se distinguent par :

- leur nombre de comparaisons et de déplacements;
- leur mémoire supplémentaire;
- leur stabilité;
- leur comportement selon l’ordre initial;
- leur facilité d’implémentation.

| Tri du cours | Meilleur cas | Cas moyen / pire |
|---|---:|---:|
| insertion | linéaire | quadratique |
| sélection | quadratique | quadratique |
| bulles | linéaire si optimisé | quadratique |

---

<!-- .slide: class="chapter" -->

<p class="section-kicker">Une main de cartes</p>

# Tri par insertion

<p class="lede">Maintenir une partie gauche triée et y insérer chaque nouvel élément.</p>

---

## Intuition

À l’étape <code>i</code> :

1. conserver la valeur <code>tableau[i]</code>;
2. décaler vers la droite les éléments triés qui sont trop grands;
3. déposer la valeur dans l’espace libéré;
4. agrandir la partie triée d’une case.

<div class="array-strip"><span class="sorted">3</span><span class="sorted">10</span><span class="sorted">78</span><span class="active">8</span><span>10</span><span>145</span><span>55</span></div>

---

## Insertion de 8 · Décaler

<div class="array-strip"><span class="sorted">3</span><span class="sorted">10</span><span class="sorted">78</span><span class="active">8</span><span>10</span><span>145</span><span>55</span></div>

<div class="array-strip"><span class="sorted">3</span><span class="sorted">10</span><span class="gap">·</span><span>78</span><span>10</span><span>145</span><span>55</span></div>

On conserve 8, puis on décale 78 et 10 jusqu’à trouver sa position.

---

## Insertion de 8 · Déposer

<div class="array-strip"><span class="sorted">3</span><span class="sorted">8</span><span class="sorted">10</span><span class="sorted">78</span><span>10</span><span>145</span><span>55</span></div>

La partie gauche est de nouveau triée. L’invariant est restauré avant l’itération suivante.

<p class="definition"><strong>Invariant :</strong> propriété vraie avant et après chaque itération.</p>

---

<!-- .slide: class="compact" -->

## Algorithme du tri par insertion

```c
void tri_insertion(int t[], size_t n)
{
    for (size_t i = 1; i < n; ++i) {
        int valeur = t[i];
        size_t j = i;

        while (j > 0 && t[j - 1] > valeur) {
            t[j] = t[j - 1];
            --j;
        }

        t[j] = valeur;
    }
}
```

---

## Quand l’insertion est-elle intéressante ?

- petits tableaux;
- données déjà presque triées;
- ajout progressif d’éléments;
- besoin d’un tri stable simple;
- peu de mémoire supplémentaire disponible.

<p class="callout">Sa simplicité compte; pour de grands tableaux généraux, un algorithme en <code>n log n</code> est généralement préférable.</p>
