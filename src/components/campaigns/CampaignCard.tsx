
import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { Mail, Linkedin, MessageSquare, Phone, MoreHorizontal, PlayCircle, PauseCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface CampaignCardProps {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  progress: number;
  channels: Array<'email' | 'linkedin' | 'sms' | 'calls'>;
  leads: {
    total: number;
    engaged: number;
  };
  lastUpdated: string;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  id,
  name,
  status,
  progress,
  channels,
  leads,
  lastUpdated
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'paused':
        return <Badge variant="warning">Paused</Badge>;
      case 'completed':
        return <Badge variant="primary">Completed</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return null;
    }
  };

  const getChannelIcon = (channel: 'email' | 'linkedin' | 'sms' | 'calls') => {
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

  return (
    <Card>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-neutral-dark">{name}</h3>
          <div className="flex items-center space-x-2 mt-1">
            {getStatusBadge()}
            <span className="text-xs text-neutral-dark/60">Updated {lastUpdated}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          {status === 'active' ? (
            <button className="text-warning hover:text-warning/80">
              <PauseCircle size={20} />
            </button>
          ) : status !== 'completed' && (
            <button className="text-success hover:text-success/80">
              <PlayCircle size={20} />
            </button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-neutral-dark/70 hover:text-neutral-dark">
                <MoreHorizontal size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>View Analytics</DropdownMenuItem>
              <DropdownMenuItem className="text-error">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-neutral-dark/70">Progress</span>
          <span className="text-xs font-medium">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-warning h-full rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-between mt-4">
        <div>
          <div className="flex space-x-2 mb-2">
            {channels.map((channel) => (
              <div key={channel} className="p-1 rounded bg-gray-100">
                {getChannelIcon(channel)}
              </div>
            ))}
          </div>
          <p className="text-xs text-neutral-dark/70">{channels.length} channels</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{leads.engaged} / {leads.total}</p>
          <p className="text-xs text-neutral-dark/70">Leads engaged</p>
        </div>
      </div>
    </Card>
  );
};

export default CampaignCard;
