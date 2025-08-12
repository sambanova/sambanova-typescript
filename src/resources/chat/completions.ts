// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { APIPromise } from '../../core';
import * as Core from '../../core';
import * as CompletionsAPI from './completions';
import { Stream } from '../../streaming';

export class Completions extends APIResource {
  /**
   * Generates a chat response. Supports text and vision (image_url parts) and
   * streaming.
   */
  create(
    body: CompletionCreateParamsNonStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<ChatCompletionResponse>;
  create(
    body: CompletionCreateParamsStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ChatCompletionResponse>>;
  create(
    body: CompletionCreateParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ChatCompletionResponse> | ChatCompletionResponse>;
  create(
    body: CompletionCreateParams,
    options?: Core.RequestOptions,
  ): APIPromise<ChatCompletionResponse> | APIPromise<Stream<ChatCompletionResponse>> {
    return this._client.post('/v1/chat/completions', { body, ...options, stream: body.stream ?? false }) as
      | APIPromise<ChatCompletionResponse>
      | APIPromise<Stream<ChatCompletionResponse>>;
  }
}

export interface ChatCompletionResponse {
  id?: string;

  choices?: Array<ChatCompletionResponse.Choice>;

  created?: number;

  model?: string;

  object?: string;

  usage?: ChatCompletionResponse.Usage;
}

export namespace ChatCompletionResponse {
  export interface Choice {
    finish_reason: string;

    index: number;

    logprobs?: { [key: string]: unknown } | null;

    message?: Choice.Message;
  }

  export namespace Choice {
    export interface Message {
      content: string | Array<Message.UnionMember1>;

      role: 'system' | 'user' | 'assistant';
    }

    export namespace Message {
      export interface UnionMember1 {
        /**
         * Kind of message part.
         */
        type: 'text' | 'image_url';

        /**
         * Image content when type is image_url.
         */
        image_url?: UnionMember1.ImageURL;

        /**
         * Text content when type is text.
         */
        text?: string;
      }

      export namespace UnionMember1 {
        /**
         * Image content when type is image_url.
         */
        export interface ImageURL {
          /**
           * Data URI string like data:<format>;base64,<data>.
           */
          url: string;
        }
      }
    }
  }

  export interface Usage {
    input_tokens_count?: number;

    model_execution_time?: number;

    output_tokens_count?: number;

    queue_time?: number;

    throughput_after_first_token?: number;

    time_to_first_token?: number;

    total_tokens_count?: number;
  }
}

export type CompletionCreateParams = CompletionCreateParamsNonStreaming | CompletionCreateParamsStreaming;

export interface CompletionCreateParamsBase {
  messages: Array<CompletionCreateParams.Message>;

  /**
   * Model ID to query.
   */
  model: string;

  max_tokens?: number;

  response_format?: CompletionCreateParams.ResponseFormat;

  stop?: string | Array<string>;

  stream?: boolean;

  stream_options?: CompletionCreateParams.StreamOptions;

  temperature?: number;

  tool_choice?: 'auto' | 'required' | CompletionCreateParams.ToolChoice;

  tools?: Array<CompletionCreateParams.Tool>;

  top_k?: number;

  top_p?: number;
}

export namespace CompletionCreateParams {
  export interface Message {
    content: string | Array<Message.UnionMember1>;

    role: 'system' | 'user' | 'assistant';
  }

  export namespace Message {
    export interface UnionMember1 {
      /**
       * Kind of message part.
       */
      type: 'text' | 'image_url';

      /**
       * Image content when type is image_url.
       */
      image_url?: UnionMember1.ImageURL;

      /**
       * Text content when type is text.
       */
      text?: string;
    }

    export namespace UnionMember1 {
      /**
       * Image content when type is image_url.
       */
      export interface ImageURL {
        /**
         * Data URI string like data:<format>;base64,<data>.
         */
        url: string;
      }
    }
  }

  export interface ResponseFormat {
    type: 'json_object' | 'json_schema';

    json_schema?: { [key: string]: unknown };
  }

  export interface StreamOptions {
    include_usage?: boolean;
  }

  export interface ToolChoice {
    name: string;
  }

  export interface Tool {
    description: string;

    name: string;

    /**
     * JSON Schema for function parameters (must be an object schema).
     */
    parameters: Tool.Parameters;
  }

  export namespace Tool {
    /**
     * JSON Schema for function parameters (must be an object schema).
     */
    export interface Parameters {
      properties: { [key: string]: unknown };

      type: 'object';

      required?: Array<string>;
    }
  }

  export type CompletionCreateParamsNonStreaming = CompletionsAPI.CompletionCreateParamsNonStreaming;
  export type CompletionCreateParamsStreaming = CompletionsAPI.CompletionCreateParamsStreaming;
}

export interface CompletionCreateParamsNonStreaming extends CompletionCreateParamsBase {
  stream?: false;
}

export interface CompletionCreateParamsStreaming extends CompletionCreateParamsBase {
  stream: true;
}

export declare namespace Completions {
  export {
    type ChatCompletionResponse as ChatCompletionResponse,
    type CompletionCreateParams as CompletionCreateParams,
    type CompletionCreateParamsNonStreaming as CompletionCreateParamsNonStreaming,
    type CompletionCreateParamsStreaming as CompletionCreateParamsStreaming,
  };
}
