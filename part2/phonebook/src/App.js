import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setNewSearch] = useState("");

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
      id: persons.length + 1,
    };

    let exists = false;

    persons.forEach((person) => {
      if (person.name === newPerson.name) {
        exists = true;
      }
    });

    if (!exists) {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewPhone("");
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
      <input
        type="text"
        value={newSearch}
        onChange={handleSearchChange}
        placeholder="search for a person"
      ></input>
      <h2>add a new</h2>
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
      <h2>phones</h2>
      <ul>
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(newSearch.toLowerCase())
          )
          .map((person) => (
            <li key={person.id}>
              {person.name} {person.phone}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
