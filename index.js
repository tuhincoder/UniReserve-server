const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId, } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


// middleware

app.use(cors())
app.use(express.json())

// collegeUniverse
// college




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tpqoiya.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const colUniverse = client.db('collegeUniverse').collection('college')
        // research
        const researchCollection = client.db('collegeUniverse').collection('research')
        // reviews
        const reviewCollection = client.db('collegeUniverse').collection('reviews')



        app.get('/read-college', async (req, res) => {
            const result = await colUniverse.find().toArray()
            res.send(result)
        })

        // -------research related data api
        app.get('/research', async (req, res) => {
            const result = await researchCollection.find().toArray()
            res.send(result)
        })

        app.get('/research/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await researchCollection.findOne(query)
            res.send(result)
        })

        app.get('/read-college/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await colUniverse.findOne(query)
            res.send(result)

        })


        app.get('/review', async (req, res) => {
            const result = await reviewCollection.find().toArray()
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('college universe running')
})

app.listen(port, () => {
    console.log(`college universe server site running ${port}`);
})