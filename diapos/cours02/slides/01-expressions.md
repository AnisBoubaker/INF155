<!-- .slide: class="chapter" -->

<p class="section-kicker">01 · Calculer une valeur</p>

# Les expressions

<p class="lede">Combiner des opérandes et des opérateurs pour produire une valeur.</p>

---

## Qu’est-ce qu’une expression ?

Une expression combine des <strong>opérandes</strong> — variables, constantes ou autres expressions — avec des <strong>opérateurs</strong>.

```c
2.0 * PI * rayon
```

<div class="comparison">
  <div><h3>Valeur</h3><p>Toute expression évaluée produit une valeur.</p></div>
  <div><h3>Effet de bord</h3><p>Certaines expressions modifient aussi l’état du programme : affectation, incrément ou appel de fonction.</p></div>
</div>

<p class="callout small">Une expression suivie d’un point-virgule devient une <strong>instruction-expression</strong> : <code>total = prix * quantite;</code></p>

---

## Expressions simples et composées

```c
a + b                    // simple
resultat = (a + b * 2.3) / 10.0;  // composée
```

<ul>
  <li>L’ordre d’évaluation dépend de la <strong>priorité</strong> et de l’<strong>associativité</strong> des opérateurs.</li>
  <li>Les parenthèses rendent l’ordre explicite et améliorent la lisibilité.</li>
</ul>

<div class="cards">
  <div class="card"><h3>Unaire</h3><p><code>-a</code>, <code>!valide</code>, <code>i++</code></p></div>
  <div class="card"><h3>Binaire</h3><p><code>a / b</code>, <code>x = 25</code></p></div>
  <div class="card"><h3>Ternaire</h3><p><code>a &lt; b ? a : b</code></p></div>
</div>

---

## Opérateurs arithmétiques

| Opérateur | Opération | Exemple | Point d’attention |
|---|---|---|---|
| <code>+</code> | addition | <code>x + y</code> | — |
| <code>-</code> | soustraction | <code>x - y</code> | aussi négation unaire |
| <code>*</code> | multiplication | <code>x * y</code> | — |
| <code>/</code> | division | <code>x / y</code> | division entière si les deux opérandes sont entiers |
| <code>%</code> | reste entier | <code>x % y</code> | opérandes entiers |

```c
7 / 2      // 3
7.0 / 2    // 3.5
7 % 2      // 1
```

---

## Incrément postfixé

Avec la forme postfixée, la valeur courante participe d’abord à l’expression, puis la variable est modifiée.

```c
taille = longueur * i++;
```

Équivalent, dans ce cas, à :

```c
taille = longueur * i;
i = i + 1;
```

<p class="callout small"><code>i++</code> a pour valeur l’ancienne valeur de <code>i</code>.</p>

---

## Incrément préfixé

Avec la forme préfixée, la variable est modifiée avant que sa nouvelle valeur participe à l’expression.

```c
taille = longueur * ++i;
```

Équivalent, dans ce cas, à :

```c
i = i + 1;
taille = longueur * i;
```

<p class="callout small"><code>++i</code> a pour valeur la nouvelle valeur de <code>i</code>.</p>

---

## Opérateurs de comparaison

| Opérateur | Signification |
|---|---|
| <code>&lt;</code>, <code>&lt;=</code> | inférieur, inférieur ou égal |
| <code>&gt;</code>, <code>&gt;=</code> | supérieur, supérieur ou égal |
| <code>==</code> | égalité |
| <code>!=</code> | différence |

```c
age >= 18       // vaut 0 ou 1
```

<p class="definition"><strong>En C :</strong> zéro signifie faux; toute valeur non nulle signifie vrai. Un opérateur de comparaison produit <code>0</code> ou <code>1</code>.</p>

---

## Opérateurs logiques

| Opérateur | Lecture | Résultat vrai lorsque… |
|---|---|---|
| <code>!</code> | NON | l’opérande est faux |
| <code>&amp;&amp;</code> | ET | les deux opérandes sont vrais |
| <code>\|\|</code> | OU | au moins un opérande est vrai |

```c
age >= 18 && permis_valide
temperature < 0 || precipitation
!erreur
```

