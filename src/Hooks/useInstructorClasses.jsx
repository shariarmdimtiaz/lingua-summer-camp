import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};
const useInstructorClasses = () => {
  const { user, loading } = useAuth();
  const {
    data: InstructorClasses = [],
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ["InstructorClasses"],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(`${api.apiUrl}/myclasses/${user.email}`);
      return res.json();
    },
  });
  return [InstructorClasses, refetch, dataLoading];
};

export default useInstructorClasses;
