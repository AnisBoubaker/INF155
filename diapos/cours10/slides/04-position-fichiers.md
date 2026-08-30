<!-- .slide: class="chapter" -->

<p class="section-kicker">04 · Gérer la position et le fichier</p>

# Positionner, renommer, supprimer

<p class="lede">Certaines opérations changent le flux; d’autres changent l’entrée du système de fichiers.</p>

---

## Position dans le flux

```c
long position = ftell(fichier);
fseek(fichier, 0L, SEEK_SET);
rewind(fichier);
```

- <code>ftell</code> obtient une position utilisable par <code>fseek</code>;
- <code>fseek</code> déplace la position;
- <code>rewind</code> revient au début et efface les indicateurs d’erreur et de fin.

<p class="tiny">En mode texte, seules certaines positions et origines sont portables.</p>

---

## Renommer un fichier

```c
if (rename("ancien.txt", "nouveau.txt") != 0) {
    perror("rename");
}
```

Le résultat dépend du système : destination existante, volumes différents et permissions peuvent changer le comportement.

---

## Supprimer un fichier

```c
if (remove("temporaire.txt") != 0) {
    perror("remove");
}
```

La suppression est une opération destructive. Le programme doit viser un chemin explicite et traiter les erreurs.

<p class="warning">Ne jamais construire un chemin de suppression à partir d’une entrée non validée.</p>

---

## Écriture plus sûre d’un fichier complet

Pour éviter de laisser un fichier final partiellement écrit :

1. écrire dans un fichier temporaire du même répertoire;
2. vérifier toutes les écritures et la fermeture;
3. remplacer le fichier final par renommage;
4. supprimer le temporaire en cas d’échec.

<p class="callout small">La garantie exacte d’atomicité dépend du système de fichiers, mais ce patron réduit fortement les fichiers corrompus.</p>
