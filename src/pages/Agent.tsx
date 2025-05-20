
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { Bot, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Agent: React.FC = () => {
  const [agentActive, setAgentActive] = useState(true);
  const [processingMode, setProcessingMode] = useState<'automatic' | 'manual'>('automatic');
  
  return (
    <Layout title="Agent Control Center" subtitle="Manage your AI assistant's behavior and monitor performance">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-neutral-dark">Agent Status</h3>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
              <Bot size={20} className="text-primary" />
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <span>Active</span>
            <Switch 
              checked={agentActive} 
              onCheckedChange={setAgentActive} 
              className={agentActive ? "bg-success" : ""} 
            />
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <span>Processing Mode</span>
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 text-sm rounded ${processingMode === 'automatic' ? 'bg-primary text-white' : 'bg-neutral-light'}`}
                onClick={() => setProcessingMode('automatic')}
              >
                Automatic
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded ${processingMode === 'manual' ? 'bg-primary text-white' : 'bg-neutral-light'}`}
                onClick={() => setProcessingMode('manual')}
              >
                Manual
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm text-neutral-dark/70">Last health check: 5 minutes ago</p>
            <p className="text-sm text-success flex items-center mt-1">
              <CheckCircle2 size={14} className="mr-1" /> All systems operational
            </p>
          </div>
        </Card>
        
        <Card>
          <h3 className="text-lg font-semibold text-neutral-dark mb-4">Current Tasks</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center p-2 bg-channel-email/10 rounded">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                <span className="text-sm">Processing email responses</span>
              </div>
              <Badge variant="success">Active</Badge>
            </li>
            <li className="flex justify-between items-center p-2 bg-channel-linkedin/10 rounded">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-warning rounded-full mr-2"></div>
                <span className="text-sm">LinkedIn connection requests</span>
              </div>
              <Badge variant="warning">Pending</Badge>
            </li>
            <li className="flex justify-between items-center p-2 bg-channel-sms/10 rounded">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-neutral-dark rounded-full mr-2"></div>
                <span className="text-sm">SMS follow-ups</span>
              </div>
              <Badge variant="secondary">Scheduled</Badge>
            </li>
            <li className="flex justify-between items-center p-2 bg-channel-calls/10 rounded">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-neutral-dark rounded-full mr-2"></div>
                <span className="text-sm">Call planning</span>
              </div>
              <Badge variant="secondary">Scheduled</Badge>
            </li>
          </ul>
        </Card>
        
        <Card>
          <h3 className="text-lg font-semibold text-neutral-dark mb-4">Agent Health</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>API Rate Limits</span>
                <span className="text-success">85%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-success h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Error Rate</span>
                <span className="text-success">2.3%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-success h-full rounded-full" style={{ width: '2.3%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Response Time</span>
                <span className="text-warning">462ms</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-warning h-full rounded-full" style={{ width: '46.2%' }}></div>
              </div>
            </div>
            
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                <RefreshCw size={14} className="mr-2" />
                Run Diagnostics
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-neutral-dark mb-4">Recent Errors</h3>
          
          <div className="space-y-3">
            <div className="p-3 bg-error/10 rounded-lg border border-error/20">
              <div className="flex items-center">
                <AlertCircle size={16} className="text-error mr-2" />
                <h4 className="text-sm font-medium text-error">LinkedIn API Rate Limit</h4>
              </div>
              <p className="mt-1 text-xs text-neutral-dark/70">Occurred 2 hours ago</p>
              <p className="mt-2 text-sm">Too many connection requests sent within timeframe</p>
              <div className="mt-3 flex justify-end">
                <Button variant="outline" size="sm">Resolve</Button>
              </div>
            </div>
            
            <div className="p-3 bg-neutral-light rounded-lg border border-neutral-dark/10">
              <div className="flex items-center">
                <AlertCircle size={16} className="text-neutral-dark/70 mr-2" />
                <h4 className="text-sm font-medium">Email Deliverability Warning</h4>
              </div>
              <p className="mt-1 text-xs text-neutral-dark/70">Occurred 1 day ago</p>
              <p className="mt-2 text-sm">Bounce rate increased above threshold (5.2%)</p>
              <div className="mt-3 flex justify-end">
                <Button variant="outline" size="sm">Resolve</Button>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-100 text-center">
            <Button variant="link" size="sm">View All Errors</Button>
          </div>
        </Card>
        
        <Card>
          <h3 className="text-lg font-semibold text-neutral-dark mb-4">Agent Activity</h3>
          
          <div className="h-60 flex items-center justify-center border border-dashed border-gray-200 rounded-lg bg-neutral-light/50">
            <p className="text-neutral-dark/60">Agent activity chart will appear here</p>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-3 bg-neutral-light rounded-lg">
              <p className="text-sm text-neutral-dark/70">Messages Processed</p>
              <p className="text-xl font-semibold">1,432</p>
            </div>
            <div className="p-3 bg-neutral-light rounded-lg">
              <p className="text-sm text-neutral-dark/70">Leads Qualified</p>
              <p className="text-xl font-semibold">248</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Agent;
