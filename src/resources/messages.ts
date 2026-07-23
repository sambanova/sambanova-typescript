// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as MessagesAPI from './messages';
import { APIPromise } from '../core/api-promise';
import { Stream } from '../core/streaming';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Messages extends APIResource {
  /**
   * Anthropic Messages API compatible endpoint. Generates a model response for the
   * supplied conversation. Authentication accepts either the bearer
   * `Authorization: Bearer <key>` header (SambaNova SDK default) or the `x-api-key`
   * header (Anthropic SDK default); the same API key is used in both cases. When
   * `stream: true` is set, the response is a sequence of Server-Sent Events whose
   * payloads conform to `MessageStreamEvent`; otherwise the response is a single
   * `Message` object.
   *
   * @example
   * ```ts
   * const message = await client.messages.create({
   *   max_tokens: 1024,
   *   messages: [{ content: 'Hello, Claude!', role: 'user' }],
   *   model: 'DeepSeek-V3.1',
   * });
   * ```
   */
  create(
    params: MessageCreateParamsNonStreaming,
    options?: RequestOptions,
  ): APIPromise<MessageCreateResponse>;
  create(
    params: MessageCreateParamsStreaming,
    options?: RequestOptions,
  ): APIPromise<Stream<MessageStreamEvent>>;
  create(
    params: MessageCreateParamsBase,
    options?: RequestOptions,
  ): APIPromise<Stream<MessageStreamEvent> | MessageCreateResponse>;
  create(
    params: MessageCreateParams,
    options?: RequestOptions,
  ): APIPromise<MessageCreateResponse> | APIPromise<Stream<MessageStreamEvent>> {
    const { 'anthropic-version': anthropicVersion, ...body } = params;
    return this._client.post('/messages', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(anthropicVersion != null ? { 'anthropic-version': anthropicVersion } : undefined) },
        options?.headers,
      ]),
      stream: params.stream ?? false,
    }) as APIPromise<MessageCreateResponse> | APIPromise<Stream<MessageStreamEvent>>;
  }

  /**
   * Anthropic `count_tokens` compatible endpoint. Returns the number of input tokens
   * that would be consumed by a `POST /messages` call with the same prompt content
   * (system, messages, tools, tool_choice). Authentication accepts either the bearer
   * `Authorization: Bearer <key>` header (SambaNova SDK default) or the `x-api-key`
   * header (Anthropic SDK default); the same API key is used in both cases.
   *
   * @example
   * ```ts
   * const messageCountTokensResponse =
   *   await client.messages.countTokens({
   *     messages: [{ content: 'Hello, Claude!', role: 'user' }],
   *     model: 'DeepSeek-V3.1',
   *   });
   * ```
   */
  countTokens(
    params: MessageCountTokensParams,
    options?: RequestOptions,
  ): APIPromise<MessageCountTokensResponse> {
    const { 'anthropic-version': anthropicVersion, ...body } = params;
    return this._client.post('/messages/count_tokens', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(anthropicVersion != null ? { 'anthropic-version': anthropicVersion } : undefined) },
        options?.headers,
      ]),
    });
  }
}

/**
 * Non-streaming response from `POST /messages`. Wire-compatible with the official
 * Anthropic Messages API.
 */
export interface Message {
  /**
   * Unique identifier for this message.
   */
  id: string;

  content: Array<
    | Message.MessageOutputTextBlock
    | Message.MessageOutputToolUseBlock
    | Message.MessageOutputThinkingBlock
    | Message.MessageOutputRedactedThinkingBlock
    | Message.MessageOutputServerToolUseBlock
    | Message.MessageOutputWebSearchToolResultBlock
    | Message.MessageOutputWebFetchToolResultBlock
    | Message.MessageOutputCodeExecutionToolResultBlock
    | Message.MessageOutputBashCodeExecutionToolResultBlock
    | Message.MessageOutputTextEditorCodeExecutionToolResultBlock
    | Message.MessageOutputToolSearchToolResultBlock
    | Message.MessageOutputContainerUploadBlock
  >;

  /**
   * Model that produced the response.
   */
  model: string;

  role: 'assistant';

  /**
   * Reason the model stopped generating. SambaNova emits `end_turn`, `max_tokens`,
   * `tool_use`, and `stop_sequence`. The remaining values are defined for Anthropic
   * SDK type-parity but never returned: `pause_turn` (server-tool loop limit, not
   * produced); `refusal` (content filter, not exposed);
   * `model_context_window_exceeded` (folded to `max_tokens`).
   */
  stop_reason:
    | 'end_turn'
    | 'max_tokens'
    | 'tool_use'
    | 'pause_turn'
    | 'refusal'
    | 'stop_sequence'
    | 'model_context_window_exceeded'
    | null;

  type: 'message';

  /**
   * Token accounting for the request.
   */
  usage: Message.Usage;

  /**
   * Code-execution container reference. Anthropic compatibility only — SambaNova
   * does not run server-side code execution, so this field is never emitted on
   * responses.
   */
  container?: Message.Container | null;

  /**
   * Refusal stop details. Anthropic compatibility only — `refusal` is never emitted
   * as a stop_reason by SambaNova (content filtering is not exposed at the API
   * layer).
   */
  stop_details?: Message.StopDetails | null;

  /**
   * The matched stop sequence that triggered termination. Present when `stop_reason`
   * is `stop_sequence`; `null` otherwise.
   */
  stop_sequence?: string | null;
}

export namespace Message {
  /**
   * Plain-text segment of the model's response.
   */
  export interface MessageOutputTextBlock {
    text: string;

    type: 'text';

    /**
     * Not emitted in v1.
     */
    citations?: Array<{ [key: string]: unknown }> | null;
  }

  /**
   * Tool call generated by the model.
   */
  export interface MessageOutputToolUseBlock {
    /**
     * Unique identifier for this tool call.
     */
    id: string;

    /**
     * Tool inputs as a JSON object.
     */
    input: { [key: string]: unknown };

    /**
     * Name of the tool being called.
     */
    name: string;

    type: 'tool_use';

    /**
     * Anthropic routing metadata. Always `null` in SambaNova responses.
     */
    caller?: { [key: string]: unknown } | null;
  }

  /**
   * Extended-reasoning trace from the model. Emitted by reasoning models.
   */
  export interface MessageOutputThinkingBlock {
    thinking: string;

    type: 'thinking';

    signature?: string | null;
  }

  /**
   * Anthropic compatibility only — SambaNova does not produce encrypted thinking
   * output. Never emitted in responses.
   */
  export interface MessageOutputRedactedThinkingBlock {
    data: string;

    type: 'redacted_thinking';
  }

  /**
   * Anthropic compatibility only — SambaNova does not run server-side tools. Never
   * emitted in responses; defined for Anthropic SDK type-parity.
   */
  export interface MessageOutputServerToolUseBlock {
    id: string;

    input: { [key: string]: unknown };

    name: string;

    type: 'server_tool_use';
  }

  /**
   * Anthropic compatibility only — SambaNova does not run server-side `web_search`.
   * Never emitted in responses.
   */
  export interface MessageOutputWebSearchToolResultBlock {
    content: Array<{ [key: string]: unknown }>;

    tool_use_id: string;

    type: 'web_search_tool_result';
  }

  /**
   * Anthropic compatibility only — SambaNova does not run server-side `web_fetch`.
   * Never emitted in responses.
   */
  export interface MessageOutputWebFetchToolResultBlock {
    content: { [key: string]: unknown };

    tool_use_id: string;

    type: 'web_fetch_tool_result';
  }

  /**
   * Anthropic compatibility only — SambaNova does not run server-side
   * `code_execution`. Never emitted in responses.
   */
  export interface MessageOutputCodeExecutionToolResultBlock {
    content: { [key: string]: unknown };

    tool_use_id: string;

    type: 'code_execution_tool_result';
  }

  /**
   * Anthropic compatibility only — SambaNova does not run server-side bash code
   * execution. Never emitted in responses.
   */
  export interface MessageOutputBashCodeExecutionToolResultBlock {
    content: { [key: string]: unknown };

    tool_use_id: string;

    type: 'bash_code_execution_tool_result';
  }

  /**
   * Anthropic compatibility only — SambaNova does not run server-side text-editor
   * code execution. Never emitted in responses.
   */
  export interface MessageOutputTextEditorCodeExecutionToolResultBlock {
    content: { [key: string]: unknown };

    tool_use_id: string;

    type: 'text_editor_code_execution_tool_result';
  }

  /**
   * Anthropic compatibility only — SambaNova does not run server-side `tool_search`.
   * Never emitted in responses.
   */
  export interface MessageOutputToolSearchToolResultBlock {
    content: { [key: string]: unknown };

    tool_use_id: string;

    type: 'tool_search_tool_result';
  }

  /**
   * Anthropic compatibility only — SambaNova does not produce container_upload
   * blocks (these come from Anthropic's server-side `code_execution` tool). Never
   * emitted in responses.
   */
  export interface MessageOutputContainerUploadBlock {
    file_id: string;

    type: 'container_upload';
  }

  /**
   * Token accounting for the request.
   */
  export interface Usage {
    /**
     * Total tokens in the prompt (system + messages + tools).
     */
    input_tokens: number;

    /**
     * Total tokens generated by the model.
     */
    output_tokens: number;

    /**
     * Anthropic SDK alias for cache write metrics. Always `null` in SambaNova
     * responses; use `cache_creation_input_tokens` instead.
     */
    cache_creation?: { [key: string]: unknown } | null;

    /**
     * Tokens written to prompt cache. Absent in v1; emitted once prompt caching wiring
     * lands (CP-2897).
     */
    cache_creation_input_tokens?: number | null;

    /**
     * Tokens read from prompt cache. Absent in v1; emitted once prompt caching wiring
     * lands (CP-2897).
     */
    cache_read_input_tokens?: number | null;

