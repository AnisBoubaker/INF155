<!-- .slide: class="chapter" -->

<p class="section-kicker">02 · Définir un traitement</p>

# Comment créer une fonction ?

<p class="lede">Spécifier son interface, puis écrire son corps.</p>

---

## Composition d’une fonction

Pour définir une fonction, il faut préciser :

<div class="comparison">
  <div><h3>Le prototype</h3><p>Nom, type de retour et paramètres : l’interface visible par l’appelant.</p></div>
  <div><h3>Le corps</h3><p>Instructions qui réalisent le traitement annoncé.</p></div>
</div>

```c
double calculer_taxe(double montant) {  // prototype + début du corps
    return montant * 0.05;
}
```

---

<!-- .slide: class="compact" -->

## Exemple de fonction

```c
/*
 * Calcule la factorielle d'un entier n.
 * Paramètre : n, entier compris entre 0 et 20.
 * Retour : n! sous forme d'entier non signé.
 */
unsigned long long factorielle(int n)
{
    unsigned long long resultat = 1;

    for (int i = 2; i <= n; i++) {
        resultat *= i;
    }

    return resultat;
}
```

<p class="callout small">Le prototype est <code>unsigned long long factorielle(int n)</code>; tout ce qui se trouve entre les accolades constitue le corps.</p>

---

## Syntaxe générale

```c
type_retour nom_fonction(type_1 parametre_1, type_2 parametre_2)
{
    // déclarations et instructions
}
```

Le prototype communique trois informations :

1. le nom de la fonction;
2. le type de la valeur retournée;
3. le nombre, l’ordre et le type des paramètres.

---

## Le prototype · L’identifiant

```c
double calculer_moyenne(double somme, int nombre);
       └───────┬──────┘
          identifiant
```

Le nom :

- sert à appeler la fonction;
- respecte les règles lexicales d’un identifiant C;
- décrit le traitement effectué;
- commence généralement par un verbe.

<p class="callout small">Préférer <code>calculer_moyenne</code> à <code>traitement2</code>.</p>

---

## Le prototype · Le type de retour

```c
double calculer_moyenne(double somme, int nombre);
──────
type de retour
```

- Il définit le type de la valeur fournie à l’appelant.
- Une fonction fournit directement au plus une valeur.
- Une fonction sans valeur de retour utilise <code>void</code>.

```c
void afficher_resultat(int resultat);
```

---

## Le prototype · Les paramètres

```c
double calculer_moyenne(double somme, int nombre);
                         └──────────┬──────────┘
                            paramètres formels
```

- Ils décrivent les valeurs requises par la fonction.
- Chaque paramètre se comporte comme une variable locale.
- Leur valeur initiale est fournie par l’appelant.
- Une fonction sans paramètre s’écrit avec <code>void</code>.

```c
void afficher_menu(void);
```

---

## Le corps de la fonction

Le corps contient les instructions qui réalisent le traitement.

```c
double calculer_moyenne(double somme, int nombre)
{
    double moyenne = somme / nombre;
    return moyenne;
}
```

Les paramètres <code>somme</code> et <code>nombre</code>, ainsi que la variable <code>moyenne</code>, sont locaux à cet appel.

<p class="callout small">Depuis C99, une variable peut être déclarée au plus près de sa première utilisation dans un bloc.</p>

---

## Exemple · Valeur retournée

```c
unsigned long long factorielle(int n)
{
    unsigned long long resultat = 1;

    for (int i = 2; i <= n; i++) {
        resultat *= i;
    }

    return resultat;
}
```

<div class="return-flow"><code>resultat</code><span>→</span><strong><code>return</code></strong><span>→</span><code>appelant</code></div>

---

## L’instruction <code>return</code>

<code>return</code> termine immédiatement l’appel courant et rend éventuellement une valeur à l’appelant.

```c
double valeur_absolue(double x)
{
    if (x < 0.0) {
        return -x;
    }

    return x;
}
```

<p class="callout small">Une fonction peut contenir plusieurs <code>return</code>; chacun doit respecter le type de retour annoncé.</p>

---

## Combien de points de sortie ?

Un seul point de sortie peut simplifier certains raisonnements, mais plusieurs sorties courtes peuvent aussi améliorer la clarté.

```c
void afficher_si_positif(int valeur)
{
    if (valeur <= 0) {
        return;
    }

    printf("%d\n", valeur);
}
```

<p class="definition"><strong>Critère :</strong> choisir la structure la plus lisible et éviter les chemins de sortie difficiles à suivre.</p>

---

## Exemple de fonction sans retour

```c
void afficher_menu(void)
{
    printf("1 — Créer un client\n");
    printf("2 — Modifier un client\n");
    printf("3 — Supprimer un client\n");
    printf("9 — Quitter\n");
}
```

Cette fonction :

- ne reçoit aucun paramètre;
- produit un effet à l’écran;
- ne retourne aucune valeur.

---

## Commenter une fonction

Le commentaire d’interface doit préciser :

- le rôle de la fonction;
- la signification et les contraintes de chaque paramètre;
- la valeur retournée;
- les effets observables ou modifications indirectes.

```c
/*
 * Retourne le plus grand de a et b.
 * Paramètres : a et b, deux entiers quelconques.
 * Retour : la valeur maximale.
 * Effets de bord : aucun.
 */
int maximum(int a, int b);
```

<p class="callout small">Le commentaire décrit le contrat; le code montre l’implémentation.</p>
