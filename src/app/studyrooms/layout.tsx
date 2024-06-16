import { Metadata } from "next";

export const metadata: Metadata = {
  title: "스터디룸",
};
export default function StudyRoomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
