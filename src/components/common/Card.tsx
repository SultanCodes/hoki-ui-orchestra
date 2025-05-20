
import { Card as ShadcnCard } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <ShadcnCard className={cn('p-5', className)}>
      {children}
    </ShadcnCard>
  );
};

export default Card;
