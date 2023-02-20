import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
const MeetupDetailPage = (props) => {
  return (
    <>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
};

export default MeetupDetailPage;

export async function getStaticPaths() {
  //connect to db

  const client = await MongoClient.connect(
    "mongodb+srv://ranselorm:Viohqkk5bBHlIjGY@cluster0.aqjx3qb.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  console.log(meetups);
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  //fetch data from an db
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://ranselorm:Viohqkk5bBHlIjGY@cluster0.aqjx3qb.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({ _id: new 
    
    
    ObjectId(meetupId) });

  console.log(meetup);
  client.close();
  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
        image: meetup.image,
      },
    },
  };
}
