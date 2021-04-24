/* set up XMLHttpRequest */
var url = "ostrowplansze_low.xlsx";
var oReq = new XMLHttpRequest();

oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

oReq.onload = function (e) {
    var arraybuffer = oReq.response;

    /* convert data to binary string */
    var data = new Uint8Array(arraybuffer);
    var arr = new Array();
    for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");

    /* Call XLSX */
    var workbook = XLSX.read(bstr, {
        type: "binary"
    });

    /* DO SOMETHING WITH workbook HERE */
    const sheetNames = workbook.SheetNames;
    // console.log(workbook);

    //   let  XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetNames[0]]);
    let jsonSheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
    console.log(jsonSheet);
    
    const x = jsonSheet[0];
    var headersName = [];
    for (var i in x) {
        headersName.push(i);
    }
    /* Pobranie nagłówkow do tablicy */

    console.log(headersName);
    console.log(headersName[4]);
    console.log(x[headersName[4]]);

    // console.log(jsonSheet[0]{"Tytul"});



}

oReq.send();