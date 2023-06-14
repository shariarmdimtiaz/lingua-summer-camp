import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};
const useAllClasses = () => {
  const { loading } = useAuth();
  const {
    data: AllClassInfo = [],
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ["AllClassInfo"],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(`${api.apiUrl}/allclasses`);
      return res.json();
    },
  });
  return [AllClassInfo, refetch, dataLoading];
};

export default useAllClasses;
