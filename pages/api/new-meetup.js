import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

// async function handler(req, res) {
//   if (req.method === "POST") {
//     const data = req.body;

//     const client = await MongoClient.connect(
//       "mongodb+srv://ranselorm:Viohqkk5bBHlIjGY@cluster0.aqjx3qb.mongodb.net/meetups?retryWrites=true&w=majority"
//     );
//     const db = client.db();

//     const meetupsCollection = db.collection("meetups");

//     const result = await meetupsCollection.insertOne(data);

//     console.log(result);

//     client.close();

//     res.status(201).json({ message: "Meetup inserted!" });
//   }
// }

// export default handler;

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const MongoURI =
      "mongodb+srv://ranselorm:Viohqkk5bBHlIjGY@cluster0.aqjx3qb.mongodb.net/meetups?retryWrites=true&w=majority";
    const client = await MongoClient.connect(MongoURI);

    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const meetup = await meetupsCollection.insertOne(data);

    console.log(meetup);

    client.close();
    res.status(201).json({ meetup });
  }
}

export default handler;
