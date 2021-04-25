// /* set up XMLHttpRequest */
// var url = "ostrowplansze_low.xlsx";
// var oReq = new XMLHttpRequest();

// oReq.open("GET", url, true);
// oReq.responseType = "arraybuffer";

function cleanRow(object) {

    for (let idx = 0; idx < object.childElementCount; idx++) {

        // if (object.deleteRow(idx) === TypeError) {
        //     console.log("deleteCell")

        //     object.deleteCell(idx);

        // } else if (object.deleteCell(idx)=== TypeError) {
        //     console.log("deleteRow")

        object.deleteRow(idx)

        // } else {
        //     console.log("coś innego")
        // }

    }
}

// oReq.onload = function (e) {
//     var arraybuffer = oReq.response;

//     /* convert data to binary string */
//     var data = new Uint8Array(arraybuffer);
//     var arr = new Array();
//     for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
//     var bstr = arr.join("");

//     /* Call XLSX */
//     var workbook = XLSX.read(bstr, {
//         type: "binary"
//     });

//     /* DO SOMETHING WITH workbook HERE */
//     const sheetNames = workbook.SheetNames;
//     // console.log(workbook);

//     //   let  XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetNames[0]]);
//     let jsonSheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
//     // console.log(jsonSheet);

//     /* Pobranie nagłówkow do tablicy */
//     var headersName = [];
//     for (var i in jsonSheet[0]) {
//         headersName.push(i);
//     }
//     var headersNametoClass = []
//     headersName.forEach(name => {
//         const n = name.replaceAll(' ', '');
//         headersNametoClass.push(n);
//     })

//     /* Ustawienei nagłówkow w tablicy */
//     const tHeadElem = document.getElementById('headTable');
//     const daneGiertbody = document.getElementById('daneGier');

//     cleanRow(tHeadElem);
//     cleanRow(daneGiertbody);

//     // for (let idx = 0; idx < headTR.childElementCount; idx++) {
//     //     headTR.deleteCell(idx)
//     // }
//     // for (let idx = 0; idx < daneGiertbody.childElementCount; idx++) {
//     //     daneGiertbody.deleteRow(idx)
//     // }

//     const trHead = document.createElement('tr');
//     for (let idx = 0; idx < headersName.length; idx++) {
//         console.log(headersName)
//         const th = document.createElement('th')
//         th.className = headersNametoClass[idx];
//         // th.textContent = item;
//         th.innerText = headersName[idx];
//         trHead.append(th);
//     }
//     tHeadElem.append(trHead);


//     for (fullData of jsonSheet) {
//         const tr = document.createElement('tr');
//         for (var i = 0; i < headersName.length; i++) {
//             const td = document.createElement('td');
//             if (fullData[headersName[i]]) {
//                 td.innerText = fullData[headersName[i]];
//             } else {
//                 td.innerText = 'b/d'
//             }
//             td.className = headersNametoClass[i];
//             tr.appendChild(td);
//         }
//         daneGiertbody.appendChild(tr);

//     }

//     // console.log(headersName);
//     // console.log(headersName[4]);
//     // console.log(jsonSheet[0][headersName[4]]);



// }

// oReq.send();

getData();
async function getData(){
    const response = await fetch('/xlsx');
    const data = await response.json();
    console.log(data);

    let jsonSheet = data;
    console.log(jsonSheet);

    /* Pobranie nagłówkow do tablicy */
    var headersName = [];
    for (var i in jsonSheet[0]) {
        headersName.push(i);
    }
    var headersNametoClass = []
    headersName.forEach(name => {
        const n = name.replaceAll(' ', '');
        headersNametoClass.push(n);
    })

    const tHeadElem = document.getElementById('headTable');
    const daneGiertbody = document.getElementById('daneGier');

    cleanRow(tHeadElem);
    cleanRow(daneGiertbody);

    const trHead = document.createElement('tr');
    for (let idx = 0; idx < headersName.length; idx++) {
        console.log(headersName)
        const th = document.createElement('th')
        th.className = headersNametoClass[idx];
        // th.textContent = item;
        th.innerText = headersName[idx];
        trHead.append(th);
    }
    tHeadElem.append(trHead);


    for (fullData of jsonSheet) {
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