    /**
     * Geographic region that served the request. Anthropic compatibility only -
     * SambaNova does not expose geo routing, always `null`.
     */
    inference_geo?: string | null;

    /**
     * Server-tool usage metrics (e.g. `web_search_requests`). Anthropic compatibility
     * only — SambaNova does not run server tools, so this field is never emitted.
     */
    server_tool_use?: { [key: string]: unknown } | null;

    /**
     * Service tier that processed the request. Anthropic compatibility only —
     * SambaNova is single-tier and never emits this field.
     */
    service_tier?: string | null;
  }

  /**
   * Code-execution container reference. Anthropic compatibility only — SambaNova
   * does not run server-side code execution, so this field is never emitted on
   * responses.
   */
  export interface Container {
    id: string;

    /**
     * ISO-8601 timestamp.
     */
    expires_at: string;
  }

  /**
   * Refusal stop details. Anthropic compatibility only — `refusal` is never emitted
   * as a stop_reason by SambaNova (content filtering is not exposed at the API
   * layer).
   */
  export interface StopDetails {
    type: 'refusal';

    category?: 'cyber' | 'bio';
  }
}

/**
 * Token count for the supplied prompt.
 */
export interface MessageCountTokensResponse {
  /**
   * Total tokens in the prompt (system + messages + tools).
   */
  input_tokens: number;
}

/**
 * Top-level error envelope returned by the Messages API on any non-2xx response.
 * Shape matches Anthropic's wire format. This envelope is used ONLY on `/messages`
 * and `/messages/count_tokens`
 */
export interface MessageErrorResponse {
  /**
   * Inner error object carried inside a `MessageErrorResponse`. The `type` value
   * follows Anthropic's published error taxonomy.
   */
  error: MessageErrorResponse.Error;

  /**
   * Always `error` for error envelopes.
   */
  type: 'error';

  /**
   * Opaque request identifier echoed by the server, useful for correlating
   * client-side failures with server-side logs.
   */
  request_id?: string | null;
}

export namespace MessageErrorResponse {
  /**
   * Inner error object carried inside a `MessageErrorResponse`. The `type` value
   * follows Anthropic's published error taxonomy.
   */
  export interface Error {
    /**
     * Human-readable explanation of the error.
     */
    message: string;

    /**
     * Error category. Values follow Anthropic's taxonomy.
     */
    type:
      | 'invalid_request_error'
      | 'authentication_error'
      | 'permission_error'
      | 'not_found_error'
      | 'request_too_large'
      | 'rate_limit_error'
      | 'api_error'
      | 'overloaded_error'
      | 'not_implemented_error';
  }
}

/**
 * Discriminated union of SSE events emitted during a streaming `POST /messages`
 * call. Event order: `message_start` -> (`content_block_start` ->
 * `content_block_delta`×N -> `content_block_stop`) × blocks -> `message_delta` ->
 * `message_stop`. A `ping` may appear at any point; an `error` event terminates
 * the stream.
 */
export type MessageStreamEvent =
  | MessageStreamEvent.MessageStartEvent
  | MessageStreamEvent.MessageContentBlockStartEvent
  | MessageStreamEvent.MessageContentBlockDeltaEvent
  | MessageStreamEvent.MessageContentBlockStopEvent
  | MessageStreamEvent.MessageDeltaEvent
  | MessageStreamEvent.MessageStopEvent
  | MessageStreamEvent.MessagePingEvent
  | MessageStreamEvent.MessageStreamErrorEvent;

export namespace MessageStreamEvent {
  /**
   * First event of a stream. Carries the initial Message envelope (empty
   * `content[]`, `stop_reason: null`) and token usage from prompt processing.
   */
  export interface MessageStartEvent {
    /**
     * Non-streaming response from `POST /messages`. Wire-compatible with the official
     * Anthropic Messages API.
     */
    message: MessagesAPI.Message;

    type: 'message_start';
  }

  /**
   * Opens a new content block. One per block in `content[]`.
   */
  export interface MessageContentBlockStartEvent {
    /**
     * Typed content block in the model's response.
     */
    content_block:
      | MessageContentBlockStartEvent.MessageOutputTextBlock
      | MessageContentBlockStartEvent.MessageOutputToolUseBlock
      | MessageContentBlockStartEvent.MessageOutputThinkingBlock
      | MessageContentBlockStartEvent.MessageOutputRedactedThinkingBlock
      | MessageContentBlockStartEvent.MessageOutputServerToolUseBlock
      | MessageContentBlockStartEvent.MessageOutputWebSearchToolResultBlock
      | MessageContentBlockStartEvent.MessageOutputWebFetchToolResultBlock
      | MessageContentBlockStartEvent.MessageOutputCodeExecutionToolResultBlock
      | MessageContentBlockStartEvent.MessageOutputBashCodeExecutionToolResultBlock
      | MessageContentBlockStartEvent.MessageOutputTextEditorCodeExecutionToolResultBlock
      | MessageContentBlockStartEvent.MessageOutputToolSearchToolResultBlock
      | MessageContentBlockStartEvent.MessageOutputContainerUploadBlock;

    /**
     * Zero-based index of the block within `content[]`.
     */
    index: number;

    type: 'content_block_start';
  }

  export namespace MessageContentBlockStartEvent {
    /**
     * Plain-text segment of the model's response.
     */
    export interface MessageOutputTextBlock {
      text: string;

      type: 'text';

      /**
       * Not emitted in v1.
       */
      citations?: Array<{ [key: string]: unknown }> | null;
    }

    /**
     * Tool call generated by the model.
     */
    export interface MessageOutputToolUseBlock {
      /**
       * Unique identifier for this tool call.
       */
      id: string;

      /**
       * Tool inputs as a JSON object.
       */
      input: { [key: string]: unknown };

      /**
       * Name of the tool being called.
       */
      name: string;

      type: 'tool_use';

      /**
       * Anthropic routing metadata. Always `null` in SambaNova responses.
       */
      caller?: { [key: string]: unknown } | null;
    }

    /**
     * Extended-reasoning trace from the model. Emitted by reasoning models.
     */
    export interface MessageOutputThinkingBlock {
      thinking: string;

      type: 'thinking';

      signature?: string | null;
    }

    /**
     * Anthropic compatibility only — SambaNova does not produce encrypted thinking
     * output. Never emitted in responses.
     */
    export interface MessageOutputRedactedThinkingBlock {
      data: string;

      type: 'redacted_thinking';
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side tools. Never
     * emitted in responses; defined for Anthropic SDK type-parity.
     */
    export interface MessageOutputServerToolUseBlock {
      id: string;

      input: { [key: string]: unknown };

      name: string;

      type: 'server_tool_use';
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side `web_search`.
     * Never emitted in responses.
     */
    export interface MessageOutputWebSearchToolResultBlock {
      content: Array<{ [key: string]: unknown }>;

      tool_use_id: string;

      type: 'web_search_tool_result';
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side `web_fetch`.
     * Never emitted in responses.
     */
    export interface MessageOutputWebFetchToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'web_fetch_tool_result';
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side
     * `code_execution`. Never emitted in responses.
     */
    export interface MessageOutputCodeExecutionToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'code_execution_tool_result';
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side bash code
     * execution. Never emitted in responses.
     */
    export interface MessageOutputBashCodeExecutionToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'bash_code_execution_tool_result';
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side text-editor
     * code execution. Never emitted in responses.
     */
    export interface MessageOutputTextEditorCodeExecutionToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'text_editor_code_execution_tool_result';
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side `tool_search`.
     * Never emitted in responses.
     */
    export interface MessageOutputToolSearchToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'tool_search_tool_result';
    }

    /**
     * Anthropic compatibility only — SambaNova does not produce container_upload
     * blocks (these come from Anthropic's server-side `code_execution` tool). Never
     * emitted in responses.
     */
    export interface MessageOutputContainerUploadBlock {
      file_id: string;

      type: 'container_upload';
    }
  }

  /**
   * Incremental update to the currently open content block.
   */
  export interface MessageContentBlockDeltaEvent {
    /**
     * Incremental update to an open content block.
     */
    delta:
      | MessageContentBlockDeltaEvent.MessageContentBlockTextDelta
      | MessageContentBlockDeltaEvent.MessageContentBlockInputJsonDelta
      | MessageContentBlockDeltaEvent.MessageContentBlockThinkingDelta
      | MessageContentBlockDeltaEvent.MessageContentBlockSignatureDelta;

    /**
     * Zero-based index of the block within `content[]`.
     */
    index: number;

    type: 'content_block_delta';
  }

  export namespace MessageContentBlockDeltaEvent {
    /**
     * Incremental text chunk for an open text content block.
     */
    export interface MessageContentBlockTextDelta {
      text: string;

      type: 'text_delta';
    }

    /**
     * Incremental fragment of a tool_use block's `input` JSON. Concatenate successive
     * `partial_json` strings to reconstruct the full input object.
     */
    export interface MessageContentBlockInputJsonDelta {
      partial_json: string;

      type: 'input_json_delta';
    }

    /**
     * Incremental thinking chunk for an open thinking block. Emitted by reasoning
     * models.
     */
    export interface MessageContentBlockThinkingDelta {
      thinking: string;

      type: 'thinking_delta';
    }

    /**
     * Signature for an open thinking block. Emitted at the end of a thinking stream
     * (paired with the closing `content_block_stop`); the `signature` value may be an
     * empty string when the backend has no signed payload to attach.
     */
    export interface MessageContentBlockSignatureDelta {
      signature: string;

      type: 'signature_delta';
    }
  }

  /**
   * Closes the current content block.
   */
  export interface MessageContentBlockStopEvent {
    /**
     * Zero-based index of the block within `content[]`.
     */
    index: number;

    type: 'content_block_stop';
  }

