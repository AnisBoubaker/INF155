<!-- .slide: class="chapter" -->

<p class="section-kicker">02 · Créer un type composé</p>

# Les structures

<p class="lede">Une structure rassemble des champs nommés, potentiellement de types différents.</p>

---

## Définir une structure

```c
struct Etudiant {
    char nom[40];
    char prenom[40];
    char code[16];
    int note_tp1;
    int note_tp2;
    int note_tp3;
    int note_intra;
    int note_final;
};
```

La définition crée un nouveau type étiqueté <code>struct Etudiant</code>; elle ne crée encore aucun étudiant.

---

## Déclarer une variable

```c
struct Etudiant etudiant;
```

L’objet contient un emplacement pour chacun des champs. Sa taille inclut aussi, éventuellement, des octets de remplissage imposés par l’alignement.

```c
printf("%zu\n", sizeof etudiant);
```

<p class="tiny">La taille n’est pas nécessairement la somme exacte des tailles des champs.</p>

---

## Donner un alias avec <code>typedef</code>

```c
typedef struct {
    char nom[40];
    char prenom[40];
    char code[16];
    int notes[5];
} Etudiant;
```

On peut maintenant écrire :

```c
Etudiant etudiant;
Etudiant groupe[30];
```

---

## Initialisation désignée

```c
Etudiant etudiant = {
    .nom = "Jean",
    .prenom = "Valjean",
    .code = "VALJ12345678",
    .notes = {82, 85, 78, 80, 91}
};
```

Les désignateurs rendent l’initialisation indépendante de l’ordre visuel et plus facile à relire.

---

## Accéder aux champs avec <code>.</code>

```c
printf("%s %s\n", etudiant.prenom, etudiant.nom);
etudiant.notes[0] = 86;
```

<div class="record-row"><span class="active"><strong><code>etudiant</code></strong><small>objet</small></span><b>.</b><span class="active"><strong><code>prenom</code></strong><small>champ</small></span></div>

L’expression désigne directement le champ contenu dans l’objet.

---

## Affecter et copier un enregistrement

Contrairement à un tableau, une structure peut être affectée d’un seul coup.

```c
Etudiant copie = etudiant;
Etudiant autre;
autre = etudiant;
```

Tous les champs sont copiés par valeur, y compris les tableaux membres.

<p class="callout small">La copie est superficielle si des champs sont des pointeurs; nous y reviendrons avec l’allocation dynamique.</p>

---

## Tableau d’enregistrements

```c
Etudiant groupe[30];

strcpy(groupe[0].nom, "Lovelace");
groupe[0].notes[0] = 95;
```

Chaque case du tableau contient un étudiant complet. Un échange pendant un tri peut donc permuter une seule valeur <code>Etudiant</code>.
