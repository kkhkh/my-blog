import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Tag {
  createAt: string;
  name: string;
  id: number;
  updatedAt: string;
}

const useMutateTags = () => {
  const queryClient = useQueryClient();
  useQuery<Tag[] | null>(["tags"], () => null, {
    refetchOnWindowFocus: false,
  });

  const setTagsMutation = useMutation(async () => {
    const response = await axios.get(
      "https://api-blog-dev.lightsail.ijcloud.jp/tags",
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    queryClient.setQueryData<Tag[] | null>(["tags"], response.data.tags);
    console.log(response);
  });

  return { setTagsMutation };
};

export default useMutateTags;
