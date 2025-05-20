
import React, { useState, useEffect } from 'react';
import { Campaign, Channel } from '../../pages/Campaigns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, PlayCircle, PauseCircle, StopCircle, Mail, Linkedin, MessageSquare, Phone, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
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
import CampaignActivityFeed from './CampaignActivityFeed';

interface CampaignDetailProps {
  campaign: Campaign;
  onBack?: () => void;
  isMobile?: boolean;
}

interface ChannelStatus {
  channel: Channel;
  status: 'active' | 'paused' | 'stopped';
}

interface CampaignMetrics {
  qualified: number;
  engagement: number;
  appointments: number;
}

interface TimeSeriesData {
  date: string;
  email: number;
  linkedin: number;
  sms: number;
  calls: number;
}

interface ChannelData {
  name: string;
  value: number;
  color: string;
}

interface IcpData {
  name: string;
  value: number;
  color: string;
}

const CampaignDetail: React.FC<CampaignDetailProps> = ({ campaign, onBack, isMobile = false }) => {
  const [channelStatuses, setChannelStatuses] = useState<ChannelStatus[]>([]);
  const [metrics, setMetrics] = useState<CampaignMetrics | null>(null);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [channelData, setChannelData] = useState<ChannelData[]>([]);
  const [icpData, setIcpData] = useState<IcpData[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Initialize channel statuses based on campaign status
    const initialStatuses: ChannelStatus[] = campaign.channels.map(channel => ({
      channel,
      status: campaign.status === 'active' ? 'active' : campaign.status === 'paused' ? 'paused' : 'stopped'
    }));
    setChannelStatuses(initialStatuses);
    
    // Fetch campaign metrics and data
    fetchCampaignData();
  }, [campaign]);
  
  const fetchCampaignData = async () => {
    setLoading(true);
    
    try {
      // In a real app, these would be API calls
      // const metricsResponse = await fetch(`/api/campaigns/${campaign.id}/analytics?metrics=all`);
      // const timeSeriesResponse = await fetch(`/api/campaigns/${campaign.id}/analytics?dim=time`);
      // const channelResponse = await fetch(`/api/campaigns/${campaign.id}/analytics?dim=channel`);
      // const icpResponse = await fetch(`/api/campaigns/${campaign.id}/analytics?dim=icp`);
      
      // Mock data for now
      setTimeout(() => {
        // Mock metrics data
        const mockMetrics: CampaignMetrics = {
          qualified: 68,
          engagement: campaign.engagementRate,
          appointments: 12,
        };
        
        // Mock time series data
        const mockTimeSeriesData: TimeSeriesData[] = [
          { date: 'May 10', email: 10, linkedin: 5, sms: 3, calls: 1 },
          { date: 'May 11', email: 12, linkedin: 6, sms: 4, calls: 2 },
          { date: 'May 12', email: 15, linkedin: 8, sms: 5, calls: 3 },
          { date: 'May 13', email: 18, linkedin: 10, sms: 6, calls: 3 },
          { date: 'May 14', email: 20, linkedin: 12, sms: 7, calls: 4 },
          { date: 'May 15', email: 22, linkedin: 15, sms: 8, calls: 5 },
          { date: 'May 16', email: 25, linkedin: 18, sms: 9, calls: 6 },
        ];
        
        // Mock channel distribution data
        const mockChannelData: ChannelData[] = [
          { name: 'Email', value: 45, color: '#74C0FC' },
          { name: 'LinkedIn', value: 30, color: '#127E8A' },
          { name: 'SMS', value: 15, color: '#B67FFF' },
          { name: 'Calls', value: 10, color: '#FFF35C' },
        ];
        
        // Mock ICP distribution data
        const mockIcpData: IcpData[] = [
          { name: 'SaaS', value: 40, color: '#3498db' },
          { name: 'Financial', value: 25, color: '#2ecc71' },
          { name: 'Insurance', value: 20, color: '#9b59b6' },
          { name: 'Healthcare', value: 10, color: '#1abc9c' },
          { name: 'Retail', value: 5, color: '#f1c40f' },
        ];
        
        setMetrics(mockMetrics);
        setTimeSeriesData(mockTimeSeriesData);
        setChannelData(mockChannelData);
        setIcpData(mockIcpData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching campaign data:', error);
      toast({
        title: 'Error Loading Campaign Data',
        description: 'Failed to load campaign analytics. Please try again.',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };
  
  const handleChannelStatusChange = async (channel: Channel, action: 'start' | 'pause' | 'stop') => {
    try {
      // In a real app, this would be a POST request
      // await fetch(`/api/campaigns/${campaign.id}/channel/${channel}/status`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: action })
      // });
      
      // Update local state
      setChannelStatuses(prev => 
        prev.map(cs => 
          cs.channel === channel 
            ? { ...cs, status: action === 'start' ? 'active' : action === 'pause' ? 'paused' : 'stopped' } 
            : cs
        )
      );
      
      const statusText = action === 'start' ? 'started' : action === 'pause' ? 'paused' : 'stopped';
      const channelName = channel.charAt(0).toUpperCase() + channel.slice(1);
      
      toast({
        title: `${channelName} Channel ${statusText.charAt(0).toUpperCase() + statusText.slice(1)}`,
        description: `${channelName} channel has been ${statusText} successfully.`,
      });
    } catch (error) {
      console.error(`Error changing channel status:`, error);
      toast({
        title: 'Error Updating Channel',
        description: 'Failed to update channel status. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  const handleRunCampaignNow = async () => {
    try {
      // In a real app, this would be a POST request
      // await fetch(`/api/campaigns/${campaign.id}/run`, { method: 'POST' });
      
      toast({
        title: 'Campaign Started',
        description: `${campaign.name} is now running.`,
      });
    } catch (error) {
      console.error('Error running campaign:', error);
      toast({
        title: 'Error Starting Campaign',
        description: 'Failed to start the campaign. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  const getChannelIcon = (channel: Channel, size = 18) => {
    const iconProps = { size };
    
    switch (channel) {
      case 'email':
        return <Mail {...iconProps} className="text-channel-email" />;
      case 'linkedin':
        return <Linkedin {...iconProps} className="text-channel-linkedin" />;
      case 'sms':
        return <MessageSquare {...iconProps} className="text-channel-sms" />;
      case 'calls':
        return <Phone {...iconProps} className="text-channel-calls" />;
      default:
        return null;
    }
  };
  
  const renderChannelStatus = (channel: Channel) => {
    const status = channelStatuses.find(cs => cs.channel === channel)?.status || 'stopped';
    
    return (
      <div key={channel} className="flex items-center border rounded-md p-2 mb-2">
        <div className="flex items-center gap-2 flex-1">
          {getChannelIcon(channel)}
          <span className="capitalize">{channel}</span>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={status === 'active' ? 'text-success' : 'text-gray-400'}
            onClick={() => handleChannelStatusChange(channel, 'start')}
            aria-label={`Start ${channel}`}
          >
            <PlayCircle size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={status === 'paused' ? 'text-warning' : 'text-gray-400'}
            onClick={() => handleChannelStatusChange(channel, 'pause')}
            aria-label={`Pause ${channel}`}
          >
            <PauseCircle size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={status === 'stopped' ? 'text-error' : 'text-gray-400'}
            onClick={() => handleChannelStatusChange(channel, 'stop')}
            aria-label={`Stop ${channel}`}
          >
            <StopCircle size={20} />
          </Button>
        </div>
      </div>
    );
  };
  
  const getProgressValue = () => {
    return (campaign.leadsFound / campaign.targetLeads) * 100;
  };
  
  // Filter data based on active tab
  const filterDataByTab = (data: any) => {
    if (activeTab === 'all') return data;
    
    // For channel or ICP filtering, we would implement actual filtering logic here
    return data;
  };
  
  const getChartColors = () => {
    return {
      email: '#74C0FC',
      linkedin: '#127E8A',
      sms: '#B67FFF',
      calls: '#FFF35C',
    };
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2">
          {isMobile && onBack && (
            <Button variant="ghost" size="sm" onClick={onBack} className="mt-1">
              <ChevronLeft size={16} />
            </Button>
          )}
          
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-neutral-dark">{campaign.name}</h2>
              <Badge className={
                campaign.status === 'active' ? 'bg-success/20 text-success' : 
                campaign.status === 'paused' ? 'bg-warning/20 text-neutral-dark' :
                campaign.status === 'completed' ? 'bg-primary/20 text-primary' :
                campaign.status === 'draft' ? 'bg-secondary/20 text-secondary' :
                'bg-error/20 text-error'
              }>
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-neutral-dark/70">
              ICP: {campaign.icpSegment} • Created {new Date(campaign.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="default"
            onClick={handleRunCampaignNow}
            className="flex items-center"
            disabled={campaign.status === 'completed'}
          >
            <PlayCircle size={16} className="mr-1" />
            Run Now
          </Button>
          <Button 
            variant="outline"
            className="flex items-center"
          >
            <Settings size={16} className="mr-1" />
            Edit Config
          </Button>
        </div>
      </div>
      
      {/* Channel Controls */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Channel Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {campaign.channels.map(channel => renderChannelStatus(channel))}
          </div>
        </CardContent>
      </Card>
      
      {/* ICP & Configuration Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Campaign Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-neutral-dark/70">ICP Segment</p>
              <div className="mt-1">
                <Badge className="bg-blue-100 text-blue-800">{campaign.icpSegment}</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm text-neutral-dark/70">Lead Target</p>
              <p className="text-lg font-medium">{campaign.targetLeads}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-dark/70">Duration</p>
              <p className="text-lg font-medium">30 days</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-neutral-dark/70">Leads Found</p>
                <div className="flex items-end gap-1">
                  <p className="text-2xl font-semibold">{campaign.leadsFound}</p>
                  <p className="text-neutral-dark/70 mb-1">/ {campaign.targetLeads}</p>
                </div>
              </div>
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle
                    className="text-gray-200"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="transparent"
                    r="20"
                    cx="24"
                    cy="24"
                  />
                  <circle
                    className="text-warning"
                    strokeWidth="5"
                    strokeDasharray={`${2 * Math.PI * 20}`}
                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - getProgressValue() / 100)}`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="20"
                    cx="24"
                    cy="24"
                  />
                </svg>
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium">
                  {Math.round(getProgressValue())}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-dark/70">Qualified %</p>
            {metrics ? (
              <p className="text-2xl font-semibold text-primary">{metrics.qualified}%</p>
            ) : (
              <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-dark/70">Engagement %</p>
            {metrics ? (
              <p className="text-2xl font-semibold text-primary">{metrics.engagement}%</p>
            ) : (
              <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-dark/70">Appointments Booked</p>
            {metrics ? (
              <p className="text-2xl font-semibold text-primary">{metrics.appointments}</p>
            ) : (
              <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Analytics Tabs */}
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Data</TabsTrigger>
          <TabsTrigger value="channel">By Channel</TabsTrigger>
          <TabsTrigger value="icp">By ICP</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {/* Time Series Chart */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-60 w-full bg-gray-100 animate-pulse rounded"></div>
              ) : (
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={filterDataByTab(timeSeriesData)}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                      <XAxis dataKey="date" stroke="#888" fontSize={12} />
                      <YAxis stroke="#888" fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="email"
                        stackId="1"
                        stroke={getChartColors().email}
                        fill={getChartColors().email}
                        fillOpacity={0.4}
                      />
                      <Area
                        type="monotone"
                        dataKey="linkedin"
                        stackId="1"
                        stroke={getChartColors().linkedin}
                        fill={getChartColors().linkedin}
                        fillOpacity={0.4}
                      />
                      <Area
                        type="monotone"
                        dataKey="sms"
                        stackId="1"
                        stroke={getChartColors().sms}
                        fill={getChartColors().sms}
                        fillOpacity={0.4}
                      />
                      <Area
                        type="monotone"
                        dataKey="calls"
                        stackId="1"
                        stroke={getChartColors().calls}
                        fill={getChartColors().calls}
                        fillOpacity={0.4}
                      />
                      <Legend />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Channel Distribution & ICP Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Engagement by Channel</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-60 w-full bg-gray-100 animate-pulse rounded"></div>
                ) : (
                  <div className="h-60">
                    <ChartContainer config={{
                      email: { color: '#74C0FC' },
                      linkedin: { color: '#127E8A' },
                      sms: { color: '#B67FFF' },
                      calls: { color: '#FFF35C' },
                    }}>
                      <BarChart
                        data={filterDataByTab(channelData)}
                        margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                        <XAxis dataKey="name" stroke="#888" fontSize={12} />
                        <YAxis stroke="#888" fontSize={12} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" nameKey="name" fill="#8884d8">
                          {channelData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Lead Distribution by ICP</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-60 w-full bg-gray-100 animate-pulse rounded"></div>
                ) : (
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={filterDataByTab(icpData)}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {icpData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend layout="horizontal" verticalAlign="bottom" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="channel" className="space-y-4">
          {/* Channel-specific content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Channel Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-dark/70">
                Select a channel above to filter campaign data by specific channel.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="icp" className="space-y-4">
          {/* ICP-specific content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>ICP Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-dark/70">
                Select an ICP segment above to filter campaign data by specific ideal customer profile.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Activity Feed */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Latest Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <CampaignActivityFeed campaignId={campaign.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignDetail;
