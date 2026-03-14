import { useState } from "react";

const Attachments = ({ list, handleList }) => {
  const [fileName, setFileName] = useState("");
  const [inputKey, setInputKey] = useState(0);
  console.log(list);

  const handleFileSave = (e) => {
    setFileName(e.target.files[0].name);
  };

  const handleFileUpload = (e) => {
    if (!fileName) return alert("Upload a file!");
    handleList("attachment", { file_name: fileName });
    setFileName("");
    setInputKey((prev) => prev + 1);
  };

  return (
    <div>
      <h4>Attachments</h4>
      {list.length > 0
        ? list.map((attachment) => (
            <div key={attachment.attachment_id}>
              <h6>File Name: {attachment.file_name}</h6>
            </div>
          ))
        : ""}

      <br />
      <h4>Upload a file</h4>
      <input type="file" onChange={handleFileSave} key={inputKey} />
      <br />
      <button onClick={handleFileUpload}>Add File</button>
    </div>
  );
};

export default Attachments;
