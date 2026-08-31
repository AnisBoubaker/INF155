<!-- .slide: class="chapter" -->

<p class="section-kicker">06 · Communiquer avec l’usager</p>

# Les entrées et les sorties

<p class="lede">Lire des données depuis la console, effectuer un traitement puis afficher le résultat.</p>

---

## Pourquoi les entrées/sorties ?

La plupart des programmes interagissent avec leur environnement.

<div class="io-loop">
  <img src="assets/utilisateur.png" alt="Icône représentant un utilisateur">
  <div class="io-arrows">
    <span>Entrées →</span>
    <span>← Sorties</span>
  </div>
  <img src="assets/ordinateur.png" alt="Icône représentant un ordinateur">
</div>

<div class="comparison">
  <div><h3>Entrée</h3><p>Une donnée fournie au programme pour effectuer un traitement.</p></div>
  <div><h3>Sortie</h3><p>Une information produite par le programme et présentée à l’usager (ex.: écran, fichier, courriel, ...)</p></div>
</div>
<p class="callout small">
<strong>Les entrées</strong> peuvent provenir du clavier, d'un fichier, du réseau etc. <strong>Les sorties</strong> peuvent être à l'écran, au clavier, sur le réseau, etc.
</p>

---

## Entrées/sorties de base

Les fonctions de console utilisées ici sont déclarées dans l’en-tête <code>stdio.h</code>.

```c
#include <stdio.h>
```

<div class="cards">
  <div class="card">
    <h3><code>printf</code></h3>
    <p>Écrit une chaîne formatée sur la sortie standard.</p>
  </div>
  <div class="card">
    <h3><code>scanf</code></h3>
    <p>Lit des valeurs formatées depuis l’entrée standard.</p>
  </div>
  <div class="card">
    <h3><code>stdio</code></h3>
    <p>Signifie « standard input/output ».</p>
  </div>
</div>

---

## L’instruction `printf`

<p class="small">La fonction <code>printf</code> compose une sortie à partir d’une chaîne de format et de valeurs.</p>

```c
printf("Ceci est mon premier programme!\n");

printf("Votre salaire est de %.2f $\n", salaire);

printf("Salaire : %.2f $, heures supplémentaires : %d\n",
       salaire,
       nb_heures_supp);
```

<p class="callout small">Chaque spécificateur de format doit correspondre au type de l’argument associé.</p>

---

## Formats fréquents

| Type de valeur | Format courant pour `printf` | Format courant pour `scanf` |
|---|---:|---:|
| `char` | `%c` | `%c` |
| `short` | `%hd` | `%hd` |
| `unsigned int` | `%u` | `%u` |
| `int` | `%d` ou `%i` | `%d` ou `%i` |
| `long` | `%ld` | `%ld` |
| `float` | `%f`* | `%f` |
| `double` | `%f`* | `%lf` |

<p class="tiny">* Avec <code>printf</code>, un argument <code>float</code> est promu en <code>double</code>. Des modificateurs permettent de régler largeur et précision, par exemple <code>%.2f</code>.</p>

---

## Caractères d’échappement

| Séquence | Signification |
|---|---|
| `\n` | Saut de ligne |
| `\t` | Tabulation horizontale |
| `\r` | Retour au début de la ligne |
| `\b` | Retour arrière |
| `\\` | Barre oblique inverse `\` |
| `\'` | Apostrophe |
| `\"` | Guillemet double |
| `\0` | Caractère nul, utilisé pour terminer une chaîne C |

```c
printf("Nom\tNote\nAlice\t92\n");
```

---

## L’instruction `scanf`

```c
int age;

printf("Votre âge : ");
scanf("%d", &age);
```

- La chaîne de format décrit la valeur attendue.
- L’adresse de la variable indique où stocker la valeur lue.
- Pour une variable scalaire, le <code>&</code> avant le nom est essentiel.
- La valeur de retour de <code>scanf</code> indique combien de conversions ont réussi.

```c
if (scanf("%d", &age) != 1) {
    printf("Entrée invalide.\n");
}
```

---

<!-- .slide: class="chapter" -->

<p class="section-kicker">Démonstration · <code>effectuer_achat.c</code></p>

# Lire, calculer, afficher

```c
double sous_total;

printf("Sous-total : ");
scanf("%lf", &sous_total);

double taxes = sous_total * taux;
double total = sous_total + taxes;

printf("Total : %.2f $\n", total);
```

