import { AuthHeader } from "@/components/AuthHeader";
import { AppFooter } from "@/components/AppFooter";
import { getDocsByCategory } from "@/data/docs";
import { PWALink } from "@/components/PWALink";

export default function DocsPage() {
  const docsByCategory = getDocsByCategory();

  return (
    <div className="min-h-screen bg-[#5BA3E8] flex flex-col">
      <AuthHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Documentation
              </h1>
              <p className="text-lg text-white/90">
                Everything you need to know about using Répéter
              </p>
            </div>

            {Object.entries(docsByCategory).map(([category, categoryDocs]) => (
              <section key={category} className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryDocs.map((doc) => (
                    <PWALink
                      key={doc.slug}
                      href={`/docs/${doc.slug}`}
                      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                    >
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">
                        {doc.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{doc.excerpt}</p>
                      <div className="mt-4 inline-flex items-center text-blue-600 font-medium text-sm">
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
                      </div>
                    </PWALink>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
