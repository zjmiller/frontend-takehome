import React, { useEffect, useState } from "react";
import "./App.css";
import { User } from "./User";

type RequestStatus = "PENDING" | "SUCCESS" | "ERROR" | null;

export function Followers({ username }: { username: string }) {
  const [followers, setFollowers] = useState<any>();
  const [userRequestStatus, setUserRequestStats] = useState<RequestStatus>();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async function () {
      setUserRequestStats("PENDING");
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/followers`
        );
        const followers = await response.json();
        setUserRequestStats("SUCCESS");
        setFollowers(followers);
      } catch (e) {
        setUserRequestStats("ERROR");
        setErrorMsg(e.message);
      }
    })();
  }, [username, setFollowers]);

  if (userRequestStatus === "ERROR") {
    return <div style={{ color: "red" }}>{errorMsg}</div>;
  }

  if (userRequestStatus === "PENDING") {
    return <div style={{ color: "gray" }}>Loading...</div>;
  }

  if (followers) {
    return (
      <div
        style={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {followers.map((follower: any) => (
          <User username={follower.login} key={follower.login} />
        ))}
      </div>
    );
  }

  return null;
}
