var date = new Date();
var hours = 0;
var min = 0;
var sec = 0;
var nameNumber = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

var clock = document.querySelectorAll("div#segment");
clock = [...clock];
var dot = document.querySelectorAll("div.dot");
dot = [...dot];

getTimeFun = () => {
    date = new Date();
    hours = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();
}

setTimeFun = function () {
    getTimeFun();
    let num = [
        Math.floor(hours / 10),
        hours % 10,
        Math.floor(min / 10),
        min % 10,
        Math.floor(sec / 10),
        sec % 10
    ];

    // console.log(num);
    for (let i = 0; i < num.length; i++) {
        const x = num[i];
        const className = clock[i].classList.value;

        // str.substr(0,str.indexOf(' ')); // "72"
        // str.substr(str.indexOf(' ')+1); // "tocirah sneab"

        if (className != nameNumber[x]) {
            clock[i].classList.remove(className);
            clock[i].classList.add(nameNumber[x]);
        }
    }
    dot[0].classList.toggle('notshow');
    dot[1].classList.toggle('notshow');

}

load = () => {

    setInterval(() => {

        setTimeFun();
        // console.log(hours + ' : ' + min + ' : ' + sec);
    }, 1000);


}


window.onload = load();