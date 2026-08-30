<!-- .slide: class="chapter" -->

<p class="section-kicker">01 · Localiser une donnée</p>

# Variables et mémoire

<p class="lede">Une variable associe un nom, un type, une valeur et une adresse.</p>

---

## Une variable en mémoire

```c
int une_variable = 15;
```

<div class="memory-cell"><span class="memory-address">adresse : 0x2A23</span><strong>15</strong><span>4 octets — exemple</span></div>

- le type détermine l’interprétation et la taille minimale de l’objet;
- la valeur est stockée dans les octets réservés;
- l’adresse repère le premier octet de l’objet.

<p class="tiny">Les adresses et tailles illustrées varient selon la plateforme et l’exécution.</p>

---

## Pourquoi manipuler une adresse ?

Accéder indirectement à une donnée devient utile pour :

- permettre à une fonction de modifier une variable de l’appelant;
- parcourir efficacement un tableau;
- représenter des structures liées;
- réserver de la mémoire à l’exécution;
- interagir avec des périphériques ou des API de bas niveau.

<p class="definition"><strong>Adresse :</strong> valeur qui identifie un emplacement en mémoire.</p>

---

## L’opérateur <code>&amp;</code>

L’opérateur unaire <code>&amp;</code> produit l’adresse de son opérande.

```c
int temperature = 21;

printf("%p\n", (void *)&temperature);
```

- <code>&amp;temperature</code> a pour type <code>int *</code>;
- le format <code>%p</code> exige une conversion en <code>void *</code>;
- une adresse n’est pas la valeur de la variable.

---

<!-- .slide: class="code-compare" -->

## Valeur ou adresse ?

### Valeur

### Adresse

```c
int n = 15;
printf("%d\n", n);
```

```c
int n = 15;
printf("%p\n", (void *)&n);
```

<p class="callout"><code>n</code> désigne la donnée; <code>&amp;n</code> désigne l’endroit où elle réside.</p>
