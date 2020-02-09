var container = document.querySelector(".container");
console.log(container);
var event = [];


function start() {

    for (i = 0; i < 81; i++) {
        var blok = '<div class="block" id="block' + i + '">' + i + ' </div>';
        container.innerHTML += blok;
        if ((i + 1) % 9 == 0) {
            container.innerHTML += '<div style="clear:both;"></div>';
        }
    }
}

function attributionOnMauseOver() {
    for (i = 0; i < 81; i++) {
        event.push(document.getElementById("block" + i))


    }
    console.log(event)

}


window.onload = function () {
    start();
    attributionOnMauseOver()
};