import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const Homepage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export default Homepage;

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://ranselorm:Viohqkk5bBHlIjGY@cluster0.aqjx3qb.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}).toArray();
  console.log(meetups);
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};
