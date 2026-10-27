<!-- .slide: class="chapter" -->

<p class="section-kicker">03 · Choisir le prochain minimum</p>

# Tri par sélection

<p class="lede">Chercher le plus petit élément restant et le placer à sa position définitive.</p>

---

## Intuition du tri par sélection

On cherche la plus petite valeur parmi celles qui restent à ranger.

1. Parcourir toute la partie non triée en gardant le minimum provisoire.
2. Échanger ce minimum avec la première valeur de cette partie.
3. Recommencer à partir de la case suivante.

<div class="array-strip"><span class="active">8<small>0</small></span><span>3<small>1</small></span><span>5<small>2</small></span><span>3<small>3</small></span><span>1<small>4</small></span></div>

<p class="callout small">On repart de <strong>8, 3, 5, 3, 1</strong>. La première recherche commence avec 8 comme minimum provisoire.</p>

---

<!-- .slide: class="sort-walkthrough" id="selection-passage-1" -->

## Sélection · Passage 1 : placer le minimum

<p class="sort-context">Chercher le minimum parmi les <strong>5 valeurs restantes</strong>, puis le placer au début de cette partie.</p>

<table class="sort-steps">
<thead><tr><th scope="col">Étape</th><th scope="col">Comparaison et décision</th><th scope="col">État du tableau</th></tr></thead>
<tbody>
  <tr><td>Départ</td><td>Prendre <strong>8</strong> comme minimum provisoire.</td><td><div class="array-strip"><span class="active">8</span><span>3</span><span>5</span><span>3</span><span>1</span></div></td></tr>
  <tr class="fragment"><td>1</td><td><strong>3 &lt; 8</strong> : 3 devient le minimum provisoire.</td><td><div class="array-strip"><span>8</span><span class="active">3</span><span>5</span><span>3</span><span>1</span></div></td></tr>
  <tr class="fragment"><td>2</td><td><strong>5 &gt; 3</strong> : le minimum reste 3.</td><td><div class="array-strip"><span>8</span><span class="active">3</span><span>5</span><span>3</span><span>1</span></div></td></tr>
  <tr class="fragment"><td>3</td><td><strong>3 = 3</strong> : garder le premier 3 comme minimum.</td><td><div class="array-strip"><span>8</span><span class="active">3</span><span>5</span><span>3</span><span>1</span></div></td></tr>
  <tr class="fragment"><td>4</td><td><strong>1 &lt; 3</strong> : 1 devient le minimum provisoire.</td><td><div class="array-strip"><span>8</span><span>3</span><span>5</span><span>3</span><span class="active">1</span></div></td></tr>
  <tr class="fragment"><td>5</td><td>Échanger <strong>8</strong> avec le minimum <strong>1</strong>.</td><td><div class="array-strip"><span class="sorted">1</span><span>3</span><span>5</span><span>3</span><span>8</span></div></td></tr>
</tbody>
</table>

<p class="sort-legend">Vert : positions définitives. Rouge : minimum provisoire. Le tableau change seulement à la fin du passage.</p>

---

<!-- .slide: class="sort-walkthrough" id="selection-passage-2" -->

## Sélection · Passage 2 : placer le minimum

<p class="sort-context">Chercher le minimum parmi les <strong>4 valeurs restantes</strong>, puis le placer au début de cette partie.</p>

<table class="sort-steps">
<thead><tr><th scope="col">Étape</th><th scope="col">Comparaison et décision</th><th scope="col">État du tableau</th></tr></thead>
<tbody>
  <tr><td>Départ</td><td>Prendre <strong>3</strong> comme minimum provisoire.</td><td><div class="array-strip"><span class="sorted">1</span><span class="active">3</span><span>5</span><span>3</span><span>8</span></div></td></tr>
  <tr class="fragment"><td>1</td><td><strong>5 &gt; 3</strong> : le minimum reste 3.</td><td><div class="array-strip"><span class="sorted">1</span><span class="active">3</span><span>5</span><span>3</span><span>8</span></div></td></tr>
  <tr class="fragment"><td>2</td><td><strong>3 = 3</strong> : garder le premier 3 comme minimum.</td><td><div class="array-strip"><span class="sorted">1</span><span class="active">3</span><span>5</span><span>3</span><span>8</span></div></td></tr>
  <tr class="fragment"><td>3</td><td><strong>8 &gt; 3</strong> : le minimum reste 3.</td><td><div class="array-strip"><span class="sorted">1</span><span class="active">3</span><span>5</span><span>3</span><span>8</span></div></td></tr>
  <tr class="fragment"><td>4</td><td><strong>3</strong> est déjà à la bonne place : le tableau reste identique.</td><td><div class="array-strip"><span class="sorted">1</span><span class="sorted">3</span><span>5</span><span>3</span><span>8</span></div></td></tr>
