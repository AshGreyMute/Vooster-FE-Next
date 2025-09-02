'use server';
/**
 * @fileOverview Modifies an existing AI agent using natural language input.
 *
 * - modifyAgentWithNaturalLanguage - A function that handles the agent modification process.
 * - ModifyAgentWithNaturalLanguageInput - The input type for the modifyAgentWithNaturalLanguage function.
 * - ModifyAgentWithNaturalLanguageOutput - The return type for the modifyAgentWithNaturalLanguage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModifyAgentWithNaturalLanguageInputSchema = z.object({
  agentDescription: z
    .string()
    .describe('The current description of the AI agent.'),
  modificationRequest: z
    .string()
    .describe(
      'A natural language request to modify the AI agent, clearly specifying what changes to make.'
    ),
  conversationHistory: z
    .string()
    .optional()
    .describe(
      'The conversation history with the user, to provide context for the modification request.'
    ),
});

export type ModifyAgentWithNaturalLanguageInput = z.infer<
  typeof ModifyAgentWithNaturalLanguageInputSchema
>;

const ModifyAgentWithNaturalLanguageOutputSchema = z.object({
  updatedAgentDescription: z
    .string()
    .describe('The updated description of the AI agent after applying the modification request.'),
  reasoning: z
    .string()
    .optional()
    .describe(
      'The reasoning behind the modifications made to the agent description.'
    ),
});

export type ModifyAgentWithNaturalLanguageOutput = z.infer<
  typeof ModifyAgentWithNaturalLanguageOutputSchema
>;

export async function modifyAgentWithNaturalLanguage(
  input: ModifyAgentWithNaturalLanguageInput
): Promise<ModifyAgentWithNaturalLanguageOutput> {
  return modifyAgentWithNaturalLanguageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'modifyAgentWithNaturalLanguagePrompt',
  input: {schema: ModifyAgentWithNaturalLanguageInputSchema},
  output: {schema: ModifyAgentWithNaturalLanguageOutputSchema},
  prompt: `You are an AI agent modification assistant. You take the current description of an AI agent, a modification request from a user in natural language, and conversation history to generate a new agent description that implements the modification. You output the updated agent description and a brief reasoning for the modifications.

Here is the current agent description: {{{agentDescription}}}

Here is the modification request: {{{modificationRequest}}}

Here is the conversation history (if any): {{{conversationHistory}}}

Please generate the updated agent description and your reasoning. Make sure that the updated description fully incorporates the requested changes while maintaining the agent\'s original capabilities unless explicitly changed by the modification request.`,
});

const modifyAgentWithNaturalLanguageFlow = ai.defineFlow(
  {
    name: 'modifyAgentWithNaturalLanguageFlow',
    inputSchema: ModifyAgentWithNaturalLanguageInputSchema,
    outputSchema: ModifyAgentWithNaturalLanguageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
