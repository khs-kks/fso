import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "0888-415-990" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, phone: newPhone };
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

  return (
    <div>
      <h2>Phonebook</h2>
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
            placeholder="Put your tel number here"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name} {person.phone}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
