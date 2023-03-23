import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Api } from "const";
import { User } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../FirebaseConfig";

const useQueryFirebaseUser = () => {
  // queryClient
  const queryClient = useQueryClient();
  useQuery<User | null>(["fireBaseUser"], () => null);

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      queryClient.setQueryData(["fireBaseUser"], user);
    });
    return () => {
      unsubscribed();
    };
  });

  const fireBaseUser = queryClient.getQueryData<User | null>(["fireBaseUser"]);
  return { fireBaseUser };
};

export default useQueryFirebaseUser;
