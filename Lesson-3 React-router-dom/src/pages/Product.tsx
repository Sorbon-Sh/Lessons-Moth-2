import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "./HomePage";
import url from "../url";

interface ExtendedPost extends Post {
  content: string;
  publishedAt: string;
}

const Product = () => {
  const { id } = useParams();
  const [post, setPost] = useState<ExtendedPost>();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${url}/${id}`);

      const data = await res.json();

      setPost(data);
    })();
  }, []);

  return (
    <main>
      <div className="container mx-auto px-12 py-8 space-y-4">
        <img src={post?.image} alt="" />
        <h1 className="text-3xl font-bold">{post?.title}</h1>
        <h1 className="text-3xl font-bold">
          Category {post?.category} Date: {post?.publishedAt}
        </h1>
        <h1 className="">{post?.content}</h1>
      </div>
    </main>
  );
};

export default Product;
