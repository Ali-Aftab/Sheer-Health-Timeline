import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [accountID, setAccountID] = useState(
    "17c5ab27-a3ab-49c1-a5ba-611613769549",
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [events, setEvents] = useState([]);

  const filterByAccount = (el) => el.account_id === accountID;

  const getAccountData = async () => {
    try {
      const res = await fetch("./data.json");
      if (!res.ok) {
        throw new Error(`Cant get patient data: ${res.status}`);
      }

      const { accounts, events, messages, support_notes, attachments, bill } =
        await res.json();

      const curAccount = accounts.find((el) => el.account_id === accountID);
      if (!curAccount) {
        throw new Error("Account Not Found");
      }

      const filteredEvents = events.filter(filterByAccount);
      setEvents(filteredEvents);

      const filteredMessages = messages.filter(filterByAccount);
      const filteredSupportNotes = support_notes.filter(filterByAccount);
      const filteredAttachments = attachments.filter(filterByAccount);
      const filteredBills = bill.filter(filterByAccount);

      events.forEach((oneEvent) => {
        const { event_id } = oneEvent;
        oneEvent.messages = filteredMessages.filter(
          (el) => el.event_id === event_id,
        );
        oneEvent.supportNotes = filteredSupportNotes.filter(
          (el) => el.event_id === event_id,
        );
        oneEvent.attachments = filteredAttachments.filter(
          (el) => el.event_id === event_id,
        );
        oneEvent.bills = filteredBills.filter((el) => el.event_id === event_id);
      });

      setEvents(events);

      const { first_name, last_name } = curAccount;
      setFirstName(first_name);
      setLastName(last_name);

      console.log(events);
    } catch (error) {
      alert(error);
    }
  };

  const getEventData = async () => {
    const res = await fetch("./data.json");
    if (!res.ok) {
      throw new Error(`Cant get patient data: ${res.status}`);
    }

    const { messages, support_notes, attachments, bill } = await res.json();
  };

  useEffect(() => {
    getAccountData();
  }, []);

  return (
    <>
      <h1>Sheer Health Timeline</h1>

      {events.length === 0 ? (
        <h1>No Events found for this account!</h1>
      ) : (
        <ul>
          {events.map((el) => (
            <li key={el.event_id}>
              <button>{el.event_type}</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
