require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }

// const password = process.argv[2]
// console.log("process argv", process.argv);
const [, , newName, newNumber] = process.argv
// console.log(
//   "🚀 ~ file: mongo.js ~ line 12 ~ newName, newNumber",
//   newName,
//   newNumber
// );
const password = process.env.DATABASE_PASSWORD
// console.log("🚀 ~ file: mongo.js ~ line 13 ~ password", password);
const dbname = 'persons'

// const url = `mongodb+srv://fullstack:${password}@cluster0.qjbux.mongodb.net/${dbname}?retryWrites=true&w=majority&ssl=true`;
// https://stackoverflow.com/a/63912290
const url = `mongodb://fullstack:${password}@cluster0-shard-00-00.qjbux.mongodb.net:27017,cluster0-shard-00-01.qjbux.mongodb.net:27017,cluster0-shard-00-02.qjbux.mongodb.net:27017/${dbname}?ssl=true&replicaSet=atlas-hgfql8-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.plugin(uniqueValidator)

const Person = mongoose.model('Person', personSchema)

if (newName && newNumber) {
  const person = new Person({
    name: newName,
    number: newNumber,
  })

  person.save().then(() => {
    console.log(`added ${newName} number ${newNumber} to phonebook `)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((person) => {
      let showPerson = `${person.name} ${person.number}`
      console.log(showPerson)
    })
    mongoose.connection.close()
  })
}
