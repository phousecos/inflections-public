import { getIssues, getArticlesByIssueId } from "@/lib/airtable";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: "All Issues - Inflections",
  description: "Browse all published issues of Inflections magazine",
};

export default async function IssuesPage() {
  const issues = await getIssues();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-jet mb-4">
          All Issues
        </h1>
        <p className="text-gray-600 text-lg">
          Explore our complete archive of technology leadership insights.
        </p>
      </div>

      {issues.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">
            No issues published yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="space-y-16">
          {issues.map(async (issue) => {
            const articles = await getArticlesByIssueId(issue.id);
            
            return (
              <section key={issue.id} className="border-b border-gray-200 pb-12 last:border-0">
                {/* Issue Header */}
                <header className="mb-8">
                  <Link href={`/issues/${issue.number}`} className="group">
                    <p className="text-brand-blue font-semibold text-sm uppercase tracking-wide mb-2">
                      Issue {issue.number}
                    </p>
                    <h2 className="text-3xl font-bold text-brand-jet group-hover:text-brand-blue transition mb-2">
                      {issue.title}
                    </h2>
                  </Link>
                  {issue.publishDate && (
                    <p className="text-gray-500 text-sm">
                      Published {new Date(issue.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                  {issue.themeDescription && (
                    <p className="text-gray-600 mt-3">
                      {issue.themeDescription}
                    </p>
                  )}
                </header>

                {/* Articles */}
                {articles.length > 0 && (
                  <div className="space-y-6">
                    {articles.map((article) => (
                      <article
                        key={article.id}
                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
                      >
                        <div className="flex flex-col md:flex-row">
                          {/* Image */}
                          {article.featuredImageUrl && (
                            <div className="md:w-40 md:h-40 flex-shrink-0">
                              <img
                                src={article.featuredImageUrl}
                                alt={article.title}
                                className="w-full h-40 md:h-full object-cover"
                              />
                            </div>
                          )}
                          
                          {/* Content */}
                          <div className="flex-1 p-5">
                            {/* Pillar Tag */}
                            {article.pillar && (
                              <span className="inline-block text-xs font-semibold text-brand-blue uppercase tracking-wide mb-2 bg-blue-50 px-2 py-1 rounded">
                                {article.pillar}
                              </span>
                            )}
                            
                            {/* Title */}
                            <h3 className="text-lg font-bold text-brand-jet mb-2">
                              <Link
                                href={`/articles/${article.slug}`}
                                className="hover:text-brand-blue transition"
                              >
                                {article.title}
                              </Link>
                            </h3>
                            
                            {/* Excerpt */}
                            {article.excerpt && (
                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {article.excerpt}
                              </p>
                            )}
                            
                            {/* Footer */}
                            <div className="flex items-center justify-between">
                              {article.author && (
                                <span className="text-xs text-gray-500">
                                  By {article.author}
                                </span>
                              )}
                              <Link
                                href={`/articles/${article.slug}`}
                                className="text-brand-blue font-semibold text-sm hover:underline"
                              >
                                Read Full Article →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
