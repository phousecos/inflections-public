import { getArticleBySlug, getArticles } from "@/lib/airtable";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600; // Revalidate every hour

// Generate static params for all articles in published issues
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
          href={article.issueNumber ? `/issues/${article.issueNumber}` : "/"}
          className="text-brand-blue hover:underline"
        >
          ← Back to Issue {article.issueNumber || ""}
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-10">
        {article.pillar && (
          <span className="inline-block text-sm font-semibold text-brand-blue uppercase tracking-wide mb-4 bg-blue-50 px-3 py-1 rounded">
            {article.pillar}
          </span>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-jet mb-6 leading-tight">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {article.excerpt}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-t border-gray-200 pt-6">
          {article.author && (
            <span className="font-semibold text-brand-jet">
              By {article.author}
            </span>
          )}
          {article.publishDate && (
            <span>
              {new Date(article.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {article.featuredImageUrl && (
        <div className="mb-10">
          <img
            src={article.featuredImageUrl}
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
            className="leading-relaxed [&>p]:mb-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-brand-jet [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-brand-jet [&>h3]:mt-8 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>blockquote]:border-l-4 [&>blockquote]:border-brand-blue [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-gray-600"
          />
        ) : (
          <p className="text-gray-600 italic">
            Article content coming soon...
          </p>
        )}
      </div>

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
              href="/"
              className="text-brand-blue hover:underline"
            >
              View Latest Issue →
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
