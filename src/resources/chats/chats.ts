// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as CompletionsAPI from './completions';
import { CompletionCreateParams, CompletionCreateResponse, Completions } from './completions';

export class Chats extends APIResource {
  completions: CompletionsAPI.Completions = new CompletionsAPI.Completions(this._client);
}

Chats.Completions = Completions;

export declare namespace Chats {
  export {
    Completions as Completions,
    type CompletionCreateResponse as CompletionCreateResponse,
    type CompletionCreateParams as CompletionCreateParams,
  };
}
