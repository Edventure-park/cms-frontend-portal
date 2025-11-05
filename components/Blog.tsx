/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircle, Clock, XCircle, Edit, Activity, Eye, FileText, PenTool, Trash2, FolderOpen, Users, AlignLeft, Tag, Image as ImageIcon, Calendar, Link, Star, Search, X, Globe, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

type StatusType = 'delivered' | 'queued' | 'failed' | 'published' | 'draft' | 'processing';

type BlogPost = {
  id: number;
  blogId: string;
  title: string;
  author: string;
  status: StatusType;
  category: string;
};

type FormData = {
  title: string;
  authorName: string;
  category: string;
  content: string;
  excerpt: string;
  slug: string;
  status: 'draft' | 'published';
  tags: string;
  featuredImage: string;
  featuredImageAltText: string;
  isFeatured: boolean;
  isPublished: boolean;
  seoTitle: string;
  seoDescription: string;
  scheduledAt: string;
  authorBio: string;
  authorProfileImage: string;
  relatedBlogs: string[];
  externalUrl: string;
};

const API_BASE_PRIMARY = "http://127.0.0.1:8787";
const API_BASE_FALLBACK = "http://localhost:8787";

const initialFormState: FormData = {
  title: "",
  authorName: "",
  category: "",
  content: "",
  excerpt: "",
  slug: "",
  status: "draft",
  tags: "",
  featuredImage: "",
  featuredImageAltText: "",
  isFeatured: false,
  isPublished: false,
  seoTitle: "",
  seoDescription: "",
  scheduledAt: "",
  authorBio: "",
  authorProfileImage: "",
  relatedBlogs: [],
  externalUrl: "",
};

const statusConfig = {
  delivered: { color: 'bg-green-900/50 text-green-300 border-green-500/30', icon: CheckCircle },
  queued: { color: 'bg-blue-900/50 text-blue-300 border-blue-500/30', icon: Clock },
  failed: { color: 'bg-red-900/50 text-red-300 border-red-500/30', icon: XCircle },
  published: { color: 'bg-green-900/50 text-green-300 border-green-500/30', icon: CheckCircle },
  draft: { color: 'bg-gray-700/50 text-gray-300 border-gray-500/30', icon: Edit },
  processing: { color: 'bg-yellow-900/50 text-yellow-300 border-yellow-500/30', icon: Activity },
};

