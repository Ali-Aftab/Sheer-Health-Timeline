const Sidebar = ({ events, setCurEvent }) => {
  return (
    <div className="sidebar">
      {events.length === 0 ? (
        <h1>No Events found for this account!</h1>
      ) : (
        <>
          {events.map((el) => (
            <div key={el.event_id} className="event-card">
              <button onClick={() => setCurEvent(el)}>
                <span>{el.event_type}</span>
                <span>{new Date(el.create_time).toLocaleString()}</span>
                <span>{el.details.slice(0, 20) + "..."}</span>
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Sidebar;
