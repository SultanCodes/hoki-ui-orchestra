
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import CampaignCard from '../components/campaigns/CampaignCard';
import CampaignFilters from '../components/campaigns/CampaignFilters';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Spinner from '../components/common/Spinner';

// Mock campaign data
const mockCampaigns = [
  {
    id: '1',
    name: 'Q2 Decision Makers Outreach',
    status: 'active' as const,
    progress: 65,
    channels: ['email', 'linkedin', 'calls'] as const,
    leads: { total: 250, engaged: 124 },
    lastUpdated: '2 hours ago'
  },
  {
    id: '2',
    name: 'Tech Leaders Follow-up',
    status: 'paused' as const,
    progress: 30,
    channels: ['email', 'linkedin'] as const,
    leads: { total: 180, engaged: 54 },
    lastUpdated: '1 day ago'
  },
  {
    id: '3',
    name: 'HR Professionals Campaign',
    status: 'completed' as const,
    progress: 100,
    channels: ['email', 'linkedin', 'sms', 'calls'] as const,
    leads: { total: 300, engaged: 243 },
    lastUpdated: '1 week ago'
  },
  {
    id: '4',
    name: 'Startup Founders Series',
    status: 'draft' as const,
    progress: 0,
    channels: ['email', 'calls'] as const,
    leads: { total: 120, engaged: 0 },
    lastUpdated: '3 days ago'
  },
  {
    id: '5',
    name: 'Enterprise Accounts Nurture',
    status: 'active' as const,
    progress: 42,
    channels: ['email', 'linkedin', 'sms'] as const,
    leads: { total: 85, engaged: 36 },
    lastUpdated: '5 hours ago'
  },
  {
    id: '6',
    name: 'Product Launch Announcement',
    status: 'active' as const,
    progress: 78,
    channels: ['email', 'sms'] as const,
    leads: { total: 500, engaged: 389 },
    lastUpdated: '12 hours ago'
  }
];

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<typeof mockCampaigns>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCampaigns(mockCampaigns);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Layout title="Campaign Studio" subtitle="Create and manage your multi-channel campaigns">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-neutral-dark">Your Campaigns</h2>
          <p className="text-sm text-neutral-dark/70">
            {campaigns.length} campaigns total • {campaigns.filter(c => c.status === 'active').length} active
          </p>
        </div>
        <Button className="bg-secondary text-white flex items-center">
          <Plus size={16} className="mr-2" />
          New Campaign
        </Button>
      </div>
      
      <CampaignFilters onFilterChange={setFilters} />
      
      {loading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              id={campaign.id}
              name={campaign.name}
              status={campaign.status}
              progress={campaign.progress}
              channels={campaign.channels}
              leads={campaign.leads}
              lastUpdated={campaign.lastUpdated}
            />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Campaigns;
