<!-- .slide: class="chapter" -->

<p class="section-kicker">03 · Partager une collection</p>

# Tableaux et fonctions

<p class="lede">Une fonction peut traiter les cases du tableau fourni, avec une taille explicite.</p>

---

## Tableau en paramètre

```c
double calculer_moyenne(const int notes[], int nombre);
```

Dans une liste de paramètres, les crochets indiquent que la fonction reçoit un accès aux éléments du tableau, et non une copie de toutes ses cases.

La taille ne fait pas partie de ce paramètre : il faut la transmettre séparément.

---

## Pourquoi transmettre la taille ?

```c
double calculer_moyenne(const int notes[], int nombre)
{
    int nombre_calcule = (int)(sizeof notes / sizeof notes[0]);
    // Ne donne pas le nombre d'éléments du tableau de l'appelant.
}
```

Dans une fonction, <code>sizeof notes</code> ne mesure pas le tableau fourni par l’appelant.

<p class="definition"><strong>Contrat :</strong> le tableau et son nombre d’éléments forment une paire indissociable.</p>

---

<!-- .slide: class="compact" -->

## Exemple · Calculer la moyenne

```c
double calculer_moyenne(const int notes[], int nombre)
{
    if (nombre <= 0) {
        return 0.0;
    }

    long somme = 0;
    for (int i = 0; i < nombre; ++i) {
        somme += notes[i];
    }

    return (double)somme / nombre;
}
```

<code>const</code> garantit que la fonction ne modifie pas les notes par ce paramètre.

---

## Modifier un tableau reçu

```c
void incrementer(int valeurs[], int nombre)
{
    for (int i = 0; i < nombre; ++i) {
        ++valeurs[i];
    }
}
```

L’appel modifie le tableau original :

```c
int nombres[] = {10, 20, 30};
incrementer(nombres, 3);
```

---

## Que reçoit la fonction ?

Le langage C passe toujours les arguments par valeur.

Pour un tableau, une règle particulière donne à la fonction un accès aux mêmes cases, sans copier toute la collection.

<div class="pointer-flow"><span><code>nombres</code><small>tableau de l’appelant</small></span><b>appel →</b><span><code>valeurs[]</code><small>paramètre</small></span><b>→</b><span>mêmes cases</span></div>

<p class="callout small">Le mécanisme exact sera expliqué au prochain cours, avec les adresses et les pointeurs.</p>

---

## Concevoir une bonne interface

Pour chaque fonction qui reçoit un tableau :

- transmettre une taille fiable;
- préciser si le tableau est lu ou modifié;
- utiliser <code>const</code> quand aucune modification n’est prévue;
- refuser une taille négative et définir le comportement pour une taille nulle;
- ne jamais accéder au-delà de la taille annoncée.
