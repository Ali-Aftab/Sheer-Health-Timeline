const Sidebar = ({ events, curEventId, setCurEventId, setCreatingEvent }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span>Events</span>
        <button
          className="new-event-btn"
          onClick={() => setCreatingEvent(true)}
        >
          + New Event
        </button>
      </div>
      {events.length === 0 ? (
        <h1>No Events found for this account!</h1>
      ) : (
        <>
          {events.map((el) => (
            <div
              key={el.event_id}
              className={`event-card ${curEventId === el.event_id ? "event-card-active" : ""}`}
            >
              <button
                onClick={() => {
                  setCurEventId(el.event_id);
                  setCreatingEvent(false);
                }}
              >
                <span>{el.event_type}</span>
                <span>{el.details.slice(0, 40) + "..."}</span>
                <span>{new Date(el.create_time).toLocaleString()}</span>
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Sidebar;
