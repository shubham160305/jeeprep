'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LecturePage() {
  const { lectureId } = useParams();
  const [lecture, setLecture] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/lectures?lectureId=${lectureId}`)
      .then(res => res.json())
      .then(setLecture);
  }, [lectureId]);

  if (!lecture) return null;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">{lecture.title}</h1>

      {/* ✅ THIS IS THE FIX */}
      <iframe
        src={`https://www.youtube.com/embed/${lecture.video_id}`}
        className="w-full aspect-video rounded"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
