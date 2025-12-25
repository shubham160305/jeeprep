import { notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import { tutorials } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function TutorialDetailPage({ params }: { params: { id: string } }) {
  const tutorial = tutorials.find((t) => t.id === params.id);

  if (!tutorial) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title={tutorial.title} />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-4xl">
            <Card className="overflow-hidden">
                <div className="aspect-video w-full">
                    <iframe
                        className="h-full w-full"
                        src={tutorial.videoUrl}
                        title={tutorial.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </Card>

            <div className="mt-6">
                <Badge variant="secondary" className="mb-4 flex w-fit items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {tutorial.duration}
                </Badge>
                <h2 className="mb-4 font-headline text-2xl font-bold">About this tutorial</h2>
                <p className="text-muted-foreground">{tutorial.description}</p>
            </div>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
    return tutorials.map((tutorial) => ({
      id: tutorial.id,
    }));
}
