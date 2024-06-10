import { createContext, useContext } from "react";
import { StudyRoom } from "@/types/StudyRoom";

interface PackedStudyRoomData extends StudyRoom {
  currentMembers: number;
}
interface StudyRoomDataProviderProps {
  children: React.ReactNode;
  value: PackedStudyRoomData;
}

const StudyRoomDataContext = createContext<PackedStudyRoomData | null>(null);

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
