import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};

const useUserRole = () => {
  const { user, loading } = useAuth();
  const {
    data: UserRole = [],
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(`${api.apiUrl}/userRole/${user.email}`);
      return res.json();
    },
  });
  return [UserRole, refetch, dataLoading];
};

export default useUserRole;
