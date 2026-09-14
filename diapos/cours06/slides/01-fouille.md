<!-- .slide: class="chapter" -->

<p class="section-kicker">01 · Trouver une valeur</p>

# Algorithmes de fouille

<p class="lede">Déterminer si une valeur est présente et, le cas échéant, à quel indice.</p>

---

## Un contrat commun

Les deux algorithmes du cours retournent :

- l’indice d’une occurrence lorsque la cible est trouvée;
- <code>nombre</code> lorsque la cible est absente.

```c
size_t position = fouille_lineaire(valeurs, nombre, cible);

if (position != nombre) {
    printf("Trouvee a l'indice %zu\n", position);
}
```

<p class="callout small"><code>nombre</code> constitue une sentinelle sûre, car ce n’est jamais un indice valide.</p>

---

## Fouille d’un tableau non ordonné

Sans information sur l’ordre des valeurs, il faut examiner les cases une à une.

<div class="array-strip"><span>31</span><span>8</span><span>54</span><span>17</span><span>92</span><span>6</span><span>40</span><span>25</span></div>

La <strong>fouille linéaire</strong>, aussi appelée séquentielle :

1. commence à l’indice zéro;
2. compare chaque élément à la cible;
3. s’arrête dès qu’une égalité est trouvée;
4. conclut à l’absence après la dernière case.

---

<!-- .slide: class="compact" -->

## Algorithme de fouille linéaire

```c
size_t fouille_lineaire(const int valeurs[],
                        size_t nombre, int cible)
{
    for (size_t i = 0; i < nombre; ++i) {
        if (valeurs[i] == cible) {
            return i;
        }
    }

    return nombre;
}
```

Le paramètre <code>const</code> annonce que la fouille ne modifie pas le tableau.

---

## Tracer la fouille de 92

<div class="array-strip"><span class="active">31<small>0</small></span><span>8<small>1</small></span><span>54<small>2</small></span><span>17<small>3</small></span><span>92<small>4</small></span><span>6<small>5</small></span><span>40<small>6</small></span><span>25<small>7</small></span></div>

<div class="array-strip"><span>31<small>0</small></span><span>8<small>1</small></span><span class="active">54<small>2</small></span><span>17<small>3</small></span><span>92<small>4</small></span><span>6<small>5</small></span><span>40<small>6</small></span><span>25<small>7</small></span></div>

<div class="array-strip"><span>31<small>0</small></span><span>8<small>1</small></span><span>54<small>2</small></span><span>17<small>3</small></span><span class="sorted">92<small>4</small></span><span>6<small>5</small></span><span>40<small>6</small></span><span>25<small>7</small></span></div>

La fonction retourne <code>4</code> après cinq comparaisons.

---

## Coût de la fouille linéaire

<div class="comparison">
  <div><h3>Meilleur cas</h3><p>La cible occupe la première case : une comparaison.</p></div>
  <div><h3>Pire cas</h3><p>La cible est absente ou occupe la dernière case : <code>nombre</code> comparaisons.</p></div>
</div>

- temps proportionnel au nombre d’éléments : <code>O(n)</code>;
- mémoire supplémentaire constante : <code>O(1)</code>;
- aucune condition sur l’ordre du tableau.

---

## Fouille binaire · Précondition

La fouille binaire élimine la moitié des candidats à chaque comparaison.

<div class="array-strip"><span>10</span><span>20</span><span>30</span><span>40</span><span>50</span><span>60</span><span>70</span><span>80</span><span>90</span></div>

Elle exige un tableau <strong>trié selon le même ordre</strong> que celui utilisé pour comparer les valeurs.

<p class="warning">Sur un tableau non ordonné, l’algorithme peut déclarer absente une valeur pourtant présente.</p>

---

## Conserver un intervalle de candidats

On maintient l’intervalle demi-ouvert <code>[debut, fin)</code> :

- <code>debut</code> est le premier indice encore possible;
- <code>fin</code> est le premier indice exclu;
- si la cible existe, elle se trouve toujours dans cet intervalle.

```c
size_t milieu = debut + (fin - debut) / 2;
```

Après la comparaison au milieu, on conserve uniquement la moitié qui peut encore contenir la cible.

<p class="definition"><strong>Invariant :</strong> toutes les positions encore possibles se trouvent dans <code>[debut, fin)</code>.</p>

---

<!-- .slide: class="compact" -->

## Algorithme de fouille binaire

```c
size_t fouille_binaire(const int valeurs[], size_t nombre, int cible)
{
    size_t debut = 0, fin = nombre;

    while (debut < fin) {
        size_t milieu = debut + (fin - debut) / 2;

        if (valeurs[milieu] == cible) return milieu;

        if (valeurs[milieu] < cible) {
            debut = milieu + 1;
        } else {
            fin = milieu;
        }
    }

    return nombre;
}
```

---

## Tracer la fouille de 70

| Intervalle | Milieu | Valeur | Décision |
|---|---:|---:|---|
| <code>[0, 9)</code> | 4 | 50 | conserver <code>[5, 9)</code> |
| <code>[5, 9)</code> | 7 | 80 | conserver <code>[5, 7)</code> |
| <code>[5, 7)</code> | 6 | 70 | retourner <code>6</code> |

<div class="array-strip"><span>10</span><span>20</span><span>30</span><span>40</span><span>50</span><span>60</span><span class="sorted">70<small>6</small></span><span>80</span><span>90</span></div>

Trois comparaisons suffisent ici, contre sept avec une fouille linéaire depuis le début.

---

## Linéaire ou binaire ?

| Situation | Choix naturel | Coût de la fouille |
|---|---|---:|
| tableau non ordonné | linéaire | <code>O(n)</code> |
| tableau trié, une seule fouille | linéaire ou binaire | selon le contexte |
| tableau trié, fouilles répétées | binaire | <code>O(log n)</code> chacune |

Dans un million d’éléments triés, la fouille binaire demande environ 20 itérations au pire.

<p class="callout small">Trier uniquement pour effectuer une seule fouille peut coûter plus cher qu’un parcours linéaire.</p>

---

## Cas à tester

Pour chaque algorithme, vérifier :

- un tableau vide;
- une cible en première et en dernière position;
- une cible absente;
- plusieurs occurrences de la cible;
- un tableau réduit à une case.

Pour la fouille binaire, vérifier aussi la précondition de tri.

<p class="warning small">Avec des doublons, ces fonctions retournent une occurrence, pas nécessairement la première.</p>
