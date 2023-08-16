import { useSelector } from "react-redux";
import { useGetUserQuery } from "../redux/services/auth.service";

const useAuth = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const { data } = useGetUserQuery(undefined, { skip: !token });
  return { token, user: data?.data };
};

export default useAuth;
