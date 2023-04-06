import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Article {
  id: number;
  title: string;
  categoryId: number;
  content: string;
  createAt: string;
  thumbnailUrl: string;
  updatedAt: string;
}

const useMutateArticles = () => {
  const queryClient = useQueryClient();
  useQuery<Article[] | null>(["articles"], () => null, {
    refetchOnWindowFocus: false,
  });

  const setArticlesMutation = useMutation(async () => {
    const response = await axios.get(
      "https://api-blog-dev.lightsail.ijcloud.jp/articles",
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    queryClient.setQueryData<Article[] | null>(
      ["articles"],
      response.data.articles
    );
    console.log(response);
  });

  return { setArticlesMutation };
};

export default useMutateArticles;
