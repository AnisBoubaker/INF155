<!-- .slide: class="chapter" -->

<p class="section-kicker">03 · Choisir le prochain minimum</p>

# Tri par sélection

<p class="lede">Chercher le plus petit élément restant et le placer à sa position définitive.</p>

---

## Intuition du tri par sélection

<div class="array-strip"><span class="sorted">3</span><span>10</span><span>78</span><span class="active">8</span><span>10</span><span>145</span><span>55</span></div>

À chaque passage :

1. chercher l’indice du minimum dans la partie non triée;
2. l’échanger avec la première case de cette partie;
3. avancer la frontière de la partie triée.

---

<!-- .slide: class="compact" -->

## Algorithme du tri par sélection

```c
void tri_selection(int t[], size_t n)
{
    for (size_t i = 0; i + 1 < n; ++i) {
        size_t indice_min = i;

        for (size_t j = i + 1; j < n; ++j) {
            if (t[j] < t[indice_min]) {
                indice_min = j;
            }
        }

        int temp = t[i];
        t[i] = t[indice_min];
        t[indice_min] = temp;
    }
}
```

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

<div class="array-strip"><span class="active">10</span><span class="active">3</span><span>78</span><span>8</span><span>10</span><span>145</span><span>55</span></div>

Après un passage de gauche à droite, la plus grande valeur de la zone considérée atteint sa position finale.

<div class="array-strip"><span>3</span><span>10</span><span>8</span><span>10</span><span>78</span><span>55</span><span class="sorted">145</span></div>

---

<!-- .slide: class="compact" -->

## Algorithme du tri à bulles

```c
void tri_bulles(int t[], size_t n)
{
    bool permutation = true;

    while (n > 1 && permutation) {
        permutation = false;
        for (size_t i = 0; i + 1 < n; ++i) {
            if (t[i] > t[i + 1]) {
                int temp = t[i];
                t[i] = t[i + 1];
                t[i + 1] = temp;
                permutation = true;
            }
        }
        --n;
    }
}
```

---

## Comparer les trois stratégies

| Question | Insertion | Sélection | Bulles |
|---|---|---|---|
| partie déjà triée | gauche | gauche | droite |
| mouvement principal | décalages | échange avec minimum | échanges voisins |
| déjà presque trié | très bon | aucun gain | bon si arrêt anticipé |
| stabilité simple | oui | non | oui |

<p class="tiny">Toutes restent quadratiques dans leur cas général; l’objectif est ici de raisonner sur leurs invariants.</p>
