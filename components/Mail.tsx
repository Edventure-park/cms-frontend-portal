/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from 'react';
import { Mail, FileText, Users, Upload, Calendar, Clock, Send, AtSign, AlignLeft, Tag, FolderOpen } from 'lucide-react';

type EmailCampaignState = {
  subject: string;
  body: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  bulkEmails: string;
  scheduledAt: string;
  sendImmediately: boolean;
};

function MailManagement() {
  const [emailCampaign, setEmailCampaign] = useState<EmailCampaignState>({
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
    sendImmediately: true,
  });

  const handleEmailCampaignChange = (field: keyof EmailCampaignState, value: any) => {
    setEmailCampaign((prev) => ({ ...prev, [field]: value }));
  };

  const handleEmailCampaignSubmit = (e: any, schedule: boolean) => {
    e.preventDefault();

    const emailList = emailCampaign.bulkEmails
      .split(/[\,\n\r]+/)
      .map((email) => email.trim())
      .filter((email) => email.includes('@'));

    const campaignData = {
      ...emailCampaign,
      emails: emailList,
      publishedAt:
        schedule && emailCampaign.scheduledAt
          ? new Date(emailCampaign.scheduledAt).toISOString()
          : new Date().toISOString(),
      tags: emailCampaign.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    console.log('Email Campaign Data:', campaignData);
    alert(
      schedule
        ? `Campaign scheduled successfully! Will send to ${emailList.length} recipients at ${emailCampaign.scheduledAt}`
        : `Campaign sent successfully to ${emailList.length} recipients!`
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">Email Campaign</h2>
          <p className="text-sm text-gray-400">Create and send bulk email campaigns with scheduling</p>
        </div>
      </div>

      <form className="space-y-6">
        <div className="bg-black/40 backdrop-blur-xl border border-emerald-500/20 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.15)] p-6">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="h-6 w-6 text-emerald-400" />
            <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">Email Template</h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
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

        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.15)] p-6">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-6 w-6 text-cyan-400" />
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">Content Metadata</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <FileText className="h-4 w-4 text-cyan-400" />
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

        <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.15)] p-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-6 w-6 text-blue-400" />
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Bulk Email Recipients</h3>
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
                {emailCampaign.bulkEmails
                  .split(/[\,\n\r]+/)
                  .filter((e: string) => e.trim().includes('@')).length}{' '}
                valid email(s) detected
              </p>
            )}
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.15)] p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="h-6 w-6 text-purple-400" />
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Scheduling Options</h3>
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

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            onClick={(e) => handleEmailCampaignSubmit(e, false)}
            disabled={!emailCampaign.subject || !emailCampaign.body || !emailCampaign.bulkEmails}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white rounded-xl hover:from-emerald-500 hover:via-cyan-500 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Send className="h-5 w-5" />
            <span>Send Now</span>
          </button>

          <button
            type="button"
            onClick={(e) => handleEmailCampaignSubmit(e, true)}
            disabled={emailCampaign.sendImmediately || !emailCampaign.scheduledAt || !emailCampaign.subject || !emailCampaign.body || !emailCampaign.bulkEmails}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white rounded-xl hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Clock className="h-5 w-5" />
            <span>Schedule Campaign</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default MailManagement;


