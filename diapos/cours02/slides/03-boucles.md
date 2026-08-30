<!-- .slide: class="chapter" -->

<p class="section-kicker">03 · Répéter un traitement</p>

# Les boucles

<p class="lede">Répéter un bloc tant qu’une condition le demande.</p>

---

## Qu’est-ce qu’une boucle ?

Une boucle exécute plusieurs fois une portion de code.

<div class="loop-cycle" aria-label="Cycle d’une boucle">
  <span>Évaluer la condition</span><b>→</b><span>Exécuter le corps</span><b>→</b><span>Faire progresser l’état</span><b>↺</b>
</div>

<p class="definition"><strong>Invariant essentiel :</strong> l’état du programme doit évoluer de façon à rendre éventuellement la condition fausse.</p>

---

## Trois formes de boucles

<div class="cards">
  <div class="card"><h3><code>while</code></h3><p>Tester avant chaque répétition. Peut s’exécuter zéro fois.</p></div>
  <div class="card"><h3><code>do…while</code></h3><p>Tester après chaque répétition. S’exécute au moins une fois.</p></div>
  <div class="card"><h3><code>for</code></h3><p>Regrouper initialisation, condition et progression.</p></div>
</div>

<p class="callout">Choisir la forme qui exprime le plus clairement l’intention.</p>

---

## Boucle <code>while</code>

```c
while (condition) {
    // traitement répété tant que la condition est vraie
}
```

<ol>
  <li>Évaluer la condition.</li>
  <li>Si elle est fausse, quitter la boucle.</li>
  <li>Sinon, exécuter le corps puis revenir à l’étape 1.</li>
</ol>

<p class="callout small">Comme la condition est testée avant le corps, celui-ci peut ne jamais être exécuté.</p>

---

<!-- .slide: class="compact" -->

## Exemple · Calculer une factorielle

```c
int nombre;
unsigned long long factorielle = 1;
int compteur = 1;

printf("Saisir un entier entre 0 et 20 : ");
scanf("%d", &nombre);

while (compteur <= nombre) {
    factorielle *= compteur;
    compteur++;
}

printf("%d! = %llu\n", nombre, factorielle);
```

<p class="callout small">À chaque tour, <code>compteur</code> se rapproche de la borne <code>nombre</code>.</p>

---

## Exemple · Une condition qui dépend de la saisie

Que pensez-vous de cet exemple ?

```c
float temperature;
float puissance = 0.0f;

printf("Veuillez saisir la température : ");
scanf("%f", &temperature);

while (temperature < 25.0f) {
    puissance++;
}
```

<p class="warning"><strong>Problème :</strong> ni <code>temperature</code> ni la condition ne changent dans la boucle. Si la température initiale est inférieure à 25, la boucle est infinie.</p>

---

## Boucles infinies

Une boucle ne s’arrête jamais lorsque sa condition ne devient jamais fausse.

Causes fréquentes :

- oublier l’incrément ou la mise à jour;
- mettre à jour la mauvaise variable;
- choisir une condition impossible à atteindre;
- utiliser accidentellement <code>=</code> au lieu de <code>==</code>.

<p class="definition"><strong>Question de contrôle :</strong> quelle instruction du corps rapproche la boucle de sa terminaison ?</p>

---

## Exercice · Chercher un divisible

Saisir deux entiers :

- une borne <code>n</code>;
- un diviseur non nul <code>div</code>.

Afficher le plus grand entier inférieur ou égal à <code>n</code> qui est divisible par <code>div</code>.

```text
Entrée : n = 26, div = 7
Sortie : 21
```

<p class="callout small">Commencer à <code>n</code> et diminuer jusqu’à obtenir un reste nul.</p>

---

## Boucle <code>do…while</code>

```c
do {
    // traitement exécuté au moins une fois
} while (condition);
```

La condition est évaluée <strong>après</strong> le corps.

<p class="warning"><strong>Syntaxe :</strong> ne pas oublier le point-virgule après <code>while (condition);</code></p>

---

## Exemple · Valider une saisie

```c
char choix;

do {
    printf("Choisir A, B ou C : ");
    scanf(" %c", &choix);
} while (choix != 'A' && choix != 'B' && choix != 'C');

printf("Choix valide : %c\n", choix);
```

<p class="callout"><code>do…while</code> convient bien lorsqu’une première saisie est toujours nécessaire.</p>

---

## Exercice · Somme d’une suite

Sans utiliser la formule de sommation, écrire un programme qui calcule :

```text
0 + 1 + 2 + … + n
```

Déterminer :

- l’état initial de la somme;
- la variable qui parcourt la suite;
- la condition d’arrêt;
- l’instruction de progression.

<p class="callout small">Tester notamment <code>n = 0</code>, <code>n = 1</code> et une valeur plus grande.</p>

---

## Boucle <code>for</code>

```c
for (initialisation; condition; progression) {
    // traitement répété
}
```

<div class="flow-list flow-list--compact">
  <div><strong>1</strong><span>Exécuter l’initialisation une seule fois.</span></div>
  <div><strong>2</strong><span>Tester la condition avant chaque tour.</span></div>
  <div><strong>3</strong><span>Exécuter le corps si elle est vraie.</span></div>
  <div><strong>4</strong><span>Exécuter la progression, puis revenir au test.</span></div>
</div>

<p class="callout small"><code>for</code> est particulièrement lisible lorsque le nombre de répétitions est déterminé par un compteur.</p>

---

## Exemple · Répéter un nombre défini de fois

```c
int maximum = 20;

for (int i = 0; i < maximum; i++) {
    printf("Répétition %d\n", i + 1);
}

printf("Terminé !\n");
```

<div class="comparison">
  <div><h3>Première valeur</h3><p><code>i = 0</code></p></div>
  <div><h3>Dernière valeur utilisée</h3><p><code>i = 19</code></p></div>
</div>

---

## Exercice · Factorielle avec <code>for</code>

Réécrire le calcul de la factorielle avec une boucle <code>for</code>.

```c
unsigned long long factorielle = 1;

for (/* à compléter */) {
    /* à compléter */
}
```

Vérifier les résultats :

- <code>0! = 1</code>;
- <code>1! = 1</code>;
- <code>5! = 120</code>.

---

<!-- .slide: class="chapter" -->

<p class="section-kicker">Avant le laboratoire</p>

# Consolider par la pratique

<ol class="plan">
  <li>Évaluer des expressions en respectant les priorités.</li>
  <li>Transformer une décision en <code>if</code> ou en <code>switch</code>.</li>
  <li>Identifier l’état, la condition et la progression d’une boucle.</li>
  <li>Réécrire la factorielle avec <code>while</code>, puis avec <code>for</code>.</li>
</ol>
