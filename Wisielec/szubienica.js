var haslo = 'Bez pracy nie ma kołaczy'
haslo = haslo.toUpperCase()
var dlugosc = haslo.length

var litery = ['A', 'Ą', 'B', 'C', 'Ć', 'D',
  'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
  'Ł', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'Ś',
  'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ż', 'Ź']

var haslo1 = ''

for (i = 0;i < dlugosc;i++) {
  if (haslo.charAt(i) === ' ') {
    haslo1 = haslo1 + ' '
  }else {
    haslo1 = haslo1 + '-'
  }
}

function wypisz_haslo () {
  document.getElementById('plansza').innerHTML = haslo1
}
window.onload = start // wypisz_haslo

function start () {
  var tresc_diva = ''

  for (var i = 0; i < 35; i++) {
    var element = 'lit' + i
    tresc_diva = tresc_diva + '<div class="litera" onclick="sprawdz(' + i + ')" id="' + element + '">' + litery[i] + '</div>'
    if (!((i + 1) % 7)) {
      tresc_diva = tresc_diva + '<div style="clear:both;"></div>'
    }
  }

  document.getElementById('alfabet').innerHTML = tresc_diva
  wypisz_haslo()
}

String.prototype.ustawZnak = function(miejsce,znak){
  if(miejsce > this.length-1){
    return this.toString();
  }else{
    return this.substr(0,miejsce)+znak+this.substr(miejsce+1);
  }
}

function sprawdz (nr) {
  for (i = 0;i < dlugosc;i++) {
    if (haslo.charAt(i) == litery[nr]) {
      haslo1.charAt(i)= litery[nr];
    }
  }
  wypisz_haslo()
}
