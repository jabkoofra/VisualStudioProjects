var container = document.querySelector(".container");
var board = document.querySelector(".board")
var numeric = document.querySelector(".numeric");
var help = document.querySelector(".help");
var event = [];
var currentIndex = -1;
var selectedField = -1;

var helpEvent = [];
var movesQueue = [];



function start() {

    for (i = 0; i < 81; i++) {
        var blok = '<div class="block" id="block' + i + '">' + i + ' </div>';
        board.innerHTML += blok;
        if ((i + 1) % 9 == 0) {
            board.innerHTML += '<div style="clear:both;"></div>';
        }
    }

    for (i = 0; i < 9; i++) {
        var blok = '<div class="num" id="numID' + i + '">' + (i + 1) + ' </div>';
        numeric.innerHTML += blok;
        if ((i + 1) % 3 == 0) {
            numeric.innerHTML += '<div style="clear:both;"></div>';
        }
    }
    /*  for (i = 0; i < 4; i++) {
          var blok = '<div class="helpButt" id="helpID' + i + '">' + i + ' </div>';
          help.innerHTML += blok;
          if ((i + 1) % 2 == 0) {
              help.innerHTML += '<div style="clear:both;"></div>';
          }
      }
      */

    for (i = 2; i < 80; i = i + 3) {
        if ((i + 1) % 9 != 0) {
            var x = document.getElementById('block' + i);
            x.classList.add('right-border');
            x = document.getElementById('block' + (i + 1));
            x.classList.add('left-border');
        }
    }

    for (i = 18; i <= 26; i++) {
        var x = document.getElementById('block' + i);
        x.classList.add('bottom-border');
    }
    for (i = 45; i <= 53; i++) {
        var x = document.getElementById('block' + i);
        x.classList.add('bottom-border');
    }
    for (i = 27; i <= 35; i++) {
        var x = document.getElementById('block' + i);
        x.classList.add('top-border');
    }
    for (i = 54; i <= 62; i++) {
        var x = document.getElementById('block' + i);
        x.classList.add('top-border');
    }

}

function setMouseAttr() {
    for (i = 0; i < 81; i++) {
        event.push(document.getElementById('block' + i));
    }

    event.forEach(function (item) {
        item.addEventListener('mouseover', function () {
            currentIndex = parseInt(this.id.slice(5));
            paintAll(true);
        });
    });
    event.forEach(function (item) {
        item.addEventListener('mouseout', function () {
            paintAll(false);
        });
    });

    event.forEach(function (item) {
        item.addEventListener('click', function () {
            if (selectedField != -1)
                document.getElementById('block' + selectedField).classList.remove('block-click');

            var val = parseInt(this.id.slice(5));
            if (selectedField == val) {
                selectedField = -1
                console.log(selectedField);
            } else {
                selectedField = val;
                document.getElementById('block' + selectedField).classList.add('block-click');
                console.log(selectedField);
            }
        });
    });

    for (var i = 0; i < 9; i++) {
        helpEvent.push(document.getElementById('numID' + i));
    }
    helpEvent.forEach(function (item) {
        item.addEventListener('click', function () {
            if (selectedField > -1) {
                var id = 'block' + selectedField;
                var currentValue = document.getElementById(id);
                var nextValue = this.innerText;
                var place = {
                    blockID: id,
                    currentValue: currentValue.innerText,
                    nextValue: nextValue
                };
                movesQueue.push(place);
                if (currentValue.innerText == nextValue) {
                    currentValue.innerText = '';
                } else {
                    currentValue.classList.remove('block-notepad');
                    currentValue.innerText = nextValue;
                }
            }
        });
    });

    helpEvent.push(document.getElementById('helpIDback'));
    helpEvent[helpEvent.length - 1].addEventListener('click', function () {
        if (movesQueue.length > 0) {
            var lastMove = movesQueue[movesQueue.length - 1];
            var back = document.getElementById(lastMove.blockID);
            back.innerText = lastMove.currentValue;
            movesQueue.pop();
        }
    });

    helpEvent.push(document.getElementById('helpIDerrase'));
    helpEvent[helpEvent.length - 1].addEventListener('click', function () {
        if (selectedField > -1) {
            document.getElementById('block' + selectedField).innerText = '';
        }
    });

    helpEvent.push(document.getElementById('helpIDnotepad'));
    helpEvent[helpEvent.length - 1].addEventListener('click', function () {
        if (selectedField > -1) {
            var tmp = document.getElementById('block' + selectedField);
            tmp.innerText = '';
            var create = tmp.classList.toggle('block-notepad');
            if (create) {
                for (i = 0; i < 9; i++) {
                    var blok = '<div class="notepad" id="notepadID' + i + '">' + (i + 1) + ' </div>';
                    tmp.innerHTML += blok;
                    if ((i + 1) % 3 == 0) {
                        tmp.innerHTML += '<div style="clear:both;"></div>';
                    }
                }
            }
        }
    });
}

function getRow() {
    var temp = []
    var j = currentIndex - currentIndex % 9;
    for (var i = 0; i < 9; i++) {
        temp.push(j + i);
    }
    return temp;
}

function paintRow() {
    var temp = getRow(currentIndex);
    temp.forEach(function (idxRow) {
        var x = document.getElementById('block' + idxRow);
        x.classList.toggle('block-click');
    });
}

function getCol() {
    var temp = []
    for (var i = 0; i < 9; i++) {
        temp.push((currentIndex + i * 9) % 81);
    }
    return temp;
}

function paintCol() {
    var temp = getCol(currentIndex);
    temp.forEach(function (idxCol) {
        var x = document.getElementById('block' + idxCol);
        x.classList.toggle('block-click');
    });
    return temp;
}

function getBloc() {
    var col = getCol();
    var row = getRow();
    var tmp = [];

    var i = currentIndex - currentIndex % 3;
    var j = currentIndex - currentIndex % 27 + currentIndex % 9 - currentIndex % 3;

    for (k = 0; k < 3; k++) {
        for (l = 0; l < 3; l++) {
            tmp.push(j + k * 9 + l);
        }
    }
    return tmp;
}

function getAllElements() {
    var tmp = [];
    tmp = tmp.concat(getRow(), getCol(), getBloc());
    return tmp
}

function paintAll(isPainting) {
    var tmp = getAllElements();

    tmp.forEach(function (idx) {
        var x = document.getElementById('block' + idx);
        if (isPainting) {
            x.classList.add('block-hover');
        } else {
            x.classList.remove('block-hover');
        }
    });
}


window.onload = function () {
    start();
    setMouseAttr()
};