console.log('May Node be with you')

const express = require('express');

const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

app.listen(3000, function() {
    console.log('listening on 3000')
})
// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  // res.send('Hello World')
  //res.sendFile( '/Users/lisapigozzo/Documents/GitHub/workshop-site-server/index.html')

  MongoClient.connect('mongodb+srv://mongo:mongo21@cluster0.c5gks.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database GET')
    const db = client.db('test')
    db.collection('quotes').find().toArray()
    .then(results => {
     // console.log(results)
     res.render('index.ejs', { quotes: results })
    })
    .catch(error => console.error(error))
    })
  .catch(console.error)
})

// All your handlers here...

app.post('/quotes', (req, res) => {

  MongoClient.connect('mongodb+srv://mongo:mongo21@cluster0.c5gks.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database POST')
    const db = client.db('test')
    const quotesCollection = db.collection('quotes')
    quotesCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/')
    }) 
    .catch(error => console.error(error))
  })
.catch(console.error)
})

app.put('/quotes', (req, res) => {
  console.log(req.body)
  MongoClient.connect('mongodb+srv://mongo:mongo21@cluster0.c5gks.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database PUT')
    const db = client.db('test')
    const quotesCollection = db.collection('quotes')
    quotesCollection.findOneAndUpdate(
      { name: 'Yoda' },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote
        },
      },
      {
       upsert: true
      }
      )
      .then(result => {    
        console.log(result)
        res.redirect('/')
      }) 
      .catch(error => console.error(error))
    })
  .catch(console.error)
})

app.delete('/quotes', (req, res) => {
 
  console.log('Connected to Database DELETE')
  MongoClient.connect('mongodb+srv://mongo:mongo21@cluster0.c5gks.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
  
    const db = client.db('test')
    const quotesCollection = db.collection('quotes')
    quotesCollection.deleteOne(
       {name: req.body.name }
      )
    .then(result => {
      console.log(result)
      if (result.deletedCount === 0) {
        return res.json('No quote to delete')
      }
      res.redirect('/')
    })
    .catch(error => console.error(error))
  })
  .catch(console.error)
})