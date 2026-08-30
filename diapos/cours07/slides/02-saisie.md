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
char ligne[100];

if (fgets(ligne, sizeof ligne, stdin) != NULL) {
    printf("Vous avez saisi : %s", ligne);
}
```

<code>fgets</code> lit au plus <code>capacité - 1</code> caractères et ajoute le zéro terminal.

---

## Retirer le retour de ligne

Si elle a été lue, la fin de ligne fait partie de la chaîne.

```c
#include <string.h>

ligne[strcspn(ligne, "\n")] = '\0';
```

<code>strcspn</code> donne l’indice du premier caractère appartenant à l’ensemble <code>"\n"</code>, ou celui du zéro terminal s’il n’y en a pas.

---

## Détecter une ligne tronquée

Si le tableau est rempli sans contenir <code>'\n'</code>, le reste de la ligne demeure dans l’entrée.

```c
if (strchr(ligne, '\n') == NULL) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF) {
        ;
    }
}
```

<p class="callout small">Une fonction de saisie robuste doit définir sa stratégie en cas de dépassement.</p>
