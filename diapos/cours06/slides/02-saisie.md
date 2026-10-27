<!-- .slide: class="chapter" -->

<p class="section-kicker">02 · Lire sans déborder</p>

# Saisir une chaîne

<p class="lede">La capacité du tableau fait partie du contrat de lecture.</p>

---

## Pourquoi éviter <code>scanf("%s", ...)</code> ?

```c
char nom[20];
scanf("%s", nom);
```

Sans largeur maximale, une entrée trop longue déborde le tableau. De plus, <code>%s</code> s’arrête au premier espace.

Une largeur explicite réduit le risque :

```c
scanf("%19s", nom);
```

Mais cette forme ne lit toujours pas une ligne complète.

---

## Lire une ligne avec <code>fgets</code>

```c
#define CAPACITE_LIGNE 100
char ligne[CAPACITE_LIGNE];

if (fgets(ligne, CAPACITE_LIGNE, stdin) != NULL) {
    printf("Vous avez saisi : %s", ligne);
}
```

<code>fgets</code> lit au plus <code>capacité - 1</code> caractères et ajoute le zéro terminal.

<p class="callout small">Un tableau passé à une fonction est converti en pointeur : sa capacité ne peut pas être déduite du pointeur. La transmettre séparément.</p>

---

## Retirer le retour de ligne

Après un appel réussi à <code>fgets</code>, chercher le retour de ligne dans la chaîne.

```c
int i = 0;
while (ligne[i] != '\0' && ligne[i] != '\n') {
    ++i;
}

if (ligne[i] == '\n') {
    ligne[i] = '\0';
}
```

La boucle s’arrête au retour de ligne ou au zéro terminal. Si un retour de ligne est présent, on le remplace par <code>'\0'</code>.

---

## Gérer une ligne trop longue

Si aucun <code>'\n'</code> n’a été lu, il peut rester des caractères dans l’entrée. Faire cette vérification après un appel réussi à <code>fgets</code>, avant de retirer le retour de ligne.

```c
int i = 0;
while (ligne[i] != '\0' && ligne[i] != '\n') {
    ++i;
}

if (ligne[i] == '\0') {
    int c;
    while ((c = getchar()) != '\n' && c != EOF) {
        ;
    }
}
```

<p class="callout small">Ici, on conserve le début de la ligne et on ignore la suite jusqu’à <code>'\n'</code> ou <code>EOF</code>.</p>
