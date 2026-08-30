<!-- .slide: class="chapter" -->

<p class="section-kicker">05 · Savoir où une donnée existe</p>

# Portée des variables

<p class="lede">La déclaration d’un nom détermine la région du code où ce nom est accessible.</p>

---

## Portée lexicale

La <strong>portée</strong> d’un identifiant est la portion du code où il peut être utilisé.

Règles essentielles en C :

- une variable locale est visible de sa déclaration jusqu’à la fin du bloc qui la contient;
- un paramètre est local au corps de sa fonction;
- deux fonctions peuvent avoir des variables locales portant le même nom;
- un identifiant déclaré hors de toute fonction possède une portée de fichier.

<p class="callout small">Depuis C99, une variable locale n’a pas besoin d’être déclarée au début du bloc.</p>

---

<!-- .slide: class="compact" -->

## Portée · Exemple

```c
void fonction_test(void);

int main(void)
{
    int i = 100;
    fonction_test();
    printf("%d\n", j);  // erreur : j n'est pas visible ici
    return EXIT_SUCCESS;
}

void fonction_test(void)
{
    int j = 3;
    printf("%d\n", i);  // erreur : i n'est pas visible ici
}
```

<p class="definition">Les deux appels se trouvent dans des fonctions différentes; leurs variables locales n’appartiennent pas à la même portée.</p>

---

## Variables globales

Une variable définie hors de toute fonction a une durée de vie qui couvre l’exécution du programme et une portée déterminée par sa déclaration.

```c
int compteur_global = 0;
```

Par opposition, une variable déclarée dans un bloc est <strong>locale</strong> à ce bloc.

<p class="warning"><strong>Global ne signifie pas universel :</strong> entre plusieurs fichiers, la visibilité dépend aussi des déclarations et de la liaison.</p>

---

<!-- .slide: class="compact" -->

## Exemple avec variables globales

```c
int i = 0;
int j;

void fonction_test(void);

int main(void)
{
    i = 100;
    fonction_test();
    printf("j = %d\n", j);
    return EXIT_SUCCESS;
}

void fonction_test(void)
{
    j = i % 3;
}
```

Le programme compile, mais plusieurs fonctions peuvent maintenant lire ou modifier le même état partagé.

---

## Composition avec état global

<div class="program-layout program-layout--stacked">
  <div class="global-block">Variables globales</div>
  <div>Prototypes des fonctions</div>
  <div class="program-main">Fonction <code>main</code></div>
  <div class="program-functions">Définitions des fonctions</div>
</div>

Chaque fonction dépend potentiellement des variables globales, même si cette dépendance n’apparaît pas dans ses paramètres.

---

## Variables globales · Mise en garde

L’état global mutable :

- cache les dépendances entre fonctions;
- peut être modifié depuis plusieurs endroits;
- complique les tests et le diagnostic d’erreurs;
- rend la réutilisation plus difficile.

<p class="warning"><strong>Règle du cours :</strong> ne pas utiliser de variables globales, sauf demande explicite dans un exercice.</p>

<p class="callout small">Préférer transmettre les données par paramètres et récupérer les résultats par valeur de retour.</p>

---

## Variables et mémoire <span class="small">(modèle simplifié)</span>

L’espace mémoire d’un processus est habituellement présenté en plusieurs régions :

<div class="memory-layout">
  <div class="memory-stack"><strong>Pile</strong><span>Appels, paramètres et variables locales</span></div>
  <div class="memory-heap"><strong>Tas</strong><span>Allocation dynamique</span></div>
  <div class="memory-data"><strong>Données</strong><span>Variables statiques et globales</span></div>
  <div class="memory-code"><strong>Code</strong><span>Instructions du programme</span></div>
</div>

<p class="tiny">La disposition exacte dépend du système, du compilateur et des optimisations. Ce modèle sert à raisonner sur la durée de vie des données.</p>

---

## Chargement du programme

<div class="memory-layout memory-layout--state">
  <div class="memory-stack muted"><strong>Pile</strong><span>Prête pour les appels</span></div>
  <div class="memory-heap muted"><strong>Tas</strong><span>Disponible</span></div>
  <div class="memory-data active"><strong>Données</strong><span><code>double k;</code></span></div>
  <div class="memory-code active"><strong>Code</strong><span><code>main</code>, <code>fonction_test</code></span></div>
</div>

Au chargement, le code exécutable et les objets à durée statique sont mis en place avant l’entrée dans <code>main</code>.

---

## Appel de <code>main</code>

<div class="stack-view">
  <div class="stack-label">Pile des appels</div>
  <div class="stack-frame active"><strong><code>main</code></strong><span><code>i = 100</code></span><span>adresse de retour</span></div>
</div>

Un <strong>cadre de pile</strong> est associé à l’appel de <code>main</code>. Il contient conceptuellement ses variables locales et les informations nécessaires au retour.

---

## Appel de <code>fonction_test</code>

<div class="stack-view">
  <div class="stack-label">Pile des appels</div>
  <div class="stack-frame active"><strong><code>fonction_test</code></strong><span><code>param = …</code></span><span><code>j = …</code></span></div>
  <div class="stack-frame"><strong><code>main</code></strong><span><code>i = 100</code></span><span>adresse de retour</span></div>
</div>

Chaque appel possède son propre contexte : paramètres, variables locales et adresse de retour.

---

## Sortie d’une fonction

<div class="stack-view">
  <div class="stack-label">Pile des appels</div>
  <div class="stack-frame leaving"><strong><code>fonction_test</code></strong><span>cadre libéré</span></div>
  <div class="stack-frame active"><strong><code>main</code></strong><span><code>i = 100</code></span><span>reprend après l’appel</span></div>
</div>

Quand l’appel se termine, ses variables locales cessent d’exister et son espace peut être réutilisé.

<p class="warning small">Retourner l’adresse d’une variable locale créerait donc une adresse invalide.</p>

---

## Reprise dans l’appelant

```c
i = 100;
fonction_test();
printf("Traitement terminé.\n");  // reprise ici
```

<div class="return-flow"><code>fonction_test</code><span>retour →</span><strong><code>main</code></strong><span>→</span><code>instruction suivante</code></div>

L’adresse de retour conservée avec l’appel permet de reprendre au bon endroit.

---

## Fin du programme

<div class="memory-layout memory-layout--state">
  <div class="memory-stack leaving"><strong>Pile</strong><span>cadre de <code>main</code> libéré</span></div>
  <div class="memory-heap leaving"><strong>Tas</strong><span>ressources du processus récupérées</span></div>
  <div class="memory-data leaving"><strong>Données</strong><span>fin de la durée de vie statique</span></div>
  <div class="memory-code leaving"><strong>Code</strong><span>processus terminé</span></div>
</div>

Après le retour de <code>main</code>, le système d’exploitation récupère les ressources du processus.

---

<!-- .slide: class="chapter" -->

<p class="section-kicker">Avant le laboratoire</p>

# Concevoir avec des fonctions

<ol class="plan">
  <li>Écrire un prototype cohérent avec un besoin.</li>
  <li>Distinguer paramètres, arguments et variables locales.</li>
  <li>Tracer un appel et sa valeur de retour.</li>
  <li>Décomposer un programme sans état global mutable.</li>
</ol>
