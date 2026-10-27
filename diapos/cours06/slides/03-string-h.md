<!-- .slide: class="chapter" -->

<p class="section-kicker">03 · Mesurer, copier, joindre, comparer</p>

# La bibliothèque <code>string.h</code>

<p class="lede">Des fonctions utiles — à employer avec une capacité connue.</p>

---

## <code>strlen</code> · longueur du texte

```c
int longueur = (int)strlen("INF155");  // 6
```

<code>strlen</code> compte les octets avant le premier <code>'\0'</code>. Il ne compte ni la capacité du tableau ni le zéro terminal.

<div class="formula"><code>capacité requise</code><span>≥</span><code>strlen(texte) + 1</code></div>

---

## Copier une chaîne

```c
#define CAPACITE_DESTINATION 20
char destination[CAPACITE_DESTINATION];
const char *source = "Bonjour";

if ((int)strlen(source) < CAPACITE_DESTINATION) {
    strcpy(destination, source);
}
```

<code>strcpy</code> copie aussi le zéro terminal, mais ne connaît pas la capacité de destination.

<p class="warning">La vérification de capacité appartient au programme.</p>

---

## Concaténer deux chaînes

```c
#define CAPACITE_MESSAGE 40
char message[CAPACITE_MESSAGE] = "Bonjour ";
const char *nom = "Ada";

int requis = (int)(strlen(message) + strlen(nom) + 1);
if (requis <= CAPACITE_MESSAGE) {
    strcat(message, nom);
}
```

<code>strcat</code> remplace le zéro terminal de destination par la source, puis en écrit un nouveau.

---

## Formater avec <code>sprintf</code>

```c
#define CAPACITE_RESULTAT 64
char resultat[CAPACITE_RESULTAT];
int note = 93;

int taille = sprintf(resultat, "Note finale : %d %%", note);
```

<code>sprintf</code> écrit le texte formaté dans le tableau et retourne le nombre de caractères écrits, sans compter le zéro terminal. Le tableau doit être assez grand pour contenir le texte et le <code>'\0'</code>.

---

## Comparer avec <code>strcmp</code>

```c
int resultat = strcmp(chaine1, chaine2);
```

- résultat nul : chaînes égales;
- résultat négatif : <code>chaine1</code> précède <code>chaine2</code>;
- résultat positif : <code>chaine1</code> suit <code>chaine2</code>.

<p class="warning small">Ne jamais supposer que la fonction retourne exactement <code>-1</code>, <code>0</code> ou <code>1</code>.</p>

---

## Convertir du texte en nombre

<code>atoi</code> convertit une chaîne en <code>int</code>; <code>atof</code> la convertit en <code>double</code>.

```c
#include <stdlib.h>

int nombre = atoi("123");       // 123
double prix = atof("19.95");    // 19.95
```

---

## Versions avec une limite explicite

```c
char *strncpy(char *destination, const char *source,
              size_t nombre);

char *strncat(char *destination, const char *source,
              size_t max_ajout);

int snprintf(char *destination, size_t capacite,
             const char *format, ...);
```

---

<!-- .slide: class="chapter compact" -->

<p class="section-kicker">Bilan · Les chaînes de caractères</p>

# Une chaîne est un tableau avec un contrat supplémentaire

<ol class="plan">
  <li>Réserver une case pour <code>'\0'</code>.</li>
  <li>Connaître la capacité du tableau destination.</li>
  <li>Lire des lignes avec <code>fgets</code>.</li>
  <li>Vérifier les longueurs avant de copier ou concaténer.</li>
</ol>
