import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};

const usePaymentHistory = () => {
  const { user, loading } = useAuth();
  const {
    data: UserPaymentHistory = [],
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ["payments"],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(`${api.apiUrl}/paymenthistory/${user.email}`);
      return res.json();
    },
  });
  return [UserPaymentHistory, refetch, dataLoading];
};

export default usePaymentHistory;
