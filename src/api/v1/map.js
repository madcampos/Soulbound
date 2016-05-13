//TODO: start works on the map api.
/*
 * Maps of types:
 * - Natual:
 *  - Caves
 *  - Fields
 *  - Woods
 *  - Sea
 *  - Islands
 *  - Swamps
 *  - Plains
 *  - Tundra
 *  - Etc.
 * - Syntetic:
 *  - City
 *  - Dungeons
 *  - Ruins
 *  - Ships (water, air, space, etc.)
 *  - Vessels (fantasy & sci-fi)
 *
 * Refs:
 * - http://www.roguebasin.com/index.php?title=Dungeon-Building_Algorithm
 * - http://www.gridsagegames.com/blog/2014/06/procedural-map-generation/
 * - http://gamedevelopment.tutsplus.com/tutorials/create-a-procedurally-generated-dungeon-cave-system--gamedev-10099
 * - http://pcg.wikidot.com/pcg-algorithm:map-generation
 * - https://www.reddit.com/r/gamedev/comments/1dlwc4/procedural_dungeon_generation_algorithm_explained/
 * - http://www.futuredatalab.com/proceduraldungeon/#algorithms
 * - http://ondras.zarovi.cz/algo/
 * - http://www.diablofans.com/forums/diablo-iii-general-forums/diablo-iii-general-discussion/24505-a-full-guide-to-the-first-4-overworld-maps
 * - http://www.diablowiki.net/Randomization#Map_Generation_and_Size
 * - http://diablo.gamepedia.com/Map_Generation
 *
 * Creation process:
 * Maps can be random, fixed or mixed. Fixed maps are "as is", so no generation.
 * Mixed maps takes some blocks and randomize them (markov chain also?) so it has a somewhat fixed layout but with a few moving parts (diablo 3 open maps style)
 * Random maps can be generated in two forms: procedurally or by tiles.
 * Tiles are chosen randomly from a palette where they are defined by size (1x1, 2x2, 3x4, etc.) and the connection points for each tile (3x3: ### ### #.#, #.# .#. #.#, etc.).
 * Procedurally generated maps take the following steps (basic):
 * 1. Generate a mask (open/closed state) that will be used to define borders, walls and "islands" in the map (solid non trespassing objects).
 * 2. Add "lines" to the map such as rivers, roads, trails, other.
 * 3. Add other huge objects to the map. These objects are "non crossing" (as in walls or a mask) or affect paint or has complex layout. This can be something like shrines, wreckages and other big locations on the map that will be inserted clutter.
 * 3. Paint the map.
 * 4. Add clutter.
 * 5. Work lightning where needed.
 *
 * TODO: rethink mixed map: dungeon with part cave.
 */