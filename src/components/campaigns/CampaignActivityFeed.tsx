
import React, { useEffect, useState } from 'react';
import { Mail, Linkedin, MessageSquare, Phone, User, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { Spinner } from '../common/Spinner';

interface ActivityEvent {
  id: string;
  type: 'email_sent' | 'email_opened' | 'linkedin_sent' | 'linkedin_reply' | 'sms_sent' | 'sms_reply' | 'call_scheduled' | 'call_completed' | 'lead_added' | 'lead_qualified' | 'lead_disqualified';
  timestamp: string;
  data: {
    leadName?: string;
    leadCompany?: string;
    leadTitle?: string;
    message?: string;
    channel?: 'email' | 'linkedin' | 'sms' | 'calls';
    scheduledTime?: string;
  };
}

interface CampaignActivityFeedProps {
  campaignId: string;
}

const CampaignActivityFeed: React.FC<CampaignActivityFeedProps> = ({ campaignId }) => {
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActivityEvents();
  }, [campaignId]);

  const fetchActivityEvents = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/campaigns/${campaignId}/events`);
      // const data = await response.json();
      
      // Mock data
      setTimeout(() => {
        const mockEvents: ActivityEvent[] = [
          {
            id: '1',
            type: 'email_sent',
            timestamp: '2025-05-19T14:32:00Z',
            data: {
              leadName: 'Sarah Johnson',
              leadCompany: 'TechSolutions Inc.',
              leadTitle: 'VP of Marketing',
              channel: 'email',
              message: 'Initial outreach email sent'
            }
          },
          {
            id: '2',
            type: 'linkedin_sent',
            timestamp: '2025-05-19T13:25:00Z',
            data: {
              leadName: 'David Chen',
              leadCompany: 'Innovate Financial',
              leadTitle: 'Chief Technology Officer',
              channel: 'linkedin',
              message: 'Connection request sent'
            }
          },
          {
            id: '3',
            type: 'email_opened',
            timestamp: '2025-05-19T12:47:00Z',
            data: {
              leadName: 'Michael Reynolds',
              leadCompany: 'Global Insurance Co.',
              leadTitle: 'Head of Sales',
              channel: 'email'
            }
          },
          {
            id: '4',
            type: 'lead_qualified',
            timestamp: '2025-05-19T11:30:00Z',
            data: {
              leadName: 'Jessica Wong',
              leadCompany: 'HealthCare Plus',
              leadTitle: 'Director of Operations'
            }
          },
          {
            id: '5',
            type: 'call_scheduled',
            timestamp: '2025-05-19T10:15:00Z',
            data: {
              leadName: 'Robert Smith',
              leadCompany: 'Enterprise Solutions',
              leadTitle: 'CEO',
              channel: 'calls',
              scheduledTime: '2025-05-21T15:00:00Z'
            }
          },
          {
            id: '6',
            type: 'sms_reply',
            timestamp: '2025-05-19T09:05:00Z',
            data: {
              leadName: 'Amanda Torres',
              leadCompany: 'Retail Innovations',
              leadTitle: 'Procurement Manager',
              channel: 'sms',
              message: 'Interested in learning more, please call me'
            }
          },
          {
            id: '7',
            type: 'lead_disqualified',
            timestamp: '2025-05-18T17:22:00Z',
            data: {
              leadName: 'Thomas Wilson',
              leadCompany: 'Small Business LLC',
              leadTitle: 'Owner',
              message: 'Company size too small for our solution'
            }
          },
          {
            id: '8',
            type: 'linkedin_reply',
            timestamp: '2025-05-18T16:30:00Z',
            data: {
              leadName: 'Laura Garcia',
              leadCompany: 'Tech Innovations',
              leadTitle: 'Head of Product',
              channel: 'linkedin',
              message: 'Thanks for reaching out, let\'s connect next week'
            }
          },
          {
            id: '9',
            type: 'lead_added',
            timestamp: '2025-05-18T14:10:00Z',
            data: {
              leadName: 'James Morgan',
              leadCompany: 'Financial Services Group',
              leadTitle: 'CFO'
            }
          },
          {
            id: '10',
            type: 'call_completed',
            timestamp: '2025-05-18T11:45:00Z',
            data: {
              leadName: 'Emma Davis',
              leadCompany: 'SaaS Solutions',
              leadTitle: 'VP of Sales',
              channel: 'calls',
              message: 'Positive call, scheduling follow-up demo'
            }
          }
        ];
        
        setEvents(mockEvents);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching activity events:', error);
      setError('Failed to load activity feed. Please try again.');
      setLoading(false);
    }
  };
  
  const getEventIcon = (event: ActivityEvent) => {
    const iconSize = 16;
    
    switch (event.type) {
      case 'email_sent':
      case 'email_opened':
        return <Mail size={iconSize} className="text-channel-email" />;
      case 'linkedin_sent':
      case 'linkedin_reply':
        return <Linkedin size={iconSize} className="text-channel-linkedin" />;
      case 'sms_sent':
      case 'sms_reply':
        return <MessageSquare size={iconSize} className="text-channel-sms" />;
      case 'call_scheduled':
      case 'call_completed':
        return <Phone size={iconSize} className="text-channel-calls" />;
      case 'lead_added':
        return <User size={iconSize} className="text-gray-600" />;
      case 'lead_qualified':
        return <CheckCircle size={iconSize} className="text-success" />;
      case 'lead_disqualified':
        return <XCircle size={iconSize} className="text-error" />;
      default:
        return <User size={iconSize} className="text-gray-600" />;
    }
  };
  
  const getEventTitle = (event: ActivityEvent) => {
    const { leadName, leadCompany, leadTitle } = event.data;
    
    switch (event.type) {
      case 'email_sent':
        return `Email sent to ${leadName}`;
      case 'email_opened':
        return `Email opened by ${leadName}`;
      case 'linkedin_sent':
        return `LinkedIn message sent to ${leadName}`;
      case 'linkedin_reply':
        return `LinkedIn reply from ${leadName}`;
      case 'sms_sent':
        return `SMS sent to ${leadName}`;
      case 'sms_reply':
        return `SMS reply from ${leadName}`;
      case 'call_scheduled':
        return `Call scheduled with ${leadName}`;
      case 'call_completed':
        return `Call completed with ${leadName}`;
      case 'lead_added':
        return `Lead added: ${leadName}`;
      case 'lead_qualified':
        return `Lead qualified: ${leadName}`;
      case 'lead_disqualified':
        return `Lead disqualified: ${leadName}`;
      default:
        return `Activity with ${leadName}`;
    }
  };
  
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error/10 text-error p-4 rounded-md">
        {error}
        <button 
          className="ml-2 underline" 
          onClick={fetchActivityEvents}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.length === 0 ? (
        <p className="text-center text-neutral-dark/60 py-4">No recent activity found</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="flex gap-3">
              <div className="mt-1 p-1.5 bg-neutral-light rounded-full">
                {getEventIcon(event)}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-neutral-dark">
                    {getEventTitle(event)}
                  </p>
                  <span className="text-xs text-neutral-dark/60">
                    {formatEventDate(event.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-neutral-dark/70">
                  {event.data.leadCompany} • {event.data.leadTitle}
                </p>
                
                {event.data.message && (
                  <p className="text-sm mt-1 bg-neutral-light/50 p-2 rounded">
                    {event.data.message}
                  </p>
                )}
                
                {event.data.scheduledTime && (
                  <div className="flex items-center gap-1 text-sm mt-1 text-primary">
                    <Calendar size={14} />
                    <span>
                      {format(new Date(event.data.scheduledTime), 'MMM d, yyyy h:mm a')}
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CampaignActivityFeed;
