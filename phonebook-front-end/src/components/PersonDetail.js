import React from "react";

export default function PersonDetail({ person, handleClick }) {
  return (
    <div>
      {" "}
      {person.name} {person.number}{" "}
      <button onClick={() => handleClick(person)}>delete</button>
    </div>
  );
}
