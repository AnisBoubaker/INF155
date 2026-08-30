<!-- .slide: class="chapter" -->

<p class="section-kicker">01 · Décrire une entité</p>

# Étude de cas · Notes d’un groupe

<p class="lede">Chaque étudiant possède une identité et plusieurs résultats.</p>

---

## Données à mémoriser

Pour chaque étudiant :

- nom et prénom;
- code permanent;
- notes des TP 1, 2 et 3;
- examen intra;
- examen final.

Le programme doit saisir, afficher, calculer une moyenne et trier les étudiants.

---

## Approche par tableaux parallèles

```c
char noms[MAX][TAILLE_NOM];
char prenoms[MAX][TAILLE_NOM];
char codes[MAX][TAILLE_CODE];
int tp1[MAX], tp2[MAX], tp3[MAX];
int intra[MAX], final[MAX];
```

Toutes les informations de l’étudiant <code>i</code> partagent le même indice.

---

## Limites des tableaux parallèles

- relation entre les données seulement implicite;
- risque de désynchroniser les indices;
- ajout d’un champ dispersé dans plusieurs déclarations et fonctions;
- tri exigeant des permutations dans chaque tableau;
- interfaces de fonctions longues et fragiles.

<p class="definition"><strong>Besoin :</strong> une valeur qui représente un étudiant complet.</p>

---

## Regrouper par étudiant

<div class="record-row"><span><strong>Jean</strong><small>nom</small></span><span><strong>Valjean</strong><small>prénom</small></span><span><strong>VALA…</strong><small>code</small></span><span><strong>82</strong><small>TP1</small></span><span><strong>91</strong><small>final</small></span></div>

Un tableau peut alors contenir des enregistrements complets :

```c
Etudiant groupe[MAX_ETUDIANTS];
```
