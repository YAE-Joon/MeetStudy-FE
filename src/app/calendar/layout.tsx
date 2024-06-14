import { Metadata } from "next";

export const metadata: Metadata = {
  title: "캘린더",
};
export default function CalendarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
