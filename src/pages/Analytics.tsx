
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { 
  AreaChart, 
  Area,
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Spinner } from '@/components/common/Spinner';

// Type definitions
type IcpSegment = 'SaaS' | 'Financial' | 'Insurance';
type Channel = 'email' | 'linkedin' | 'sms' | 'call';
type Campaign = 'Q2 Outreach' | 'New Product Launch' | 'Enterprise Accounts';

interface FunnelData {
  stage: string;
  value: number;
  percentage: number;
  color: string;
}

interface TimeSeriesData {
  date: string;
  leads: number;
  qualified: number;
  deals: number;
}

interface ChannelComparisonData {
  channel: string;
  engagementRate: number;
  responseRate: number;
}

interface IcpData {
  name: string;
  value: number;
  color: string;
}

interface AgentMetric {
  name: string;
  value: number | string;
  background: string;
}

interface ActivityEvent {
  timestamp: string;
  event: string;
  channel: Channel;
  icp: IcpSegment;
  campaign: Campaign;
  value: string;
}

const Analytics: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: '04/30/2025',
    end: '05/20/2025'
  });

  // Mock data
  const funnelData: FunnelData[] = [
    { stage: 'Leads Discovered', value: 1250, percentage: 100, color: '#74C0FC' },
    { stage: 'Qualified', value: 820, percentage: 65, color: '#3EE0B7' },
    { stage: 'Engaged', value: 305, percentage: 40, color: '#FFC947' },
    { stage: 'Appointments Booked', value: 115, percentage: 30, color: '#B67FFF' },
  ];

  const timeSeriesData: TimeSeriesData[] = [
    { date: '04/30', leads: 60, qualified: 48, deals: 15 },
    { date: '05/03', leads: 58, qualified: 42, deals: 13 },
    { date: '05/06', leads: 55, qualified: 38, deals: 10 },
    { date: '05/09', leads: 52, qualified: 35, deals: 8 },
    { date: '05/12', leads: 57, qualified: 40, deals: 12 },
    { date: '05/15', leads: 65, qualified: 50, deals: 18 },
    { date: '05/18', leads: 70, qualified: 60, deals: 20 },
  ];

  const channelComparisonData: ChannelComparisonData[] = [
    { channel: 'Email', engagementRate: 25, responseRate: 42 },
    { channel: 'LinkedIn', engagementRate: 18, responseRate: 32 },
    { channel: 'SMS', engagementRate: 30, responseRate: 28 },
    { channel: 'Call', engagementRate: 45, responseRate: 15 },
  ];

  const icpData: IcpData[] = [
    { name: 'SaaS', value: 60, color: '#74C0FC' },
    { name: 'Financial', value: 25, color: '#3EE0B7' },
    { name: 'Insurance', value: 15, color: '#FFC947' },
  ];

  const agentMetrics: AgentMetric[] = [
    { name: 'Total Workflows', value: 8450, background: 'bg-blue-100' },
    { name: 'Error Rate', value: '2.3%', background: 'bg-red-100' },
    { name: 'Uptime', value: '99.8%', background: 'bg-green-100' },
  ];

  const activityEvents: ActivityEvent[] = [
    { timestamp: '2025-05-19 09:30:22', event: 'Lead Discovery', channel: 'linkedin', icp: 'SaaS', campaign: 'Q2 Outreach', value: '1 lead' },
    { timestamp: '2025-05-19 10:18:45', event: 'Email Sent', channel: 'email', icp: 'Financial', campaign: 'New Product Launch', value: '24 emails' },
    { timestamp: '2025-05-19 11:22:36', event: 'SMS Response', channel: 'sms', icp: 'Insurance', campaign: 'Enterprise Accounts', value: '3 replies' },
    { timestamp: '2025-05-19 13:55:53', event: 'Call Booked', channel: 'call', icp: 'SaaS', campaign: 'Q2 Outreach', value: '1 appointment' },
    { timestamp: '2025-05-19 14:19:57', event: 'Lead Qualified', channel: 'linkedin', icp: 'Financial', campaign: 'New Product Launch', value: '3 leads' },
    { timestamp: '2025-05-19 15:30:22', event: 'Email Opened', channel: 'email', icp: 'SaaS', campaign: 'Q2 Outreach', value: '18 opens' },
    { timestamp: '2025-05-19 16:42:11', event: 'SMS Sent', channel: 'sms', icp: 'Insurance', campaign: 'Enterprise Accounts', value: '12 messages' },
  ];

  // Handlers for filter changes
  const handleFilterChange = () => {
    // In a real app, this would trigger API calls with the selected filters
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const getChannelColor = (channel: string): string => {
    switch (channel.toLowerCase()) {
      case 'email': return '#74C0FC';
      case 'linkedin': return '#127E8A';
      case 'sms': return '#B67FFF';
      case 'call': return '#FFF35C';
      default: return '#2978FF';
    }
  };
  
  const getIcpColor = (icp: string): string => {
    switch (icp.toLowerCase()) {
      case 'saas': return '#74C0FC';
      case 'financial': return '#3EE0B7';
      case 'insurance': return '#FFC947';
      default: return '#2978FF';
    }
  };

  const getChannelBadgeVariant = (channel: Channel): 'email' | 'linkedin' | 'sms' | 'calls' => {
    switch (channel) {
      case 'email': return 'email';
      case 'linkedin': return 'linkedin';
      case 'sms': return 'sms';
      case 'call': return 'calls';
    }
  };

  return (
    <Layout title="Analytics Dashboard" subtitle="Comprehensive campaign and performance metrics">
      {/* Filters Section */}
      <Card className="mb-4">
        <CardHeader className="pb-2 flex items-center justify-between">
          <CardTitle className="text-lg">Analytics Filters</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => {}}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <path
                d="M7.5 11.25V3.75M3.75 7.5H11.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Campaigns</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="campaign-q2" />
                  <label htmlFor="campaign-q2" className="text-sm">Q2 Outreach</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="campaign-product" />
                  <label htmlFor="campaign-product" className="text-sm">New Product Launch</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="campaign-enterprise" />
                  <label htmlFor="campaign-enterprise" className="text-sm">Enterprise Accounts</label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Channels</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="channel-email" />
                  <label htmlFor="channel-email" className="text-sm">Email</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="channel-linkedin" />
                  <label htmlFor="channel-linkedin" className="text-sm">LinkedIn</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="channel-sms" />
                  <label htmlFor="channel-sms" className="text-sm">SMS</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="channel-call" />
                  <label htmlFor="channel-call" className="text-sm">AI Call</label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">ICP Segments</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="icp-saas" />
                  <label htmlFor="icp-saas" className="text-sm">SaaS</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="icp-financial" />
                  <label htmlFor="icp-financial" className="text-sm">Financial</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="icp-insurance" />
                  <label htmlFor="icp-insurance" className="text-sm">Insurance</label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Date Range</h3>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center space-x-2">
                  <Input 
                    type="text" 
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="h-8"
                  />
                  <span className="text-sm">to</span>
                  <Input 
                    type="text" 
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="h-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Funnel Overview */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Funnel Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <Spinner />
              </div>
            ) : (
              <div className="space-y-2">
                {funnelData.map((item) => (
                  <div key={item.stage} className="relative">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-neutral-dark">{item.stage}</span>
                      <span className="text-sm font-medium">{item.value.toLocaleString()}</span>
                    </div>
                    <div className="overflow-hidden h-8 text-xs flex rounded-md bg-gray-100">
                      <div 
                        style={{ 
                          width: `${item.percentage}%`,
                          backgroundColor: item.color
                        }} 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                      ></div>
                    </div>
                  </div>
                ))}
                <div className="mt-4 text-xs text-gray-500 flex justify-between">
                  <span>Overall Conversion: 9%</span>
                  <span>Last updated: 4:35:59 PM</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Channel Comparison */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Channel Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <Spinner />
              </div>
            ) : (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={channelComparisonData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="channel" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="engagementRate" name="Engagement Rate (%)" fill="#74C0FC" />
                    <Bar yAxisId="right" dataKey="responseRate" name="Response Rate (%)" fill="#3EE0B7" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* ICP Performance Breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">ICP Performance Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <Spinner />
              </div>
            ) : (
              <div className="relative h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={icpData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {icpData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-gray-500">
                  <p>Total Leads: 1250</p>
                  <p>Average Engagement: 27.5%</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Time-Series Trends */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Time-Series Trends</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <Spinner />
              </div>
            ) : (
              <div className="h-[240px]">
                <Tabs defaultValue="leads">
                  <TabsList className="mb-2">
                    <TabsTrigger value="leads" className="text-xs">Leads</TabsTrigger>
                    <TabsTrigger value="qualified" className="text-xs">Qualified</TabsTrigger>
                    <TabsTrigger value="deals" className="text-xs">Deals</TabsTrigger>
                    <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                  </TabsList>
                  <TabsContent value="leads">
                    <ResponsiveContainer width="100%" height={180}>
                      <AreaChart data={timeSeriesData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="leads" stroke="#2978FF" fill="#2978FF" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="qualified">
                    <ResponsiveContainer width="100%" height={180}>
                      <AreaChart data={timeSeriesData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="qualified" stroke="#3EE0B7" fill="#3EE0B7" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="deals">
                    <ResponsiveContainer width="100%" height={180}>
                      <AreaChart data={timeSeriesData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="deals" stroke="#FF8C42" fill="#FF8C42" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="all">
                    <ResponsiveContainer width="100%" height={180}>
                      <AreaChart data={timeSeriesData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="leads" stroke="#2978FF" fill="#2978FF" fillOpacity={0.3} stackId="1" />
                        <Area type="monotone" dataKey="qualified" stroke="#3EE0B7" fill="#3EE0B7" fillOpacity={0.3} stackId="2" />
                        <Area type="monotone" dataKey="deals" stroke="#FF8C42" fill="#FF8C42" fillOpacity={0.3} stackId="3" />
                        <Legend />
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Agent Utilization & Health */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Agent Utilization & Health</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <Spinner />
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {agentMetrics.map((metric, index) => (
                    <div key={index} className={`${metric.background} rounded-md p-3`}>
                      <p className="text-xs text-neutral-dark/70">{metric.name}</p>
                      <p className="text-2xl font-semibold">{metric.value}</p>
                    </div>
                  ))}
                </div>
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { time: '08:00', value: 200 },
                        { time: '10:00', value: 400 },
                        { time: '12:00', value: 300 },
                        { time: '14:00', value: 450 },
                        { time: '16:00', value: 500 },
                        { time: '18:00', value: 350 },
                        { time: '20:00', value: 600 }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#B67FFF" fill="#B67FFF" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Detailed Data Table */}
        <Card>
          <CardHeader className="pb-2 flex justify-between items-center">
            <CardTitle className="text-lg">Detailed Data Table</CardTitle>
            <div className="flex space-x-1">
              <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                CSV
              </Button>
              <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <Spinner />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Timestamp</th>
                      <th className="text-left py-2 px-2">Event</th>
                      <th className="text-left py-2 px-2">Channel</th>
                      <th className="text-left py-2 px-2">ICP</th>
                      <th className="text-left py-2 px-2">Campaign</th>
                      <th className="text-right py-2 px-2">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityEvents.map((event, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="py-2 px-2 text-xs text-gray-500">{event.timestamp}</td>
                        <td className="py-2 px-2">{event.event}</td>
                        <td className="py-2 px-2">
                          <Badge variant={getChannelBadgeVariant(event.channel)}>
                            {event.channel}
                          </Badge>
                        </td>
                        <td className="py-2 px-2">
                          <Badge variant={event.icp === 'SaaS' ? 'email' : event.icp === 'Financial' ? 'success' : 'warning'}>
                            {event.icp}
                          </Badge>
                        </td>
                        <td className="py-2 px-2">{event.campaign}</td>
                        <td className="py-2 px-2 text-right font-medium">{event.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                  <span>Page 1 of 4</span>
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm" className="h-6 w-6 p-0">
                      <span className="sr-only">Previous</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="sm" className="h-6 w-6 p-0">
                      <span className="sr-only">Next</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end mt-4">
        <Button className="bg-secondary hover:bg-secondary/90">
          Schedule Report
        </Button>
      </div>
    </Layout>
  );
};

export default Analytics;
