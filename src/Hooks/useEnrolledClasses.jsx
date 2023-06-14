import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};

const useEnrolledClasses = () => {
  const { user, loading } = useAuth();
  const {
    data: EnrolledClasses = [],
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ["EnrolledClasses"],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(`${api.apiUrl}/myEnrolledClasses/${user.email}`);
      return res.json();
    },
  });
  return [EnrolledClasses, refetch, dataLoading];
};

export default useEnrolledClasses;
