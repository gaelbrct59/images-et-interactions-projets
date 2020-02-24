Groupe :
========

- BRICOUT Gaël
- LIMENTOUR Gaëtan
- LEBAS Samuel
- BEAREZ Antoine

Objectif
--------

Dans le cadre de notre deuxième projet en II2D, nous avons dû réaliser un brainstorming afin d'essayer de trouver une idée en rapport avec l'Interaction Homme Machine.
Nous allons tâcher de faire en sorte que chacuns des audio visualizers soient interractifs.
Après de nombreuses idées, nous avons choisi de créer une application qui interagit avec la musique, notamment, et, réagit à la musiques (par exemple aux basses, aux aigus, …), etenfin qui créé de la musique, selon les envies de l’utilisateur.


Mise en oeuvre du TP
--------------------

TP en cours
2 visualizers terminés. Nous finalisons le troisième, et nous passons au createur de musique.

Instructions
------------

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


Notes de conception
-------------------

  * JavaScript est un langage qui est capable de représenter et réaliser n’importe quel phénomène physique. Nous avons eu l’exemple au précédent projet, avec les principes de forces, rebondissement, etc…
  * Nous utiliserons avec ceci accompagné de Web Audio API. Celle-ci propose un système puissant et flexible pour contrôler les données audio sur internet. Elle permet notamment de sélectionner des sources audio (microphone, flux media), d'y ajouter des effets, de créer des visualisations, d'appliquer des effets de spatialisation (comme la balance), etc.
  * Nous nous inspirons beaucoup de notre premier TP d'II2D, notamment sur la structure du code, et sur la gestion des éléments, comme des particules.