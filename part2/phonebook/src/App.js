import { useState, useEffect } from "react";
import axios from "axios";

const Filter = (props) => {
  const { value, onChange } = props;
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="search for a person"
    ></input>
  );
};

const PersonForm = (props) => {
  const {
    handleSubmit,
    newName,
    handleNameChange,
    newPhone,
    handlePhoneChange,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newName}
          onChange={handleNameChange}
          placeholder="Put your name here"
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={newPhone}
          onChange={handlePhoneChange}
          placeholder="Put your tel phone here"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Person = ({ person }) => {
  return (
    <li>
      {person.name} {person.phone}
    </li>
  );
};

const Persons = ({ persons, newSearch }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );

  return (
    <ul>
      {filteredPersons.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      // console.log(response)
      // console.log(response.data)
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      phone: newPhone,
      // id: persons.length + 1,
    };

    let exists = false;

    persons.forEach((person) => {
      if (person.name === newPerson.name) {
        exists = true;
      }
    });

    if (!exists) {
      axios
        .post("http://localhost:3001/persons", newPerson)
        .then((response) => {
          // console.log(response);
          const copiedPerson = {...newPerson, id: response.data.id}
          setPersons(persons.concat(copiedPerson));
          setNewName("");
          setNewPhone("");
        });
    } else {
      alert(`${newName} already exists in the book`);
    }
  };

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} onChange={handleSearchChange}></Filter>

      <h3>add a new</h3>

      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      ></PersonForm>

      <h2>phones</h2>
      <Persons persons={persons} newSearch={newSearch}></Persons>
    </div>
  );
};

export default App;
