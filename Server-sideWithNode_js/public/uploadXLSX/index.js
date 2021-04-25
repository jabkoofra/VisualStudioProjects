let dropArea = document.getElementById('drop-area')

;
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

;
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
})

;
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
})

function highlight(e) {
    dropArea.classList.add('highlight')
}

function unhighlight(e) {
    dropArea.classList.remove('highlight')
}

dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
    let dt = e.dataTransfer
    let files = dt.files

    handleFiles(files)
}

function handleFiles(files) {
    ([...files]).forEach(uploadFile)
}

function uploadFile(file) {

}

const subButton = document.getElementById('submit');

subButton.addEventListener('click', submit, false);

function submit() {
    console.log("wysylamy");
    const input = document.getElementById('filexlsx');

    console.log(input.files[0].name);

    var oReq = new XMLHttpRequest();
    oReq.open("GET", input.files[0].name, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function (e) {
        console.log("w onload");
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
        //   let  XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetNames[0]]);
        let jsonSheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonSheet)
        }

        const xlsx = fetch('/xlsx', options)
            .then(info => {
                console.log(info.status);
            })
    }
    oReq.send();
}