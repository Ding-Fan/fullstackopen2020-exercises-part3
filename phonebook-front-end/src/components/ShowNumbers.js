import React from "react";
import PersonDetail from "./PersonDetail.js";

export default function ShowNumbers({ filterText, persons, handleClick }) {
  const getShowNumbers = () => {
    let result;
    if (filterText.trim().length) {
      result = persons
        .filter((person) => person.name.match(new RegExp(filterText, "i")))
        .map((person) => {
          return (
            <PersonDetail
              handleClick={handleClick}
              key={person.name}
              person={person}
            />
          );
        });
    } else {
      result = persons.map((person) => {
        return (
          <PersonDetail
            handleClick={handleClick}
            key={person.name}
            person={person}
          />
        );
      });
    }

    return result;
  };
  return <div>{getShowNumbers()}</div>;
}
