import { useState } from "react";

const CreateEvent = ({ createOneEvent, setCreatingEvent }) => {
  const choices = [
    "Follow-up Appointment",
    "General Checkup",
    "Diagnostic Testing",
    "Consultation",
    "Therapy Session",
  ];

  const [eventType, setEventType] = useState(choices[0]);
  const [eventDetail, setEventDetail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventType || eventDetail === "")
      return alert("Fill in an event type and write detail for it!");
    createOneEvent(eventType, eventDetail);
    setEventDetail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
        {choices.map((choice, ind) => (
          <option key={`choice${ind}`}>{choice}</option>
        ))}
      </select>
      <br />
      <textarea onChange={(e) => setEventDetail(e.target.value)} />
      <br />
      <button type="submit">Send</button>
      <button type="button" onClick={() => setCreatingEvent(false)}>
        Cancel
      </button>
    </form>
  );
};

export default CreateEvent;
