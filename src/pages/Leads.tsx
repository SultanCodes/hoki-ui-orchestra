
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/common/Card';
import Spinner from '../components/common/Spinner';
import { Button } from '@/components/ui/button';
import { Filter, Plus, Download, Search } from 'lucide-react';
import Badge from '../components/common/Badge';

const Leads: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  // Mock leads data
  const mockLeads = [
    { id: '1', name: 'John Smith', company: 'Tech Solutions Inc.', title: 'CTO', source: 'LinkedIn', email: 'john@techsolutions.com', phone: '+1-555-123-4567', status: 'qualified' },
    { id: '2', name: 'Sarah Johnson', company: 'Marketing Experts', title: 'CMO', source: 'Email Campaign', email: 'sarah@marketingexperts.com', phone: '+1-555-234-5678', status: 'new' },
    { id: '3', name: 'Michael Chang', company: 'Data Analytics Co.', title: 'Head of Data', source: 'Webinar', email: 'michael@dataanalytics.com', phone: '+1-555-345-6789', status: 'contacted' },
    { id: '4', name: 'Emma Davies', company: 'Global Finance', title: 'CFO', source: 'Referral', email: 'emma@globalfinance.com', phone: '+1-555-456-7890', status: 'meeting' },
    { id: '5', name: 'Robert Wilson', company: 'Startup Ventures', title: 'Founder', source: 'Conference', email: 'robert@startupventures.com', phone: '+1-555-567-8901', status: 'qualified' },
  ];

  const [leads, setLeads] = useState<typeof mockLeads>([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLeads(mockLeads);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="primary">New</Badge>;
      case 'contacted':
        return <Badge variant="warning">Contacted</Badge>;
      case 'qualified':
        return <Badge variant="success">Qualified</Badge>;
      case 'meeting':
        return <Badge variant="secondary">Meeting Set</Badge>;
      default:
        return null;
    }
  };

  return (
    <Layout title="Leads Explorer" subtitle="Discover and manage your potential customers">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-neutral-dark">Lead Database</h2>
          <p className="text-sm text-neutral-dark/70">
            {leads.length} leads total • {leads.filter(l => l.status === 'qualified').length} qualified
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button className="bg-secondary text-white flex items-center">
            <Plus size={16} className="mr-2" />
            Add Lead
          </Button>
        </div>
      </div>
      
      <Card>
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-dark/50" />
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-neutral-light">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-dark/70 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-dark/70 uppercase tracking-wider">Company</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-dark/70 uppercase tracking-wider">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-dark/70 uppercase tracking-wider">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-dark/70 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-dark/70 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-neutral-light/30 cursor-pointer">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-neutral-dark">{lead.name}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-neutral-dark">{lead.company}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-neutral-dark/70">{lead.title}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-neutral-dark/70">{lead.source}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-neutral-dark/70">{lead.email}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {getStatusBadge(lead.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </Layout>
  );
};

export default Leads;
