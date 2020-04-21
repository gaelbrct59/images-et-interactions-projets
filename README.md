Objectif
--------

Dans le cadre de notre deuxième projet en II2D, nous avons dû réaliser un brainstorming afin d'essayer de trouver une idée en rapport avec l'Interaction Homme Machine.

Après de nombreuses idées, nous avons choisi de créer une application qui interagit avec la musique, notamment, et, réagit à la musiques (par exemple aux basses, aux aigus, …), etenfin qui créé de la musique, selon les envies de l’utilisateur.


Mise en oeuvre 
---------------

Tous les visualizers sont terminés. Gaël s'est occupé de l'atomVisualizer, de la création de musique.
Gaëtan s'est occupé du deuxieme visualizer (RaboxVisualizer) et Samuel du dernier (particuleVisualizer)

Instructions
------------

Pour créer des notes : cliquer sur les touches a, z, e, r, t, y, u, i, o, q, s, d 

Détails sur les visualizers
---------------------------

1) Le Fox vs Rabbit.
* L'idée ici est de faire une espèce de mini jeux, où les renards chassent les lapins.
* Lors du lancement de la musique, la puissance des renards est augmentée, ce qui implique qu'ils tuent beaucoup plus rapidement les lapins.
* De plus, la vitesse des renards est elle-aussi augmentée, en fonction de la fréquence de la musique. Cela implique que l'image est bien plus rapide et dynamique lorsque la musique est "forte" ou a plus de "basses"
* L'utilisateur peut voir les statistiques des renards et lapins, au clic sur ceux-ci.

2) L'atome.
* Des "atomes" se baladent sur l'écran et rebondissent sur les murs. Lorsque deux atomes se rapprochent, un lien se créé entre les deux.
* L'utilisateur peut placer sa souris sur le canvas, ce qui créera des liens entre les atomes assez proches, et la souris de l'utilisateur.
* La vitesse des atomes dépend de la fréquence de la musique, ce qui implique qu'au moment où la musique est rapide, tous les atoms bougent plus rapidement, et les liens entre eux créent une masse informe, qui rend un effet visuel cool.

3) ParticuleExplosion
* Ici l'idée était de reprendre ce qu'on avait fait au projet précedent lors des 3 premiers TP. Nous avons donc gardé les particules.
* Nous avons rajouté à cela un cercle dynamique, il est composé de plusieurs traits, où leurs taille augmente en fonction de la frequence de la musique, chaque trait est reservé à une fréquence en particulier.
* La vitesse des particules varie en fonction de la fréquence de la musique. 
* Detail d'execution : nous avons vue que lors de l'execution, si notre PC n'est pas "Performant" le fait de génerer beaucoup de particules, fait ralentir l'image.
* Si cela arrive il faut remplacer dans ../particuleVisualizer/ii2d_particle.js la valeur de la ligne "this.birthRate = 5;".

Notes de conception
-------------------

  * JavaScript est un langage qui est capable de représenter et réaliser n’importe quel phénomène physique. Nous avons eu l’exemple au précédent projet, avec les principes de forces, rebondissement, etc…
  * Nous utiliserons avec ceci accompagné de Web Audio API. Celle-ci propose un système puissant et flexible pour contrôler les données audio sur internet. Elle permet notamment de sélectionner des sources audio (microphone, flux media), d'y ajouter des effets, de créer des visualisations, d'appliquer des effets de spatialisation (comme la balance), etc.
  * Nous nous inspirons beaucoup de notre premier TP d'II2D, notamment sur la structure du code, et sur la gestion des éléments, comme des particules.
