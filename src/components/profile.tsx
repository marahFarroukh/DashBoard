import React, { useRef, useState, useCallback } from "react";

const Profile: React.FC = () => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleButtonClick = useCallback(() => {
    fileInput.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
      }
    },
    []
  );

  return (
    <div>
      <button
        className="bg-profile rounded-full"
        onClick={handleButtonClick}
        style={{
          cursor: "pointer",
          border: "none",
          width: "80px",
          height: "80px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </button>
      <input
        type="file"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Profile;
