var indexOfLetter = 0;
var indexOfSpace = 0;
var prop = [];

var client = new XMLHttpRequest();
client.open('GET', 'Input.txt');
client.onreadystatechange = function () {
    // alert(client.responseText);

    poszukiwania();
}
client.send();

function poszukiwania() {

    for (i = 0; i < 7; i++) {
        var tmp = client.responseText.codePointAt(i);
        /* console.log(tmp + ' ' + i);
        console.log(client.responseText.indexOf(String.fromCharCode(13)) + " i jak");
*/
    }
    indexOfLetter = client.responseText.indexOf('a');
    indexOfSpace = client.responseText.indexOf(String.fromCharCode(13));

    while (client.responseText.length > 0)
        if (indexOfLetter < indexOfSpace) {
            console.log(client.responseText.slice(0, indexOfSpace));
        }
    else {
        console.log(client.responseText.slice(indexOfSpace));
    }

}