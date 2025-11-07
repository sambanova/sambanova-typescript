// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SambaNova from 'sambanova';

const client = new SambaNova({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource completions', () => {
  test('create: only required params', async () => {
    const responsePromise = client.chat.completions.create({
      messages: [{ content: 'create a poem using palindromes', role: 'user' }],
      model: 'string',
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
    const response = await client.chat.completions.create({
      messages: [{ content: 'create a poem using palindromes', role: 'user' }],
      model: 'string',
      chat_template_kwargs: { enable_thinking: true },
      do_sample: true,
      frequency_penalty: -2,
      logit_bias: { foo: 0 },
      logprobs: true,
      max_completion_tokens: 2048,
      max_tokens: 2048,
      n: 1,
      parallel_tool_calls: true,
      presence_penalty: -2,
      reasoning_effort: 'low',
      response_format: { type: 'text' },
      seed: 0,
      stop: '\n',
      stream: false,
      stream_options: { include_usage: true },
      temperature: 0.7,
      tool_choice: 'none',
      tools: [
        { function: { name: 'name', description: 'description', parameters: { foo: 'bar' } }, type: 'type' },
      ],
      top_k: 5,
      top_logprobs: 0,
      top_p: 1,
    });
  });
});
