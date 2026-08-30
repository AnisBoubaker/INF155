<!-- .slide: class="chapter" -->

<p class="section-kicker">03 · Transmettre un enregistrement</p>

# Structures et fonctions

<p class="lede">Choisir entre copie, lecture par adresse et modification par adresse.</p>

---

## Passage par valeur

```c
void afficher_etudiant(Etudiant etudiant)
{
    printf("%s, %s\n", etudiant.nom, etudiant.prenom);
}
```

La fonction reçoit une copie complète. Ses modifications n’affectent pas l’original, mais copier un grand enregistrement peut être coûteux.

---

## Passage par pointeur constant

```c
void afficher_etudiant(const Etudiant *etudiant)
{
    printf("%s, %s\n", etudiant->nom, etudiant->prenom);
}
```

L’adresse évite la copie; <code>const</code> interdit la modification par ce pointeur.

```c
afficher_etudiant(&etudiant);
```

---

## L’opérateur <code>-></code>

Pour un pointeur vers une structure :

```c
etudiant->note_final
```

est équivalent à :

```c
(*etudiant).note_final
```

Les parenthèses sont nécessaires dans la seconde forme, car <code>.</code> a priorité sur <code>*</code>.

---

## Modifier un enregistrement

```c
bool definir_note(Etudiant *etudiant, size_t evaluation, int note)
{
    if (etudiant == NULL || evaluation >= 5 || note < 0 || note > 100) {
        return false;
    }

    etudiant->notes[evaluation] = note;
    return true;
}
```

Le contrat valide à la fois le pointeur, l’indice et la note.

---

## Calculer une moyenne

```c
double moyenne(const Etudiant *etudiant)
{
    static const double poids[] = {0.1, 0.1, 0.1, 0.3, 0.4};
    double total = 0.0;

    for (size_t i = 0; i < 5; ++i) {
        total += etudiant->notes[i] * poids[i];
    }
    return total;
}
```

---

## Retourner une structure

Une fonction peut retourner une structure par valeur.

```c
Etudiant creer_etudiant(void)
{
    Etudiant resultat = {0};
    return resultat;
}
```

Cette forme est sûre : le résultat est une valeur copiée, pas l’adresse d’une variable locale.
