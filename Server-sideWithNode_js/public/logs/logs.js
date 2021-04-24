getData();
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    let i = 0;
    for (item of data) {
        const root = document.createElement('div');
        root.setAttribute("id", `${i}`);
        const geo = document.createElement('div');
        const timeDiv = document.createElement('div');
        const time = new Date(item.timestamp).toLocaleTimeString();

        geo.textContent = `geo: ${item.lat},  ${item.lon}`;
        timeDiv.textContent = ` Time: ${time}`;

        if (item.image64) {
            const image = document.createElement('img');
            image.setAttribute("id", `img${i}`);
            image.src = item.image64;
            image.style.display = "none";

            root.append(geo, timeDiv, image);

            root.addEventListener('mouseover', (event) => {
                const idx = event.target.getAttribute('id');
                const imageX = document.getElementById(`img${idx}`);
                console.log(imageX)

                image.style.display = "block";

                // console.log(`mouseover ${time}`)
            });

            root.addEventListener('mouseleave', (event) => {
                const idx = event.target.getAttribute('id');
                console.log(idx)

                const imageX = document.getElementById(`img${idx}`);
                imageX.style.display = "none";

                // console.log(`mouseleave ${time}`)
            });

        } else {
            root.append(geo, timeDiv);

        }
        document.body.append(root);
        i++;
    }
    console.log(data);
}