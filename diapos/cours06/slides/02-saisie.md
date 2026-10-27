<!-- .slide: class="chapter" -->

<p class="section-kicker">02 · Lire sans déborder</p>

# Saisir une chaîne

<p class="lede">La capacité du tableau fait partie du contrat de lecture.</p>

---

## Pourquoi éviter <code>scanf("%s", ...)</code> ?

```c
char nom[20];
scanf("%s", nom); //Remarquez l'absence du &, pourquoi? 
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

Pour une ligne lue avec son retour de ligne :

```c
fgets(ligne, CAPACITE_LIGNE, stdin);
ligne[strlen(ligne)-1] = '\0';
```

<code>strlen(ligne)-1</code> donne l’indice du dernier caractère, ici <code>'\n'</code>, qu’on remplace par <code>'\0'</code>.
