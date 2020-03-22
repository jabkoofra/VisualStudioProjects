 
Funkcje
 Ostatnia aktualizacja: 09 stycznia 2020
Funkcje to zbiór zgrupowanych instrukcji, które możemy odpalać poprzez podanie ich nazwy. Każda taka funkcja po wywołaniu wykonuje swój wewnętrzny kod, a następnie może zwrócić nam jakąś wartość.

Ogólna deklaracja funkcji ma postać:

function nazwaFunkcji(nr) {
    const result = nr * nr;
    return result;
}

//Po stworzeniu funkcji wystarczy ją wywołać poprzez podanie jej nazwę:
nazwaFunkcji(); //4
nazwaFunkcji(); //4
nazwaFunkcji(); //4
Funkcję można traktować jak swego rodzaju podprogramy, które w każdej chwili możemy odpalić by wykonać dany kod. Takie funkcje możesz spokojnie trzymać w oddzielnym pliku, który potem będziesz dołączać do wybranych stron. Na tej właśnie zasadzie używa się znanych bibliotek - np. jQuery, Lodash czy podobnych, które są niczym innym jak zbiorem funkcji, które ktoś dla nas napisał.

W tym kursie już nie raz używałeś funkcji:

alert("Ala ma kota");

Math.random();
Math.max(1,2,3);

"ala ma kota".toUpperCase();
"kot i pies".substr(1);

[1,2,3].push(4);
[1,2,3].join("-");
Widzisz te nawiasy na końcu każdej linii? Poprzedza je nazwa danej funkcji. Autorzy JavaScript przygotowali dla nas zestaw jakiś funkcji. Miło z ich strony...

#Parametry funkcji
Działanie funkcji
Dla każdej funkcji możemy utworzyć parametry. Dzięki nim przy odpalaniu będziemy mogli podawać dla danej funkcji jakieś wartości:

function sum(a, b) {
    return a + b;
}

console.log( sum(2, 3) ); //5
console.log( sum(4, 3) ); //7
function lineText(name, pet) {
    console.log(name + " ma " + pet);
}

lineText("Ola", "kota"); //Ola ma kota
lineText("Ala", "psa"); //Ala ma psa
Jeżeli nasza funkcja wymaga wartości, wywołując ją musimy podać dla wszystkich parametrów wartości - tak zwane argumenty. Jeżeli ich nie podamy zostaną użyte dla nich wartości undefined:

function writeText(name, age) {
    console.log(`${name} ma kota, który ma ${age} lat`);
}

writeText("Ala", 5); //Ala ma kota, który ma 5 lat
writeText("Marysia"); //Marysia ma kota, który ma undefined lat
writeText(); //undefined ma kota, który ma undefined lat
#Domyślne wartości
Jeżeli funkcja wymaga podania wartości przy jej wywołaniu, a my ich nie podamy, w jej wnętrzu będą one wynosić undefined:

function printText(txt) {
    console.log("Twój tekst to " + txt);
}

printText("kot"); //"Twój tekst to kot"
printText(); //"Twój tekst to undefined"
Dla parametrów możemy też ustawiać domyślne wartości. Wystarczy po nazwie parametru ustawić mu domyślną wartość:

function print(name = "Michał", status = "najlepszy") {
    console.log(name + " jest " + status);
}

print(); //"Michał jest najlepszy"
print("Karol"); //"Karol jest najlepszy"
print("Paweł", "wysoki"); //"Paweł jest wysoki"
print(undefined, "wysoki"); //"Michał jest wysoki" - undefined jest traktowane jak niepodanie wartości
W poprzednich wersjach JavaScript (ES5 i wcześniejsze) domyślne atrybuty nie istniały, ale i na to były sposoby.

#arguments i rest
JavaScript nie wymaga od nas, abyśmy przekazywali do funkcji wymaganą przez daną funkcję ilość wartości.

Jeżeli nie zakładamy konkretnej liczby parametrów dla funkcji, możemy skorzystać z właściwości arguments, która zawiera w sobie wszystkie przekazane wartości:

function sum() {
    console.log(arguments);
}

sum(); //[] Arguments 
sum(1, 2, 3, 4); //[1, 2, 3, 4] Arguments 
sum("ala", "ma", "kota"); //["ala", "ma", "kota"] Arguments
Obiekt arguments jest tablico podobny, ale tak naprawdę nie jest tablicą.
Oznacza to, że nie możemy na nim wykonywać metod przeznaczonych dla tablic np. forEach, map:

