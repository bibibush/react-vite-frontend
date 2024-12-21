import requestAPI from "@/api";
import { useMutation } from "@tanstack/react-query";

interface ChangeUserData {
  userId: number;
  email: string;
  username: string;
  password1?: string;
  password2?: string;
  profile_img: File | null;
}

async function changeUserAPI(data: ChangeUserData) {
  try {
    const formdata = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key !== "userId") {
        if (key === "profile_img") {
          formdata.append(key, value, encodeURIComponent(value.name));
        }
        formdata.append(key, value);
      }
    }

    const res = await requestAPI({
      url: `/api/users/${data.userId}/change/`,
      method: "PUT",
      data: formdata,
      withJWT: true,
    });

    return res.data;
  } catch (e) {
    console.error(e);
  }
}

export default function useChangeUser() {
  const mutation = useMutation({
    mutationFn: (data: ChangeUserData) => changeUserAPI(data),
  });

  return mutation;
}
