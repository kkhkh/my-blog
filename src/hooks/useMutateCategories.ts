import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import useQueryFirebaseUser from "./useQueryFirebaseUser";

interface Category {
  createAt: string;
  name: string;
  id: number;
  updatedAt: string;
}
const useMutateTags = () => {
  const queryClient = useQueryClient();
  useQuery<Category[] | null>(["categories"], () => null, {
    refetchOnWindowFocus: false,
  });

  const setCategoriesMutation = useMutation(
    async (token: string | undefined) => {
      console.log(token);
      const response = await axios.get(
        "https://api-blog-dev.lightsail.ijcloud.jp/categories",
        {
          headers: {
            Authorization: "Bearer " + token,
            accept: "application/json",
          },
        }
      );
      queryClient.setQueryData<Category[] | null>(
        ["categories"],
        response.data.categories
      );
      console.log(response);
    }
  );

  return { setCategoriesMutation };
};

export default useMutateTags;
