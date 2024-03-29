import Layout from "@components/layout";
import matter from "gray-matter";
import { readFileSync, readdirSync } from "fs";
import { NextPage } from "next";
import Link from "next/link";

interface Post {
  title: string;
  date: string;
  category: string;
  slug: string;
}

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout title="Blog" seoTitle="Blog">
      <h1 className="font-semibold text-lg text-center mt-5 mb-10">
        Latest Posts:
      </h1>
      <div className="border-y-2 divide-y-2">
        {posts.map((post, index) => (
          <div key={index} className="px-3 py-3">
            <Link href={`/blog/${post.slug}`}>
              <span className="text-lg text-red-500">{post.title}</span>
              <div>
                <span>
                  {post.date} / {post.category}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const blogPosts = readdirSync("./posts").map((file) => {
    const content = readFileSync(`./posts/${file}`, "utf-8");
    const [slug, _] = file.split(".");
    return { ...matter(content).data, slug };
  });
  console.log(blogPosts);
  return {
    props: {
      posts: blogPosts,
    },
  };
}

export default Blog;
