var container = document.querySelector(".container");
var board = document.querySelector(".board")
var numeric = document.querySelector(".numeric");
var help = document.querySelector(".help");
var event = [];
var currentIndex = -1;
var selectedField = -1;




function start() {

    for (i = 0; i < 81; i++) {
        var blok = '<div class="block" id="block' + i + '">' + i + ' </div>';
        board.innerHTML += blok;
        if ((i + 1) % 9 == 0) {
            board.innerHTML += '<div style="clear:both;"></div>';
        }
    }

    for (i = 0; i < 9; i++) {
        var blok = '<div class="num" id="numID' + i + '">' + i + ' </div>';
        numeric.innerHTML += blok;
        if ((i + 1) % 3 == 0) {
            numeric.innerHTML += '<div style="clear:both;"></div>';
        }
    }
    for (i = 0; i < 4; i++) {
        var blok = '<div class="helpButt" id="helpID' + i + '">' + i + ' </div>';
        help.innerHTML += blok;
        if ((i + 1) % 2 == 0) {
            help.innerHTML += '<div style="clear:both;"></div>';
        }
    }

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
            currentIndex = parseInt(this.innerText);
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
            if (selectedField >= 0) {
                selectedField = -1
            } else {
                selectedField = parseInt(this.innerText)
                console.log(selectedField);
                
            }
        });
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
            x.classList.add('block-click');
        } else {
            x.classList.remove('block-click');
        }
    });
}


window.onload = function () {
    start();
    setMouseAttr()
};