  /**
   * Penultimate event of the stream. Carries the final `stop_reason`, optional
   * `stop_sequence`, and final usage counts.
   */
  export interface MessageDeltaEvent {
    delta: MessageDeltaEvent.Delta;

    type: 'message_delta';

    /**
     * Final token accounting emitted in the closing `message_delta` event of a stream.
     */
    usage: MessageDeltaEvent.Usage;
  }

  export namespace MessageDeltaEvent {
    export interface Delta {
      /**
       * Reason the model stopped generating. SambaNova emits `end_turn`, `max_tokens`,
       * `tool_use`, and `stop_sequence`. The remaining values are defined for Anthropic
       * SDK type-parity but never returned: `pause_turn` (server-tool loop limit, not
       * produced); `refusal` (content filter, not exposed);
       * `model_context_window_exceeded` (folded to `max_tokens`).
       */
      stop_reason:
        | 'end_turn'
        | 'max_tokens'
        | 'tool_use'
        | 'pause_turn'
        | 'refusal'
        | 'stop_sequence'
        | 'model_context_window_exceeded';

      /**
       * Refusal stop details. Anthropic compatibility only — `refusal` is never emitted
       * as a stop_reason by SambaNova (content filtering is not exposed at the API
       * layer).
       */
      stop_details?: Delta.StopDetails | null;

      /**
       * Custom stop sequence that triggered termination. Field is emitted but value is
       * always `null` in v1 (backend collapses `StopSequenceHit` and `EndOfText` into
       * the same finish_reason).
       */
      stop_sequence?: string | null;
    }

    export namespace Delta {
      /**
       * Refusal stop details. Anthropic compatibility only — `refusal` is never emitted
       * as a stop_reason by SambaNova (content filtering is not exposed at the API
       * layer).
       */
      export interface StopDetails {
        type: 'refusal';

        category?: 'cyber' | 'bio';
      }
    }

    /**
     * Final token accounting emitted in the closing `message_delta` event of a stream.
     */
    export interface Usage {
      /**
       * Total tokens generated (final count).
       */
      output_tokens: number;

      /**
       * Tokens written to prompt cache. Absent in v1;
       */
      cache_creation_input_tokens?: number | null;

      /**
       * Tokens read from prompt cache. Absent in v1;
       */
      cache_read_input_tokens?: number | null;

      /**
       * Total tokens in the prompt (echoed from `message_start`).
       */
      input_tokens?: number | null;

      /**
       * Server-tool usage metrics. Anthropic compatibility only — SambaNova does not run
       * server tools, so this field is never emitted.
       */
      server_tool_use?: { [key: string]: unknown } | null;
    }
  }

  /**
   * Final event of the stream. No fields beyond `type`.
   */
  export interface MessageStopEvent {
    type: 'message_stop';
  }

  /**
   * Keepalive heartbeat. May appear at any point in the stream.
   */
  export interface MessagePingEvent {
    type: 'ping';
  }

  /**
   * Streamed error envelope. Terminates the stream.
   */
  export interface MessageStreamErrorEvent {
    /**
     * Inner error object carried inside a `MessageErrorResponse`. The `type` value
     * follows Anthropic's published error taxonomy.
     */
    error: MessageStreamErrorEvent.Error;

    type: 'error';
  }

  export namespace MessageStreamErrorEvent {
    /**
     * Inner error object carried inside a `MessageErrorResponse`. The `type` value
     * follows Anthropic's published error taxonomy.
     */
    export interface Error {
      /**
       * Human-readable explanation of the error.
       */
      message: string;

      /**
       * Error category. Values follow Anthropic's taxonomy.
       */
      type:
        | 'invalid_request_error'
        | 'authentication_error'
        | 'permission_error'
        | 'not_found_error'
        | 'request_too_large'
        | 'rate_limit_error'
        | 'api_error'
        | 'overloaded_error'
        | 'not_implemented_error';
    }
  }
}

/**
 * Non-streaming response from `POST /messages`. Wire-compatible with the official
 * Anthropic Messages API.
 */
export type MessageCreateResponse =
  | Message
  | MessageCreateResponse.MessageStartEvent
  | MessageCreateResponse.MessageContentBlockStartEvent
  | MessageCreateResponse.MessageContentBlockDeltaEvent
  | MessageCreateResponse.MessageContentBlockStopEvent
  | MessageCreateResponse.MessageDeltaEvent
  | MessageCreateResponse.MessageStopEvent
  | MessageCreateResponse.MessagePingEvent
  | MessageCreateResponse.MessageStreamErrorEvent;

export namespace MessageCreateResponse {
  /**
   * First event of a stream. Carries the initial Message envelope (empty
   * `content[]`, `stop_reason: null`) and token usage from prompt processing.
   */
  export interface MessageStartEvent {
    /**
     * Non-streaming response from `POST /messages`. Wire-compatible with the official
     * Anthropic Messages API.
     */
    message: MessagesAPI.Message;

    type: 'message_start';
  }

  /**
   * Opens a new content block. One per block in `content[]`.
   */
  export interface MessageContentBlockStartEvent {
    /**
     * Typed content block in the model's response.
     */
    content_block:
      | MessageContentBlockStartEvent.MessageOutputTextBlock
      | MessageContentBlockStartEvent.MessageOutputToolUseBlock
      | MessageContentBlockStartEvent.MessageOutputThinkingBlock
      | MessageContentBlockStartEvent.MessageOutputRedactedThinkingBlock
      | MessageContentBlockStartEvent.MessageOutputServerToolUseBlock
      | MessageContentBlockStartEvent.MessageOutputWebSearchToolResultBlock
      | MessageContentBlockStartEvent.MessageOutputWebFetchToolResultBlock
      | MessageContentBlockStartEvent.MessageOutputCodeExecutionToolResultBlock
      | MessageContentBlockStartEvent.MessageOutputBashCodeExecutionToolResultBlock
      | MessageContentBlockStartEvent.MessageOutputTextEditorCodeExecutionToolResultBlock
      | MessageContentBlockStartEvent.MessageOutputToolSearchToolResultBlock
      | MessageContentBlockStartEvent.MessageOutputContainerUploadBlock;

    /**
     * Zero-based index of the block within `content[]`.
     */
    index: number;

    type: 'content_block_start';
  }

  export namespace MessageContentBlockStartEvent {
    /**
     * Plain-text segment of the model's response.
     */
    export interface MessageOutputTextBlock {
      text: string;

      type: 'text';

      /**
       * Not emitted in v1.
       */
      citations?: Array<{ [key: string]: unknown }> | null;
    }

    /**
     * Tool call generated by the model.
     */
    export interface MessageOutputToolUseBlock {
      /**
       * Unique identifier for this tool call.
       */
      id: string;

      /**
       * Tool inputs as a JSON object.
       */
      input: { [key: string]: unknown };

      /**
       * Name of the tool being called.
       */
      name: string;

      type: 'tool_use';

      /**
       * Anthropic routing metadata. Always `null` in SambaNova responses.
       */
      caller?: { [key: string]: unknown } | null;
    }

    /**
     * Extended-reasoning trace from the model. Emitted by reasoning models.
     */
    export interface MessageOutputThinkingBlock {
      thinking: string;

      type: 'thinking';

      signature?: string | null;
    }

    /**
     * Anthropic compatibility only — SambaNova does not produce encrypted thinking
     * output. Never emitted in responses.
     */
    export interface MessageOutputRedactedThinkingBlock {
      data: string;

      type: 'redacted_thinking';
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side tools. Never
     * emitted in responses; defined for Anthropic SDK type-parity.
     */
    export interface MessageOutputServerToolUseBlock {
      id: string;

      input: { [key: string]: unknown };

      name: string;

      type: 'server_tool_use';
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side `web_search`.
     * Never emitted in responses.
     */
    export interface MessageOutputWebSearchToolResultBlock {
      content: Array<{ [key: string]: unknown }>;

      tool_use_id: string;

      type: 'web_search_tool_result';
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side `web_fetch`.
     * Never emitted in responses.
     */
    export interface MessageOutputWebFetchToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'web_fetch_tool_result';
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side
     * `code_execution`. Never emitted in responses.
     */
    export interface MessageOutputCodeExecutionToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'code_execution_tool_result';
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side bash code
     * execution. Never emitted in responses.
     */
    export interface MessageOutputBashCodeExecutionToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'bash_code_execution_tool_result';
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side text-editor
     * code execution. Never emitted in responses.
     */
    export interface MessageOutputTextEditorCodeExecutionToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'text_editor_code_execution_tool_result';
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side `tool_search`.
     * Never emitted in responses.
     */
    export interface MessageOutputToolSearchToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'tool_search_tool_result';
    }

    /**
     * Anthropic compatibility only — SambaNova does not produce container_upload
     * blocks (these come from Anthropic's server-side `code_execution` tool). Never
     * emitted in responses.
     */
    export interface MessageOutputContainerUploadBlock {
      file_id: string;

      type: 'container_upload';
    }
  }

  /**
   * Incremental update to the currently open content block.
   */
  export interface MessageContentBlockDeltaEvent {
    /**
     * Incremental update to an open content block.
     */
    delta:
      | MessageContentBlockDeltaEvent.MessageContentBlockTextDelta
      | MessageContentBlockDeltaEvent.MessageContentBlockInputJsonDelta
      | MessageContentBlockDeltaEvent.MessageContentBlockThinkingDelta
      | MessageContentBlockDeltaEvent.MessageContentBlockSignatureDelta;

    /**
     * Zero-based index of the block within `content[]`.
     */
    index: number;

    type: 'content_block_delta';
  }

  export namespace MessageContentBlockDeltaEvent {
    /**
     * Incremental text chunk for an open text content block.
     */
    export interface MessageContentBlockTextDelta {
      text: string;

      type: 'text_delta';
    }

