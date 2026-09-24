import React, { useState } from 'react';
import { INSIGHTS_ARTICLES } from '../data/content';
import { InsightArticle } from '../types';
import { Calendar, Clock, ArrowRight, X, BookOpen, Share2 } from 'lucide-react';

export const InsightsSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(null);

  return (
    <section id="insights" className="py-20 bg-gray-50/60 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F0F7FB] text-[#016DAA] text-xs font-bold uppercase tracking-wider mb-3">
            Market Knowledge &amp; Guidance
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight">
            Real Estate Insights
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Expert advisory, legal frameworks, and investment strategies to guide your Nigerian property decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INSIGHTS_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Article Image */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-white/95 backdrop-blur-md text-[#016DAA] shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3
                    onClick={() => setActiveArticle(article)}
                    className="text-lg font-bold text-[#1F2937] group-hover:text-[#016DAA] transition-colors line-clamp-2 cursor-pointer mb-3 leading-snug"
                  >
                    {article.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Read More Action */}
              <div className="px-6 pb-6 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveArticle(article)}
                  id={`read-article-${article.id}`}
                  className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl bg-gray-50 hover:bg-[#F0F7FB] text-[#016DAA] font-bold text-xs sm:text-sm transition-colors border border-gray-100"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 relative">
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-[#016DAA] uppercase tracking-wider">
                {activeArticle.category} • {activeArticle.readTime}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] mb-4 leading-tight">
                {activeArticle.title}
              </h2>

              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-64 object-cover rounded-2xl mb-6 shadow-sm"
              />

              <div className="prose max-w-none text-gray-700 space-y-4 text-sm sm:text-base leading-relaxed">
                {activeArticle.content.map((paragraph, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="font-medium text-gray-800">{paragraph}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-500">
                  Published by <strong className="text-[#016DAA]">Propel Properties Advisory Team</strong>
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#016DAA] text-white text-xs sm:text-sm font-bold shadow-sm"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
