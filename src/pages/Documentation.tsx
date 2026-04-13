import { Search, Book, FileText, Layout, Shield, TrendingUp, HelpCircle, ChevronRight, ExternalLink, Activity, Layers } from 'lucide-react';
import { useState } from 'react';

const categories = [
  { id: 'getting-started', label: 'Getting Started', icon: <Book size={18} />, color: 'text-[#3b82f6]', bg: 'bg-[#eff6ff]' },
  { id: 'audit-features', label: 'Change Explorer', icon: <Shield size={18} />, color: 'text-[#10b981]', bg: 'bg-[#ecfdf5]' },
  { id: 'data-analysis', label: 'Data Analysis', icon: <TrendingUp size={18} />, color: 'text-[#f59e0b]', bg: 'bg-[#fffbeb]' },
  { id: 'system-admin', label: 'System Admin', icon: <Layout size={18} />, color: 'text-[#6366f1]', bg: 'bg-[#eef2ff]' },
];

const articles = [
  { id: 1, category: 'getting-started', title: 'Introduction to DHIS2 Audit Vision', description: 'Learn how to connect your instance and start auditing.', views: 1200 },
  { id: 2, category: 'audit-features', title: 'Understanding Change Explorer', description: 'Master the diffing tool and track metadata changes effectively.', views: 850 },
  { id: 3, category: 'audit-features', title: 'Security Audit Best Practices', description: 'How to use the security audit tool to protect your data.', views: 720 },
  { id: 4, category: 'data-analysis', title: 'Trends & Analytics Dashboard', description: 'Visualize your instance growth and usage patterns.', views: 640 },
  { id: 5, category: 'system-admin', title: 'Configuring Notifications', description: 'Set up automated alerts for high-risk changes.', views: 530 },
  { id: 6, category: 'getting-started', title: 'Supported DHIS2 Versions', description: 'Check compatibility for different DHIS2 versions.', views: 920 },
];

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Search & Hero */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-[#0f172a]">How can we help you today?</h2>
        <p className="text-[#64748b] text-lg">Search our documentation for answers to your questions.</p>
        <div className="max-w-2xl mx-auto relative mt-6">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search articles, guides, and tutorials..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[#e2e8f0] bg-white text-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/10 focus:border-[#3b82f6] transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-4 gap-5">
        {categories.map((cat) => (
          <a 
            key={cat.id} 
            href={`/docs/${cat.id === 'system-admin' ? 'security-audit' : cat.id}.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-2xl border border-[#e2e8f0] hover:border-[#3b82f6] hover:shadow-md transition-all text-left group cursor-pointer block"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${cat.bg} ${cat.color}`}>
              {cat.icon}
            </div>
            <h3 className="font-bold text-[#0f172a] mb-1">{cat.label}</h3>
            <p className="text-xs text-[#64748b]">12 articles</p>
          </a>
        ))}
      </div>

      {/* Popular Articles */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden">
        <div className="px-8 py-6 border-b border-[#e2e8f0] flex items-center justify-between">
          <h3 className="font-bold text-lg text-[#0f172a]">Popular Articles</h3>
          <a href="/docs/index.html" target="_blank" className="text-sm font-semibold text-[#3b82f6] hover:underline flex items-center gap-1 cursor-pointer">
            View All <ChevronRight size={16} />
          </a>
        </div>
        <div className="grid grid-cols-2 divide-x divide-[#f1f5f9]">
          <div className="divide-y divide-[#f1f5f9]">
            {articles.slice(0, 3).map((article) => (
              <a 
                key={article.id} 
                href={`/docs/${article.category === 'audit-features' ? 'audit-features' : 'getting-started'}.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-8 hover:bg-[#f8fafc] transition-colors cursor-pointer group block"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#0f172a] group-hover:text-[#3b82f6] transition-colors">{article.title}</h4>
                    <p className="text-sm text-[#64748b] line-clamp-2">{article.description}</p>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest mt-4">
                      <span className="flex items-center gap-1"><FileText size={12} /> Article</span>
                      <span className="flex items-center gap-1"><HelpCircle size={12} /> {article.views} views</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="divide-y divide-[#f1f5f9]">
            {articles.slice(3, 6).map((article) => (
              <a 
                key={article.id} 
                href={`/docs/${article.category === 'data-analysis' ? 'data-analysis' : 'security-audit'}.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-8 hover:bg-[#f8fafc] transition-colors cursor-pointer group block"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#0f172a] group-hover:text-[#3b82f6] transition-colors">{article.title}</h4>
                    <p className="text-sm text-[#64748b] line-clamp-2">{article.description}</p>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest mt-4">
                      <span className="flex items-center gap-1"><FileText size={12} /> Article</span>
                      <span className="flex items-center gap-1"><HelpCircle size={12} /> {article.views} views</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* External Resources */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#3b82f6] to-[#2563eb] p-8 rounded-2xl text-white relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h3 className="text-xl font-bold">Community Support</h3>
            <p className="text-white/80">Join our community forum to discuss features and best practices with other users.</p>
            <button className="bg-white text-[#3b82f6] px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-white/90 transition-colors cursor-pointer">
              Visit Forum <ExternalLink size={16} />
            </button>
          </div>
          <Shield size={120} className="absolute -right-8 -bottom-8 text-white/10 rotate-12" />
        </div>
        <div className="bg-[#0f172a] p-8 rounded-2xl text-white relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h3 className="text-xl font-bold">API Reference</h3>
            <p className="text-white/80">Explore our API documentation to integrate DHIS2 Audit Vision with your own tools.</p>
            <button className="bg-[#3b82f6] text-white px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#3b82f6]/90 transition-colors cursor-pointer">
              Read API Docs <ExternalLink size={16} />
            </button>
          </div>
          <Activity size={120} className="absolute -right-8 -bottom-8 text-white/10 rotate-12" />
        </div>
      </div>
    </div>
  );
}
