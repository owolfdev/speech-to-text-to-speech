import { AuthHeader } from "@/components/AuthHeader";
import { AppFooter } from "@/components/AppFooter";
import { blogPosts } from "@/data/blog-posts";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#5BA3E8] flex flex-col">
      <AuthHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              Blog
            </h1>

            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 text-sm mb-4">{post.date}</p>
                <p className="mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-500 hover:text-blue-600 font-medium inline-flex items-center transition-colors"
                >
                  Read more
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
