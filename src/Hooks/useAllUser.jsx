import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};

const useAllUser = () => {
  const { user, loading } = useAuth();
  const {
    data: UserInfo = [],
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ["UserInfo"],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(`${api.apiUrl}/users`);
      return res.json();
    },
  });
  return [UserInfo, refetch, dataLoading];
};

export default useAllUser;
