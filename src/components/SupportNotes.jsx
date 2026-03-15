const SupportNotes = ({ list }) => {
  return (
    <div className="tab-content">
      <p className="tab-title">Support Notes</p>
      {list.length > 0 ? (
        list.map((supportNote) => (
          <div key={supportNote.note_id} className="tab-item">
            <p className="tab-item-text">{supportNote.text}</p>
            <p className="tab-item-label">
              {new Date(supportNote.create_time).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p className="tab-item-label">No support notes</p>
      )}
    </div>
  );
};

export default SupportNotes;
