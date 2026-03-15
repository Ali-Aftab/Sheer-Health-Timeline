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
    <div className="event-info">
      <p className="event-type">Create a New Event!</p>
      <form className="create-event-form" onSubmit={handleSubmit}>
        <select
          className="tab-input"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          {choices.map((choice, ind) => (
            <option key={`choice${ind}`}>{choice}</option>
          ))}
        </select>
        <textarea
          className="tab-input create-event-textarea"
          onChange={(e) => setEventDetail(e.target.value)}
          placeholder="Event details..."
        />
        <div className="create-event-actions">
          <button className="tab-btn-submit" type="submit">
            Create
          </button>
          <button
            className="tab-btn-cancel"
            type="button"
            onClick={() => setCreatingEvent(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
