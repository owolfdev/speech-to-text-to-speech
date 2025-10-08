import { AuthHeader } from "@/components/AuthHeader";
import { AppFooter } from "@/components/AppFooter";
import { getDoc, getAllDocSlugs, getDocsByCategory } from "@/data/docs";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc(slug);

  if (!doc) {
    notFound();
  }

  const docsByCategory = getDocsByCategory();

  return (
    <div className="min-h-screen bg-[#5BA3E8] flex flex-col">
      <AuthHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <aside className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-4 sticky top-4">
                  <Link
                    href="/docs"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 text-sm font-medium transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
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
                    All Docs
                  </Link>

                  <nav className="space-y-4">
                    {Object.entries(docsByCategory).map(
                      ([category, categoryDocs]) => (
                        <div key={category}>
                          <h3 className="font-semibold text-gray-900 text-sm mb-2">
                            {category}
                          </h3>
                          <ul className="space-y-1">
                            {categoryDocs.map((categoryDoc) => (
                              <li key={categoryDoc.slug}>
                                <Link
                                  href={`/docs/${categoryDoc.slug}`}
                                  className={`block text-sm px-2 py-1 rounded transition-colors ${
                                    categoryDoc.slug === doc.slug
                                      ? "bg-blue-100 text-blue-700 font-medium"
                                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                  }`}
                                >
                                  {categoryDoc.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </nav>
                </div>
              </aside>

              {/* Main Content */}
              <article className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
                  <header className="mb-8">
                    <div className="text-sm text-blue-600 font-medium mb-2">
                      {doc.category}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                      {doc.title}
                    </h1>
                    {doc.excerpt && (
                      <p className="text-lg text-gray-600">{doc.excerpt}</p>
                    )}
                  </header>

                  <div
                    className="prose prose-lg max-w-none
                      prose-headings:font-semibold 
                      prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                      prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                      prose-p:mb-4 prose-p:leading-relaxed
                      prose-ul:my-4 prose-ul:ml-6
                      prose-li:mb-2
                      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                      prose-strong:font-semibold prose-strong:text-gray-900
                      prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {doc.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
