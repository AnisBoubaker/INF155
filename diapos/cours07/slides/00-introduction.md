<!-- .slide: class="title-slide" -->

<p class="eyebrow">INF155 · Cours 07</p>

# Algorithmes de fouille et de tri

<p class="lede">Trouver une valeur et remettre les données en ordre, étape par étape.</p>

<p class="byline"><strong>Anis Boubaker, Ph. D.</strong><br>Professeur Enseignant<br>École de technologie supérieure</p>

---

## Plan du cours

<ol class="plan">
  <li>Comparer les coûts avec la notation grand O</li>
  <li>Fouille linéaire et fouille binaire</li>
  <li>Tri par insertion</li>
  <li>Tri par sélection et tri à bulles</li>
</ol>

---

## Grand O · Comment le coût grandit-il ?

Quand on traite davantage de données, comment le travail augmente-t-il ?

- <code>n</code> : la taille du problème, par exemple le nombre de valeurs à traiter.
- Le coût : le nombre d’opérations, par exemple les additions ou les lectures.

<p class="definition"><strong>Grand O</strong> donne une borne supérieure sur la croissance du coût, à un facteur constant près, lorsque <code>n</code> devient grand.</p>

On garde le terme dominant, sans son facteur constant :

- <code>3n + 2</code> opérations → <code>O(n)</code>;
- <code>n² + 3n</code> opérations → <code>O(n²)</code>.

<p class="callout small">On décrit la croissance du travail, pas une durée exacte en secondes.</p>

---

## Grand O · Coûts à connaître

| Notation | Croissance | Exemple |
|---|---|---|
| <code>O(1)</code> | constante | lire <code>valeurs[i]</code> |
| <code>O(log n)</code> | logarithmique | réduire une quantité de moitié à chaque étape |
| <code>O(n)</code> | linéaire | afficher les <code>n</code> valeurs d’un tableau |
| <code>O(n²)</code> | quadratique | parcourir <code>n</code> lignes de <code>n</code> cases |
| <code>O(nᵏ)</code> | polynomiale (<code>k</code> fixé) | <code>k</code> boucles imbriquées de <code>n</code> itérations chacune |
| <code>O(2ⁿ)</code> | exponentielle | un travail qui double à chaque ajout d’un élément |

<p class="small">Les coûts linéaire et quadratique sont aussi <strong>polynomiaux</strong> : <code>k = 1</code> et <code>k = 2</code>.</p>

<p class="small">Pour <code>log n</code>, penser aux réductions de moitié : passer de 1 024 à 1 demande 10 divisions par deux.</p>

<p class="callout small">Avec un coût proportionnel à <code>n²</code>, doubler <code>n</code> quadruple le coût. Avec <code>2ⁿ</code>, ajouter seulement 1 à <code>n</code> double le coût.</p>

<p class="small">Le coût peut dépendre des données : on précise alors le <strong>meilleur cas</strong>, le <strong>cas moyen</strong> ou le <strong>pire cas</strong>. Grand O ne signifie pas à lui seul « pire cas ».</p>
