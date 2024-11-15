import { useState } from "react";
import AuthenticatedLayout from "./AuthenticatedLayout";
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
      const res = await axios.get("/api/user/users/");
      setUserState(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  console.log(userState);
  return (
    <AuthenticatedLayout>
      <Button onClick={handleFetch}>하이</Button>
    </AuthenticatedLayout>
  );
}

export default MainPage;
