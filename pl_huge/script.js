var indexOfLetter = 0;
var indexOfSpace = 0;
var textInput;
var prop = [];
var text;

var txt;
var literyDoPrzeszukania = [];

var client = new XMLHttpRequest();
//client.open('GET', 'Input.txt');
client.open('GET', "pl_huge.dic")
client.onreadystatechange = function () {
    //alert(client.responseText);
    txt = client.responseText;
    //poszukiwania();
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

window.onload = function () {
    textInput = document.getElementById('litery');
    text = document.getElementById("text");

    textInput.addEventListener('input', function () {
        literyDoPrzeszukania = this.value;
        zaladowanieTextu();
    });
}

zaladowanieTextu = function () {
    var znalezione;
    //txt = txt.replace(/\n/g, "\n <br/>");
    var regexpTMP;
    // regexp = /[a-z]*a{1,}[a-z]*/g;
    var zapisane = txt;

    if (literyDoPrzeszukania.length < 0) {
        for (i = 0; i < literyDoPrzeszukania.length; i++) {
            regexpTMP = "[a-z]*";
            regexpTMP += literyDoPrzeszukania[i];
            regexpTMP += "{1,3}[a-z]*";
            regexpTMP = new RegExp(regexpTMP, 'g');
            //regexp1 = /.{2,7}/g;
            znalezione = zapisane.match(regexpTMP);
            console.log(znalezione.length);

            zapisane = '';

            znalezione.forEach(element => {
                if (element.length < (literyDoPrzeszukania.length + 1)) {
                    zapisane += element + "\n";
                }
            });

        }
    }

    zapisane = zapisane.replace(/\n/g, "<br/>\n");

    /*  zapisane = '';
      znalezione.forEach(element => {
          zapisane += element + "\n<br/>";
      });*/
    //console.log(zapisane);

    text.innerHTML = zapisane;
}