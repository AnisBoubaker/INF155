<!-- .slide: class="chapter" -->

<p class="section-kicker">03 · Le langage C</p>

# Notre premier programme en C

<p class="lede">Observer l’anatomie d’un fichier source et le chemin qui mène à un programme exécutable.</p>

---

## Exécution d’un programme

Par défaut, les instructions s’exécutent <strong>dans l’ordre où elles apparaissent</strong>, du haut vers le bas.

<div class="two-col">
  <div class="card"><h3>Condition</h3><p>Un bloc s’exécute seulement si une expression prend la valeur vraie.</p></div>
  <div class="card"><h3>Boucle</h3><p>Un bloc est répété tant qu’une condition le demande.</p></div>
</div>

```c
if (x > y)
    maximum = x;
else
    maximum = y;
```

---

<!-- .slide: class="compact" -->

## Anatomie d’un programme

```c
/* Programme : CalculSalaire
 * Auteur    : Votre nom
 * Rôle      : Calculer et afficher un salaire.
 */

#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    double taux_horaire;
    int nb_heures;
    double salaire;

    printf("Taux horaire : ");
    scanf("%lf", &taux_horaire);

    salaire = nb_heures * taux_horaire;
    return EXIT_SUCCESS;
}
```

---

<!-- .slide: class="chapter" -->

<p class="section-kicker">Démonstration</p>

# Du fichier source à l’exécution

<p class="lede">Créer un projet, écrire le programme, le compiler, corriger les erreurs puis l’exécuter dans l’environnement de développement.</p>

---

## Compilation d’un programme

La compilation transforme du code de haut niveau en instructions que le processeur peut exécuter.

<div class="pipeline">
  <div><strong>Prétraitement</strong><span>Prépare le code source</span></div>
  <div><strong>Compilation</strong><span>Produit les fichiers objets</span></div>
  <div><strong>Liaison</strong><span>Construit l’exécutable</span></div>
</div>

<p class="small">Cette vue est volontairement simplifiée; les chaînes de compilation modernes comportent d’autres étapes internes.</p>

---

## Compilation d’un programme C

<div class="pipeline">
  <div><strong>1 · Prétraitement</strong><span><code>.c</code> → source préparée</span></div>
  <div><strong>2 · Compilation</strong><span>source → <code>.o</code> / <code>.obj</code></span></div>
  <div><strong>3 · Liaison</strong><span>objets → exécutable</span></div>
</div>

<div class="comparison">
  <div><h3>Votre code</h3><p>Les fichiers source que vous écrivez.</p></div>
  <div><h3>Les bibliothèques</h3><p>Du code déjà compilé, fourni par le système ou par d’autres projets.</p></div>
</div>

---

## 1 · Prétraitement

Le préprocesseur traite les lignes qui commencent par <code>#</code>.

- Insère le contenu des fichiers d’en-tête demandés avec <code>#include</code>.
- Remplace les macros définies avec <code>#define</code>.
- Inclut ou exclut des portions de code selon des conditions.

<p class="callout"><strong>Résultat :</strong> une version préparée du code source C, prête pour le compilateur.</p>

---

## 2 · Compilation

Chaque fichier source est analysé et traduit séparément.

- Vérification de la syntaxe et des types.
- Transformation en instructions adaptées à la plateforme ciblée.
- Production d’un <strong>fichier objet</strong> qui n’est pas encore un programme complet.

<p class="callout"><strong>Résultat :</strong> un ou plusieurs fichiers <code>.o</code> sur Unix/macOS ou <code>.obj</code> sous Windows.</p>

---

## 3 · Liaison

L’éditeur de liens rassemble les fichiers objets et les bibliothèques nécessaires.

<div class="pipeline">
  <div><strong><code>main.o</code></strong><span>Votre programme principal</span></div>
  <div><strong>Bibliothèques</strong><span>Fonctions comme <code>printf</code></span></div>
  <div><strong>Exécutable</strong><span>Programme complet</span></div>
</div>

<p class="small">Une référence manquante produit une erreur de liaison, même si chaque fichier source est syntaxiquement valide.</p>

---

## Étapes de conception d’un programme

<ol class="plan">
  <li>Comprendre le problème et les résultats attendus.</li>
  <li>Proposer un algorithme.</li>
  <li>Implémenter et documenter la solution en C.</li>
  <li>Vérifier le fonctionnement et valider le besoin.</li>
  <li>Améliorer la lisibilité, la structure et l’efficacité.</li>
</ol>

---

## Programmer, c’est…

<div class="cards">
  <div class="card"><h3>1 · Abstraire</h3><p>Identifier le vrai problème et écarter les détails non pertinents.</p></div>
  <div class="card"><h3>2 · Décomposer</h3><p>Transformer un grand problème en sous-problèmes plus simples.</p></div>
  <div class="card"><h3>3 · Résoudre</h3><p>Concevoir une solution pour chaque sous-problème.</p></div>
  <div class="card"><h3>4 · Combiner</h3><p>Assembler les solutions en un programme cohérent.</p></div>
  <div class="card"><h3>5 · Évaluer</h3><p>Vérifier qu’on le fait bien et valider qu’on fait la bonne chose.</p></div>
  <div class="card"><h3>6 · Itérer</h3><p>Corriger, simplifier et recommencer.</p></div>
</div>

---

## Programmer, ça nécessite…

<div class="cards">
  <div class="card">
    <h3>De la patience</h3>
    <p>Un programme fonctionne rarement parfaitement du premier coup. Chaque erreur comprise devient une compétence.</p>
  </div>
  <div class="card">
    <h3>Du raisonnement</h3>
    <p>La logique et la rigueur comptent davantage que les calculs compliqués.</p>
  </div>
  <div class="card">
    <h3>De la pratique</h3>
    <p>Lire du code aide; en écrire, l’exécuter et le corriger fait progresser.</p>
  </div>
</div>

<p class="exercise"><strong>Réflexe utile :</strong> si le programme ne fait pas ce qui était prévu, partir des faits observables et suivre les données étape par étape.</p>

---

## Composition d’un programme en C

- Déclarations de variables et de constantes.
- Expressions : affectations, calculs, comparaisons.
- Ruptures de séquence :
  - structures répétitives;
  - retours de fonctions.
- Appels aux fonctions de la bibliothèque standard.
- Appels aux fonctions définies par le programmeur.

---

<!-- .slide: class="compact" -->

## Relire l’anatomie du programme

```c
/* Commentaires : objectif, auteur, explications utiles. */

#include <stdio.h>   /* Commande du préprocesseur. */

int main(void)       /* Point d’entrée du programme. */
{
    double taux;     /* Déclarations de variables. */
    int heures;
    double total;

    printf("Taux horaire : ");
    scanf("%lf", &taux);
    printf("Nombre d'heures : ");
    scanf("%d", &heures);

    total = heures * taux;  /* Traitement. */
    printf("Salaire : %.2f $\n", total); /* Sortie. */

    return 0;
}
```
