// const time = 1000;
// const i = time/100;
// let timeCount = 0;
// const progressBar = document.getElementById("p");
// progressBar.max = time;


// setTimeout(() => {
//     const intervalID = setInterval(() => {
//         progressBar.value = timeCount;
//         // if (timeCount == time)
//             console.log(timeCount);
//         timeCount += i;
//     }, i);

//     setTimeout(() => {
//         getData();
//     }, time);

// }, 100);


setTimeout(() => {
    getData();
    loadSearch()
}, 100);



async function getData() {
    const response = await fetch('/xlsx');
    const jsonSheet = await response.json();
    console.log(jsonSheet);

    /* Pobranie nagłówkow do tablicy */
    const headersName = headersNameF(jsonSheet, 0);

    /* Usuwanie spacji z nagłówkow do tablicy aby pozniej stworzyc
     z nich klasy do tablicy*/
    const headersNametoClass = headersNametoClassF(headersName);

    /* pobranie info o tablicy */
    const tHeadElem = document.getElementById('headTable');
    const daneGiertbody = document.getElementById('daneGier');
    /* wyczyszczenie starej tablicy*/
    cleanRow(tHeadElem);
    cleanRow(daneGiertbody);
    /*  tworzenie nagłówka tablicy */
    const trHead = document.createElement('tr');
    for (let idx = 0; idx < headersName.length; idx++) {
        // console.log(headersName)
        const th = document.createElement('th')
        th.className = headersNametoClass[idx];
        th.innerText = headersName[idx];
        // th.textContent =  headersName[idx]; // to samo co wyzej
        trHead.append(th);
    }
    tHeadElem.append(trHead); // 

    /* stworzenie uzupełnionej tablicy */
    for (const fullData of jsonSheet) {
        const tr = document.createElement('tr');
        for (var i = 0; i < headersName.length; i++) {
            const td = document.createElement('td');
            if (fullData[headersName[i]]) {
                td.innerText = fullData[headersName[i]];
            } else {
                td.innerText = 'b/d'
            }
            td.className = headersNametoClass[i];
            tr.appendChild(td);
        }
        daneGiertbody.appendChild(tr);
    }
}


function headersNametoClassF(headersName) {
    let headersNametoClass = [];
    headersName.forEach(name => {
        const n = name.replaceAll(' ', '');
        headersNametoClass.push(n);
    })
    return headersNametoClass;
}

function headersNameF(jsonSheet, sheetIdx) {
    let hs = [];
    for (var i in jsonSheet[sheetIdx]) {
        hs.push(i);
        // for..in do wyświetalnia wszystkiego w obiekcie
/** const object = { a: 1, b: 2, c: 3 };
for (const property in object) {
  console.log(`${property}: ${object[property]}`);
}
 */

    }
    return hs;
}
/* */
function cleanRow(object) {

    for (let idx = 0; idx < object.childElementCount; idx++) {


        object.deleteRow(idx)

    }
}

function loadSearch() {

    const search = document.getElementById('searchValue');
    search.addEventListener('input', (e) => {
        // console.log(e);
        // console.log(search.value);
        const firstTR = document.getElementById('daneGier').children[0];

        if (search.value.length == 0) {
            showAllTR(firstTR);
        } else {
            checkTrClassName(firstTR, search.value)
        }
    }, false);
}



function checkTrClassName(TR, searchValue) {
    if (TR !== null) {
        const trClassList = TR.classList;

        // if (trClassList.length == 0) {
        //     searchImputValue(TR, searchValue);
        // } else {
        //     let hide = false;
        //     trClassList.forEach(className => {
        //         if (className == "hide") {
        //             hide = true;
        //         }
        //     })
        //     if (!hide) {
        searchImputValue(TR, searchValue);
        //     }
        // }
        checkTrClassName(TR.nextSibling, searchValue)
    }
}


function searchImputValue(TR, searchValue) {

    const regexpAll = new RegExp(`(${searchValue})`, 'gi');
    const matchAll = TR.firstChild.innerText.match(regexpAll);
    let hide = false;

    if (matchAll == null) {
        for (let i = 0; i < searchValue.length; i++) {
            const regexpSingle = new RegExp(`[${searchValue[i]}]`, 'gi');
            const matchSingle = TR.firstChild.innerText.match(regexpSingle);
            if (matchSingle == null) {
                hide = true;
            }
        }
    } else {
        if (searchValue.length > 2) {
            fontWeightAdd(TR);
        } else {
            fontWeightRemove(TR);
        }
    }

    if (hide) {
        hideTR(TR)
    } else {
        showTR(TR);
    }
}

function hideTR(TR) {
    // TR.classList.toggle("hide");
    TR.classList.add("hide");
}

function showTR(TR) {
    // TR.classList.toggle("hide");
    TR.classList.remove("hide");
}

function showAllTR(firstTR) {
    if (firstTR !== null) {
        showTR(firstTR);
        showAllTR(firstTR.nextSibling);
    }
}

function fontWeightAdd(TR) {
    // TR.classList.toggle("hide");
    TR.classList.add("font_weight");
}

function fontWeightRemove(TR) {
    // TR.classList.toggle("hide");
    TR.classList.remove("font_weight");
}