<!-- .slide: class="chapter" id="fonctions-chaines" -->

<p class="section-kicker">04 · Des fonctions sur les chaînes à un module</p>

# Préparer un texte

<p class="lede">Retirer son retour de ligne, compter un caractère et remplacer ses espaces.</p>

---

## Trois fonctions pour un même texte

Notre programme travaille sur la chaîne <code>"allo le monde\n"</code>.

| Fonction | Opération | Résultat |
|---|---|---|
| <code>retirer_retour_ligne</code> | retirer <code>'\n'</code> | <code>"allo le monde"</code> |
| <code>compter_caractere</code> | compter les <code>'o'</code> | <code>2</code> |
| <code>remplacer_caractere</code> | remplacer les espaces par <code>'_'</code> | <code>"allo_le_monde"</code> |

On commence par écrire ces trois fonctions dans le même fichier que le programme principal.

---

<!-- .slide: class="compact" -->

## Retirer le retour de ligne

<code>"allo le monde\n"</code> devient <code>"allo le monde"</code>.

```text
PROCÉDURE retirer_retour_ligne(texte)
    texte[strlen(texte)-1] ← '\0'
FIN PROCÉDURE
```

Le retour de ligne final est remplacé par <code>'\0'</code>.

---

<!-- .slide: class="compact" -->

## Compter un caractère

Dans <code>"allo le monde"</code>, le caractère <code>'o'</code> apparaît <strong>2 fois</strong>.

```text
FONCTION compter_caractere(texte, cible) → entier
    nombre ← 0
    i ← 0
    TANT QUE texte[i] ≠ '\0'
        SI texte[i] = cible
            nombre ← nombre + 1
        FIN SI
        i ← i + 1
    FIN TANT QUE
    RETOURNER nombre
FIN FONCTION
```

Cette fonction lit le texte sans le modifier et retourne le nombre d’occurrences avant le zéro terminal.

---

<!-- .slide: class="compact" -->

## Remplacer un caractère

En remplaçant <code>' '</code> par <code>'_'</code>, <code>"allo le monde"</code> devient <code>"allo_le_monde"</code>.

```text
PROCÉDURE remplacer_caractere(texte, ancien, nouveau)
    i ← 0
    TANT QUE texte[i] ≠ '\0'
        SI texte[i] = ancien
            texte[i] ← nouveau
        FIN SI
        i ← i + 1
    FIN TANT QUE
FIN PROCÉDURE
```

Le texte doit être modifiable et <code>nouveau</code> doit être différent de <code>'\0'</code>. La longueur est conservée.

---

## Au départ, tout est dans <code>main.c</code>

```text
main.c
    définition de retirer_retour_ligne
    définition de compter_caractere
    définition de remplacer_caractere
    programme principal qui appelle ces fonctions
```

Le programme fonctionne, mais un deuxième programme veut aussi utiliser ces opérations sur les chaînes.

Recopier les fonctions obligerait à corriger plusieurs copies lorsqu’on les améliore.

---

<!-- .slide: id="module-chaines" -->

## Décidons de créer un module <code>chaines</code>

Les trois fonctions ont une responsabilité commune : traiter des chaînes de caractères.

On les regroupe pour :

- les réutiliser dans plusieurs programmes;
- conserver une seule version de chaque fonction;
- séparer ces traitements du programme principal.

<p class="definition"><strong>Module :</strong> un ensemble de fonctions cohérentes, avec une interface publique et une implémentation.</p>

---

## Répartir le programme en trois fichiers

| Fichier | Contenu | Rôle |
|---|---|---|
| <code>chaines.h</code> | prototypes des trois fonctions | annoncer les services du module |
| <code>chaines.c</code> | définitions des trois fonctions | réaliser les traitements |
| <code>main.c</code> | programme principal | utiliser le module |

<p class="callout">Le programme principal inclut <code>"chaines.h"</code> pour connaître les fonctions qu’il peut appeler.</p>

---

## Interface · <code>chaines.h</code>

```c
void retirer_retour_ligne(char texte[]);
int compter_caractere(const char texte[], char cible);
void remplacer_caractere(char texte[],
                         char ancien, char nouveau);
```

