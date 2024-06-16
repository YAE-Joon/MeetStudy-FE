import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const useUserEmailFromSession = () => {
  const { data, status } = useSession();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    //@ts-ignore //확실히 있음
    if (status === "authenticated" && data?.user?.id) {
      //@ts-ignore //확실히 있음
      setUserEmail(data.user.id);
    }
  }, [status, data]);

  return userEmail;
};

export default useUserEmailFromSession;
