function setup() {

    function onCaptured(imageUri) {
        console.log(imageUri);
      }

    noCanvas();
    const video = createCapture(VIDEO);
    video.size(320, 240);

    let lat, lon;

    const button = document.getElementById('submit');
    button.addEventListener('click', async event => {
        const vegetable = document.getElementById('vegetable').value;
        video.loadPixels();

        // var capturing = browser.tabs.captureTab();
        // capturing.then(onCaptured, onError);

        const image64 = video.canvas.toDataURL();

        const data = {
            lat,
            lon,
            vegetable,
            image64
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const responseApi = await fetch('/api', options)
        // .then(response =>{
        //     console.log(response.status);
        // });
        /* bez async i await jeżeli chcemy sprawdzić status 200 czyli prawidłowo wyslanej informacji  */
        const json = responseApi.json();
        console.log(json);



    });

    if ('geolocation' in navigator) {
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(async position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = lon;
        })

    } else {
        console.log(' geolocation IS NOT available ');
    }



   
}

//   function draw() {
//     background(220);
//   }