
import React from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/common/Card';
import { BarChart3, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Analytics: React.FC = () => {
  return (
    <Layout title="Analytics" subtitle="Performance insights across all your outreach activities">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-neutral-dark">Performance Metrics</h2>
          <p className="text-sm text-neutral-dark/70">
            Last 30 days
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center">
            <Filter size={16} className="mr-2" />
            Filter Data
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-neutral-dark/70 text-sm">Email Open Rate</h3>
              <p className="text-2xl font-semibold text-neutral-dark">42.8%</p>
            </div>
            <div className="p-2 bg-channel-email/10 rounded-full">
              <BarChart3 size={20} className="text-channel-email" />
            </div>
          </div>
          <p className="text-xs text-success">↑ 5.2% from last month</p>
        </Card>
        
        <Card>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-neutral-dark/70 text-sm">LinkedIn Response Rate</h3>
              <p className="text-2xl font-semibold text-neutral-dark">28.3%</p>
            </div>
            <div className="p-2 bg-channel-linkedin/10 rounded-full">
              <BarChart3 size={20} className="text-channel-linkedin" />
            </div>
          </div>
          <p className="text-xs text-error">↓ 2.1% from last month</p>
        </Card>
        
        <Card>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-neutral-dark/70 text-sm">SMS Click Rate</h3>
              <p className="text-2xl font-semibold text-neutral-dark">61.5%</p>
            </div>
            <div className="p-2 bg-channel-sms/10 rounded-full">
              <BarChart3 size={20} className="text-channel-sms" />
            </div>
          </div>
          <p className="text-xs text-success">↑ 8.9% from last month</p>
        </Card>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Channel Performance</h3>
        <div className="h-60 flex items-center justify-center border border-dashed border-gray-200 rounded-lg bg-neutral-light/50">
          <p className="text-neutral-dark/60">Channel performance chart will appear here</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-dark mb-4">Conversion Funnel</h3>
          <div className="h-60 flex items-center justify-center border border-dashed border-gray-200 rounded-lg bg-neutral-light/50">
            <p className="text-neutral-dark/60">Conversion funnel visualization will appear here</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-dark mb-4">Top Performing Content</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center p-2 bg-neutral-light/30 rounded">
              <span className="text-sm">Email Template #3</span>
              <span className="text-xs font-medium bg-success/20 text-success px-2 py-0.5 rounded">76%</span>
            </li>
            <li className="flex justify-between items-center p-2 bg-neutral-light/30 rounded">
              <span className="text-sm">LinkedIn Message #5</span>
              <span className="text-xs font-medium bg-success/20 text-success px-2 py-0.5 rounded">68%</span>
            </li>
            <li className="flex justify-between items-center p-2 bg-neutral-light/30 rounded">
              <span className="text-sm">SMS Reminder #2</span>
              <span className="text-xs font-medium bg-success/20 text-success px-2 py-0.5 rounded">59%</span>
            </li>
            <li className="flex justify-between items-center p-2 bg-neutral-light/30 rounded">
              <span className="text-sm">Follow-up Sequence A</span>
              <span className="text-xs font-medium bg-success/20 text-success px-2 py-0.5 rounded">54%</span>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
