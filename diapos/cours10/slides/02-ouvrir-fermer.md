<!-- .slide: class="chapter" -->

<p class="section-kicker">02 · Acquérir un flux</p>

# Ouvrir et fermer un fichier

<p class="lede">Toute opération commence par <code>fopen</code> et se termine par <code>fclose</code>.</p>

---

## Le type <code>FILE *</code>

```c
#include <stdio.h>

FILE *fichier = fopen("notes.txt", "r");
```

<code>FILE *</code> référence l’état interne du flux : tampon, position, indicateurs de fin et d’erreur.

Nous utilisons déjà trois flux standards : <code>stdin</code>, <code>stdout</code> et <code>stderr</code>.

---

## Vérifier l’ouverture

```c
FILE *fichier = fopen("notes.txt", "r");

if (fichier == NULL) {
    perror("notes.txt");
    return EXIT_FAILURE;
}
```

L’ouverture peut échouer : fichier absent, chemin invalide, permissions insuffisantes ou ressources épuisées.

---

## Chemin relatif ou absolu

- un chemin absolu part d’une racine du système;
- un chemin relatif est interprété depuis le répertoire de travail courant du processus;
- le répertoire de travail n’est pas nécessairement celui du code source ou de l’exécutable.

```text
donnees/notes.txt
../config/options.txt
```

<p class="callout small">Documenter où le programme s’attend à trouver ses fichiers.</p>

---

## Modes d’ouverture texte

| Mode | Lecture | Écriture | Effet à l’ouverture |
|---|:---:|:---:|---|
| <code>r</code> | oui | non | le fichier doit exister |
| <code>w</code> | non | oui | crée ou tronque |
| <code>a</code> | non | oui | crée ou ajoute à la fin |
| <code>r+</code> | oui | oui | le fichier doit exister |
| <code>w+</code> | oui | oui | crée ou tronque |
| <code>a+</code> | oui | oui | crée; écrit à la fin |

---

## Mode binaire

Ajouter <code>b</code> au mode :

```c
fopen("image.bin", "rb");
fopen("resultat.bin", "wb");
fopen("journal.bin", "ab");
```

Sur certains systèmes, texte et binaire sont identiques; sur d’autres, le mode texte transforme certaines séquences, notamment les fins de ligne.

---

## Fermer le flux

```c
if (fclose(fichier) == EOF) {
    perror("fermeture");
    return EXIT_FAILURE;
}
```

La fermeture vide les tampons et libère les ressources du flux. Une erreur d’écriture peut n’apparaître qu’à ce moment.

<p class="warning">Après <code>fclose</code>, le pointeur <code>FILE *</code> ne doit plus être utilisé.</p>
