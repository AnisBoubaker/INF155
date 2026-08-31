<!-- .slide: class="chapter" -->

<p class="section-kicker">05 · Représenter les données</p>

# Les variables

<p class="lede">Une variable associe un nom, un type et un espace mémoire à une information que le programme peut manipuler.</p>

---

## Une variable, c’est… <span class="small">(vue pratique)</span>

- Une information stockée en mémoire pendant l’exécution du programme.
- Une information à laquelle on accède par un <strong>identifiant</strong>.
- Une valeur dont la nature et les valeurs possibles sont définies par un <strong>type</strong>.

```c
int age = 20;
double temperature = 22.3;
char reponse = 'O';
```

---

## Une variable, c’est… <span class="small">(vue technique)</span>

<div class="cards">
  <div class="card"><h3>Un nom</h3><p>L’identifiant utilisé dans le code source.</p></div>
  <div class="card"><h3>Une adresse</h3><p>L’emplacement où les octets sont stockés en mémoire.</p></div>
  <div class="card"><h3>Un type</h3><p>La manière d’interpréter ces octets et les opérations permises.</p></div>
</div>

<p class="definition"><strong>Le type</strong> détermine notamment la taille réservée, la représentation binaire et l’intervalle de valeurs.</p>

---

## Variables en mémoire <span class="small">(vue simplifiée)</span>

```c
int salaire = 1500;
```

<div class="two-col">
  <div>
    <div class="memory-strip">
      <div>00000000</div><div>00000000</div><div class="active">00000101</div><div class="active">11011100</div>
    </div>
    <p class="small">Les quatre octets représentent la valeur décimale <strong>1500</strong>.</p>
  </div>
  <div class="definition">
    <p><strong>Identifiant</strong> : <code>salaire</code></p>
    <p><strong>Adresse</strong> : par exemple <code>0x2A23</code></p>
    <p><strong>Taille typique</strong> : 4 octets pour un <code>int</code></p>
  </div>
</div>

---

## Déclaration d’une variable

Avant d’utiliser une variable, on doit la déclarer pour permettre au compilateur de connaître son nom et son type.

```text
type identifiant [= valeur_initiale];
```

```c
int credits = 4;
char note_finale;
double moyenne = 0.0;
```

<p class="small">Depuis C99, une déclaration peut être placée au plus près de sa première utilisation dans un bloc.</p>

---

## Identifiant d’une variable

Règles lexicales de base :

- lettres non accentuées, chiffres et caractère de soulignement <code>_</code>;
- ne commence pas par un chiffre;
- n’est pas un mot réservé du langage.

Conventions à respecter :

- commencer par une minuscule;
- utiliser un nom représentatif;
- séparer les mots avec <code>_</code> : <code>nombre_heures_travaillees</code>. <span class="small">(_snail case_)</span>

---

## Mots réservés

Ces mots ont déjà une signification dans le langage C et ne peuvent pas servir d’identifiants.

```text
auto      break     case      char      const     continue
default   do        double    else      enum      extern
float     for       goto      if        int       long
register  return    short     signed    sizeof    static
struct    switch    typedef   union     unsigned  void
volatile  while
```

<p class="small">Les versions plus récentes du standard C ajoutent d’autres mots-clés.</p>

---

## Le C respecte la casse

Les majuscules et les minuscules sont distinctes.

```c
int salaire;
int SALAIRE;
int Salaire;
int salairE;
```

Ces quatre identifiants désignent <strong>quatre variables différentes</strong>.

<p class="callout">Une convention cohérente évite les confusions et rend le code plus facile à parcourir.</p>

---

## Exercice · Choisir de bons identifiants

Pour chaque proposition, déterminer si elle est permise et si elle respecte la convention du cours.

<div class="cards cards--four">
  <div class="card"><h3><code>prixCumulatif</code></h3></div>
  <div class="card"><h3><code>NombreHeures</code></h3></div>
  <div class="card"><h3><code>2eme_valeur</code></h3></div>
  <div class="card"><h3><code>_compteur</code></h3></div>
  <div class="card"><h3><code>nom_équipe</code></h3></div>
  <div class="card"><h3><code>union</code></h3></div>
  <div class="card"><h3><code>tmp</code></h3></div>
  <div class="card"><h3><code>taux_horaire</code></h3></div>
