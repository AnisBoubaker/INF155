<!-- .slide: class="chapter" -->

<p class="section-kicker">02 · Accéder sans dépasser</p>

# Manipuler un tableau

<p class="lede">Un indice désigne exactement une case.</p>

---

## Accéder à une case

```c
int notes[8] = {0};

notes[5] = 25;
printf("%d\n", notes[5]);
```

<div class="array-strip"><span>0<small>0</small></span><span>0<small>1</small></span><span>0<small>2</small></span><span>0<small>3</small></span><span>0<small>4</small></span><span class="active">25<small>5</small></span><span>0<small>6</small></span><span>0<small>7</small></span></div>

<p class="callout">Pour <code>N</code> cases, les indices valides vont de <code>0</code> à <code>N - 1</code>.</p>

---

## Dépasser les limites

```c
int notes[8];
notes[100] = 42;  // comportement indéfini
```

Le langage C ne vérifie généralement pas les limites à l’exécution. Un dépassement peut :

- écraser une autre donnée;
- produire un résultat incohérent;
- provoquer une panne;
- sembler fonctionner, puis échouer plus tard.

<p class="warning">« Le compilateur l’accepte » ne signifie pas « l’accès est valide ».</p>

---

## Parcourir toutes les cases

```c
enum { NB_NOTES = 8 };
int notes[NB_NOTES] = {70, 89, 72, 65, 92, 77, 81, 78};

for (size_t i = 0; i < NB_NOTES; ++i) {
    printf("notes[%zu] = %d\n", i, notes[i]);
}
```

La condition utilise <code>&lt;</code>, car <code>NB_NOTES</code> n’est pas un indice valide.

---

## Calculer une somme et une moyenne

```c
int somme = 0;

for (size_t i = 0; i < NB_NOTES; ++i) {
    somme += notes[i];
}

double moyenne = (double)somme / NB_NOTES;
```

L’accumulateur <code>somme</code> conserve le résultat partiel pendant le parcours.

---

## Obtenir la taille dans sa portée

```c
int valeurs[20];

size_t octets = sizeof valeurs;
size_t nombre = sizeof valeurs / sizeof valeurs[0];
```

<div class="formula"><code>nombre d’éléments</code><span>=</span><code>taille du tableau</code><span>÷</span><code>taille d’une case</code></div>

<p class="callout small">Cette formule fonctionne seulement là où l’objet est encore réellement un tableau.</p>

---

## Exercice · Filtrer des notes

Avec :

```c
int notes[] = {70, 89, 72, 65, 92, 77, 81, 78};
```

Écrire un programme qui :

1. affiche toutes les notes strictement supérieures à 80;
2. compte combien de notes satisfont le critère;
3. affiche la plus grande note.

---

## Exercice · Suite de Fibonacci

Construire les 100 premiers termes dans un tableau :

```text
F(0) = 0
F(1) = 1
F(n) = F(n - 1) + F(n - 2)
```

Questions à traiter :

- quel type peut retarder le débordement ?
- à partir de quel indice le type choisi déborde-t-il ?
- comment afficher chaque terme avec son indice ?
