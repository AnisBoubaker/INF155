<!-- .slide: class="chapter" -->

<p class="section-kicker">03 · Faire évoluer et rendre la mémoire</p>

# <code>realloc</code> et <code>free</code>

<p class="lede">Redimensionner sans perdre le bloc existant, puis terminer proprement sa durée de vie.</p>

---

## Redimensionner avec <code>realloc</code>

```c
void *realloc(void *bloc, size_t nouvelle_taille);
```

La fonction peut :

- agrandir le bloc sur place;
- déplacer les données dans un nouveau bloc;
- échouer et retourner <code>NULL</code> sans libérer l’ancien bloc.

Tout pointeur vers l’intérieur de l’ancien bloc doit être recalculé après un succès.

---

## Le piège classique

```c
valeurs = realloc(valeurs, nouvelle_taille);  // dangereux
```

Si l’appel échoue, <code>valeurs</code> devient <code>NULL</code> et l’adresse de l’ancien bloc est perdue : fuite mémoire.

<p class="warning">Ne jamais remplacer le seul pointeur propriétaire avant d’avoir vérifié le résultat.</p>

---

## Patron sûr avec pointeur temporaire

```c
int *temp = realloc(valeurs, nouveau_nombre * sizeof *valeurs);

if (temp == NULL) {
    /* valeurs désigne encore l'ancien bloc */
} else {
    valeurs = temp;
    nombre = nouveau_nombre;
}
```

Le propriétaire change seulement après un succès.

---

## Libérer avec <code>free</code>

```c
free(valeurs);
valeurs = NULL;
```

Après <code>free</code> :

- le bloc n’appartient plus au programme;
- lire ou écrire par l’ancienne adresse est interdit;
- libérer une deuxième fois la même adresse est interdit;
- <code>free(NULL)</code> est permis et ne fait rien.

---

## Fuite et pointeur pendant

<div class="comparison">
  <div><h3>Fuite</h3><p>Le bloc existe encore, mais aucune adresse détenue ne permet de le libérer.</p></div>
  <div><h3>Pointeur pendant</h3><p>Le pointeur existe encore, mais l’objet désigné a été libéré ou a cessé d’exister.</p></div>
</div>

<p class="callout">Définir clairement le propriétaire de chaque bloc réduit les deux risques.</p>

---

## Nettoyage sur les chemins d’erreur

```c
int resultat = EXIT_FAILURE;
int *a = malloc(n * sizeof *a);
int *b = malloc(n * sizeof *b);

if (a != NULL && b != NULL) {
    /* traitement */
    resultat = EXIT_SUCCESS;
}

free(b);
free(a);
return resultat;
```

Chaque sortie doit libérer toutes les ressources déjà acquises.
