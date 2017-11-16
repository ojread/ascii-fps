var RC;
var fps = 24;
var mspf = 1000 / fps;
var updateInterval;
var columns = 120;
var wallCharacter = "#";

function init() {
	var display = $("#display");
	
	$("#updateWallCharacter").submit(function(e) {
		wallCharacter = $("#wallCharacter").val();
		RC.cast();
		e.preventDefault();
	});

	// Create HTML elements to act as graphical columns.
	for (i=0; i<columns; i++) {
		display.append(
			$("<span />", {
				id: "column" + i,
				class: "column"
			})
		);
	}

	var player = new Player(8);
	var level = new Level();
	RC = new RayCaster(columns, 500, level, player, input);
	
	//if (initializeLevel()) {
	//	updateInterval = window.setInterval("update()", mspf);
	//}

	if (generateLevel()) {
		updateInterval = window.setInterval("update()", mspf);
	}
}

function generateLevel() {
	var map = "";
	var playerPlaced = false;
	var digCallback = function(x, y, value) {
		if (value) {
			map += "#";
		} else {
			if (!playerPlaced) {
				map += "P";
				playerPlaced = true;
			} else {
				map += " ";
			}
		}
	}

	var mapSize = 64;

	var digger = new ROT.Map.Digger(mapSize, mapSize);
	digger.create(digCallback.bind(this));

	return RC.loadMap(map, mapSize, mapSize);
}

function initializeLevel() {
	var mapCells_x = 16;
	var mapCells_y = 16;
	var M = '' +
		'################' +
		'#  @@@@@       #' +
		'#  @   @ % # % #' +
		'#  @       #   #' +
		'#  @  @@       #' +
		'#    &         #' +
		'#   &   P      #' +
		'#  &      &&   #' +
		'#              #' +
		'#  ##  #@%#@%  #' +
		'#  #        #  #' +
		'#  ###      #  #' +
		'#  #        #  #' +
		'#  ######## #  #' +
		'#              #' +
		'################';

	return RC.loadMap(M, mapCells_x, mapCells_y);	
}

function update() {
	RC.update();
}