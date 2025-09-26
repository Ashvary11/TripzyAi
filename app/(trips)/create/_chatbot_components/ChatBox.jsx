"use client";
import { RefreshCw } from "lucide-react";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader, Send } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import EmptyBoxState from "./EmptyBoxState";
import GroupSize from "./GroupSize";
import BudgetUi from "./BudgetUi";
import SelectDayUi from "./SelectDayUi";
import FinalTripUi from "./FinalTripUi";
import { useTrip } from "@/app/(trips)/TripContext";
import { useSearchParams } from "next/navigation";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [tripDetail, setTripDetails] = useState(null);

  const { setTrip } = useTrip();
  const messagesEndRef = useRef(null);
  const searchParams = useSearchParams();
  const title = searchParams.get("title") ?? "";

  useEffect(() => {
    let storedId = localStorage.getItem("trip_session_id");
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem("trip_session_id", storedId);
    }
    setSessionId(storedId);
    setUserInput(title);
  }, [title]);

  useEffect(() => {
    if (messagesEndRef.current) {
      // messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;

      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const onSend = useCallback(
    async (inputText) => {
      // const textToSend = inputText ?? userInput;
      // Ensure textToSend is always a string
      const textToSend = (
        typeof inputText === "string" ? inputText : userInput ?? ""
      ).toString();

      if (!textToSend?.trim() || !sessionId) return;

      const newMessage = { role: "user", content: textToSend };
      setMessages((pre) => [...pre, newMessage]);
      setLoading(true);
      setUserInput("");

      try {
        const result = await axios.post("/api/ai", {
          messages: [...messages, newMessage],
          sessionId,
          isFinal,
        });
        // console.log("/api/ai: result frontend--", result);

        if (result?.data?.resp && !isFinal) {
          setMessages((pre) => [
            ...pre,
            {
              role: "assistant",
              content: result.data.resp,
              ui: result.data.ui,
            },
          ]);
        }

        if (result?.data?.trip_plan) {
          setTripDetails(result.data.trip_plan);
          setTrip(result.data.trip_plan);
        }
      } catch (err) {
        console.error("Error from API:", err);
      } finally {
        setLoading(false);
      }
    },
    [userInput, sessionId, messages, isFinal, setTrip]
  );

  const RenderGenerativeUi = (ui) => {
    switch (ui) {
      case "budget":
        return (
          <BudgetUi onSelectedOption={(val) => onSend(val)} disable={isFinal} />
        );
      case "groupSize":
        return (
          <GroupSize
            onSelectedOption={(val) => onSend(val)}
            disable={isFinal}
          />
        );
      case "tripDuration":
        return (
          <SelectDayUi
            onSelectedOption={(val) => onSend(val)}
            disable={isFinal}
          />
        );
      case "final":
        return <FinalTripUi disable={!tripDetail} />;
      case "limit":
        return (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center text-gray-900 dark:text-gray-100">
              <div className="flex justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-semibold mb-2">
                Daily Limit Reached
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You’ve used up all your credits for today. Please try again
                tomorrow.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.ui === "final") {
      setIsFinal(true);
      setUserInput("Ok, Great!");
    }
  }, [messages]);

  useEffect(() => {
    if (isFinal && userInput) {
      onSend();
    }
  }, [isFinal, userInput, onSend]);

  const resetChat = async () => {
    console.log("reset", sessionId);
    try {
      const response = await axios.post("/api/ai/chat-reset", { sessionId });
      console.log(response);
      setMessages([]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-[80vh] flex flex-col ">
      {/* <BudgetUi onSelectedOption={(val) => onSend(val)} disable={isFinal} /> */}
      {/* <GroupSize onSelectedOption={(val) => onSend(val)} disable={isFinal} /> */}

      {messages.length === 0 ? (
        <EmptyBoxState
          onSelectOption={(text) => {
            setUserInput(text);
            onSend(text);
          }}
        />
      ) : (
        <div className="flex justify-end p-2">
          <button
            className="group relative flex items-center gap-2 rounded-full bg-white px-4 py-2 text-gray-700 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-200 dark:hover:bg-red-400      dark:bg-gray-500 dark:text-white"
            onClick={resetChat}
          >
            <RefreshCw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
            <span>Reset</span>

            {/* Hover tooltip */}
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-red-500 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap">
                Unsaved changes
                {/* Tooltip arrow */}
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-red-500"></div>
              </div>
            </div>
          </button>
        </div>
      )}
      {/* Messages */}
      <section className="flex-1 overflow-y-auto p-4" ref={messagesEndRef}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex mt-2 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-lg px-4 py-2 rounded-lg ${
           msg.role === "user"
  ? "bg-primary text-white dark:bg-orange-600 dark:text-white shadow-sm dark:shadow-orange-900/20"
  : "bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 shadow-sm"
              }`}
            >
              {msg.content}
              {RenderGenerativeUi(msg.ui ?? "")}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mt-2">
            <div className="max-w-lg px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
              <Loader className="animate-spin" />
            </div>
          </div>
        )}
      </section>

      {/* Input Box */}
      <section className="p-4">
        <div className="relative border rounded-2xl">
          <Textarea
            placeholder="Create a trip from Paris to New York"
            className="w-full h-20 border-none focus-visible:ring-0 shadow-none resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
            disabled={isFinal}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
          />
          <Button
            size="icon"
            onClick={onSend}
            disabled={isFinal}
            className="absolute top-2 right-2 cursor-pointer dark:hover:bg-orange-500 hover:text-orange transition-colors"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default ChatBox;
