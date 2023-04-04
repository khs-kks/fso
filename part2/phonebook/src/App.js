import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

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

const Person = ({ person, handleDelete }) => {
  return (
    <li>
      {person.name} {person.phone}{" "}
      <button onClick={() => handleDelete(person.id)}> delete </button>
    </li>
  );
};

const Persons = ({ persons, newSearch, handleDelete }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );

  return (
    <ul>
      {filteredPersons.map((person) => (
        <Person key={person.id} person={person} handleDelete={handleDelete} />
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
    personService.getAll().then((response) => {
      // console.log(response)
      // console.log(response.data)
      setPersons(response);
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

    // let exists = false;

    // persons.forEach((person) => {
    //   if (person.name === newPerson.name) {
    //     exists = true;
    //   }
    // });

    const index = persons.findIndex((person) => person.name === newPerson.name);

    if (index === -1) {
      personService.create(newPerson).then((response) => {
        const copiedPerson = { ...newPerson, id: response.id };
        setPersons(persons.concat(copiedPerson));
        setNewName("");
        setNewPhone("");
      });
    } else if (
      window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const updatePerson = async (id, newObject) => {
        const updatedPerson = await personService.update(id, newObject);
        console.log(updatedPerson);
        setPersons((prevPersons) =>
          prevPersons.map((person) =>
            person.id === id ? updatedPerson : person
          )
        );
      };

      updatePerson(persons[index].id, newPerson);
    }
  };

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const removePerson = async (id) => {
        try {
          await personService.remove(id);
          setPersons((persons) => persons.filter((person) => person.id !== id));
        } catch (error) {}
      };

      removePerson(id);

      // personService.remove(id);
      // setPersons(persons.filter((person) => person.id !== id));
    }
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
      <Persons
        persons={persons}
        newSearch={newSearch}
        handleDelete={handleDelete}
      ></Persons>
    </div>
  );
};

export default App;
