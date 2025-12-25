// NOTE: This is a simplified version of `next-safe-action`.
// We're using this to avoid adding a new dependency.
import { z } from "zod";

export const action =
  <S extends z.ZodType<any, any>, D>(
    schema: S,
    handler: (input: z.infer<S>) => Promise<D>
  ) =>
  async (input: z.infer<S>): Promise<{ data?: D, validationError?: any, serverError?: any }> => {
    try {
      const parsedInput = schema.parse(input);
      const data = await handler(parsedInput);
      return { data };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { validationError: error.flatten() };
      }
      return { serverError: "Something went wrong" };
    }
  };
