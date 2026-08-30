<!-- .slide: class="chapter" -->

<p class="section-kicker">04 · Une relation étroite</p>

# Tableaux et pointeurs

<p class="lede">Dans la plupart des expressions, un tableau est converti en pointeur vers son premier élément.</p>

---

## Tableau et première case

```c
int valeurs[5] = {10, 20, 30, 40, 50};
int *ptr = valeurs;
```

<div class="array-strip"><span class="active">10<small>0</small></span><span>20<small>1</small></span><span>30<small>2</small></span><span>40<small>3</small></span><span>50<small>4</small></span></div>

Dans ce contexte :

```c
valeurs == &valeurs[0]  // comparaison vraie
```

<p class="tiny">Un tableau n’est toutefois pas une variable pointeur : il ne peut pas être réaffecté.</p>

---

## Indexation et déréférencement

Pour un pointeur <code>ptr</code> vers le premier élément :

```c
ptr[0] == *ptr
ptr[2] == *(ptr + 2)
valeurs[i] == *(valeurs + i)
```

L’écriture avec crochets est généralement plus lisible pour parcourir un tableau.

---

## Arithmétique des pointeurs

Si <code>ptr</code> pointe vers un <code>int</code>, <code>ptr + 1</code> désigne l’élément suivant — pas l’octet suivant.

<div class="pointer-flow"><span><code>ptr</code><small><code>&valeurs[0]</code></small></span><b>+ 1 →</b><span><code>ptr + 1</code><small><code>&valeurs[1]</code></small></span></div>

L’incrément est automatiquement adapté à <code>sizeof *ptr</code>.

---

## Limites de l’arithmétique

L’arithmétique est définie seulement :

- à l’intérieur d’un même tableau;
- ou jusqu’à l’adresse située juste après sa dernière case, sans la déréférencer.

```c
int *debut = valeurs;
int *fin = valeurs + 5;

for (int *p = debut; p != fin; ++p) {
    printf("%d\n", *p);
}
```

---

## Parcourir un tableau

<!-- .slide: class="code-compare" -->

### Avec un indice

### Avec un pointeur

```c
for (size_t i = 0; i < 5; ++i) {
    printf("%d\n", valeurs[i]);
}
```

```c
for (int *p = valeurs; p != valeurs + 5; ++p) {
    printf("%d\n", *p);
}
```

<p class="callout">Les deux formes sont valides; choisir celle qui exprime le mieux l’intention.</p>

---

## Tableau en paramètre

Ces deux prototypes déclarent le même type de paramètre :

```c
double moyenne(const int valeurs[], size_t taille);
double moyenne(const int *valeurs, size_t taille);
```

La fonction reçoit un pointeur, pas une copie du tableau. Elle doit donc recevoir séparément le nombre d’éléments accessibles.

---

## Ne pas retourner un tableau local

```c
int *creer_tableau(void)
{
    int valeurs[3] = {10, 20, 30};
    return valeurs;  // erreur conceptuelle : durée de vie terminée
}
```

À la sortie, <code>valeurs</code> n’existe plus. Le pointeur retourné devient invalide.

<p class="warning">Ne jamais retourner l’adresse d’une variable locale automatique.</p>

---

<!-- .slide: class="chapter" -->

<p class="section-kicker">À retenir</p>

# Une adresse n’est utile que si elle reste valide

<ol class="plan">
  <li>Initialiser les pointeurs.</li>
  <li>Tester les valeurs potentiellement nulles.</li>
  <li>Déréférencer seulement un objet vivant et compatible.</li>
  <li>Transmettre la taille avec tout tableau.</li>
</ol>
