<!-- .slide: class="chapter" -->

<p class="section-kicker">01 · La machine</p>

# Survol de l’architecture d’un ordinateur

<p class="lede">Processeur, mémoire et périphériques collaborent pour exécuter une suite d’instructions.</p>

---

## Composantes d’un ordinateur

<div class="two-col two-col--wide-left">
  <table class="tiny">
    <thead><tr><th>#</th><th>Composante</th><th>Rôle</th></tr></thead>
    <tbody>
      <tr><td>1</td><td>Carte mère</td><td>Relie les éléments</td></tr>
      <tr><td>2</td><td>Processeur</td><td>Exécute les traitements</td></tr>
      <tr><td>3</td><td>Bus</td><td>Transporte les données</td></tr>
      <tr><td>4</td><td>Mémoire vive</td><td>Stockage temporaire</td></tr>
      <tr><td>5</td><td>Carte graphique</td><td>Produit l’affichage</td></tr>
      <tr><td>6</td><td>Entrées/sorties</td><td>Communiquent avec l’extérieur</td></tr>
      <tr><td>7–9</td><td>Stockage, lecteur, alimentation</td><td>Conservent et alimentent</td></tr>
      <tr><td>10–12</td><td>Écran, clavier, souris</td><td>Interface avec l’usager</td></tr>
    </tbody>
  </table>
  <img src="assets/composantes-ordinateur.png" alt="Schéma éclaté des composantes d’un ordinateur de bureau">
</div>

---

## Le processeur

<div class="two-col two-col--wide-left">
  <div>
    <ul>
      <li>Composant central qui exécute les instructions.</li>
      <li>L’<strong>unité arithmétique et logique</strong> réalise les opérations numériques et logiques.</li>
      <li>L’<strong>unité de contrôle</strong> coordonne le cheminement des données et des instructions.</li>
    </ul>
    <div class="callout small"><strong>Exemples d’opérations</strong> : <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, ET, OU, NON.</div>
  </div>
  <img src="assets/processeur.png" alt="Microprocesseur Intel vu de face et de dos">
</div>

---

## La mémoire

Tout composant électronique capable de stocker des données ou des instructions.

<div class="cards">
  <div class="card"><h3>Proximité</h3><p>Plus une mémoire est près du processeur, plus son accès est généralement rapide.</p></div>
  <div class="card"><h3>Capacité</h3><p>Les mémoires rapides sont plus petites; le stockage permanent est beaucoup plus vaste.</p></div>
  <div class="card"><h3>Persistance</h3><p>Certaines mémoires perdent leur contenu sans alimentation; d’autres le conservent.</p></div>
</div>

<img class="diagram-sm" src="assets/hierarchie-memoire.png" alt="Processeur relié à la mémoire vive, à la mémoire cache et au stockage permanent">

---

## Les registres

- Font partie du processeur.
- Fournissent directement les opérandes et les résultats aux unités de calcul.
- Sont extrêmement rapides, mais très peu nombreux et de capacité limitée.

<div class="memory-strip" aria-label="Hiérarchie simplifiée de la mémoire">
  <div class="active">Registres</div>
  <div>Cache</div>
  <div>RAM</div>
  <div>Stockage</div>
</div>

<p class="callout small"><strong>Idée clé :</strong> le processeur travaille d’abord avec les valeurs placées dans ses registres.</p>

---

## La mémoire vive

<div class="two-col">
  <ul>
    <li>Directement accessible par le processeur.</li>
    <li>Contient le code et les données des programmes en cours d’exécution.</li>
    <li>Temps d’accès de l’ordre de quelques dizaines de nanosecondes.</li>
    <li><strong>Volatile</strong> : son contenu disparaît quand l’alimentation est coupée.</li>
  </ul>
  <div class="definition">
    <p class="eyebrow">RAM</p>
    <p><strong>Random Access Memory</strong></p>
    <p class="small">Mémoire de travail temporaire de l’ordinateur.</p>
  </div>
</div>

---

## La mémoire cache

<div class="two-col">
  <div>
    <ul>
      <li>Conserve temporairement les données et instructions les plus susceptibles d’être réutilisées.</li>
      <li>Se trouve dans le processeur ou très près de celui-ci.</li>
      <li>Réduit la latence entre le processeur et la mémoire vive.</li>
      <li>Est organisée en niveaux : <strong>L1</strong>, <strong>L2</strong>, <strong>L3</strong>.</li>
    </ul>
  </div>
  <div class="comparison">
    <div><h3>Très rapide</h3><p>De l’ordre de quelques nanosecondes.</p></div>
    <div><h3>Très petite</h3><p>De quelques kilo-octets à quelques dizaines de mégaoctets.</p></div>
  </div>
</div>

---

## La mémoire de stockage

<div class="two-col">
  <div>
    <ul>
      <li>Accessible par des opérations d’entrée/sortie.</li>
      <li>Plus lente que la mémoire vive.</li>
      <li><strong>Persistante</strong> : conserve son contenu sans alimentation.</li>
    </ul>
  </div>
  <div class="cards">
    <div class="card"><h3>SSD</h3><p>Rapide, silencieux, sans pièce mobile.</p></div>
    <div class="card"><h3>Disque dur</h3><p>Grande capacité, pièces mécaniques.</p></div>
    <div class="card"><h3>Clé USB</h3><p>Amovible et pratique pour le transfert.</p></div>
  </div>
</div>

<p class="callout small"><strong>À retenir :</strong> plus la mémoire est loin du processeur, plus elle est généralement lente, vaste et durable.</p>
