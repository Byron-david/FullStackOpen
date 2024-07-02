const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://admin:${password}@cluster0.jiaaegq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

notes = [
    {
      content: "HTML is easy",
      important: true
    },
    {
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)


// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// const note = new Note({
//   content: "Browser can execute only JavaScript",
//   important: false,
// })

const note = new Note({
  content: "GET and POST are the most important methods of HTTP protocol",
  important: false,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })