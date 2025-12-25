import Header from '@/components/layout/header';
import ChatInterface from '@/components/doubts/chat-interface';

export default function DoubtsPage() {
  return (
    <div className="flex h-screen flex-col">
      <Header title="Doubt Solver" description="Ask our AI tutor anything about Physics, Chemistry, or Math." />
      <main className="flex-1 overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
}
