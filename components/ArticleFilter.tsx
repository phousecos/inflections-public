'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  author?: string;
  pillar?: string;
  issueNumber?: number;
  featuredImageUrl?: string;
  publishDate?: string;
}

interface ArticleFilterProps {
  articles: Article[];
  pillars: string[];
}

export default function ArticleFilter({ articles, pillars }: ArticleFilterProps) {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  // Filter articles based on selected pillar
  const filteredArticles = selectedPillar
    ? articles.filter(article => article.pillar === selectedPillar)
    : articles;

  return (
    <>
      {/* Filter Buttons */}
      <div className="mb-10">
        <div className="flex flex-wrap gap-3">
          {/* All Button */}
          <button
            onClick={() => setSelectedPillar(null)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
              selectedPillar === null
                ? 'bg-brand-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>

          {/* Pillar Buttons */}
          {pillars.map((pillar) => (
            <button
              key={pillar}
              onClick={() => setSelectedPillar(pillar)}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
                selectedPillar === pillar
                  ? 'bg-brand-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {pillar}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mt-4">
          Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
          {selectedPillar && ` in ${selectedPillar}`}
        </p>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">
            No articles found in this category yet.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                {article.featuredImageUrl && (
                  <div className="md:w-48 md:h-48 flex-shrink-0">
                    <img
                      src={article.featuredImageUrl}
                      alt={article.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 p-6">
                  {/* Pillar Tag */}
                  {article.pillar && (
                    <button
                      onClick={() => setSelectedPillar(article.pillar!)}
                      className="inline-block text-xs font-semibold text-brand-blue uppercase tracking-wide mb-2 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition"
                    >
                      {article.pillar}
                    </button>
                  )}

                  {/* Title */}
                  <h2 className="text-xl md:text-2xl font-bold text-brand-jet mb-3">
                    <Link
                      href={`/articles/${article.slug}`}
                      className="hover:text-brand-blue transition"
                    >
                      {article.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  {article.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      {article.author && (
                        <span>By {article.author}</span>
                      )}
                      {article.issueNumber && (
                        <span className="text-gray-400">•</span>
                      )}
                      {article.issueNumber && (
                        <Link
                          href={`/issues/${article.issueNumber}`}
                          className="hover:text-brand-blue"
                        >
                          Issue {article.issueNumber}
                        </Link>
                      )}
                    </div>
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
    </>
  );
}
