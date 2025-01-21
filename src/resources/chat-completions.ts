// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../core';
import * as Core from '../core';
import * as ChatCompletionsAPI from './chat-completions';
import { Stream } from '../streaming';

export class ChatCompletions extends APIResource {
  /**
   * Creates a model response for the given chat conversation.
   */
  create(
    body: ChatCompletionCreateParamsNonStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<ChatCompletionCreateResponse>;
  create(
    body: ChatCompletionCreateParamsStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ChatCompletionCreateResponse>>;
  create(
    body: ChatCompletionCreateParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ChatCompletionCreateResponse> | ChatCompletionCreateResponse>;
  create(
    body: ChatCompletionCreateParams,
    options?: Core.RequestOptions,
  ): APIPromise<ChatCompletionCreateResponse> | APIPromise<Stream<ChatCompletionCreateResponse>> {
    return this._client.post('/v1/chat/completions', { body, ...options, stream: body.stream ?? false }) as
      | APIPromise<ChatCompletionCreateResponse>
      | APIPromise<Stream<ChatCompletionCreateResponse>>;
  }
}

export interface ChatCompletionCreateResponse {
  id?: string;

  choices?: Array<ChatCompletionCreateResponse.Choice>;

  created?: number;

  model?: string;

  object?: 'chat.completion';

  usage?: ChatCompletionCreateResponse.Usage;
}

export namespace ChatCompletionCreateResponse {
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
    completion_tokens?: number;

    completion_tokens_after_first_per_sec?: number;

    prompt_tokens?: number;

    time_to_first_token?: number;

    total_latency?: number;

    total_tokens?: number;
  }
}

export type ChatCompletionCreateParams =
  | ChatCompletionCreateParamsNonStreaming
  | ChatCompletionCreateParamsStreaming;

export interface ChatCompletionCreateParamsBase {
  /**
   * Maximum number of tokens to generate.
   */
  max_tokens?: number;

  /**
   * A list of messages comprising the conversation so far.
   */
  messages?: Array<ChatCompletionCreateParams.Message>;

  /**
   * The name of the model to query.
   */
  model?: string;

  /**
   * Ensures the model outputs a valid JSON.
   */
  response_format?: ChatCompletionCreateParams.ResponseFormat;

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
  stream_options?: ChatCompletionCreateParams.StreamOptions;

  /**
   * Degree of randomness in the response.
   */
  temperature?: number;

  tool_choice?: string | ChatCompletionCreateParams.UnionMember1;

  /**
   * A list of tools the model may call.
   */
  tools?: Array<ChatCompletionCreateParams.Tool>;

  /**
   * Limit for token choices.
   */
  top_k?: number;

  /**
   * Cumulative probability for token choices.
   */
  top_p?: number;
}

export namespace ChatCompletionCreateParams {
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

  export type ChatCompletionCreateParamsNonStreaming =
    ChatCompletionsAPI.ChatCompletionCreateParamsNonStreaming;
  export type ChatCompletionCreateParamsStreaming = ChatCompletionsAPI.ChatCompletionCreateParamsStreaming;
}

export interface ChatCompletionCreateParamsNonStreaming extends ChatCompletionCreateParamsBase {
  /**
   * If set, partial message deltas will be sent.
   */
  stream?: false;
}

export interface ChatCompletionCreateParamsStreaming extends ChatCompletionCreateParamsBase {
  /**
   * If set, partial message deltas will be sent.
   */
  stream: true;
}

export declare namespace ChatCompletions {
  export {
    type ChatCompletionCreateResponse as ChatCompletionCreateResponse,
    type ChatCompletionCreateParams as ChatCompletionCreateParams,
    type ChatCompletionCreateParamsNonStreaming as ChatCompletionCreateParamsNonStreaming,
    type ChatCompletionCreateParamsStreaming as ChatCompletionCreateParamsStreaming,
  };
}
