// Main script for torus puzzle with 4 rows and columns.
"use strict";

(function() {
  var NUMBER = 4; // number of rows/cols in puzzle
  var LENGTH = 100; // pixel width/height of tile

  document.observe("dom:loaded", function() {
    // add puzzle pieces to puzzle
    var puzzle = $("grid");
    for (var row = 0; row < NUMBER; row++) {
      for (var col = 0; col < NUMBER; col++) {
        // create puzzle piece
        var tile = $(document.createElement("div"));
        tile.addClassName("tile");
        tile.id = "tile_" + row + "_" + col;
        tile.style.top = row * LENGTH + "px";
        tile.style.left = col * LENGTH + "px";
        tile.style.backgroundPosition = -col * LENGTH + "px " + -row * LENGTH + "px";
        puzzle.appendChild(tile);
      }
    }
    // adds controls for puzzle
    setupButtons("north", "&#x25b2;", north);
    setupButtons("south", "&#x25bc;", south);
    setupButtons("east", "&#x25b6;", east);
    setupButtons("west", "&#x25c0;", west);
    // add handler to shuffle button
    $("shuffle").observe("click", shuffle);
  });

  // Adds cycle buttons to DOM element with given id.
  function setupButtons(id, label, cycle) {
    var buttons = $(id);
    for (var i = 0; i < NUMBER; i++) {
      var button = $(document.createElement("button"));
      button.id = id + "_" + i;
      button.innerHTML = label;
      button.observe("click", function() {
        var id = this.identify();
        var index = id.indexOf("_");
        cycle(parseInt(id.substring(index + 1)));
      });
      buttons.appendChild(button);
    }
  }

  // Cycle given column north.
  function north(col) {
    for (var row = NUMBER - 1; row > 0; row--) {
      swap(getTile(0, col), getTile(row, col));
    }
  }

  // Cycle given column south.
  function south(col) {
    for (var row = 0; row < NUMBER; row++) {
      swap(getTile(NUMBER - 1, col), getTile(row, col));
    }
  }

  // Cycle given row east.
  function east(row) {
    for (var col = 0; col < NUMBER; col++) {
      swap(getTile(row, NUMBER - 1), getTile(row, col));
    }
  }

  // Cycle given row west.
  function west(row) {
    for (var col = NUMBER - 1; col > 0; col--) {
      swap(getTile(row, 0), getTile(row, col));
    }
  }

  // Returns tile at given row and column.
  function getTile(row, col) {
    return $("tile_" + row + "_" + col);
  }

  // Swaps the given tiles.
  function swap(tile1, tile2) {
    var row1 = getRow(tile1);
    var col1 = getCol(tile1);
    var row2 = getRow(tile2);
    var col2 = getCol(tile2);
    tile1.id = "tile_" + row2 + "_" + col2;
    tile1.style.top = row2 * LENGTH + "px";
    tile1.style.left = col2 * LENGTH + "px";
    tile2.id = "tile_" + row1 + "_" + col1;
    tile2.style.top = row1 * LENGTH + "px";
    tile2.style.left = col1 * LENGTH + "px";
  }

  // Returns row of given tile.
  function getRow(tile) {
    return parseInt(tile.id.split("_")[1]);
  }

  // Returns column of given tile.
  function getCol(tile) {
    return parseInt(tile.id.split("_")[2]);
  }

  // Shuffles the puzzle.
  function shuffle() {
    var tiles = $$(".tile");
    for (var i = 0; i < 1000; i++) {
      //var j = parseInt(Math.random() * tiles.length);
      //var k = parseInt(Math.random() * tiles.length);
      //swap(tiles[j], tiles[k]);
      var j = parseInt(Math.random() * tiles.length);
      var k = parseInt(Math.random() * 4);
      if (k == 0) {
        east(getRow(tiles[j]));
      } else if (k == 1) {
        west(getRow(tiles[j]));
      } else if (k == 2) {
        north(getCol(tiles[j]));
      } else {
        south(getCol(tiles[j]));
      }
    }
  }
})();