</div>

Notes:
Points à faire ressortir : chiffre initial, accent, mot réservé, casse, nom trop vague et convention snake_case.

---

## Types primitifs

Chaque variable doit avoir un type.

Le type permet de :

- définir la nature de l’information;
- réserver suffisamment de mémoire;
- choisir la représentation binaire;
- déterminer les opérations valides.

<div class="cards">
  <div class="card"><h3>Entiers</h3><p>Nombres sans partie fractionnaire.</p></div>
  <div class="card"><h3>Réels</h3><p>Valeurs avec une partie fractionnaire, représentées approximativement.</p></div>
  <div class="card"><h3>Caractères</h3><p>Petits codes numériques associés à des caractères.</p></div>
</div>

---

## Familles de types primitifs

<div class="pipeline">
  <div><strong>Entiers</strong><span><code>char</code>, <code>short</code>, <code>int</code>, <code>long</code></span></div>
  <div><strong>Réels</strong><span><code>float</code>, <code>double</code></span></div>
  <div><strong>Autres</strong><span><code>void</code> : absence de valeur</span></div>
</div>

<div class="comparison">
  <div><h3>Signés</h3><p>Peuvent représenter des valeurs négatives et positives.</p></div>
  <div><h3>Non signés</h3><p>Représentent seulement des valeurs positives ou nulles.</p></div>
</div>

---

## Types entiers <span class="small">(configuration MSVC courante)</span>

| Type | Taille typique | Signé | Non signé |
|---|---:|---:|---:|
| `char` | 1 octet | −128 à 127* | 0 à 255 |
| `short` | 2 octets | −32 768 à 32 767 | 0 à 65 535 |
| `int` | 4 octets | −2 147 483 648 à 2 147 483 647 | 0 à 4 294 967 295 |
| `long` | 4 octets | −2 147 483 648 à 2 147 483 647 | 0 à 4 294 967 295 |
| `long long` | 8 octets | environ −9,22 × 10¹⁸ à 9,22 × 10¹⁸ | 0 à environ 1,84 × 10¹⁹ |

<p class="tiny">* Le caractère signé de <code>char</code> dépend de l’implémentation. Vérifier les tailles avec <code>sizeof</code> et les limites dans <code>&lt;limits.h&gt;</code>.</p>

---

## Types réels <span class="small">(ordre de grandeur)</span>

| Type | Taille typique | Précision décimale approximative | Valeur positive maximale approximative |
|---|---:|---:|---:|
| `float` | 4 octets | 6 à 9 chiffres | 3,4 × 10³⁸ |
| `double` | 8 octets | 15 à 17 chiffres | 1,8 × 10³⁰⁸ |
| `long double` | dépend de la plateforme | au moins celle de `double` | dépend de la plateforme |

<p class="callout small"><strong>Attention :</strong> les nombres à virgule flottante sont des approximations; tous les nombres décimaux ne sont pas représentables exactement.</p>

---

## Le type caractère

- Le type caractère de base est <code>char</code>.
- La mémoire contient un <strong>nombre</strong>; une convention associe ce nombre à un caractère.
- ASCII décrit les caractères latins de base et les commandes historiques.
- UTF-8 est très courant pour encoder du texte moderne dans les fichiers, mais une chaîne UTF-8 peut utiliser plusieurs octets par caractère.

```c
char lettre = 'A';      // Littéral caractère
char meme_lettre = 65;  // 65 correspond à A en ASCII
```

---

<!-- .slide: class="full-image image-soft" -->

## Table ASCII

![Table des codes ASCII : valeurs décimales, hexadécimales et caractères](assets/table-ascii.png)

<p class="tiny">La table ASCII couvre 128 codes. Elle ne suffit pas, à elle seule, pour représenter tous les alphabets et symboles modernes.</p>

---

## Exemples de déclarations

```c
int un_nombre;
long long un_tres_grand_nombre;

float un_premier_reel = 10.2f;
double un_autre_reel = 10.3;

char un_caractere = 'a';
char un_autre_caractere = 115; // 's' en ASCII
```

