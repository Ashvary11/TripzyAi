"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader, Send } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import EmptyBoxState from "./EmptyBoxState";
import GroupSize from "./GroupSize";
import BudgetUi from "./BudgetUi";
import SelectDayUi from "./SelectDayUi";
import FinalTripUi from "./FinalTripUi";
import { useTrip } from "@/app/TripContext";

type Message = {
  role: string;
  content: string;
  ui?: string;
};
type Coordinates = {
  latitude: number;
  longitude: number;
};
export type Activity = {
  place_details: string;
  place_image_url: string;
  geo_coordinates: Coordinates;
  place_address: string;
  ticket_pricing: string;
  time_travel_each_location: string;
  best_time_to_visit: string;
  place_name: string
};

export type Itinerary = {
  day: string;
  day_plan: string;
  best_time_to_visit: string;
  activities: Activity[];
};
export type Hotel = {
  hotel_name: string;
  hotel_address: string;
  hotel_image_url: string;
  price_per_night: string;
  geo_coordinates: Coordinates;
  rating: string;
  description: string;
};

export type TripInfo = {
  destination: string;
  duration: string;
  origin: string;
  budget: string;
  group_size: string;
  hotels: Hotel[];
  itinerary: Itinerary[];
};

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFinal, setIsFinal] = useState<boolean>(false);
  const [tripDetail, setTripDetails] = useState<TripInfo>();
  const { setTrip } = useTrip();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let storedId = localStorage.getItem("trip_session_id");
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem("trip_session_id", storedId);
    }
    setSessionId(storedId);
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const onSend = useCallback(
    async (inputText?: string) => {
      const textToSend = inputText ?? userInput; // if provided, use it directly
      if (!textToSend?.trim() || !sessionId) return;

      const newMessage: Message = {
        role: "user",
        content: textToSend,
      };
      setMessages((preMsg) => [...preMsg, newMessage]);
      setLoading(true);
      setUserInput("");

      try {
        const result = await axios.post("/api/aimodel", {
          messages: [...messages, newMessage],
          sessionId,
          isFinal,
        });
        const resp = result?.data?.resp;
        // console.log("alll-Resp-----", result?.data);

        if (result?.data?.resp) {
          if (!isFinal) {
            setMessages((preMsg) => [
              ...preMsg,
              {
                role: "assistant",
                content: resp,
                ui: result.data.ui,
              },
            ]);
            console.log("Trip.data", result?.data);
          }
        }
        if (result?.data?.trip_plan) {
          console.log(
            "i am final trip_plan  response :",
            result?.data?.trip_plan
          );
          setTripDetails(result?.data?.trip_plan);
          setTrip(result.data.trip_plan);
        }
      } catch (err) {
        console.error("Error from API:", err);
      } finally {
        setLoading(false);
      }
    },
    [userInput, sessionId, messages, isFinal]
  );

  const RenderGenerativeUi = (ui: string) => {
    if (ui == "budget") {
      //budget ui compo
      return (
        <BudgetUi
          onSelectedOption={(val: string) => {
            // setUserInput(val);
            onSend(val);
          }}
        />
      );
    } else if (ui == "groupSize") {
      //budget ui compo
      return (
        <GroupSize
          onSelectedOption={(val: string) => {
            // setUserInput(val);
            onSend(val);
          }}
        />
      );
    } else if (ui == "tripDuration") {
      return (
        <SelectDayUi
          onSelectedOption={(val: string) => {
            onSend(val);
          }}
        />
      );
    }
    else if (ui == "final") {
      return (
        <FinalTripUi
          viewTrip={() => {
            console.log("Trip viewed ✅");
          }}
          disable={!tripDetail}
        />
      );
    }
    else if (ui == "limit") {
      return (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-lg text-center">
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
            <h1 className="text-xl font-semibold mb-2">Daily Limit Reached</h1>
            <p className="text-sm text-gray-600">
              You’ve used up all your credits for today.
              Please try again tomorrow.
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.ui == "final") {
      setIsFinal(true);
      setUserInput("Ok, Great!");
      //   onSend();
    }
  }, [messages]);
  useEffect(() => {
    if (isFinal && userInput) {
      onSend();
    }
  }, [isFinal, userInput, onSend]);
  return (
    <div className={`h-[80vh] flex flex-col${isFinal ? "" : ""} `}>
      {messages?.length == 0 && (
        <EmptyBoxState
          onSelectOption={(text: any) => {
            setUserInput(text);
            onSend(text);
          }}
        />
      )}

      {/* Display MEssages */}

      <section className="flex-1  overflow-y-auto p-4">
        {messages.map((msg: Message, i) =>
          msg.role == "user" ? (
            <div className="flex justify-end mt-2" key={i}>
              <div className="max-w-lg bg-primary  text-white px-4 py-2 rounded-lg " ref={messagesEndRef}>
                {msg.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start mt-2" key={i}>
              <div className="max-w-lg bg-gray-100  text-black px-4 py-2 rounded-lg " ref={messagesEndRef}>
                {msg.content}
                {RenderGenerativeUi(msg.ui ?? "")}
              </div>
            </div>
          )
        )}
        {loading && (
          <div className="flex justify-start mt-2">
            <div className="max-w-lg bg-gray-100  text-black px-4 py-2 rounded-lg ">
              {<Loader className="animate-spin" />}
            </div>
          </div>
        )}
      </section>
      {/* {userinput} */}
      <section>
        {/* Input Box */}
        <div>
          <div className="border rounded-2xl p-4 relative">
            <Textarea
              placeholder="Create a trip from Paris to New York"
              className="w-full h-20 border-none focus-visible:ring-0 shadow-none resize-none"
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
              disabled=
              {isFinal}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSend();
                }
              }}
            />
            <Button
              size={"icon"}
              onClick={() => onSend()}
              className="bottom-3 right-3 absolute cursor-pointer"
              disabled={isFinal}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      {/* <FinalTripUi
          viewTrip={() => {
            console.log("Trip viewed ✅");
          }}
          disable={tripDetail}
        /> */}
    </div>
  );
}

export default ChatBox;
