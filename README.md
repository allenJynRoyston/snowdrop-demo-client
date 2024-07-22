## TL;DR
[Live version here](https://allenjynroy-snowdrop-app.deno.dev)
<br>
[Server is live here](https://snowdrop-test-server.onrender.com)


## Running locally
Super simple.  First, clone this repo.  

```bash
git clone https://github.com/allenJynRoyston/snowdrop-demo-client.git
```

Next, install dependencies.  There's not a ton so it should be quick.

```bash
npm install
# or even better
pnpm install
```

```bash
npm run dev
```

🎉 Tada! 🎉

Open [http://localhost:3000](http://localhost:3000) with your browser to bask in all its glory.


## Build it
Easy-peasy, one-two-,uh, npm run build-y.

```bash
npm run build
# or even better
npm run start
```

## Test it
There's no testing.  I'm only one man.  One ridicously good looking and *humble* man, but one man nonetheless.


## Wait, what about the server?  Where's this data coming from?
The sever lives in its own repo and is deployed to a render site.  This is done to prevent and CORS while developing and ensures 
it'll work everywhere (dev/live environment).  The repo is private because it has username/passwords in it to access the database, but
the code is quite simple as it's just a means to return some data.  Quite simply, it looks like this

```bash
import express from 'express';
import fs from 'fs';
import cors from 'cors'
import { MongoClient, ServerApiVersion } from 'mongodb';


// Load MongoDB credentials from a JSON file
// ** I would never include sensitive information like files (i.e. username/password); this is ONLY for the demo
const {username, password} = JSON.parse(fs.readFileSync('./secrets.json', 'utf8'));

// Initialize Express application
const app = express();
const port = process.env.PORT || 3000

// MongoDB client and options 
const client = new MongoClient(`mongodb+srv://${username}:${password}@demodb.68uhv6d.mongodb.net/?retryWrites=true&w=majority&appName=demoDB`, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// Connection function
async function connectToMongoDB() {
  try {
    await client.connect();
    await client.db("demo").command({ ping: 1 });
    console.warn("Connected to MongoDB.");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// allow cross origin requests
app.use(cors())


// Express routes
app.get('/', (_, res) => {
  res.json({ status: 'Server is functioning.' });
});

app.get('/transactions', async (req, res) => {
  try {
    const transactions = await client.db("demo").collection('transactions').find().toArray();
    res.json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).send('Error fetching transactions');
  }
});


// Start the Express server and connect to MongoDB
app.listen(port, async () => {
  console.warn(`Server is running at http://localhost:${port}`);
  await connectToMongoDB();
});
```

As you can tell, there's only one endpoint.  
https://snowdrop-test-server.onrender.com/transactions

I meant to expand this a bit but I think this is enough for a proof of concept.

## Any questions?
Hit me up you got the deets.


## Now hire me!
Show me that 💸, 🍯.