<p class="callout small"><code>&amp;&amp;</code> et <code>||</code> utilisent l’<strong>évaluation court-circuitée</strong> : la seconde opérande peut ne pas être évaluée.</p>

---

## Opérateurs bit à bit

Ils traitent séparément chacun des bits de valeurs entières.

| Opérateur | Opération |
|---|---|
| <code>~</code> | NON bit à bit |
| <code>&amp;</code> | ET bit à bit |
| <code>\|</code> | OU bit à bit |
| <code>^</code> | OU exclusif bit à bit |
| <code>&lt;&lt;</code>, <code>&gt;&gt;</code> | décalage à gauche, à droite |

```c
unsigned masque = 0x0F;
unsigned resultat = valeur & masque;
```

<p class="callout small">Ne pas confondre <code>&amp;</code> avec <code>&amp;&amp;</code>, ni <code>|</code> avec <code>||</code>.</p>

---

## Rappel · Tables de vérité

<div class="truth-grid">
  <div><h3>NON</h3><table><tr><th>X</th><th>!X</th></tr><tr><td>0</td><td>1</td></tr><tr><td>1</td><td>0</td></tr></table></div>
  <div><h3>ET</h3><table><tr><th>X</th><th>Y</th><th>X &amp;&amp; Y</th></tr><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td>1</td></tr></table></div>
  <div><h3>OU</h3><table><tr><th>X</th><th>Y</th><th>X || Y</th></tr><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td></tr></table></div>
  <div><h3>OU exclusif</h3><table><tr><th>X</th><th>Y</th><th>X ^ Y</th></tr><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>0</td></tr></table></div>
</div>

---

## Opérateurs d’affectation

| Forme composée | Équivalent conceptuel |
|---|---|
| <code>x += y</code> | <code>x = x + y</code> |
| <code>x -= y</code> | <code>x = x - y</code> |
| <code>x *= y</code> | <code>x = x * y</code> |
| <code>x /= y</code> | <code>x = x / y</code> |
| <code>x %= y</code> | <code>x = x % y</code> |

<p class="definition"><code>=</code> affecte une valeur; <code>==</code> compare deux valeurs.</p>

---

<!-- .slide: class="compact" -->

## Priorité des opérateurs <span class="small">(résumé)</span>

Du plus prioritaire au moins prioritaire :

| Niveau | Opérateurs | Associativité |
|---|---|---|
| Postfixé | <code>() [] . -&gt; x++ x--</code> | gauche → droite |
| Unaire | <code>! ~ ++x --x + - * &amp; sizeof</code> | droite → gauche |
| Multiplicatif | <code>* / %</code> | gauche → droite |
| Additif | <code>+ -</code> | gauche → droite |
| Comparaison | <code>&lt; &lt;= &gt; &gt;= == !=</code> | gauche → droite |
| Logique | <code>&amp;&amp;</code>, puis <code>||</code> | gauche → droite |
| Ternaire | <code>?:</code> | droite → gauche |
| Affectation | <code>= += -= *= /= …</code> | droite → gauche |

<p class="callout small"><strong>Réflexe :</strong> parenthéser lorsqu’un lecteur pourrait hésiter.</p>

---

<!-- .slide: class="compact" -->

## Exercice · Évaluer des expressions

Soit :

```c
int a = 20, b = 5, c = -10, d = 2, x = 12, y = 15;
```

Déterminer la valeur de chaque expression et les variables modifiées :

```c
(5 * x) + 2 * ((3 * b) + 4)
a == (b = 5)
a += x + 5
a != (c *= -d)
a && b || !0 && c && !d
(a++) * (++a + c)
```

<p class="warning small"><strong>Attention :</strong> la dernière expression modifie <code>a</code> plusieurs fois sans séquencement garanti; son comportement est indéfini en C. Elle sert à reconnaître un code à éviter.</p>

---

## Exercice · Une comparaison comme valeur

```c
int age;
int majeur;

printf("Veuillez saisir l'âge : ");
scanf("%d", &age);

majeur = age >= 18;
printf("Majeur = %d\n", majeur);
```

Quel résultat obtient-on si l’utilisateur saisit :

- <code>20</code> ?
- <code>15</code> ?

<p class="callout"><strong>À retenir :</strong> le résultat de <code>age &gt;= 18</code> peut être stocké dans une variable entière.</p>
