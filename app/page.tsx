import { getIssues, getArticlesByIssue } from "@/lib/airtable";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  const issues = await getIssues();
  const latestIssue = issues[0];

  if (!latestIssue) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-700">
          Coming Soon
        </h1>
        <p className="text-center text-gray-600 mt-4">
          The first issue of Inflections is being prepared.
        </p>
      </div>
    );
  }

  const articles = await getArticlesByIssue(latestIssue.number);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <p className="text-brand-blue font-semibold text-sm uppercase tracking-wide mb-2">
            Latest Issue
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-brand-jet mb-4">
            Issue {latestIssue.number}
          </h2>
          {latestIssue.title && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {latestIssue.title}
            </p>
          )}
          {latestIssue.description && (
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              {latestIssue.description}
            </p>
          )}
          <div className="mt-8">
            <Link
              href={`/issues/${latestIssue.number}`}
              className="inline-block bg-brand-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Read Issue {latestIssue.number}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {articles.length > 0 && (
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-brand-jet mb-8">
            Featured Articles
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(0, 6).map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
              >
                {article.coverImage && (
                  <div className="aspect-video bg-gray-200">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  {article.pillar && (
                    <span className="inline-block text-xs font-semibold text-brand-blue uppercase tracking-wide mb-2">
                      {article.pillar}
                    </span>
                  )}
                  <h4 className="text-xl font-bold text-brand-jet mb-2">
                    <Link
                      href={`/articles/${article.slug}`}
                      className="hover:text-brand-blue transition"
                    >
                      {article.title}
                    </Link>
                  </h4>
                  {article.excerpt && (
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}
                  {article.author && (
                    <p className="text-sm text-gray-500 mt-4">
                      By {article.author}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="bg-white rounded-lg p-12 text-center shadow-sm">
        <h3 className="text-3xl font-bold text-brand-jet mb-4">
          Explore Past Issues
        </h3>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Dive into our archive of insights on IT leadership, delivery excellence,
          workforce transformation, and more.
        </p>
        <Link
          href="/issues"
          className="inline-block bg-brand-jet text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Browse All Issues
        </Link>
      </section>
    </div>
  );
}
