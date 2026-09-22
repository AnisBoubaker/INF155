<!-- .slide: class="chapter" -->

<p class="section-kicker">02 · Nommer les concepts</p>

# Objet, classe et instance

<p class="lede">La classe décrit; l’instance existe réellement pendant l’exécution.</p>

---

## Qu’est-ce qu’un objet ?

Dans notre modèle pédagogique, un objet possède :

- un <strong>état</strong> : les valeurs qu’il contient;
- des <strong>comportements</strong> : les opérations qu’il peut effectuer;
- une <strong>identité</strong> : il demeure distinct des autres objets.

<p class="definition"><strong>Objet :</strong> entité du programme qui regroupe un état et les opérations associées.</p>

---

## Qu’est-ce qu’une classe ?

Une classe définit un nouveau type. Elle décrit :

- les données présentes dans chaque objet;
- les opérations offertes;
- les parties accessibles au reste du programme;
- la manière de créer un objet valide.

<p class="definition"><strong>Classe :</strong> modèle commun utilisé pour créer et manipuler une famille d’objets.</p>

---

## Qu’est-ce qu’une instance ?

```cpp
Point depart;
Point arrivee;
```

<code>Point</code> est la classe. <code>depart</code> et <code>arrivee</code> sont deux objets distincts de cette classe.

<p class="definition"><strong>Instance :</strong> objet concret créé à partir d’une classe.</p>

Dans ce cours, « objet » et « instance » désignent souvent la même valeur concrète.

---

## Une classe, plusieurs instances

<div class="cards">
  <div class="card"><h3>Classe <code>Point</code></h3><p>Décrit deux coordonnées et les opérations disponibles.</p></div>
  <div class="card"><h3>Objet <code>depart</code></h3><p>Possède son propre état, par exemple <code>(2, 3)</code>.</p></div>
  <div class="card"><h3>Objet <code>arrivee</code></h3><p>Possède un autre état, par exemple <code>(8, 5)</code>.</p></div>
</div>

La classe est définie une fois; chaque instance reçoit ses propres données.

---

## Des états indépendants

```cpp
Point a{2, 3};
Point b = a;

b.x = 10;
```

Après la copie, <code>a</code> et <code>b</code> ont commencé avec le même état. Modifier <code>b</code> ne modifie pas <code>a</code>.

<p class="callout small">Même état ne signifie pas même objet : les deux instances ont une identité distincte.</p>

---

## Reconnaître chaque notion

```cpp
class Temperature {
    /* description du type */
};

Temperature actuelle;
Temperature cible;
```

| Élément | Rôle |
|---|---|
| <code>Temperature</code> | classe et nom du type |
| <code>actuelle</code> | objet, donc instance |
| <code>cible</code> | autre objet de la même classe |

---

## Classe et objet ne sont pas synonymes

Définir une classe ne crée encore aucun objet :

```cpp
class Minuterie {
    /* description */
};
```

Instancier la classe crée un objet :

```cpp
Minuterie cuisson;
```

<p class="warning">Une classe est un type; une instance est une valeur de ce type.</p>
