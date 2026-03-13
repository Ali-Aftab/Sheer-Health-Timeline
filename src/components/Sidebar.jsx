const Sidebar = ({ events, setCurEvent }) => {
  return (
    <div className="sidebar">
      {events.length === 0 ? (
        <h1>No Events found for this account!</h1>
      ) : (
        <>
          {events.map((el) => (
            <div key={el.event_id} className="event-card">
              <button onClick={() => setCurEvent(el)}>{el.event_type}</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Sidebar;
