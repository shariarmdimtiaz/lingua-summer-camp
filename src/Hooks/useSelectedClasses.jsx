import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};

const useSelectedClasses = () => {
  const { user, loading } = useAuth();
  const {
    data: SelectedClasses = [],
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ["SelectedClasses"],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(`${api.apiUrl}/mySelectedClasses/${user.email}`);
      return res.json();
    },
  });
  return [SelectedClasses, refetch, dataLoading];
};

export default useSelectedClasses;
