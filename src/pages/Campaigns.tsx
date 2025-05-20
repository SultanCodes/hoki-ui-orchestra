
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import CampaignList from '../components/campaigns/CampaignList';
import CampaignDetail from '../components/campaigns/CampaignDetail';
import NewCampaignModal from '../components/campaigns/NewCampaignModal';
import { Button } from '@/components/ui/button';
import { Plus, PauseCircle, PlayCircle } from 'lucide-react';
import Spinner from '../components/common/Spinner';
import { toast } from '@/hooks/use-toast';
import { useMediaQuery } from '@/hooks/use-media-query';

// Campaign types
export type Channel = 'email' | 'linkedin' | 'sms' | 'calls';
export type Status = 'active' | 'paused' | 'completed' | 'draft' | 'failed';
export type IcpSegment = 'SaaS' | 'Financial' | 'Insurance' | 'Healthcare' | 'Retail';

export interface Campaign {
  id: string;
  name: string;
  status: Status;
  channels: Channel[];
  icpSegment: IcpSegment;
  leadsFound: number;
  targetLeads: number;
  engagementRate: number;
  createdAt: string;
  updatedAt: string;
}

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isNewCampaignModalOpen, setIsNewCampaignModalOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  useEffect(() => {
    setIsMobileView(isMobile);
  }, [isMobile]);
  
  useEffect(() => {
    // Fetch campaigns data
    fetchCampaigns();
    
    // Setup WebSocket for real-time updates
    const ws = new WebSocket('ws://localhost:4000/events');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'CAMPAIGN_UPDATED') {
        fetchCampaigns();
      }
    };
    
    return () => {
      ws.close();
    };
  }, []);
  
  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/campaigns');
      // const data = await response.json();
      
      // Mock data for now
      setTimeout(() => {
        const mockCampaigns: Campaign[] = [
          {
            id: '1',
            name: 'Q2 Decision Makers Outreach',
            status: 'active',
            channels: ['email', 'linkedin', 'calls'],
            icpSegment: 'SaaS',
            leadsFound: 124,
            targetLeads: 250,
            engagementRate: 32,
            createdAt: '2025-04-28T10:30:00Z',
            updatedAt: '2025-05-18T14:23:00Z'
          },
          {
            id: '2',
            name: 'Tech Leaders Follow-up',
            status: 'paused',
            channels: ['email', 'linkedin'],
            icpSegment: 'Financial',
            leadsFound: 54,
            targetLeads: 180,
            engagementRate: 18,
            createdAt: '2025-04-15T09:45:00Z',
            updatedAt: '2025-05-17T11:10:00Z'
          },
          {
            id: '3',
            name: 'HR Professionals Campaign',
            status: 'completed',
            channels: ['email', 'linkedin', 'sms', 'calls'],
            icpSegment: 'Insurance',
            leadsFound: 243,
            targetLeads: 243,
            engagementRate: 45,
            createdAt: '2025-04-01T08:20:00Z',
            updatedAt: '2025-05-15T17:40:00Z'
          },
          {
            id: '4',
            name: 'Startup Founders Series',
            status: 'draft',
            channels: ['email', 'calls'],
            icpSegment: 'SaaS',
            leadsFound: 0,
            targetLeads: 120,
            engagementRate: 0,
            createdAt: '2025-05-10T16:15:00Z',
            updatedAt: '2025-05-10T16:15:00Z'
          },
          {
            id: '5',
            name: 'Enterprise Accounts Nurture',
            status: 'active',
            channels: ['email', 'linkedin', 'sms'],
            icpSegment: 'Healthcare',
            leadsFound: 36,
            targetLeads: 85,
            engagementRate: 26,
            createdAt: '2025-05-05T11:30:00Z',
            updatedAt: '2025-05-18T09:15:00Z'
          },
        ];
        
        setCampaigns(mockCampaigns);
        if (!selectedCampaign && mockCampaigns.length > 0) {
          setSelectedCampaign(mockCampaigns[0]);
        }
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast({
        title: 'Error Fetching Campaigns',
        description: 'Failed to load campaign data. Please try again.',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  const handleCreateCampaign = async (campaignData: any) => {
    try {
      // In a real app, this would be a POST request
      // await fetch('/api/campaigns', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(campaignData)
      // });
      
      // Mock creating a campaign
      toast({
        title: 'Campaign Created',
        description: `${campaignData.name} has been created successfully.`,
      });
      
      fetchCampaigns();
      setIsNewCampaignModalOpen(false);
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: 'Error Creating Campaign',
        description: 'Failed to create campaign. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleToggleAllCampaigns = async (action: 'pause' | 'resume') => {
    try {
      // In a real app, this would be a POST request
      // await fetch(`/api/campaigns/status`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: action === 'pause' ? 'paused' : 'active' })
      // });
      
      // Mock toggling campaigns
      toast({
        title: `All Campaigns ${action === 'pause' ? 'Paused' : 'Resumed'}`,
        description: `Successfully ${action === 'pause' ? 'paused' : 'resumed'} all campaigns.`,
      });
      
      fetchCampaigns();
    } catch (error) {
      console.error(`Error ${action}ing all campaigns:`, error);
      toast({
        title: `Error ${action === 'pause' ? 'Pausing' : 'Resuming'} Campaigns`,
        description: `Failed to ${action} all campaigns. Please try again.`,
        variant: 'destructive',
      });
    }
  };
  
  const renderMobileView = () => {
    if (selectedCampaign) {
      return (
        <CampaignDetail 
          campaign={selectedCampaign} 
          onBack={() => setSelectedCampaign(null)} 
          isMobile={true} 
        />
      );
    }
    
    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-neutral-dark">Campaign Studio</h2>
            <p className="text-sm text-neutral-dark/70">
              {campaigns.length} campaigns total • {campaigns.filter(c => c.status === 'active').length} active
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleToggleAllCampaigns('pause')}
              className="hidden sm:flex items-center"
            >
              <PauseCircle size={16} className="mr-1" />
              Pause All
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleToggleAllCampaigns('resume')}
              className="hidden sm:flex items-center"
            >
              <PlayCircle size={16} className="mr-1" />
              Resume All
            </Button>
            <Button 
              className="bg-secondary text-white flex items-center" 
              onClick={() => setIsNewCampaignModalOpen(true)}
            >
              <Plus size={16} className="mr-1" />
              New
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : (
          <CampaignList 
            campaigns={campaigns} 
            onSelectCampaign={setSelectedCampaign} 
            selectedCampaignId={selectedCampaign?.id} 
          />
        )}
      </>
    );
  };

  const renderDesktopView = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-5 lg:col-span-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-neutral-dark">Campaign Studio</h2>
              <p className="text-sm text-neutral-dark/70">
                {campaigns.length} campaigns total • {campaigns.filter(c => c.status === 'active').length} active
              </p>
            </div>
            <Button 
              className="bg-secondary text-white flex items-center" 
              onClick={() => setIsNewCampaignModalOpen(true)}
            >
              <Plus size={16} className="mr-1" />
              New
            </Button>
          </div>
          
          <div className="flex gap-2 mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleToggleAllCampaigns('pause')}
              className="flex-1 flex items-center justify-center"
            >
              <PauseCircle size={16} className="mr-1" />
              Pause All
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleToggleAllCampaigns('resume')}
              className="flex-1 flex items-center justify-center"
            >
              <PlayCircle size={16} className="mr-1" />
              Resume All
            </Button>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          ) : (
            <CampaignList 
              campaigns={campaigns} 
              onSelectCampaign={setSelectedCampaign} 
              selectedCampaignId={selectedCampaign?.id} 
            />
          )}
        </div>
        
        <div className="md:col-span-7 lg:col-span-8">
          {selectedCampaign ? (
            <CampaignDetail campaign={selectedCampaign} />
          ) : (
            <div className="flex h-full items-center justify-center border border-dashed rounded-lg p-8">
              <div className="text-center">
                <p className="text-neutral-dark/60 mb-4">Select a campaign to view details</p>
                <Button 
                  variant="outline" 
                  onClick={() => setIsNewCampaignModalOpen(true)}
                >
                  Create New Campaign
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout title="Campaign Studio" subtitle="Create and manage your multi-channel outreach campaigns">
      {isMobileView ? renderMobileView() : renderDesktopView()}
      
      <NewCampaignModal 
        isOpen={isNewCampaignModalOpen}
        onClose={() => setIsNewCampaignModalOpen(false)}
        onCreate={handleCreateCampaign}
      />
    </Layout>
  );
};

export default Campaigns;
