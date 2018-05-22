# **_Stuck!_**
**[Live Demo](https://carib.codes/stuck)**

### What is _Stuck!_?

Good question! Originally (and ultimately), _Stuck!_ is a minimalist [roguelike RPG](https://en.wikipedia.org/wiki/Roguelike).
That's the goal, anyway. For now it's a an active pathfinding visualizer with procedurally generated maps:

![_Stuck!_ Pathfinding Visualizer](/assets_readme/stuck_readme_still.png)

Pathfinding is accomplished with an implementation of the [A* algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm) using a binary heap priority queue and customizable rules for the cellular automata/fractal trees that produce the maps. [Give it a try](https://carib.codes/stuck). It's pretty neat!

### Current Features:

* Real-time active pathfinding
* User-controlled target
* Procedurally generated maps
* Customizable rules for cellular automata (maps)

### The Story So Far

My first attempt at building _Stuck!_ was rough. Instead of using the HTML5 `<canvas>` API to present and manage the game (as it were), I decided to put it all together from scratch using just JavaScript (ES6) and CSS3. I'm proud of what I built and I had a lot of fun learning as I went, but it's a real beast on the browser. [See for yourself](https://carib.codes/stuck_v1/).

In order to implement collision detection and response without the kind of 2D physics environment enabled with `<canvas>`, I resorted to generating maps by appending 10x10 `<div>` elements to the 'stage' (also a `<div>`) and performing a series of checks for each entity to figure out its surroundings. Turns out that's a whole lotta `<div>`s!! In a particularly crowded map, the DOM was dealing with upwards of 3500 individual elements.

Honestly, I think it's a pretty cool system which allowed me to try some novel approaches to pathfinding. But once I tried to add more features and create the game I envision it was clear that I'd have to start over again from scratch.

Now, `<canvas>` firmly in place, I dug in to some 2D vector math and applied all the fun stuff I'd learned on v1 to this new and 1000% improved _Stuck! v2_.


### Pathfinding

This was a ton of fun to work on! As I said at the top, it's an A* algorithm using a binary heap priority queue to store and sort the nodes. My early attempts were pretty funny, here's a personal favorite:

![Found it!](/assets_readme/v2_early_pathfinding-53.png)

Turns out my algorithm was overestimating the heuristic ([Manhattan Distance](https://en.wikipedia.org/wiki/Taxicab_geometry)) I'd given it. Eventually I got it right though:

![Much better](/assets_readme/v2_good_pathfinding.png)

And when I added the binary heap data structure it got way way faster.

#### Planned
So, I know that this algorithm isn't returning the absolute most-efficient path from A to B. I mean, look at the second image above. Clearly, there are some wasted steps in there and it's crutching pretty heavily on the walls.

Cleaning that path up is first thing on my task list. To start, I'll be testing a few optimizations I've read about. For example, [Jump Point Search](https://en.wikipedia.org/wiki/Jump_point_search) looks very promising for my needs since I don't have variable terrain costs weighing down movement.

I'd also like to experiment with different map representations. And once I can wrap my head around it a bit tighter, I plan on trying out a [Fibonacci heap](https://en.wikipedia.org/wiki/Fibonacci_heap) which should speed things up quite a bit.

Finally, the simplest and most practical optimization I can think of is to just refactor! I hacked a few things together building this, for sure. ASAP, I plan on consolidating a few classes that are effectively redundant like the [Node](https://github.com/carib/stuck/blob/master/site/js/entities/map_grid/heap.js) and  [Cell](https://github.com/carib/stuck/blob/master/site/js/entities/map_grid/cell.js). I may also rebuild [Stage](https://github.com/carib/stuck/blob/master/site/js/entities/stage.js) and [Pathfinder](https://github.com/carib/stuck/blob/master/site/js/entities/map_grid/pathfinder.js) to be subclasses of [Grid](https://github.com/carib/stuck/blob/master/site/js/entities/map_grid/grid.js) since they've both ended up using a lot of the Grid methods.

### Collision Detection & Response

#### Detection
This is a super straight forward [Axis-Aligned Bounding Boxes](https://en.wikipedia.org/wiki/Bounding_volume) (AABB) system. Since all the colliders are square, they're essentially their own bounding boxes. For the broad-phase detection, each moving collider maintains four map objects representing the each of the four possible grid cells they may occupy.

#### Response
If one of these maps is found to contain more than one object (other than itself), a narrow-phase check for intersections is triggered. If any intersection is present, the collider is reset to its last known xy position and its velocity is dropped to zero.

#### Planned
I'm still not completely satisfied with the response part of this. In some cases the colliders will stick to the walls, and in rare instances the walls will actually swallow them up!

I've been reading up a lot on 2D physics and math for games and I plan on experimenting with different concepts and implementations. One example I saw creates individual class instances for each point, vector, sweep/test, and reflection. It looks really interesting, but I'll need to refactor my classes first to get the most out of it.

# The Future!
This is far and away my favorite project to work on at the moment. I mean, I love love CSS3 and exploring all the new tricks and fun stuff there, but anyone who knows me knows that my first love is learning new stuff.

Just in terms of exploring new concepts and opportunities for creative problem solving, building this game has been the most rewarding experience I've had in years.

I realize it's not much to look at and as far as games go it's very clearly not one, but I'm nothing if not stubbornly persistent so I'm confident it'll come together shortly.

After the general refactoring and clean up, my ASAP priorities are:

* Fix enemy/NPC movement once path is found
* Introduce a Pub/Sub event routing system
* Explore potential uses for Web Workers/background threads
* Add basic RPG elements like combat, items, and experience
* Introduce character creation and persistent data

Please feel free to email me at <yes@carib.codes> if you have any feedback or questions or would otherwise like to discuss any of the topics covered here. I'm brand new at a lot of this stuff, but I'm super stoked on it so I'd be happy to share ideas and resources!

Have fun!
