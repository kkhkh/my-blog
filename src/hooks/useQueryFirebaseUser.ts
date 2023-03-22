import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Api } from "const";

const useQueryFirebaseUser = () => {
  // queryClient
  const queryClient = useQueryClient();

  // useQuery
  const {
    data: firebaseUser,
    isLoading: firebaseUserLoading,
    isFetching: firebaseUserFetching,
  } = useQuery(
    ["firebaseUser"],
    async () => {
      const response = await Api.getClassCList();
      console.log("useQueryClassCList:", response);

      return response.data;
    },
    {
      onError(error) {
        if (Api.isAxiosError(error)) console.error(error.message);
        else console.error({ error });
      },
    }
  );

  return {
    firebaseUser,
    firebaseUserLoading,
    firebaseUserFetching,
  };
};

export default useQueryFirebaseUser;
