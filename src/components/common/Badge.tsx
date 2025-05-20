
import { Badge as ShadcnBadge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'success' | 'error' | 'warning' | 'primary' | 'secondary' | 'email' | 'linkedin' | 'sms' | 'calls';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'primary', children, className }) => {
  const badgeClasses = {
    success: 'bg-success/20 text-success',
    error: 'bg-error/20 text-error',
    warning: 'bg-warning/20 text-neutral-dark',
    primary: 'bg-primary/20 text-primary',
    secondary: 'bg-secondary/20 text-secondary',
    email: 'bg-channel-email/20 text-channel-email',
    linkedin: 'bg-channel-linkedin/20 text-channel-linkedin',
    sms: 'bg-channel-sms/20 text-channel-sms',
    calls: 'bg-channel-calls/20 text-neutral-dark',
  };

  return (
    <ShadcnBadge className={cn(badgeClasses[variant], 'font-medium', className)}>
      {children}
    </ShadcnBadge>
  );
};

export default Badge;
