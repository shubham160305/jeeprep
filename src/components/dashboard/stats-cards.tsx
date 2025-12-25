import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { stats } from '@/lib/data';
import { BookCopy, Target, Award, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type StatCard = {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description: string;
};

export default function StatsCards() {
    const statData: StatCard[] = [
        {
            title: 'Chapters Completed',
            value: stats.chaptersCompleted,
            icon: BookCopy,
            description: 'Keep up the learning!',
        },
        {
            title: 'Tests Taken',
            value: stats.testsTaken,
            icon: Target,
            description: 'Practice makes perfect.',
        },
        {
            title: 'Average Score',
            value: `${stats.averageScore}%`,
            icon: Award,
            description: 'Excellent performance.',
        },
        {
            title: 'Hours Learned',
            value: stats.hoursLearned,
            icon: Clock,
            description: 'Time well spent.',
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statData.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">{stat.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
