## Composition d’un programme <span class="small">(jusqu’ici)</span>

Nos premiers programmes contenaient surtout une seule fonction :

```c
int main(void)
{
    // déclarations
    // saisie
    // calculs
    // affichage
    return EXIT_SUCCESS;
}
```

Lorsque le problème grandit, <code>main</code> devient trop long et mélange plusieurs responsabilités.

---

## Composition · Première décomposition

<div class="program-layout">
  <div class="program-main">Fonction <code>main</code></div>
  <div class="program-functions">Autres fonctions</div>
</div>

Cette organisation soulève une question :

> Dans quel ordre les fonctions doivent-elles apparaître dans le fichier source ?

---

## Pourquoi déclarer un prototype ?

Avant de vérifier un appel, le compilateur doit connaître :

- le nom de la fonction;
- son type de retour;
- les types de ses paramètres.

Définir toutes les fonctions avant <code>main</code> fonctionne, mais nuit parfois à la lecture et ne résout pas bien les appels mutuels.

<p class="definition"><strong>Solution :</strong> déclarer les prototypes avant <code>main</code>, puis placer les définitions après.</p>

---

## Déclaration d’un prototype

Une déclaration reprend le prototype et se termine par un point-virgule.

```c
unsigned long long factorielle(int n);
void afficher_resultat(int n, unsigned long long resultat);
```

Le programmeur annonce ainsi au compilateur qu’une définition compatible sera fournie ailleurs.

<p class="warning small">La déclaration et la définition doivent avoir des types compatibles.</p>

---

## Exemple · Prototype documenté

```c
/*
 * Calcule la factorielle d'un entier n.
 * Paramètre : n, entier compris entre 0 et 20.
 * Retour : n! sous forme d'entier non signé.
 */
unsigned long long factorielle(int n);
```

Le prototype suffit pour compiler un appel placé avant la définition complète.

---

## Composition recommandée

<div class="program-layout program-layout--stacked">
  <div>Directives du préprocesseur</div>
  <div>Constantes et types partagés</div>
  <div>Prototypes des fonctions</div>
  <div class="program-main">Fonction <code>main</code></div>
  <div class="program-functions">Définitions des fonctions</div>
</div>

<p class="callout small">Dans un projet à plusieurs fichiers, les déclarations partagées se trouvent généralement dans des fichiers d’en-tête.</p>

---

<!-- .slide: class="chapter" -->

<p class="section-kicker">04 · Concevoir par parties</p>

# Décomposition en sous-programmes

<p class="lede">Transformer un problème complexe en responsabilités simples et testables.</p>

---

## Objectifs de la décomposition <span class="small">(1/2)</span>

<h3>Éviter la redondance</h3>

Si un traitement identique ou très semblable apparaît plusieurs fois, l’extraire dans une fonction limite les duplications.

<h3>Faciliter la conception</h3>

- résoudre plusieurs petits problèmes plutôt qu’un seul problème monolithique;
- nommer les étapes importantes de l’algorithme;
- utiliser l’abstraction : comprendre le contrat sans connaître tous les détails internes.

---

## Objectifs de la décomposition <span class="small">(2/2)</span>

<h3>Favoriser la réutilisation</h3>

Écrire des fonctions assez générales pour servir dans plusieurs contextes.

<h3>Améliorer la robustesse</h3>

- tester une fonction à la fois;
- isoler plus facilement la source d’une erreur;
- limiter les effets de bord;
- remplacer une implémentation sans modifier ses appelants.

<p class="callout"><strong>Une bonne fonction possède un contrat clair et une responsabilité cohérente.</strong></p>
