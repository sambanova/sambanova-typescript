// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SambaNova from 'sambanova';

const client = new SambaNova({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource messages', () => {
  test('create: only required params', async () => {
    const responsePromise = client.messages.create({
      max_tokens: 1024,
      messages: [{ content: 'Hello, Claude!', role: 'user' }],
      model: 'DeepSeek-V3.1',
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
    const response = await client.messages.create({
      max_tokens: 1024,
      messages: [{ content: 'Hello, Claude!', role: 'user' }],
      model: 'DeepSeek-V3.1',
      container: 'container',
      metadata: { user_id: 'user_id' },
      service_tier: 'auto',
      stop_sequences: ['string'],
      stream: false,
      system: 'string',
      temperature: 1,
      thinking: { type: 'disabled' },
      tool_choice: { type: 'auto', disable_parallel_tool_use: true },
      tools: [
        {
          name: 'name',
          allowed_callers: ['string'],
          cache_control: { type: 'ephemeral', ttl: 'ttl' },
          defer_loading: true,
          description: 'description',
          eager_input_streaming: true,
          input_examples: [{ foo: 'bar' }],
          input_schema: { foo: 'bar' },
          strict: true,
          type: 'custom',
        },
      ],
      top_k: 0,
      top_p: 0,
      'anthropic-version': '2023-06-01',
    });
  });

  test('countTokens: only required params', async () => {
    const responsePromise = client.messages.countTokens({
      messages: [{ content: 'Hello, Claude!', role: 'user' }],
      model: 'DeepSeek-V3.1',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('countTokens: required and optional params', async () => {
    const response = await client.messages.countTokens({
      messages: [{ content: 'Hello, Claude!', role: 'user' }],
      model: 'DeepSeek-V3.1',
      system: 'string',
      thinking: { type: 'disabled' },
      tool_choice: { type: 'auto', disable_parallel_tool_use: true },
      tools: [
        {
          name: 'name',
          allowed_callers: ['string'],
          cache_control: { type: 'ephemeral', ttl: 'ttl' },
          defer_loading: true,
          description: 'description',
          eager_input_streaming: true,
          input_examples: [{ foo: 'bar' }],
          input_schema: { foo: 'bar' },
          strict: true,
          type: 'custom',
        },
      ],
      'anthropic-version': '2023-06-01',
    });
  });
});
