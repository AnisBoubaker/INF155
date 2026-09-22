<!-- .slide: class="chapter" -->

<p class="section-kicker">05 · Assembler les notions</p>

# Un petit programme objet

<p class="lede">La classe fournit un contrat; son implémentation protège l’état; le client utilise les objets.</p>

---

## Interface · <code>compte_bancaire.h</code>

```cpp
#ifndef COMPTE_BANCAIRE_H
#define COMPTE_BANCAIRE_H

#include <string>

class CompteBancaire {
private:
    std::string titulaire;
    double solde;

public:
    CompteBancaire(std::string nom);
    void deposer(double montant);
    bool retirer(double montant);
    double obtenir_solde() const;
};

#endif
```

---

## Implémentation · <code>compte_bancaire.cpp</code>

```cpp
#include "compte_bancaire.h"

CompteBancaire::CompteBancaire(std::string nom)
    : titulaire(nom), solde(0.0)
{
}

void CompteBancaire::deposer(double montant)
{
    if (montant > 0.0) {
        solde += montant;
    }
}
```

<code>CompteBancaire::</code> précise à quelle classe appartient la méthode.

---

## Une opération qui peut échouer

```cpp
bool CompteBancaire::retirer(double montant)
{
    if (montant <= 0.0 || montant > solde) {
        return false;
    }

    solde -= montant;
    return true;
}

double CompteBancaire::obtenir_solde() const
{
    return solde;
}
```

---

## Programme client · <code>main.cpp</code>

```cpp
#include <iostream>
#include "compte_bancaire.h"

int main()
{
    CompteBancaire ada("Ada Lovelace");
    CompteBancaire alan("Alan Turing");

    ada.deposer(200.0);
    alan.deposer(80.0);
    ada.retirer(50.0);

    std::cout << ada.obtenir_solde() << "\n";
    std::cout << alan.obtenir_solde() << "\n";
    return 0;
}
```

---

## Compiler plusieurs fichiers C++

```sh
c++ -std=c++17 -Wall -Wextra -Wpedantic \
    main.cpp compte_bancaire.cpp -o banque
```

Comme en C :

- le fichier d’en-tête expose l’interface;
- le fichier source contient l’implémentation;
- le client dépend du contrat public.

La classe ajoute une frontière du langage entre membres publics et privés.

---

## Erreurs fréquentes

- confondre la définition de la classe avec la création d’un objet;
- oublier le point-virgule après <code>}</code>;
- tenter d’accéder directement à un membre <code>private</code>;
- oublier d’initialiser un attribut dans le constructeur;
- appeler une méthode sur le mauvais objet;
- rendre public ce qui appartient à la représentation interne.

<p class="callout small">Une bonne interface exprime ce que l’objet permet, sans obliger le client à connaître son stockage.</p>

---

<!-- .slide: class="chapter compact" -->

<p class="section-kicker">À retenir</p>

# Une classe définit; ses instances vivent et agissent

<ol class="plan">
  <li>Une classe définit un type, son état et ses comportements.</li>
  <li>Un objet est une instance concrète de cette classe.</li>
  <li>Chaque instance possède son propre état.</li>
  <li>Les méthodes publiques forment l’interface de l’objet.</li>
  <li>Le constructeur établit un état initial valide.</li>
</ol>
