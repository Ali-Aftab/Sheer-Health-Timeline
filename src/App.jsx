import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const [accountID, setAccountID] = useState(
    "17c5ab27-a3ab-49c1-a5ba-611613769549",
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [events, setEvents] = useState([]);
  const [curEvent, setCurEvent] = useState({});
  const [scenario, setScenario] = useState("");

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

      const eventList = events.map((oneEvent) => ({
        ...oneEvent,
        messages: filteredMessages.filter(
          (message) => message.event_id === oneEvent.event_id,
        ),
        supportNotes: filteredSupportNotes.filter(
          (note) => note.event_id === oneEvent.event_id,
        ),
        attachments: filteredAttachments.filter(
          (attachment) => attachment.event_id === oneEvent.event_id,
        ),
        bills: filteredBills.filter(
          (bill) => bill.event_id === oneEvent.event_id,
        ),
      }));
      setEvents(eventList);

      const { first_name, last_name } = curAccount;
      setFirstName(first_name);
      setLastName(last_name);
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
    <div className="app">
      <Header />
      <div className="main">
        <Sidebar events={events} setCurEvent={setCurEvent} />
        <div className="detail">
          {Object.keys(curEvent).length ? (
            <>
              <button onClick={() => setScenario("messages")}>Messages</button>
              <button onClick={() => setScenario("supportNotes")}>
                Support Notes
              </button>
              <button onClick={() => setScenario("attachments")}>
                Attachments
              </button>
              <button onClick={() => setScenario("bills")}>Bills</button>
            </>
          ) : (
            <h1>Select an event!</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
