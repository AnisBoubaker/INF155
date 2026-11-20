<!-- .slide: class="chapter" -->

<p class="section-kicker">01 · Changer de point de vue</p>

# Du C à C++

<p class="lede">Les notions déjà acquises restent utiles; C++ permet aussi de définir des objets.</p>

---

## En C : données et fonctions séparées

```c
typedef struct etudiant {
	int notes[5];
} Etudiant;

int definir_note(Etudiant *e, int i, int note);
double calculer_moyenne(const Etudiant *e);
```

Le module rapproche déjà un type de ses opérations par les noms et les fichiers, mais le langage ne les réunit pas dans le type.

---

## En C++ : les réunir dans une classe

```cpp
class Etudiant {
private:
	int notes[5];

public:
	int definir_note(int i, int note);
	double calculer_moyenne() const;
};
```

Les données et les opérations qui leur appartiennent font maintenant partie du même type.

---

## C++ est multiparadigme

Un programme C++ peut combiner :

- programmation procédurale avec des fonctions;
- programmation orientée objet avec des classes;
- programmation générique avec des modèles;
- bibliothèques de haut niveau.

<p class="callout"><strong>Important :</strong> écrire en C++ n’oblige pas à transformer chaque fonction en classe.</p>

---

## Un premier programme C++

```cpp
#include <iostream>

int main()
{
	std::cout << "Bonjour C++\n";
	return 0;
}
```

Les variables, conditions, boucles, fonctions, tableaux et pointeurs existent toujours. La bibliothèque et certaines règles du langage évoluent.

---

## Utiliser un fichier C++ dans CLion

Utiliser le projet C++ de l’exercice et des sources en <code>.cpp</code>, puis lancer le programme depuis CLion.

<p class="warning small">C++ est apparenté au C, mais un programme C n’est pas automatiquement un programme C++ valide.</p>
