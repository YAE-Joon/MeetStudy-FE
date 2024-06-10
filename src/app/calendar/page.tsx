"use client";

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import Modal from "@/component/Modal"; // Modal 컴포넌트의 경로에 맞게 수정해주세요.
import Cookies from "js-cookie";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  startDay: string; // 추가된 부분
  endDay: string; // 추가된 부분
  startTime: string;
  endTime: string;
}

interface EventFormData {
  title: string;
  content: string;
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;
}

const NewEventForm: React.FC<{ onSubmit: (data: EventFormData) => void }> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    content: "",
    startDay: "",
    endDay: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // formData에서 필요한 데이터 추출 및 가공
    const formattedData = {
      title: formData.title,
      content: formData.content,
      startDay: formData.startDay.replace(/-/g, ""), // 날짜 형식에서 '-' 제거
      endDay: formData.endDay.replace(/-/g, ""), // 날짜 형식에서 '-' 제거
      startTime: formData.startTime,
      endTime: formData.endTime,
    };

    const token = Cookies.get("accessToken"); // Get the token from cookies

    if (!token) {
      console.error("No token found");
      return;
    }

    // axios를 사용하여 POST 요청 보내기
    axios
      .post("http://34.47.79.59:8080/api/calendar", formattedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("New event submitted successfully:", response.data);
        // 여기서 추가적인 작업을 수행할 수 있습니다.
      })
      .catch((error) => {
        console.error("Error submitting new event:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <label className="flex flex-col items-center">
        <span>Title:</span>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md"
        />
      </label>
      <label className="flex flex-col items-center mt-4">
        <span>Content:</span>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md"
        />
      </label>
      <label className="flex flex-col items-center mt-4">
        <span>Start Day:</span>
        <input
          type="date"
          name="startDay"
          value={formData.startDay}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md"
        />
      </label>
      <label className="flex flex-col items-center mt-4">
        <span>End Day:</span>
        <input
          type="date"
          name="endDay"
          value={formData.endDay}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md"
        />
      </label>
      <label className="flex flex-col items-center mt-4">
        <span>Start Time:</span>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md"
        />
      </label>
      <label className="flex flex-col items-center mt-4">
        <span>End Time:</span>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md"
        />
      </label>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState<Event[]>();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
  const [currentYearMonth, setCurrentYearMonth] = useState<{
    year: number;
    month: number;
  }>({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 });

  const convertEventData = (data: any) => {
    const start = moment(
      `${data.startDay} ${data.startTime}`,
      "YYYYMMDD HH:mm:ss"
    ).toDate();
    const end = moment(
      `${data.endDay} ${data.endTime}`,
      "YYYYMMDD HH:mm:ss"
    ).toDate();

    return {
      id: Math.random(), // 임시로 유일한 ID 생성
      title: data.title,
      start,
      end,
    };
  };

  useEffect(() => {
    // Simulate a delay for loading, for example 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const token = Cookies.get("accessToken"); // Get the token from cookies

    if (!token) {
      console.error("No token found");
      return;
    }

    axios
      .get("http://34.47.79.59:8080/api/calendar", {
        headers: {
          year: currentYearMonth.year.toString(),
          month: currentYearMonth.month.toString().padStart(2, "0"),
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Fetched data:", response.data);
        const eventData = response.data.map(convertEventData);
        setEventsData(eventData);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, [currentYearMonth]);

  const handleSelect = ({ start, end }: SlotInfo) => {
    setIsModalOpen(true); // 모달 열기
    setSelectedSlot({ slots: [], action: "select", start, end }); // 선택된 슬롯 정보 저장
  };

  const handleNavigate = (date: Date) => {
    setCurrentYearMonth({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (formData: EventFormData) => {
    const newEvent: Event = {
      id: Math.random(),
      ...formData,
      start: moment(
        `${formData.startDay} ${formData.startTime}`,
        "YYYY-MM-DD HH:mm"
      ).toDate(),
      end: moment(
        `${formData.endDay} ${formData.endTime}`,
        "YYYY-MM-DD HH:mm"
      ).toDate(),
    };
    setEventsData([...(eventsData || []), newEvent]);
    setIsModalOpen(false); // 모달 닫기
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
            events={eventsData || []}
            style={{ height: "100vh" }}
            onSelectEvent={(event) =>
              alert(
                `${event.title} - ${moment(event.start).format(
                  "YYYYMMDD HH:mm:ss"
                )} - ${moment(event.end).format("YYYYMMDD HH:mm:ss")}`
              )
            }
            onSelectSlot={handleSelect}
            onNavigate={handleNavigate}
          />
          <Modal isVisible={isModalOpen} onClose={handleModalClose}>
            {" "}
            {/* Modal이 열려있는지 여부를 props로 전달합니다. */}
            <NewEventForm onSubmit={handleSubmit} />
          </Modal>
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
