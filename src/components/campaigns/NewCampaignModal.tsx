
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  RadioGroup, 
  RadioGroupItem 
} from '@/components/ui/radio-group';
import { 
  Checkbox
} from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Mail, Linkedin, MessageSquare, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

const NewCampaignModal: React.FC<NewCampaignModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    icpSegment: 'SaaS',
    channels: {
      email: true,
      linkedin: false,
      sms: false,
      calls: false,
    },
    leadTarget: 100,
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 30)), // Default to 30 days from now
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleIcpChange = (value: string) => {
    setFormData(prev => ({ ...prev, icpSegment: value }));
  };
  
  const handleChannelChange = (channel: keyof typeof formData.channels) => {
    setFormData(prev => ({
      ...prev,
      channels: {
        ...prev.channels,
        [channel]: !prev.channels[channel]
      }
    }));
  };
  
  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, startDate: date }));
    }
  };
  
  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, endDate: date }));
    }
  };
  
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Campaign name is required';
    }
    
    const hasSelectedChannel = Object.values(formData.channels).some(selected => selected);
    if (!hasSelectedChannel) {
      newErrors.channels = 'At least one channel must be selected';
    }
    
    if (!formData.leadTarget || formData.leadTarget <= 0) {
      newErrors.leadTarget = 'Lead target must be greater than 0';
    }
    
    if (formData.endDate < formData.startDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Transform channels object to array of selected channels
      const selectedChannels = Object.entries(formData.channels)
        .filter(([_, selected]) => selected)
        .map(([channel]) => channel);
      
      const campaignData = {
        ...formData,
        channels: selectedChannels,
      };
      
      onCreate(campaignData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
          <DialogDescription>
            Set up your new multi-channel outreach campaign
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-2">
            {/* Campaign Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="Q2 Decision Makers Outreach" 
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-xs text-error">{errors.name}</p>
              )}
            </div>
            
            {/* ICP Segment */}
            <div className="space-y-2">
              <Label>ICP Segment</Label>
              <RadioGroup value={formData.icpSegment} onValueChange={handleIcpChange}>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="SaaS" id="icp-saas" />
                    <Label htmlFor="icp-saas">SaaS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Financial" id="icp-financial" />
                    <Label htmlFor="icp-financial">Financial</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Insurance" id="icp-insurance" />
                    <Label htmlFor="icp-insurance">Insurance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Healthcare" id="icp-healthcare" />
                    <Label htmlFor="icp-healthcare">Healthcare</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Retail" id="icp-retail" />
                    <Label htmlFor="icp-retail">Retail</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            {/* Channels */}
            <div className="space-y-2">
              <Label>Channels</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="channel-email" 
                    checked={formData.channels.email} 
                    onCheckedChange={() => handleChannelChange('email')}
                  />
                  <Label htmlFor="channel-email" className="flex items-center gap-1">
                    <Mail size={16} className="text-channel-email" /> Email
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="channel-linkedin" 
                    checked={formData.channels.linkedin} 
                    onCheckedChange={() => handleChannelChange('linkedin')}
                  />
                  <Label htmlFor="channel-linkedin" className="flex items-center gap-1">
                    <Linkedin size={16} className="text-channel-linkedin" /> LinkedIn
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="channel-sms" 
                    checked={formData.channels.sms} 
                    onCheckedChange={() => handleChannelChange('sms')}
                  />
                  <Label htmlFor="channel-sms" className="flex items-center gap-1">
                    <MessageSquare size={16} className="text-channel-sms" /> SMS
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="channel-calls" 
                    checked={formData.channels.calls} 
                    onCheckedChange={() => handleChannelChange('calls')}
                  />
                  <Label htmlFor="channel-calls" className="flex items-center gap-1">
                    <Phone size={16} className="text-channel-calls" /> Calls
                  </Label>
                </div>
              </div>
              {errors.channels && (
                <p className="text-xs text-error">{errors.channels}</p>
              )}
            </div>
            
            {/* Lead Target */}
            <div className="space-y-2">
              <Label htmlFor="leadTarget">Lead Target</Label>
              <Input 
                id="leadTarget" 
                name="leadTarget" 
                type="number" 
                min="1"
                value={formData.leadTarget}
                onChange={handleChange}
              />
              {errors.leadTarget && (
                <p className="text-xs text-error">{errors.leadTarget}</p>
              )}
            </div>
            
            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={handleStartDateChange}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={handleEndDateChange}
                      initialFocus
                      disabled={(date) => date < formData.startDate}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                {errors.endDate && (
                  <p className="text-xs text-error">{errors.endDate}</p>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-secondary text-white">
              Create Campaign
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCampaignModal;
