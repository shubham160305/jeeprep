'use server';

import { askDoubt as askDoubtFlow, AskDoubtInput } from "@/ai/flows/doubt-solving-bot";
import { getHint as getHintFlow, HintInput } from "@/ai/flows/hint-system";
import { z } from "zod";
import { action } from "./safe-action";

export const askDoubt = action(
    z.object({
        question: z.string(),
    }),
    async (input: AskDoubtInput) => {
        return await askDoubtFlow(input);
    }
);

export const getHint = action(
    z.object({
        question: z.string(),
        hintLevel: z.enum(['small', 'medium', 'big']),
    }),
    async (input: HintInput) => {
        return await getHintFlow(input);
    }
);
