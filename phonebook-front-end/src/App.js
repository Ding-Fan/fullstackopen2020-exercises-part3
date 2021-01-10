import React, { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter.js";
import NewForm from "./components/NewForm.js";
import ShowNumbers from "./components/ShowNumbers.js";
import Notification from "./components/Notification.js";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
    return () => {};
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const thePerson = persons.find((n) => n.name === newName);

    const clearForm = () => {
      setNewName("");
      setNewNumber("");
    };

    // if (persons.some((person) => person.name === newName)) {

    if (thePerson) {
      // update person
      if (
        !window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        return null;
      } else {
        await personsService
          .update(thePerson.id, {
            ...thePerson,
            number: newNumber,
          })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.name !== newName ? person : returnedPerson
              )
            );
            clearForm();
            setMessage({
              content: `Updated ${returnedPerson.name}`,
              type: "info",
            });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setMessage({
              content: `the person '${thePerson.name}' does not exist!`,
              type: "error",
            });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setPersons(persons.filter((n) => n.id !== thePerson.id));
          });
      }
    } else {
      // create person
      await personsService
        .create({
          name: newName,
          number: newNumber,
        })
        .then((returnedPerson) => {
          setPersons(persons.concat([returnedPerson]));
          clearForm();
          setMessage({ content: `Added ${returnedPerson.name}`, type: "info" });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };

  const handleClick = async (person) => {
    if (!window.confirm(`Delete ${person.name} ?`)) {
      return null;
    }
    await personsService
      .remove(person.id)
      .then((returnedData) => {
        // setPersons(persons.concat([returnedPerson]));
        // setNewName("");
        // setNewNumber("");
        setMessage({
          content: `Deleted ${person.name}`,
          type: "info",
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setPersons(persons.filter((n) => n.id !== person.id));
      })
      .catch((error) => {
        setMessage({
          content: `the person '${person.name}' does not exist!`,
          type: "error",
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setPersons(persons.filter((n) => n.id !== person.id));
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <SearchFilter filterText={filterText} setFilterText={setFilterText} />
      <h2>add a new</h2>
      <NewForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <ShowNumbers
        handleClick={handleClick}
        filterText={filterText}
        persons={persons}
      />
    </div>
  );
};

export default App;
// Exercises 2.6.-2.10.
// 2.15.-2.18.
