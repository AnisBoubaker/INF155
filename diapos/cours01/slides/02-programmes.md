<!-- .slide: class="chapter" -->

<p class="section-kicker">02 · Du problème au code</p>

# Programme informatique : définition et fonctionnement

<p class="lede">Un programme traduit une stratégie de résolution en instructions exécutables par une machine.</p>

---

## Selon Larousse…

> Un programme informatique est un ensemble d’instructions et de données représentant un algorithme et susceptible d’être exécuté par un ordinateur.

<p class="small">Source d’origine : <a href="https://www.larousse.fr/dictionnaires/francais/programme/64207">Dictionnaire Larousse — programme</a></p>

---

## Programme informatique

<div class="pipeline">
  <div><strong>Code source</strong><span>Instructions lisibles par l’humain</span></div>
  <div><strong>Compilation</strong><span>Traduction et assemblage</span></div>
  <div><strong>Code machine</strong><span>Instructions exécutées par le processeur</span></div>
</div>

<ul>
  <li>Le code source est écrit dans un <strong>langage informatique</strong>.</li>
  <li>Un <strong>compilateur</strong> le traduit vers une représentation plus proche de la machine.</li>
  <li>Le processeur peut ensuite interpréter et exécuter les instructions binaires produites.</li>
</ul>

---

## Un compilateur

Un compilateur transforme un programme écrit dans un langage source en un programme équivalent dans un langage cible.

<div class="comparison">
  <div>
    <h3>Entrée</h3>
    <p>Code de haut niveau, structuré pour être lu et modifié par des humains.</p>
  </div>
  <div>
    <h3>Sortie</h3>
    <p>Code objet ou code machine adapté au système et au processeur visés.</p>
  </div>
</div>

<p class="small">Un compilateur détecte aussi de nombreuses erreurs de syntaxe et de type avant l’exécution.</p>

---

## Langage de haut niveau

<div class="pipeline">
  <div><strong><code>c = a + b;</code></strong><span>Langage C</span></div>
  <div><strong><code>MOV · ADD</code></strong><span>Assembleur</span></div>
  <div><strong><code>100100…</code></strong><span>Code machine</span></div>
</div>

- Utilise des mots, des identifiants et des structures compréhensibles.
- Permet d’exprimer une intention avec moins de détails que le langage machine.
- Doit être traduit avant d’être exécuté par le processeur.

---

## Algorithme

<div class="definition">
  <p><strong>Un algorithme</strong> est une suite finie et non ambiguë d’étapes permettant de résoudre un problème.</p>
</div>

Il décrit la <strong>stratégie</strong>, indépendamment des détails d’un langage de programmation.

<div class="cards">
  <div class="card"><h3>Entrées</h3><p>Les données nécessaires au problème.</p></div>
  <div class="card"><h3>Traitements</h3><p>Les opérations à effectuer.</p></div>
  <div class="card"><h3>Sorties</h3><p>Le résultat attendu.</p></div>
</div>

---

## Exemples de représentation

<div class="two-col">
  <div class="card">
    <h3>Organigramme</h3>
    <p>Représente graphiquement les étapes, les décisions et les boucles d’un algorithme.</p>
    <p class="small"><strong>Utile pour :</strong> visualiser le chemin d’exécution.</p>
  </div>
  <div class="card">
    <h3>Table de décision</h3>
    <img src="assets/table-decision.png" alt="Exemple de table de décision pour diagnostiquer une imprimante">
  </div>
</div>

---

<!-- .slide: class="code-compare" -->

## Algorithme ou programme ?

### Algorithme

### Programme en C

```text
Lire x
Lire y

Si x > y
    max ← x
Sinon
    max ← y

Afficher max
```

```c
int x, y, max;
scanf("%d", &x);
scanf("%d", &y);

if (x > y)
    max = x;
else
    max = y;

printf("%d\n", max);
```

---

## Pourquoi écrire un algorithme ?

- Se concentrer sur la solution avant de se préoccuper de la syntaxe.
- Raisonner indépendamment du langage de programmation.
- Communiquer clairement une stratégie à d’autres personnes.
- Réutiliser des solutions génériques : tri, recherche, parcours, etc.
- Décomposer un problème complexe en étapes vérifiables.

<p class="callout"><strong>Programmer commence par raisonner.</strong> Le code vient ensuite exprimer ce raisonnement.</p>
