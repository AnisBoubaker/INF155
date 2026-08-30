# INF155 — diapositives Reveal.js

Site statique pour les notes de cours INF155. Aucun traitement côté serveur n’est requis : GitHub Actions publie directement les fichiers HTML, CSS, JavaScript, Markdown et les médias sur GitHub Pages.

## Modifier un cours

Le petit fichier `diapos/cours01/index.html` ne contient que le squelette Reveal.js. Le contenu est réparti par thème dans `diapos/cours01/slides/` :

- `00-introduction.md`
- `01-architecture.md`
- `02-programmes.md`
- `03-premier-programme.md`
- `04-preprocesseur-commentaires.md`
- `05-variables-types.md`
- `06-entrees-sorties.md`

Tous les cours suivent le même principe :

- `diapos/cours02/slides/` : expressions, structures conditionnelles et boucles;
- `diapos/cours03/slides/` : fonctions, appels, décomposition, portée et mémoire.
- `diapos/cours04/slides/` : pointeurs, adresses, fonctions et tableaux;
- `diapos/cours05/slides/` : tableaux 1D et fonctions;
- `diapos/cours06/slides/` : tableaux 2D, tris et modules;
- `diapos/cours07/slides/` : chaînes de caractères et bibliothèque standard;
- `diapos/cours08/slides/` : enregistrements et encapsulation;
- `diapos/cours09/slides/` : allocation dynamique;
- `diapos/cours10/slides/` : fichiers et analyse de texte.

Dans un fichier Markdown, une ligne contenant seulement `---` crée une nouvelle diapositive. Les images propres à une séance vont dans son dossier `assets/`. Le thème et les diagrammes réutilisables sont dans `css/inf155.css`, et la configuration Reveal commune dans `js/inf155.js`.

### Comparer deux extraits de code

La classe partagée `code-compare` place automatiquement deux titres et deux blocs Markdown en colonnes. Aucun HTML n’est nécessaire pour le contenu :

~~~markdown
<!-- .slide: class="code-compare" -->

## Algorithme ou programme ?

### Algorithme

### Programme en C

```text
Lire x
Afficher x
```

```c
scanf("%d", &x);
printf("%d\n", x);
```
~~~

Avant de publier, vérifier les chemins locaux avec :

```sh
node scripts/check-links.mjs
```

## Aperçu local

Les fichiers Markdown sont chargés par le navigateur; il faut donc un petit serveur HTTP local :

```sh
python3 -m http.server 8000
```

Puis ouvrir <http://localhost:8000/>. Ce serveur sert uniquement à l’aperçu local; il n’existe pas en production.

Raccourcis utiles dans une présentation :

- `Espace`, `→` : diapositive suivante
- `←` : diapositive précédente
- `O` : vue d’ensemble
- `S` : notes du présentateur
- `Ctrl`/`Cmd` + `Shift` + `F` : recherche
- `H` : retour à l’accueil INF155

## Ajouter un cours

1. Copier le dossier d’un cours existant vers le nouveau numéro.
2. Remplacer les fichiers dans `slides/` et `assets/`.
3. Mettre à jour les métadonnées et la liste des fichiers Markdown dans le nouvel `index.html`.
4. Ajouter la carte du cours dans l’`index.html` racine.

## Publication sur GitHub Pages

1. Créer un dépôt GitHub et y pousser la branche `main`.
2. Dans **Settings → Pages**, choisir **GitHub Actions** comme source.
3. Le flux `.github/workflows/pages.yml` publiera ensuite le site à chaque poussée sur `main`.

Reveal.js 4.4.0 est inclus localement dans `vendor/reveal/` afin que les présentations ne dépendent pas d’un CDN. Sa licence MIT est conservée dans ce dossier.
