<!-- .slide: class="chapter" -->

<p class="section-kicker">03 · Le langage C</p>

# Notre premier programme en C

<p class="lede">Observer l’anatomie d’un fichier source, puis exécuter le programme dans CLion.</p>

---

## Exécution d’un programme

Un programme peut exécuter des instructions une fois, choisir un chemin ou répéter un bloc.

<div class="three-col">
  <div class="card">
    <h3>Code séquentiel <span>(normal)</span></h3>
    <p>Chaque instruction s’exécute une fois, de haut en bas.</p>
    <pre><code class="language-c">prix = 12.50;
quantite = 2;
total = prix * quantite;</code></pre>
  </div>
  <div class="card">
    <h3>Structure conditionnelle</h3>
    <p>Un bloc s’exécute seulement si une condition est vraie.</p>
    <pre><code class="language-c">if (note &gt;= 60) {
	printf("Réussi");
} else {
	printf("Échec");
}</code></pre>
  </div>
  <div class="card">
    <h3>Boucle</h3>
    <p>Un bloc est répété tant qu’une condition le demande.</p>
    <pre><code class="language-c">for (i = 0; i &lt; 3; i++) {
	printf("%d\n", i);
}</code></pre>
  </div>
</div>

---

<!-- .slide: class="compact" -->

## Anatomie d’un programme

```c
/* Programme : calcul_salaire
 * Auteur    : Votre nom
 * Rôle      : Calculer et afficher un salaire.
 */

#include <stdio.h>
#include <stdlib.h>

int main(void)
{
	double taux_horaire;
	int nb_heures;
	printf("Taux horaire et nombre d'heures : ");
	if (scanf("%lf %d", &taux_horaire, &nb_heures) != 2) {
		return EXIT_FAILURE;
	}
	double salaire = nb_heures * taux_horaire;
	printf("Salaire : %.2f $\n", salaire);
	return EXIT_SUCCESS;
}
```

---

<!-- .slide: class="chapter" -->

<p class="section-kicker">Démonstration</p>

# Du fichier source à l’exécution

<p class="lede">Créer un projet, écrire le programme, l’exécuter et corriger les erreurs dans l’environnement de développement.</p>

---

## Exécuter un programme dans CLion

1. Ouvrir le projet de l’exercice dans CLion.
2. Écrire le programme dans le fichier source prévu.
3. Lancer le programme depuis l’IDE.
4. Lire le résultat dans la console et le comparer au résultat attendu.

<p class="callout">L’IDE prend en charge la construction du programme avec la configuration du projet.</p>

---

## Lire les messages de l’IDE

- Corriger les erreurs et les avertissements signalés par CLion.
- Vérifier que les fichiers nécessaires font partie du projet.
- Exécuter plusieurs cas, y compris les limites et les entrées incorrectes.
- Refaire les essais après une modification.

<p class="warning">Une exécution sans message d’erreur ne garantit pas que le résultat est correct.</p>

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
	printf("Taux horaire et nombre d'heures : ");
	if (scanf("%lf %d", &taux, &heures) != 2) {
		return 1;
	}

	double total = heures * taux;  /* Traitement. */
	printf("Salaire : %.2f $\n", total); /* Sortie. */

	return 0;
}
```
