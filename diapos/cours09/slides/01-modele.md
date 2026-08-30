<!-- .slide: class="chapter" -->

<p class="section-kicker">01 · Choisir la durée de vie</p>

# Allocation mémoire

<p class="lede">La taille et la durée de vie d’un objet peuvent être fixées avant ou pendant l’exécution.</p>

---

## Automatique ou dynamique ?

<div class="comparison">
  <div><h3>Pile · automatique</h3><p>Créée à l’entrée d’un bloc ou d’un appel, libérée automatiquement à sa sortie.</p></div>
  <div><h3>Tas · dynamique</h3><p>Réservée explicitement et conservée jusqu’à un appel de <code>free</code>.</p></div>
</div>

<p class="tiny">Le standard C décrit surtout des durées de stockage; « pile » et « tas » sont le modèle d’implémentation courant.</p>

---

## Quand allouer dynamiquement ?

- taille inconnue à la compilation;
- volume trop grand ou variable pour un objet automatique;
- donnée qui doit survivre à l’appel qui la crée;
- structure dont les éléments sont ajoutés et retirés;
- propriété transférée entre composants.

<p class="callout">Allouer dynamiquement ajoute une responsabilité : chaque acquisition réussie doit avoir une libération clairement attribuée.</p>

---

## Cas d’étude · Matrice de distances

Avec une limite fixe :

```c
double distances[MAX_VILLES][MAX_VILLES];
```

On réserve toujours le maximum, même pour trois villes. Si le maximum est trop petit, le programme ne peut pas continuer.

<p class="definition"><strong>Objectif :</strong> dimensionner la matrice selon le nombre de villes connu à l’exécution.</p>
