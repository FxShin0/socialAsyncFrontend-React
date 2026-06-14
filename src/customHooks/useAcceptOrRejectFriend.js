import { useDispatch } from "react-redux";
import { useAcceptOrRejectFriendRequestMutation } from "../store/api/apiSlice";

export const useAcceptOrRejectFriendRequest = ({ token }) => {
  const [acceptOrRejectFriendRequest, { data, isLoading, error }] =
    useAcceptOrRejectFriendRequestMutation();
  const dispatch = useDispatch();

  const handleClick = async (action, user) => {
    try {
      const result = await acceptOrRejectFriendRequest({
        username: user,
        token,
        action,
      }).unwrap();
      dispatch(
        setFriendshipStatus({
          currentStatus: action === "true" ? true : false,
        }),
      );
    } catch (err) {
      alert(err.data.msg);
    }
  };

  return {
    data,
    isLoading,
    error,
    handleClick,
  };
};
