<!-- .slide: class="chapter" -->

<p class="section-kicker">01 · Une collection homogène</p>

# Les tableaux 1D

<p class="lede">Des cases contiguës, de même type, accessibles par un indice.</p>

---

## Une variable ne suffit plus

Une variable scalaire mémorise une seule valeur. Or, un programme doit souvent traiter :

- les notes d’un groupe;
- une suite de températures;
- les termes d’une série;
- les mesures recueillies par un capteur.

<p class="definition"><strong>Tableau :</strong> suite d’objets de même type placés consécutivement en mémoire.</p>

---

## Anatomie d’un tableau

```c
int notes[8] = {70, 89, 72, 65, 92, 77, 81, 78};
```

<div class="array-strip"><span>70<small>0</small></span><span>89<small>1</small></span><span>72<small>2</small></span><span>65<small>3</small></span><span>92<small>4</small></span><span>77<small>5</small></span><span>81<small>6</small></span><span>78<small>7</small></span></div>

- huit objets de type <code>int</code>;
- indices de <code>0</code> à <code>7</code>;
- espace mémoire réservé en un seul bloc.

---

## Déclarer un tableau

```c
type identifiant[nombre_elements];
```

Exemples :

```c
int notes[8];
double temperatures[80];
char reponses[20];
```

La taille fait partie du type de l’objet tableau et ne peut pas être modifiée après sa création.

---

## Initialiser un tableau

```c
int notes[8] = {70, 89, 72, 65, 92, 77, 81, 78};
double mesures[5] = {10.3, 20.0, 0.5};
```

Les cases non précisées d’une initialisation partielle valent zéro.

```c
int compteurs[100] = {0};  // toutes les cases à zéro
```

---

## Laisser le compilateur compter

La taille peut être omise lorsqu’une liste d’initialisation complète est fournie.

```c
double rabais[] = {0.0, 8.5, 12.5, 20.0};
char mot[] = {'I', 'N', 'F', '1', '5', '5'};
```

Le premier tableau contient 4 éléments; le second, 6.

<p class="callout small">Cette technique évite de synchroniser manuellement la taille et la liste.</p>
