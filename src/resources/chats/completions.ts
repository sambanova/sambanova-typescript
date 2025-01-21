// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Completions extends APIResource {
  /**
   * Creates a model response for the given chat conversation.
   */
  create(
    body: CompletionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CompletionCreateResponse> {
    return this._client.post('/v1/chat/completions', { body, ...options });
  }
}

export interface CompletionCreateResponse {
  id?: string;

  choices?: Array<CompletionCreateResponse.Choice>;

  created?: number;

  model?: string;

  object?: 'chat.completion';

  usage?: CompletionCreateResponse.Usage;
}

export namespace CompletionCreateResponse {
  export interface Choice {
    finish_reason?: string;

    index?: number;

    message?: Choice.Message;
  }

  export namespace Choice {
    export interface Message {
      content?: string;

      role?: string;
    }
  }

  export interface Usage {
    input_tokens_count?: number;

    model_execution_time?: number;

    output_tokens_count?: number;

    throughput_after_first_token?: number;

    time_to_first_token?: number;

    total_tokens_count?: number;
  }
}

export interface CompletionCreateParams {
  /**
   * Maximum number of tokens to generate.
   */
  max_tokens?: number;

  /**
   * A list of messages comprising the conversation so far.
   */
  messages?: Array<CompletionCreateParams.Message>;

  /**
   * The name of the model to query.
   */
  model?: string;

  /**
   * Ensures the model outputs a valid JSON.
   */
  response_format?: CompletionCreateParams.ResponseFormat;

  /**
   * Sequences where the API will stop generating tokens.
   */
  stop?: string | Array<string>;

  /**
   * If set, partial message deltas will be sent.
   */
  stream?: boolean;

  /**
   * Options for streaming response.
   */
  stream_options?: CompletionCreateParams.StreamOptions;

  /**
   * Degree of randomness in the response.
   */
  temperature?: number;

  tool_choice?: string | CompletionCreateParams.UnionMember1;

  /**
   * A list of tools the model may call.
   */
  tools?: Array<CompletionCreateParams.Tool>;

  /**
   * Limit for token choices.
   */
  top_k?: number;

  /**
   * Cumulative probability for token choices.
   */
  top_p?: number;
}

export namespace CompletionCreateParams {
  export interface Message {
    /**
     * The contents of a text-only message.
     */
    content?: string | Array<Message.UnionMember1>;

    /**
     * The role of the message author.
     */
    role?: 'system' | 'user' | 'assistant' | 'tool';
  }

  export namespace Message {
    export interface UnionMember1 {
      image_url?: UnionMember1.ImageURL;

      text?: string;

      type?: 'text' | 'image_url';
    }

    export namespace UnionMember1 {
      export interface ImageURL {
        url?: string;
      }
    }
  }

  /**
   * Ensures the model outputs a valid JSON.
   */
  export interface ResponseFormat {
    type?: 'json_object';
  }

  /**
   * Options for streaming response.
   */
  export interface StreamOptions {
    include_usage?: boolean;
  }

  export interface UnionMember1 {
    function?: UnionMember1.Function;

    type?: 'function' | 'auto' | 'none';
  }

  export namespace UnionMember1 {
    export interface Function {
      name?: string;
    }
  }

  export interface Tool {
    function?: Tool.Function;

    type?: 'function';
  }

  export namespace Tool {
    export interface Function {
      description?: string;

      name?: string;

      parameters?: Function.Parameters;
    }

    export namespace Function {
      export interface Parameters {
        properties?: unknown;

        type?: string;
      }
    }
  }
}

export declare namespace Completions {
  export {
    type CompletionCreateResponse as CompletionCreateResponse,
    type CompletionCreateParams as CompletionCreateParams,
  };
}
