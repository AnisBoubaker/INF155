# Conventions de codage

INF155 • Programmation en C • École de technologie supérieure

Version du 24 novembre 2026

Ce guide rassemble les conventions à appliquer dans vos programmes du cours. Elles servent à rendre le code lisible, cohérent et plus facile à vérifier. Le guide porte principalement sur le C; une courte annexe est consacrée au C++. Appliquez les règles au fur et à mesure que les notions sont abordées. Une consigne particulière d’un travail précise les contraintes propres à ce travail.

Les blocs de code sont des extraits à replacer dans leur fonction ou leur fichier, sauf l’exemple complet de l’annexe.

## 1. Nommage en C

| Élément                                               | Convention       | Exemples                         |
| ------------------------------------------------------- | ---------------- | -------------------------------- |
| Alias de types, classes et énumérations                 | PascalCase       | Etudiant, CompteBancaire         |
| Étiquettes des structures C                            | snake_case       | struct dossier_etudiant         |
| Variables, paramètres, fonctions et champs             | snake_case       | note_finale, calculer_moyenne    |
| Constantes nommées, macros et valeurs d’énumération | UPPER_SNAKE_CASE | NB_NOTES, TAUX_TPS, LECTURE_OK   |
| Gardes d’inclusion                                     | UPPER_SNAKE_CASE | NOTES_H                          |
| Fichiers et autres noms créés dans le projet          | snake_case       | gestion_notes.c, gestion_notes.h |

### 1.1 Identifiants (Cours 01)

Les noms de variables suivent `snake_case` : des mots en minuscules, séparés par `_`.

```c
int nombre_etudiants = 30;
double prix_unitaire = 12.50;
```

Choisissez un nom qui indique le rôle de la donnée, comme `temperature_celsius`. Gardez une langue cohérente; le français sans accents est utilisé dans le cours. Évitez les abréviations obscures, les noms vagues comme `x` pour un prix et les préfixes de type comme `iNombre`.

Les identifiants utilisent des lettres non accentuées, des chiffres et `_`, sans chiffre initial. Ne commencez pas un nom par `_` et n’utilisez pas de mot réservé. Pour les compteurs de boucle, vus au **cours 02**, des noms courts comme `i` et `j` conviennent.

### 1.2 Constantes (Cours 02)

Une constante définie avec `#define` suit `UPPER_SNAKE_CASE` : les mots sont en majuscules et séparés par `_`.

```c
#define NB_ESSAIS_MAX 3
```

Une constante nommée déclarée avec `const` suit la même convention.

```c
const double TAUX_TPS = 0.05;
```

<!-- pagebreak -->

### 1.3 Fonctions (Cours 03)

Le nom d’une fonction, ses paramètres et ses variables locales suivent `snake_case`. Ici, le nombre de valeurs doit être strictement positif.

```c
double calculer_moyenne(double somme, int nombre)
{
	double moyenne_des_notes = somme / nombre;
	return moyenne_des_notes;
}
```

Fonction : `calculer_moyenne`. Paramètres : `somme` et `nombre`. Variable locale : `moyenne_des_notes`.

### 1.4 Tableaux en lecture seule (Cours 04)

Dans ce paramètre, `const` interdit de modifier les éléments du tableau dans la fonction. Le nom `notes` reste en `snake_case`.

```c
double calculer_moyenne(const int notes[], int nombre);
```

### 1.5 Pointeurs en lecture seule (Cours 05 et 06)

Les pointeurs sont présentés au **cours 05**; leur utilisation avec les chaînes de caractères est vue au **cours 06**.

```c
const char *texte = "Bonjour";
```

`const` protège les caractères; `texte` reste un nom de variable en `snake_case`.

### 1.6 Modules (Cours 06)

Les fichiers d’un module portent des noms en `snake_case`, comme `gestion_notes.c` et `gestion_notes.h`. Les fichiers `.c` et `.h` d’un même module doivent avoir le même nom de base.

Une garde d’inclusion est une macro en `UPPER_SNAKE_CASE`. Elle est formée par le nom du module, suivi de `_H`.

```c
#ifndef GESTION_NOTES_H
#define GESTION_NOTES_H
#endif
```

### 1.7 Types et champs (Cours 08)

