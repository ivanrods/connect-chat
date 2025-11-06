import { useEffect, useState } from "react";

export function useGetChat() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await fetch("http://localhost:3333/chat", {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();

        setMessages(data);
      } catch (err) {
        console.error(err);
      }
    };

    getMessage();
  }, []);
  return { messages };
}

export function usePostChat() {
  const postMessage = async (message) => {
    try {
      const response = await fetch("http://localhost:3333/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  return { postMessage };
}
