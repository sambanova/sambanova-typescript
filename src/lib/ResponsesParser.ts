// This directory is not modified by the Stainless generator.
// Place SDK extensions and convenience helpers here.
//
// This module patches generated response types with convenience properties
// for OpenAI SDK compatibility. It is imported automatically inside the
// generated `src/resources/responses.ts` `create()` method, so no explicit
// import is needed — `output_text` is populated on every non-streaming
// ResponseResponse before it is returned to the caller.
//
// To add further helpers, define an `addXxx()` function below, augment the
// target interface via `declare module`, and call the function in the
// appropriate resource method using `_thenUnwrap()`.

import type { ResponseResponse } from '../resources/responses';

// ---------------------------------------------------------------------------
// Type augmentation
// Extends the generated ResponseResponse interface with output_text without
// modifying the generated file. TypeScript merges this declaration with the
// one in responses.ts at compile time.
// ---------------------------------------------------------------------------
declare module '../resources/responses' {
  interface ResponseResponse {
    /**
     * Aggregates all `output_text` content parts from the response output array.
     *
     * Iterates over every output item, filters to `type === "message"` items,
     * then collects the `text` from every content part whose `type` is
     * `"output_text"`. Parts are joined in order with no separator.
     *
     * Returns an empty string if the response contains no output_text parts
     * (e.g. the model only produced a function call or a reasoning item).
     *
     * Mirrors the `output_text` property on the OpenAI TypeScript SDK's
     * `Response` interface for drop-in compatibility.
     */
    output_text: string;
  }
}

// ---------------------------------------------------------------------------
// Runtime helper
// Called inside responses.ts create() via _thenUnwrap() for non-streaming
// responses. Mutates the response object in place before it is returned.
// ---------------------------------------------------------------------------
export function addOutputText(rsp: ResponseResponse): void {
  const texts: string[] = [];
  for (const output of rsp.output) {
    if (output.type !== 'message') continue;
    const { content } = output;
    if (typeof content === 'string') continue;
    for (const part of content) {
      if (part.type === 'output_text') {
        texts.push(part.text);
      }
    }
  }
  rsp.output_text = texts.join('');
}
