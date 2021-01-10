import React from "react";

export default function NewForm({
  handleSubmit,
  newName,
  newNumber,
  setNewName,
  setNewNumber,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
