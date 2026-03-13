import { useState } from "react";

const EventInfo = ({ curEvent }) => {
  if (Object.keys(curEvent).length)
    return (
      <div className="event-info">
        <h1>Select an event!</h1>
      </div>
    );

  const [curTab, setCurTab] = useState("");

  return (
    <div className="event-info">
      <button onClick={() => setCurTab("messages")}>Messages</button>
      <button onClick={() => setCurTab("supportNotes")}>Support Notes</button>
      <button onClick={() => setCurTab("attachments")}>Attachments</button>
      <button onClick={() => setCurTab("bills")}>Bills</button>
    </div>
  );
};

export default EventInfo;
