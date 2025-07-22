import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [cityName, setCityName] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");

  function IncrementCounter() {
    setCounter(counter + 20);
  }
  function DecrementCounter() {
    setCounter(counter - 10);
  }

  async function checkWeather(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://p2pclouds.up.railway.app/v1/learn/weather?city=${cityName}`
      );
      const weather = await response.json();

      const currentTemp = weather.current.temp_c;
      setWeatherInfo(`Today's temperature in ${cityName} is ${currentTemp}°C`);
    } catch (error) {
      setWeatherInfo("Failed to fetch weather data.");
      console.error("Weather API Error:", error);
    }
  }

  function onCityNameChange(e) {
    setCityName(e.target.value);
  }

  return (
    <div>
      <form onSubmit={checkWeather}>
        <input
          type="text"
          placeholder="Enter City Name"
          onChange={onCityNameChange}
          value={cityName}
        />
        <button type="submit">Check Weather</button>
      </form>

      <p id="weather">{weatherInfo}</p>

      <h1>My Name is Shahzad Bhatti</h1>
      <h3>Counter: {counter}</h3>
      <button onClick={IncrementCounter}>Increment</button>
      <button onClick={DecrementCounter}>Decrement</button>
    </div>
  );
}

export default App;
