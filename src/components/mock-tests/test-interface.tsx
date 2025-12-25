'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Sparkles, CheckCircle, XCircle, RotateCw } from 'lucide-react';
import { getHint } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';

type Question = {
  id: string;
  question: string;
  options: string[];
  answer: string;
};

type TestInterfaceProps = {
  questions: Question[];
  testId: string;
};

export default function TestInterface({ questions, testId }: TestInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const { toast } = useToast();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + (isFinished ? 1 : 0)) / questions.length) * 100;

  const handleCheckAnswer = () => {
    if (!selectedAnswer) {
      toast({
        title: 'No answer selected',
        description: 'Please choose an option before checking.',
        variant: 'destructive',
      });
      return;
    }

    const correct = selectedAnswer === currentQuestion.answer;
    setIsCorrect(correct);
    setIsAnswered(true);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setHint(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setIsFinished(false);
    setHint(null);
  };

  const handleGetHint = async (level: 'small' | 'big') => {
    setIsHintLoading(true);
    setHint(null);
    const result = await getHint({
      question: currentQuestion.question,
      hintLevel: level,
    });
    setIsHintLoading(false);

    if (result.serverError) {
      toast({
        title: 'Error getting hint',
        description: result.serverError,
        variant: 'destructive',
      });
    } else if (result.data) {
      setHint(result.data.hint);
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This test is currently under construction. Please check back later!</p>
        </CardContent>
      </Card>
    );
  }
  
  if (isFinished) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Test Complete!</CardTitle>
          <CardDescription>You've reached the end of the test.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <p className="text-lg text-muted-foreground">Your Final Score:</p>
            <p className="text-5xl font-bold text-primary">{Math.round((score / questions.length) * 100)}%</p>
            <p className="mt-2 text-muted-foreground">You answered {score} out of {questions.length} questions correctly.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleRestart} className="w-full">
            <RotateCw className="mr-2 h-4 w-4" />
            Take Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <>
    <div className="mb-4">
      <Progress value={progress} className="w-full" />
      <p className="mt-2 text-sm text-center text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">{currentQuestion.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswer ?? ''}
          onValueChange={setSelectedAnswer}
          disabled={isAnswered}
        >
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
        
        {isAnswered && (
          <Alert variant={isCorrect ? 'default' : 'destructive'} className="mt-4 bg-opacity-20">
            {isCorrect ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            <AlertTitle>{isCorrect ? 'Correct!' : 'Incorrect'}</AlertTitle>
            {!isCorrect && <AlertDescription>The correct answer is: {currentQuestion.answer}</AlertDescription>}
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2 sm:flex-row">
        {!isAnswered ? (
          <Button onClick={handleCheckAnswer} className="flex-1">Check Answer</Button>
        ) : (
          <Button onClick={handleNextQuestion} className="flex-1">Next Question</Button>
        )}
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleGetHint('small')} disabled={isAnswered || isHintLoading}>
                <Lightbulb className="mr-2 h-4 w-4" /> Small Hint
            </Button>
            <Button variant="outline" onClick={() => handleGetHint('big')} disabled={isAnswered || isHintLoading} className="bg-accent/20 text-accent-foreground hover:bg-accent/30">
                <Sparkles className="mr-2 h-4 w-4" /> Big Hint
            </Button>
        </div>
      </CardFooter>
    </Card>

    <Dialog open={!!hint || isHintLoading} onOpenChange={(open) => !open && setHint(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-headline">
                <Sparkles className="text-accent"/> Here's a hint!
            </DialogTitle>
            <DialogDescription>
              {isHintLoading ? 'Generating your hint...' : hint}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Got it, thanks!</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  );
}
