import { useState } from "react";

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
      </div>
    );
  }
};

export default Result;