function BlogManagement() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'update'>("list");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [selectedBlogId, setSelectedBlogId] = useState<string>("");
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [relatedBlogSearch, setRelatedBlogSearch] = useState<string>("");
  const [form, setForm] = useState<FormData>(initialFormState);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      let response = await fetch(`${API_BASE_PRIMARY}/blog/get-all`);
      if (!response.ok) {
        response = await fetch(`${API_BASE_FALLBACK}/blog/get-all`);
      }
      if (!response.ok) {
        throw new Error(`Load failed (${response.status})`);
      }
      const data = await response.json();

      if (data?.success && Array.isArray(data.data)) {
        const fetchedPosts = data.data.map((post: any, idx: number) => {
          const rawStatus = (post?.status || 'draft').toString().toLowerCase();
          const safeStatus: StatusType = (['delivered','queued','failed','published','draft','processing'] as const).includes(rawStatus as any)
            ? (rawStatus as StatusType)
            : 'draft';

          return {
            id: typeof post?.id === 'number' ? post.id : idx + 1,
            blogId: post?.blogId || '',
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
  }, []);
    
  const getStatusBadge = (status: StatusType) => {
    const config = statusConfig[status] || statusConfig.queued;
    const StatusIcon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${config.color} backdrop-blur-sm`}>
        <StatusIcon className="h-3.5 w-3.5" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleFormChange = (field: keyof FormData, value: unknown) => {
    setForm(prev => ({ ...prev, [field]: value as never }));
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (field: 'featuredImage' | 'authorProfileImage', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await convertImageToBase64(file);
        handleFormChange(field, base64);
      } catch (err) {
        setSubmitError('Failed to process image');
      }
    }
  };

  const loadBlogForEdit = async (blogId: string) => {
    try {
      setIsLoading(true);
      setSubmitError("");
      setViewMode('update');
      
      let response = await fetch(`${API_BASE_PRIMARY}/blog/get-by-id/${blogId}`);
      if (!response.ok) {
        response = await fetch(`${API_BASE_FALLBACK}/blog/get-by-id/${blogId}`);
      }
      if (!response.ok) {
        throw new Error(`Failed to load blog (${response.status})`);
      }
      const data = await response.json();
      
      if (data?.success && data.data) {
        const blog = data.data;
        setForm({
          title: blog.title || "",
          authorName: blog.authorName || "",
          category: blog.category || "",
          content: blog.content || "",
          excerpt: blog.excerpt || "",
          slug: blog.slug || "",
          status: (blog.status || 'draft') as 'draft' | 'published',
          tags: blog.tags || "",
          featuredImage: blog.featuredImage || "",
          featuredImageAltText: blog.featuredImageAltText || "",
          isFeatured: blog.isFeatured || false,
          isPublished: blog.isPublished || false,
          seoTitle: blog.seoTitle || "",
          seoDescription: blog.seoDescription || "",
          scheduledAt: blog.scheduledAt ? new Date(blog.scheduledAt).toISOString().slice(0, 16) : "",
          authorBio: blog.authorBio || "",
          authorProfileImage: blog.authorProfileImage || "",
          relatedBlogs: blog.relatedBlogs ? (typeof blog.relatedBlogs === 'string' ? JSON.parse(blog.relatedBlogs) : blog.relatedBlogs) : [],
          externalUrl: blog.externalUrl || "",
        });
        setSelectedBlogId(blogId);
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to load blog');
      setViewMode('list');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);
    
    const isEditMode = viewMode === 'update';
    const endpoint = isEditMode ? `/blog/update/${selectedBlogId}` : '/blog/create-post';
    const method = isEditMode ? 'PATCH' : 'POST';
    
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
        isPublished: form.status === 'published' || form.isPublished,
        ...(isEditMode && {
          featuredImage: form.featuredImage || undefined,
          featuredImageAltText: form.featuredImageAltText || undefined,
          isFeatured: form.isFeatured,
          seoTitle: form.seoTitle || undefined,
          seoDescription: form.seoDescription || undefined,
          scheduledAt: form.scheduledAt || undefined,
          authorBio: form.authorBio || undefined,
          authorProfileImage: form.authorProfileImage || undefined,
          relatedBlogs: form.relatedBlogs.length > 0 ? JSON.stringify(form.relatedBlogs) : undefined,
          externalUrl: form.externalUrl || undefined,
        }),
      };

      let res = await fetch(`${API_BASE_PRIMARY}${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        res = await fetch(`${API_BASE_FALLBACK}${endpoint}`, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || `Failed to ${isEditMode ? 'update' : 'create'} post (${res.status})`);
      }

      await fetchData();
      setViewMode('list');
      resetForm();
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : `Failed to ${isEditMode ? 'update' : 'create'} post`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm(initialFormState);
    setSelectedBlogId("");
    setShowPreview(false);
    setRelatedBlogSearch("");
    setSubmitError("");
  };

  const handleDelete = async (blogId: string) => {
    setIsDeleting(true);
    setSubmitError("");
    
    try {
      let res = await fetch(`${API_BASE_PRIMARY}/blog/delete/${blogId}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        res = await fetch(`${API_BASE_FALLBACK}/blog/delete/${blogId}`, {
          method: 'DELETE',
        });
      }
      
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || `Failed to delete post (${res.status})`);
      }

      await fetchData();
      setDeleteConfirmId(null);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  const ActionButtons = ({ blogId }: { blogId: string }) => (
    <div className="flex items-center gap-1.5">
      <button 
        className="p-2 hover:bg-emerald-500/10 rounded-lg transition-all duration-200 group" 
        title="View"
      >
        <Eye className="h-4 w-4 text-emerald-400 group-hover:text-emerald-300 group-hover:scale-110 transition-transform" />
      </button>
      <button 
        onClick={() => loadBlogForEdit(blogId)} 
        className="p-2 hover:bg-cyan-500/10 rounded-lg transition-all duration-200 group" 
        title="Edit"
      >
        <Edit className="h-4 w-4 text-cyan-400 group-hover:text-cyan-300 group-hover:scale-110 transition-transform" />
      </button>
      <button 
        onClick={() => setDeleteConfirmId(blogId)}
        className="p-2 hover:bg-red-500/10 rounded-lg transition-all duration-200 group" 
        title="Delete"
      >
        <Trash2 className="h-4 w-4 text-red-400 group-hover:text-red-300 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );

  const addRelatedBlog = (blogId: string) => {
    if (!form.relatedBlogs.includes(blogId)) {
      handleFormChange('relatedBlogs', [...form.relatedBlogs, blogId]);
    }
    setRelatedBlogSearch("");
  };

  const removeRelatedBlog = (blogId: string) => {
    handleFormChange('relatedBlogs', form.relatedBlogs.filter(id => id !== blogId));
  };

  const filteredBlogs = blogPosts.filter(blog => 
    relatedBlogSearch && 
    blog.title.toLowerCase().includes(relatedBlogSearch.toLowerCase()) &&
    blog.blogId !== selectedBlogId &&
    !form.relatedBlogs.includes(blog.blogId)
  );

  const renderMarkdownPreview = (markdown: string) => {
    return markdown
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4 text-emerald-400">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mb-3 text-cyan-400">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mb-2 text-blue-400">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-emerald-300">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-emerald-500 pl-4 italic text-gray-400 my-2">$1</blockquote>')
      .replace(/\n/g, '<br/>');
  };
  
  if (viewMode === 'create' || viewMode === 'update') {
    const isEditMode = viewMode === 'update';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl border border-emerald-500/30 backdrop-blur-sm">
                {isEditMode ? <Edit className="h-6 w-6 text-emerald-400" /> : <PenTool className="h-6 w-6 text-emerald-400" />}
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">
                  {isEditMode ? 'Edit Blog Post' : 'Create New Post'}
                </h2>
                <p className="text-sm text-gray-400">
                  {isEditMode ? 'Update your blog content and settings' : 'Fill in the details and publish your content'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => { setViewMode('list'); resetForm(); }} 
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-800/60 border border-slate-700/50 text-gray-300 rounded-xl hover:bg-slate-800 hover:border-slate-600/50 transition-all duration-200 text-sm"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-xl border border-emerald-500/20 rounded-2xl shadow-2xl shadow-emerald-500/10 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-semibold text-emerald-400">Basic Information</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <PenTool className="h-4 w-4 text-emerald-400" />
                    Title <span className="text-red-400">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={form.title} 
                    onChange={(e) => handleFormChange('title', e.target.value)} 
                    placeholder="Enter an engaging blog title" 
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white placeholder-slate-500 transition-all outline-none" 
                    required 
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <Users className="h-4 w-4 text-emerald-400" />
                    Author Name <span className="text-red-400">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={form.authorName} 
                    onChange={(e) => handleFormChange('authorName', e.target.value)} 
                    placeholder="Enter author name" 
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white placeholder-slate-500 transition-all outline-none" 
                    required 
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <FolderOpen className="h-4 w-4 text-cyan-400" />
                    Category <span className="text-red-400">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={form.category} 
                    onChange={(e) => handleFormChange('category', e.target.value)} 
                    placeholder="e.g., Technology, Business" 
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-slate-500 transition-all outline-none" 
                    required 
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    Status <span className="text-red-400">*</span>
                  </label>
                  <select 
                    value={form.status} 
                    onChange={(e) => handleFormChange('status', e.target.value as 'draft' | 'published')} 
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white transition-all outline-none" 
                    required
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <Tag className="h-4 w-4 text-blue-400" />
                    Tags (comma-separated)
                  </label>
                  <input 
                    type="text" 
                    value={form.tags} 
                    onChange={(e) => handleFormChange('tags', e.target.value)} 
                    placeholder="e.g., react, cms, startup" 
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-slate-500 transition-all outline-none" 
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <FileText className="h-4 w-4 text-blue-400" />
                    Slug
                  </label>
                  <input 
                    type="text" 
                    value={form.slug} 
                    onChange={(e) => handleFormChange('slug', e.target.value)} 
                    placeholder="e.g., my-blog-post-title" 
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-slate-500 transition-all outline-none" 
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <Globe className="h-4 w-4 text-purple-400" />
                    External URL
                  </label>
                  <input 
                    type="url" 
                    value={form.externalUrl} 
                    onChange={(e) => handleFormChange('externalUrl', e.target.value)} 
                    placeholder="https://example.com" 
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-slate-500 transition-all outline-none" 
                  />
                </div>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={form.isPublished} 
                      onChange={(e) => handleFormChange('isPublished', e.target.checked)} 
                      className="w-5 h-5 rounded bg-slate-900/50 border-emerald-500/30 text-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all" 
                    />
                    <span className="text-sm text-gray-300 group-hover:text-emerald-300 transition-colors">Published</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={form.isFeatured} 
                      onChange={(e) => handleFormChange('isFeatured', e.target.checked)} 
                      className="w-5 h-5 rounded bg-slate-900/50 border-yellow-500/30 text-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all" 
                    />
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-gray-300 group-hover:text-yellow-300 transition-colors">Featured</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-500/10 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="h-5 w-5 text-cyan-400" />
                <h3 className="text-lg font-semibold text-cyan-400">Content</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <AlignLeft className="h-4 w-4 text-cyan-400" />
                    Excerpt
                  </label>
                  <textarea 
                    value={form.excerpt} 
                    onChange={(e) => handleFormChange('excerpt', e.target.value)} 
                    placeholder="Short summary of the blog post" 
                    rows={3} 
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-slate-500 transition-all outline-none resize-y" 
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                      <FileText className="h-4 w-4 text-cyan-400" />
                      Full Content (Markdown) <span className="text-red-400">*</span>
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setShowPreview(!showPreview)} 
                      className="flex items-center gap-2 text-xs px-3 py-1.5 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-all duration-200 border border-cyan-500/30"
                    >
                      {showPreview ? <Edit className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      {showPreview ? 'Edit' : 'Preview'}
                    </button>
                  </div>
                  {!showPreview ? (
                    <textarea 
                      value={form.content} 
                      onChange={(e) => handleFormChange('content', e.target.value)} 
                      placeholder="Write your blog content in Markdown format..." 
                      rows={16} 
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-slate-500 transition-all outline-none resize-y font-mono text-sm" 
                      required 
                    />
                  ) : (
                    <div className="w-full min-h-[400px] px-6 py-4 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white overflow-auto">
                      <div dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(form.content) }} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isEditMode && (
              <>
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-2xl shadow-purple-500/10 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <ImageIcon className="h-5 w-5 text-purple-400" />
                    <h3 className="text-lg font-semibold text-purple-400">Media & Images</h3>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <ImageIcon className="h-4 w-4 text-purple-400" />
                        Featured Image
                      </label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload('featuredImage', e)} 
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white transition-all outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30 file:transition-all" 
                      />
                      {form.featuredImage && (
                        <div className="mt-3 relative group">
                          <img 
                            src={form.featuredImage} 
                            alt="Featured preview" 
                            className="w-full h-40 object-cover rounded-xl border border-purple-500/30" 
                          />
                          <button 
                            type="button" 
                            onClick={() => handleFormChange('featuredImage', '')} 
                            className="absolute top-2 right-2 p-1.5 bg-red-500/90 hover:bg-red-500 rounded-full transition-all opacity-0 group-hover:opacity-100"
                          >
                            <X className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <AlignLeft className="h-4 w-4 text-purple-400" />
                        Featured Image Alt Text
                      </label>
                      <input 
                        type="text" 
                        value={form.featuredImageAltText} 
                        onChange={(e) => handleFormChange('featuredImageAltText', e.target.value)} 
                        placeholder="Describe the image for accessibility" 
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-slate-500 transition-all outline-none" 
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <Users className="h-4 w-4 text-purple-400" />
                        Author Profile Image
                      </label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload('authorProfileImage', e)} 
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white transition-all outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30 file:transition-all" 
                      />
                      {form.authorProfileImage && (
                        <div className="mt-3 relative inline-block group">
                          <img 
                            src={form.authorProfileImage} 
                            alt="Author preview" 
                            className="w-24 h-24 object-cover rounded-full border-2 border-purple-500/30" 
                          />
                          <button 
                            type="button" 
                            onClick={() => handleFormChange('authorProfileImage', '')} 
                            className="absolute -top-1 -right-1 p-1.5 bg-red-500/90 hover:bg-red-500 rounded-full transition-all opacity-0 group-hover:opacity-100"
                          >
                            <X className="h-3 w-3 text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <AlignLeft className="h-4 w-4 text-purple-400" />
                        Author Bio
                      </label>
                      <textarea 
                        value={form.authorBio} 
                        onChange={(e) => handleFormChange('authorBio', e.target.value)} 
                        placeholder="Brief bio about the author" 
                        rows={3} 
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-slate-500 transition-all outline-none resize-y" 
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-xl border border-blue-500/20 rounded-2xl shadow-2xl shadow-blue-500/10 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Search className="h-5 w-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-blue-400">SEO Settings</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <FileText className="h-4 w-4 text-blue-400" />
                        SEO Title
                      </label>
                      <input 
                        type="text" 
                        value={form.seoTitle} 
                        onChange={(e) => handleFormChange('seoTitle', e.target.value)} 
                        placeholder="SEO optimized title" 
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-slate-500 transition-all outline-none" 
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <AlignLeft className="h-4 w-4 text-blue-400" />
                        SEO Description
                      </label>
                      <textarea 
                        value={form.seoDescription} 
                        onChange={(e) => handleFormChange('seoDescription', e.target.value)} 
                        placeholder="Meta description for search engines" 
                        rows={3} 
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-slate-500 transition-all outline-none resize-y" 
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-xl border border-yellow-500/20 rounded-2xl shadow-2xl shadow-yellow-500/10 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Calendar className="h-5 w-5 text-yellow-400" />
                    <h3 className="text-lg font-semibold text-yellow-400">Publishing Options</h3>
                  </div>
                  {!form.isPublished && (
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <Calendar className="h-4 w-4 text-yellow-400" />
                        Schedule Publication
                      </label>
                      <input 
                        type="datetime-local" 
                        value={form.scheduledAt} 
                        onChange={(e) => handleFormChange('scheduledAt', e.target.value)} 
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 text-white transition-all outline-none" 
                      />
                      <p className="text-xs text-slate-500 mt-2">Leave empty to publish immediately when status is set to published</p>
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-xl border border-indigo-500/20 rounded-2xl shadow-2xl shadow-indigo-500/10 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Link className="h-5 w-5 text-indigo-400" />
                    <h3 className="text-lg font-semibold text-indigo-400">Related Blogs</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <Search className="h-4 w-4 text-indigo-400" />
                        Search and Add Related Blogs
                      </label>
                      <input 
                        type="text" 
                        value={relatedBlogSearch} 
                        onChange={(e) => setRelatedBlogSearch(e.target.value)} 
                        placeholder="Search for blogs to link..." 
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-white placeholder-slate-500 transition-all outline-none" 
                      />
                      {relatedBlogSearch && filteredBlogs.length > 0 && (
                        <div className="absolute z-10 w-full mt-2 bg-slate-900/95 backdrop-blur-xl border border-indigo-500/30 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
                          {filteredBlogs.slice(0, 5).map((blog) => (
                            <button 
                              key={blog.blogId} 
                              type="button" 
                              onClick={() => addRelatedBlog(blog.blogId)} 
                              className="w-full px-4 py-3 text-left hover:bg-indigo-500/10 transition-all duration-200 border-b border-indigo-500/10 last:border-b-0"
                            >
                              <div className="text-sm font-medium text-white">{blog.title}</div>
                              <div className="text-xs text-slate-400 mt-1">{blog.category}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {form.relatedBlogs.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-300">Selected Related Blogs:</p>
                        <div className="flex flex-wrap gap-2">
                          {form.relatedBlogs.map((blogId) => {
                            const blog = blogPosts.find(b => b.blogId === blogId);
                            return (
                              <div 
                                key={blogId} 
                                className="flex items-center gap-2 px-3 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-lg hover:bg-indigo-500/25 transition-all"
                              >
                                <span className="text-sm text-indigo-300">{blog?.title || blogId}</span>
                                <button 
                                  type="button" 
                                  onClick={() => removeRelatedBlog(blogId)} 
                                  className="p-1 hover:bg-indigo-500/30 rounded transition-all"
                                >
                                  <X className="h-3 w-3 text-indigo-300" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {submitError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
                <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{submitError}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 sticky bottom-4 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl">
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white rounded-xl hover:from-emerald-500 hover:via-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-medium"
              >
                <CheckCircle className="h-5 w-5" />
                <span>{isSubmitting ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Post' : 'Create Post')}</span>
              </button>
              <button 
                type="button" 
                onClick={() => { setViewMode('list'); resetForm(); }} 
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-slate-800/60 border border-slate-700/50 text-gray-300 rounded-xl hover:bg-slate-800 hover:border-slate-600/50 transition-all font-medium"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl border border-emerald-500/30 backdrop-blur-sm">
              <FileText className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">Blog Management</h2>
              <p className="text-sm text-slate-400">Create and manage your content</p>
            </div>
          </div>
          <button 
            onClick={() => setViewMode('create')} 
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white rounded-xl hover:from-emerald-500 hover:via-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:scale-105 font-medium"
          >
            <PenTool className="h-5 w-5" />
            <span className="hidden sm:inline">Create New Post</span>
            <span className="sm:hidden">Create</span>
          </button>
        </div>

        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-xl border border-emerald-500/20 rounded-2xl shadow-2xl shadow-emerald-500/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-emerald-500/20 bg-slate-900/60">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300 w-2/5">Title</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Category</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Author</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td className="py-12 px-6 text-center" colSpan={5}>
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-8 h-8 border-3 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm text-slate-400">Loading blogs...</p>
                      </div>
                    </td>
                  </tr>
                )}
                {!isLoading && errorMessage && (
                  <tr>
                    <td className="py-12 px-6 text-center" colSpan={5}>
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="p-3 bg-red-500/10 rounded-full">
                          <XCircle className="h-8 w-8 text-red-400" />
                        </div>
                        <p className="text-sm text-red-400">{errorMessage}</p>
                      </div>
                    </td>
                  </tr>
                )}
                {!isLoading && !errorMessage && blogPosts.length === 0 && (
                  <tr>
                    <td className="py-12 px-6 text-center" colSpan={5}>
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="p-4 bg-slate-800/50 rounded-2xl">
                          <FileText className="h-12 w-12 text-slate-600" />
                        </div>
                        <div>
                          <p className="text-slate-400 mb-1">No blogs found</p>
                          <p className="text-sm text-slate-500">Create your first blog post to get started!</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
                {!isLoading && !errorMessage && blogPosts.map((blog, index) => (
                  <tr 
                    key={blog.id} 
                    className="border-b border-emerald-500/10 hover:bg-emerald-500/5 transition-all duration-200 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-all">
                          <FileText className="h-4 w-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                        </div>
                        <span className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors truncate max-w-xs">{blog.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <FolderOpen className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                        <span className="text-sm text-slate-300 truncate">{blog.category || '-'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
                          <Users className="h-3.5 w-3.5 text-purple-400" />
                        </div>
                        <span className="text-sm text-slate-300 truncate">{blog.author}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(blog.status)}</td>
                    <td className="py-4 px-6"><ActionButtons blogId={blog.blogId} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {!isLoading && !errorMessage && blogPosts.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl">
            <p className="text-sm text-slate-400">
              Showing <span className="font-semibold text-emerald-400">{blogPosts.length}</span> blog{blogPosts.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>

      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-red-500/30 rounded-2xl shadow-2xl shadow-red-500/20 max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-500/10 rounded-full">
                <Trash2 className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Delete Blog Post</h3>
            </div>
            
            <p className="text-slate-300 mb-6">
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>

            {submitError && (
              <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{submitError}</p>
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setDeleteConfirmId(null);
                  setSubmitError("");
                }}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600/50 text-slate-300 rounded-xl hover:bg-slate-700 hover:border-slate-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-500 hover:to-red-600 transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogManagement;