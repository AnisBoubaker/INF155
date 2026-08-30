<!-- .slide: class="chapter" -->

<p class="section-kicker">02 · Choisir un chemin</p>

# Les structures conditionnelles

<p class="lede">Exécuter un bloc seulement lorsqu’une condition est vraie.</p>

---

## Modifier l’ordre d’exécution

Par défaut, les instructions sont exécutées séquentiellement, du haut vers le bas.

Une structure conditionnelle permet de décider :

- si un bloc doit être exécuté;
- lequel de plusieurs blocs doit être exécuté;
- quelles instructions doivent être ignorées.

<p class="definition"><strong>Condition :</strong> une expression interprétée comme fausse si elle vaut <code>0</code>, vraie autrement.</p>

---

## Structure <code>if…else</code>

```c
if (condition) {
    // exécuté si la condition est vraie
} else {
    // exécuté sinon
}
```

<div class="comparison">
  <div><h3>Condition vraie</h3><p>Le bloc du <code>if</code> est exécuté.</p></div>
  <div><h3>Condition fausse</h3><p>Le bloc du <code>else</code> est exécuté, s’il existe.</p></div>
</div>

<p class="callout small">Le <code>else</code> est optionnel. Les accolades sont recommandées même pour une seule instruction.</p>

---

## Exemple · Tester la divisibilité

```c
int valeur1 = 10;
int valeur2 = 3;

if (valeur1 % valeur2 == 0) {
    printf("%d est divisible par %d\n", valeur1, valeur2);
} else {
    printf("%d n'est pas divisible par %d\n", valeur1, valeur2);
}
```

<p class="callout small">Le reste d’une division exacte est zéro.</p>

---

## Imbrications

Une structure conditionnelle peut être placée à l’intérieur d’une autre.

```c
if (valeur1 % valeur2 == 0) {
    printf("Divisible par %d\n", valeur2);
} else {
    if (valeur1 % valeur3 == 0) {
        printf("Mais divisible par %d\n", valeur3);
    }
}
```

<p class="warning small"><strong>Lisibilité :</strong> lorsque l’imbrication devient profonde, chercher une décomposition plus simple.</p>

---

## Exercice · Situer un point

Écrire un programme qui saisit les coordonnées <code>x</code> et <code>y</code> d’un point, puis indique son emplacement.

<div class="quadrants" aria-label="Plan cartésien et numéros des quadrants">
  <span class="q q2">2</span><span class="q q1">1</span>
  <span class="axis axis-x"></span><span class="axis axis-y"></span>
  <span class="q q3">3</span><span class="q q4">4</span>
</div>

Le programme doit aussi distinguer :

- l’axe horizontal;
- l’axe vertical;
- l’origine.

---

<!-- .slide: class="compact" -->

## Plusieurs choix avec <code>else if</code>

```c
char choix;
printf("Pressez A, B ou C : ");
scanf(" %c", &choix);

if (choix == 'A') {
    printf("Vous avez choisi A.\n");
} else if (choix == 'B') {
    printf("Vous avez choisi B.\n");
} else if (choix == 'C') {
    printf("Vous avez choisi C.\n");
} else {
    printf("Choix invalide.\n");
}
```

<p class="callout small">L’espace avant <code>%c</code> demande à <code>scanf</code> d’ignorer les espaces et retours de ligne restants.</p>

---

## Le sélecteur <code>switch</code>

Lorsque la décision compare une même expression à plusieurs valeurs entières constantes, <code>switch</code> peut être plus lisible.

```c
switch (choix) {
    case 'A':
        // traitement A
        break;
    case 'B':
        // traitement B
        break;
    default:
        // aucun cas précédent
}
```

<p class="callout small"><code>default</code> est optionnel, mais utile pour traiter les valeurs inattendues.</p>

---

## Fonctionnement de <code>switch</code>

<div class="flow-list">
  <div><strong>1</strong><span>Évaluer l’expression une seule fois.</span></div>
  <div><strong>2</strong><span>Trouver le premier <code>case</code> égal à sa valeur.</span></div>
  <div><strong>3</strong><span>Exécuter les instructions à partir de ce cas.</span></div>
  <div><strong>4</strong><span>Continuer jusqu’à un <code>break</code> ou la fin du <code>switch</code>.</span></div>
</div>

<p class="warning"><strong>Sans <code>break</code> :</strong> l’exécution se poursuit dans les cas suivants. Ce comportement s’appelle le <em>fallthrough</em>.</p>

---

<!-- .slide: class="compact" -->

## Exercice · Que se passe-t-il sans <code>break</code> ?

Si l’utilisateur saisit <code>B</code>, quelles lignes seront affichées ?

```c
switch (choix) {
    case 'A':
        printf("Vous avez choisi A.\n");
    case 'B':
        printf("Vous avez choisi B.\n");
    case 'C':
        printf("Vous avez choisi C.\n");
    default:
        printf("Fin du sélecteur.\n");
}
```

<p class="callout small">Suivre le point d’entrée, puis descendre instruction par instruction.</p>

---

## L’instruction <code>break</code>

<code>break</code> termine immédiatement le <code>switch</code> englobant.

```c
case 'B':
    printf("Vous avez choisi B.\n");
    break;
```

On la rencontrera aussi dans les boucles, où elle permet de quitter la boucle la plus proche.

<p class="definition"><strong>Dans un sélecteur classique :</strong> terminer chaque cas par <code>break</code>, sauf si le passage au cas suivant est intentionnel et clairement commenté.</p>

---

## <code>switch</code> avec ruptures

<div class="flow-list flow-list--compact">
  <div><strong>cas A</strong><span>Exécuter A → <code>break</code> → sortir</span></div>
  <div><strong>cas B</strong><span>Exécuter B → <code>break</code> → sortir</span></div>
  <div><strong>cas C</strong><span>Exécuter C → <code>break</code> → sortir</span></div>
  <div><strong>défaut</strong><span>Traiter toute autre valeur → sortir</span></div>
</div>

<p class="callout"><strong>Une seule branche</strong> est alors exécutée pour chaque passage dans le sélecteur.</p>
