import { useEffect, useState } from "react";
import url from "../url";
import Post from "../components/Post";

export interface Post {
  id: number;
  title: string;
  category: string;
  image: string;
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(url);
      const data: Post[] = await res.json();

      setPosts(data);
    })();
  }, []);

  return (
    <main>
      <div className="container mx-auto px-12 py-8">
        <h1 className="text-3xl font-bold">Публикации</h1>
        <div className="grid grid-cols-4 gap-4">
          {!posts.length ? (
            <>Loading</>
          ) : (
            posts.map((post: Post) => (
              <Post
                key={post.id}
                title={post.title}
                category={post.category}
                image={post.image}
                id={post.id}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
