// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SambaNova from 'sambanova';

const client = new SambaNova({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource completions', () => {
  test('create: only required params', async () => {
    const responsePromise = client.completions.create({
      model: 'string',
      prompt:
        '<|begin_of_text|><|start_header_id|>system<|end_header_id|>\nYou are a helpful assistant.<|eot_id|><|start_header_id|>user<|end_header_id|>\ncreate a poem using palindromes<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n',
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
    const response = await client.completions.create({
      model: 'string',
      prompt:
        '<|begin_of_text|><|start_header_id|>system<|end_header_id|>\nYou are a helpful assistant.<|eot_id|><|start_header_id|>user<|end_header_id|>\ncreate a poem using palindromes<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n',
      do_sample: true,
      frequency_penalty: -2,
      logit_bias: { foo: 0 },
      logprobs: true,
      max_completion_tokens: 2048,
      max_tokens: 2048,
      n: 1,
      presence_penalty: -2,
      seed: 0,
      stop: '\n',
      stream: false,
      stream_options: { include_usage: true },
      temperature: 0.7,
      top_k: 5,
      top_logprobs: 0,
      top_p: 1,
    });
  });
});
