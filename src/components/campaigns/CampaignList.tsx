
import React from 'react';
import { Campaign, Channel } from '../../pages/Campaigns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Mail, Linkedin, MessageSquare, Phone, MoreHorizontal, Trash2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

interface CampaignListProps {
  campaigns: Campaign[];
  onSelectCampaign: (campaign: Campaign) => void;
  selectedCampaignId?: string;
}

const CampaignList: React.FC<CampaignListProps> = ({ campaigns, onSelectCampaign, selectedCampaignId }) => {
  const getStatusBadge = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success/20 text-success font-medium">Active</Badge>;
      case 'paused':
        return <Badge className="bg-warning/20 text-neutral-dark font-medium">Paused</Badge>;
      case 'completed':
        return <Badge className="bg-primary/20 text-primary font-medium">Completed</Badge>;
      case 'draft':
        return <Badge className="bg-secondary/20 text-secondary font-medium">Draft</Badge>;
      case 'failed':
        return <Badge className="bg-error/20 text-error font-medium">Failed</Badge>;
      default:
        return null;
    }
  };
  
  const getIcpBadge = (icp: Campaign['icpSegment']) => {
    const colors: Record<string, string> = {
      'SaaS': 'bg-blue-100 text-blue-800',
      'Financial': 'bg-green-100 text-green-800',
      'Insurance': 'bg-purple-100 text-purple-800',
      'Healthcare': 'bg-teal-100 text-teal-800',
      'Retail': 'bg-amber-100 text-amber-800',
    };
    
    return <Badge className={`${colors[icp]} font-medium`}>{icp}</Badge>;
  };

  const getChannelIcon = (channel: Channel) => {
    const iconProps = { size: 16 };
    
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
  
  const handleCloneCampaign = async (id: string, name: string) => {
    // In a real app, this would be a POST request
    // await fetch(`/api/campaigns/${id}/clone`, { method: 'POST' });
    
    toast({
      title: 'Campaign Cloned',
      description: `A copy of "${name}" has been created.`
    });
  };
  
  const handleDeleteCampaign = async (id: string, name: string) => {
    // In a real app, this would be a DELETE request
    // await fetch(`/api/campaigns/${id}`, { method: 'DELETE' });
    
    toast({
      title: 'Campaign Deleted',
      description: `"${name}" has been deleted successfully.`
    });
  };
  
  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <div className="bg-white border border-border rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden lg:table-cell">Channels</TableHead>
              <TableHead className="hidden lg:table-cell">ICP</TableHead>
              <TableHead className="hidden md:table-cell">Leads</TableHead>
              <TableHead className="hidden md:table-cell">Engagement</TableHead>
              <TableHead className="hidden lg:table-cell">Created</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow 
                key={campaign.id}
                className={`cursor-pointer ${selectedCampaignId === campaign.id ? 'bg-primary/5' : ''}`}
                onClick={() => onSelectCampaign(campaign)}
              >
                <TableCell>
                  <div>
                    <div className="font-medium">{campaign.name}</div>
                    <div className="md:hidden flex items-center space-x-2 mt-1">
                      {getStatusBadge(campaign.status)}
                      {getIcpBadge(campaign.icpSegment)}
                    </div>
                    <div className="md:hidden flex mt-2">
                      {campaign.channels.map((channel) => (
                        <span key={channel} className="mr-1">
                          {getChannelIcon(channel)}
                        </span>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {getStatusBadge(campaign.status)}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex">
                    {campaign.channels.map((channel) => (
                      <span key={channel} className="mr-1">
                        {getChannelIcon(channel)}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {getIcpBadge(campaign.icpSegment)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="w-32">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{campaign.leadsFound}</span>
                      <span>{campaign.targetLeads}</span>
                    </div>
                    <Progress
                      value={(campaign.leadsFound / campaign.targetLeads) * 100}
                      className="h-2 bg-warning/20"
                    />
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="text-primary font-medium">
                    {campaign.engagementRate}%
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-gray-500 text-sm">
                  {formatDate(campaign.createdAt)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="sm" aria-label="More options">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloneCampaign(campaign.id, campaign.name);
                        }}
                      >
                        <Copy size={14} className="mr-2" /> Clone
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-error"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCampaign(campaign.id, campaign.name);
                        }}
                      >
                        <Trash2 size={14} className="mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            
            {campaigns.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No campaigns found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CampaignList;
