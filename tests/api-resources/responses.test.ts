// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SambaNova from 'sambanova';

const client = new SambaNova({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource responses', () => {
  test('create: only required params', async () => {
    const responsePromise = client.responses.create({
      input: [
        {
          content: 'What is the weather in San Francisco?',
          role: 'user',
          type: 'message',
        },
        {
          content: [{ text: 'The weather in San Francisco is 65°F and partly cloudy.', type: 'output_text' }],
          role: 'assistant',
          type: 'message',
        },
        {
          content: 'What should I wear?',
          role: 'user',
          type: 'message',
        },
      ],
      model: 'gpt-oss-120b',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.responses.create({
      input: [
        {
          content: 'What is the weather in San Francisco?',
          role: 'user',
          type: 'message',
          id: 'id',
          status: 'in_progress',
        },
        {
          content: [
            {
              text: 'The weather in San Francisco is 65°F and partly cloudy.',
              type: 'output_text',
              annotations: [
                {
                  end_index: 0,
                  start_index: 0,
                  type: 'url_citation',
                  url: 'url',
                  title: 'title',
                },
              ],
              logprobs: [
                {
                  token: ' Hello',
                  logprob: -0.00012340000000000002,
                  top_logprobs: {
                    token: ' Hello',
                    logprob: -0.00012340000000000002,
                    bytes: [32, 72, 101, 108, 108, 111],
                  },
                  bytes: [32, 72, 101, 108, 108, 111],
                },
              ],
            },
          ],
          role: 'assistant',
          type: 'message',
          id: 'id',
          status: 'in_progress',
        },
        {
          content: 'What should I wear?',
          role: 'user',
          type: 'message',
          id: 'id',
          status: 'in_progress',
        },
      ],
      model: 'gpt-oss-120b',
      background: true,
      frequency_penalty: -2,
      instructions: 'instructions',
      max_output_tokens: 1024,
      max_tool_calls: 0,
      metadata: { foo: 'string' },
      parallel_tool_calls: true,
      presence_penalty: -2,
      previous_response_id: 'previous_response_id',
      reasoning: { effort: 'low' },
      service_tier: 'service_tier',
      store: true,
      stream: false,
      temperature: 0.7,
      text: { format: { type: 'text' } },
      tool_choice: { name: 'get_weather', type: 'function' },
      tools: [
        {
          name: 'get_weather',
          type: 'function',
          description: 'Get the current weather for a given location.',
          parameters: {
            type: 'bar',
            properties: 'bar',
            required: 'bar',
            additionalProperties: 'bar',
          },
          strict: null,
        },
      ],
      top_k: 5,
      top_logprobs: 0,
      top_p: 1,
      truncation: 'auto',
      user: 'user',
    });
  });
});
