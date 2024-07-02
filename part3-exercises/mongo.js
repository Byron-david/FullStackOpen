const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://admin:${password}@cluster0.jiaaegq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const inputName = process.argv[3]
const inputNumber = process.argv[4]

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

console.log(process.argv)
console.log(process.argv.length)
if (process.argv.length > 3 ) {
  const person = new Person({
    name: inputName,
    number: inputNumber,
  })

  person.save().then(result => {
    console.log(`added ${inputName} ${inputNumber} to phonebook`)
    mongoose.connection.close()
  })
}

else {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
