import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();
  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enteredMeetupData),
    });
    const json = await response.json();

    if (!response.ok) {
      return alert("Error!");
    }

    console.log(json);
    router.replace("/");
  };
  return (
    <>
      <h1>Meetup form page</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetupPage;
