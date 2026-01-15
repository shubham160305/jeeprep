export const user = {
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
};

export const stats = {
    chaptersCompleted: 12,
    testsTaken: 6,
    averageScore: 78,
    hoursLearned: 45,
};

export const progressData = [
    { date: 'Jan', score: 65 },
    { date: 'Feb', score: 68 },
    { date: 'Mar', score: 72 },
    { date: 'Apr', score: 75 },
    { date: 'May', score: 81 },
    { date: 'Jun', score: 78 },
];

export const tutorials = [
    {
      id: 'kinematics-1d',
      title: 'Kinematics 1D',
      description: 'Master the concepts of motion in a straight line.',
      duration: '1 hr 30 mins',
      imageId: 'physics-kinematics',
      videoUrl: 'https://www.youtube.com/embed/videoseries?list=PL_A48Dfsdbjc1qup-j2b1jXpJHn4j41d8',
    },
    {
      id: 'thermodynamics',
      title: 'Thermodynamics',
      description: 'Understand the laws of heat and energy transfer.',
      duration: '2 hr 15 mins',
      imageId: 'chemistry-thermo',
      videoUrl: 'https://www.youtube.com/embed/videoseries?list=PL_A48Dfsdbjdy35f92W_b6jE3IPRA5A-e',
    },
    {
      id: 'calculus-basics',
      title: 'Calculus Fundamentals',
      description: 'Grasp the core principles of differentiation and integration.',
      duration: '3 hrs',
      imageId: 'math-calculus',
      videoUrl: 'https://www.youtube.com/embed/videoseries?list=PL_A48Dfsdbjf92g2b9sS-hA-AM83vR4Kj',
    },
    {
      id: 'organic-chemistry',
      title: 'Intro to Organic Chemistry',
      description: 'Learn the basics of carbon compounds and their reactions.',
      duration: '2 hr 45 mins',
      imageId: 'chemistry-organic',
      videoUrl: 'https://www.youtube.com/embed/videoseries?list=PL_A48Dfsdbjc-t5aMQAi6L62NlFea3iZR',
    },
    {
      id: 'electromagnetism',
      title: 'Electromagnetism',
      description: 'Explore the relationship between electricity and magnetism.',
      duration: '2 hr',
      imageId: 'physics-em',
      videoUrl: 'https://www.youtube.com/embed/videoseries?list=PL_A48Dfsdbjd-x92iIuSjVtACbFVIJpP2',
    },
    {
      id: 'algebra-advanced',
      title: 'Advanced Algebra',
      description: 'Tackle complex equations and functions with confidence.',
      duration: '2 hr 20 mins',
      imageId: 'math-algebra',
      videoUrl: 'https://www.youtube.com/embed/videoseries?list=PL_A48DfsdbjeiA3u7Cx55aYjyw-MTyEXt',
    },
];

export const subjects = [
  {
    id: 'physics',
    title: 'Physics',
    description: 'Mechanics, Thermodynamics, Optics & Modern Physics',
    duration: '25 Chapters',
    imageId: 'physics',
  },
  {
    id: 'chemistry',
    title: 'Chemistry',
    description: 'Physical, Organic & Inorganic Chemistry',
    duration: '22 Chapters',
    imageId: 'chemistry',
  },
  {
    id: 'maths',
    title: 'Mathematics',
    description: 'Algebra, Calculus, Trigonometry & Coordinate Geometry',
    duration: '30 Chapters',
    imageId: 'maths',
  },
];


export const mockTests = [
    {
        id: 'physics-mechanics-1',
        title: 'Physics: Mechanics Test',
        description: 'Test your knowledge on core mechanics concepts.',
        questionCount: 3,
    },
    {
        id: 'chemistry-structure-1',
        title: 'Chemistry: Atomic Structure Quiz',
        description: 'Assess your understanding of atomic models and electron configurations.',
        questionCount: 2,
    },
];

export const mockTestQuestions: { [key: string]: { id: string; question: string; options: string[]; answer: string; }[] } = {
    'physics-mechanics-1': [
        {
            id: 'q1',
            question: 'A body of mass 2kg is moving with a velocity of 8 m/s on a smooth surface. If it is to be brought to rest in 4 seconds, then the force to be applied is',
            options: ['8 N', '4 N', '2 N', '1 N'],
            answer: '4 N',
        },
        {
            id: 'q2',
            question: "The moment of inertia of a body depends on",
            options: ['Mass of the body', 'Axis of rotation of the body', 'Distribution of mass in the body', 'All of the above'],
            answer: 'All of the above',
        },
        {
            id: 'q3',
            question: 'The escape velocity from the earth\'s surface is given by',
            options: ['7.9 km/s', '11.2 km/s', '1.12 km/s', '7.9 m/s'],
            answer: '11.2 km/s',
        },
    ],
    'react-quiz-1': [],
    'chemistry-structure-1': [
        {
            id: 'q1',
            question: 'Which of the following orbitals has a dumb-bell shape?',
            options: ['s-orbital', 'p-orbital', 'd-orbital', 'f-orbital'],
            answer: 'p-orbital',
        },
        {
            id: 'q2',
            question: 'The number of unpaired electrons in a chromic ion Cr³⁺ (atomic number 24) is',
            options: ['2', '3', '4', '5'],
            answer: '3',
        },
    ],
};
