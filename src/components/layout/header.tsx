import { SidebarTrigger } from '@/components/ui/sidebar';

type HeaderProps = {
  title: string;
  description?: string;
};

export default function Header({ title, description }: HeaderProps) {
  return (
    <header className="flex h-20 items-center gap-4 border-b bg-card px-6">
        <SidebarTrigger className="md:hidden" />
      <div>
        <h1 className="text-2xl font-headline font-bold text-foreground">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
    </header>
  );
}
