import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Result from "./components/Result";

function App() {
  const [newSearch, setNewSearch] = useState("");
  // const [foundCountries, setFoundCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);


  //TODO fetch the flag and display it

  
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      // console.log(response.data[0].flags.svg);
      // console.log(response.data.length);
      setAllCountries(response.data);
      // console.log(response.data)
      // setPersons(response);
    });
  }, []);

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
    // if (newSearch !== "") {
    //   setFoundCountries(
    //     allCountries.filter((country) =>
    //       country.name.common.toLowerCase().includes(newSearch.toLowerCase())
    //     )
    //   );
    // }
  };

  return (
    <div>
      <label htmlFor="filter">find countries:</label>
      <Filter value={newSearch} onChange={handleSearchChange}></Filter>
      <Result countries={allCountries} searchTerm={newSearch}></Result>
    </div>
  );
}

export default App;