Les prototypes annoncent les paramètres et les valeurs retournées.

---

## Protéger les inclusions multiples

Un en-tête peut être inclus par plusieurs chemins dans un même fichier source. On ajoute une garde pour éviter de traiter son contenu plusieurs fois.

```c
#ifndef CHAINES_H
#define CHAINES_H

void retirer_retour_ligne(char texte[]);
int compter_caractere(const char texte[], char cible);
void remplacer_caractere(char texte[],
                         char ancien, char nouveau);

#endif
```

À la première inclusion, <code>CHAINES_H</code> est défini. Aux inclusions suivantes, le contenu est ignoré. Choisir un nom de garde unique par en-tête.

---

<!-- .slide: class="compact" -->

## Implémentation · <code>chaines.c</code>

```c
#include "chaines.h"
#include <string.h>

/* Définitions des trois fonctions,
   à écrire en C à partir du pseudocode. */
```

On place ici les définitions de <code>retirer_retour_ligne</code>, <code>compter_caractere</code> et <code>remplacer_caractere</code>.

Inclure <code>"chaines.h"</code> permet de :

- rendre disponibles les constantes de compilation et les définitions de types de l’en-tête;
- déclarer les prototypes avant les appels, pour définir les fonctions dans l’ordre voulu;
- vérifier la cohérence entre les prototypes et les définitions.

---

<!-- .slide: class="compact" -->

## Programme client · <code>main.c</code>

```c
#include <stdio.h>
#include "chaines.h"

int main(void)
{
    char texte[] = "allo le monde\n";

    retirer_retour_ligne(texte);
    int nombre = compter_caractere(texte, 'o');
    remplacer_caractere(texte, ' ', '_');

    printf("%s\n", texte);
    printf("%d\n", nombre);
    return 0;
}
```

Résultat : <code>allo_le_monde</code>, puis <code>2</code>.

Les appels restent identiques après le regroupement des fonctions dans le module.

---

## Pourquoi <code>"chaines.h"</code> et <code>&lt;stdio.h&gt;</code> ?

Les deux formes indiquent au préprocesseur comment chercher l’en-tête.

```c
#include "chaines.h"  // en-tête de notre module
#include <stdio.h>    // en-tête de la bibliothèque standard
```

| Forme | Usage habituel | Recherche habituelle |
|---|---|---|
| <code>"..."</code> | en-têtes du projet | d’abord dans le dossier du fichier qui fait l’inclusion, puis dans les dossiers d’inclusion configurés |
| <code>&lt;...&gt;</code> | en-têtes des bibliothèques | dans les dossiers d’inclusion configurés par le compilateur et l’IDE |

<p class="callout small"><code>chaines.h</code> est un fichier de notre projet : on écrit <code>#include "chaines.h"</code>.</p>

<!-- Référence : https://gcc.gnu.org/onlinedocs/cpp/Include-Syntax.html -->

---

## Ce qu’on retrouve dans l’interface

Dans <code>chaines.h</code> :

- les prototypes des fonctions offertes;
- les commentaires décrivant leur utilisation;
- les types et les constantes dont les clients ont besoin.

Les détails des traitements et les éventuelles fonctions internes restent dans <code>chaines.c</code>.

---

<!-- .slide: class="compact" -->

## Documenter nos fonctions dans l'interface

```c
#ifndef CHAINES_H
#define CHAINES_H

/* Remplace le retour de ligne final par '\0' dans texte. */
void retirer_retour_ligne(char texte[]);

/* Retourne le nombre d'occurrences de cible dans texte.
 * Ne modifie pas texte. */
int compter_caractere(const char texte[], char cible);

/* Remplace chaque occurrence d'ancien par nouveau dans texte.
 * nouveau doit être différent de '\0'. */
void remplacer_caractere(char texte[],
                         char ancien, char nouveau);

#endif
```

---

## Un projet, plusieurs fichiers

Ajouter <code>main.c</code>, <code>chaines.c</code> et <code>chaines.h</code> au même projet dans l’IDE.

Dans CLion, vérifier et mettre à jour au besoin la liste des fichiers dans <code>CMakeLists.txt</code> :

