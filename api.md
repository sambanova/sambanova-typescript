# Chat

## Completions

Types:

- <code><a href="./src/resources/chat/completions.ts">ChatCompletionResponse</a></code>
- <code><a href="./src/resources/chat/completions.ts">ChatCompletionStreamResponse</a></code>
- <code><a href="./src/resources/chat/completions.ts">GeneralError</a></code>
- <code><a href="./src/resources/chat/completions.ts">ModelOutputError</a></code>
- <code><a href="./src/resources/chat/completions.ts">CompletionCreateResponse</a></code>

Methods:

- <code title="post /chat/completions">client.chat.completions.<a href="./src/resources/chat/completions.ts">create</a>({ ...params }) -> CompletionCreateResponse</code>

# Completions

Types:

- <code><a href="./src/resources/completions.ts">CompletionResponse</a></code>
- <code><a href="./src/resources/completions.ts">CompletionStreamResponse</a></code>
- <code><a href="./src/resources/completions.ts">CompletionCreateResponse</a></code>

Methods:

- <code title="post /completions">client.completions.<a href="./src/resources/completions.ts">create</a>({ ...params }) -> CompletionCreateResponse</code>

# Embeddings

Types:

- <code><a href="./src/resources/embeddings.ts">EmbeddingsResponse</a></code>

Methods:

- <code title="post /embeddings">client.embeddings.<a href="./src/resources/embeddings.ts">create</a>({ ...params }) -> EmbeddingsResponse</code>

# Audio

## Transcriptions

Types:

- <code><a href="./src/resources/audio/transcriptions.ts">TranscriptionResponse</a></code>
- <code><a href="./src/resources/audio/transcriptions.ts">TranscriptionStreamResponse</a></code>
- <code><a href="./src/resources/audio/transcriptions.ts">TranscriptionCreateResponse</a></code>

Methods:

- <code title="post /audio/transcriptions">client.audio.transcriptions.<a href="./src/resources/audio/transcriptions.ts">create</a>({ ...params }) -> TranscriptionCreateResponse</code>

## Translations

Types:

- <code><a href="./src/resources/audio/translations.ts">TranslationResponse</a></code>
- <code><a href="./src/resources/audio/translations.ts">TranslationStreamResponse</a></code>
- <code><a href="./src/resources/audio/translations.ts">TranslationCreateResponse</a></code>

Methods:

- <code title="post /audio/translations">client.audio.translations.<a href="./src/resources/audio/translations.ts">create</a>({ ...params }) -> TranslationCreateResponse</code>

# Models

Types:

- <code><a href="./src/resources/models.ts">ModelResponse</a></code>
- <code><a href="./src/resources/models.ts">ModelsResponse</a></code>

Methods:

- <code title="get /models/{model_id}">client.models.<a href="./src/resources/models.ts">retrieve</a>(modelID) -> ModelResponse</code>
- <code title="get /models">client.models.<a href="./src/resources/models.ts">list</a>() -> ModelsResponse</code>
