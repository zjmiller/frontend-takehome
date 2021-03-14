import React, { useEffect, useState } from "react";
import "./App.css";
import { Followers } from "./Followers";

type RequestStatus = "PENDING" | "SUCCESS" | "ERROR" | null;

export function User({
  username,
  preloadedUser,
}: {
  username: string;
  preloadedUser?: any;
}) {
  const [user, setUser] = useState<any>(preloadedUser);
  const [userRequestStatus, setUserRequestStats] = useState<RequestStatus>();
  const [errorMsg, setErrorMsg] = useState("");
  const [isShowingFollowers, setIsShowingFollowers] = useState(false);

  useEffect(() => {
    if (preloadedUser) {
      return;
    }

    (async function () {
      setUserRequestStats("PENDING");
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        const user = await response.json();
        setUserRequestStats("SUCCESS");
        setUser(user);
      } catch (e) {
        setUserRequestStats("ERROR");
        setErrorMsg(e.message);
      }
    })();
  }, [username, preloadedUser, setUser]);

  if (userRequestStatus === "ERROR") {
    return <div style={{ color: "red" }}>{errorMsg}</div>;
  }

  if (userRequestStatus === "PENDING") {
    return <div style={{ color: "gray" }}>Loading...</div>;
  }

  if (user) {
    return (
      <div
        onClick={(e) => {
          setIsShowingFollowers(!isShowingFollowers);
          e.stopPropagation();
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "8px",
          margin: "4px 8px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            padding: "8px 0",
          }}
        >
          <img
            src={user.avatar_url}
            style={{ borderRadius: "12px", height: "24px", width: "24px" }}
          />
          <strong style={{ marginLeft: "8px" }}>{user.login}</strong>
        </div>
        <div style={{ borderLeft: "1px solid gray", marginLeft: "12px" }}>
          {isShowingFollowers && <Followers username={username} />}
        </div>
      </div>
    );
  }

  return null;
}
