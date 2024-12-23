import requestAPI from "@/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface ChangeUserData {
  userId: number;
  username: string;
  password1?: string;
  password2?: string;
  profile_img?: File;
}

async function changeUserAPI(data: ChangeUserData) {
  try {
    const formdata = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key !== "userId") {
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
    throw new Error(e instanceof AxiosError ? e.message : "알 수 없는 에러");
  }
}

export default function useChangeUser() {
  const mutation = useMutation({
    mutationFn: (data: ChangeUserData) => changeUserAPI(data),
  });

  return mutation;
}
