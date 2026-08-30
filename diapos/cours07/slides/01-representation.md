<!-- .slide: class="chapter" -->

<p class="section-kicker">01 · Du caractère au texte</p>

# Représenter une chaîne

<p class="lede">Le langage C ne possède pas de type chaîne intégré.</p>

---

## Un caractère est un entier

```c
char lettre = 'A';

printf("%c\n", lettre);  // A
printf("%d\n", lettre);  // code de A dans le jeu d'exécution
```

Les apostrophes représentent un caractère; les guillemets représentent une chaîne.

<p class="tiny">Le C n’impose pas ASCII à toutes les implémentations, même si ASCII et UTF-8 sont courants.</p>

---

## Une chaîne est un tableau de <code>char</code>

```c
char cours[] = "INF155";
```

<div class="array-strip"><span>I<small>0</small></span><span>N<small>1</small></span><span>F<small>2</small></span><span>1<small>3</small></span><span>5<small>4</small></span><span>5<small>5</small></span><span class="terminal">\0<small>6</small></span></div>

La taille du tableau est 7, mais la longueur du texte est 6.

---

## Le zéro terminal

Une chaîne C valide se termine par le caractère nul <code>'\0'</code>, dont la valeur est zéro.

```c
char cours[7] = {'I', 'N', 'F', '1', '5', '5', '\0'};
```

Les fonctions de chaîne parcourent les caractères jusqu’à ce marqueur. Sans lui, elles lisent au-delà du tableau : comportement indéfini.

---

## Initialisation idiomatique

```c
char message[] = "Allô le monde!";
```

Le compilateur :

- réserve la taille nécessaire;
- copie les caractères du littéral;
- ajoute le zéro terminal;
- crée un tableau modifiable.

---

## Modifier un tableau de caractères

```c
char message[] = "Allo le monde!";

message[3] = 'ô';
message[7] = 'M';
```

Chaque case peut être modifiée tant que l’indice demeure valide et que le zéro terminal est préservé.

<p class="warning small">Avec UTF-8, un caractère accentué peut occuper plusieurs octets; l’indexation porte sur des octets, pas nécessairement sur des caractères affichés.</p>

---

## Littéral de chaîne et pointeur

```c
const char *message = "Allô le monde!";
```

Le pointeur peut être réaffecté pour désigner un autre texte, mais le littéral ne doit pas être modifié.

```c
message = "Bonjour";  // permis
message[0] = 'b';      // interdit par const
```

---

<!-- .slide: class="code-compare" -->

## Deux formes, deux intentions

### Texte modifiable

### Texte en lecture seule

```c
char nom[] = "Ada";
nom[0] = 'E';
```

```c
const char *nom = "Ada";
nom = "Edsger";
```

<p class="callout">Choisir la représentation selon la propriété et la mutabilité requises.</p>