L’alias d’un type suit `PascalCase` : chaque mot commence par une majuscule, sans soulignement. L’étiquette d’une structure C et ses champs suivent `snake_case`.

```c
typedef struct dossier_etudiant {
	double note_finale;
} DossierEtudiant;
```

`DossierEtudiant` est l’alias du type, `dossier_etudiant` est l’étiquette de la structure et `note_finale` est un champ.

### 1.8 Noms prédéfinis (Cours 01, 05, 06 et 10)

Respectez leur casse officielle : `int`, `double` et `EXIT_SUCCESS` (**cours 01**); `NULL` (**cours 05**); `size_t` dans les prototypes de bibliothèque du **cours 06**; `FILE` (**cours 10**).

<!-- pagebreak -->

## 2. Présentation et commentaires en C

### Mise en forme

- Indentez d'**une tabulation**, sans mélanger espaces et tabulations.
- Placez l’accolade ouvrante d’une fonction sur la ligne suivante. Pour `if`, `for` et `while`, placez-la à la fin de la ligne. Utilisez les accolades même pour une seule instruction.
- Écrivez une instruction par ligne. Séparez les étapes logiques par une ligne vide.
- Mettez un espace autour des opérateurs et après les virgules : `total = prix * nombre;`. Écrivez `if (condition)` et `calculer_total(prix, nombre)`.
- Visez des lignes d’au plus **100 caractères**. Coupez une longue expression ou une liste de paramètres à un endroit logique.

```c
int note_valide(int note)
{
	if (note < 0 || note > 100) {
		return 0;
	}

	return 1;
}
```

### Commentaires utiles

Expliquez le rôle d’un fichier et le contrat des fonctions : paramètres, résultat, contraintes et effets sur les données. Placez la documentation publique dans le `.h`; gardez les détails d’algorithme dans le `.c`. Une fonction privée ou définie dans un seul fichier se documente au-dessus de sa définition.

```c
/*
 * Calcule la moyenne des notes, sans modifier le tableau.
 * notes : tableau contenant au moins nombre entiers.
 * nombre : strictement positif; notes ne doit pas être NULL.
 * Retour : moyenne arithmetique sous forme de double.
 */
double calculer_moyenne(const int notes[], int nombre);

// La borne de fin est exclue pour ne pas depasser le tableau.
for (int i = 0; i < nombre; ++i) {
	somme += notes[i];
}
```

Un commentaire doit apporter une information que le code ne donne pas déjà.  Par exemple `// Ajouter 1` devant `compteur++;` est inutile. Commentez plutôt une hypothèse, une unité ou la raison d’un choix. Les commentaires et messages peuvent contenir des accents.

Mettez les commentaires à jour avec le code. Supprimez le code mort et les anciennes versions commentées. Un `TODO` doit désigner une tâche précise; retirez-le une fois celle-ci terminée.

<!-- pagebreak -->

## 3. Fonctions et modules en C

Donnez à chaque fonction une responsabilité précise. Son nom doit annoncer son intention : `afficher_menu`, `calculer_moyenne`, `est_vide`. Une fonction de calcul devrait retourner un résultat sans effectuer inutilement de saisie ou d’affichage. Évitez de recopier le même traitement à plusieurs endroits.

- Passez les données par paramètres et retournez les résultats. **N’utilisez JAMAIS de variables globales**.
- En C, écrivez `int main(void)` et `void afficher_menu(void)` pour annoncer l’absence de paramètres.
- Transmettez avec un tableau son nombre d’éléments effectifs. Ajoutez `const` si la fonction ne doit pas les modifier.
- Documentez si un pointeur peut être `NULL`, ce que la fonction modifie et qui devra libérer une éventuelle allocation.
- Limitez l’imbrication. Un retour anticipé peut traiter une erreur et simplifier la lecture. Chaque sortie doit toutefois libérer les ressources déjà acquises.
- N’utilisez **JAMAIS** de boucles infinies avec `break` (ex. : `while (1) { ... break; }`), à moins que cela soit expressément demandé.

### Organisation des fichiers

Le `.h` expose les types, constantes et prototypes nécessaires aux utilisateurs du module. Les inclusions des dépendances (les modules nécessaires au module) se font également dans le `.h`. Le `.c` contient les définitions; il inclut son propre en-tête. Une fonction utilisée seulement dans ce `.c` doit être déclarée `static`. N’incluez **jamais** un fichier `.c` dans un autre.

