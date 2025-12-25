'use server';

/**
 * @fileOverview Doubt Solving Bot AI agent.
 *
 * - askDoubt - A function that handles student questions related to frontend development.
 * - AskDoubtInput - The input type for the askDoubt function.
 * - AskDoubtOutput - The return type for the askDoubt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskDoubtInputSchema = z.object({
  question: z.string().describe('The question asked by the student.'),
});
export type AskDoubtInput = z.infer<typeof AskDoubtInputSchema>;

const AskDoubtOutputSchema = z.object({
  answer: z.string().describe('The answer to the student question.'),
});
export type AskDoubtOutput = z.infer<typeof AskDoubtOutputSchema>;

export async function askDoubt(input: AskDoubtInput): Promise<AskDoubtOutput> {
  return askDoubtFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askDoubtPrompt',
  input: {schema: AskDoubtInputSchema},
  output: {schema: AskDoubtOutputSchema},
  prompt: `You are an expert tutor for the JEE (Joint Entrance Examination) in India, specializing in Physics, Chemistry, and Mathematics. You are a helpful AI assistant for students preparing for the JEE. Answer the following question clearly and concisely, as if you are explaining it to a high school student.\n\nQuestion: {{{question}}}`,
});

const askDoubtFlow = ai.defineFlow(
  {
    name: 'askDoubtFlow',
    inputSchema: AskDoubtInputSchema,
    outputSchema: AskDoubtOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
