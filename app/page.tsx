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
  EyeOff,
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
  LucideIcon,
  Calendar,
  Tag,
  FolderOpen,
  FileUp,
  Upload,
  AtSign,
  AlignLeft
} from 'lucide-react';
import Image from 'next/image';
import BlogManagement from '../components/Blog';
import MailManagement from '../components/Mail';

const EdventureDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Email Campaign State
  const [emailCampaign, setEmailCampaign] = useState({
    subject: '',
    body: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    bulkEmails: '',
    scheduledAt: '',
    sendImmediately: true
  });

  type StatusType = 'delivered' | 'queued' | 'failed' | 'published' | 'draft' | 'processing';

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
      <div className="relative flex h-screen items-center justify-center bg-linear-to-br from-slate-950 via-gray-950 to-black overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Cool Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-emerald-400/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="relative bg-black/60 backdrop-blur-xl shadow-[0_0_60px_rgba(34,197,94,0.15)] rounded-3xl p-10 w-full max-w-md border border-emerald-500/20"
        >
          {/* Top Icon */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-linear-to-br from-emerald-600 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-[0_0_40px_rgba(34,197,94,0.4)] border border-emerald-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-t from-transparent via-white/10 to-transparent"></div>
              <Lock className="h-12 w-12 text-emerald-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)] relative z-10" />
            </div>
            <h2 className="text-3xl font-extrabold bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2 tracking-wide">
              Edventure Park CMS
            </h2>
            <p className="text-gray-400 text-sm font-light">Startup Incubation Portal</p>
          </div>

          {/* Password Input */}
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 bg-black/40 border border-emerald-500/20 rounded-xl mb-4 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-gray-100 placeholder-gray-500 transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] outline-none hover:border-emerald-500/40"
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
            className="w-full py-4 bg-linear-to-r from-emerald-600 via-cyan-600 to-blue-600 hover:from-emerald-500 hover:via-cyan-500 hover:to-blue-500 text-white rounded-xl transition-all font-semibold shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
          >
            <span className="relative z-10">Access Dashboard</span>
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Security Footer */}
          <div className="mt-6 text-center text-gray-400 text-xs tracking-wide flex items-center justify-center gap-2">
            <Shield className="h-4 w-4 text-emerald-500" />
            <span>Secured by encrypted authentication</span>
          </div>

          {/* Subtle Glow Ring */}
          <div className="absolute -inset-0.5 rounded-3xl bg-linear-to-r from-emerald-500/30 via-cyan-500/30 to-blue-500/30 opacity-20 blur-md -z-10"></div>
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
    { name: 'United Kingdom', value: 2156, color: '#06B6D4' },
    { name: 'India', value: 1876, color: '#3B82F6' },
    { name: 'Canada', value: 1543, color: '#14B8A6' },
    { name: 'Australia', value: 1234, color: '#22C55E' },
    { name: 'Others', value: 2456, color: '#34D399' },
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

  const systemMetrics = [
    { name: 'API Requests', value: '1.2M', change: '+12%', icon: Activity, color: 'emerald' },
    { name: 'Load Balancer', value: '99.9%', change: '+0.1%', icon: Server, color: 'green' },
    { name: 'Rate Limit', value: '85%', change: '-5%', icon: Shield, color: 'teal' },
    { name: 'Database', value: '42GB', change: '+8%', icon: Database, color: 'lime' },
  ];

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'emails', label: 'Email Campaigns', icon: Mail },
    { id: 'mail-servers', label: 'Mail Servers', icon: TrendingUp },
    { id: 'blogs', label: 'Blog Posts', icon: PenTool },
    { id: 'pages', label: 'Pages', icon: FileText },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { id: 'subscribers', label: 'Subscribers', icon: Users },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'ai-tools', label: 'AI Tools', icon: Zap },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const StatCard = ({ icon: Icon, title, value, change, color = "emerald", gradient = false, gradientIndex = 0 }: { icon: LucideIcon, title: string, value: string, change?: string, color?: string, gradient?: boolean, gradientIndex?: number }) => {
    const gradients = [
      'from-emerald-600 via-cyan-600 to-blue-600',
      'from-blue-600 via-emerald-500 to-cyan-600',
      'from-cyan-600 via-blue-500 to-emerald-600',
      'from-emerald-600 via-teal-600 to-cyan-600',
    ];
    const gradientClass = gradients[gradientIndex % gradients.length];
    
    return (
      <div className={`${gradient ? `bg-linear-to-br ${gradientClass}` : 'bg-black/40 backdrop-blur-xl border border-emerald-500/20'} rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.15)] p-6 hover:shadow-[0_0_30px_rgba(34,197,94,0.25)] transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group`}>
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex-1">
            <p className={`${gradient ? 'text-white/90' : 'text-gray-400'} text-sm font-medium mb-1`}>{title}</p>
            <p className={`${gradient ? 'text-white' : 'text-white'} text-3xl font-bold mb-2`}>{value}</p>
            {change && (
              <p className={`text-sm font-medium flex items-center gap-1 ${gradient ? 'text-white/90' : change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
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
  };

  const statusConfig = {
    delivered: { color: 'bg-green-900/50 text-green-300 border border-green-500/30', icon: CheckCircle },
    queued: { color: 'bg-blue-900/50 text-blue-300 border border-blue-500/30', icon: Clock },
    failed: { color: 'bg-red-900/50 text-red-300 border border-red-500/30', icon: XCircle },
    published: { color: 'bg-green-900/50 text-green-300 border border-green-500/30', icon: CheckCircle },
    draft: { color: 'bg-gray-700/50 text-gray-300 border border-gray-500/30', icon: Edit },
    processing: { color: 'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30', icon: Activity },
  };

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

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Mail} title="Total Emails Sent" value="124.5K" change="+18.2%" color="emerald" gradient gradientIndex={0} />
        <StatCard icon={Users} title="Active Startups" value="248" change="+12.5%" color="green" gradient gradientIndex={1} />
        <StatCard icon={Eye} title="Portal Views" value="892.4K" change="+24.8%" color="teal" gradient gradientIndex={2} />
        <StatCard icon={Globe} title="Global Reach" value="127" change="+6 countries" color="lime" gradient gradientIndex={3} />
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric, index) => {
          const MetricIcon = metric.icon;
          const colorClasses = [
            { border: 'border-emerald-500/20', icon: 'text-emerald-400', text: 'text-gray-400', change: 'text-emerald-400' },
            { border: 'border-cyan-500/20', icon: 'text-cyan-400', text: 'text-gray-400', change: 'text-cyan-400' },
            { border: 'border-blue-500/20', icon: 'text-blue-400', text: 'text-gray-400', change: 'text-blue-400' },
            { border: 'border-emerald-500/20', icon: 'text-emerald-400', text: 'text-gray-400', change: 'text-emerald-400' },
          ];
          const colorClass = colorClasses[index % colorClasses.length];
          return (
            <div key={index} className={`bg-black/40 backdrop-blur-xl border ${colorClass.border} rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.1)] p-4 hover:shadow-[0_0_25px_rgba(34,197,94,0.2)] transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group`}>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-between mb-2 relative z-10">
                <MetricIcon className={`h-5 w-5 ${colorClass.icon}`} />
                <span className={`text-xs font-medium ${metric.change.startsWith('+') ? 'text-emerald-400' : metric.change.startsWith('-') ? 'text-red-400' : colorClass.change}`}>
                  {metric.change}
                </span>
              </div>
              <p className={`text-sm ${colorClass.text} mb-1 relative z-10`}>{metric.name}</p>
              <p className={`text-xl font-bold text-white relative z-10`}>{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Performance */}
        <div className="bg-black/40 backdrop-blur-xl border border-emerald-500/20 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.15)] p-6 hover:shadow-[0_0_30px_rgba(34,197,94,0.25)] transition-all duration-300 relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-r from-emerald-500/5 via-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="text-xl font-bold bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">Email Campaign Performance</h3>
            <Download className="h-5 w-5 text-emerald-400 cursor-pointer hover:text-emerald-300 transition-colors" />
          </div>
          <div className="h-80 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={emailCampaignData}>
                <defs>
                  <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOpened" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#10B981" opacity={0.15} />
                <XAxis dataKey="month" stroke="#6EE7B7" fontSize={12} />
                <YAxis stroke="#6EE7B7" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.9)', 
                    border: '1px solid rgba(34, 197, 94, 0.3)', 
                    borderRadius: '12px',
                    color: '#D1FAE5',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)'
                  }} 
                />
                <Area type="monotone" dataKey="sent" stroke="#10B981" fillOpacity={1} fill="url(#colorSent)" strokeWidth={3} />
                <Area type="monotone" dataKey="opened" stroke="#06B6D4" fillOpacity={1} fill="url(#colorOpened)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="text-sm text-gray-300">Sent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
              <span className="text-sm text-gray-300">Opened</span>
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.15)] p-6 hover:shadow-[0_0_30px_rgba(34,197,94,0.25)] transition-all duration-300 relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 via-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="text-xl font-bold bg-linear-to-r from-cyan-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">Traffic by Country</h3>
            <Globe className="h-5 w-5 text-cyan-400" />
          </div>
          <div className="h-80 relative z-10">
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
                    backgroundColor: 'rgba(0, 0, 0, 0.9)', 
                    border: '1px solid rgba(34, 197, 94, 0.3)', 
                    borderRadius: '12px',
                    color: '#D1FAE5',
                    backdropFilter: 'blur(10px)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4 relative z-10">
            {countryAnalytics.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-300">{item.name}</span>
                <span className="text-sm font-semibold text-white ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="bg-linear-to-br from-emerald-600 via-cyan-600 to-blue-600 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.3)] p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent opacity-30"></div>
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div>
            <h3 className="text-xl font-bold mb-1">Real-time Activity</h3>
            <p className="text-emerald-100 text-sm">Live user engagement tracking</p>
          </div>
          <Activity className="h-6 w-6 animate-pulse" />
        </div>
        <div className="h-40 relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={realtimeActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" opacity={0.3} />
              <XAxis dataKey="time" stroke="#ffffff" fontSize={11} />
              <YAxis stroke="#ffffff" fontSize={11} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  border: '1px solid rgba(255, 255, 255, 0.3)', 
                  borderRadius: '8px',
                  color: '#ffffff',
                  backdropFilter: 'blur(10px)'
                }} 
              />
              <Line type="monotone" dataKey="users" stroke="#ffffff" strokeWidth={4} dot={{ fill: '#ffffff', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Email Campaign Logs */}
      <div className="bg-black/40 backdrop-blur-xl border border-emerald-500/20 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.15)] relative overflow-hidden">
        <div className="p-6 border-b border-emerald-500/20 relative">
          <div className="absolute inset-0 bg-linear-to-r from-emerald-500/5 via-cyan-500/5 to-blue-500/5 opacity-30"></div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
            <div>
              <h3 className="text-xl font-bold bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">Email Campaign Logs</h3>
              <p className="text-sm text-gray-400">Real-time email delivery status and analytics</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white rounded-lg hover:from-emerald-500 hover:via-cyan-500 hover:to-blue-500 transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transform hover:scale-105">
              <Send className="h-4 w-4" />
              New Campaign
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-emerald-500/20 bg-black/30 backdrop-blur-sm">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Campaign ID</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Campaign Name</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Recipients</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Delivery</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Open Rate</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Time</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {emailLogs.map((log) => (
                <tr key={log.id} className="border-b border-emerald-500/10 hover:bg-emerald-500/5 transition-colors group">
                  <td className="py-4 px-6 text-sm font-mono text-gray-300">{log.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                      <span className="text-sm font-medium text-white">{log.campaign}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-300">{log.recipients.toLocaleString()}</td>
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
                    <span className="text-sm font-semibold text-white">{log.openRate}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-300">{log.time}</td>
                  <td className="py-4 px-6"><ActionButtons /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Blogs and Emails are now componentized

  const handleEmailCampaignChange = (field: string, value: any) => {
    setEmailCampaign(prev => ({ ...prev, [field]: value }));
  };

  const handleEmailCampaignSubmit = (e: any, schedule: boolean) => {
    e.preventDefault();
    
    const emailList = emailCampaign.bulkEmails
      .split(/[,\n\r]+/)
      .map(email => email.trim())
      .filter(email => email.includes('@'));
    
    const campaignData = {
      ...emailCampaign,
      emails: emailList,
      publishedAt: schedule && emailCampaign.scheduledAt 
        ? new Date(emailCampaign.scheduledAt).toISOString()
        : new Date().toISOString(),
      tags: emailCampaign.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    
    console.log('Email Campaign Data:', campaignData);
    
    // Here you would typically send this to your backend API
    alert(schedule 
      ? `Campaign scheduled successfully! Will send to ${emailList.length} recipients at ${emailCampaign.scheduledAt}` 
      : `Campaign sent successfully to ${emailList.length} recipients!`);
  };

  const renderEmails = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">Email Campaign</h2>
          <p className="text-sm text-gray-400">Create and send bulk email campaigns with scheduling</p>
        </div>
      </div>

      <form className="space-y-6">
        {/* Main Email Template Section */}
        <div className="bg-black/40 backdrop-blur-xl border border-emerald-500/20 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.15)] p-6">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="h-6 w-6 text-emerald-400" />
            <h3 className="text-xl font-bold bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">Email Template</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Subject */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <AtSign className="h-4 w-4 text-emerald-400" />
                Email Subject
              </label>
              <input
                type="text"
                value={emailCampaign.subject}
                onChange={(e) => handleEmailCampaignChange('subject', e.target.value)}
                placeholder="Enter email subject line"
                className="w-full px-4 py-3 bg-black/40 border border-emerald-500/20 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white placeholder-gray-500 transition-all outline-none"
                required
              />
            </div>

            {/* Body */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <AlignLeft className="h-4 w-4 text-emerald-400" />
                Email Body
              </label>
              <textarea
                value={emailCampaign.body}
                onChange={(e) => handleEmailCampaignChange('body', e.target.value)}
                placeholder="Enter your email content here... You can use HTML for formatting."
                rows={8}
                className="w-full px-4 py-3 bg-black/40 border border-emerald-500/20 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white placeholder-gray-500 transition-all outline-none resize-y"
                required
              />
              <p className="text-xs text-gray-500 mt-2">HTML is supported for rich formatting</p>
            </div>
          </div>
        </div>

        {/* Content Metadata Section */}
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.15)] p-6">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-6 w-6 text-cyan-400" />
            <h3 className="text-xl font-bold bg-linear-to-r from-cyan-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">Content Metadata</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <PenTool className="h-4 w-4 text-cyan-400" />
                Title
              </label>
              <input
                type="text"
                value={emailCampaign.title}
                onChange={(e) => handleEmailCampaignChange('title', e.target.value)}
                placeholder="e.g., 10 Proven Tips to Improve Web Performance in 2025"
                className="w-full px-4 py-3 bg-black/40 border border-cyan-500/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-500 transition-all outline-none"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <FileText className="h-4 w-4 text-cyan-400" />
                Slug
              </label>
              <input
                type="text"
                value={emailCampaign.slug}
                onChange={(e) => handleEmailCampaignChange('slug', e.target.value)}
                placeholder="e.g., improve-web-performance-2025"
                className="w-full px-4 py-3 bg-black/40 border border-cyan-500/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-500 transition-all outline-none"
              />
            </div>

            {/* Excerpt */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <AlignLeft className="h-4 w-4 text-cyan-400" />
                Excerpt
              </label>
              <textarea
                value={emailCampaign.excerpt}
                onChange={(e) => handleEmailCampaignChange('excerpt', e.target.value)}
                placeholder="Brief description or summary of the email content"
                rows={3}
                className="w-full px-4 py-3 bg-black/40 border border-cyan-500/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-500 transition-all outline-none resize-y"
              />
            </div>

            {/* Content */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <FileText className="h-4 w-4 text-cyan-400" />
                Full Content
              </label>
              <textarea
                value={emailCampaign.content}
                onChange={(e) => handleEmailCampaignChange('content', e.target.value)}
                placeholder="Full content/article text that will be included in the email"
                rows={6}
                className="w-full px-4 py-3 bg-black/40 border border-cyan-500/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-500 transition-all outline-none resize-y"
              />
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <FolderOpen className="h-4 w-4 text-cyan-400" />
                Category
              </label>
              <input
                type="text"
                value={emailCampaign.category}
                onChange={(e) => handleEmailCampaignChange('category', e.target.value)}
                placeholder="e.g., Web Development"
                className="w-full px-4 py-3 bg-black/40 border border-cyan-500/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-500 transition-all outline-none"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Tag className="h-4 w-4 text-cyan-400" />
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={emailCampaign.tags}
                onChange={(e) => handleEmailCampaignChange('tags', e.target.value)}
                placeholder="e.g., performance, frontend, optimization"
                className="w-full px-4 py-3 bg-black/40 border border-cyan-500/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-500 transition-all outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bulk Email Recipients Section */}
        <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.15)] p-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-6 w-6 text-blue-400" />
            <h3 className="text-xl font-bold bg-linear-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Bulk Email Recipients</h3>
          </div>
          
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Mail className="h-4 w-4 text-blue-400" />
              Email Addresses (one per line or comma-separated)
            </label>
            <textarea
              value={emailCampaign.bulkEmails}
              onChange={(e) => handleEmailCampaignChange('bulkEmails', e.target.value)}
              placeholder="Enter email addresses (one per line or comma-separated): example1@email.com, example2@email.com"
              rows={8}
              className="w-full px-4 py-3 bg-black/40 border border-blue-500/20 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-500 transition-all outline-none resize-y font-mono text-sm"
              required
            />
            <div className="flex items-center gap-2 mt-2">
              <Upload className="h-4 w-4 text-blue-400" />
              <p className="text-xs text-gray-500">You can also paste a list of emails or upload a CSV file</p>
            </div>
            {emailCampaign.bulkEmails && (
              <p className="text-xs text-emerald-400 mt-2">
                {emailCampaign.bulkEmails.split(/[,\n\r]+/).filter((e: string) => e.trim().includes('@')).length} valid email(s) detected
              </p>
            )}
          </div>
        </div>

        {/* Scheduling Section */}
        <div className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.15)] p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="h-6 w-6 text-purple-400" />
            <h3 className="text-xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Scheduling Options</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="radio"
                id="sendNow"
                name="sendOption"
                checked={emailCampaign.sendImmediately}
                onChange={() => handleEmailCampaignChange('sendImmediately', true)}
                className="w-4 h-4 text-emerald-500 bg-black/40 border-emerald-500/20 focus:ring-emerald-500/50"
              />
              <label htmlFor="sendNow" className="text-gray-300 cursor-pointer flex items-center gap-2">
                <Send className="h-4 w-4 text-emerald-400" />
                Send Immediately
              </label>
            </div>
            
            <div className="flex items-center gap-4">
              <input
                type="radio"
                id="schedule"
                name="sendOption"
                checked={!emailCampaign.sendImmediately}
                onChange={() => handleEmailCampaignChange('sendImmediately', false)}
                className="w-4 h-4 text-emerald-500 bg-black/40 border-emerald-500/20 focus:ring-emerald-500/50"
              />
              <label htmlFor="schedule" className="text-gray-300 cursor-pointer flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-400" />
                Schedule for Later
              </label>
            </div>

            {!emailCampaign.sendImmediately && (
              <div className="ml-8 mt-4">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Calendar className="h-4 w-4 text-purple-400" />
                  Scheduled Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={emailCampaign.scheduledAt}
                  onChange={(e) => handleEmailCampaignChange('scheduledAt', e.target.value)}
                  className="w-full md:w-auto px-4 py-3 bg-black/40 border border-purple-500/20 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white transition-all outline-none"
                  required={!emailCampaign.sendImmediately}
                />
                <p className="text-xs text-gray-500 mt-2">Select when to send this email campaign</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            onClick={(e) => handleEmailCampaignSubmit(e, false)}
            disabled={!emailCampaign.subject || !emailCampaign.body || !emailCampaign.bulkEmails}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white rounded-xl hover:from-emerald-500 hover:via-cyan-500 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Send className="h-5 w-5" />
            <span>Send Now</span>
          </button>
          
          <button
            type="button"
            onClick={(e) => handleEmailCampaignSubmit(e, true)}
            disabled={emailCampaign.sendImmediately || !emailCampaign.scheduledAt || !emailCampaign.subject || !emailCampaign.body || !emailCampaign.bulkEmails}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-purple-600 via-pink-600 to-cyan-600 text-white rounded-xl hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Clock className="h-5 w-5" />
            <span>Schedule Campaign</span>
          </button>
        </div>
      </form>
    </div>
  );

  const renderGenericTab = (title:any, description:any, icon:any) => (
    <div className="space-y-6">
      <div className="bg-linear-to-br from-emerald-600 via-cyan-600 to-blue-600 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.3)] p-8 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent opacity-30"></div>
        <div className="flex justify-center mb-4 relative z-10">
          {React.createElement(icon, { className: "h-16 w-16 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" })}
        </div>
        <h2 className="text-3xl font-bold mb-2 relative z-10">{title}</h2>
        <p className="text-emerald-100 relative z-10">{description}</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return renderOverview();
      case 'blogs':
        return <BlogManagement />;
      case 'emails':
        return <MailManagement />;
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
    <div className="flex h-screen bg-linear-to-br from-slate-950 via-gray-950 to-black overflow-hidden relative">
      {/* Animated Background Orbs */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-emerald-500/8 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-blue-500/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-1/4 h-1/4 bg-cyan-500/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-black/40 backdrop-blur-xl border-r border-emerald-500/20 transition-transform duration-300 ease-in-out relative`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-emerald-500/20 relative">
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500/5 via-cyan-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center gap-3 relative z-10">
              <Image
                alt="Edventure Park Logo"
                width={62}
                height={82} 
                src="/logo.png"
                className="drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]"
              />
              <div>
                <h1 className="text-xl font-bold bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">EVP</h1>
                <p className="text-xs text-gray-400">CMS Platform</p>
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
                    // no-op for componentized tabs
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden group ${
                    activeTab === item.id
                      ? 'bg-linear-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                      : 'text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                  {activeTab === item.id && <ChevronRight className="h-4 w-4 ml-auto animate-pulse" />}
                  {activeTab !== item.id && (
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-emerald-500/20">
            <button 
              onClick={() => setAuthenticated(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-linear-to-r from-red-500/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <LogOut className="h-5 w-5 relative z-10" />
              <span className="font-medium relative z-10">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-black/40 backdrop-blur-xl border-b border-emerald-500/20 p-4 lg:p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-emerald-500/10 rounded-lg transition-colors group"
              >
                {sidebarOpen ? <X className="h-6 w-6 text-emerald-400 group-hover:text-emerald-300" /> : <Menu className="h-6 w-6 text-emerald-400 group-hover:text-emerald-300" />}
              </button>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h2>
                <p className="text-sm text-gray-400 hidden sm:block">Welcome back, Admin</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 lg:gap-4">
              <button className="relative p-2 hover:bg-emerald-500/10 rounded-lg transition-colors group">
                <Search className="h-5 w-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
              </button>
              <button className="relative p-2 hover:bg-emerald-500/10 rounded-lg transition-colors group">
                <Bell className="h-5 w-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
              </button>
              <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-emerald-500/20">
                <div className="w-10 h-10 bg-linear-to-br from-emerald-600 via-cyan-600 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(34,197,94,0.4)]">
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