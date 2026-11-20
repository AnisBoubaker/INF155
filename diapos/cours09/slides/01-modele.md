<!-- .slide: class="chapter" -->

<p class="section-kicker">01 · Choisir la durée de vie</p>

# Allocation mémoire

<p class="lede">La taille et la durée de vie d’un objet peuvent être fixées avant ou pendant l’exécution.</p>

---

<!-- .slide: class="memory-scene" id="memoire-pile" data-auto-animate="true" data-auto-animate-id="memoire09" data-auto-animate-duration="0.65" -->

## Jusqu’ici : la pile des appels

<div class="memory-scene-layout">
<div class="memory-explanation">
<p>Nos variables locales et nos tableaux étaient réservés dans les cadres de la <strong>pile</strong>.</p>

```c
void traiter(int n);

int main(void)
{
	int n = 4;
	traiter(n);
	return 0;
}
```
<!-- .element: data-id="memory-program" -->

<p class="memory-takeaway">L’appel de <code>main</code> possède son cadre, qui contient ici <code>n</code>.</p>
</div>
<figure class="memory-figure" data-id="memory-figure" aria-label="Espace mémoire simplifié du programme.">
<div class="memory-address memory-address--high" data-id="address-high">Adresses hautes</div>
<div class="memory-map" data-id="address-space">
<div class="memory-stack-region" data-id="stack-region" style="height:52px">
<span class="memory-region-label" data-id="stack-label">Pile <b>↓</b></span>
<div class="memory-call-frame memory-call-frame--active" data-id="frame-main" style="top:0px;height:52px"><strong>main()</strong><span>n = 4</span></div>
</div>
<div class="memory-free memory-free--unknown" data-id="free-space" style="top:52px;bottom:0px"><span>Autres zones à découvrir</span></div>
</div>
<div class="memory-address memory-address--low" data-id="address-low">Adresses basses</div>
<figcaption>Modèle simplifié · tailles non à l’échelle · zone des données omise</figcaption>
</figure>
</div>

<aside class="notes">On revient sur les variables locales automatiques utilisées dans les exercices. Les variables globales et statiques vues au cours 03 relèvent de la zone des données, volontairement omise de ce schéma. Il s’agit d’un modèle d’implémentation, sans représenter les registres ni les optimisations du compilateur.</aside>

---

<!-- .slide: class="memory-scene" id="memoire-appels" data-auto-animate="true" data-auto-animate-id="memoire09" data-auto-animate-duration="0.65" -->

## Un cadre pour chaque appel

<div class="memory-scene-layout">
<div class="memory-explanation">
<p><code>main</code> appelle <code>traiter</code>, qui appelle <code>analyser</code>.</p>

```c
void analyser(double valeurs[], int n);

void traiter(int n)
{
	int somme = 0;
	double valeurs[4];

	analyser(valeurs, n);
}
```
<!-- .element: data-id="memory-program" -->

<p class="memory-takeaway">Chaque appel ajoute un cadre : paramètres, variables locales et informations de retour.</p>
</div>
<figure class="memory-figure" data-id="memory-figure" aria-label="Espace mémoire simplifié du programme.">
<div class="memory-address memory-address--high" data-id="address-high">Adresses hautes</div>
<div class="memory-map" data-id="address-space">
<div class="memory-stack-region" data-id="stack-region" style="height:174px">
<span class="memory-region-label" data-id="stack-label">Pile <b>↓</b></span>
<div class="memory-call-frame" data-id="frame-main" style="top:0px;height:52px"><strong>main()</strong><span>n = 4</span></div>
<div class="memory-call-frame" data-id="frame-traiter" style="top:52px;height:60px"><strong>traiter()</strong><span>n = 4 · somme = 0 · valeurs[4]</span></div>
<div class="memory-call-frame memory-call-frame--active" data-id="frame-analyser" style="top:112px;height:62px"><strong>analyser()</strong><span>n = 4 · valeurs → tableau de traiter</span></div>
</div>
<div class="memory-free memory-free--unknown" data-id="free-space" style="top:174px;bottom:0px"><span>Autres zones à découvrir</span></div>
</div>
<div class="memory-address memory-address--low" data-id="address-low">Adresses basses</div>
<figcaption>Modèle simplifié · tailles non à l’échelle · zone des données omise</figcaption>
</figure>
</div>

---

