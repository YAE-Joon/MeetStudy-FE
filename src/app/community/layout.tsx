import { Metadata } from "next";

export const metadata: Metadata = {
  title: "커뮤니티",
};
export default function CommunityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
