"use client";
import { MdErrorOutline } from "react-icons/md";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <p>Global Error ouccred!</p>
        <MdErrorOutline
          style={{
            color: `red`,
            fontSize: "5rem",
          }}
        />
        <button onClick={() => reset()}>다시 시도하기</button>
      </body>
    </html>
  );
}
