let board = document.querySelectorAll(".board")
board = [...board];
const n = 11;

// in+j


function init() {
    for (i = 1; i<10; i ++) {
        console.log(5 * n + i);
        board[5 * n + i].classList.add("board_move");
    }

    for (i = 1; i<10; i ++) {
        console.log(5 * n + i);
        board[5 * n + i].classList.add("board_move");
    }

}



window.onload = function () {
    init();

};