<!-- .slide: class="chapter" -->

<p class="section-kicker">04 · Protéger et initialiser l’état</p>

# Encapsulation et construction

<p class="lede">Un objet utile protège ses invariants et commence sa vie dans un état valide.</p>

---

## Membres publics et privés

<div class="comparison">
  <div><h3><code>public</code></h3><p>Interface offerte au code qui utilise l’objet.</p></div>
  <div><h3><code>private</code></h3><p>Détails accessibles seulement aux méthodes de la classe.</p></div>
</div>

```cpp
class CompteBancaire {
private:
    double solde;

public:
    void deposer(double montant);
};
```

---

## Pourquoi rendre l’état privé ?

Si <code>solde</code> était public, n’importe quel code pourrait écrire :

```cpp
compte.solde = -1000000.0;
```

Avec un attribut privé, les modifications passent par une méthode qui vérifie les règles.

<p class="definition"><strong>Encapsulation :</strong> cacher la représentation et contrôler les opérations permises sur l’état.</p>

---

## Protéger un invariant

```cpp
bool retirer(double montant)
{
    if (montant <= 0.0 || montant > solde) {
        return false;
    }

    solde -= montant;
    return true;
}
```

<p class="callout"><strong>Invariant :</strong> règle qui doit rester vraie pendant toute la vie valide de l’objet.</p>

Ici, un retrait accepté ne peut pas rendre le solde négatif.

---

## Déclarer un constructeur

```cpp
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
```

Le constructeur porte le même nom que la classe et ne déclare aucun type de retour.

---

## Initialiser les attributs

```cpp
CompteBancaire::CompteBancaire(std::string nom)
    : titulaire(nom), solde(0.0)
{
}
```

La liste après <code>:</code> initialise les attributs avant l’exécution du corps du constructeur.

```cpp
CompteBancaire compte("Ada Lovelace");
```

La déclaration crée une instance déjà associée à un titulaire et à un solde nul.

---

## Une méthode qui ne modifie pas

```cpp
double CompteBancaire::obtenir_solde() const
{
    return solde;
}
```

Le <code>const</code> placé après les parenthèses promet que la méthode ne modifie pas l’état observable de l’objet.

```cpp
std::cout << compte.obtenir_solde() << "\n";
```

---

## Durée de vie automatique

```cpp
int main()
{
    CompteBancaire compte("Ada Lovelace");
    compte.deposer(125.0);
}  // destruction automatique de compte
```

Le constructeur s’exécute à la création. Lorsque la portée se termine, le destructeur de l’objet s’exécute automatiquement.

<p class="callout small">Aucune allocation dynamique n’est nécessaire pour utiliser une classe.</p>