<!-- .slide: class="memory-scene" id="memoire-code" data-auto-animate="true" data-auto-animate-id="memoire09" data-auto-animate-duration="0.65" -->

## Le bloc de code contient les instructions

<div class="memory-scene-layout">
<div class="memory-explanation">
<p>Le programme chargé en mémoire possède aussi ses instructions compilées en code machine, elles résident dans le <strong>Bloc de code</strong>.</p>

```c
void analyser(double valeurs[], int n);

void traiter(int n)
{
	int somme = 0;
	double valeurs[4];

	analyser(valeurs, n);
}
```
<!-- .element: data-id="memory-program" -->

<p class="memory-takeaway">Chaque appel associe le code d’une fonction à son propre cadre de pile.</p>
</div>
<figure class="memory-figure" data-id="memory-figure" aria-label="Espace mémoire simplifié du programme.">
<div class="memory-address memory-address--high" data-id="address-high">Adresses hautes</div>
<div class="memory-map" data-id="address-space">
<div class="memory-stack-region" data-id="stack-region" style="height:174px">
<span class="memory-region-label" data-id="stack-label">Pile <b>↓</b></span>
<div class="memory-call-frame" data-id="frame-main" style="top:0px;height:52px"><strong>main()</strong><span>n = 4</span></div>
<div class="memory-call-frame" data-id="frame-traiter" style="top:52px;height:60px"><strong>traiter()</strong><span>n = 4 · somme = 0 · valeurs[4]</span></div>
<div class="memory-call-frame memory-call-frame--active" data-id="frame-analyser" style="top:112px;height:62px"><strong>analyser()</strong><span>n = 4 · valeurs → tableau de traiter</span></div>
</div>
<div class="memory-free" data-id="free-space" style="top:174px;bottom:74px"><span>Espace encore disponible</span></div>
<div class="memory-code-region" data-id="code-region"><span class="memory-region-label" data-id="code-label">Bloc<br>de code</span><strong>Instructions compilées</strong><span>main() · traiter() · analyser()</span></div>
</div>
<div class="memory-address memory-address--low" data-id="address-low">Adresses basses</div>
<figcaption>Modèle simplifié · tailles non à l’échelle · zone des données omise</figcaption>
</figure>
</div>

<aside class="notes">Les noms de fonctions dans le bloc de code désignent leurs instructions compilées. Le code est partagé entre les appels d’une même fonction, tandis que chaque appel possède son contexte. La disposition exacte varie. Référence : <a href="https://docs.kernel.org/filesystems/proc.html">documentation du noyau Linux, régions du processus dans /proc/PID/maps</a>.</aside>

---

<!-- .slide: class="memory-scene" id="memoire-tas" data-auto-animate="true" data-auto-animate-id="memoire09" data-auto-animate-duration="0.65" -->

## Le tas réserve des blocs bruts

