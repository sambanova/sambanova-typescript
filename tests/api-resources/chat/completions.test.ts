// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SambaNova from 'sambanova';
import { Response } from 'node-fetch';

const client = new SambaNova({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource completions', () => {
  test('create: only required params', async () => {
    const responsePromise = client.chat.completions.create({
      messages: [{ content: 'string', role: 'system' }],
      model: 'model',
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
      messages: [{ content: 'string', role: 'system' }],
      model: 'model',
      max_tokens: 0,
      response_format: { type: 'json_object', json_schema: { foo: 'bar' } },
      stop: 'string',
      stream: false,
      stream_options: { include_usage: true },
      temperature: 0,
      tool_choice: 'auto',
      tools: [
        {
          description: 'description',
          name: 'name',
          parameters: { properties: { foo: 'bar' }, type: 'object', required: ['string'] },
        },
      ],
      top_k: 0,
      top_p: 0,
    });
  });
});
