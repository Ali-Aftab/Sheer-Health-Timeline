import { useState } from "react";
import Attachments from "./Attachments";
import Messages from "./Messages";
import Bills from "./Bills";
import SupportNotes from "./SupportNotes";

const EventInfo = ({ curEvent, handleList }) => {
  const [curTab, setCurTab] = useState("");

  if (!Object.keys(curEvent).length)
    return (
      <div className="event-info">
        <p className="event-type">Select an event!</p>
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
      <p className="event-type">{event_type}</p>
      <p className="event-details">{details}</p>
      <p className="event-date">{new Date(create_time).toLocaleString()}</p>
      <div className="tab-bar">
        <button
          className={`tab-btn ${curTab === "messages" ? "tab-active" : ""}`}
          onClick={() => setCurTab("messages")}
        >
          Messages
        </button>
        <button
          className={`tab-btn ${curTab === "supportNotes" ? "tab-active" : ""}`}
          onClick={() => setCurTab("supportNotes")}
        >
          Support Notes
        </button>
        <button
          className={`tab-btn ${curTab === "attachments" ? "tab-active" : ""}`}
          onClick={() => setCurTab("attachments")}
        >
          Attachments
        </button>
        <button
          className={`tab-btn ${curTab === "bills" ? "tab-active" : ""}`}
          onClick={() => setCurTab("bills")}
        >
          Bills
        </button>
      </div>
      {curTab === "attachments" ? (
        <Attachments list={attachments} handleList={handleList} />
      ) : (
        ""
      )}
      {curTab === "messages" ? (
        <Messages list={messages} handleList={handleList} />
      ) : (
        ""
      )}
      {curTab === "bills" ? <Bills list={bills} /> : ""}
      {curTab === "supportNotes" ? <SupportNotes list={supportNotes} /> : ""}
    </div>
  );
};

export default EventInfo;
