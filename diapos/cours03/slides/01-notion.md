<!-- .slide: class="chapter" -->

<p class="section-kicker">01 · Nommer un traitement</p>

# Les sous-programmes

<p class="lede">Un bloc d’instructions cohérent, accessible par un nom distinctif.</p>

---

## Sous-programme

On appelle <strong>sous-programme</strong>, <strong>routine</strong> ou <strong>fonction</strong> un ensemble d’instructions qui effectue un traitement précis.

Un sous-programme permet de :

- subdiviser un problème en problèmes plus simples;
- réutiliser un traitement déjà écrit;
- isoler et tester une responsabilité;
- faciliter la lecture et la maintenance.

<p class="definition"><strong>Idée centrale :</strong> donner un nom clair à une opération complète.</p>

---

## Des fonctions déjà rencontrées

Jusqu’ici, nous avons déjà utilisé plusieurs fonctions :

```c
printf("Bonjour\n");
scanf("%d", &age);
```

<div class="cards">
  <div class="card"><h3><code>main</code></h3><p>Point d’entrée de notre programme.</p></div>
  <div class="card"><h3><code>printf</code></h3><p>Produit une sortie formatée.</p></div>
  <div class="card"><h3><code>scanf</code></h3><p>Analyse une entrée formatée.</p></div>
</div>

<p class="callout small">Les fonctions de la bibliothèque standard sont déclarées dans des fichiers d’en-tête comme <code>stdio.h</code>.</p>

---

## D’un bloc monolithique à plusieurs fonctions

<div class="module-split">
  <div class="monolith"><strong><code>main</code></strong><span>Tout le programme dans un seul bloc</span></div>
  <div class="split-arrow" aria-hidden="true">→</div>
  <div class="modules">
    <strong><code>main</code></strong>
    <span><code>saisir_donnees</code></span>
    <span><code>calculer_total</code></span>
    <span><code>afficher_resultat</code></span>
  </div>
</div>

<p class="callout">Chaque fonction répond à une question plus petite et plus facile à vérifier.</p>

---

## Exemples de sous-programmes

Une fonction peut notamment :

- déterminer le plus grand de deux nombres;
- calculer le terme d’une suite;
- afficher la commande d’un client;
- présenter un menu et demander un choix;
- valider une saisie;
- convertir une unité de mesure.

<p class="definition"><strong>Bon nom :</strong> un verbe et un complément qui expriment l’action, par exemple <code>calculer_total</code>.</p>

---

## Exemple · Décomposer un achat

<div class="call-graph">
  <div class="caller"><code>main</code></div>
  <div class="callee"><code>saisir_produit</code></div>
  <div class="callee"><code>calculer_tps</code></div>
  <div class="callee"><code>calculer_tvq</code></div>
  <div class="callee"><code>afficher_facture</code></div>
</div>

<p class="small"><code>main</code> coordonne la séquence; chaque autre fonction prend en charge une responsabilité précise.</p>

---

## À quoi sert une fonction ?

Une fonction utile doit accomplir au moins une de ces tâches :

<div class="comparison">
  <div><h3>Calculer</h3><p>Produire une valeur à partir de ses données d’entrée.</p></div>
  <div><h3>Agir</h3><p>Avoir un effet observable : afficher, écrire, commander un dispositif, etc.</p></div>
</div>

Une fonction peut faire les deux, mais séparer calcul et effets facilite généralement les tests.

<p class="callout"><strong>Une responsabilité principale</strong> par fonction.</p>

---

## Fonction ou procédure ?

Historiquement, on distingue :

| Terme | Rôle | En C |
|---|---|---|
| Fonction | Calcule et fournit un résultat | type de retour différent de <code>void</code> |
| Procédure | Effectue un traitement sans fournir de valeur | type de retour <code>void</code> |

Dans ce cours, le terme <strong>fonction</strong> désigne les deux formes.

```c
double calculer_tps(double sous_total);
void afficher_facture(double total);
```