    /**
     * Incremental fragment of a tool_use block's `input` JSON. Concatenate successive
     * `partial_json` strings to reconstruct the full input object.
     */
    export interface MessageContentBlockInputJsonDelta {
      partial_json: string;

      type: 'input_json_delta';
    }

    /**
     * Incremental thinking chunk for an open thinking block. Emitted by reasoning
     * models.
     */
    export interface MessageContentBlockThinkingDelta {
      thinking: string;

      type: 'thinking_delta';
    }

    /**
     * Signature for an open thinking block. Emitted at the end of a thinking stream
     * (paired with the closing `content_block_stop`); the `signature` value may be an
     * empty string when the backend has no signed payload to attach.
     */
    export interface MessageContentBlockSignatureDelta {
      signature: string;

      type: 'signature_delta';
    }
  }

  /**
   * Closes the current content block.
   */
  export interface MessageContentBlockStopEvent {
    /**
     * Zero-based index of the block within `content[]`.
     */
    index: number;

    type: 'content_block_stop';
  }

  /**
   * Penultimate event of the stream. Carries the final `stop_reason`, optional
   * `stop_sequence`, and final usage counts.
   */
  export interface MessageDeltaEvent {
    delta: MessageDeltaEvent.Delta;

    type: 'message_delta';

    /**
     * Final token accounting emitted in the closing `message_delta` event of a stream.
     */
    usage: MessageDeltaEvent.Usage;
  }

  export namespace MessageDeltaEvent {
    export interface Delta {
      /**
       * Reason the model stopped generating. SambaNova emits `end_turn`, `max_tokens`,
       * `tool_use`, and `stop_sequence`. The remaining values are defined for Anthropic
       * SDK type-parity but never returned: `pause_turn` (server-tool loop limit, not
       * produced); `refusal` (content filter, not exposed);
       * `model_context_window_exceeded` (folded to `max_tokens`).
       */
      stop_reason:
        | 'end_turn'
        | 'max_tokens'
        | 'tool_use'
        | 'pause_turn'
        | 'refusal'
        | 'stop_sequence'
        | 'model_context_window_exceeded';

      /**
       * Refusal stop details. Anthropic compatibility only — `refusal` is never emitted
       * as a stop_reason by SambaNova (content filtering is not exposed at the API
       * layer).
       */
      stop_details?: Delta.StopDetails | null;

      /**
       * Custom stop sequence that triggered termination. Field is emitted but value is
       * always `null` in v1 (backend collapses `StopSequenceHit` and `EndOfText` into
       * the same finish_reason).
       */
      stop_sequence?: string | null;
    }

    export namespace Delta {
      /**
       * Refusal stop details. Anthropic compatibility only — `refusal` is never emitted
       * as a stop_reason by SambaNova (content filtering is not exposed at the API
       * layer).
       */
      export interface StopDetails {
        type: 'refusal';

        category?: 'cyber' | 'bio';
      }
    }

    /**
     * Final token accounting emitted in the closing `message_delta` event of a stream.
     */
    export interface Usage {
      /**
       * Total tokens generated (final count).
       */
      output_tokens: number;

      /**
       * Tokens written to prompt cache. Absent in v1;
       */
      cache_creation_input_tokens?: number | null;

      /**
       * Tokens read from prompt cache. Absent in v1;
       */
      cache_read_input_tokens?: number | null;

      /**
       * Total tokens in the prompt (echoed from `message_start`).
       */
      input_tokens?: number | null;

      /**
       * Server-tool usage metrics. Anthropic compatibility only — SambaNova does not run
       * server tools, so this field is never emitted.
       */
      server_tool_use?: { [key: string]: unknown } | null;
    }
  }

  /**
   * Final event of the stream. No fields beyond `type`.
   */
  export interface MessageStopEvent {
    type: 'message_stop';
  }

  /**
   * Keepalive heartbeat. May appear at any point in the stream.
   */
  export interface MessagePingEvent {
    type: 'ping';
  }

  /**
   * Streamed error envelope. Terminates the stream.
   */
  export interface MessageStreamErrorEvent {
    /**
     * Inner error object carried inside a `MessageErrorResponse`. The `type` value
     * follows Anthropic's published error taxonomy.
     */
    error: MessageStreamErrorEvent.Error;

    type: 'error';
  }

  export namespace MessageStreamErrorEvent {
    /**
     * Inner error object carried inside a `MessageErrorResponse`. The `type` value
     * follows Anthropic's published error taxonomy.
     */
    export interface Error {
      /**
       * Human-readable explanation of the error.
       */
      message: string;

      /**
       * Error category. Values follow Anthropic's taxonomy.
       */
      type:
        | 'invalid_request_error'
        | 'authentication_error'
        | 'permission_error'
        | 'not_found_error'
        | 'request_too_large'
        | 'rate_limit_error'
        | 'api_error'
        | 'overloaded_error'
        | 'not_implemented_error';
    }
  }
}

export type MessageCreateParams = MessageCreateParamsNonStreaming | MessageCreateParamsStreaming;

export interface MessageCreateParamsBase {
  /**
   * Body param: Maximum number of tokens to generate. The combined input + output
   * token count is bounded by the model's context window.
   */
  max_tokens: number;

  /**
   * Body param: Conversation turns.
   */
  messages: Array<MessageCreateParams.Message>;

  /**
   * Body param: The model ID to use (e.g. gpt-oss-120b). See available
   * [models](https://docs.sambanova.ai/docs/en/models/sambacloud-models)
   */
  model:
    | (string & {})
    | 'Meta-Llama-3.3-70B-Instruct'
    | 'Meta-Llama-3.2-1B-Instruct'
    | 'Meta-Llama-3.2-3B-Instruct'
    | 'Llama-3.2-11B-Vision-Instruct'
    | 'Llama-3.2-90B-Vision-Instruct'
    | 'Meta-Llama-3.1-8B-Instruct'
    | 'Meta-Llama-3.1-70B-Instruct'
    | 'Meta-Llama-3.1-405B-Instruct'
    | 'Qwen2.5-Coder-32B-Instruct'
    | 'Qwen2.5-72B-Instruct'
    | 'QwQ-32B-Preview'
    | 'Meta-Llama-Guard-3-8B'
    | 'DeepSeek-R1'
    | 'DeepSeek-R1-0528'
    | 'DeepSeek-V3-0324'
    | 'DeepSeek-V3.1'
    | 'DeepSeek-V3.1-cb'
    | 'DeepSeek-V3.1-Terminus'
    | 'DeepSeek-V3.2'
    | 'DeepSeek-R1-Distill-Llama-70B'
    | 'Llama-4-Maverick-17B-128E-Instruct'
    | 'Llama-4-Scout-17B-16E-Instruct'
    | 'Qwen3-32B'
    | 'Qwen3-235B'
    | 'Llama-3.3-Swallow-70B-Instruct-v0.4'
    | 'gpt-oss-120b'
    | 'ALLaM-7B-Instruct-preview'
    | 'MiniMax-M2.5'
    | 'MiniMax-M2.7'
    | 'gemma-3-12b-it';

  /**
   * Body param: Existing code-execution container ID to reuse. **In v1**: silently
   * dropped
   */
  container?: string | null;

  /**
   * Body param: Free-form metadata attached to the request. Currently only `user_id`
   * Additional fields are accepted but ignored.
   */
  metadata?: MessageCreateParams.Metadata;

  /**
   * Body param: Service-tier preference. **In v1**: silently dropped
   */
  service_tier?: 'auto' | 'standard_only' | null;

  /**
   * Body param: Custom strings that, when generated, cause the model to stop.
   */
  stop_sequences?: Array<string> | null;

  /**
   * Body param: If true, the response is a sequence of Server-Sent Events whose
   * payloads conform to `MessageStreamEvent`.
   */
  stream?: boolean | null;

  /**
   * Body param: System prompt for the conversation. Accepts either a single string
   * (most common) or an array of text blocks (used when individual segments need
   * `cache_control` markers). Multiple text blocks are joined with newlines and
   * prepended to the conversation as a `role: system` message.
   */
  system?: string | Array<MessageCreateParams.SystemTextBlockArray>;

  /**
   * Body param: Sampling temperature in `[0.0, 2.0]`. Higher values produce more
   * random output, lower values more deterministic. Adjust only one of
   * `temperature`, `top_p`, `top_k`.
   */
  temperature?: number | null;

  /**
   * Body param: Controls Anthropic-style extended thinking. **In v1**: only
   * `type:"disabled"` is silently accepted as a no-op; `type:"enabled"` and
   * `type:"adaptive"` return a 400 `invalid_request_error`
   * (`unsupported_parameter`).
   */
  thinking?:
    | MessageCreateParams.MessageThinkingDisabled
    | MessageCreateParams.MessageThinkingEnabled
    | MessageCreateParams.MessageThinkingAdaptive;

  /**
   * Body param: How the model should choose from the provided tools.
   */
  tool_choice?:
    | MessageCreateParams.MessageToolChoiceAuto
    | MessageCreateParams.MessageToolChoiceAny
    | MessageCreateParams.MessageToolChoiceNone
    | MessageCreateParams.MessageToolChoiceTool
    | null;

  /**
   * Body param: Tool definitions the model may call.
   */
  tools?: Array<MessageCreateParams.Tool> | null;

  /**
   * Body param: Top-k sampling. Considers only the K most likely tokens at each
   * step. Set to 0 to disable.
   */
  top_k?: number | null;

  /**
   * Body param: Nucleus sampling. Considers tokens with cumulative probability mass
   * up to `top_p`.
   */
  top_p?: number | null;

  /**
   * Header param: Anthropic API version header sent by the official `anthropic` SDK.
   * Accepted (any value) but currently has no effect on response shape — included
   * for drop-in SDK compatibility.
   */
  'anthropic-version'?: string;

