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

## Interface · <code>etudiant.h</code> <span class="small">(début)</span>

Les deux extraits suivants forment un même fichier d’en-tête.

```c
#ifndef ETUDIANT_H
#define ETUDIANT_H

#include <stdio.h>
#include <string.h>

#define TAILLE_NOM 40
#define TAILLE_CODE 16
#define NB_NOTES 5

typedef struct etudiant {
	char nom[TAILLE_NOM];
	char prenom[TAILLE_NOM];
	char code[TAILLE_CODE];
	int notes[NB_NOTES];
} Etudiant;
```

---

## Interface · <code>etudiant.h</code> <span class="small">(suite)</span>

```c
int etudiant_initialiser(Etudiant *e, const char *nom,
	const char *prenom, const char *code);
double etudiant_moyenne(const Etudiant *e);
const char *etudiant_nom(const Etudiant *e);
int etudiant_definir_note(Etudiant *e, int i, int note);
#endif
```

L’initialisation retourne un <code>int</code> : <code>1</code> pour la réussite, <code>0</code> pour l’échec.

---

<!-- .slide: class="compact" -->

## Initialiser sans allocation dynamique

```c
int etudiant_initialiser(Etudiant *e, const char *nom,
	const char *prenom, const char *code)
{
	if (e == NULL || nom == NULL || prenom == NULL || code == NULL) {
		return 0;
	}
	if ((int)strlen(nom) >= TAILLE_NOM ||
		(int)strlen(prenom) >= TAILLE_NOM ||
		(int)strlen(code) >= TAILLE_CODE) {
		return 0;
	}

	strcpy(e->nom, nom);
	strcpy(e->prenom, prenom);
	strcpy(e->code, code);
	for (int i = 0; i < NB_NOTES; ++i) {
		e->notes[i] = 0;
	}
	return 1;
}
```

---

## Accesseurs et modificateurs

```c
const char *etudiant_nom(const Etudiant *e)
{
	return e->nom;
}

int etudiant_definir_note(Etudiant *e, int i, int note)
{
	if (e == NULL || i < 0 || i >= NB_NOTES || note < 0 || note > 100) {
		return 0;
	}
	e->notes[i] = note;
	return 1;
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
