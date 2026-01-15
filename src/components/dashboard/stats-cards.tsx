'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

type Props = {
  data: {
    chaptersCompleted: number;
    testsTaken: number;
    averageScore: number;
    hoursLearned: number;
  };
};

export default function StatsCards({ data }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Chapters Completed</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {data.chaptersCompleted}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tests Taken</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {data.testsTaken}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Score</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {data.averageScore}%
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hours Learned</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {data.hoursLearned}
        </CardContent>
      </Card>
    </div>
  );
}