  [k: string]: unknown;
}

export namespace MessageCreateParams {
  /**
   * A turn in the conversation.
   */
  export interface Message {
    content:
      | string
      | Array<
          | Message.MessageInputTextBlock
          | Message.MessageInputImageBlock
          | Message.MessageInputVideoBlock
          | Message.MessageInputToolUseBlock
          | Message.MessageInputToolResultBlock
          | Message.MessageInputServerToolUseBlock
          | Message.MessageInputSearchResultBlock
          | Message.MessageInputWebSearchToolResultBlock
          | Message.MessageInputWebFetchToolResultBlock
          | Message.MessageInputCodeExecutionToolResultBlock
          | Message.MessageInputBashCodeExecutionToolResultBlock
          | Message.MessageInputTextEditorCodeExecutionToolResultBlock
          | Message.MessageInputToolSearchToolResultBlock
          | Message.MessageInputThinkingBlock
          | Message.MessageInputRedactedThinkingBlock
          | Message.MessageInputContainerUploadBlock
          | Message.MessageInputDocumentBlock
        >;

    /**
     * Conversational role. `user` for the human-side turn, `assistant` for prior model
     * output.
     */
    role: 'user' | 'assistant';
  }

  export namespace Message {
    /**
     * Plain-text segment of a message.
     */
    export interface MessageInputTextBlock {
      text: string;

      type: 'text';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputTextBlock.CacheControl;

      citations?: Array<{ [key: string]: unknown }> | null;
    }

    export namespace MessageInputTextBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Image content. Only `source.type:"base64"` is supported in v1; URL sources
     * return 400.
     */
    export interface MessageInputImageBlock {
      /**
       * Inline image data encoded as base64.
       */
      source:
        | MessageInputImageBlock.MessageInputImageSourceBase64
        | MessageInputImageBlock.MessageInputImageSourceURL;

      type: 'image';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputImageBlock.CacheControl;
    }

    export namespace MessageInputImageBlock {
      /**
       * Inline image data encoded as base64.
       */
      export interface MessageInputImageSourceBase64 {
        /**
         * Base64-encoded image bytes (no `data:` URI prefix).
         */
        data: string;

        /**
         * MIME type of the image bytes.
         */
        media_type: 'image/jpeg' | 'image/png' | 'image/webp';

        type: 'base64';
      }

      /**
       * HTTPS URL pointing to an image. **Returns 400 in v1** — URL fetching is blocked.
       * Use `type:"base64"` instead.
       */
      export interface MessageInputImageSourceURL {
        type: 'url';

        url: string;
      }

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Video content.
     */
    export interface MessageInputVideoBlock {
      /**
       * Inline video data encoded as base64.
       */
      source:
        | MessageInputVideoBlock.MessageInputVideoSourceBase64
        | MessageInputVideoBlock.MessageInputVideoSourceURL;

      type: 'video';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputVideoBlock.CacheControl;
    }

    export namespace MessageInputVideoBlock {
      /**
       * Inline video data encoded as base64.
       */
      export interface MessageInputVideoSourceBase64 {
        /**
         * Base64-encoded video bytes (no `data:` URI prefix).
         */
        data: string;

        /**
         * MIME type of the video bytes.
         */
        media_type: 'video/mp4';

        type: 'base64';
      }

      /**
       * HTTPS URL pointing to a video.
       */
      export interface MessageInputVideoSourceURL {
        type: 'url';

        url: string;
      }

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * A prior assistant turn that invoked a tool.
     */
    export interface MessageInputToolUseBlock {
      /**
       * Unique identifier for the tool call (used to correlate `tool_result`).
       */
      id: string;

      /**
       * Tool inputs as a JSON object.
       */
      input: { [key: string]: unknown };

      /**
       * Name of the tool being invoked.
       */
      name: string;

      type: 'tool_use';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputToolUseBlock.CacheControl;
    }

    export namespace MessageInputToolUseBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Result of a prior tool call.
     */
    export interface MessageInputToolResultBlock {
      /**
       * ID of the `tool_use` block this result corresponds to.
       */
      tool_use_id: string;

      type: 'tool_result';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputToolResultBlock.CacheControl;

      content?:
        | string
        | Array<
            | MessageInputToolResultBlock.MessageInputTextBlock
            | MessageInputToolResultBlock.MessageInputImageBlock
          >;

      /**
       * Silently dropped in v1.
       */
      is_error?: boolean | null;
    }

    export namespace MessageInputToolResultBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }

      /**
       * Plain-text segment of a message.
       */
      export interface MessageInputTextBlock {
        text: string;

        type: 'text';

        /**
         * Marks the preceding content block (or system text block) as a prompt- cache
         * breakpoint. Marker positions are collected by the adapter; their wiring into the
         * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
         * value is ignored.
         */
        cache_control?: MessageInputTextBlock.CacheControl;

        citations?: Array<{ [key: string]: unknown }> | null;
      }

      export namespace MessageInputTextBlock {
        /**
         * Marks the preceding content block (or system text block) as a prompt- cache
         * breakpoint. Marker positions are collected by the adapter; their wiring into the
         * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
         * value is ignored.
         */
        export interface CacheControl {
          /**
           * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
           */
          type: 'ephemeral';

          /**
           * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
           */
          ttl?: string | null;
        }
      }

      /**
       * Image content. Only `source.type:"base64"` is supported in v1; URL sources
       * return 400.
       */
      export interface MessageInputImageBlock {
        /**
         * Inline image data encoded as base64.
         */
        source:
          | MessageInputImageBlock.MessageInputImageSourceBase64
          | MessageInputImageBlock.MessageInputImageSourceURL;

        type: 'image';

        /**
         * Marks the preceding content block (or system text block) as a prompt- cache
         * breakpoint. Marker positions are collected by the adapter; their wiring into the
         * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
         * value is ignored.
         */
        cache_control?: MessageInputImageBlock.CacheControl;
      }

      export namespace MessageInputImageBlock {
        /**
         * Inline image data encoded as base64.
         */
        export interface MessageInputImageSourceBase64 {
          /**
           * Base64-encoded image bytes (no `data:` URI prefix).
           */
          data: string;

          /**
           * MIME type of the image bytes.
           */
          media_type: 'image/jpeg' | 'image/png' | 'image/webp';

          type: 'base64';
        }

        /**
         * HTTPS URL pointing to an image. **Returns 400 in v1** — URL fetching is blocked.
         * Use `type:"base64"` instead.
         */
        export interface MessageInputImageSourceURL {
          type: 'url';

          url: string;
        }

        /**
         * Marks the preceding content block (or system text block) as a prompt- cache
         * breakpoint. Marker positions are collected by the adapter; their wiring into the
         * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
         * value is ignored.
         */
        export interface CacheControl {
          /**
           * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
           */
          type: 'ephemeral';

          /**
           * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
           */
          ttl?: string | null;
        }
      }
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side tools. A prior
     * assistant turn that invoked an Anthropic-hosted tool (web_search,
     * code_execution, etc.). Accepted in conversation history (e.g. replaying an
     * Anthropic-served session) but never originates from a SambaNova response. New
     * `server_tool_use`-type tool definitions on outgoing requests are rejected with
     * 400 `unsupported_tool_type`.
     */
    export interface MessageInputServerToolUseBlock {
      id: string;

      input: { [key: string]: unknown };

      name: string;

      type: 'server_tool_use';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputServerToolUseBlock.CacheControl;
    }

    export namespace MessageInputServerToolUseBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Inline search result content. In v1 the `title`, `source`, and `content[]` text
     * are extracted into a text block; citations are dropped.
     */
    export interface MessageInputSearchResultBlock {
      type: 'search_result';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputSearchResultBlock.CacheControl;

      citations?: { [key: string]: unknown } | null;

      content?: Array<MessageInputSearchResultBlock.Content>;

      source?: string;

      title?: string;
    }

    export namespace MessageInputSearchResultBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }

      /**
       * Plain-text segment of a message.
       */
      export interface Content {
        text: string;

        type: 'text';

        /**
         * Marks the preceding content block (or system text block) as a prompt- cache
         * breakpoint. Marker positions are collected by the adapter; their wiring into the
         * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
         * value is ignored.
         */
        cache_control?: Content.CacheControl;

        citations?: Array<{ [key: string]: unknown }> | null;
      }

      export namespace Content {
        /**
         * Marks the preceding content block (or system text block) as a prompt- cache
         * breakpoint. Marker positions are collected by the adapter; their wiring into the
         * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
         * value is ignored.
         */
        export interface CacheControl {
          /**
           * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
           */
          type: 'ephemeral';

          /**
           * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
           */
          ttl?: string | null;
        }
      }
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side `web_search`.
     * Echo of a prior Anthropic-served `web_search` tool call; accepted in
     * conversation history but never originates from a SambaNova response. When
     * present, only `title` (`url`) per result is extracted into a tool message.
     */
    export interface MessageInputWebSearchToolResultBlock {
      content: Array<{ [key: string]: unknown }>;

      tool_use_id: string;

      type: 'web_search_tool_result';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputWebSearchToolResultBlock.CacheControl;
    }

    export namespace MessageInputWebSearchToolResultBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side `web_fetch`.
     * Echo of a prior Anthropic-served `web_fetch` tool call; accepted in conversation
     * history but never originates from a SambaNova response. When present, only the
     * text content is extracted.
     */
    export interface MessageInputWebFetchToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'web_fetch_tool_result';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputWebFetchToolResultBlock.CacheControl;
    }

    export namespace MessageInputWebFetchToolResultBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side
     * `code_execution`. Echo of a prior Anthropic-served `code_execution` tool call;
     * accepted in conversation history but never originates from a SambaNova response.
     * When present, only `stdout`, `stderr`, and `return_code` are extracted; image
     * output is dropped.
     */
    export interface MessageInputCodeExecutionToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'code_execution_tool_result';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputCodeExecutionToolResultBlock.CacheControl;
    }

