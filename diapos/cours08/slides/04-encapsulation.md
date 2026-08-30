<!-- .slide: class="chapter" -->

<p class="section-kicker">04 · Protéger les invariants</p>

# Encapsuler un enregistrement

<p class="lede">Centraliser les opérations qui créent, consultent et modifient les données.</p>

---

## Pourquoi encapsuler ?

L’accès direct à tous les champs permet à n’importe quel code de créer un état invalide.

Un module peut offrir :

- une fonction d’initialisation;
- des accesseurs en lecture;
- des modificateurs qui valident les valeurs;
- des calculs propres au type;
- une fonction d’affichage.

---

## Interface · <code>etudiant.h</code>

```c
#ifndef ETUDIANT_H
#define ETUDIANT_H

#include <stdbool.h>
#include <stddef.h>

typedef struct {
    char nom[40];
    char prenom[40];
    char code[16];
    int notes[5];
} Etudiant;

bool etudiant_initialiser(Etudiant *e, const char *nom,
                          const char *prenom, const char *code);
double etudiant_moyenne(const Etudiant *e);

#endif
```

---

## Initialiser sans allocation dynamique

```c
bool etudiant_initialiser(Etudiant *e, const char *nom,
                          const char *prenom, const char *code)
{
    if (e == NULL || strlen(nom) >= sizeof e->nom ||
        strlen(prenom) >= sizeof e->prenom ||
        strlen(code) >= sizeof e->code) {
        return false;
    }

    strcpy(e->nom, nom);
    strcpy(e->prenom, prenom);
    strcpy(e->code, code);
    memset(e->notes, 0, sizeof e->notes);
    return true;
}
```

---

## Accesseurs et modificateurs

```c
const char *etudiant_nom(const Etudiant *e)
{
    return e->nom;
}

bool etudiant_definir_note(Etudiant *e, size_t i, int note)
{
    if (e == NULL || i >= 5 || note < 0 || note > 100) {
        return false;
    }
    e->notes[i] = note;
    return true;
}
```

---

## Utiliser le module

```c
Etudiant ada;

if (etudiant_initialiser(&ada, "Lovelace", "Ada", "LOVA12345678")) {
    etudiant_definir_note(&ada, 0, 95);
    printf("%.1f\n", etudiant_moyenne(&ada));
}
```

Le code client exprime des opérations métier plutôt que des détails de représentation.

---

<!-- .slide: class="chapter" -->

<p class="section-kicker">À retenir</p>

# Une entité devient une seule valeur cohérente

<ol class="plan">
  <li>Regrouper les champs qui décrivent la même chose.</li>
  <li>Utiliser <code>.</code> pour un objet et <code>-></code> pour un pointeur.</li>
  <li>Passer les grandes structures par pointeur <code>const</code> en lecture.</li>
  <li>Centraliser la validation dans le module.</li>
</ol>
