export const user = {
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
};

export const stats = {
    tutorialsCompleted: 8,
    testsTaken: 4,
    averageScore: 88,
    hoursLearned: 22,
};

export const progressData = [
    { date: 'Jan', score: 78 },
    { date: 'Feb', score: 82 },
    { date: 'Mar', score: 85 },
    { date: 'Apr', score: 92 },
    { date: 'May', score: 88 },
    { date: 'Jun', score: 91 },
];

export const tutorials = [
    {
      id: 'html-basics',
      title: 'HTML Fundamentals',
      description: 'Master the core concepts of HTML, the backbone of the web.',
      duration: '45 mins',
      imageId: 'html-basics',
      videoUrl: 'https://www.youtube.com/embed/pQN-pnXPaVg',
    },
    {
      id: 'css-flexbox',
      title: 'Advanced CSS with Flexbox',
      description: 'Learn how to create responsive layouts with ease using Flexbox.',
      duration: '1 hr 15 mins',
      imageId: 'css-flexbox',
      videoUrl: 'https://www.youtube.com/embed/3YW65K6LcIA',
    },
    {
      id: 'js-fundamentals',
      title: 'JavaScript for Beginners',
      description: 'Get started with the most popular programming language on the web.',
      duration: '2 hrs 30 mins',
      imageId: 'js-fundamentals',
      videoUrl: 'https://www.youtube.com/embed/PkZNo7MFNFg',
    },
    {
      id: 'react-hooks',
      title: 'Deep Dive into React Hooks',
      description: 'Unlock the full potential of functional components with React Hooks.',
      duration: '1 hr 45 mins',
      imageId: 'react-hooks',
      videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q',
    },
    {
      id: 'nextjs-routing',
      title: 'Mastering Next.js App Router',
      description: 'Explore the powerful new routing system in Next.js.',
      duration: '55 mins',
      imageId: 'nextjs-routing',
      videoUrl: 'https://www.youtube.com/embed/s_g-3iM2b20',
    },
    {
      id: 'typescript-types',
      title: 'TypeScript for Professionals',
      description: 'Add static typing to your JavaScript to build robust applications.',
      duration: '2 hrs 10 mins',
      imageId: 'typescript-types',
      videoUrl: 'https://www.youtube.com/embed/d56mG7DezGs',
    },
];

export const mockTests = [
    {
        id: 'frontend-basics-1',
        title: 'Frontend Basics - Test 1',
        description: 'Test your knowledge on fundamental HTML, CSS, and JavaScript concepts.',
        questionCount: 3,
    },
    {
        id: 'react-quiz-1',
        title: 'React Fundamentals Quiz',
        description: 'Assess your understanding of core React principles like components, state, and props.',
        questionCount: 2,
    },
];

export const mockTestQuestions: { [key: string]: { id: string; question: string; options: string[]; answer: string; }[] } = {
    'frontend-basics-1': [
        {
            id: 'q1',
            question: 'Which HTML tag is used to define an internal style sheet?',
            options: ['<script>', '<css>', '<style>', '<link>'],
            answer: '<style>',
        },
        {
            id: 'q2',
            question: "What is the correct CSS syntax for making all the <p> elements bold?",
            options: ['p {font-weight: bold;}', 'p {text-size: bold;}', '<p style="font-size:bold;">', 'p {font: bold;}'],
            answer: 'p {font-weight: bold;}',
        },
        {
            id: 'q3',
            question: 'How do you write "Hello World" in an alert box using JavaScript?',
            options: ['msg("Hello World");', 'alert("Hello World");', 'alertBox("Hello World");', 'msgBox("Hello World");'],
            answer: 'alert("Hello World");',
        },
    ],
    'react-quiz-1': [
        {
            id: 'q1',
            question: 'What is the correct way to pass a prop named "message" with the value "Hello" to a component named "Welcome"?',
            options: ['<Welcome message="Hello" />', '<Welcome prop="message: Hello" />', '<Welcome>"Hello"</Welcome>', '<Welcome message={"Hello"} />'],
            answer: '<Welcome message="Hello" />',
        },
        {
            id: 'q2',
            question: 'Which hook is used to manage state in a functional React component?',
            options: ['useEffect', 'useState', 'useContext', 'useReducer'],
            answer: 'useState',
        },
    ],
};
