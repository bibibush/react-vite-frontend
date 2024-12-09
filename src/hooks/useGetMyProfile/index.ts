import requestAPI from "@/api";
import User from "@/types/User";
import { useQuery } from "@tanstack/react-query";

async function getMyProfileAPI(params: { userId: string | null }) {
  try {
    const res = await requestAPI({
      url: `/api/users/my-profile/${params.userId}/`,
      method: "GET",
      withJWT: true,
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

export default function useGetMyProfile(params: { userId: string | null }) {
  const results = useQuery<User>({
    queryKey: ["user", params.userId],
    queryFn: () => getMyProfileAPI(params),
    enabled: !!params.userId,
  });

  return {
    ...results,
    data: results.data,
  };
}
