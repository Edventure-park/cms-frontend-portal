import { CheckCircle, Clock, XCircle, Edit, Activity, Eye, FileText, MessageSquare, PenTool, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';


function BlogManagement() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
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
    date: string;
    status: StatusType;
    views: number;
    comments: number;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:8787/blog/get-all");
      const data = await response.json();

      if (data.success) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fetchedPosts = data.data.map((post: any) => ({
          id: post.id, 
          title: post.title,
          author: post.authorName,
          date: post.createdAt,
          status: post.status as StatusType, // Ensure the status is a valid StatusType
          views: post.views,
          comments: post.comments,
        }));

        setBlogPosts(fetchedPosts);
      }
    };

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
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">Blog Management</h2>
          <p className="text-sm text-gray-400">Create and manage your content</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white rounded-xl hover:from-emerald-500 hover:via-cyan-500 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transform hover:scale-105">
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
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Author</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Views</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Comments</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogData.map((blog) => (
                <tr key={blog.id} className="border-b border-emerald-500/10 hover:bg-emerald-500/5 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                      <span className="text-sm font-medium text-white">{blog.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-300">{blog.author}</td>
                  <td className="py-4 px-6 text-sm text-gray-300">{blog.date}</td>
                  <td className="py-4 px-6">{getStatusBadge(blog.status)}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-white">
                      <Eye className="h-4 w-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                      <span className="text-sm">{blog.views.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-white">
                      <MessageSquare className="h-4 w-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                      <span className="text-sm">{blog.comments}</span>
                    </div>
                  </td>
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
