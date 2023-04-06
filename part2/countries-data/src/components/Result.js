import axios from "axios";
import { useState, useEffect } from "react";

function CountryListItem({ country }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li>
      {country.name.common}
      <button onClick={handleClick}>
        {showDetails ? "Hide" : "Show"} details
      </button>
      {showDetails && (
        <div>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <p>Area: {country.area}</p>
          <p>Languages:</p>
          <ul>
            {Object.values(country.languages).map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
          <img
            src={country.flags?.svg || ""}
            alt={`Logo of ${country.name.common}`}
            height="150"
          />
        </div>
      )}
    </li>
  );
}

const Result = ({ countries, searchTerm }) => {
  const [weather, setWeather] = useState({});
  const [weatherIcon, setWeatherIcon] = useState("");
  const [weatherIconAltText, setWeatherIconAltText] = useState("");
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (searchTerm !== "") {
      const matchingCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (matchingCountries.length === 1) {
        const { name } = matchingCountries[0];
        // const imgUrl = flags?.svg || "";

        const fetchWeather = async () => {
          const weatherInfo = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${name.common}&aqi=no`
          );

          return weatherInfo.data.current;
        };

        const getWeather = async () => {
          const weatherData = await fetchWeather();
          
          // const weatherIconUrl = weatherData.condition.icon.replace(
          //   "//cdn.weatherapi.com",
          //   "."
          // );

          const weatherIconUrl = weatherData.condition.icon;
          console.log(weatherIconUrl);

          setWeather(weatherData);
          setWeatherIcon(weatherIconUrl);
          setWeatherIconAltText(weatherData.condition.text);
        };

        getWeather();

        return () => {
          setWeather({});
          setWeatherIcon("");
          setWeatherIconAltText("");
        };

        // Ensure that `name` is defined before calling `fetchWeather` and `getWeather`
      } else if (
        matchingCountries.length === 0 ||
        matchingCountries.length > 10
      ) {
        setWeather({});
        setWeatherIcon("");
        setWeatherIconAltText("");
      }
    }
  }, [countries, searchTerm, api_key]);

  if (searchTerm === "") {
    return null;
  }

  const matchingCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (matchingCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (matchingCountries.length > 1) {
    return (
      <ul>
        {matchingCountries.map((country, index) => (
          <CountryListItem key={index} country={country} />
        ))}
      </ul>
    );
  }

  if (matchingCountries.length === 1) {
    const { name, capital, area, languages, flags } = matchingCountries[0];
    const imgUrl = flags?.svg || "";

    return (
      <div>
        <h1>{name.common}</h1>
        <p>capital {capital || "Unknown"}</p>
        <p>area {area ? `${area} km²` : "Unknown"}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(languages || {}).map((value, index) => (
            <li key={index}>{value || "Unknown"}</li>
          ))}
        </ul>
        <img src={imgUrl} alt={`Logo of ${name.common}`} height="150" />
        <h1>Weather in {capital || "the Capital"}</h1>
        <p>Temperature in Celsius: {weather.temp_c}</p>
        <img src={weatherIcon} alt={weatherIconAltText} height="100"></img>
        <p>Wind in kph: {weather.wind_kph}</p>
      </div>
    );
  }
};

export default Result;
