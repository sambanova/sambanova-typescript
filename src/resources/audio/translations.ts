// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AudioAPI from './audio';
import { APIPromise } from '../../core/api-promise';
import { type Uploadable } from '../../core/uploads';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';

export class Translations extends APIResource {
  /**
   * Translate audio into English.
   *
   * @example
   * ```ts
   * const translationResponse =
   *   await client.audio.translations.create({
   *     file: fs.createReadStream('path/to/file'),
   *     model: 'Whisper-Large-v3',
   *   });
   * ```
   */
  create(body: TranslationCreateParams, options?: RequestOptions): APIPromise<TranslationResponse> {
    return this._client.post(
      '/audio/translations',
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

/**
 * Translation response json object
 */
export interface TranslationResponse {
  /**
   * audio file english text translation
   */
  text: string;

  /**
   * The duration of the input audio in seconds. Only returned with `response_format`
   * set to `verbose_json`.
   */
  duration?: number;

  /**
   * The language of the input audio. Only returned with `response_format` set to
   * `verbose_json`.
   */
  language?: string;

  /**
   * Segments of the transcribed text with their timings. Only returned with
   * `response_format` set to `verbose_json`.
   */
  segments?: Array<AudioAPI.TranscriptionSegment>;

  /**
   * The task performed. Only returned with `response_format` set to `verbose_json`.
   */
  task?: 'transcribe' | 'translate';

  [k: string]: unknown;
}

export interface TranslationCreateParams {
  /**
   * The audio file object to transcribe or translate, in one of these formats: FLAC,
   * MP3, MP4, MPEG, MPGA, M4A, Ogg, WAV, or WebM format. File size limit is 25MB.
   */
  file: Uploadable;

  /**
   * The model ID to use See available
   * [models](https://docs.sambanova.ai/docs/en/models/sambacloud-models)
   */
  model: (string & {}) | 'Whisper-Large-v3';

  /**
   * Optional language of the input audio. Supplying the input language in ISO-639-1
   * (e.g. en) format will improve accuracy and latency.
   */
  language?:
    | 'en'
    | 'zh'
    | 'de'
    | 'es'
    | 'ru'
    | 'ko'
    | 'fr'
    | 'ja'
    | 'pt'
    | 'tr'
    | 'pl'
    | 'ca'
    | 'nl'
    | 'ar'
    | 'sv'
    | 'it'
    | 'id'
    | 'hi'
    | 'fi'
    | 'vi'
    | 'he'
    | 'uk'
    | 'el'
    | 'ms'
    | 'cs'
    | 'ro'
    | 'da'
    | 'hu'
    | 'ta'
    | 'no'
    | 'th'
    | 'ur'
    | 'hr'
    | 'bg'
    | 'lt'
    | 'la'
    | 'mi'
    | 'ml'
    | 'cy'
    | 'sk'
    | 'te'
    | 'fa'
    | 'lv'
    | 'bn'
    | 'sr'
    | 'az'
    | 'sl'
    | 'kn'
    | 'et'
    | 'mk'
    | 'br'
    | 'eu'
    | 'is'
    | 'hy'
    | 'ne'
    | 'mn'
    | 'bs'
    | 'kk'
    | 'sq'
    | 'sw'
    | 'gl'
    | 'mr'
    | 'pa'
    | 'si'
    | 'km'
    | 'sn'
    | 'yo'
    | 'so'
    | 'af'
    | 'oc'
    | 'ka'
    | 'be'
    | 'tg'
    | 'sd'
    | 'gu'
    | 'am'
    | 'yi'
    | 'lo'
    | 'uz'
    | 'fo'
    | 'ht'
    | 'ps'
    | 'tk'
    | 'nn'
    | 'mt'
    | 'sa'
    | 'lb'
    | 'my'
    | 'bo'
    | 'tl'
    | 'mg'
    | 'as'
    | 'tt'
    | 'haw'
    | 'ln'
    | 'ha'
    | 'ba'
    | 'jw'
    | 'su'
    | 'yue'
    | null;

  /**
   * Optional text prompt provided to influence transcription Translation style or
   * vocabulary. Example: “Please transcribe carefully, including pauses and
   * hesitations.”
   */
  prompt?: string | null;

  /**
   * The format of the output. `json` and `verbose_json` return a JSON object
   * (`verbose_json` adds `task`, `language`, `duration` and `segments`); `text`,
   * `srt` and `vtt` return plain text.
   */
  response_format?: 'json' | 'text' | 'verbose_json' | 'srt' | 'vtt';

  /**
   * The timestamp granularities to populate. Requires `response_format` set to
   * `verbose_json`. Only `segment` is supported; segment timings are approximate
   * within each 30-second audio chunk.
   */
  timestamp_granularities?: Array<'segment'>;
}

export declare namespace Translations {
  export {
    type TranslationResponse as TranslationResponse,
    type TranslationCreateParams as TranslationCreateParams,
  };
}
