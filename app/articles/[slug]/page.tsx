import { getArticleBySlug, getArticles } from "@/lib/airtable";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600; // Revalidate every hour

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article Not Found - Inflections",
    };
  }

  return {
    title: `${article.title} - Inflections`,
    description: article.excerpt || `Read ${article.title} on Inflections magazine`,
    authors: article.author ? [{ name: article.author }] : undefined,
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href={article.issueNumber ? `/issues/${article.issueNumber}` : "/issues"}
          className="text-brand-blue hover:underline"
        >
          ← Back to Issue {article.issueNumber || ""}
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-12">
        {article.pillar && (
          <div className="text-brand-blue font-semibold text-sm uppercase tracking-wide mb-4">
            {article.pillar}
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-brand-jet mb-6 leading-tight">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center space-x-4 text-sm text-gray-500 border-t border-gray-200 pt-6">
          {article.author && (
            <span className="font-semibold text-brand-jet">
              By {article.author}
            </span>
          )}
          {article.publishedDate && (
            <span>
              {new Date(article.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
        </div>
      </header>

      {/* Cover Image */}
      {article.coverImage && (
        <div className="mb-12">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="prose prose-lg prose-gray max-w-none">
        {article.content ? (
          <div
            dangerouslySetInnerHTML={{ __html: article.content }}
            className="leading-relaxed"
          />
        ) : (
          <p className="text-gray-600 italic">
            Article content coming soon...
          </p>
        )}
      </div>

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            {article.issueNumber && (
              <Link
                href={`/issues/${article.issueNumber}`}
                className="text-brand-blue hover:underline"
              >
                ← Back to Issue {article.issueNumber}
              </Link>
            )}
          </div>
          <div>
            <Link
              href="/issues"
              className="text-brand-blue hover:underline"
            >
              Browse All Issues →
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
