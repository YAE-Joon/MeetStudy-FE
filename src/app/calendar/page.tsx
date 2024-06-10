"use client";

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styled, { keyframes } from "styled-components";
import axios from "axios";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  allDay?: boolean;
  start: Date;
  end: Date;
  desc?: string;
}

const initialEvents: Event[] = [
  {
    id: 0,
    title: "Board meeting",
    start: new Date(2024, 5, 4, 9, 0, 0), // June 4, 2024, 9:00 AM
    end: new Date(2024, 5, 4, 11, 0, 0), // June 4, 2024, 11:00 AM
    allDay: false,
  },
  {
    id: 1,
    title: "Team Lunch",
    start: new Date(2024, 5, 10, 12, 0, 0), // June 10, 2024, 12:00 PM
    end: new Date(2024, 5, 10, 13, 0, 0), // June 10, 2024, 1:00 PM
    allDay: false,
  },
  {
    id: 2,
    title: "Project Deadline",
    start: new Date(2024, 5, 15, 0, 0, 0), // June 15, 2024, All day
    end: new Date(2024, 5, 15, 23, 59, 59), // June 15, 2024, All day
    allDay: true,
  },
  {
    id: 3,
    title: "Client Meeting",
    start: new Date(2024, 5, 20, 14, 0, 0), // June 20, 2024, 2:00 PM
    end: new Date(2024, 5, 20, 15, 30, 0), // June 20, 2024, 3:30 PM
    allDay: false,
  },
  {
    id: 4,
    title: "Workshop",
    start: new Date(2024, 5, 25, 10, 0, 0), // June 25, 2024, 10:00 AM
    end: new Date(2024, 5, 25, 12, 0, 0), // June 25, 2024, 12:00 PM
    allDay: false,
  },
];

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState<Event[]>(initialEvents);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for loading, for example 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const token =
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMCIsImF1dGgiOiJBRE1JTiIsInVzZXJuYW1lIjoi7J287J207IK87Jyg7KCAIiwiZXhwIjoyNzE3NjY0MDI2fQ.hrVSdMxokj0FbBXnmUKLlqgPwHvGMllGpeGmPw6pVdSFmybESvKhQbpZmpkuowbEc61rpYdkcPIi9m91C41StQ";

  useEffect(() => {
    axios
      .get("http://34.47.79.59:8080/api/calendar?year=2024&month=6", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log("Fetched data:", response.data); // 데이터를 콘솔에 출력
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleSelect = ({ start, end }: SlotInfo) => {
    const title = window.prompt("New Event name");
    if (title) {
      const newEvent: Event = {
        id: eventsData.length ? eventsData[eventsData.length - 1].id + 1 : 0,
        title,
        start,
        end,
      };
      setEventsData([...eventsData, newEvent]);
    }
  };

  return (
    <AppContainer>
      {loading ? (
        <LoadingScreen>
          <Spinner />
          <p>Loading...</p>
        </LoadingScreen>
      ) : (
        <div className="p-10">
          <Calendar
            views={["day", "agenda", "work_week", "month"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={eventsData}
            style={{ height: "100vh" }}
            onSelectEvent={(event) => alert(event.title)}
            onSelectSlot={handleSelect}
          />
        </div>
      )}
    </AppContainer>
  );
}

const AppContainer = styled.div`
  height: auto;
`;

const LoadingScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: ${spin} 1s linear infinite;
`;
