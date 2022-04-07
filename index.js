window.addEventListener("load", () => {
  let long;
  let lat;
  const temperatureDescription = document.querySelector(".temperature--description");
  const temperatureDegree = document.querySelector(".temperature--degree");
  const locationTimezone = document.querySelector(".location--timezone");
  const temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");
  const iconEle = document.querySelector(".icon");


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat}, ${long}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data)
            const {icon, summary, temperature} = data.currently;
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;
            setIcons(icon, iconEle);
            // iconEle.addEventListener('click', playpause);
            let celsius = (temperature - 32) * (5/9);
            temperatureSection.addEventListener('click', () => {
                if(temperatureSpan.textContent === "F") {
                    temperatureSpan.textContent = "C"
                    temperatureDegree.textContent = celsius.toFixed(2);
                } else {
                    temperatureSpan.textContent = "F"
                    temperatureDegree.textContent = temperature;
                }
            })
        });
    });
  }


  //Adding Skycons to DOM
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon])
  }
});
