var selectedFile;
var dataFromExcel = [];

const nameHeader = [
    'Tytul',
    'Wydawca',
    'Wiek',
    'Min ilosc graczy',
    'Max ilosc graczy',
    'Ilosc gier',
    'Czas gry',
    'Opis',
    'Typ',
    'Wlasciciel',
    'Tagi',
    'Pliki graficzne'
];

function excelToJson() {

    console.log('convert inside excelToJson');
    var fileReader = new FileReader();
    fileReader.onload = function (event) {
        var data = event.target.result;
        var workbook = XLSX.read(data, {
            type: 'binary'
        });

        let i = 0;

        var cell_address = {c:0, r:0};
        var cell_ref = XLSX.utils.encode_cell(cell_address);
        var cell = workbook.Sheets[workbook.SheetNames[0]][cell_ref];        
        console.log(cell.v);            
        

        workbook.SheetNames.forEach(sheet => {
            let rowObject = XLSX.utils.sheet_to_row_object_array(
                workbook.Sheets[sheet]
            );

            // let x = XLSX.utils.sheet_to_json( workbook.Sheets[sheet]);
            // console.log(x);

            //  bez tego tez dziala ale zle sie tablica zrobi
            for (let index = 0; index < rowObject.length; index++) {
                nameHeader.forEach(name => {
                    rowObject[index][name] = rowObject[index][name] || ' bd ';
                });
            };

            // console.log(rowObject);
            let jsonObject = JSON.stringify(rowObject);
            document.getElementById('jsonData').innerHTML += jsonObject + '<br />';
            // console.log('1 ' + jsonObject);
            myObj = JSON.parse(jsonObject);
            dataFromExcel[i] = myObj;
            i++;
        });
    }; 
    fileReader.readAsBinaryString(selectedFile);

    fileReader.onloadend = function(){
        console.log('DONE', fileReader.readyState); // readyState will be 2
        createTableFromData();
    }
    console.log("convert inside excelToJson done");
}

function createTableFromData() {
    console.log("convert inside createTableFromData ");

    let divTable = document.getElementById('board');
    let table = document.createElement('table');
    let tableBody = document.createElement('tbody');

    let tableData = dataFromExcel[0];
console.log(dataFromExcel[0]);

    for (let i = 0; i < dataFromExcel[0].length; i++) {
        var row = document.createElement("tr");

        const dataObj = dataFromExcel[0][i];

        nameHeader.forEach(data => {
            if (dataFromExcel[0][i].hasOwnProperty(data)) {
                const element = dataFromExcel[0][i][data];
                // console.log(data + " " + element);
                var cell = document.createElement("td");
                if (data == nameHeader[0]) {
                    cell.id = 'title';
                }
                var cellText = document.createTextNode(element);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
        });
        tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    divTable.appendChild(table);
};

function createSearchInputFunctionality() {
    $('#search').keyup(function () {
        var regex = new RegExp($('#search').val(), "i");
        var rows = $('table tr:gt(0)');
        rows.each(function (index) {
            title = $(this).children("#title").html()
            if (title.search(regex) != -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
}


function convertToShow() {
    console.log("convertToShow");
    excelToJson();
    // setTimeout(() => {
        // createTableFromData(); // z jakiego powodudziala to dopiero po opoznieniu
    // }, 1000);
    createSearchInputFunctionality();

    // let excelToJsonPromise = () => {
    //     return new Promise((resolve, reject) => {
    //         if (selectedFile) {

    //             resolve(excelToJson());
    //         } else {
    //             reject("Nothing to convert");
    //         }
    //     });
    // }

    // let createTableFromJsonPromise = () => {
    //     return new Promise((resolve, reject) => {

    //         resolve(createTableFromData());
    //     })
    // }



    // excelToJsonPromise()
    //     .then((response) => {
    //         alert(dataFromExcel);
    //         return createTableFromJsonPromise()

    //         setTimeout(() => {
    //         }, 100);
    //     })
    //     .then((response) => {
    //         alert(response  + ' ' + dataFromExcel);
    //         // return createSearchInputFunctionality();
    //     })
    //     .catch((response) => {
    //         alert(response);
    //     });
}



function init() {

    $("#fileUpload").change(event => {
        console.log(event);
        selectedFile = event.target.files[0];
    });

    $("#uplaodExcel").click(convertToShow);

}

$(document).ready(init);