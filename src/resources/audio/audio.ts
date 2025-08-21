// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as TranscriptionsAPI from './transcriptions';
import {
  TranscriptionCreateParams,
  TranscriptionCreateParamsNonStreaming,
  TranscriptionCreateParamsStreaming,
  TranscriptionCreateResponse,
  TranscriptionResponse,
  TranscriptionStreamResponse,
  Transcriptions,
} from './transcriptions';
import * as TranslationsAPI from './translations';
import {
  TranslationCreateParams,
  TranslationCreateParamsNonStreaming,
  TranslationCreateParamsStreaming,
  TranslationCreateResponse,
  TranslationResponse,
  TranslationStreamResponse,
  Translations,
} from './translations';

export class Audio extends APIResource {
  transcriptions: TranscriptionsAPI.Transcriptions = new TranscriptionsAPI.Transcriptions(this._client);
  translations: TranslationsAPI.Translations = new TranslationsAPI.Translations(this._client);
}

Audio.Transcriptions = Transcriptions;
Audio.Translations = Translations;

export declare namespace Audio {
  export {
    Transcriptions as Transcriptions,
    type TranscriptionResponse as TranscriptionResponse,
    type TranscriptionStreamResponse as TranscriptionStreamResponse,
    type TranscriptionCreateResponse as TranscriptionCreateResponse,
    type TranscriptionCreateParams as TranscriptionCreateParams,
    type TranscriptionCreateParamsNonStreaming as TranscriptionCreateParamsNonStreaming,
    type TranscriptionCreateParamsStreaming as TranscriptionCreateParamsStreaming,
  };

  export {
    Translations as Translations,
    type TranslationResponse as TranslationResponse,
    type TranslationStreamResponse as TranslationStreamResponse,
    type TranslationCreateResponse as TranslationCreateResponse,
    type TranslationCreateParams as TranslationCreateParams,
    type TranslationCreateParamsNonStreaming as TranslationCreateParamsNonStreaming,
    type TranslationCreateParamsStreaming as TranslationCreateParamsStreaming,
  };
}