</tbody>
</table>

<p class="sort-legend">Vert : positions définitives. Rouge : minimum provisoire. Le tableau change seulement à la fin du passage.</p>

---

<!-- .slide: class="sort-walkthrough" id="selection-passage-3" -->

## Sélection · Passage 3 : placer le minimum

<p class="sort-context">Chercher le minimum parmi les <strong>3 valeurs restantes</strong>, puis le placer au début de cette partie.</p>

<table class="sort-steps">
<thead><tr><th scope="col">Étape</th><th scope="col">Comparaison et décision</th><th scope="col">État du tableau</th></tr></thead>
<tbody>
  <tr><td>Départ</td><td>Prendre <strong>5</strong> comme minimum provisoire.</td><td><div class="array-strip"><span class="sorted">1</span><span class="sorted">3</span><span class="active">5</span><span>3</span><span>8</span></div></td></tr>
  <tr class="fragment"><td>1</td><td><strong>3 &lt; 5</strong> : 3 devient le minimum provisoire.</td><td><div class="array-strip"><span class="sorted">1</span><span class="sorted">3</span><span>5</span><span class="active">3</span><span>8</span></div></td></tr>
  <tr class="fragment"><td>2</td><td><strong>8 &gt; 3</strong> : le minimum reste 3.</td><td><div class="array-strip"><span class="sorted">1</span><span class="sorted">3</span><span>5</span><span class="active">3</span><span>8</span></div></td></tr>
  <tr class="fragment"><td>3</td><td>Échanger <strong>5</strong> avec le minimum <strong>3</strong>.</td><td><div class="array-strip"><span class="sorted">1</span><span class="sorted">3</span><span class="sorted">3</span><span>5</span><span>8</span></div></td></tr>
</tbody>
</table>

<p class="sort-legend">Vert : positions définitives. Rouge : minimum provisoire. Le tableau change seulement à la fin du passage.</p>

---

<!-- .slide: class="sort-walkthrough" id="selection-passage-4" -->

## Sélection · Passage 4 : placer le minimum

<p class="sort-context">Chercher le minimum parmi les <strong>2 valeurs restantes</strong>, puis le placer au début de cette partie.</p>

<table class="sort-steps">
<thead><tr><th scope="col">Étape</th><th scope="col">Comparaison et décision</th><th scope="col">État du tableau</th></tr></thead>
<tbody>
  <tr><td>Départ</td><td>Prendre <strong>5</strong> comme minimum provisoire.</td><td><div class="array-strip"><span class="sorted">1</span><span class="sorted">3</span><span class="sorted">3</span><span class="active">5</span><span>8</span></div></td></tr>
  <tr class="fragment"><td>1</td><td><strong>8 &gt; 5</strong> : le minimum reste 5.</td><td><div class="array-strip"><span class="sorted">1</span><span class="sorted">3</span><span class="sorted">3</span><span class="active">5</span><span>8</span></div></td></tr>
  <tr class="fragment"><td>2</td><td><strong>5</strong> est déjà à la bonne place : le tableau reste identique.</td><td><div class="array-strip"><span class="sorted">1</span><span class="sorted">3</span><span class="sorted">3</span><span class="sorted">5</span><span class="sorted">8</span></div></td></tr>
</tbody>
</table>

<p class="sort-legend">Il ne reste qu’une valeur à droite : elle est aussi à sa place. Le tri est terminé.</p>

---

<!-- .slide: class="compact" -->

## Pseudocode du tri par sélection

