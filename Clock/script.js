console.log("a");


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
    setTimeFun();
}

setTimeFun = function () {
    var x = clock[0].classList;
    let lHours = hours / 10;
    let num = [
         Math.floor(hours / 10),
     hours % 10,
        Math.floor(min / 10),
       min % 10,
       Math.floor(sec / 10),
         sec % 10
    ];

    console.log(num);
    for (let i = 0; i < num.length; i++) {
        const x = num[i];
        for (let index = 0; index < nameNumber.length; index++) {
            const element = nameNumber[index];
            clock[i].classList.remove(element);
        }
        clock[i].classList.add(nameNumber[x]);
    }
    dot[0].classList.toggle('notshow');
    dot[1].classList.toggle('notshow');

}

load = () => {
    setInterval(() => {
        getTimeFun();
        // console.log(hours + ' : ' + min + ' : ' + sec);
    }, 1000);


}


window.onload = load();