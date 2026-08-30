<!-- .slide: class="chapter" -->

<p class="section-kicker">01 · Organiser en lignes et colonnes</p>

# Tableaux à deux dimensions

<p class="lede">Un tableau 2D est un tableau dont chaque élément est lui-même un tableau.</p>

---

## De 1D à plusieurs dimensions

Un tableau linéaire convient à une liste. Plusieurs dimensions expriment naturellement :

- une grille de jeu;
- les pixels d’une image;
- un horaire par jour et période;
- une matrice de distances;
- des notes par étudiant et évaluation.

<p class="definition"><strong>Deux dimensions :</strong> chaque case est identifiée par un indice de ligne et un indice de colonne.</p>

---

## Déclaration

```c
int grille[3][4];
```

<div class="matrix"><span>0,0</span><span>0,1</span><span>0,2</span><span>0,3</span><span>1,0</span><span>1,1</span><span>1,2</span><span>1,3</span><span>2,0</span><span>2,1</span><span>2,2</span><span>2,3</span></div>

Le type est « tableau de 3 éléments, chacun étant un tableau de 4 <code>int</code> ».

---

## Initialisation

```c
int grille[3][4] = {
    {1, 2, 4, 5},
    {8, 4, 3, 2},
    {7, 0, 0, 1}
};
```

Les accolades internes rendent visibles les lignes. Les cases omises sont initialisées à zéro.

---

## Accès à une case

```c
printf("%d\n", grille[1][3]);  // 2
grille[2][1] = 9;
```

<div class="matrix"><span>1</span><span>2</span><span>4</span><span>5</span><span>8</span><span>4</span><span>3</span><span class="active">2</span><span>7</span><span>9</span><span>0</span><span>1</span></div>

Chaque indice commence à zéro et doit demeurer dans sa propre limite.

---

## Parcours avec boucles imbriquées

```c
for (size_t ligne = 0; ligne < 3; ++ligne) {
    for (size_t colonne = 0; colonne < 4; ++colonne) {
        printf("%3d", grille[ligne][colonne]);
    }
    putchar('\n');
}
```

La boucle interne parcourt une ligne complète avant que la boucle externe passe à la suivante.

---

## Représentation en mémoire

En C, les lignes sont rangées consécutivement en ordre des lignes.

<div class="array-strip"><span>1<small>0,0</small></span><span>2<small>0,1</small></span><span>4<small>0,2</small></span><span>5<small>0,3</small></span><span>8<small>1,0</small></span><span>4<small>1,1</small></span><span>3<small>1,2</small></span><span>2<small>1,3</small></span></div>

La case <code>grille[l][c]</code> se trouve conceptuellement après <code>l × 4 + c</code> éléments.

---

## Tableau 2D en paramètre

```c
void afficher(size_t lignes, size_t colonnes,
              const int tableau[lignes][colonnes]);
```

Avec un tableau 2D, la fonction doit connaître la longueur d’une ligne pour calculer l’adresse de chaque case.

<p class="callout small">Les tableaux de longueur variable exigent C99. Un projet peut aussi employer une constante de compilation pour le nombre de colonnes.</p>

---

## Exemple · Remplir une grille

```c
void remplir(size_t lignes, size_t colonnes,
             int tableau[lignes][colonnes], int valeur)
{
    for (size_t l = 0; l < lignes; ++l) {
        for (size_t c = 0; c < colonnes; ++c) {
            tableau[l][c] = valeur;
        }
    }
}
```

---

## Une ligne est un tableau 1D

```c
int grille[3][4] = {0};
int *premiere_ligne = grille[0];
```

<code>grille[0]</code> désigne la première ligne et se convertit en pointeur vers sa première case.

```c
grille[1][2] == *(*(grille + 1) + 2)
```

<p class="tiny">L’écriture indicée demeure nettement plus expressive ici.</p>
