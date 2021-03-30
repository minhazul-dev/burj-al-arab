const express = require('express')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
// console.log(process.env.DB_PASS);
// const bodyParser= require('body-parser')
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oysdd.mongodb.net/burjAlArab?retryWrites=true&w=majority`;

const cors = require('cors')
const port = 5000

const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const pass = "arabianhorse";


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const bookings = client.db("burjAlArab").collection("bookings");
    // perform actions on the collection object
    console.log("db connected succesfully");
    //   client.close();
    app.post('/addBooking', (req, res) => {
        const newBooking = req.body
        bookings.insertOne(newBooking)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
        console.log(bookings);
    })


    app.get('/bookings', (req, res) => {
        // console.log(req.query.email);

        bookings.find({email: req.query.email})
            .toArray((err, documents) => {
                res.send(documents)
            })

    })

})



app.get('/', (req, res) => {
    res.send('this is backend')
})

app.listen(process.env.PORT || port)