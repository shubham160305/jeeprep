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
  prompt: `You are a 15-year experienced frontend developer and a helpful AI assistant for students learning frontend development. Answer the following question clearly and concisely.\n\nQuestion: {{{question}}}`,
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
