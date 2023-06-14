import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};
const useClasses = () => {
  const { loading } = useAuth();
  const {
    data: ClassInfo = [],
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ["ClassInfo"],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(`${api.apiUrl}/classes`);
      return res.json();
    },
  });
  return [ClassInfo, refetch, dataLoading];
};

export default useClasses;
