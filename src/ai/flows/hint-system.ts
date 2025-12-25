'use server';
/**
 * @fileOverview Provides hints for mock test questions.
 *
 * - getHint - A function that retrieves a hint for a given question and hint level.
 * - HintInput - The input type for the getHint function.
 * - HintOutput - The return type for the getHint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HintInputSchema = z.object({
  question: z.string().describe('The question the student is trying to answer.'),
  hintLevel: z
    .enum(['small', 'medium', 'big'])
    .describe('The level of hint requested (small, medium, or big).'),
});
export type HintInput = z.infer<typeof HintInputSchema>;

const HintOutputSchema = z.object({
  hint: z.string().describe('The hint to provide to the student.'),
});
export type HintOutput = z.infer<typeof HintOutputSchema>;

export async function getHint(input: HintInput): Promise<HintOutput> {
  return hintFlow(input);
}

const hintPrompt = ai.definePrompt({
  name: 'hintPrompt',
  input: {schema: HintInputSchema},
  output: {schema: HintOutputSchema},
  prompt: `You are an expert JEE (Joint Entrance Examination) tutor.

  A student is stuck on the following question: {{{question}}}

  You need to provide a hint based on the hint level requested by the student. 

  If the hint level is "small", provide a small, subtle hint that nudges the student in the right direction without giving away the answer. Think about mentioning the core concept or formula involved.
  If the hint level is "medium", provide a more direct hint that gives the student a significant clue. You could lay out the first step or point towards a specific part of the problem.
  If the hint level is "big", provide a very detailed hint that almost gives away the answer, but still requires the student to perform the final calculation or connect the dots.

  Hint Level: {{{hintLevel}}}

  Hint:`,
});

const hintFlow = ai.defineFlow(
  {
    name: 'hintFlow',
    inputSchema: HintInputSchema,
    outputSchema: HintOutputSchema,
  },
  async input => {
    const {output} = await hintPrompt(input);
    return output!;
  }
);