```text
PROCÉDURE tri_selection(tableau, taille)
    POUR i DE 0 À taille - 2
        indice_min ← i

        POUR j DE i + 1 À taille - 1
            SI tableau[j] < tableau[indice_min]
                indice_min ← j
            FIN SI
        FIN POUR

        ÉCHANGER tableau[i] ET tableau[indice_min]
    FIN POUR
FIN PROCÉDURE
```

Les indices commencent à 0. Si le minimum est déjà à l’indice <code>i</code>, le tableau reste identique.

---

## Propriété du tri par sélection

Il effectue toujours environ <code>n² / 2</code> comparaisons, même si le tableau est déjà trié.

En revanche, il limite le nombre d’échanges à environ <code>n</code>.

<p class="callout small">Il peut être utile quand les écritures coûtent beaucoup plus cher que les lectures, mais il n’est pas stable dans sa forme simple.</p>

---

<!-- .slide: class="chapter" -->

<p class="section-kicker">Comparer des voisins</p>

# Tri à bulles

<p class="lede">Permuter les paires adjacentes mal ordonnées jusqu’à ce qu’aucune permutation ne soit nécessaire.</p>

---

## Intuition du tri à bulles

Une grande valeur avance vers la droite en échangeant sa place avec ses voisins plus petits.

1. Comparer deux voisins; les échanger s’ils sont dans le mauvais ordre.
2. Avancer d’une case et continuer jusqu’au bout de la partie à trier.
3. Recommencer en laissant de côté les positions déjà définitives à droite.

<div class="array-strip"><span class="active">8<small>0</small></span><span class="active">3<small>1</small></span><span>5<small>2</small></span><span>3<small>3</small></span><span>1<small>4</small></span></div>

<p class="callout small">On repart de <strong>8, 3, 5, 3, 1</strong>. La première comparaison porte sur 8 et 3.</p>

---

<!-- .slide: class="sort-walkthrough" id="bulles-passage-1" -->

## Bulles · Passage 1 : parcourir les voisins

<p class="sort-context">Parcourir les <strong>5 premières valeurs</strong>, de gauche à droite.</p>

<table class="sort-steps">
<thead><tr><th scope="col">Étape</th><th scope="col">Comparaison et décision</th><th scope="col">État du tableau</th></tr></thead>
<tbody>
  <tr><td>Départ</td><td>Commencer à gauche et comparer les valeurs voisines.</td><td><div class="array-strip"><span class="active">8</span><span class="active">3</span><span>5</span><span>3</span><span>1</span></div></td></tr>
  <tr class="fragment"><td>1</td><td><strong>8 &gt; 3</strong> : échanger ces deux voisins.</td><td><div class="array-strip"><span class="active">3</span><span class="active">8</span><span>5</span><span>3</span><span>1</span></div></td></tr>
  <tr class="fragment"><td>2</td><td><strong>8 &gt; 5</strong> : échanger ces deux voisins.</td><td><div class="array-strip"><span>3</span><span class="active">5</span><span class="active">8</span><span>3</span><span>1</span></div></td></tr>
  <tr class="fragment"><td>3</td><td><strong>8 &gt; 3</strong> : échanger ces deux voisins.</td><td><div class="array-strip"><span>3</span><span>5</span><span class="active">3</span><span class="active">8</span><span>1</span></div></td></tr>
  <tr class="fragment"><td>4</td><td><strong>8 &gt; 1</strong> : échanger ces deux voisins.</td><td><div class="array-strip"><span>3</span><span>5</span><span>3</span><span class="active">1</span><span class="active">8</span></div></td></tr>
  <tr class="fragment"><td>5</td><td><strong>8</strong> est à sa place définitive; recommencer sur les 4 valeurs de gauche.</td><td><div class="array-strip"><span>3</span><span>5</span><span>3</span><span>1</span><span class="sorted">8</span></div></td></tr>
</tbody>
</table>

<p class="sort-legend">Rouge : voisins comparés. Vert : positions définitives. Un passage sans échange permet de s’arrêter.</p>

---

<!-- .slide: class="sort-walkthrough" id="bulles-passage-2" -->

## Bulles · Passage 2 : parcourir les voisins

<p class="sort-context">Parcourir les <strong>4 premières valeurs</strong>, de gauche à droite.</p>

