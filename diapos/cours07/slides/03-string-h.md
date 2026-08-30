<!-- .slide: class="chapter" -->

<p class="section-kicker">03 · Mesurer, copier, joindre, comparer</p>

# La bibliothèque <code>string.h</code>

<p class="lede">Des fonctions utiles — à employer avec une capacité connue.</p>

---

## <code>strlen</code> · longueur du texte

```c
size_t longueur = strlen("INF155");  // 6
```

<code>strlen</code> compte les octets avant le premier <code>'\0'</code>. Il ne compte ni la capacité du tableau ni le zéro terminal.

<div class="formula"><code>capacité requise</code><span>≥</span><code>strlen(texte) + 1</code></div>

---

## Copier une chaîne

```c
char destination[20];
const char *source = "Bonjour";

if (strlen(source) < sizeof destination) {
    strcpy(destination, source);
}
```

<code>strcpy</code> copie aussi le zéro terminal, mais ne connaît pas la capacité de destination.

<p class="warning">La vérification de capacité appartient au programme.</p>

---

## Concaténer deux chaînes

```c
char message[40] = "Bonjour ";
const char *nom = "Ada";

size_t requis = strlen(message) + strlen(nom) + 1;
if (requis <= sizeof message) {
    strcat(message, nom);
}
```

<code>strcat</code> remplace le zéro terminal de destination par la source, puis en écrit un nouveau.

---

## Formater avec <code>snprintf</code>

```c
char resultat[64];
int note = 93;

int taille = snprintf(resultat, sizeof resultat,
                      "Note finale : %d %%", note);
```

<code>snprintf</code> connaît la capacité et permet de détecter une troncature lorsque la valeur retournée est négative ou au moins égale à la capacité.

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

Les fonctions <code>atoi</code> et <code>atof</code> signalent mal les erreurs. Préférer :

```c
char *fin;
long valeur = strtol(texte, &fin, 10);

if (fin == texte || *fin != '\0') {
    /* conversion invalide ou caractères restants */
}
```

<code>strtol</code> permet aussi de vérifier les limites avec <code>errno</code>.

---

<!-- .slide: class="chapter compact" -->

<p class="section-kicker">À retenir</p>

# Une chaîne est un tableau avec un contrat supplémentaire

<ol class="plan">
  <li>Réserver une case pour <code>'\0'</code>.</li>
  <li>Connaître la capacité du tableau destination.</li>
  <li>Lire des lignes avec <code>fgets</code>.</li>
  <li>Vérifier les longueurs avant de copier ou concaténer.</li>
</ol>
