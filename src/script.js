
navigator.geolocation.getCurrentPosition(async position => {
    const { latitude: lat, longitude: long } = position.coords

    fetch(`/.netlify/functions/fetch-weather?lat=${lat}&long=${long}`)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
})
