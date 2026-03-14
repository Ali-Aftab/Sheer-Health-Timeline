import { useState } from "react";
import Attachments from "./Attachments";

const EventInfo = ({ curEvent, handleList }) => {
  const [curTab, setCurTab] = useState("");

  if (!Object.keys(curEvent).length)
    return (
      <div className="event-info">
        <h1>Select an event!</h1>
      </div>
    );

  const {
    event_type,
    details,
    create_time,
    messages,
    supportNotes,
    attachments,
    bills,
  } = curEvent;

  return (
    <div className="event-info">
      <h1>{event_type}</h1>
      <h2>{details}</h2>
      <h3>{new Date(create_time).toLocaleString()}</h3>
      <button onClick={() => setCurTab("messages")}>Messages</button>
      <button onClick={() => setCurTab("supportNotes")}>Support Notes</button>
      <button onClick={() => setCurTab("attachments")}>Attachments</button>
      <button onClick={() => setCurTab("bills")}>Bills</button>

      {curTab === "attachments" ? (
        <Attachments list={attachments} handleList={handleList} />
      ) : (
        ""
      )}
    </div>
  );
};

export default EventInfo;
