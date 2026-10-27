<!-- .slide: class="chapter" -->

<p class="section-kicker">02 · Remettre une collection en ordre</p>

# Les algorithmes de tri

<p class="lede">Observer comment une stratégie transforme progressivement un tableau.</p>

---

## Trier un tableau

<div class="sort-transform"><div class="array-strip"><span>8</span><span>3</span><span>5</span><span>3</span><span>1</span></div><b>→</b><div class="array-strip"><span>1</span><span>3</span><span>3</span><span>5</span><span>8</span></div></div>

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

## Intuition · Comme une main de cartes

On prend la prochaine valeur et on la glisse au bon endroit parmi celles déjà rangées.

1. Garder cette valeur à part.
2. Décaler vers la droite les valeurs triées qui sont plus grandes.
3. Déposer la valeur dans la place libérée.

<div class="array-strip"><span class="sorted">8<small>0</small></span><span class="active">3<small>1</small></span><span>5<small>2</small></span><span>3<small>3</small></span><span>1<small>4</small></span></div>

<p class="callout small">Même exemple pour les trois tris : <strong>8, 3, 5, 3, 1</strong>. En vert, la partie déjà triée; on commence par y insérer 3.</p>

---

<!-- .slide: class="sort-walkthrough" id="insertion-passage-1" -->

## Insertion · Passage 1 : insérer 3

<p class="sort-context"><strong>Valeur à insérer : 3.</strong> On compare vers la gauche, puis on la dépose.</p>

<table class="sort-steps">
<thead><tr><th scope="col">Étape</th><th scope="col">Comparaison et décision</th><th scope="col">État du tableau</th></tr></thead>
<tbody>
  <tr><td>Départ</td><td>La partie gauche est déjà triée; on va insérer <strong>3</strong>.</td><td><div class="array-strip"><span class="sorted">8</span><span class="active">3</span><span>5</span><span>3</span><span>1</span></div></td></tr>
  <tr class="fragment"><td>1</td><td>Garder <strong>3</strong> à part pour libérer sa place.</td><td><div class="array-strip"><span class="sorted">8</span><span class="gap">·</span><span>5</span><span>3</span><span>1</span></div></td></tr>
  <tr class="fragment"><td>2</td><td><strong>8 &gt; 3</strong> : décaler 8 d’une place vers la droite.</td><td><div class="array-strip"><span class="gap">·</span><span class="active">8</span><span>5</span><span>3</span><span>1</span></div></td></tr>
  <tr class="fragment"><td>3</td><td>Le début est atteint : placer <strong>3</strong> dans la place libre.</td><td><div class="array-strip"><span class="sorted">3</span><span class="sorted">8</span><span>5</span><span>3</span><span>1</span></div></td></tr>
</tbody>
</table>

<p class="sort-legend">Vert : partie triée. Pointillés : place disponible; la valeur à insérer est gardée à part.</p>

---

<!-- .slide: class="sort-walkthrough" id="insertion-passage-2" -->

## Insertion · Passage 2 : insérer 5

<p class="sort-context"><strong>Valeur à insérer : 5.</strong> On compare vers la gauche, puis on la dépose.</p>

<table class="sort-steps">
<thead><tr><th scope="col">Étape</th><th scope="col">Comparaison et décision</th><th scope="col">État du tableau</th></tr></thead>
<tbody>
  <tr><td>Départ</td><td>La partie gauche est déjà triée; on va insérer <strong>5</strong>.</td><td><div class="array-strip"><span class="sorted">3</span><span class="sorted">8</span><span class="active">5</span><span>3</span><span>1</span></div></td></tr>
  <tr class="fragment"><td>1</td><td>Garder <strong>5</strong> à part pour libérer sa place.</td><td><div class="array-strip"><span class="sorted">3</span><span class="sorted">8</span><span class="gap">·</span><span>3</span><span>1</span></div></td></tr>
  <tr class="fragment"><td>2</td><td><strong>8 &gt; 5</strong> : décaler 8 d’une place vers la droite.</td><td><div class="array-strip"><span>3</span><span class="gap">·</span><span class="active">8</span><span>3</span><span>1</span></div></td></tr>
  <tr class="fragment"><td>3</td><td><strong>3 &lt; 5</strong> : placer 5 juste après 3.</td><td><div class="array-strip"><span class="sorted">3</span><span class="sorted">5</span><span class="sorted">8</span><span>3</span><span>1</span></div></td></tr>
</tbody>
</table>

<p class="sort-legend">Vert : partie triée. Pointillés : place disponible; la valeur à insérer est gardée à part.</p>

---

<!-- .slide: class="sort-walkthrough" id="insertion-passage-3" -->

## Insertion · Passage 3 : insérer 3

<p class="sort-context"><strong>Valeur à insérer : 3.</strong> On compare vers la gauche, puis on la dépose.</p>

