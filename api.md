# Chat

## Completions

Types:

- <code><a href="./src/resources/chat/completions.ts">ChatCompletionResponse</a></code>
- <code><a href="./src/resources/chat/completions.ts">ChatCompletionStreamResponse</a></code>
- <code><a href="./src/resources/chat/completions.ts">GeneralError</a></code>
- <code><a href="./src/resources/chat/completions.ts">ModelOutputError</a></code>
- <code><a href="./src/resources/chat/completions.ts">CompletionCreateResponse</a></code>

Methods:

- <code title="post /v1/chat/completions">client.chat.completions.<a href="./src/resources/chat/completions.ts">create</a>({ ...params }) -> CompletionCreateResponse</code>

# Embeddings

Types:

- <code><a href="./src/resources/embeddings.ts">EmbeddingsResponse</a></code>

Methods:

- <code title="post /v1/embeddings">client.embeddings.<a href="./src/resources/embeddings.ts">create</a>({ ...params }) -> EmbeddingsResponse</code>

# Audio

## Transcriptions

Types:

- <code><a href="./src/resources/audio/transcriptions.ts">TranscriptionResponse</a></code>
- <code><a href="./src/resources/audio/transcriptions.ts">TranscriptionStreamResponse</a></code>
- <code><a href="./src/resources/audio/transcriptions.ts">TranscriptionCreateResponse</a></code>

Methods:

- <code title="post /v1/audio/transcriptions">client.audio.transcriptions.<a href="./src/resources/audio/transcriptions.ts">create</a>({ ...params }) -> TranscriptionCreateResponse</code>

## Translations

Types:

- <code><a href="./src/resources/audio/translations.ts">TranslationResponse</a></code>
- <code><a href="./src/resources/audio/translations.ts">TranslationStreamResponse</a></code>
- <code><a href="./src/resources/audio/translations.ts">TranslationCreateResponse</a></code>

Methods:

- <code title="post /v1/audio/translations">client.audio.translations.<a href="./src/resources/audio/translations.ts">create</a>({ ...params }) -> TranslationCreateResponse</code>

# Models

Types:

- <code><a href="./src/resources/models.ts">ModelResponse</a></code>
- <code><a href="./src/resources/models.ts">ModelsResponse</a></code>

Methods:

- <code title="get /v1/models/{model_id}">client.models.<a href="./src/resources/models.ts">retrieve</a>(modelId) -> ModelResponse</code>
- <code title="get /v1/models">client.models.<a href="./src/resources/models.ts">list</a>() -> void</code>