function superSum() {
    const result = arguments.forEach(function(el) { //błąd, forEach jest dla tablic
        console.log(el);
    });

    return result;
}

superSum(1, 2, 3, 4);
W dzisiejszych czasach zamiast operować na obiekcie arguments, zalecane jest używanie rest operator, który zbiera przekazane argumenty w postaci klasycznej tablicy.

function superSum(...args) {
    console.log(args); [1, 2, 3, 4]
}

superSum(1, 2, 3, 4);
function superSum(...param) {
    let result = param.reduce(function(a, b) {
        return a + b;
    });

    return result;
}

superSum(1, 2, 3, 4);
Dokładnie na ten temat pomówimy sobie w rozdziale o rest parameter.

#Instrukcja return
Każda funkcja zwraca jakąś wartość. Domyślnie jest nią undefined. Aby zwrócić naszą wartość, posłużymy się instrukcją return:

function calculate(number1, number2) {
    const result = number1 + number2;
    return result;
}

calculate(10, 4) //wypisze 14
Dzięki temu, że nasza zwraca jakąś wartość, możemy ją użyć do innych celów niż tylko wypisywanie tekstów w debugerze:

function randomBetween(min = 0, max = 10) {
    return Math.floor(Math.random()*(max-min+1)+min);
}


//wstawiam wynik do body
document.body.innerText = randomBetween(1, 100);

//wykorzystuję funkcję do powtarzania tekstu
console.log( "kot".repeat(randomBetween(1, 6)) );

//dodaję 2 losowe liczby
console.log( randomBetween(1, 6) + randomBetween(1, 10) );

