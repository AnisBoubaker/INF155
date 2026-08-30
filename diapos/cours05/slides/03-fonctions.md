<!-- .slide: class="chapter" -->

<p class="section-kicker">03 · Partager une collection</p>

# Tableaux et fonctions

<p class="lede">Une fonction reçoit l’adresse du premier élément et une taille explicite.</p>

---

## Tableau en paramètre

```c
double calculer_moyenne(const int notes[], size_t nombre);
```

À l’intérieur de la fonction, <code>notes</code> est ajusté en pointeur vers <code>int</code>.

Ces prototypes sont équivalents :

```c
double calculer_moyenne(const int notes[], size_t nombre);
double calculer_moyenne(const int *notes, size_t nombre);
```

---

## Pourquoi transmettre la taille ?

```c
double calculer_moyenne(const int notes[], size_t nombre)
{
    sizeof notes;  // taille d'un pointeur, pas du tableau original
}
```

Le paramètre ne transporte aucune information sur le nombre de cases disponibles.

<p class="definition"><strong>Contrat :</strong> le pointeur et le nombre d’éléments forment une paire indissociable.</p>

---

<!-- .slide: class="compact" -->

## Exemple · Calculer la moyenne

```c
double calculer_moyenne(const int notes[], size_t nombre)
{
    if (nombre == 0) {
        return 0.0;
    }

    long somme = 0;
    for (size_t i = 0; i < nombre; ++i) {
        somme += notes[i];
    }

    return (double)somme / nombre;
}
```

<code>const</code> garantit que la fonction ne modifie pas les notes par ce paramètre.

---

## Modifier un tableau reçu

```c
void incrementer(int valeurs[], size_t nombre)
{
    for (size_t i = 0; i < nombre; ++i) {
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

## Tableau passé « par référence » ?

Le langage C passe toujours les arguments par valeur.

Pour un tableau, l’expression fournie à la fonction est convertie en adresse du premier élément; cette adresse est copiée dans le paramètre.

<div class="pointer-flow"><span><code>nombres</code><small>adresse du premier élément</small></span><b>copie →</b><span><code>valeurs</code><small>pointeur local</small></span><b>→</b><span>mêmes cases</span></div>

---

## Concevoir une bonne interface

Pour chaque fonction qui reçoit un tableau :

- transmettre une taille fiable;
- préciser si le tableau est lu ou modifié;
- utiliser <code>const</code> quand aucune modification n’est prévue;
- définir le comportement pour une taille nulle;
- ne jamais accéder au-delà de la taille annoncée.

---

<!-- .slide: class="chapter compact" -->

<p class="section-kicker">À retenir</p>

# Tableaux 1D · À retenir

<ol class="plan">
  <li>Les indices commencent à zéro.</li>
  <li>La dernière case est à l’indice <code>taille - 1</code>.</li>
  <li><code>sizeof</code> ne retrouve pas la longueur dans une fonction.</li>
  <li>Un paramètre <code>const</code> protège les données en lecture seule.</li>
</ol>
