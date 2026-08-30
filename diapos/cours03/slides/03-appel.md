<!-- .slide: class="chapter" -->

<p class="section-kicker">03 · Transférer le contrôle</p>

# Appel de sous-programmes

<p class="lede">Fournir des arguments, exécuter la fonction et reprendre après l’appel.</p>

---

## Appel d’une fonction

Une fonction est invoquée avec son nom suivi des arguments entre parenthèses.

```c
afficher_resultat(3, 5, 60);
```

- Une fonction peut appeler une autre fonction.
- Une fonction peut même s’appeler elle-même : c’est la récursivité.
- <code>main</code> est une fonction particulière et ne doit pas être appelée par le programme.

<p class="callout small">L’appel doit respecter le nombre, l’ordre et les types de paramètres annoncés.</p>

---

## Passage des paramètres par valeur

En C, les arguments ordinaires sont <strong>copiés</strong> dans les paramètres formels.

```c
int k = 10;
unsigned long long resultat = factorielle(k);
```

<div class="value-copy"><code>k : 10</code><span>copie →</span><code>n : 10</code></div>

Modifier <code>n</code> dans <code>factorielle</code> ne modifie pas <code>k</code> dans l’appelant.

<p class="callout small">Nous verrons plus tard comment transmettre une adresse lorsqu’une fonction doit modifier une donnée de l’appelant.</p>

---

## Utiliser la valeur de retour

Une fonction qui retourne une valeur peut être utilisée comme toute expression compatible.

```c
unsigned long long fact = factorielle(10);
printf("10! = %llu\n", factorielle(10));
```

Le résultat de <code>factorielle(10)</code>, soit <code>3628800</code>, est :

- affecté à <code>fact</code> dans le premier cas;
- transmis à <code>printf</code> dans le second.

---

## Cycle d’exécution · Point de départ

<div class="execution-strip">
  <span class="active"><strong>1</strong> Entrer dans <code>main</code></span>
  <span><strong>2</strong> Appeler une fonction</span>
  <span><strong>3</strong> Exécuter son corps</span>
  <span><strong>4</strong> Revenir à l’appelant</span>
</div>

```c
int main(void)
{
    int n = 5;
    unsigned long long resultat;
    // prochain traitement…
}
```

Le système d’exploitation lance le programme à la fonction <code>main</code>.

---

## Cycle d’exécution · L’appel

<div class="execution-strip">
  <span><strong>1</strong> Entrer dans <code>main</code></span>
  <span class="active"><strong>2</strong> Appeler une fonction</span>
  <span><strong>3</strong> Exécuter son corps</span>
  <span><strong>4</strong> Revenir à l’appelant</span>
</div>

```c
resultat = factorielle(n);
            └────┬────┘
                 appel
```

Les arguments sont évalués et copiés, puis le contrôle passe au corps de <code>factorielle</code>. Ses variables locales existent pendant cet appel.

---

## Cycle d’exécution · Le retour

<div class="execution-strip">
  <span><strong>1</strong> Entrer dans <code>main</code></span>
  <span><strong>2</strong> Appeler une fonction</span>
  <span><strong>3</strong> Exécuter son corps</span>
  <span class="active"><strong>4</strong> Revenir à l’appelant</span>
</div>

```c
return resultat;
```

Le contrôle revient à l’instruction qui contient l’appel; la valeur retournée remplace conceptuellement l’expression d’appel.

```c
resultat = 120;
```

---

## Cycle d’exécution · Un autre appel

L’appelant peut ensuite invoquer une autre fonction.

```c
afficher_resultat(n, resultat);
```

<div class="call-sequence">
  <span><code>main</code></span><b>→</b><span><code>afficher_resultat</code></span><b>→</b><span><code>printf</code></span>
</div>

Chaque appel suspend temporairement la fonction appelante et crée son propre contexte d’exécution.

---

## Cycle d’exécution · Reprendre

À la fin de <code>afficher_resultat</code> — ou à un <code>return;</code> — l’exécution reprend juste après l’appel.

```c
afficher_resultat(n, resultat);
puts("Calcul terminé.");       // reprise ici
```

<p class="definition"><strong>Adresse de retour :</strong> l’environnement d’exécution conserve l’endroit où la fonction appelante doit reprendre.</p>

---

## Cycle d’exécution · Terminer <code>main</code>

```c
return EXIT_SUCCESS;
```

Lorsque <code>main</code> se termine :

- sa valeur de retour est transmise à l’environnement d’exécution;
- les ressources du processus sont récupérées par le système;
- le système d’exploitation reprend le contrôle.

<p class="callout small"><code>EXIT_SUCCESS</code> signale une terminaison réussie de manière portable.</p>