//generuję tablicę z liczbami 1-100
const tab = [];
for (let i=0; i<10; i++) {
    tab.push(randomBetween(1, 100);
}

if (randomBetween(1, 10)) { //w miejscu gdzie używamy funkcji pojawia się wynik
    ...
}
Instrukcja return nie tylko zwraca wartość, ale i przerywa dalsze działanie danej funkcji.

function sum(a, b) {
    return a + b;

    console.log(a + b);
    console.log("Test"); //nigdy nie zostanie wykonane, bo wcześniej return przerwie działanie funkcji
}
W wielu edytorach kod leżący za return będzie miał przytłumione kolory, co symbolizuje, że taki kod nigdy sie nie wykona:

kod po instrukcji return
Instrukcji return może być wiele dla jednej funkcji. Zawsze jednak wykonana zostanie tylko jedna:

function getStatus(number) {
    if (number < 20) {
        return "bad"
    }

    if (number < 30) {
        return "medium"
    }

    return "good"
}

console.log(getStatus(10));
console.log(getStatus(25));
function fixName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

const result = fixName("piotr") + " " + fixName("kowalski");
console.log(result); //Piotr Kowalski
Instrukcja return może zwracać dowolną wartość. Może to być tablica:

function returnArray(size) {
    return new Array(size).fill(0).map((el, key) => key);
}

const result = returnArray(10); //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log(result[0]);
...lub obiekt:

function returnObject() {
    return {
        first: "ala",
        second: "bala",
        third: "cala"
    }
}

console.log(returnObject().first); //"ala"
lub inne funkcje, o czym przekonasz się nieco później.

#Wyrażenie funkcyjne
Do tej pory poznaliśmy jeden sposób tworzenia funkcji:

function printText() {
    ...
}

printText();
Jest to tak zwana deklaracja funkcji. Drugi sposób zwie się wyrażeniem funkcyjnym:

const printText = function() {
    ...
}

printText();
Wyrażenie i definicja różnią się od siebie nie tylko sposobem zapisu, ale także tym, jak taki kod jest interpretowany przez przeglądarkę.

Funkcja zadeklarowana za pomocą deklaracji jest od razu dostępna dla całego skryptu. Wynika to z faktu działania mechanizmu hoistingu (znany ze zmiennych), który przenosi taką deklarację na początek kodu. Możemy więc odwoływać się do funkcji, która jest zadeklarowana później w kodzie.

myFunction(); //Tutaj jest ok

function myFunction() {
    console.log("...");
}
Przy wyrażeniu funkcyjnym mechanizm ten nie działa, a takie przedwczesne odwołanie się do funkcji jest niemożliwe. Funkcja zdefiniowana za pomocą wyrażenia musi być zadeklarowana przed jej wywołaniem:

myFunction(); //Błąd

const myFunction = function() {
    console.log("...");
}
Czy oznacza to, że deklaracje zawsze będą lepszym wyborem? Nie koniecznie. Po pierwsze gdy tworzymy funkcje za pomocą wyrażenia funkcyjnego poprzedzonego słowem let/const, możemy ograniczyć działanie jej działania okrywając ją blokiem. Po drugie możemy skrócić jej zapis za pomocą funkcji strzałkowej.

Istnieje jeszcze jedna różnica między obydwoma zapisami. Przy stosowaniu deklaracji, dana funkcja zapisywana jest jako klucz obiektu Window. W przypadku wyrażenia poprzedzonego słowem const/let nie ma to miejsca.

function testX() { }
const textY = function() { }

console.log(window);
function declaration
Powyższe różnice nie oznaczają jednak, że deklaracji nigdy nie powinieneś używać. Używaj - a jakże. W większości przypadków omawiane różnice nie będą miały aż takiego znaczenia. Ważniejszą sprawą wydaje się przyjęcie po prostu jakiegoś stylu pisania.

#Funkcja anonimowa
Wyrażenie funkcyjne bardzo często będzie występować jako tak zwana funkcja anonimowa, czyli funkcja, która ani nie ma nazwy, ani nie została podstawiona pod zmienną. Taka funkcja będzie występować przy najczęściej przy funkcjach, które przekazujemy jako parametry:

document.addEventListener("click", function() {
    console.log("klik");
});

[1,2,3].forEach(function(el) {
    console.log(el);
});

[1,2,3].sort(function(a, b) {
    return a - b;
});
Dokładniej tym tematem zajmiemy się w kolejnym rozdziale.

#Funkcja strzałkowa
W ECMAScript 2015 został wprowadzony jeszcze jeden zapis wyrażenia funkcyjnego zwany funkcją strzałkową.

const show = function(a, b) {
    console.log(b);
    console.log(a);
}

//za pomocą funkcji strzałkowej
const show = (a, b) => {
    console.log(a);
    console.log(b);
}
Funkcja strzałkowa ma 2 kluczowe zadania: skrócenie zapisu, oraz nie zmieniane kontekstu this.

Do tego drugiego tematu jeszcze powrócimy (tu i tu). Na razie skupmy się na skróconym zapisie.

Funkcji strzałkowej możemy użyć tylko dla wyrażeń funkcyjnych. Przy jej stosowaniu słowo function zamieniamy na strzałkę (tak zwany fat arrow):

//wyrażenie funkcyjne
const show = function() { ... }

//za pomocą funkcji strzałkowej
const show = () => { ... }
Przy skracaniu zapisu za pomocą funkcji strzałkowej możemy zastosować kilka dodatkowych "optymalizacji":

//jeżeli funkcja nie ma parametrów, dajemy nawiasy i strzałkę
const show = function() { ... }

const show = () => { ... }
//jeżeli funkcja wymaga tylko jednego parametru możemy pominąć nawiasy
const show = function(a) { ... }

const show = a => { ... }
//jeżeli funkcja wymaga większej ilości parametrów, nawiasy muszą zostać
const show = function(a, b) { ... }

const show = (a, b) => { ... }
//jeżeli funkcja zwraca tylko jedną instrukcję możemy pominąć klamry
const show = function(a) {
    console.log(a);
}

const showF = a => console.log(a);
//jeżeli funkcja tylko coś zwraca, możemy pominąć instrukcję return
const show = function(a) {
    return a * a;
}

const show = a => a * a;
Zapis ten idealnie nadaje się do stosowania w przypadku funkcji anonimowych stosowanych jako parametry:

[1,2,3].forEach(function(el) {
    console.log(el);
});

[1,2,3].forEach(el => console.log(el));
[1,2,3].sort(function(a, b) {
    return a - b;
});

[1,2,3].sort((a,b) => a - b);
Pamiętaj, że nie musisz każdej funkcji koniecznie zamieniać na funkcję strzałkową. Są momenty, gdzie taki zapis się przydaje, ale nie znaczy to, że koniecznie musisz skracać każdą funkcję w swoim kodzie.

Twoim celem powinien być nie jak najkrótszy kod, a jak najczytelniejszy.

Wszelkie prawa zastrzeżone. Jeżeli chcesz używać jakiejś części tego kursu, skontaktuj się z autorem. Aha - i ta strona korzysta z ciasteczek.