```cmake
add_executable(MonProjet main.c chaines.c chaines.h)
```

Lorsqu’on lance la compilation du projet, l’IDE compile les fichiers <code>.c</code> et réunit le code compilé pour produire l’exécutable.

<p class="callout small">Pour réutiliser le module dans un autre projet, y ajouter <code>chaines.h</code> et <code>chaines.c</code>, puis inclure l’en-tête dans les fichiers qui l’utilisent.</p>

---

<!-- .slide: class="ide-demo" id="clion-ajouter-fichier" -->

## CLion · 1. Ajouter un fichier

<div class="ide-walkthrough">
  <div class="ide-instructions">
    <ol>
      <li>Dans le panneau <strong>Project</strong>, faire un clic droit sur <strong>MonProjet</strong>.</li>
      <li>Choisir <strong>New</strong>, puis <strong>C/C++ Source File</strong>.</li>
    </ol>
  </div>
  <img src="assets/clion-menu-nouveau-fichier.png" width="1130" height="1134" alt="Dans CLion, menu contextuel de MonProjet avec New puis C/C++ Source File sélectionnés.">
</div>

---

<!-- .slide: class="ide-demo" id="clion-creer-module" -->

## CLion · 2. Créer le module

<div class="ide-walkthrough">
  <div class="ide-instructions">
    <ol>
      <li>Saisir <code>chaines.c</code> dans <strong>Name</strong> et choisir le type <strong>.c / .h</strong>.</li>
      <li>Cocher <strong>Create an associated header</strong> pour créer aussi <code>chaines.h</code>.</li>
      <li>Cocher <strong>Add to targets</strong> et sélectionner <strong>MonProjet</strong>.</li>
      <li>Valider avec <strong>OK</strong>.</li>
    </ol>
  </div>
  <img src="assets/clion-creation-module.png" width="1086" height="946" alt="Fenêtre de création de chaines.c : type .c / .h, Create an associated header et Add to targets cochés, cible MonProjet sélectionnée.">
</div>

---

<!-- .slide: class="ide-demo ide-result" id="clion-verifier-projet" -->

## CLion · 3. Vérifier le résultat

Les fichiers <code>chaines.c</code> et <code>chaines.h</code> apparaissent dans le projet.

<img src="assets/clion-projet-module.png" width="1430" height="562" alt="Projet CLion après l’ajout du module : main.c, chaines.c et chaines.h sont présents et figurent dans add_executable dans CMakeLists.txt.">

<p class="callout small">Dans <code>CMakeLists.txt</code>, vérifier que <code>add_executable</code> contient <code>main.c</code>, <code>chaines.c</code> et <code>chaines.h</code>. Ajouter les fichiers manquants au besoin.</p>

---

<!-- .slide: class="ide-demo ide-result" id="clion-code-genere" -->

## CLion · 4. Comprendre le code généré

CLion génère automatiquement la garde dans <code>chaines.h</code> et le <code>#include</code> dans <code>chaines.c</code>.

<img src="assets/clion-garde-inclusion.png" width="1160" height="598" alt="Fichiers générés par CLion : chaines.c contient #include &quot;chaines.h&quot;; chaines.h contient la garde #ifndef MONPROJET_CHAINES_H, #define MONPROJET_CHAINES_H et #endif.">

<p class="callout small"><strong>Vous devez savoir écrire vous-mêmes la garde d’inclusion et la directive <code>#include</code>, même si CLion les génère automatiquement.</strong></p>

---

<!-- .slide: class="chapter compact" -->

<p class="section-kicker">À retenir</p>

# Des chaînes aux modules

<ol class="plan">
  <li>Terminer chaque chaîne par <code>'\0'</code> et respecter sa capacité.</li>
  <li>Définir des fonctions avec un rôle clair et un contrat précis.</li>
  <li>Regrouper les fonctions cohérentes dans un module.</li>
  <li>Placer les prototypes dans le <code>.h</code> et les définitions dans le <code>.c</code>.</li>
  <li>Ajouter les fichiers au projet; l’IDE gère leur compilation.</li>
</ol>
