// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating an AI agent from a natural language description.
 *
 * generateAgentFromDescription - A function that takes a natural language description and returns the generated agent definition.
 * GenerateAgentFromDescriptionInput - The input type for the generateAgentFromDescription function.
 * GenerateAgentFromDescriptionOutput - The return type for the generateAgentFromDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAgentFromDescriptionInputSchema = z.object({
  description: z.string().describe('A natural language description of the AI agent.'),
});
export type GenerateAgentFromDescriptionInput = z.infer<typeof GenerateAgentFromDescriptionInputSchema>;

const GenerateAgentFromDescriptionOutputSchema = z.object({
  agentDefinition: z.string().describe('The generated AI agent definition in a suitable format (e.g., JSON, YAML).'),
});
export type GenerateAgentFromDescriptionOutput = z.infer<typeof GenerateAgentFromDescriptionOutputSchema>;

export async function generateAgentFromDescription(input: GenerateAgentFromDescriptionInput): Promise<GenerateAgentFromDescriptionOutput> {
  return generateAgentFromDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAgentFromDescriptionPrompt',
  input: {schema: GenerateAgentFromDescriptionInputSchema},
  output: {schema: GenerateAgentFromDescriptionOutputSchema},
  prompt: `You are an AI agent definition generator. You take a natural language description of an AI agent and generate its definition.

  Description: {{{description}}}

  Please provide the agent definition in JSON format.
  Make sure to include all necessary fields for the agent to function correctly.
  Do not include any comments in the JSON. Just the JSON.
  `,
});

const generateAgentFromDescriptionFlow = ai.defineFlow(
  {
    name: 'generateAgentFromDescriptionFlow',
    inputSchema: GenerateAgentFromDescriptionInputSchema,
    outputSchema: GenerateAgentFromDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
