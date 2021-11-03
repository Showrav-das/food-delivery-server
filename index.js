const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
var cors = require('cors')
require('dotenv').config();
const port =process.env.PORT || 4000;

app.use(cors());
app.use(express.json())
// user=food-delivery pass=OHItNKMGP1wAuA9M
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w5uf7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log("connected");
        const database = client.db("foodDelivery");
    const foodsCollection = database.collection("foods");

        // get api
        app.get('/allfoods', async (req, res) => {
            const query = {};
            const cursor = foodsCollection.find(query);
            const allFoods = await cursor.toArray();
            res.json(allFoods);
        })

        app.post('/allfoods', async (req, res) => {

            const food = req.body;
            // console.log("hit post",food);
            const result = await foodsCollection.insertOne(food);
            // res.send("kjfdksf");
            res.json(result);
            console.log(result);
        });
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log("port",port)
})