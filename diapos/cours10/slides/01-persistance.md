<!-- .slide: class="chapter" -->

<p class="section-kicker">01 · Conserver après l’exécution</p>

# Persister l’information

<p class="lede">La mémoire du processus disparaît; un fichier offre un stockage durable.</p>

---

## Pourquoi persister ?

Jusqu’ici, nos données vivent surtout en mémoire. À la fin du programme, elles sont perdues.

Un fichier permet de :

- reprendre un travail plus tard;
- échanger des données entre programmes;
- conserver un historique;
- traiter un volume qui ne tient pas entièrement en mémoire;
- produire un rapport durable.

---

## Formes de persistance

<div class="cards">
  <div class="card"><h3>Fichier</h3><p>Stockage local ou réseau, contrôlé directement.</p></div>
  <div class="card"><h3>Base de données</h3><p>Requêtes, concurrence et structure gérées par un système dédié.</p></div>
  <div class="card"><h3>Service distant</h3><p>Stockage accessible par une API.</p></div>
</div>

Ce cours se concentre sur les fichiers manipulés avec la bibliothèque standard C.

---

## Opérations de base

- ouvrir un flux;
- lire ou écrire;
- vérifier les erreurs;
- déplacer la position de lecture/écriture;
- fermer le flux;
- renommer ou supprimer un fichier.

<p class="definition"><strong>Flux :</strong> abstraction d’une séquence d’octets associée à un fichier ou à un périphérique.</p>

---

## Texte ou binaire ?

<div class="comparison">
  <div><h3>Mode texte</h3><p>Octets interprétés comme des caractères; pratique pour l’échange et l’inspection.</p></div>
  <div><h3>Mode binaire</h3><p>Octets traités comme représentation brute; compact, mais souvent dépendant du format choisi.</p></div>
</div>

Le même nombre peut occuper plusieurs caractères en texte, ou une représentation machine en binaire.

---

## Choisir un format

| Critère | Texte | Binaire |
|---|---|---|
| lisible par un humain | oui | non |
| portabilité spontanée | meilleure | à définir explicitement |
| précision numérique | dépend du format | exacte pour la représentation choisie |
| taille | souvent plus grande | souvent plus compacte |
| diagnostic manuel | facile | nécessite un outil |

<p class="callout small">Un format binaire durable doit spécifier l’ordre des octets, la taille des champs et la version du schéma.</p>
