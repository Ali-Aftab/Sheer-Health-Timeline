import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import EventInfo from "./components/EventInfo";

function App() {
  const [accountID, setAccountID] = useState(
    "17c5ab27-a3ab-49c1-a5ba-611613769549",
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [events, setEvents] = useState([]);
  const [curEventId, setCurEventId] = useState(null);
  const curEvent = events.find((ev) => ev.event_id === curEventId) || {};

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

      const filteredMessages = messages.filter(filterByAccount);
      const filteredSupportNotes = support_notes.filter(filterByAccount);
      const filteredAttachments = attachments.filter(filterByAccount);
      const filteredBills = bill.filter(filterByAccount);

      const filterAndSortEvents = (arr, id) => {
        return arr
          .filter((el) => el.event_id === id)
          .sort((a, b) => new Date(a.create_time) - new Date(b.create_time));
      };

      const eventList = events
        .filter(filterByAccount)
        .map((oneEvent) => ({
          ...oneEvent,
          messages: filterAndSortEvents(filteredMessages, oneEvent.event_id),
          supportNotes: filterAndSortEvents(
            filteredSupportNotes,
            oneEvent.event_id,
          ),
          attachments: filterAndSortEvents(
            filteredAttachments,
            oneEvent.event_id,
          ),
          bills: filterAndSortEvents(filteredBills, oneEvent.event_id),
        }))
        .sort((a, b) => new Date(b.create_time) - new Date(a.create_time));
      setEvents(eventList);

      const { first_name, last_name } = curAccount;
      setFirstName(first_name);
      setLastName(last_name);
    } catch (error) {
      alert(error);
    }
  };

  const handleList = (scenario, options) => {
    const { event_id, account_id } = curEvent;
    const obj = {
      ...options,
      event_id,
      account_id,
      create_time: new Date().toISOString(),
      [`${scenario}_id`]: crypto.randomUUID(),
    };

    setEvents((prev) =>
      prev.map((el) =>
        el.event_id === event_id
          ? { ...el, [`${scenario}s`]: [...el[`${scenario}s`], obj] }
          : el,
      ),
    );
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
        <Sidebar events={events} setCurEventId={setCurEventId} />
        <EventInfo curEvent={curEvent} handleList={handleList} />
      </div>
    </div>
  );
}

export default App;
