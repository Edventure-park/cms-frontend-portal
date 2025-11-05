/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircle, Clock, XCircle, Edit, Activity, Eye, FileText, PenTool, Trash2, FolderOpen, Users, AlignLeft, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';


function BlogManagement() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [viewMode, setViewMode] = useState<'list' | 'create'>("list");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const API_BASE_PRIMARY = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8787";
  const API_BASE_FALLBACK = "http://localhost:8787";
  const [form, setForm] = useState({
    title: "",
    authorName: "",
    category: "",
    content: "",
    excerpt: "",
    slug: "",
    status: "draft" as 'draft' | 'published',
    tags: "",
  });
  const statusConfig = {
    delivered: { color: 'bg-green-900/50 text-green-300 border border-green-500/30', icon: CheckCircle },
    queued: { color: 'bg-blue-900/50 text-blue-300 border border-blue-500/30', icon: Clock },
    failed: { color: 'bg-red-900/50 text-red-300 border border-red-500/30', icon: XCircle },
    published: { color: 'bg-green-900/50 text-green-300 border border-green-500/30', icon: CheckCircle },
    draft: { color: 'bg-gray-700/50 text-gray-300 border border-gray-500/30', icon: Edit },
    processing: { color: 'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30', icon: Activity },
  };
  
  // ## Types ## \\
    type StatusType = keyof typeof statusConfig;
    type BlogPost = {
    id: number;
    title: string;
    author: string;
    status: StatusType;
    category: string;
  };

  const fetchData = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        let response = await fetch(`${API_BASE_PRIMARY}/blog/get-all`);
        if (!response.ok) {
          // retry with fallback host
          response = await fetch(`${API_BASE_FALLBACK}/blog/get-all`);
        }
        if (!response.ok) {
          throw new Error(`Load failed (${response.status})`);
        }
        const data = await response.json();

        if (data?.success && Array.isArray(data.data)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const fetchedPosts = data.data.map((post: any, idx: number) => {
            const rawStatus = (post?.status || 'draft').toString().toLowerCase();
            const safeStatus: StatusType = (['delivered','queued','failed','published','draft','processing'] as const).includes(rawStatus as any)
              ? (rawStatus as StatusType)
              : 'draft';

            return {
              id: typeof post?.id === 'number' ? post.id : idx + 1,
              title: post?.title || 'Untitled',
              author: post?.authorName || 'Unknown',
              status: safeStatus,
              category: post?.category || '',
            } as BlogPost;
          });

          setBlogPosts(fetchedPosts);
        } else {
          setErrorMessage(data?.message || 'Load failed: invalid response');
        }
      } catch (err: unknown) {
        setErrorMessage(err instanceof Error ? err.message : 'Load failed');
      } finally {
        setIsLoading(false);
      }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures it only runs once on component mount
    
  const getStatusBadge = (status: StatusType) => {
    const config = statusConfig[status] || statusConfig.queued;
    const StatusIcon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
        <StatusIcon className="h-3.5 w-3.5" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const blogData: BlogPost[] = blogPosts;

  const handleFormChange = (field: keyof typeof form, value: unknown) => {
    setForm(prev => ({ ...prev, [field]: value as never }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);
    try {
      const payload = {
        title: form.title,
        content: form.content,
        category: form.category,
        authorName: form.authorName,
        excerpt: form.excerpt || undefined,
        slug: form.slug || undefined,
        tags: form.tags || undefined,
        status: form.status,
        isPublished: form.status === 'published',
      };

      let res = await fetch(`${API_BASE_PRIMARY}/blog/create-post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        // retry on fallback host
        res = await fetch(`${API_BASE_FALLBACK}/blog/create-post`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || `Failed to create post (${res.status})`);
      }

      // Refresh list and go back
      await fetchData();
      setViewMode('list');
      setForm({
        title: "",
        authorName: "",
        category: "",
        content: "",
        excerpt: "",
        slug: "",
        status: "draft",
        tags: "",
      });
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ActionButtons = () => (
      <div className="flex items-center gap-1">
        <button className="p-2 hover:bg-emerald-500/10 rounded-lg transition-colors group" title="View">
          <Eye className="h-4 w-4 text-emerald-400 group-hover:text-emerald-300" />
        </button>
        <button className="p-2 hover:bg-cyan-500/10 rounded-lg transition-colors group" title="Edit">
          <Edit className="h-4 w-4 text-cyan-400 group-hover:text-cyan-300" />
        </button>
        <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group" title="Delete">
          <Trash2 className="h-4 w-4 text-red-400 group-hover:text-red-300" />
        </button>
      </div>
    );
  
  if (viewMode === 'create') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">Create Blog Post</h2>
            <p className="text-sm text-gray-400">Fill in the required details and publish/draft</p>
          </div>
          <button onClick={() => setViewMode('list')} className="flex items-center gap-2 px-6 py-3 bg-black/40 border border-gray-500/20 text-gray-300 rounded-xl hover:bg-gray-500/10 hover:border-gray-500/40 transition-all">Cancel</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-black/40 backdrop-blur-xl border border-emerald-500/20 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.15)] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <PenTool className="h-4 w-4 text-emerald-400" />
                  Title *
                </label>
                <input type="text" value={form.title} onChange={(e) => handleFormChange('title', e.target.value)} placeholder="Enter blog post title" className="w-full px-4 py-3 bg-black/40 border border-emerald-500/20 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white placeholder-gray-500 transition-all outline-none" required />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Users className="h-4 w-4 text-emerald-400" />
                  Author Name *
                </label>
                <input type="text" value={form.authorName} onChange={(e) => handleFormChange('authorName', e.target.value)} placeholder="Enter author name" className="w-full px-4 py-3 bg-black/40 border border-emerald-500/20 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white placeholder-gray-500 transition-all outline-none" required />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <FolderOpen className="h-4 w-4 text-blue-400" />
                  Category *
                </label>
                <input type="text" value={form.category} onChange={(e) => handleFormChange('category', e.target.value)} placeholder="e.g., technology, business" className="w-full px-4 py-3 bg-black/40 border border-blue-500/20 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-500 transition-all outline-none" required />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  Status *
                </label>
                <select value={form.status} onChange={(e) => handleFormChange('status', e.target.value as 'draft' | 'published')} className="w-full px-4 py-3 bg-black/40 border border-emerald-500/20 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white transition-all outline-none" required>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.15)] p-6">
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <AlignLeft className="h-4 w-4 text-cyan-400" />
                  Excerpt
                </label>
                <textarea value={form.excerpt} onChange={(e) => handleFormChange('excerpt', e.target.value)} placeholder="Short summary" rows={3} className="w-full px-4 py-3 bg-black/40 border border-cyan-500/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-500 transition-all outline-none resize-y" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <FileText className="h-4 w-4 text-cyan-400" />
                  Full Content *
                </label>
                <textarea value={form.content} onChange={(e) => handleFormChange('content', e.target.value)} placeholder="Write your blog content here" rows={10} className="w-full px-4 py-3 bg-black/40 border border-cyan-500/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-500 transition-all outline-none resize-y" required />
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.15)] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <FileText className="h-4 w-4 text-blue-400" />
                  Slug (optional)
                </label>
                <input type="text" value={form.slug} onChange={(e) => handleFormChange('slug', e.target.value)} placeholder="e.g., my-blog-post-title" className="w-full px-4 py-3 bg-black/40 border border-blue-500/20 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-500 transition-all outline-none" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Tag className="h-4 w-4 text-blue-400" />
                  Tags (comma-separated)
                </label>
                <input type="text" value={form.tags} onChange={(e) => handleFormChange('tags', e.target.value)} placeholder="e.g., react, cms, startup" className="w-full px-4 py-3 bg-black/40 border border-blue-500/20 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-500 transition-all outline-none" />
              </div>
            </div>
          </div>

          {submitError && <p className="text-red-400 text-sm">{submitError}</p>}

          <div className="flex flex-col sm:flex-row gap-4">
            <button type="submit" disabled={isSubmitting} className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white rounded-xl hover:from-emerald-500 hover:via-cyan-500 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
              <CheckCircle className="h-5 w-5" />
              <span>{isSubmitting ? 'Creating…' : 'Create Post'}</span>
            </button>
            <button type="button" onClick={() => setViewMode('list')} className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-black/40 border border-gray-500/20 text-gray-300 rounded-xl hover:bg-gray-500/10 hover:border-gray-500/40 transition-all">Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">Blog Management</h2>
          <p className="text-sm text-gray-400">Create and manage your content</p>
        </div>
        <button onClick={() => setViewMode('create')} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white rounded-xl hover:from-emerald-500 hover:via-cyan-500 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transform hover:scale-105">
          <PenTool className="h-5 w-5" />
          Create New Post
        </button>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-emerald-500/20 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.15)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-emerald-500/20 bg-black/30 backdrop-blur-sm">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Title</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Category</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Author</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr className="border-b border-emerald-500/10">
                  <td className="py-6 px-6 text-sm text-gray-400" colSpan={5}>Loading blogs...</td>
                </tr>
              )}
              {!isLoading && errorMessage && (
                <tr className="border-b border-emerald-500/10">
                  <td className="py-6 px-6 text-sm text-red-400" colSpan={5}>{errorMessage}</td>
                </tr>
              )}
              {!isLoading && !errorMessage && blogData.length === 0 && (
                <tr className="border-b border-emerald-500/10">
                  <td className="py-6 px-6 text-sm text-gray-400" colSpan={5}>No blogs found.</td>
                </tr>
              )}
              {!isLoading && !errorMessage && blogData.map((blog) => (
                <tr key={blog.id} className="border-b border-emerald-500/10 hover:bg-emerald-500/5 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                      <span className="text-sm font-medium text-white">{blog.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <FolderOpen className="h-4 w-4 text-cyan-400" />
                      <span>{blog.category || '-'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-300">{blog.author}</td>
                  <td className="py-4 px-6">{getStatusBadge(blog.status)}</td>
                  <td className="py-4 px-6"><ActionButtons /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BlogManagement;