<table class="sort-steps">
<thead><tr><th scope="col">Étape</th><th scope="col">Comparaison et décision</th><th scope="col">État du tableau</th></tr></thead>
<tbody>
  <tr><td>Départ</td><td>La partie gauche est déjà triée; on va insérer <strong>3</strong>.</td><td><div class="array-strip"><span class="sorted">3</span><span class="sorted">5</span><span class="sorted">8</span><span class="active">3</span><span>1</span></div></td></tr>
  <tr class="fragment"><td>1</td><td>Garder <strong>3</strong> à part pour libérer sa place.</td><td><div class="array-strip"><span class="sorted">3</span><span class="sorted">5</span><span class="sorted">8</span><span class="gap">·</span><span>1</span></div></td></tr>
  <tr class="fragment"><td>2</td><td><strong>8 &gt; 3</strong> : décaler 8 d’une place vers la droite.</td><td><div class="array-strip"><span>3</span><span>5</span><span class="gap">·</span><span class="active">8</span><span>1</span></div></td></tr>
  <tr class="fragment"><td>3</td><td><strong>5 &gt; 3</strong> : décaler 5 d’une place vers la droite.</td><td><div class="array-strip"><span>3</span><span class="gap">·</span><span class="active">5</span><span>8</span><span>1</span></div></td></tr>
  <tr class="fragment"><td>4</td><td><strong>3 = 3</strong> : placer le nouveau 3 après le premier.</td><td><div class="array-strip"><span class="sorted">3</span><span class="sorted">3</span><span class="sorted">5</span><span class="sorted">8</span><span>1</span></div></td></tr>
</tbody>
</table>

<p class="sort-legend">Vert : partie triée. Pointillés : place disponible; la valeur à insérer est gardée à part.</p>

---

<!-- .slide: class="sort-walkthrough" id="insertion-passage-4" -->

## Insertion · Passage 4 : insérer 1

<p class="sort-context"><strong>Valeur à insérer : 1.</strong> On compare vers la gauche, puis on la dépose.</p>

<table class="sort-steps">
<thead><tr><th scope="col">Étape</th><th scope="col">Comparaison et décision</th><th scope="col">État du tableau</th></tr></thead>
<tbody>
  <tr><td>Départ</td><td>La partie gauche est déjà triée; on va insérer <strong>1</strong>.</td><td><div class="array-strip"><span class="sorted">3</span><span class="sorted">3</span><span class="sorted">5</span><span class="sorted">8</span><span class="active">1</span></div></td></tr>
  <tr class="fragment"><td>1</td><td>Garder <strong>1</strong> à part pour libérer sa place.</td><td><div class="array-strip"><span class="sorted">3</span><span class="sorted">3</span><span class="sorted">5</span><span class="sorted">8</span><span class="gap">·</span></div></td></tr>
  <tr class="fragment"><td>2</td><td><strong>8 &gt; 1</strong> : décaler 8 d’une place vers la droite.</td><td><div class="array-strip"><span>3</span><span>3</span><span>5</span><span class="gap">·</span><span class="active">8</span></div></td></tr>
  <tr class="fragment"><td>3</td><td><strong>5 &gt; 1</strong> : décaler 5 d’une place vers la droite.</td><td><div class="array-strip"><span>3</span><span>3</span><span class="gap">·</span><span class="active">5</span><span>8</span></div></td></tr>
  <tr class="fragment"><td>4</td><td><strong>3 &gt; 1</strong> : décaler 3 d’une place vers la droite.</td><td><div class="array-strip"><span>3</span><span class="gap">·</span><span class="active">3</span><span>5</span><span>8</span></div></td></tr>
  <tr class="fragment"><td>5</td><td><strong>3 &gt; 1</strong> : décaler 3 d’une place vers la droite.</td><td><div class="array-strip"><span class="gap">·</span><span class="active">3</span><span>3</span><span>5</span><span>8</span></div></td></tr>
  <tr class="fragment"><td>6</td><td>Le début est atteint : placer <strong>1</strong> dans la place libre.</td><td><div class="array-strip"><span class="sorted">1</span><span class="sorted">3</span><span class="sorted">3</span><span class="sorted">5</span><span class="sorted">8</span></div></td></tr>
</tbody>
</table>

<p class="sort-legend">Toutes les valeurs ont été insérées : le tableau est maintenant trié.</p>

---

<!-- .slide: class="compact" -->

## Pseudocode du tri par insertion

```text
PROCÉDURE tri_insertion(tableau, taille)
    POUR i DE 1 À taille - 1
        valeur ← tableau[i]
        j ← i

        TANT QUE j > 0 ET tableau[j - 1] > valeur
            tableau[j] ← tableau[j - 1]
            j ← j - 1
        FIN TANT QUE

        tableau[j] ← valeur
    FIN POUR
FIN PROCÉDURE
```

Les indices commencent à 0. On vérifie <code>j &gt; 0</code> avant de consulter la case précédente.

---

## Quand l’insertion est-elle intéressante ?

- petits tableaux;
- données déjà presque triées;
- ajout progressif d’éléments;
- besoin d’un tri stable simple;
- peu de mémoire supplémentaire disponible.

<p class="callout">Sa simplicité compte; pour de grands tableaux généraux, un algorithme en <code>n log n</code> est généralement préférable.</p>
