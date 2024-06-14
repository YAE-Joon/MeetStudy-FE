import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입",
};
export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