<table class="sort-steps">
<thead><tr><th scope="col">Étape</th><th scope="col">Comparaison et décision</th><th scope="col">État du tableau</th></tr></thead>
<tbody>
  <tr><td>Départ</td><td>Commencer à gauche et comparer les valeurs voisines.</td><td><div class="array-strip"><span class="active">3</span><span class="active">5</span><span>3</span><span>1</span><span class="sorted">8</span></div></td></tr>
  <tr class="fragment"><td>1</td><td><strong>3 &lt; 5</strong> : les voisins sont déjà dans le bon ordre.</td><td><div class="array-strip"><span class="active">3</span><span class="active">5</span><span>3</span><span>1</span><span class="sorted">8</span></div></td></tr>
  <tr class="fragment"><td>2</td><td><strong>5 &gt; 3</strong> : échanger ces deux voisins.</td><td><div class="array-strip"><span>3</span><span class="active">3</span><span class="active">5</span><span>1</span><span class="sorted">8</span></div></td></tr>
  <tr class="fragment"><td>3</td><td><strong>5 &gt; 1</strong> : échanger ces deux voisins.</td><td><div class="array-strip"><span>3</span><span>3</span><span class="active">1</span><span class="active">5</span><span class="sorted">8</span></div></td></tr>
  <tr class="fragment"><td>4</td><td><strong>5</strong> est à sa place définitive; recommencer sur les 3 valeurs de gauche.</td><td><div class="array-strip"><span>3</span><span>3</span><span>1</span><span class="sorted">5</span><span class="sorted">8</span></div></td></tr>
</tbody>
</table>

<p class="sort-legend">Rouge : voisins comparés. Vert : positions définitives. Un passage sans échange permet de s’arrêter.</p>

---

<!-- .slide: class="sort-walkthrough" id="bulles-passage-3" -->

## Bulles · Passage 3 : parcourir les voisins

<p class="sort-context">Parcourir les <strong>3 premières valeurs</strong>, de gauche à droite.</p>

<table class="sort-steps">
<thead><tr><th scope="col">Étape</th><th scope="col">Comparaison et décision</th><th scope="col">État du tableau</th></tr></thead>
<tbody>
  <tr><td>Départ</td><td>Commencer à gauche et comparer les valeurs voisines.</td><td><div class="array-strip"><span class="active">3</span><span class="active">3</span><span>1</span><span class="sorted">5</span><span class="sorted">8</span></div></td></tr>
  <tr class="fragment"><td>1</td><td><strong>3 = 3</strong> : garder les deux voisins dans cet ordre.</td><td><div class="array-strip"><span class="active">3</span><span class="active">3</span><span>1</span><span class="sorted">5</span><span class="sorted">8</span></div></td></tr>
  <tr class="fragment"><td>2</td><td><strong>3 &gt; 1</strong> : échanger ces deux voisins.</td><td><div class="array-strip"><span>3</span><span class="active">1</span><span class="active">3</span><span class="sorted">5</span><span class="sorted">8</span></div></td></tr>
  <tr class="fragment"><td>3</td><td><strong>3</strong> est à sa place définitive; recommencer sur les 2 valeurs de gauche.</td><td><div class="array-strip"><span>3</span><span>1</span><span class="sorted">3</span><span class="sorted">5</span><span class="sorted">8</span></div></td></tr>
</tbody>
</table>

<p class="sort-legend">Rouge : voisins comparés. Vert : positions définitives. Un passage sans échange permet de s’arrêter.</p>

---

<!-- .slide: class="sort-walkthrough" id="bulles-passage-4" -->

## Bulles · Passage 4 : parcourir les voisins

<p class="sort-context">Parcourir les <strong>2 premières valeurs</strong>, de gauche à droite.</p>

