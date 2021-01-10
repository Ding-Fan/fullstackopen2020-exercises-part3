const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "asdfas",
    number: "234234",
    id: 6,
  },
  {
    name: "asddfsdsf",
    number: "23234234",
    id: 7,
  },
  {
    name: "asd",
    number: "234234",
    id: 10,
  },
  {
    name: "aasdfsadf",
    number: "23234",
    id: 11,
  },
  {
    name: "sadasd",
    number: "22332443",
    id: 12,
  },
  {
    name: "asdaf",
    number: "234234",
    id: 13,
  },
];

// middlewares
app.use(express.json()); // for parsing application/json
app.use(cors());
morgan.token("content", function getContent(request) {
  //   console.log("🚀 ~ file: index.js ~ line 62 ~ getId ~ request", request.body);

  return JSON.stringify(request.body);
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
);
app.use(express.static("build"));

// routes
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

const generateId = () => {
  //   const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  //   return maxId + 1;

  return Math.floor(Math.random() * 100000000);
};

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  const thePerson = persons.find((n) => n.name === name);

  if (thePerson) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const person = {
    id: generateId(),
    name,
    number,
  };

  persons = persons.concat(person);

  response.json(person);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    persons = persons.filter((item) => item.id !== id);
    response.json(`Deleted ${person.name}`);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  let content = null;
  content = `<div>Phonebook has info for ${
    persons.length
  } people</div><br /><div>${new Date()}</div>`;
  response.send(content);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Exercises 3.1.-3.6.
// Exercises 3.7.-3.8.
// Exercises 3.9.-3.11.
