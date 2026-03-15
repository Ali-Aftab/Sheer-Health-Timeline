import { useState } from "react";

const Attachments = ({ list, handleList }) => {
  const [fileName, setFileName] = useState("");
  const [inputKey, setInputKey] = useState(0);

  const handleFileSave = (e) => {
    setFileName(e.target.files[0].name);
  };

  const handleFileUpload = () => {
    if (!fileName) return alert("Upload a file!");
    handleList("attachment", { file_name: fileName });
    setFileName("");
    setInputKey((prev) => prev + 1);
  };

  return (
    <div className="tab-content">
      <p className="tab-title">Attachments</p>
      {list.length > 0 ? (
        list.map((attachment) => (
          <div key={attachment.attachment_id} className="tab-item">
            <p className="tab-item-text">{attachment.file_name}</p>
          </div>
        ))
      ) : (
        <p className="tab-item-label">No attachments</p>
      )}
      <input
        className="file-input"
        type="file"
        onChange={handleFileSave}
        key={inputKey}
      />
      <button className="tab-btn-submit" onClick={handleFileUpload}>
        Add File
      </button>
    </div>
  );
};

export default Attachments;