<table class="sort-steps">
<thead><tr><th scope="col">Étape</th><th scope="col">Comparaison et décision</th><th scope="col">État du tableau</th></tr></thead>
<tbody>
  <tr><td>Départ</td><td>Commencer à gauche et comparer les valeurs voisines.</td><td><div class="array-strip"><span class="active">3</span><span class="active">1</span><span class="sorted">3</span><span class="sorted">5</span><span class="sorted">8</span></div></td></tr>
  <tr class="fragment"><td>1</td><td><strong>3 &gt; 1</strong> : échanger ces deux voisins.</td><td><div class="array-strip"><span class="active">1</span><span class="active">3</span><span class="sorted">3</span><span class="sorted">5</span><span class="sorted">8</span></div></td></tr>
  <tr class="fragment"><td>2</td><td>Il ne reste qu’une valeur à gauche : <strong>le tri est terminé</strong>.</td><td><div class="array-strip"><span class="sorted">1</span><span class="sorted">3</span><span class="sorted">3</span><span class="sorted">5</span><span class="sorted">8</span></div></td></tr>
</tbody>
</table>

<p class="sort-legend">Rouge : voisins comparés. Vert : positions définitives. Un passage sans échange permet de s’arrêter.</p>

---

<!-- .slide: class="sort-walkthrough" id="bulles-arret-anticipe" -->

## Bulles · Arrêter dès qu’il n’y a plus d’échange

<p class="sort-context">Autre cas : le tableau est déjà trié. Un seul passage suffit pour le constater.</p>

<table class="sort-steps">
<thead><tr><th scope="col">Étape</th><th scope="col">Comparaison et décision</th><th scope="col">État du tableau</th></tr></thead>
<tbody>
  <tr><td>Départ</td><td>Commencer à gauche et comparer les valeurs voisines.</td><td><div class="array-strip"><span class="active">1</span><span class="active">3</span><span>3</span><span>5</span><span>8</span></div></td></tr>
  <tr class="fragment"><td>1</td><td><strong>1 &lt; 3</strong> : les voisins sont déjà dans le bon ordre.</td><td><div class="array-strip"><span class="active">1</span><span class="active">3</span><span>3</span><span>5</span><span>8</span></div></td></tr>
  <tr class="fragment"><td>2</td><td><strong>3 = 3</strong> : garder les deux voisins dans cet ordre.</td><td><div class="array-strip"><span>1</span><span class="active">3</span><span class="active">3</span><span>5</span><span>8</span></div></td></tr>
  <tr class="fragment"><td>3</td><td><strong>3 &lt; 5</strong> : les voisins sont déjà dans le bon ordre.</td><td><div class="array-strip"><span>1</span><span>3</span><span class="active">3</span><span class="active">5</span><span>8</span></div></td></tr>
  <tr class="fragment"><td>4</td><td><strong>5 &lt; 8</strong> : les voisins sont déjà dans le bon ordre.</td><td><div class="array-strip"><span>1</span><span>3</span><span>3</span><span class="active">5</span><span class="active">8</span></div></td></tr>
  <tr class="fragment"><td>5</td><td><strong>Aucun échange pendant tout le passage</strong> : arrêter le tri.</td><td><div class="array-strip"><span class="sorted">1</span><span class="sorted">3</span><span class="sorted">3</span><span class="sorted">5</span><span class="sorted">8</span></div></td></tr>
</tbody>
</table>

<p class="sort-legend">Rouge : voisins comparés. Vert : positions définitives. Un passage sans échange permet de s’arrêter.</p>

---

<!-- .slide: class="compact" -->

## Pseudocode du tri à bulles

```text
PROCÉDURE tri_bulles(tableau, taille)
    limite ← taille
    permutation ← VRAI

    TANT QUE limite > 1 ET permutation
        permutation ← FAUX
        POUR i DE 0 À limite - 2
            SI tableau[i] > tableau[i + 1]
                ÉCHANGER tableau[i] ET tableau[i + 1]
                permutation ← VRAI
            FIN SI
        FIN POUR
        limite ← limite - 1
    FIN TANT QUE
FIN PROCÉDURE
```

Les indices commencent à 0. Après chaque passage, on exclut la dernière position, désormais définitive.

---

## Comparer les trois stratégies

| Question | Insertion | Sélection | Bulles |
|---|---|---|---|
| partie déjà triée | gauche | gauche | droite |
| mouvement principal | décalages | échange avec minimum | échanges voisins |
| déjà presque trié | très bon | aucun gain | bon si arrêt anticipé |
| stabilité simple | oui | non | oui |

<p class="tiny">Toutes restent quadratiques dans leur cas général; l’objectif est ici de raisonner sur leurs invariants.</p>
