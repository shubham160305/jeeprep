import Header from '@/components/layout/header';
import ChatInterface from '@/components/doubts/chat-interface';

export default function DoubtsPage() {
  return (
    <div className="flex h-screen flex-col">
      <Header title="Doubt Solver" description="Ask our AI tutor anything about Physics, Chemistry, or Math." />
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-2xl h-full">
            <ChatInterface />
        </div>
      </main>
    </div>
  );
}
