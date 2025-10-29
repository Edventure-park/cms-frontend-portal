/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  Users,
  TrendingUp,
  Mail,
  Eye,
  Search,
  Bell,
  Settings,
  LogOut,
  Edit,
  Trash2,
  Filter,
  PenTool,
  CheckCircle,
  XCircle,
  Clock,
  Menu,
  X,
  FileText,
  FolderTree,
  LayoutDashboard,
  MessageSquare,
  Image as ImageIcon,
  Send,
  Globe,
  Activity,
  Zap,
  Shield,
  Server,
  Database,
  AlertTriangle,
  ChevronRight,
  Download,
  Lock,
  LucideIcon
} from 'lucide-react';
import Image from 'next/image';

const EdventureDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const correctPassword = "1234"; 
  
  const handleLogin = (e:any) => {
    e.preventDefault();
    if (password === correctPassword) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  if (!authenticated) {
    return (
      <div className="relative flex h-screen items-center justify-center bg-gradient-to-br from-[#0a1f1a] via-[#0d2820] to-[#0f3528] overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="relative bg-gradient-to-br from-[#0d2820]/95 to-[#0a1f1a]/95 backdrop-blur-2xl shadow-[0_0_80px_rgba(16,185,129,0.3)] rounded-3xl p-10 w-full max-w-md border border-emerald-500/30"
        >
          {/* Top Icon */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-[0_0_40px_rgba(16,185,129,0.6)] border border-emerald-400/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent"></div>
              <Lock className="h-12 w-12 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] relative z-10" />
            </div>
            <h2 className="text-3xl font-extrabold text-emerald-100 mb-2 tracking-wide drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              Edventure Park CMS
            </h2>
            <p className="text-emerald-300 text-sm font-light">Startup Incubation Portal</p>
          </div>

          {/* Password Input */}
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 bg-[#0a1f1a]/80 border border-emerald-500/30 rounded-xl mb-4 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-emerald-100 placeholder-emerald-400/50 transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(16,185,129,0.3)] outline-none"
          />

          {/* Error Message */}
          {error && (
            <p className="text-red-400 text-sm mb-3 flex items-center gap-2 animate-pulse">
              <AlertTriangle className="h-4 w-4" />
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white rounded-xl transition-all font-semibold shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_rgba(16,185,129,0.8)] transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Access Dashboard
          </button>

          {/* Security Footer */}
          <div className="mt-6 text-center text-emerald-300 text-xs tracking-wide flex items-center justify-center gap-2">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span>Secured by encrypted authentication</span>
          </div>

          {/* Metallic Glow Ring */}
          <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 opacity-30 blur-md -z-10"></div>
        </form>
      </div>
    );
  }

  // Enhanced data with green theme
  const emailCampaignData = [
    { month: 'Jan', sent: 15420, delivered: 14890, opened: 8934, clicked: 3567 },
    { month: 'Feb', sent: 18240, delivered: 17650, opened: 10590, clicked: 4236 },
    { month: 'Mar', sent: 16890, delivered: 16320, opened: 9792, clicked: 3916 },
    { month: 'Apr', sent: 21340, delivered: 20610, opened: 12366, clicked: 4946 },
    { month: 'May', sent: 19560, delivered: 18890, opened: 11334, clicked: 4533 },
    { month: 'Jun', sent: 23780, delivered: 22980, opened: 13788, clicked: 5515 },
  ];

  const countryAnalytics = [
    { name: 'United States', value: 3245, color: '#10B981' },
    { name: 'United Kingdom', value: 2156, color: '#059669' },
    { name: 'India', value: 1876, color: '#34D399' },
    { name: 'Canada', value: 1543, color: '#6EE7B7' },
    { name: 'Australia', value: 1234, color: '#22C55E' },
    { name: 'Others', value: 2456, color: '#4ADE80' },
  ];

  const realtimeActivity = [
    { time: '14:45', users: 145 },
    { time: '14:50', users: 168 },
    { time: '14:55', users: 152 },
    { time: '15:00', users: 189 },
    { time: '15:05', users: 201 },
    { time: '15:10', users: 187 },
  ];

  const emailLogs: { 
    id: string;
    campaign: string;
    recipients: number;
    status: StatusType;
    queued: number;
    sent: number;
    failed: number;
    time: string;
    openRate: string;
  }[] = [
      { 
        id: '#EM-12847', 
        campaign: 'Startup Pitch Workshop', 
        recipients: 5432, 
        status: 'delivered', 
      queued: 5432,
      sent: 5432,
      failed: 0,
      time: '2024-10-29 14:30',
      openRate: '52%'
    },
    { 
      id: '#EM-12846', 
      campaign: 'Investor Connect Newsletter', 
      recipients: 8976, 
      status: 'queued', 
      queued: 8976,
      sent: 7234,
      failed: 12,
      time: '2024-10-29 14:15',
      openRate: '-'
    },
    { 
      id: '#EM-12845', 
      campaign: 'Funding Opportunity Alert', 
      recipients: 3421, 
      status: 'delivered', 
      queued: 3421,
      sent: 3421,
      failed: 0,
      time: '2024-10-29 13:45',
      openRate: '71%'
    },
    { 
      id: '#EM-12844', 
      campaign: 'Mentorship Program Invite', 
      recipients: 2156, 
      status: 'failed', 
      queued: 2156,
      sent: 1987,
      failed: 169,
      time: '2024-10-29 12:20',
      openRate: '-'
    },
  ];

  type BlogPost = {
    id: number;
    title: string;
    author: string;
    date: string;
    status: StatusType;
    views: number;
    comments: number;
  };
  
  const blogData: BlogPost[] = [
      { id: 1, title: 'Top 10 Strategies for Startup Success', author: 'Sarah Johnson', date: '2024-10-28', status: 'published', views: 8943, comments: 127 },
      { id: 2, title: 'Securing Seed Funding in 2024', author: 'Michael Chen', date: '2024-10-27', status: 'published', views: 6721, comments: 94 },
      { id: 3, title: 'Building a Scalable Business Model', author: 'Emma Wilson', date: '2024-10-26', status: 'draft', views: 0, comments: 0 },
      { id: 4, title: 'AI Tools for Modern Entrepreneurs', author: 'David Martinez', date: '2024-10-25', status: 'published', views: 12456, comments: 203 },
    ];

  const systemMetrics = [
    { name: 'API Requests', value: '1.2M', change: '+12%', icon: Activity, color: 'emerald' },
    { name: 'Load Balancer', value: '99.9%', change: '+0.1%', icon: Server, color: 'green' },
    { name: 'Rate Limit', value: '85%', change: '-5%', icon: Shield, color: 'teal' },
    { name: 'Database', value: '42GB', change: '+8%', icon: Database, color: 'lime' },
  ];

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'emails', label: 'Email Campaigns', icon: Mail },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'blogs', label: 'Blog Posts', icon: PenTool },
    { id: 'pages', label: 'Pages', icon: FileText },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { id: 'subscribers', label: 'Subscribers', icon: Users },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'ai-tools', label: 'AI Tools', icon: Zap },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const StatCard = ({ icon: Icon, title, value, change, color = "emerald", gradient = false }: { icon: LucideIcon, title: string, value: string, change?: string, color?: string, gradient?: boolean }) => (
    <div className={`${gradient ? 'bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-500' : 'bg-[#0d2820] border border-emerald-500/20'} rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.1)] p-6 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300 transform hover:scale-[1.02]`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`${gradient ? 'text-emerald-100' : 'text-emerald-300/80'} text-sm font-medium mb-1`}>{title}</p>
          <p className={`${gradient ? 'text-white' : 'text-emerald-100'} text-3xl font-bold mb-2`}>{value}</p>
          {change && (
            <p className={`text-sm font-medium flex items-center gap-1 ${gradient ? 'text-emerald-100' : change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
              <TrendingUp className="h-4 w-4" />
              {change} from last month
            </p>
          )}
        </div>
        <div className={`p-4 rounded-2xl ${gradient ? 'bg-white/20 backdrop-blur-sm' : 'bg-emerald-500/10'}`}>
          <Icon className={`h-8 w-8 ${gradient ? 'text-white' : 'text-emerald-400'}`} />
        </div>
      </div>
    </div>
  );

  const statusConfig = {
    delivered: { color: 'bg-green-900/50 text-green-300 border border-green-500/30', icon: CheckCircle },
    queued: { color: 'bg-blue-900/50 text-blue-300 border border-blue-500/30', icon: Clock },
    failed: { color: 'bg-red-900/50 text-red-300 border border-red-500/30', icon: XCircle },
    published: { color: 'bg-green-900/50 text-green-300 border border-green-500/30', icon: CheckCircle },
    draft: { color: 'bg-gray-700/50 text-gray-300 border border-gray-500/30', icon: Edit },
    processing: { color: 'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30', icon: Activity },
  };

  type StatusType = keyof typeof statusConfig;
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

  const ActionButtons = () => (
    <div className="flex items-center gap-1">
      <button className="p-2 hover:bg-emerald-500/10 rounded-lg transition-colors" title="View">
        <Eye className="h-4 w-4 text-emerald-400" />
      </button>
      <button className="p-2 hover:bg-emerald-500/10 rounded-lg transition-colors" title="Edit">
        <Edit className="h-4 w-4 text-emerald-400" />
      </button>
      <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete">
        <Trash2 className="h-4 w-4 text-red-400" />
      </button>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Mail} title="Total Emails Sent" value="124.5K" change="+18.2%" color="emerald" gradient />
        <StatCard icon={Users} title="Active Startups" value="248" change="+12.5%" color="green" />
        <StatCard icon={Eye} title="Portal Views" value="892.4K" change="+24.8%" color="teal" />
        <StatCard icon={Globe} title="Global Reach" value="127" change="+6 countries" color="lime" />
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric, index) => {
          const MetricIcon = metric.icon;
          return (
            <div key={index} className="bg-[#0d2820] border border-emerald-500/20 rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <MetricIcon className="h-5 w-5 text-emerald-400" />
                <span className={`text-xs font-medium ${metric.change.startsWith('+') ? 'text-green-400' : metric.change.startsWith('-') ? 'text-red-400' : 'text-emerald-400'}`}>
                  {metric.change}
                </span>
              </div>
              <p className="text-sm text-emerald-300/80 mb-1">{metric.name}</p>
              <p className="text-xl font-bold text-emerald-100">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Performance */}
        <div className="bg-[#0d2820] border border-emerald-500/20 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-emerald-100">Email Campaign Performance</h3>
            <Download className="h-5 w-5 text-emerald-400 cursor-pointer hover:text-emerald-300" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={emailCampaignData}>
                <defs>
                  <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOpened" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34D399" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#10B981" opacity={0.1} />
                <XAxis dataKey="month" stroke="#6EE7B7" fontSize={12} />
                <YAxis stroke="#6EE7B7" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0a1f1a', 
                    border: '1px solid rgba(16, 185, 129, 0.3)', 
                    borderRadius: '12px',
                    color: '#D1FAE5',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                  }} 
                />
                <Area type="monotone" dataKey="sent" stroke="#10B981" fillOpacity={1} fill="url(#colorSent)" strokeWidth={2} />
                <Area type="monotone" dataKey="opened" stroke="#34D399" fillOpacity={1} fill="url(#colorOpened)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-emerald-300">Sent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-sm text-emerald-300">Opened</span>
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-[#0d2820] border border-emerald-500/20 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-emerald-100">Traffic by Country</h3>
            <Globe className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={countryAnalytics}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {countryAnalytics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0a1f1a', 
                    border: '1px solid rgba(16, 185, 129, 0.3)', 
                    borderRadius: '12px',
                    color: '#D1FAE5'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {countryAnalytics.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-emerald-300">{item.name}</span>
                <span className="text-sm font-semibold text-emerald-100 ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-500 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold mb-1">Real-time Activity</h3>
            <p className="text-emerald-100 text-sm">Live user engagement tracking</p>
          </div>
          <Activity className="h-6 w-6 animate-pulse" />
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={realtimeActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" opacity={0.2} />
              <XAxis dataKey="time" stroke="#ffffff" fontSize={11} />
              <YAxis stroke="#ffffff" fontSize={11} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0a1f1a', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#D1FAE5'
                }} 
              />
              <Line type="monotone" dataKey="users" stroke="#ffffff" strokeWidth={3} dot={{ fill: '#ffffff', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Email Campaign Logs */}
      <div className="bg-[#0d2820] border border-emerald-500/20 rounded-2xl shadow-lg">
        <div className="p-6 border-b border-emerald-500/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-emerald-100 mb-1">Email Campaign Logs</h3>
              <p className="text-sm text-emerald-300/80">Real-time email delivery status and analytics</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-lg hover:from-emerald-500 hover:to-green-400 transition-all shadow-lg">
              <Send className="h-4 w-4" />
              New Campaign
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-emerald-500/20 bg-[#0a1f1a]">
                <th className="text-left py-4 px-6 text-sm font-semibold text-emerald-300">Campaign ID</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-emerald-300">Campaign Name</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-emerald-300">Recipients</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-emerald-300">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-emerald-300">Delivery</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-emerald-300">Open Rate</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-emerald-300">Time</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-emerald-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {emailLogs.map((log) => (
                <tr key={log.id} className="border-b border-emerald-500/10 hover:bg-emerald-500/5 transition-colors">
                  <td className="py-4 px-6 text-sm font-mono text-emerald-100">{log.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm font-medium text-emerald-100">{log.campaign}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-emerald-300">{log.recipients.toLocaleString()}</td>
                  <td className="py-4 px-6">{getStatusBadge(log.status)}</td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span>{log.sent.toLocaleString()} sent</span>
                      </div>
                      {log.failed > 0 && (
                        <div className="flex items-center gap-2 text-red-400 mt-1">
                          <XCircle className="h-3.5 w-3.5" />
                          <span>{log.failed} failed</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-semibold text-emerald-100">{log.openRate}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-emerald-300">{log.time}</td>
                  <td className="py-4 px-6"><ActionButtons /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBlogs = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-emerald-100 mb-1">Blog Management</h2>
          <p className="text-sm text-emerald-300/80">Create and manage your content</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-xl hover:from-emerald-500 hover:to-green-400 transition-all shadow-lg">
          <PenTool className="h-5 w-5" />
          Create New Post
        </button>
      </div>

      <div className="bg-[#0d2820] border border-emerald-500/20 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-emerald-500/20 bg-[#0a1f1a]">
                <th className="text-left py-4 px-6 text-sm font-semibold text-emerald-300">Title</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-emerald-300">Author</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-emerald-300">Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-emerald-300">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-emerald-300">Views</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-emerald-300">Comments</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-emerald-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogData.map((blog) => (
                <tr key={blog.id} className="border-b border-emerald-500/10 hover:bg-emerald-500/5 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm font-medium text-emerald-100">{blog.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-emerald-300">{blog.author}</td>
                  <td className="py-4 px-6 text-sm text-emerald-300">{blog.date}</td>
                  <td className="py-4 px-6">{getStatusBadge(blog.status)}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-emerald-100">
                      <Eye className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm">{blog.views.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-emerald-100">
                      <MessageSquare className="h-4 w-4 text-emerald-400" />
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
  );

  const renderGenericTab = (title:any, description:any, icon:any) => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-500 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] p-8 text-white text-center">
        <div className="flex justify-center mb-4">
          {React.createElement(icon, { className: "h-16 w-16" })}
        </div>
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-emerald-100">{description}</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return renderOverview();
      case 'blogs':
        return renderBlogs();
      case 'emails':
        return renderGenericTab('Email Campaigns', 'Manage and track your email marketing campaigns', Mail);
      case 'analytics':
        return renderGenericTab('Analytics Dashboard', 'Deep insights into user behavior and engagement', TrendingUp);
      case 'pages':
        return renderGenericTab('Page Management', 'Create and edit landing pages and content', FileText);
      case 'media':
        return renderGenericTab('Media Library', 'Upload and manage images, videos, and documents', ImageIcon);
      case 'categories':
        return renderGenericTab('Category Management', 'Organize content with custom categories', FolderTree);
      case 'subscribers':
        return renderGenericTab('Subscriber Management', 'View and manage your subscriber list', Users);
      case 'comments':
        return renderGenericTab('Comment Moderation', 'Review and moderate user comments', MessageSquare);
      case 'ai-tools':
        return renderGenericTab('AI-Powered Tools', 'Leverage AI for content generation and optimization', Zap);
      case 'settings':
        return renderGenericTab('System Settings', 'Configure your CMS preferences and integrations', Settings);
      default:
        return renderOverview();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0a1f1a] via-[#0d2820] to-[#0f3528] overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0a1f1a] border-r border-emerald-500/20 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-emerald-500/20">
            <div className="flex items-center gap-3">
              {/* <div className="w-10 h-10 flex items-center justify-center"> */}
                {/* <Zap className="h-6 w-6 text-white" /> */}
                <Image
                  alt="Edventure Park Logo"
                  width={62}
                  height={82} 
                  src="/logo.png"
                />
              {/* </div> */}
              <div>
                <h1 className="text-xl font-bold text-emerald-100">EVP</h1>
                <p className="text-xs text-emerald-400">CMS Platform</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-lg'
                      : 'text-emerald-300 hover:bg-emerald-500/10'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                  {activeTab === item.id && <ChevronRight className="h-4 w-4 ml-auto" />}
                </button>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-emerald-500/20">
            <button 
              onClick={() => setAuthenticated(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#0a1f1a] border-b border-emerald-500/20 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-emerald-500/10 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="h-6 w-6 text-emerald-400" /> : <Menu className="h-6 w-6 text-emerald-400" />}
              </button>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-emerald-100">
                  {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h2>
                <p className="text-sm text-emerald-300/80 hidden sm:block">Welcome back, Admin</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 lg:gap-4">
              <button className="relative p-2 hover:bg-emerald-500/10 rounded-lg transition-colors">
                <Search className="h-5 w-5 text-emerald-400" />
              </button>
              <button className="relative p-2 hover:bg-emerald-500/10 rounded-lg transition-colors">
                <Bell className="h-5 w-5 text-emerald-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-emerald-500/20">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default EdventureDashboard;