import { AuthHeader } from "@/components/AuthHeader";
import { AppFooter } from "@/components/AppFooter";
import { getBlogPost, getAllBlogSlugs } from "@/data/blog-posts";
import { notFound } from "next/navigation";
import { PWALink } from "@/components/PWALink";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#5BA3E8] flex flex-col">
      <AuthHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Back to Blog Link */}
            <PWALink
              href="/blog"
              className="inline-flex items-center text-white hover:text-gray-100 mb-6 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </PWALink>

            {/* Blog Post Content */}
            <article className="bg-white rounded-lg shadow-lg p-6 md:p-10">
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center text-gray-600 text-sm">
                  <time dateTime={post.date}>{post.date}</time>
                  {post.author && (
                    <>
                      <span className="mx-2">•</span>
                      <span>By {post.author}</span>
                    </>
                  )}
                </div>
              </header>

              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-semibold 
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:mb-4 prose-p:leading-relaxed
                  prose-ul:my-4 prose-ul:ml-6
                  prose-li:mb-2
                  prose-strong:font-semibold prose-strong:text-gray-900"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              </div>
            </article>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
