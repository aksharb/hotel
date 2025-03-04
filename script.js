document.addEventListener("DOMContentLoaded", function () {
  // OpenWeather API key and city (API city ignored for display)
  const apiKey = "a01b6969e950385f704e9f2ee26612a2"
  const city = "Gangani, IN"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .then((data) => {
      const weatherDiv = document.getElementById("weather")
      const temperature = data.main.temp
      const description = data.weather[0].description
      // Use OpenWeather's PNG icons via the "icon" field
      const iconCode = data.weather[0].icon
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

      // Update weather: "Hotel Pinewood" as a prominent label, then a horizontal row with temperature and icon
      weatherDiv.innerHTML = `
        <span class="hotel-name">Hotel Pinewood</span>
        <div class="temp-info">
          <span class="temperature">${temperature}°C</span>
          <img src="${iconUrl}" alt="${description}" class="weather-icon" />
        </div>
      `
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error)
      document.getElementById("weather").innerHTML =
        "Unable to fetch weather data."
    })

  // Hamburger menu toggle functionality
  const hamburgerMenu = document.querySelector(".hamburger-menu")
  const mobileMenu = document.getElementById("mobile-menu")

  // Toggle the mobile menu when hamburger is clicked
  hamburgerMenu.addEventListener("click", function (event) {
    event.stopPropagation()
    mobileMenu.classList.toggle("active")
  })

  // Close the mobile menu if the user clicks outside it
  document.addEventListener("click", function (event) {
    if (
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(event.target) &&
      !hamburgerMenu.contains(event.target)
    ) {
      mobileMenu.classList.remove("active")
    }
  })
})