```c
/* notes.h : interface du module de gestion des notes. */
#ifndef NOTES_H
#define NOTES_H

#include "calculs.h"

#define NOTE_MIN 0
#define NOTE_MAX 100

/* Retourne 1 si note est dans [NOTE_MIN, NOTE_MAX], 0 sinon. */
int note_valide(int note);

#endif
```

```c
/* notes.c : implementation du module. */
#include "notes.h"

int note_valide(int note)
{
	return note >= NOTE_MIN && note <= NOTE_MAX;
}
```

Une garde d’inclusion doit être unique dans le projet. Incluez seulement les en-têtes dont le module a réellement besoin.

**Valeurs de retour.** Une fonction peut utiliser `1` pour la réussite et `0` pour l’échec, si son contrat le précise. Ne confondez pas cette convention avec celle de `main` : `EXIT_SUCCESS` signale la réussite du programme et `EXIT_FAILURE` son échec.

<!-- pagebreak -->

## 4. Données et entrées en C

### Variables et expressions

**Déclarez une variable près de sa première utilisation**, avec un type adapté et une valeur initiale dès qu’elle est connue. Une variable doit toujours avoir reçu une valeur avant d’être lue. Déclarez un pointeur par ligne : `int *valeurs = NULL;`. Utilisez `const` pour une donnée qui ne doit pas changer et une constante nommée pour une valeur métier répétée.

Écrivez des conditions faciles à lire. Utilisez `==` pour comparer et `=` pour affecter; évitez les affectations cachées dans des expressions complexes. Préférez `age >= AGE_MIN && age <= AGE_MAX` à une comparaison en chaîne.

### Tableaux et chaînes

Vérifiez chaque indice : pour `nombre` éléments, les indices vont de `0` à `nombre - 1`. Un tableau de caractères utilisé comme chaîne doit contenir un `\0` final. Prévoyez sa place et vérifiez les capacités avant une copie ou une concaténation.

Pour lire une ligne de texte, préférez `fgets`. Cet extrait lit au plus `CAPACITE_LIGNE - 1` caractères.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define CAPACITE_LIGNE 100
char ligne[CAPACITE_LIGNE];

if (fgets(ligne, CAPACITE_LIGNE, stdin) == NULL) {
	return EXIT_FAILURE;
}
ligne[strcspn(ligne, "\n")] = '\0';
```

**Validez la saisie.** Avec `scanf`, vérifiez le nombre de conversions réussies et la plage des valeurs. Limitez toujours la largeur de `%s` à la capacité moins un. N’utilisez pas `gets` ni `fflush(stdin)`.

Affichez une chaîne avec `printf("%s", texte)` plutôt qu’avec `printf(texte)`. Préférez `snprintf` à `sprintf` pour construire du texte.

<!-- pagebreak -->

## 5. Mémoire et fichiers en C

### Allocations et pointeurs

N’allouez dynamiquement que si le besoin le justifie. Vérifiez la taille demandée, le risque de débordement du calcul et le résultat de chaque allocation.

Pour `realloc`, gardez l’ancien pointeur tant que le succès n’est pas confirmé. Dans cet extrait, `valeurs` possède déjà un bloc valide. `nombre`, sa taille effective, et `nouveau_nombre` utilisent `size_t`, le type des tailles renvoyées par `sizeof`. La nouvelle taille est strictement positive et son produit avec `sizeof *valeurs` a été vérifié.

```c
double *temp = realloc(valeurs, nouveau_nombre * sizeof *valeurs);
if (temp == NULL) {
	/* valeurs reste valide; la taille effective ne change pas. */
} else {
	valeurs = temp;
	nombre = nouveau_nombre;
}

/* Lorsque le tableau n'est plus necessaire : */
free(valeurs);
valeurs = NULL;
```

Ne retournez jamais l’adresse d’une variable locale automatique et ne déréférencez jamais un pointeur nul ou non initialisé.

### Fichiers et erreurs

Vérifiez l’ouverture avant toute utilisation.

```c
FILE *fichier = fopen("notes.txt", "r");
if (fichier == NULL) {
	printf("Impossible d'ouvrir notes.txt.\n");
	return EXIT_FAILURE;
}

