<!-- .slide: class="chapter" -->

<p class="section-kicker">03 · Décrire état et comportements</p>

# Définir une classe

<p class="lede">Une classe contient des attributs et des méthodes, puis se termine par un point-virgule.</p>

---

## Une première classe

```cpp
class Point {
public:
    int x;
    int y;
};
```

- <code>class Point</code> commence la définition du type;
- <code>x</code> et <code>y</code> sont des attributs;
- <code>public</code> rend ces membres accessibles;
- le <code>;</code> final est obligatoire.

---

## Déclarer des instances

```cpp
Point origine{0, 0};
Point position{4, 7};
```

Chaque déclaration réserve un objet complet contenant un <code>x</code> et un <code>y</code>.

<div class="record-row"><span class="active"><strong><code>position</code></strong><small>objet</small></span><b>:</b><span><strong><code>x = 4</code></strong><small>état</small></span><span><strong><code>y = 7</code></strong><small>état</small></span></div>

---

## Accéder avec <code>.</code>

```cpp
std::cout << position.x << ", " << position.y << "\n";

position.x = 5;
```

L’opérateur <code>.</code> sélectionne un membre d’un objet, comme avec une structure en C.

```text
nom_objet.nom_membre
```

---

## Ajouter un comportement

```cpp
class Point {
public:
    int x;
    int y;

    void deplacer(int dx, int dy)
    {
        x += dx;
        y += dy;
    }
};
```

Une fonction définie dans une classe est appelée une <strong>méthode</strong>.

---

## Appeler une méthode

```cpp
Point position{4, 7};

position.deplacer(3, -2);
```

La méthode agit sur l’objet placé à gauche du point. L’état de <code>position</code> devient <code>(7, 5)</code>.

<p class="definition"><strong>Appel de méthode :</strong> demander à un objet d’exécuter un de ses comportements.</p>

---

## Chaque objet reçoit l’appel

```cpp
Point a{1, 1};
Point b{8, 3};

a.deplacer(2, 0);
b.deplacer(0, -1);
```

| Objet | État final |
|---|---|
| <code>a</code> | <code>(3, 1)</code> |
| <code>b</code> | <code>(8, 2)</code> |

La même méthode travaille sur des états différents selon l’objet qui la reçoit.

---

## Lecture active

```cpp
Point p{2, 5};
Point q = p;

p.deplacer(1, 2);
q.deplacer(-2, 0);
```

Après ces appels :

- quel est l’état de <code>p</code> ?
- quel est l’état de <code>q</code> ?
- combien d’instances existent ?

<p class="callout small"><strong>Réponse :</strong> <code>p = (3, 7)</code>, <code>q = (0, 5)</code> et deux instances existent.</p>
