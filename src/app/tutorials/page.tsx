import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/header';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { tutorials } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Clock } from 'lucide-react';

export default function TutorialsPage() {
    const imageMap = new Map(PlaceHolderImages.map(img => [img.id, img]));

    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header title="Video Tutorials" description="Expand your frontend skills with our expert-led courses." />
            <main className="flex-1 p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tutorials.map((tutorial) => {
                        const placeholder = imageMap.get(tutorial.imageId);
                        return (
                            <Link href={`/tutorials/${tutorial.id}`} key={tutorial.id} className="group">
                                <Card className="flex h-full flex-col overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                                    <CardHeader className="p-0">
                                        <div className="relative h-48 w-full">
                                            {placeholder && (
                                                <Image
                                                    src={placeholder.imageUrl}
                                                    alt={tutorial.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="object-cover"
                                                    data-ai-hint={placeholder.imageHint}
                                                />
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1 p-4">
                                        <CardTitle className="mb-2 font-headline text-lg">{tutorial.title}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0">
                                        <Badge variant="secondary" className="flex items-center gap-1.5">
                                            <Clock className="h-3 w-3" />
                                            {tutorial.duration}
                                        </Badge>
                                    </CardFooter>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
