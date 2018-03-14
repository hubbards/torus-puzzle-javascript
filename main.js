// Main script for torus puzzle with 4 rows and columns.

(function() {
  "use strict";

  var NUMBER = 4; // number of rows/cols in puzzle
  var LENGTH = 100; // pixel width/height of tile

  document.observe("dom:loaded", function() {
    // add puzzle pieces to puzzle
    var puzzle = $("puzzlearea");
    for (var row = 0; row < NUMBER; row++) {
      for (var col = 0; col < NUMBER; col++) {
        // create puzzle piece
        var square = $(document.createElement("div"));
        square.addClassName("square");
        square.id = "square_" + row + "_" + col;
        square.style.top = row * LENGTH + "px";
        square.style.left = col * LENGTH + "px";
        square.style.backgroundPosition = -col * LENGTH + "px " + -row * LENGTH + "px";
        puzzle.appendChild(square);
      }
    }
    // adds controls for puzzle
    setupButtons("left", "&#x25c0;", left);
    setupButtons("right", "&#x25b6;", right);
    setupButtons("up", "&#x25b2;", up);
    setupButtons("down", "&#x25bc;", down);
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

  // Returns square at given row and column.
  function getSquare(row, col) {
    return $("square_" + row + "_" + col);
  }

  // Returns row of given square.
  function getRow(square) {
    return parseInt(square.getStyle("top")) / LENGTH;
  }

  // Returns column of given square.
  function getCol(square) {
    return parseInt(square.getStyle("left")) / LENGTH;
  }

  // Cycle given row left.
  function left(row) {
    for (var col = NUMBER - 1; col > 0; col--) {
      swap(getSquare(row, 0), getSquare(row, col));
    }
  }

  // Cycle given row right.
  function right(row) {
    for (var col = 0; col < NUMBER; col++) {
      swap(getSquare(row, NUMBER - 1), getSquare(row, col));
    }
  }

  // Cycle given column up.
  function up(col) {
    for (var row = NUMBER - 1; row > 0; row--) {
      swap(getSquare(0, col), getSquare(row, col));
    }
  }

  // Cycle given column down.
  function down(col) {
    for (var row = 0; row < NUMBER; row++) {
      swap(getSquare(NUMBER - 1, col), getSquare(row, col));
    }
  }

  // Swaps the given squares.
  function swap(square1, square2) {
    var row1 = getRow(square1);
    var col1 = getCol(square1);
    var row2 = getRow(square2);
    var col2 = getCol(square2);
    square1.style.top  = row2 * LENGTH + "px";
    square1.style.left = col2 * LENGTH + "px";
    square1.id = "square_" + row2 + "_" + col2;
    square2.style.top  = row1 * LENGTH + "px";
    square2.style.left = col1 * LENGTH + "px";
    square2.id = "square_" + row1 + "_" + col1;
  }

  // Shuffles the puzzle.
  function shuffle() {
    var squares = $$(".square");
    for (var i = 0; i < 1000; i++) {
      //var j = parseInt(Math.random() * squares.length);
      //var k = parseInt(Math.random() * squares.length);
      //swap(squares[j], squares[k]);
      var j = parseInt(Math.random() * squares.length);
      var k = parseInt(Math.random() * 4);
      if (k == 0) {
        left(getRow(squares[j]));
      } else if (k == 1) {
        right(getRow(squares[j]));
      } else if (k == 2) {
        up(getCol(squares[j]));
      } else {
        down(getCol(squares[j]));
      }
    }
  }
})();
