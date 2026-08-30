<!-- .slide: class="chapter" -->

<p class="section-kicker">02 · Nommer une adresse</p>

# Les pointeurs

<p class="lede">Un pointeur est une variable dont la valeur est une adresse.</p>

---

## Pourquoi un pointeur ?

```c
int entier = 15;
int *pointeur_entier = &entier;
```

<div class="pointer-flow"><span><code>pointeur_entier</code><small>0x2A23</small></span><b>→</b><span><code>entier</code><small>15</small></span></div>

Le type <code>int *</code> indique que l’adresse mémorisée permet d’accéder à un objet de type <code>int</code>.

---

## Déclarer un pointeur

```c
int *pointeur_entier;
double *pointeur_reel;
char *pointeur_caractere;
```

La déclaration contient :

- le type de l’objet pointé;
- l’astérisque qui forme le type pointeur;
- l’identifiant du pointeur.

<p class="warning small">Dans <code>int *p, valeur;</code>, seul <code>p</code> est un pointeur. Une déclaration par ligne évite l’ambiguïté.</p>

---

## Initialiser un pointeur

```c
int entier = 10;
int *pointeur_entier = &entier;
```

Un pointeur non initialisé contient une valeur indéterminée. Le déréférencer produit un comportement indéfini.

Quand aucune adresse valide n’est disponible :

```c
int *pointeur_entier = NULL;
```

<p class="callout"><strong>Réflexe :</strong> initialiser immédiatement chaque pointeur.</p>

---

## Le pointeur nul

<code>NULL</code> représente l’absence volontaire d’adresse exploitable.

```c
if (pointeur_entier != NULL) {
    printf("%d\n", *pointeur_entier);
}
```

- on peut tester un pointeur nul;
- on ne doit jamais le déréférencer;
- <code>NULL</code> n’est pas une adresse d’objet valide.

---

## Déréférencer un pointeur

L’opérateur unaire <code>*</code> accède à l’objet désigné.

```c
int entier = 15;
int *ptr = &entier;

printf("%d\n", *ptr);  // 15
*ptr = 42;              // modifie entier
```

<div class="return-flow"><code>ptr</code><span>adresse →</span><strong><code>*ptr</code></strong><span>objet →</span><code>entier</code></div>

---

## Déclaration ou déréférencement ?

<!-- .slide: class="code-compare" -->

### Dans une déclaration

### Dans une expression

```c
int *ptr = &entier;
```

```c
int copie = *ptr;
*ptr = 99;
```

<p class="callout">Même symbole, deux rôles : former un type pointeur ou accéder à l’objet pointé.</p>

---

## Une chaîne de sécurité

Avant de déréférencer <code>ptr</code>, pouvoir répondre oui à ces questions :

1. <code>ptr</code> a-t-il été initialisé ?
2. est-il différent de <code>NULL</code> ?
3. l’objet pointé existe-t-il encore ?
4. son type est-il compatible avec celui du pointeur ?
5. l’accès respecte-t-il les limites de l’objet ?

<p class="warning">Une adresse plausible n’est pas nécessairement une adresse valide.</p>