/* Lire et traiter les donnees en verifiant les resultats. */

if (fclose(fichier) == EOF) {
	printf("Erreur lors de la fermeture du fichier.\n");
	return EXIT_FAILURE;
}
```


<!-- pagebreak -->

## 6. Vérification avant remise en C

### Vérification avec CLion

Dans ce cours, utilisez l’IDE prévu pour les exercices, actuellement **CLion**. Lancez votre programme depuis l’IDE et consultez ses messages. Corrigez les erreurs et les avertissements signalés.

Vérifiez que tous les fichiers nécessaires font partie du projet. Restez dans les bibliothèques et outils autorisés. Testez les résultats de vos programmes et fonctions avec les cas ci-dessous; une exécution sans message d’erreur ne suffit pas à établir qu’un résultat est correct.

### Essais à prévoir

| Situation              | Exemples de vérification                                                                 |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| Cas courant            | Résultat attendu pour des données représentatives normales                             |
| Limites                | Zéro élément si permis, un élément, première et dernière cases, capacité maximale |
| Entrée incorrecte     | Valeur hors plage, ligne trop longue                                                      |
| Ressource indisponible | Fichier absent ou inaccessible, échec signalé sans accès invalide                      |

### Liste de contrôle

- Les noms suivent les trois casses du cours et décrivent leur rôle.
- L’indentation, les accolades et l’espacement sont cohérents.
- Les commentaires expliquent les contrats et les décisions utiles.
- Les fonctions ont un rôle clair; les données passent par leurs paramètres.
- Les variables sont définies avant lecture; les indices et capacités sont vérifiés.
- Les erreurs de saisie, d’allocation et de fichier sont traitées.
- Chaque ressource acquise est libérée, même en cas d’échec.
- Aucun message d’erreur ou avertissement inexpliqué ne subsiste dans l’IDE; les cas limites ont été essayés.
- Les fichiers requis sont présents; le code mort et les traces de débogage sont retirés.

### Références pour approfondir

Les choix de casse et de mise en forme sont ceux d’INF155. Les références suivantes complètent les principes de sécurité et de lisibilité; elles ne remplacent pas les conventions du cours.

- [SEI CERT C Coding Standard](https://cmu-sei.github.io/secure-coding-standards/sei-cert-c-coding-standard/rules/) : règles STR31-C sur la capacité des chaînes, MEM31-C sur la libération et MEM35-C sur la taille des allocations.
- [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#S-naming) : commentaires, lisibilité et principes de l’annexe C++.

<!-- pagebreak -->

## Annexe C++

Cette annexe accompagne la brève introduction aux objets. Elle conserve les règles de nommage, de présentation et de commentaires du guide. Réservez les mécanismes de C++ aux exercices demandés dans ce langage.

Une classe est un type en `PascalCase`. Ses attributs et méthodes sont en `snake_case`; les constantes restent en `UPPER_SNAKE_CASE`. Un constructeur et un destructeur portent obligatoirement le nom de la classe, donc sa casse : `CompteBancaire` et `~CompteBancaire`. Les noms de bibliothèque comme `std::string` conservent leur orthographe.

```cpp
#include <iostream>

class CompteBancaire {
private:
	double solde;

public:
	CompteBancaire() : solde(0.0)
	{
	}

	double obtenir_solde() const
	{
		return solde;
	}
};

int main()
{
	CompteBancaire compte;
	std::cout << compte.obtenir_solde() << "\n";
	return 0;
}
```

Gardez privés les attributs dont la modification doit être contrôlée. Initialisez les attributs dans le constructeur; sa liste d’initialisation, après `:`, convient à cet usage. Marquez `const` une méthode qui ne modifie pas l’état de l’objet. Le point-virgule après la définition d’une classe est obligatoire.

Privilégiez les objets à durée de vie automatique et `std::string` pour du texte dans les exercices C++ qui le permettent. Un objet local est détruit à la sortie de sa portée. Il n’est pas nécessaire d’utiliser `new` ou `delete` pour créer et utiliser les classes de cette introduction.

Dans le projet CLion prévu pour les exercices C++, enregistrez les sources en `.cpp` et lancez le programme depuis l’IDE. Écrivez `std::cout` et `std::string` explicitement; évitez `using namespace std;`, particulièrement dans un en-tête.