<p class="callout small">Les suffixes comme <code>f</code> indiquent explicitement le type d’un littéral.</p>

---

<!-- .slide: class="compact" -->

## Exemple · Déclarer et initialiser

```c
int main(void)
{
    int compteur = 0;
    double circonference = 0.0;
    char caractere = 'A';

    compteur = compteur + 1;
    circonference = 2.0 * 3.14159 * 4.5;
    caractere = 'B';

    return 0;
}
```

<div class="comparison">
  <div><h3>Initialisation</h3><p>Première valeur donnée au moment de la déclaration.</p></div>
  <div><h3>Affectation</h3><p>Nouvelle valeur donnée après la déclaration.</p></div>
</div>

---

## Affectation d’une variable

L’opérateur <code>=</code> place la valeur calculée à droite dans la variable située à gauche.

```c
double temperature;
temperature = 22.3;
```

<div class="pipeline">
  <div><strong>Évaluer</strong><span>Calculer l’expression à droite</span></div>
  <div><strong>Convertir</strong><span>Adapter au type de la variable</span></div>
  <div><strong>Stocker</strong><span>Écrire dans la variable à gauche</span></div>
</div>

<p class="definition"><code>=</code> signifie « affecter », tandis que <code>==</code> signifie « comparer pour vérifier l’égalité ».</p>

---

## Conversion implicite de type

Une conversion a lieu quand une valeur n’a pas exactement le type de la variable qui la reçoit.

```c
char lettre = 'A';
int code;

code = lettre; // conversion implicite : code vaut 65 en ASCII
```

- Le compilateur effectue certaines conversions automatiquement.
- Une conversion vers un type plus vaste est souvent sans perte.
- Une conversion peut néanmoins changer la valeur ou la précision : il faut comprendre les types impliqués.

---

## Risque de perte de données

```c
unsigned int grande_valeur = 90000;
unsigned short petite_valeur;

petite_valeur = grande_valeur;
```

<div class="memory-strip">
  <div>00000000</div><div>00000001</div><div class="active">01011111</div><div class="active">10010000</div>
</div>

<p class="exercise"><strong>Question :</strong> que se passe-t-il si <code>unsigned short</code> ne peut pas représenter 90 000 ?</p>

<p class="small">Sur une plateforme où ce type possède 16 bits, la conversion ne peut conserver la valeur originale.</p>

---

## Conversion explicite <span class="small">(cast)</span>

Un cast indique explicitement le type de destination souhaité.

```c
petite_valeur = (unsigned short)grande_valeur;
```

```c
double moyenne = (double)total / nombre;
```

<div class="comparison">
  <div><h3>Ce que dit le code</h3><p>« Je demande cette conversion volontairement. »</p></div>
  <div><h3>Ce que le cast ne garantit pas</h3><p>Il n’empêche ni la perte de données, ni le débordement, ni la perte de précision.</p></div>
</div>

---

## Exercice 1 · Échanger deux valeurs

<div class="exercise">
  <p>Écrire un algorithme qui échange les valeurs de deux variables entières <code>var_a</code> et <code>var_b</code>.</p>
  <p><strong>Avant :</strong> <code>var_a = 10</code>, <code>var_b = 15</code></p>
  <p><strong>Après :</strong> <code>var_a = 15</code>, <code>var_b = 10</code></p>
</div>

<p class="fragment callout">Indice : une troisième variable peut servir de stockage temporaire.</p>

---

## Exercice 2 · Calculer des taxes

<div class="exercise">
  <p>Écrire un programme qui :</p>
  <ol>
    <li>stocke un sous-total dans une variable;</li>
    <li>calcule séparément les deux taxes avec les taux fournis;</li>
    <li>stocke puis affiche le total.</li>
  </ol>
</div>

```c
const double TAUX_TPS = 0.05;
const double TAUX_TVQ = 0.09975;
```

<p class="tiny">Ces valeurs servent à l’exercice pédagogique. Toujours utiliser les règles et les taux fournis dans l’énoncé ou par la source officielle pertinente.</p>
