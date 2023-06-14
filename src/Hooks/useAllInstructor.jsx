import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};

const useAllInstructor = () => {
  const { loading } = useAuth();
  const {
    data: AllInstructor = [],
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ["AllInstructor"],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(`${api.apiUrl}/instructors`);
      return res.json();
    },
  });
  return [AllInstructor, refetch, dataLoading];
};

export default useAllInstructor;
