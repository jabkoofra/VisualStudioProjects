var container = document.querySelector(".container");
var event = [];
var lastPoint = 0;




function start() {

    for (i = 0; i < 81; i++) {
        if ((i + 1) % 3 == 0) {
            var blok = '<div class="block" id="block' + i + '">' + i + ' </div>';
        } else {
            var blok = '<div class="block" id="block' + i + '">' + i + ' </div>';
        }
        container.innerHTML += blok;
        if ((i + 1) % 9 == 0) {
            container.innerHTML += '<div style="clear:both;"></div>';
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
            var x = parseInt(this.innerText);
            paintRow(x);
            paintCol(x);
            lastPoint = x;

        });
    });
    event.forEach(function (item) {
        item.addEventListener('mouseout', function () {
            var x = parseInt(this.innerText);;
            paintRow(lastPoint);
            paintCol(lastPoint);

        });
    });
}

function paintRow(idx) {
    var j = idx - idx % 9;
    for (var i = j; i <= j + 8; i++) {
        var x = document.getElementById('block' + i);
        x.classList.toggle('block-click');
    }
}

function paintCol(idx) {
    for (var i = 0; i < 9; i++) {
        var x = document.getElementById('block' + (idx + i * 9) % 81);
        x.classList.toggle('block-click');
    }
}


window.onload = function () {
    start();
    setMouseAttr()
};