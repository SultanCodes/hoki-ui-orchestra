
import React from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/common/Card';
import { Button } from '@/components/ui/button';
import { Save, MailCheck, LinkedinIcon, MessageSquare, Phone } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <Layout title="Settings" subtitle="Configure your account and integration preferences">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-neutral-dark">Settings Menu</h2>
            </div>
            <ul>
              <li className="border-b border-gray-100">
                <a href="#channel-integrations" className="block px-4 py-3 hover:bg-neutral-light text-primary font-medium">
                  Channel Integrations
                </a>
              </li>
              <li className="border-b border-gray-100">
                <a href="#agent-settings" className="block px-4 py-3 hover:bg-neutral-light">
                  Agent Settings
                </a>
              </li>
              <li className="border-b border-gray-100">
                <a href="#user-management" className="block px-4 py-3 hover:bg-neutral-light">
                  User Management
                </a>
              </li>
              <li className="border-b border-gray-100">
                <a href="#notifications" className="block px-4 py-3 hover:bg-neutral-light">
                  Notifications
                </a>
              </li>
              <li>
                <a href="#api-settings" className="block px-4 py-3 hover:bg-neutral-light">
                  API Settings
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <section id="channel-integrations" className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-dark mb-4">Channel Integrations</h2>
            
            <div className="space-y-4">
              <Card>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-channel-email/10 rounded-full">
                      <MailCheck size={20} className="text-channel-email" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">Email Platform</h3>
                      <p className="text-sm text-neutral-dark/70">Connected to SMTP server</p>
                    </div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </Card>
              
              <Card>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-channel-linkedin/10 rounded-full">
                      <LinkedinIcon size={20} className="text-channel-linkedin" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">LinkedIn</h3>
                      <p className="text-sm text-neutral-dark/70">Connected via PhantomBuster</p>
                    </div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </Card>
              
              <Card>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-channel-sms/10 rounded-full">
                      <MessageSquare size={20} className="text-channel-sms" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">SMS</h3>
                      <p className="text-sm text-neutral-dark/70">Connected to Twilio</p>
                    </div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </Card>
              
              <Card>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-channel-calls/10 rounded-full">
                      <Phone size={20} className="text-channel-calls" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">AI Calling</h3>
                      <p className="text-sm text-neutral-dark/70">Connected to Vapi</p>
                    </div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </Card>
            </div>
          </section>
          
          <section id="agent-settings" className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-dark mb-4">Agent Settings</h2>
            <Card>
              <h3 className="font-medium mb-4">Agent Behavior</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Response Tone</label>
                  <select className="w-full border border-gray-200 rounded-md p-2">
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Direct</option>
                    <option>Casual</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm mb-1">Initial Contact Delay</label>
                  <select className="w-full border border-gray-200 rounded-md p-2">
                    <option>Immediate</option>
                    <option>1 hour</option>
                    <option>1 day</option>
                    <option>Custom</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm mb-1">Follow-up Strategy</label>
                  <select className="w-full border border-gray-200 rounded-md p-2">
                    <option>Aggressive (3 days)</option>
                    <option>Moderate (5 days)</option>
                    <option>Relaxed (7 days)</option>
                    <option>Custom</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button className="bg-primary text-white flex items-center">
                  <Save size={16} className="mr-2" />
                  Save Changes
                </Button>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