    export namespace MessageInputCodeExecutionToolResultBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side bash code
     * execution. Echo of a prior Anthropic-served bash tool call; accepted in
     * conversation history but never originates from a SambaNova response. Same lossy
     * extraction as `code_execution_tool_result`.
     */
    export interface MessageInputBashCodeExecutionToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'bash_code_execution_tool_result';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputBashCodeExecutionToolResultBlock.CacheControl;
    }

    export namespace MessageInputBashCodeExecutionToolResultBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side text-editor
     * code execution. Echo of a prior Anthropic-served text-editor tool call; accepted
     * in conversation history but never originates from a SambaNova response. When
     * present, only file content is extracted; metadata (line count, file type) is
     * dropped.
     */
    export interface MessageInputTextEditorCodeExecutionToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'text_editor_code_execution_tool_result';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputTextEditorCodeExecutionToolResultBlock.CacheControl;
    }

    export namespace MessageInputTextEditorCodeExecutionToolResultBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side `tool_search`.
     * Echo of a prior Anthropic-served `tool_search` tool call; accepted in
     * conversation history but never originates from a SambaNova response. When
     * present, an empty string is emitted to the tool message (no plain-text fields).
     */
    export interface MessageInputToolSearchToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'tool_search_tool_result';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputToolSearchToolResultBlock.CacheControl;
    }

    export namespace MessageInputToolSearchToolResultBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Extended-reasoning trace from a prior assistant turn.
     */
    export interface MessageInputThinkingBlock {
      signature: string;

      thinking: string;

      type: 'thinking';
    }

    /**
     * Anthropic compatibility only — SambaNova does not produce encrypted thinking
     * output. Echo of a prior Anthropic-served response where
     * `thinking.display:"omitted"` was set. Accepted in conversation history but never
     * originates from a SambaNova response. Silently dropped on input.
     */
    export interface MessageInputRedactedThinkingBlock {
      data: string;

      type: 'redacted_thinking';
    }

    /**
     * Anthropic compatibility only — SambaNova does not produce container_upload
     * blocks (these come from Anthropic's server-side `code_execution` tool). Accepted
     * in conversation history but never originates from a SambaNova response. Silently
     * dropped on input.
     */
    export interface MessageInputContainerUploadBlock {
      file_id: string;

      type: 'container_upload';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputContainerUploadBlock.CacheControl;
    }

    export namespace MessageInputContainerUploadBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * PDF or document content. **Returns 400** — no document-extraction pipeline
     * available.
     */
    export interface MessageInputDocumentBlock {
      source: { [key: string]: unknown };

      type: 'document';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputDocumentBlock.CacheControl;

      citations?: { [key: string]: unknown } | null;

      context?: string | null;

      title?: string | null;
    }

    export namespace MessageInputDocumentBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }
  }

  /**
   * Free-form metadata attached to the request. Currently only `user_id` Additional
   * fields are accepted but ignored.
   */
  export interface Metadata {
    /**
     * External identifier for the end-user making the request. Mapped internally to
     * the Chat Completions `user` field.
     */
    user_id?: string | null;

    [k: string]: unknown;
  }

  /**
   * A text segment within a structured `system` prompt array. Multiple text blocks
   * are concatenated (with newlines) and prepended to the conversation as a
   * `role: system` message at the chat-completions layer.
   */
  export interface SystemTextBlockArray {
    /**
     * Plain-text content of the system prompt segment.
     */
    text: string;

    type: 'text';

    /**
     * Marks the preceding content block (or system text block) as a prompt- cache
     * breakpoint. Marker positions are collected by the adapter; their wiring into the
     * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
     * value is ignored.
     */
    cache_control?: SystemTextBlockArray.CacheControl;

    /**
     * Optional citations. **In v1**: silently dropped
     */
    citations?: Array<{ [key: string]: unknown }> | null;
  }

  export namespace SystemTextBlockArray {
    /**
     * Marks the preceding content block (or system text block) as a prompt- cache
     * breakpoint. Marker positions are collected by the adapter; their wiring into the
     * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
     * value is ignored.
     */
    export interface CacheControl {
      /**
       * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
       */
      type: 'ephemeral';

      /**
       * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
       */
      ttl?: string | null;
    }
  }

  /**
   * Disables Anthropic-style extended thinking. **In v1**: silently accepted as a
   * no-op
   */
  export interface MessageThinkingDisabled {
    type: 'disabled';
  }

  /**
   * Enables Anthropic-style extended thinking with a fixed budget. **In v1**:
   * returns a 400 `invalid_request_error` (`unsupported_parameter`).
   */
  export interface MessageThinkingEnabled {
    /**
     * Maximum tokens the model may spend on extended thinking before producing the
     * final answer.
     */
    budget_tokens: number;

    type: 'enabled';
  }

  /**
   * Enables Anthropic-style adaptive extended thinking. **In v1**: returns a 400
   * `invalid_request_error` (`unsupported_parameter`).
   */
  export interface MessageThinkingAdaptive {
    type: 'adaptive';

    /**
     * Optional upper bound on tokens spent on adaptive thinking. When omitted, the
     * backend chooses based on prompt complexity.
     */
    budget_tokens?: number | null;
  }

  /**
   * Let the model decide whether and which tool to use.
   */
  export interface MessageToolChoiceAuto {
    type: 'auto';

    /**
     * Silently dropped.
     */
    disable_parallel_tool_use?: boolean | null;
  }

  /**
   * Require the model to call one of the provided tools.
   */
  export interface MessageToolChoiceAny {
    type: 'any';

    /**
     * Silently dropped.
     */
    disable_parallel_tool_use?: boolean | null;
  }

  /**
   * Forbid the model from calling any tool.
   */
  export interface MessageToolChoiceNone {
    type: 'none';
  }

  /**
   * Force the model to call a specific tool by name.
   */
  export interface MessageToolChoiceTool {
    /**
     * Name of the required tool.
     */
    name: string;

    type: 'tool';

    /**
     * Silently dropped.
     */
    disable_parallel_tool_use?: boolean | null;
  }

  /**
   * User-defined function tool definition. Only custom function tools are supported
   * (Anthropic's `type:"custom"` style or the absent-type Beta style).
   * Anthropic-hosted server tools (`web_search`, `code_execution`, `bash`,
   * `text_editor`, `memory`, `tool_search` variants) return 400
   * `unsupported_tool_type` if sent.
   */
  export interface Tool {
    /**
     * Tool name. Must match `^[a-zA-Z0-9_-]+$`.
     */
    name: string;

    /**
     * Silently dropped.
     */
    allowed_callers?: Array<string> | null;

    /**
     * Marks the preceding content block (or system text block) as a prompt- cache
     * breakpoint. Marker positions are collected by the adapter; their wiring into the
     * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
     * value is ignored.
     */
    cache_control?: Tool.CacheControl | null;

    /**
     * Silently dropped.
     */
    defer_loading?: boolean | null;

    /**
     * Human-readable description of when the tool should be used.
     */
    description?: string | null;

    /**
     * Silently dropped.
     */
    eager_input_streaming?: boolean | null;

    /**
     * Silently dropped.
     */
    input_examples?: Array<{ [key: string]: unknown }> | null;

    /**
     * JSON Schema describing the tool's expected input. Required by the Anthropic
     * spec; accepted as optional by SambaNova.
     */
    input_schema?: { [key: string]: unknown } | null;

    /**
     * Silently dropped.
     */
    strict?: boolean | null;

    /**
     * Tool-type discriminator. May be omitted (defaults to custom) or set to `custom`.
     * Other values return 400 `unsupported_tool_type`.
     */
    type?: 'custom' | null;
  }

  export namespace Tool {
    /**
     * Marks the preceding content block (or system text block) as a prompt- cache
     * breakpoint. Marker positions are collected by the adapter; their wiring into the
     * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
     * value is ignored.
     */
    export interface CacheControl {
      /**
       * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
       */
      type: 'ephemeral';

      /**
       * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
       */
      ttl?: string | null;
    }
  }

  export type MessageCreateParamsNonStreaming = MessagesAPI.MessageCreateParamsNonStreaming;
  export type MessageCreateParamsStreaming = MessagesAPI.MessageCreateParamsStreaming;
}

export interface MessageCreateParamsNonStreaming extends MessageCreateParamsBase {
  /**
   * Body param: If true, the response is a sequence of Server-Sent Events whose
   * payloads conform to `MessageStreamEvent`.
   */
  stream?: false | null;

  [k: string]: unknown;
}

export interface MessageCreateParamsStreaming extends MessageCreateParamsBase {
  /**
   * Body param: If true, the response is a sequence of Server-Sent Events whose
   * payloads conform to `MessageStreamEvent`.
   */
  stream: true;

  [k: string]: unknown;
}

export interface MessageCountTokensParams {
  /**
   * Body param: Conversation turns.
   */
  messages: Array<MessageCountTokensParams.Message>;

  /**
   * Body param: Model identifier.
   */
  model: string;

  /**
   * Body param: System prompt for the conversation. Accepts either a single string
   * (most common) or an array of text blocks (used when individual segments need
   * `cache_control` markers). Multiple text blocks are joined with newlines and
   * prepended to the conversation as a `role: system` message.
   */
  system?: string | Array<MessageCountTokensParams.SystemTextBlockArray>;

  /**
   * Body param: Controls Anthropic-style extended thinking. **In v1**: only
   * `type:"disabled"` is silently accepted as a no-op; `type:"enabled"` and
   * `type:"adaptive"` return a 400 `invalid_request_error`
   * (`unsupported_parameter`).
   */
  thinking?:
    | MessageCountTokensParams.MessageThinkingDisabled
    | MessageCountTokensParams.MessageThinkingEnabled
    | MessageCountTokensParams.MessageThinkingAdaptive;

