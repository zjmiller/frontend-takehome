import React, { useState } from "react";
import "./App.css";
import { User } from "./User";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");

  const [isSelected, setIsSelected] = useState(false);

  return (
    <div style={{ margin: "16px auto" }}>
      <input
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setUsername(inputValue);
          }
        }}
        type="text"
        value={inputValue}
      />
      {username && (
        <User
          username={username}
          isSelected={isSelected}
          toggleSelectUser={() => setIsSelected(!isSelected)}
        />
      )}
    </div>
  );
}

export default App;
