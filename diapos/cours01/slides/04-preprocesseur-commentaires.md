<!-- .slide: class="chapter" -->

<p class="section-kicker">04 · Préparer et expliquer le code</p>

# Commandes du préprocesseur

<p class="lede">Avant la compilation, le préprocesseur peut insérer, remplacer ou retirer du texte dans le code source.</p>

---

## Rôle du préprocesseur

Le préprocesseur effectue un traitement <strong>statique</strong>, avant la traduction en code machine.

<div class="cards">
  <div class="card"><h3>Insérer</h3><p>Inclure le contenu d’un autre fichier.</p></div>
  <div class="card"><h3>Remplacer</h3><p>Substituer une macro par sa valeur.</p></div>
  <div class="card"><h3>Choisir</h3><p>Conserver ou retirer du code selon une condition.</p></div>
</div>

<p class="callout">Pour commencer : <code>#include</code> et <code>#define</code>.</p>

---

## La commande `#include`

Insère le contenu d’un fichier d’en-tête dans le fichier source.

```c
#include <stdio.h>       // En-tête de la bibliothèque standard
#include "mon_module.h" // En-tête appartenant au projet
```

<div class="comparison">
  <div><h3>Chevrons <code>&lt;…&gt;</code></h3><p>Recherchent normalement dans les chemins des bibliothèques et du compilateur.</p></div>
  <div><h3>Guillemets <code>"…"</code></h3><p>Recherchent d’abord dans le projet, puis dans les chemins configurés.</p></div>
</div>

---

## La commande `#define`

Définit une <strong>macro</strong> : le préprocesseur remplace chaque occurrence de l’identifiant par le texte associé.

```c
#define PI 3.141592653589793
#define NB_ESSAIS_MAX 3
```

```c
double circonference = 2.0 * PI * rayon;
```

<p class="small">Pour une valeur typée, le langage C permet aussi d’utiliser une variable qualifiée par <code>const</code>.</p>

---

<!-- .slide: class="chapter" -->

<p class="section-kicker">Documenter l’intention</p>

# Les commentaires

<p class="lede">Le compilateur les ignore; les humains, eux, en ont besoin pour comprendre les décisions importantes.</p>

---

## Pourquoi commenter ?

- Expliquer l’objectif d’un programme ou d’un module.
- Préciser le sens, l’unité ou les contraintes d’une donnée.
- Justifier une décision qui n’est pas évidente dans le code.
- Faciliter la reprise du travail après plusieurs jours ou mois.
- Aider les collègues, les correcteurs… et votre futur vous.

<p class="callout"><strong>Un bon commentaire explique « pourquoi ».</strong> Le code devrait déjà montrer « quoi » et « comment ».</p>

---

## Commentaires : quelques guides

<div class="comparison">
  <div>
    <h3>À faire</h3>
    <ul>
      <li>Documenter le rôle d’un fichier et d’une fonction.</li>
      <li>Nommer les unités et les hypothèses.</li>
      <li>Expliquer une logique délicate.</li>
      <li>Mettre le commentaire à jour avec le code.</li>
    </ul>
  </div>
  <div>
    <h3>À éviter</h3>
    <ul>
      <li>Traduire chaque ligne en français.</li>
      <li>Répéter ce qu’un bon identifiant dit déjà.</li>
      <li>Écrire des paragraphes difficiles à relire.</li>
      <li>Laisser un commentaire devenu faux.</li>
    </ul>
  </div>
</div>

---

## Formats de commentaires

<div class="two-col compact">
  <div>
    <h3>Sur une ligne</h3>
    <pre><code class="language-c">// Calculer le total après taxes.
total = sous_total + taxes;</code></pre>
    <p class="small">Commence par <code>//</code> et se termine à la fin de la ligne.</p>
  </div>
  <div>
    <h3>En bloc</h3>
    <pre><code class="language-c">/*
 * Programme : CalculSalaire
 * Auteur    : Votre nom
 */</code></pre>
    <p class="small">Commence par <code>/*</code> et se termine par <code>*/</code>.</p>
  </div>
</div>