<div class="memory-scene-layout">
<div class="memory-explanation">
<p>Il est aussi possible de réserver des bloc de mémoire (en spécifiant le nombre d'octets). Ces allocations se font dans <strong>le Tas</strong>.</p>
<p>Dans <code>analyser</code>, deux appels réservent des blocs dans le tas.</p>

```c
double *copie = (double *)malloc(
	n * (int)sizeof(double));
char *texte = (char *)malloc(32);

if (copie == NULL || texte == NULL) {
	free(texte);
	free(copie);
	return;
}
/* Les deux allocations ont réussi. */
```
<!-- .element: data-id="memory-program" -->

<p class="memory-takeaway">Les pointeurs sont dans la pile. Les octets réservés sont dans le tas, encore non initialisés.</p>
</div>
<figure class="memory-figure" data-id="memory-figure" aria-label="Trois cadres dans la pile et deux blocs bruts dans le tas, reliés aux pointeurs locaux.">
<div class="memory-address memory-address--high" data-id="address-high">Adresses hautes</div>
<div class="memory-map" data-id="address-space">
<div class="memory-stack-region" data-id="stack-region" style="height:206px">
<span class="memory-region-label" data-id="stack-label">Pile <b>↓</b></span>
<div class="memory-call-frame" data-id="frame-main" style="top:0px;height:52px"><strong>main()</strong><span>n = 4</span></div>
<div class="memory-call-frame" data-id="frame-traiter" style="top:52px;height:60px"><strong>traiter()</strong><span>n = 4 · somme = 0 · valeurs[4]</span></div>
<div class="memory-call-frame memory-call-frame--active" data-id="frame-analyser" style="top:112px;height:94px"><strong>analyser()</strong><span>n = 4<br>copie → A · texte → B</span></div>
</div>
<div class="memory-free" data-id="free-space" style="top:206px;bottom:186px"><span>Espace libre</span></div>
<div class="memory-heap-region" data-id="heap-region" style="height:112px">
<span class="memory-region-label" data-id="heap-label">Tas <b>↑</b></span>
<div class="memory-raw-block" data-id="heap-a" style="bottom:0px;height:52px"><strong>Bloc A · 4 × sizeof(double)</strong><span class="memory-raw-bytes">? &nbsp; ? &nbsp; ? &nbsp; ? &nbsp; ? &nbsp; ?</span></div>
<div class="memory-raw-block" data-id="heap-b" style="bottom:60px;height:52px"><strong>Bloc B · 32 octets</strong><span class="memory-raw-bytes">? &nbsp; ? &nbsp; ? &nbsp; ? &nbsp; ? &nbsp; ?</span></div>
</div>
<div class="memory-code-region" data-id="code-region"><span class="memory-region-label" data-id="code-label">Bloc<br>de code</span><strong>Instructions compilées</strong><span>main() · traiter() · analyser()</span></div>
<span class="memory-pointer-link memory-pointer-link--a" data-id="link-a" aria-label="copie pointe vers le bloc A"></span>
<span class="memory-pointer-link memory-pointer-link--b" data-id="link-b" aria-label="texte pointe vers le bloc B"></span>
</div>
<div class="memory-address memory-address--low" data-id="address-low">Adresses basses</div>
<figcaption>Modèle simplifié · tailles non à l’échelle · zone des données omise</figcaption>
</figure>
</div>

<aside class="notes">Les lettres A et B désignent les adresses symboliques des deux blocs retournés. Le nombre d’octets du bloc A dépend de sizeof(double). Les cellules avec des points d’interrogation figurent des octets non initialisés, sans valeur à lire. Référence : <a href="https://man7.org/linux/man-pages/man3/malloc.3.html">malloc(3), DESCRIPTION et RETURN VALUE</a>.</aside>

---

<!-- .slide: class="memory-scene" id="memoire-retour" data-auto-animate="true" data-auto-animate-id="memoire09" data-auto-animate-duration="0.65" -->

## Retour sans free : les blocs restent réservés

<div class="memory-scene-layout">
<div class="memory-explanation">
<p>Au retour d’<code>analyser</code>, son cadre de pile disparaît automatiquement.</p>

```c
/* Les allocations ont réussi. */
/* Aucun appel à free avant le retour. */
return;
```
<!-- .element: data-id="memory-program" -->

<p class="memory-takeaway memory-takeaway--warning">Les deux blocs du tas existent encore, mais leurs adresses sont perdues : <strong>fuite mémoire</strong>.</p>
<p class="memory-detail">Pour les libérer, il fallait appeler <code>free</code> avant de perdre ces adresses.</p>
</div>
<figure class="memory-figure memory-figure--leak" data-id="memory-figure" aria-label="Le cadre d’analyser a disparu, mais ses deux blocs restent réservés dans le tas.">
<div class="memory-address memory-address--high" data-id="address-high">Adresses hautes</div>
<div class="memory-map" data-id="address-space">
<div class="memory-stack-region" data-id="stack-region" style="height:112px">
<span class="memory-region-label" data-id="stack-label">Pile <b>↓</b></span>
<div class="memory-call-frame" data-id="frame-main" style="top:0px;height:52px"><strong>main()</strong><span>n = 4</span></div>
<div class="memory-call-frame memory-call-frame--active" data-id="frame-traiter" style="top:52px;height:60px"><strong>traiter()</strong><span>n = 4 · somme = 0 · valeurs[4]</span></div>
</div>
<div class="memory-free" data-id="free-space" style="top:112px;bottom:186px"><span>Cadre libéré automatiquement</span></div>
<div class="memory-heap-region" data-id="heap-region" style="height:112px">
<span class="memory-region-label" data-id="heap-label">Tas <b>↑</b></span>
<div class="memory-raw-block" data-id="heap-a" style="bottom:0px;height:52px"><strong>Bloc A · 4 × sizeof(double)</strong><span class="memory-raw-bytes">Toujours réservé</span></div>
<div class="memory-raw-block" data-id="heap-b" style="bottom:60px;height:52px"><strong>Bloc B · 32 octets</strong><span class="memory-raw-bytes">Toujours réservé</span></div>
</div>
<div class="memory-code-region" data-id="code-region"><span class="memory-region-label" data-id="code-label">Bloc<br>de code</span><strong>Instructions compilées</strong><span>main() · traiter() · analyser()</span></div>
</div>
<div class="memory-address memory-address--low" data-id="address-low">Adresses basses</div>
<figcaption>Modèle simplifié · tailles non à l’échelle · zone des données omise</figcaption>
</figure>
</div>

<aside class="notes">Cette étape illustre volontairement une erreur : les pointeurs locaux copie et texte étaient les seules adresses détenues pour ces blocs et ne sont ni retournés ni transmis à l’appelant. Leur disparition rend les blocs inaccessibles. free doit être appelé tant que l’on détient encore leur adresse.</aside>

---

<!-- .slide: class="memory-scene" id="memoire-croissance" data-auto-animate="true" data-auto-animate-id="memoire09" data-auto-animate-duration="0.65" -->

## La pile et le tas se rapprochent

<div class="memory-scene-layout">
<div class="memory-explanation">
<p>Un deuxième appel à <code>analyser</code> réserve deux nouveaux blocs.</p>
<p class="memory-growth-line"><strong>Un nouveau cadre de pile</strong><br>Le cadre du premier appel a été libéré au retour.</p>
<p class="memory-growth-line"><strong>Des blocs supplémentaires dans le tas</strong><br>A et B sont encore réservés; C et D s’ajoutent.</p>
<p class="memory-takeaway">Les appels se succèdent. Les blocs non libérés s’accumulent dans le tas.</p>
</div>
<figure class="memory-figure memory-figure--dense" data-id="memory-figure" aria-label="Un seul cadre d’analyser pour le deuxième appel et quatre blocs dans le tas.">
<div class="memory-address memory-address--high" data-id="address-high">Adresses hautes</div>
<div class="memory-map" data-id="address-space">
<div class="memory-stack-region" data-id="stack-region" style="height:206px">
<span class="memory-region-label" data-id="stack-label">Pile <b>↓</b></span>
<div class="memory-call-frame" data-id="frame-main" style="top:0px;height:52px"><strong>main()</strong></div>
<div class="memory-call-frame" data-id="frame-traiter" style="top:52px;height:60px"><strong>traiter()</strong></div>
<div class="memory-call-frame memory-call-frame--active" data-id="frame-analyser" style="top:112px;height:94px"><strong>analyser() appel 2</strong></div>
</div>
<div class="memory-free" data-id="free-space" style="top:206px;bottom:198px"><span>Espace libre réduit</span></div>
<div class="memory-heap-region" data-id="heap-region" style="height:124px">
<span class="memory-region-label" data-id="heap-label">Tas <b>↑</b></span>
<div class="memory-raw-block" data-id="heap-a" style="bottom:0px;height:28px"><strong>Bloc A</strong></div>
<div class="memory-raw-block" data-id="heap-b" style="bottom:32px;height:28px"><strong>Bloc B</strong></div>
<div class="memory-raw-block" data-id="heap-c" style="bottom:64px;height:28px"><strong>Bloc C</strong></div>
<div class="memory-raw-block" data-id="heap-d" style="bottom:96px;height:28px"><strong>Bloc D</strong></div>
</div>
<div class="memory-code-region" data-id="code-region"><span class="memory-region-label" data-id="code-label">Bloc<br>de code</span><strong>Instructions compilées</strong><span>main() · traiter() · analyser()</span></div>
</div>
<div class="memory-address memory-address--low" data-id="address-low">Adresses basses</div>
<figcaption>Modèle simplifié · tailles non à l’échelle · zone des données omise</figcaption>
</figure>
</div>

<aside class="notes">Les appels à analyser sont successifs. Le premier s’est terminé avant ce deuxième appel : un seul cadre d’analyser existe dans la pile. Les blocs A et B n’ont pas été libérés; le deuxième appel ajoute C et D. Les tailles dessinées sont schématiques.</aside>

---

<!-- .slide: class="memory-scene" id="memoire-epuisement" data-auto-animate="true" data-auto-animate-id="memoire09" data-auto-animate-duration="0.65" -->

## Quand la pile et le tas se touchent

<div class="memory-scene-layout">
<div class="memory-explanation">
<p class="memory-exhausted">Espace libre : <strong>0</strong></p>
<p>Les appels successifs ajoutent des blocs non libérés. Dans ce modèle, le tas finit par rejoindre la pile.</p>
<p class="memory-growth-line"><strong>Nouvelle allocation</strong><br>La demande peut échouer : <code>malloc</code> retourne <code>NULL</code>.</p>
<p class="memory-growth-line"><strong>Nouvel appel</strong><br>La pile peut déborder et interrompre le programme.</p>
<p class="memory-detail">En pratique, les limites du système peuvent être atteintes avant ce contact.</p>
</div>
<figure class="memory-figure memory-figure--dense" data-id="memory-figure" aria-label="Troisième appel d’analyser : les six blocs du tas rejoignent la pile, sans espace libre.">
<div class="memory-address memory-address--high" data-id="address-high">Adresses hautes</div>
<div class="memory-map" data-id="address-space">
<div class="memory-stack-region" data-id="stack-region" style="height:206px">
<span class="memory-region-label" data-id="stack-label">Pile <b>↓</b></span>
<div class="memory-call-frame" data-id="frame-main" style="top:0px;height:52px"><strong>main()</strong></div>
<div class="memory-call-frame" data-id="frame-traiter" style="top:52px;height:60px"><strong>traiter()</strong></div>
<div class="memory-call-frame memory-call-frame--active" data-id="frame-analyser" style="top:112px;height:94px"><strong>analyser() appel 3</strong></div>
</div>
<div class="memory-heap-region" data-id="heap-region" style="height:162px">
<span class="memory-region-label" data-id="heap-label">Tas <b>↑</b></span>
<div class="memory-raw-block" data-id="heap-a" style="bottom:0px;height:27px"><strong>Bloc A</strong></div>
<div class="memory-raw-block" data-id="heap-b" style="bottom:27px;height:27px"><strong>Bloc B</strong></div>
<div class="memory-raw-block" data-id="heap-c" style="bottom:54px;height:27px"><strong>Bloc C</strong></div>
<div class="memory-raw-block" data-id="heap-d" style="bottom:81px;height:27px"><strong>Bloc D</strong></div>
<div class="memory-raw-block" data-id="heap-e" style="bottom:108px;height:27px"><strong>Bloc E</strong></div>
<div class="memory-raw-block" data-id="heap-f" style="bottom:135px;height:27px"><strong>Bloc F</strong></div>
</div>
<div class="memory-code-region" data-id="code-region"><span class="memory-region-label" data-id="code-label">Bloc<br>de code</span><strong>Instructions compilées</strong><span>main() · traiter() · analyser()</span></div>
<div class="memory-contact" data-id="contact" style="top:206px"><span>0 libre</span></div>
</div>
<div class="memory-address memory-address--low" data-id="address-low">Adresses basses</div>
<figcaption>Modèle simplifié · tailles non à l’échelle · zone des données omise</figcaption>
</figure>
</div>

<aside class="notes">Le troisième appel à analyser est en cours. Les six blocs A à F proviennent de trois appels successifs dont les allocations n’ont pas été libérées. Le contact pile/tas est une image pédagogique de l’épuisement de l’espace disponible, pas une règle universelle des systèmes modernes. Les limites de pile, d’espace d’adressage et les mappages peuvent provoquer un échec avant une telle rencontre. Références : <a href="https://man7.org/linux/man-pages/man3/malloc.3.html">malloc(3), ERRORS</a> et <a href="https://man7.org/linux/man-pages/man2/getrlimit.2.html">getrlimit(2), RLIMIT_AS et RLIMIT_STACK</a>.</aside>

---

## Quand allouer dynamiquement ?

- taille inconnue à la compilation;
- volume trop grand ou variable pour un objet automatique;
- donnée qui doit survivre à l’appel qui la crée;

<p class="callout">Allouer dynamiquement ajoute une responsabilité : chaque acquisition réussie doit avoir une libération clairement attribuée.</p>

---

## Cas d’étude · Matrice de distances

Avec une limite fixe :

```c
double distances[MAX_VILLES][MAX_VILLES];
```

On réserve toujours le maximum, même pour trois villes. Si le maximum est trop petit, le programme ne peut pas continuer.

<p class="definition"><strong>Objectif :</strong> dimensionner la matrice selon le nombre de villes connu à l’exécution.</p>
