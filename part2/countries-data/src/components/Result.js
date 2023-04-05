const Result = (props) => {
  const { countries, searchTerm } = props;

  if (searchTerm === "") {
    return null;
  }

  const matchingCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log(matchingCountries)
  if (matchingCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (matchingCountries.length > 1) {
    return (
      <ul>
        {matchingCountries.map((country, index) => (
          <li key={index}>{country.name.common}</li>
        ))}
      </ul>
    );
  }

  if (matchingCountries.length === 1) {

    const imgUrl = matchingCountries[0].flags.svg;

    return (
      <div>
        <h1>{matchingCountries[0].name.common}</h1>
        <p>capital {matchingCountries[0].capital}</p>
        <p>area {matchingCountries[0].area}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(matchingCountries[0].languages).map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
        <img src={imgUrl} alt="Logo of the searched country" height="150"></img>
      </div>
    );
  }
};

export default Result;
