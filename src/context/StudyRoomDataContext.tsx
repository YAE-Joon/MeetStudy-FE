import { createContext, useContext } from "react";
import { StudyRoom } from "@/lib/types";

interface StudyRoomDataProviderProps {
  children: React.ReactNode;
  value: StudyRoom;
}

const StudyRoomDataContext = createContext<StudyRoom | null>(null);

export const StudyRoomDataProvider = ({
  children,
  value,
}: StudyRoomDataProviderProps) => (
  <StudyRoomDataContext.Provider value={value}>
    {children}
  </StudyRoomDataContext.Provider>
);

export const useStudyRoomData = () => {
  const context = useContext(StudyRoomDataContext);
  if (context === null) {
    throw new Error("[StduyRoomDataProvider Error!");
  }
  return context;
};