  /**
   * Body param: How the model should choose from the provided tools.
   */
  tool_choice?:
    | MessageCountTokensParams.MessageToolChoiceAuto
    | MessageCountTokensParams.MessageToolChoiceAny
    | MessageCountTokensParams.MessageToolChoiceNone
    | MessageCountTokensParams.MessageToolChoiceTool
    | null;

  /**
   * Body param: Tool definitions the model may call.
   */
  tools?: Array<MessageCountTokensParams.Tool> | null;

  /**
   * Header param: Anthropic API version header sent by the official `anthropic` SDK.
   * Accepted (any value) but currently has no effect on response shape - included
   * for drop-in SDK compatibility.
   */
  'anthropic-version'?: string;

  [k: string]: unknown;
}

export namespace MessageCountTokensParams {
  /**
   * A turn in the conversation.
   */
  export interface Message {
    content:
      | string
      | Array<
          | Message.MessageInputTextBlock
          | Message.MessageInputImageBlock
          | Message.MessageInputVideoBlock
          | Message.MessageInputToolUseBlock
          | Message.MessageInputToolResultBlock
          | Message.MessageInputServerToolUseBlock
          | Message.MessageInputSearchResultBlock
          | Message.MessageInputWebSearchToolResultBlock
          | Message.MessageInputWebFetchToolResultBlock
          | Message.MessageInputCodeExecutionToolResultBlock
          | Message.MessageInputBashCodeExecutionToolResultBlock
          | Message.MessageInputTextEditorCodeExecutionToolResultBlock
          | Message.MessageInputToolSearchToolResultBlock
          | Message.MessageInputThinkingBlock
          | Message.MessageInputRedactedThinkingBlock
          | Message.MessageInputContainerUploadBlock
          | Message.MessageInputDocumentBlock
        >;

    /**
     * Conversational role. `user` for the human-side turn, `assistant` for prior model
     * output.
     */
    role: 'user' | 'assistant';
  }

  export namespace Message {
    /**
     * Plain-text segment of a message.
     */
    export interface MessageInputTextBlock {
      text: string;

      type: 'text';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputTextBlock.CacheControl;

      citations?: Array<{ [key: string]: unknown }> | null;
    }

    export namespace MessageInputTextBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Image content. Only `source.type:"base64"` is supported in v1; URL sources
     * return 400.
     */
    export interface MessageInputImageBlock {
      /**
       * Inline image data encoded as base64.
       */
      source:
        | MessageInputImageBlock.MessageInputImageSourceBase64
        | MessageInputImageBlock.MessageInputImageSourceURL;

      type: 'image';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputImageBlock.CacheControl;
    }

    export namespace MessageInputImageBlock {
      /**
       * Inline image data encoded as base64.
       */
      export interface MessageInputImageSourceBase64 {
        /**
         * Base64-encoded image bytes (no `data:` URI prefix).
         */
        data: string;

        /**
         * MIME type of the image bytes.
         */
        media_type: 'image/jpeg' | 'image/png' | 'image/webp';

        type: 'base64';
      }

      /**
       * HTTPS URL pointing to an image. **Returns 400 in v1** — URL fetching is blocked.
       * Use `type:"base64"` instead.
       */
      export interface MessageInputImageSourceURL {
        type: 'url';

        url: string;
      }

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Video content.
     */
    export interface MessageInputVideoBlock {
      /**
       * Inline video data encoded as base64.
       */
      source:
        | MessageInputVideoBlock.MessageInputVideoSourceBase64
        | MessageInputVideoBlock.MessageInputVideoSourceURL;

      type: 'video';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputVideoBlock.CacheControl;
    }

    export namespace MessageInputVideoBlock {
      /**
       * Inline video data encoded as base64.
       */
      export interface MessageInputVideoSourceBase64 {
        /**
         * Base64-encoded video bytes (no `data:` URI prefix).
         */
        data: string;

        /**
         * MIME type of the video bytes.
         */
        media_type: 'video/mp4';

        type: 'base64';
      }

      /**
       * HTTPS URL pointing to a video.
       */
      export interface MessageInputVideoSourceURL {
        type: 'url';

        url: string;
      }

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * A prior assistant turn that invoked a tool.
     */
    export interface MessageInputToolUseBlock {
      /**
       * Unique identifier for the tool call (used to correlate `tool_result`).
       */
      id: string;

      /**
       * Tool inputs as a JSON object.
       */
      input: { [key: string]: unknown };

      /**
       * Name of the tool being invoked.
       */
      name: string;

      type: 'tool_use';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputToolUseBlock.CacheControl;
    }

    export namespace MessageInputToolUseBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Result of a prior tool call.
     */
    export interface MessageInputToolResultBlock {
      /**
       * ID of the `tool_use` block this result corresponds to.
       */
      tool_use_id: string;

      type: 'tool_result';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputToolResultBlock.CacheControl;

      content?:
        | string
        | Array<
            | MessageInputToolResultBlock.MessageInputTextBlock
            | MessageInputToolResultBlock.MessageInputImageBlock
          >;

      /**
       * Silently dropped in v1.
       */
      is_error?: boolean | null;
    }

    export namespace MessageInputToolResultBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }

      /**
       * Plain-text segment of a message.
       */
      export interface MessageInputTextBlock {
        text: string;

        type: 'text';

        /**
         * Marks the preceding content block (or system text block) as a prompt- cache
         * breakpoint. Marker positions are collected by the adapter; their wiring into the
         * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
         * value is ignored.
         */
        cache_control?: MessageInputTextBlock.CacheControl;

        citations?: Array<{ [key: string]: unknown }> | null;
      }

      export namespace MessageInputTextBlock {
        /**
         * Marks the preceding content block (or system text block) as a prompt- cache
         * breakpoint. Marker positions are collected by the adapter; their wiring into the
         * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
         * value is ignored.
         */
        export interface CacheControl {
          /**
           * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
           */
          type: 'ephemeral';

          /**
           * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
           */
          ttl?: string | null;
        }
      }

      /**
       * Image content. Only `source.type:"base64"` is supported in v1; URL sources
       * return 400.
       */
      export interface MessageInputImageBlock {
        /**
         * Inline image data encoded as base64.
         */
        source:
          | MessageInputImageBlock.MessageInputImageSourceBase64
          | MessageInputImageBlock.MessageInputImageSourceURL;

        type: 'image';

        /**
         * Marks the preceding content block (or system text block) as a prompt- cache
         * breakpoint. Marker positions are collected by the adapter; their wiring into the
         * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
         * value is ignored.
         */
        cache_control?: MessageInputImageBlock.CacheControl;
      }

      export namespace MessageInputImageBlock {
        /**
         * Inline image data encoded as base64.
         */
        export interface MessageInputImageSourceBase64 {
          /**
           * Base64-encoded image bytes (no `data:` URI prefix).
           */
          data: string;

          /**
           * MIME type of the image bytes.
           */
          media_type: 'image/jpeg' | 'image/png' | 'image/webp';

          type: 'base64';
        }

        /**
         * HTTPS URL pointing to an image. **Returns 400 in v1** — URL fetching is blocked.
         * Use `type:"base64"` instead.
         */
        export interface MessageInputImageSourceURL {
          type: 'url';

          url: string;
        }

        /**
         * Marks the preceding content block (or system text block) as a prompt- cache
         * breakpoint. Marker positions are collected by the adapter; their wiring into the
         * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
         * value is ignored.
         */
        export interface CacheControl {
          /**
           * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
           */
          type: 'ephemeral';

          /**
           * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
           */
          ttl?: string | null;
        }
      }
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side tools. A prior
     * assistant turn that invoked an Anthropic-hosted tool (web_search,
     * code_execution, etc.). Accepted in conversation history (e.g. replaying an
     * Anthropic-served session) but never originates from a SambaNova response. New
     * `server_tool_use`-type tool definitions on outgoing requests are rejected with
     * 400 `unsupported_tool_type`.
     */
    export interface MessageInputServerToolUseBlock {
      id: string;

      input: { [key: string]: unknown };

      name: string;

      type: 'server_tool_use';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputServerToolUseBlock.CacheControl;
    }

    export namespace MessageInputServerToolUseBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Inline search result content. In v1 the `title`, `source`, and `content[]` text
     * are extracted into a text block; citations are dropped.
     */
    export interface MessageInputSearchResultBlock {
      type: 'search_result';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputSearchResultBlock.CacheControl;

      citations?: { [key: string]: unknown } | null;

      content?: Array<MessageInputSearchResultBlock.Content>;

      source?: string;

      title?: string;
    }

    export namespace MessageInputSearchResultBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }

      /**
       * Plain-text segment of a message.
       */
      export interface Content {
        text: string;

        type: 'text';

        /**
         * Marks the preceding content block (or system text block) as a prompt- cache
         * breakpoint. Marker positions are collected by the adapter; their wiring into the
         * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
         * value is ignored.
         */
        cache_control?: Content.CacheControl;

        citations?: Array<{ [key: string]: unknown }> | null;
      }

      export namespace Content {
        /**
         * Marks the preceding content block (or system text block) as a prompt- cache
         * breakpoint. Marker positions are collected by the adapter; their wiring into the
         * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
         * value is ignored.
         */
        export interface CacheControl {
          /**
           * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
           */
          type: 'ephemeral';

          /**
           * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
           */
          ttl?: string | null;
        }
      }
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side `web_search`.
     * Echo of a prior Anthropic-served `web_search` tool call; accepted in
     * conversation history but never originates from a SambaNova response. When
     * present, only `title` (`url`) per result is extracted into a tool message.
     */
    export interface MessageInputWebSearchToolResultBlock {
      content: Array<{ [key: string]: unknown }>;

      tool_use_id: string;

      type: 'web_search_tool_result';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputWebSearchToolResultBlock.CacheControl;
    }

    export namespace MessageInputWebSearchToolResultBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side `web_fetch`.
     * Echo of a prior Anthropic-served `web_fetch` tool call; accepted in conversation
     * history but never originates from a SambaNova response. When present, only the
     * text content is extracted.
     */
    export interface MessageInputWebFetchToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'web_fetch_tool_result';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputWebFetchToolResultBlock.CacheControl;
    }

    export namespace MessageInputWebFetchToolResultBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side
     * `code_execution`. Echo of a prior Anthropic-served `code_execution` tool call;
     * accepted in conversation history but never originates from a SambaNova response.
     * When present, only `stdout`, `stderr`, and `return_code` are extracted; image
     * output is dropped.
     */
    export interface MessageInputCodeExecutionToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'code_execution_tool_result';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputCodeExecutionToolResultBlock.CacheControl;
    }

    export namespace MessageInputCodeExecutionToolResultBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side bash code
     * execution. Echo of a prior Anthropic-served bash tool call; accepted in
     * conversation history but never originates from a SambaNova response. Same lossy
     * extraction as `code_execution_tool_result`.
     */
    export interface MessageInputBashCodeExecutionToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'bash_code_execution_tool_result';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputBashCodeExecutionToolResultBlock.CacheControl;
    }

    export namespace MessageInputBashCodeExecutionToolResultBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side text-editor
     * code execution. Echo of a prior Anthropic-served text-editor tool call; accepted
     * in conversation history but never originates from a SambaNova response. When
     * present, only file content is extracted; metadata (line count, file type) is
     * dropped.
     */
    export interface MessageInputTextEditorCodeExecutionToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'text_editor_code_execution_tool_result';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputTextEditorCodeExecutionToolResultBlock.CacheControl;
    }

    export namespace MessageInputTextEditorCodeExecutionToolResultBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Anthropic compatibility only — SambaNova does not run server-side `tool_search`.
     * Echo of a prior Anthropic-served `tool_search` tool call; accepted in
     * conversation history but never originates from a SambaNova response. When
     * present, an empty string is emitted to the tool message (no plain-text fields).
     */
    export interface MessageInputToolSearchToolResultBlock {
      content: { [key: string]: unknown };

      tool_use_id: string;

      type: 'tool_search_tool_result';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputToolSearchToolResultBlock.CacheControl;
    }

    export namespace MessageInputToolSearchToolResultBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * Extended-reasoning trace from a prior assistant turn.
     */
    export interface MessageInputThinkingBlock {
      signature: string;

      thinking: string;

      type: 'thinking';
    }

    /**
     * Anthropic compatibility only — SambaNova does not produce encrypted thinking
     * output. Echo of a prior Anthropic-served response where
     * `thinking.display:"omitted"` was set. Accepted in conversation history but never
     * originates from a SambaNova response. Silently dropped on input.
     */
    export interface MessageInputRedactedThinkingBlock {
      data: string;

      type: 'redacted_thinking';
    }

    /**
     * Anthropic compatibility only — SambaNova does not produce container_upload
     * blocks (these come from Anthropic's server-side `code_execution` tool). Accepted
     * in conversation history but never originates from a SambaNova response. Silently
     * dropped on input.
     */
    export interface MessageInputContainerUploadBlock {
      file_id: string;

      type: 'container_upload';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputContainerUploadBlock.CacheControl;
    }

    export namespace MessageInputContainerUploadBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }

    /**
     * PDF or document content. **Returns 400** — no document-extraction pipeline
     * available.
     */
    export interface MessageInputDocumentBlock {
      source: { [key: string]: unknown };

      type: 'document';

      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      cache_control?: MessageInputDocumentBlock.CacheControl;

      citations?: { [key: string]: unknown } | null;

      context?: string | null;

      title?: string | null;
    }

    export namespace MessageInputDocumentBlock {
      /**
       * Marks the preceding content block (or system text block) as a prompt- cache
       * breakpoint. Marker positions are collected by the adapter; their wiring into the
       * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
       * value is ignored.
       */
      export interface CacheControl {
        /**
         * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
         */
        type: 'ephemeral';

        /**
         * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
         */
        ttl?: string | null;
      }
    }
  }

  /**
   * A text segment within a structured `system` prompt array. Multiple text blocks
   * are concatenated (with newlines) and prepended to the conversation as a
   * `role: system` message at the chat-completions layer.
   */
  export interface SystemTextBlockArray {
    /**
     * Plain-text content of the system prompt segment.
     */
    text: string;

    type: 'text';

    /**
     * Marks the preceding content block (or system text block) as a prompt- cache
     * breakpoint. Marker positions are collected by the adapter; their wiring into the
     * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
     * value is ignored.
     */
    cache_control?: SystemTextBlockArray.CacheControl;

    /**
     * Optional citations. **In v1**: silently dropped
     */
    citations?: Array<{ [key: string]: unknown }> | null;
  }

  export namespace SystemTextBlockArray {
    /**
     * Marks the preceding content block (or system text block) as a prompt- cache
     * breakpoint. Marker positions are collected by the adapter; their wiring into the
     * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
     * value is ignored.
     */
    export interface CacheControl {
      /**
       * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
       */
      type: 'ephemeral';

      /**
       * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
       */
      ttl?: string | null;
    }
  }

  /**
   * Disables Anthropic-style extended thinking. **In v1**: silently accepted as a
   * no-op
   */
  export interface MessageThinkingDisabled {
    type: 'disabled';
  }

  /**
   * Enables Anthropic-style extended thinking with a fixed budget. **In v1**:
   * returns a 400 `invalid_request_error` (`unsupported_parameter`).
   */
  export interface MessageThinkingEnabled {
    /**
     * Maximum tokens the model may spend on extended thinking before producing the
     * final answer.
     */
    budget_tokens: number;

    type: 'enabled';
  }

  /**
   * Enables Anthropic-style adaptive extended thinking. **In v1**: returns a 400
   * `invalid_request_error` (`unsupported_parameter`).
   */
  export interface MessageThinkingAdaptive {
    type: 'adaptive';

    /**
     * Optional upper bound on tokens spent on adaptive thinking. When omitted, the
     * backend chooses based on prompt complexity.
     */
    budget_tokens?: number | null;
  }

  /**
   * Let the model decide whether and which tool to use.
   */
  export interface MessageToolChoiceAuto {
    type: 'auto';

    /**
     * Silently dropped.
     */
    disable_parallel_tool_use?: boolean | null;
  }

  /**
   * Require the model to call one of the provided tools.
   */
  export interface MessageToolChoiceAny {
    type: 'any';

    /**
     * Silently dropped.
     */
    disable_parallel_tool_use?: boolean | null;
  }

  /**
   * Forbid the model from calling any tool.
   */
  export interface MessageToolChoiceNone {
    type: 'none';
  }

  /**
   * Force the model to call a specific tool by name.
   */
  export interface MessageToolChoiceTool {
    /**
     * Name of the required tool.
     */
    name: string;

    type: 'tool';

    /**
     * Silently dropped.
     */
    disable_parallel_tool_use?: boolean | null;
  }

  /**
   * User-defined function tool definition. Only custom function tools are supported
   * (Anthropic's `type:"custom"` style or the absent-type Beta style).
   * Anthropic-hosted server tools (`web_search`, `code_execution`, `bash`,
   * `text_editor`, `memory`, `tool_search` variants) return 400
   * `unsupported_tool_type` if sent.
   */
  export interface Tool {
    /**
     * Tool name. Must match `^[a-zA-Z0-9_-]+$`.
     */
    name: string;

    /**
     * Silently dropped.
     */
    allowed_callers?: Array<string> | null;

    /**
     * Marks the preceding content block (or system text block) as a prompt- cache
     * breakpoint. Marker positions are collected by the adapter; their wiring into the
     * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
     * value is ignored.
     */
    cache_control?: Tool.CacheControl | null;

    /**
     * Silently dropped.
     */
    defer_loading?: boolean | null;

    /**
     * Human-readable description of when the tool should be used.
     */
    description?: string | null;

    /**
     * Silently dropped.
     */
    eager_input_streaming?: boolean | null;

    /**
     * Silently dropped.
     */
    input_examples?: Array<{ [key: string]: unknown }> | null;

    /**
     * JSON Schema describing the tool's expected input. Required by the Anthropic
     * spec; accepted as optional by SambaNova.
     */
    input_schema?: { [key: string]: unknown } | null;

    /**
     * Silently dropped.
     */
    strict?: boolean | null;

    /**
     * Tool-type discriminator. May be omitted (defaults to custom) or set to `custom`.
     * Other values return 400 `unsupported_tool_type`.
     */
    type?: 'custom' | null;
  }

  export namespace Tool {
    /**
     * Marks the preceding content block (or system text block) as a prompt- cache
     * breakpoint. Marker positions are collected by the adapter; their wiring into the
     * router's longest-prefix matching **In v1**: position is recorded; the `ttl`
     * value is ignored.
     */
    export interface CacheControl {
      /**
       * Cache breakpoint type. Only `ephemeral` is supported by Anthropic.
       */
      type: 'ephemeral';

      /**
       * Optional time-to-live hint (e.g. `"5m"`, `"1h"`). **Currently ignored** in v1
       */
      ttl?: string | null;
    }
  }
}

export declare namespace Messages {
  export {
    type Message as Message,
    type MessageCountTokensResponse as MessageCountTokensResponse,
    type MessageErrorResponse as MessageErrorResponse,
    type MessageStreamEvent as MessageStreamEvent,
    type MessageCreateResponse as MessageCreateResponse,
    type MessageCreateParams as MessageCreateParams,
    type MessageCreateParamsNonStreaming as MessageCreateParamsNonStreaming,
    type MessageCreateParamsStreaming as MessageCreateParamsStreaming,
    type MessageCountTokensParams as MessageCountTokensParams,
  };
}
