import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface User {
  username: string;
  email: string;
  isStaff: boolean;
  isSuperuser: boolean;
}

function MainPage() {
  const [userState, setUserState] = useState<User | null>(null);

  const handleFetch = async () => {
    try {
      const res = await axios.post("/api/user/users/", {
        username: "hiee",
        password: "asad941215",
        email: "hiwe@hi.com",
        first_name: "h",
        last_name: "i",
        is_staff: false,
        is_superuser: false,
      });
      setUserState(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  console.log(userState);
  return <Button onClick={handleFetch}>하이</Button>;
}

export default MainPage;
