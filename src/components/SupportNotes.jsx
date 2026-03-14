import React from "react";

const SupportNotes = ({ list }) => {
  return (
    <div>
      <h4>Support Notes</h4>
      {list.length > 0
        ? list.map((supportNote) => (
            <div>
              <h5>
                Note: "{supportNote.text}" created on
                {new Date(supportNote.create_time).toLocaleString()}
              </h5>
            </div>
          ))
        : ""}
    </div>
  );
};

export default SupportNotes;
