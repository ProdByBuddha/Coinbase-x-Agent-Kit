URL: https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek
---
[Skip to main content](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#main-content)

Back to top`Ctrl` + `K`

[Docs](https://python.langchain.com/)

LightDarkSystem Settings

- [GitHub](https://github.com/langchain-ai/langchain)
- [X / Twitter](https://twitter.com/langchainai)

# ChatDeepSeek [\#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html\#chatdeepseek "Link to this heading")

_class_ langchain\_deepseek.chat\_models.ChatDeepSeek [\[source\]](https://python.langchain.com/api_reference/_modules/langchain_deepseek/chat_models.html#ChatDeepSeek) [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek "Link to this definition")

Bases: [`BaseChatOpenAI`](https://python.langchain.com/api_reference/openai/chat_models/langchain_openai.chat_models.base.BaseChatOpenAI.html#langchain_openai.chat_models.base.BaseChatOpenAI "langchain_openai.chat_models.base.BaseChatOpenAI")

DeepSeek chat model integration to access models hosted in DeepSeek’s API.

Setup:

Install `langchain-deepseek-official` and set environment variable `DEEPSEEK_API_KEY`.

```
pip install -U langchain-deepseek-official
export DEEPSEEK_API_KEY="your-api-key"

```

Copy to clipboard

Key init args — completion params:model: str

Name of DeepSeek model to use, e.g. “deepseek-chat”.

temperature: float

Sampling temperature.

max\_tokens: Optional\[int\]

Max number of tokens to generate.

Key init args — client params:timeout: Optional\[float\]

Timeout for requests.

max\_retries: int

Max number of retries.

api\_key: Optional\[str\]

DeepSeek API key. If not passed in will be read from env var DEEPSEEK\_API\_KEY.

See full list of supported init args and their descriptions in the params section.

Instantiate:

```
from langchain_deepseek import ChatDeepSeek

llm = ChatDeepSeek(
    model="...",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    # api_key="...",
    # other params...
)

```

Copy to clipboard

Invoke:

```
messages = [\
    ("system", "You are a helpful translator. Translate the user sentence to French."),\
    ("human", "I love programming."),\
]
llm.invoke(messages)

```

Copy to clipboard

Stream:

```
for chunk in llm.stream(messages):
    print(chunk)

```

Copy to clipboard

```
stream = llm.stream(messages)
full = next(stream)
for chunk in stream:
    full += chunk
full

```

Copy to clipboard

Async:

```
await llm.ainvoke(messages)

# stream:
# async for chunk in (await llm.astream(messages))

# batch:
# await llm.abatch([messages])

```

Copy to clipboard

Tool calling:

```
from pydantic import BaseModel, Field

class GetWeather(BaseModel):
    '''Get the current weather in a given location'''

    location: str = Field(..., description="The city and state, e.g. San Francisco, CA")

class GetPopulation(BaseModel):
    '''Get the current population in a given location'''

    location: str = Field(..., description="The city and state, e.g. San Francisco, CA")

llm_with_tools = llm.bind_tools([GetWeather, GetPopulation])
ai_msg = llm_with_tools.invoke("Which city is hotter today and which is bigger: LA or NY?")
ai_msg.tool_calls

```

Copy to clipboard

See `ChatDeepSeek.bind_tools()` method for more.

Structured output:

```
from typing import Optional

from pydantic import BaseModel, Field

class Joke(BaseModel):
    '''Joke to tell user.'''

    setup: str = Field(description="The setup of the joke")
    punchline: str = Field(description="The punchline to the joke")
    rating: Optional[int] = Field(description="How funny the joke is, from 1 to 10")

structured_llm = llm.with_structured_output(Joke)
structured_llm.invoke("Tell me a joke about cats")

```

Copy to clipboard

See `ChatDeepSeek.with_structured_output()` for more.

Token usage:

```
ai_msg = llm.invoke(messages)
ai_msg.usage_metadata

```

Copy to clipboard

```
{'input_tokens': 28, 'output_tokens': 5, 'total_tokens': 33}

```

Copy to clipboard

Response metadata

```
ai_msg = llm.invoke(messages)
ai_msg.response_metadata

```

Copy to clipboard

Note

ChatDeepSeek implements the standard [`Runnable Interface`](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable"). 🏃

The [`Runnable Interface`](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable") has additional methods that are available on runnables, such as [`with_types`](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable.with_types "langchain_core.runnables.base.Runnable.with_types"), [`with_retry`](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable.with_retry "langchain_core.runnables.base.Runnable.with_retry"), [`assign`](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable.assign "langchain_core.runnables.base.Runnable.assign"), [`bind`](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable.bind "langchain_core.runnables.base.Runnable.bind"), [`get_graph`](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable.get_graph "langchain_core.runnables.base.Runnable.get_graph"), and more.

_param_ api\_base _:str_ _\[Optional\]_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.api_base "Link to this definition")

DeepSeek API base URL

_param_ api\_key _:SecretStr\|None_ _\[Optional\]_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.api_key "Link to this definition")

DeepSeek API key

_param_ cache _: [BaseCache](https://python.langchain.com/api_reference/core/caches/langchain_core.caches.BaseCache.html#langchain_core.caches.BaseCache "langchain_core.caches.BaseCache") \|bool\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.cache "Link to this definition")

Whether to cache the response.

- If true, will use the global cache.

- If false, will not use a cache

- If None, will use the global cache if it’s set, otherwise no cache.

- If instance of BaseCache, will use the provided cache.


Caching is not currently supported for streaming methods of models.

_param_ callback\_manager _: [BaseCallbackManager](https://python.langchain.com/api_reference/core/callbacks/langchain_core.callbacks.base.BaseCallbackManager.html#langchain_core.callbacks.base.BaseCallbackManager "langchain_core.callbacks.base.BaseCallbackManager") \|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.callback_manager "Link to this definition")

Deprecated since version 0.1.7: Use [`callbacks()`](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.callbacks "langchain_deepseek.chat_models.ChatDeepSeek.callbacks") instead. It will be removed in pydantic==1.0.

Callback manager to add to the run trace.

_param_ callbacks _:Callbacks_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.callbacks "Link to this definition")

Callbacks to add to the run trace.

_param_ custom\_get\_token\_ids _:Callable\[\[str\],list\[int\]\]\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.custom_get_token_ids "Link to this definition")

Optional encoder to use for counting tokens.

_param_ default\_headers _:Mapping\[str,str\]\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.default_headers "Link to this definition")_param_ default\_query _:Mapping\[str,object\]\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.default_query "Link to this definition")_param_ disable\_streaming _:bool\|Literal\['tool\_calling'\]_ _=False_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.disable_streaming "Link to this definition")

Whether to disable streaming for this model.

If streaming is bypassed, then `stream()/astream()` will defer to
`invoke()/ainvoke()`.

- If True, will always bypass streaming case.

- If “tool\_calling”, will bypass streaming case only when the model is called
with a `tools` keyword argument.

- If False (default), will always use streaming case if available.


_param_ disabled\_params _:Dict\[str,Any\]\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.disabled_params "Link to this definition")

Parameters of the OpenAI client or chat.completions endpoint that should be
disabled for the given model.

Should be specified as `{"param": None | ['val1', 'val2']}` where the key is the
parameter and the value is either None, meaning that parameter should never be
used, or it’s a list of disabled values for the parameter.

For example, older models may not support the ‘parallel\_tool\_calls’ parameter at
all, in which case `disabled_params={"parallel_tool_calls": None}` can ben passed
in.

If a parameter is disabled then it will not be used by default in any methods, e.g.
in [`with_structured_output()`](https://python.langchain.com/api_reference/openai/chat_models/langchain_openai.chat_models.base.ChatOpenAI.html#langchain_openai.chat_models.base.ChatOpenAI.with_structured_output "langchain_openai.chat_models.base.ChatOpenAI.with_structured_output").
However this does not prevent a user from directly passed in the parameter during
invocation.

_param_ extra\_body _:Mapping\[str,Any\]\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.extra_body "Link to this definition")

Optional additional JSON properties to include in the request parameters when
making requests to OpenAI compatible APIs, such as vLLM.

_param_ frequency\_penalty _:float\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.frequency_penalty "Link to this definition")

Penalizes repeated tokens according to frequency.

_param_ http\_async\_client _:Any\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.http_async_client "Link to this definition")

Optional httpx.AsyncClient. Only used for async invocations. Must specify
http\_client as well if you’d like a custom client for sync invocations.

_param_ http\_client _:Any\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.http_client "Link to this definition")

Optional httpx.Client. Only used for sync invocations. Must specify
http\_async\_client as well if you’d like a custom client for async invocations.

_param_ include\_response\_headers _:bool_ _=False_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.include_response_headers "Link to this definition")

Whether to include response headers in the output message response\_metadata.

_param_ logit\_bias _:Dict\[int,int\]\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.logit_bias "Link to this definition")

Modify the likelihood of specified tokens appearing in the completion.

_param_ logprobs _:bool\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.logprobs "Link to this definition")

Whether to return logprobs.

_param_ max\_retries _:int\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.max_retries "Link to this definition")

Maximum number of retries to make when generating.

_param_ max\_tokens _:int\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.max_tokens "Link to this definition")

Maximum number of tokens to generate.

_param_ metadata _:dict\[str,Any\]\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.metadata "Link to this definition")

Metadata to add to the run trace.

_param_ model\_kwargs _:Dict\[str,Any\]_ _\[Optional\]_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.model_kwargs "Link to this definition")

Holds any model parameters valid for create call not explicitly specified.

_param_ model\_name _:str_ _\[Required\]_ _(alias'model')_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.model_name "Link to this definition")

The name of the model

_param_ n _:int\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.n "Link to this definition")

Number of chat completions to generate for each prompt.

_param_ openai\_api\_base _:str\|None_ _=None_ _(alias'base\_url')_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.openai_api_base "Link to this definition")

Base URL path for API requests, leave blank if not using a proxy or service
emulator.

_param_ openai\_api\_key _:SecretStr\|None_ _\[Optional\]_ _(alias'api\_key')_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.openai_api_key "Link to this definition")_param_ openai\_organization _:str\|None_ _=None_ _(alias'organization')_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.openai_organization "Link to this definition")

Automatically inferred from env var OPENAI\_ORG\_ID if not provided.

_param_ openai\_proxy _:str\|None_ _\[Optional\]_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.openai_proxy "Link to this definition")_param_ presence\_penalty _:float\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.presence_penalty "Link to this definition")

Penalizes repeated tokens.

_param_ rate\_limiter _: [BaseRateLimiter](https://python.langchain.com/api_reference/core/rate_limiters/langchain_core.rate_limiters.BaseRateLimiter.html#langchain_core.rate_limiters.BaseRateLimiter "langchain_core.rate_limiters.BaseRateLimiter") \|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.rate_limiter "Link to this definition")

An optional rate limiter to use for limiting the number of requests.

_param_ reasoning\_effort _:str\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.reasoning_effort "Link to this definition")

Constrains effort on reasoning for reasoning models.

o1 models only.

Currently supported values are low, medium, and high. Reducing reasoning effort
can result in faster responses and fewer tokens used on reasoning in a response.

Added in version 0.2.14.

_param_ request\_timeout _:float\|Tuple\[float,float\]\|Any\|None_ _=None_ _(alias'timeout')_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.request_timeout "Link to this definition")

Timeout for requests to OpenAI completion API. Can be float, httpx.Timeout or
None.

_param_ seed _:int\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.seed "Link to this definition")

Seed for generation

_param_ stop _:List\[str\]\|str\|None_ _=None_ _(alias'stop\_sequences')_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.stop "Link to this definition")

Default stop sequences.

_param_ streaming _:bool_ _=False_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.streaming "Link to this definition")

Whether to stream the results or not.

_param_ tags _:list\[str\]\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.tags "Link to this definition")

Tags to add to the run trace.

_param_ temperature _:float\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.temperature "Link to this definition")

What sampling temperature to use.

_param_ tiktoken\_model\_name _:str\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.tiktoken_model_name "Link to this definition")

The model name to pass to tiktoken when using this class.
Tiktoken is used to count the number of tokens in documents to constrain
them to be under a certain limit. By default, when set to None, this will
be the same as the embedding model name. However, there are some cases
where you may want to use this Embedding class with a model name not
supported by tiktoken. This can include when using Azure embeddings or
when using one of the many model providers that expose an OpenAI-like
API but with different models. In those cases, in order to avoid erroring
when tiktoken is called, you can specify a model name to use here.

_param_ top\_logprobs _:int\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.top_logprobs "Link to this definition")

Number of most likely tokens to return at each token position, each with
an associated log probability. logprobs must be set to true
if this parameter is used.

_param_ top\_p _:float\|None_ _=None_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.top_p "Link to this definition")

Total probability mass of tokens to consider at each step.

_param_ verbose _:bool_ _\[Optional\]_ [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.verbose "Link to this definition")

Whether to print out response text.

\_\_call\_\_( _messages:list\[ [BaseMessage](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage")\]_, _stop:list\[str\]\|None=None_, _callbacks:list\[ [BaseCallbackHandler](https://python.langchain.com/api_reference/core/callbacks/langchain_core.callbacks.base.BaseCallbackHandler.html#langchain_core.callbacks.base.BaseCallbackHandler "langchain_core.callbacks.base.BaseCallbackHandler")\]\| [BaseCallbackManager](https://python.langchain.com/api_reference/core/callbacks/langchain_core.callbacks.base.BaseCallbackManager.html#langchain_core.callbacks.base.BaseCallbackManager "langchain_core.callbacks.base.BaseCallbackManager") \|None=None_, _\*\*kwargs:Any_)→[BaseMessage](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage") [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.__call__ "Link to this definition")

Deprecated since version 0.1.7: Use [`invoke()`](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.invoke "langchain_deepseek.chat_models.ChatDeepSeek.invoke") instead. It will not be removed until langchain-core==1.0.

Parameters:

- **messages** ( _list_ _\[_ [_BaseMessage_](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage") _\]_)

- **stop** ( _list_ _\[_ _str_ _\]_ _\|_ _None_)

- **callbacks** ( _list_ _\[_ [_BaseCallbackHandler_](https://python.langchain.com/api_reference/core/callbacks/langchain_core.callbacks.base.BaseCallbackHandler.html#langchain_core.callbacks.base.BaseCallbackHandler "langchain_core.callbacks.base.BaseCallbackHandler") _\]_ _\|_ [_BaseCallbackManager_](https://python.langchain.com/api_reference/core/callbacks/langchain_core.callbacks.base.BaseCallbackManager.html#langchain_core.callbacks.base.BaseCallbackManager "langchain_core.callbacks.base.BaseCallbackManager") _\|_ _None_)

- **kwargs** ( _Any_)


Return type:

[_BaseMessage_](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage")

_async_ abatch( _inputs:list\[Input\]_, _config:[RunnableConfig](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") \|list\[ [RunnableConfig](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig")\]\|None=None_, _\*_, _return\_exceptions:bool=False_, _\*\*kwargs:Any\|None_)→list\[Output\] [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.abatch "Link to this definition")

Default implementation runs ainvoke in parallel using asyncio.gather.

The default implementation of batch works well for IO bound runnables.

Subclasses should override this method if they can batch more efficiently;
e.g., if the underlying Runnable uses an API which supports a batch mode.

Parameters:

- **inputs** ( _list_ _\[_ _Input_ _\]_) – A list of inputs to the Runnable.

- **config** ( [_RunnableConfig_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") _\|_ _list_ _\[_ [_RunnableConfig_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") _\]_ _\|_ _None_) – A config to use when invoking the Runnable.
The config supports standard keys like ‘tags’, ‘metadata’ for tracing
purposes, ‘max\_concurrency’ for controlling how much work to do
in parallel, and other keys. Please refer to the RunnableConfig
for more details. Defaults to None.

- **return\_exceptions** ( _bool_) – Whether to return exceptions instead of raising them.
Defaults to False.

- **kwargs** ( _Any_ _\|_ _None_) – Additional keyword arguments to pass to the Runnable.


Returns:

A list of outputs from the Runnable.

Return type:

list\[ _Output_\]

_async_ abatch\_as\_completed( _inputs:Sequence\[Input\]_, _config:[RunnableConfig](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") \|Sequence\[ [RunnableConfig](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig")\]\|None=None_, _\*_, _return\_exceptions:bool=False_, _\*\*kwargs:Any\|None_)→AsyncIterator\[tuple\[int,Output\|Exception\]\] [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.abatch_as_completed "Link to this definition")

Run ainvoke in parallel on a list of inputs,
yielding results as they complete.

Parameters:

- **inputs** ( _Sequence_ _\[_ _Input_ _\]_) – A list of inputs to the Runnable.

- **config** ( [_RunnableConfig_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") _\|_ _Sequence_ _\[_ [_RunnableConfig_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") _\]_ _\|_ _None_) – A config to use when invoking the Runnable.
The config supports standard keys like ‘tags’, ‘metadata’ for tracing
purposes, ‘max\_concurrency’ for controlling how much work to do
in parallel, and other keys. Please refer to the RunnableConfig
for more details. Defaults to None. Defaults to None.

- **return\_exceptions** ( _bool_) – Whether to return exceptions instead of raising them.
Defaults to False.

- **kwargs** ( _Any_ _\|_ _None_) – Additional keyword arguments to pass to the Runnable.


Yields:

A tuple of the index of the input and the output from the Runnable.

Return type:

_AsyncIterator_\[tuple\[int, _Output_ \| Exception\]\]

_async_ ainvoke( _input:LanguageModelInput_, _config:[RunnableConfig](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") \|None=None_, _\*_, _stop:list\[str\]\|None=None_, _\*\*kwargs:Any_)→[BaseMessage](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage") [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.ainvoke "Link to this definition")

Default implementation of ainvoke, calls invoke from a thread.

The default implementation allows usage of async code even if
the Runnable did not implement a native async version of invoke.

Subclasses should override this method if they can run asynchronously.

Parameters:

- **input** ( _LanguageModelInput_)

- **config** ( _Optional_ _\[_ [_RunnableConfig_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") _\]_)

- **stop** ( _Optional_ _\[_ _list_ _\[_ _str_ _\]_ _\]_)

- **kwargs** ( _Any_)


Return type:

[BaseMessage](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage")

_async_ astream( _input:LanguageModelInput_, _config:[RunnableConfig](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") \|None=None_, _\*_, _stop:list\[str\]\|None=None_, _\*\*kwargs:Any_)→AsyncIterator\[ [BaseMessageChunk](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessageChunk.html#langchain_core.messages.base.BaseMessageChunk "langchain_core.messages.base.BaseMessageChunk")\] [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.astream "Link to this definition")

Default implementation of astream, which calls ainvoke.
Subclasses should override this method if they support streaming output.

Parameters:

- **input** ( _LanguageModelInput_) – The input to the Runnable.

- **config** ( _Optional_ _\[_ [_RunnableConfig_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") _\]_) – The config to use for the Runnable. Defaults to None.

- **kwargs** ( _Any_) – Additional keyword arguments to pass to the Runnable.

- **stop** ( _Optional_ _\[_ _list_ _\[_ _str_ _\]_ _\]_)


Yields:

The output of the Runnable.

Return type:

AsyncIterator\[ [BaseMessageChunk](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessageChunk.html#langchain_core.messages.base.BaseMessageChunk "langchain_core.messages.base.BaseMessageChunk")\]

_async_ astream\_events( _input:Any_, _config:[RunnableConfig](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") \|None=None_, _\*_, _version:Literal\['v1','v2'\]_, _include\_names:Sequence\[str\]\|None=None_, _include\_types:Sequence\[str\]\|None=None_, _include\_tags:Sequence\[str\]\|None=None_, _exclude\_names:Sequence\[str\]\|None=None_, _exclude\_types:Sequence\[str\]\|None=None_, _exclude\_tags:Sequence\[str\]\|None=None_, _\*\*kwargs:Any_)→AsyncIterator\[ [StandardStreamEvent](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.schema.StandardStreamEvent.html#langchain_core.runnables.schema.StandardStreamEvent "langchain_core.runnables.schema.StandardStreamEvent") \| [CustomStreamEvent](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.schema.CustomStreamEvent.html#langchain_core.runnables.schema.CustomStreamEvent "langchain_core.runnables.schema.CustomStreamEvent")\] [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.astream_events "Link to this definition")

Generate a stream of events.

Use to create an iterator over StreamEvents that provide real-time information
about the progress of the Runnable, including StreamEvents from intermediate
results.

A StreamEvent is a dictionary with the following schema:

- `event`: **str** \- Event names are of the

format: on\_\[runnable\_type\]\_(start\|stream\|end).

- `name`: **str** \- The name of the Runnable that generated the event.

- `run_id`: **str** \- randomly generated ID associated with the given execution of

the Runnable that emitted the event.
A child Runnable that gets invoked as part of the execution of a
parent Runnable is assigned its own unique ID.

- `parent_ids`: **List\[str\]** \- The IDs of the parent runnables that

generated the event. The root Runnable will have an empty list.
The order of the parent IDs is from the root to the immediate parent.
Only available for v2 version of the API. The v1 version of the API
will return an empty list.

- `tags`: **Optional\[List\[str\]\]** \- The tags of the Runnable that generated

the event.

- `metadata`: **Optional\[Dict\[str, Any\]\]** \- The metadata of the Runnable

that generated the event.

- `data`: **Dict\[str, Any\]**


Below is a table that illustrates some events that might be emitted by various
chains. Metadata fields have been omitted from the table for brevity.
Chain definitions have been included after the table.

**ATTENTION** This reference table is for the V2 version of the schema.

| event | name | chunk | input | output |
| --- | --- | --- | --- | --- |
| on\_chat\_model\_start | \[model name\] |  | {“messages”: \[\[SystemMessage, HumanMessage\]\]} |  |
| on\_chat\_model\_stream | \[model name\] | AIMessageChunk(content=”hello”) |  |  |
| on\_chat\_model\_end | \[model name\] |  | {“messages”: \[\[SystemMessage, HumanMessage\]\]} | AIMessageChunk(content=”hello world”) |
| on\_llm\_start | \[model name\] |  | {‘input’: ‘hello’} |  |
| on\_llm\_stream | \[model name\] | ‘Hello’ |  |  |
| on\_llm\_end | \[model name\] |  | ‘Hello human!’ |  |
| on\_chain\_start | format\_docs |  |  |  |
| on\_chain\_stream | format\_docs | “hello world!, goodbye world!” |  |  |
| on\_chain\_end | format\_docs |  | \[Document(…)\] | “hello world!, goodbye world!” |
| on\_tool\_start | some\_tool |  | {“x”: 1, “y”: “2”} |  |
| on\_tool\_end | some\_tool |  |  | {“x”: 1, “y”: “2”} |
| on\_retriever\_start | \[retriever name\] |  | {“query”: “hello”} |  |
| on\_retriever\_end | \[retriever name\] |  | {“query”: “hello”} | \[Document(…), ..\] |
| on\_prompt\_start | \[template\_name\] |  | {“question”: “hello”} |  |
| on\_prompt\_end | \[template\_name\] |  | {“question”: “hello”} | ChatPromptValue(messages: \[SystemMessage, …\]) |

In addition to the standard events, users can also dispatch custom events (see example below).

Custom events will be only be surfaced with in the v2 version of the API!

A custom event has following format:

| Attribute | Type | Description |
| --- | --- | --- |
| name | str | A user defined name for the event. |
| data | Any | The data associated with the event. This can be anything, though we suggest making it JSON serializable. |

Here are declarations associated with the standard events shown above:

format\_docs:

```
def format_docs(docs: List[Document]) -> str:
    '''Format the docs.'''
    return ", ".join([doc.page_content for doc in docs])

format_docs = RunnableLambda(format_docs)

```

Copy to clipboard

some\_tool:

```
@tool
def some_tool(x: int, y: str) -> dict:
    '''Some_tool.'''
    return {"x": x, "y": y}

```

Copy to clipboard

prompt:

```
template = ChatPromptTemplate.from_messages(
    [("system", "You are Cat Agent 007"), ("human", "{question}")]
).with_config({"run_name": "my_template", "tags": ["my_template"]})

```

Copy to clipboard

Example:

```
from langchain_core.runnables import RunnableLambda

async def reverse(s: str) -> str:
    return s[::-1]

chain = RunnableLambda(func=reverse)

events = [\
    event async for event in chain.astream_events("hello", version="v2")\
]

# will produce the following events (run_id, and parent_ids
# has been omitted for brevity):
[\
    {\
        "data": {"input": "hello"},\
        "event": "on_chain_start",\
        "metadata": {},\
        "name": "reverse",\
        "tags": [],\
    },\
    {\
        "data": {"chunk": "olleh"},\
        "event": "on_chain_stream",\
        "metadata": {},\
        "name": "reverse",\
        "tags": [],\
    },\
    {\
        "data": {"output": "olleh"},\
        "event": "on_chain_end",\
        "metadata": {},\
        "name": "reverse",\
        "tags": [],\
    },\
]

```

Copy to clipboard

Example: Dispatch Custom Event

```
from langchain_core.callbacks.manager import (
    adispatch_custom_event,
)
from langchain_core.runnables import RunnableLambda, RunnableConfig
import asyncio

async def slow_thing(some_input: str, config: RunnableConfig) -> str:
    """Do something that takes a long time."""
    await asyncio.sleep(1) # Placeholder for some slow operation
    await adispatch_custom_event(
        "progress_event",
        {"message": "Finished step 1 of 3"},
        config=config # Must be included for python < 3.10
    )
    await asyncio.sleep(1) # Placeholder for some slow operation
    await adispatch_custom_event(
        "progress_event",
        {"message": "Finished step 2 of 3"},
        config=config # Must be included for python < 3.10
    )
    await asyncio.sleep(1) # Placeholder for some slow operation
    return "Done"

slow_thing = RunnableLambda(slow_thing)

async for event in slow_thing.astream_events("some_input", version="v2"):
    print(event)

```

Copy to clipboard

Parameters:

- **input** ( _Any_) – The input to the Runnable.

- **config** ( [_RunnableConfig_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") _\|_ _None_) – The config to use for the Runnable.

- **version** ( _Literal_ _\[_ _'v1'_ _,_ _'v2'_ _\]_) – The version of the schema to use either v2 or v1.
Users should use v2.
v1 is for backwards compatibility and will be deprecated
in 0.4.0.
No default will be assigned until the API is stabilized.
custom events will only be surfaced in v2.

- **include\_names** ( _Sequence_ _\[_ _str_ _\]_ _\|_ _None_) – Only include events from runnables with matching names.

- **include\_types** ( _Sequence_ _\[_ _str_ _\]_ _\|_ _None_) – Only include events from runnables with matching types.

- **include\_tags** ( _Sequence_ _\[_ _str_ _\]_ _\|_ _None_) – Only include events from runnables with matching tags.

- **exclude\_names** ( _Sequence_ _\[_ _str_ _\]_ _\|_ _None_) – Exclude events from runnables with matching names.

- **exclude\_types** ( _Sequence_ _\[_ _str_ _\]_ _\|_ _None_) – Exclude events from runnables with matching types.

- **exclude\_tags** ( _Sequence_ _\[_ _str_ _\]_ _\|_ _None_) – Exclude events from runnables with matching tags.

- **kwargs** ( _Any_) – Additional keyword arguments to pass to the Runnable.
These will be passed to astream\_log as this implementation
of astream\_events is built on top of astream\_log.


Yields:

An async stream of StreamEvents.

Raises:

**NotImplementedError** – If the version is not v1 or v2.

Return type:

_AsyncIterator_\[ [_StandardStreamEvent_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.schema.StandardStreamEvent.html#langchain_core.runnables.schema.StandardStreamEvent "langchain_core.runnables.schema.StandardStreamEvent") \| [_CustomStreamEvent_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.schema.CustomStreamEvent.html#langchain_core.runnables.schema.CustomStreamEvent "langchain_core.runnables.schema.CustomStreamEvent")\]

batch( _inputs:list\[Input\]_, _config:[RunnableConfig](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") \|list\[ [RunnableConfig](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig")\]\|None=None_, _\*_, _return\_exceptions:bool=False_, _\*\*kwargs:Any\|None_)→list\[Output\] [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.batch "Link to this definition")

Default implementation runs invoke in parallel using a thread pool executor.

The default implementation of batch works well for IO bound runnables.

Subclasses should override this method if they can batch more efficiently;
e.g., if the underlying Runnable uses an API which supports a batch mode.

Parameters:

- **inputs** ( _list_ _\[_ _Input_ _\]_)

- **config** ( [_RunnableConfig_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") _\|_ _list_ _\[_ [_RunnableConfig_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") _\]_ _\|_ _None_)

- **return\_exceptions** ( _bool_)

- **kwargs** ( _Any_ _\|_ _None_)


Return type:

list\[ _Output_\]

batch\_as\_completed( _inputs:Sequence\[Input\]_, _config:[RunnableConfig](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") \|Sequence\[ [RunnableConfig](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig")\]\|None=None_, _\*_, _return\_exceptions:bool=False_, _\*\*kwargs:Any\|None_)→Iterator\[tuple\[int,Output\|Exception\]\] [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.batch_as_completed "Link to this definition")

Run invoke in parallel on a list of inputs,
yielding results as they complete.

Parameters:

- **inputs** ( _Sequence_ _\[_ _Input_ _\]_)

- **config** ( [_RunnableConfig_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") _\|_ _Sequence_ _\[_ [_RunnableConfig_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") _\]_ _\|_ _None_)

- **return\_exceptions** ( _bool_)

- **kwargs** ( _Any_ _\|_ _None_)


Return type:

_Iterator_\[tuple\[int, _Output_ \| Exception\]\]

bind( _\*\*kwargs:Any_)→[Runnable](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[Input,Output\] [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.bind "Link to this definition")

Bind arguments to a Runnable, returning a new Runnable.

Useful when a Runnable in a chain requires an argument that is not
in the output of the previous Runnable or included in the user input.

Parameters:

**kwargs** ( _Any_) – The arguments to bind to the Runnable.

Returns:

A new Runnable with the arguments bound.

Return type:

[_Runnable_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[ _Input_, _Output_\]

Example:

```
from langchain_community.chat_models import ChatOllama
from langchain_core.output_parsers import StrOutputParser

llm = ChatOllama(model='llama2')

# Without bind.
chain = (
    llm
    | StrOutputParser()
)

chain.invoke("Repeat quoted words exactly: 'One two three four five.'")
# Output is 'One two three four five.'

# With bind.
chain = (
    llm.bind(stop=["three"])
    | StrOutputParser()
)

chain.invoke("Repeat quoted words exactly: 'One two three four five.'")
# Output is 'One two'

```

Copy to clipboard

bind\_functions( _functions:Sequence\[Dict\[str,Any\]\|Type\[BaseModel\]\|Callable\| [BaseTool](https://python.langchain.com/api_reference/core/tools/langchain_core.tools.base.BaseTool.html#langchain_core.tools.base.BaseTool "langchain_core.tools.base.BaseTool")\]_, _function\_call:\_FunctionCall\|str\|Literal\['auto','none'\]\|None=None_, _\*\*kwargs:Any_)→[Runnable](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[ [PromptValue](https://python.langchain.com/api_reference/core/prompt_values/langchain_core.prompt_values.PromptValue.html#langchain_core.prompt_values.PromptValue "langchain_core.prompt_values.PromptValue") \|str\|Sequence\[ [BaseMessage](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage") \|list\[str\]\|tuple\[str,str\]\|str\|dict\[str,Any\]\], [BaseMessage](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage")\] [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.bind_functions "Link to this definition")

Deprecated since version 0.2.1: Use [`bind_tools()`](https://python.langchain.com/api_reference/openai/chat_models/langchain_openai.chat_models.base.ChatOpenAI.html#langchain_openai.chat_models.base.ChatOpenAI.bind_tools "langchain_openai.chat_models.base.ChatOpenAI.bind_tools") instead. It will not be removed until langchain-openai==1.0.0.

Bind functions (and other objects) to this chat model.

Assumes model is compatible with OpenAI function-calling API.

NOTE: Using bind\_tools is recommended instead, as the functions and

function\_call request parameters are officially marked as deprecated by
OpenAI.

Parameters:

- **functions** ( _Sequence_ _\[_ _Dict_ _\[_ _str_ _,_ _Any_ _\]_ _\|_ _Type_ _\[_ _BaseModel_ _\]_ _\|_ _Callable_ _\|_ [_BaseTool_](https://python.langchain.com/api_reference/core/tools/langchain_core.tools.base.BaseTool.html#langchain_core.tools.base.BaseTool "langchain_core.tools.base.BaseTool") _\]_) – A list of function definitions to bind to this chat model.
Can be a dictionary, pydantic model, or callable. Pydantic
models and callables will be automatically converted to
their schema dictionary representation.

- **function\_call** ( _\_FunctionCall_ _\|_ _str_ _\|_ _Literal_ _\[_ _'auto'_ _,_ _'none'_ _\]_ _\|_ _None_) – Which function to require the model to call.
Must be the name of the single provided function or
“auto” to automatically determine which function to call
(if any).

- **\*\*kwargs** ( _Any_) – Any additional parameters to pass to the
`Runnable` constructor.


Return type:

[_Runnable_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[ [_PromptValue_](https://python.langchain.com/api_reference/core/prompt_values/langchain_core.prompt_values.PromptValue.html#langchain_core.prompt_values.PromptValue "langchain_core.prompt_values.PromptValue") \| str \| _Sequence_\[ [_BaseMessage_](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage") \| list\[str\] \| tuple\[str, str\] \| str \| dict\[str, _Any_\]\], [_BaseMessage_](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage")\]

bind\_tools( _tools:Sequence\[Dict\[str,Any\]\|Type\|Callable\| [BaseTool](https://python.langchain.com/api_reference/core/tools/langchain_core.tools.base.BaseTool.html#langchain_core.tools.base.BaseTool "langchain_core.tools.base.BaseTool")\]_, _\*_, _tool\_choice:dict\|str\|Literal\['auto','none','required','any'\]\|bool\|None=None_, _strict:bool\|None=None_, _\*\*kwargs:Any_)→[Runnable](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[ [PromptValue](https://python.langchain.com/api_reference/core/prompt_values/langchain_core.prompt_values.PromptValue.html#langchain_core.prompt_values.PromptValue "langchain_core.prompt_values.PromptValue") \|str\|Sequence\[ [BaseMessage](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage") \|list\[str\]\|tuple\[str,str\]\|str\|dict\[str,Any\]\], [BaseMessage](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage")\] [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.bind_tools "Link to this definition")

Bind tool-like objects to this chat model.

Assumes model is compatible with OpenAI tool-calling API.

Parameters:

- **tools** ( _Sequence_ _\[_ _Dict_ _\[_ _str_ _,_ _Any_ _\]_ _\|_ _Type_ _\|_ _Callable_ _\|_ [_BaseTool_](https://python.langchain.com/api_reference/core/tools/langchain_core.tools.base.BaseTool.html#langchain_core.tools.base.BaseTool "langchain_core.tools.base.BaseTool") _\]_) – A list of tool definitions to bind to this chat model.
Supports any tool definition handled by
[`langchain_core.utils.function_calling.convert_to_openai_tool()`](https://python.langchain.com/api_reference/core/utils/langchain_core.utils.function_calling.convert_to_openai_tool.html#langchain_core.utils.function_calling.convert_to_openai_tool "langchain_core.utils.function_calling.convert_to_openai_tool").

- **tool\_choice** ( _dict_ _\|_ _str_ _\|_ _Literal_ _\[_ _'auto'_ _,_ _'none'_ _,_ _'required'_ _,_ _'any'_ _\]_ _\|_ _bool_ _\|_ _None_) –

Which tool to require the model to call. Options are:


  - str of the form `"<<tool_name>>"`: calls <<tool\_name>> tool.

  - `"auto"`: automatically selects a tool (including no tool).

  - `"none"`: does not call a tool.

  - `"any"` or `"required"` or `True`: force at least one tool to be called.

  - dict of the form `{"type": "function", "function": {"name": <<tool_name>>}}`: calls <<tool\_name>> tool.

  - `False` or `None`: no effect, default OpenAI behavior.


- **strict** ( _bool_ _\|_ _None_) – If True, model output is guaranteed to exactly match the JSON Schema
provided in the tool definition. If True, the input schema will be
validated according to
[https://platform.openai.com/docs/guides/structured-outputs/supported-schemas](https://platform.openai.com/docs/guides/structured-outputs/supported-schemas).
If False, input schema will not be validated and model output will not
be validated.
If None, `strict` argument will not be passed to the model.

- **kwargs** ( _Any_) – Any additional parameters are passed directly to
[`bind()`](https://python.langchain.com/api_reference/openai/chat_models/langchain_openai.chat_models.base.ChatOpenAI.html#langchain_openai.chat_models.base.ChatOpenAI.bind "langchain_openai.chat_models.base.ChatOpenAI.bind").


Return type:

[_Runnable_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[ [_PromptValue_](https://python.langchain.com/api_reference/core/prompt_values/langchain_core.prompt_values.PromptValue.html#langchain_core.prompt_values.PromptValue "langchain_core.prompt_values.PromptValue") \| str \| _Sequence_\[ [_BaseMessage_](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage") \| list\[str\] \| tuple\[str, str\] \| str \| dict\[str, _Any_\]\], [_BaseMessage_](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage")\]

Changed in version 0.1.21: Support for `strict` argument added.

configurable\_alternatives( _which:[ConfigurableField](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.utils.ConfigurableField.html#langchain_core.runnables.utils.ConfigurableField "langchain_core.runnables.utils.ConfigurableField")_, _\*_, _default\_key:str='default'_, _prefix\_keys:bool=False_, _\*\*kwargs:[Runnable](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[Input,Output\]\|Callable\[\[\], [Runnable](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[Input,Output\]\]_)→[RunnableSerializable](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.RunnableSerializable.html#langchain_core.runnables.base.RunnableSerializable "langchain_core.runnables.base.RunnableSerializable") [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.configurable_alternatives "Link to this definition")

Configure alternatives for Runnables that can be set at runtime.

Parameters:

- **which** ( [_ConfigurableField_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.utils.ConfigurableField.html#langchain_core.runnables.utils.ConfigurableField "langchain_core.runnables.utils.ConfigurableField")) – The ConfigurableField instance that will be used to select the
alternative.

- **default\_key** ( _str_) – The default key to use if no alternative is selected.
Defaults to “default”.

- **prefix\_keys** ( _bool_) – Whether to prefix the keys with the ConfigurableField id.
Defaults to False.

- **\*\*kwargs** ( [_Runnable_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable") _\[_ _Input_ _,_ _Output_ _\]_ _\|_ _Callable_ _\[_ _\[_ _\]_ _,_ [_Runnable_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable") _\[_ _Input_ _,_ _Output_ _\]_ _\]_) – A dictionary of keys to Runnable instances or callables that
return Runnable instances.


Returns:

A new Runnable with the alternatives configured.

Return type:

[_RunnableSerializable_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.RunnableSerializable.html#langchain_core.runnables.base.RunnableSerializable "langchain_core.runnables.base.RunnableSerializable")

```
from langchain_anthropic import ChatAnthropic
from langchain_core.runnables.utils import ConfigurableField
from langchain_openai import ChatOpenAI

model = ChatAnthropic(
    model_name="claude-3-sonnet-20240229"
).configurable_alternatives(
    ConfigurableField(id="llm"),
    default_key="anthropic",
    openai=ChatOpenAI()
)

# uses the default model ChatAnthropic
print(model.invoke("which organization created you?").content)

# uses ChatOpenAI
print(
    model.with_config(
        configurable={"llm": "openai"}
    ).invoke("which organization created you?").content
)

```

Copy to clipboard

configurable\_fields( _\*\*kwargs:[ConfigurableField](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.utils.ConfigurableField.html#langchain_core.runnables.utils.ConfigurableField "langchain_core.runnables.utils.ConfigurableField") \| [ConfigurableFieldSingleOption](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.utils.ConfigurableFieldSingleOption.html#langchain_core.runnables.utils.ConfigurableFieldSingleOption "langchain_core.runnables.utils.ConfigurableFieldSingleOption") \| [ConfigurableFieldMultiOption](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.utils.ConfigurableFieldMultiOption.html#langchain_core.runnables.utils.ConfigurableFieldMultiOption "langchain_core.runnables.utils.ConfigurableFieldMultiOption")_)→[RunnableSerializable](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.RunnableSerializable.html#langchain_core.runnables.base.RunnableSerializable "langchain_core.runnables.base.RunnableSerializable") [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.configurable_fields "Link to this definition")

Configure particular Runnable fields at runtime.

Parameters:

**\*\*kwargs** ( [_ConfigurableField_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.utils.ConfigurableField.html#langchain_core.runnables.utils.ConfigurableField "langchain_core.runnables.utils.ConfigurableField") _\|_ [_ConfigurableFieldSingleOption_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.utils.ConfigurableFieldSingleOption.html#langchain_core.runnables.utils.ConfigurableFieldSingleOption "langchain_core.runnables.utils.ConfigurableFieldSingleOption") _\|_ [_ConfigurableFieldMultiOption_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.utils.ConfigurableFieldMultiOption.html#langchain_core.runnables.utils.ConfigurableFieldMultiOption "langchain_core.runnables.utils.ConfigurableFieldMultiOption")) – A dictionary of ConfigurableField instances to configure.

Returns:

A new Runnable with the fields configured.

Return type:

[_RunnableSerializable_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.RunnableSerializable.html#langchain_core.runnables.base.RunnableSerializable "langchain_core.runnables.base.RunnableSerializable")

```
from langchain_core.runnables import ConfigurableField
from langchain_openai import ChatOpenAI

model = ChatOpenAI(max_tokens=20).configurable_fields(
    max_tokens=ConfigurableField(
        id="output_token_number",
        name="Max tokens in the output",
        description="The maximum number of tokens in the output",
    )
)

# max_tokens = 20
print(
    "max_tokens_20: ",
    model.invoke("tell me something about chess").content
)

# max_tokens = 200
print("max_tokens_200: ", model.with_config(
    configurable={"output_token_number": 200}
    ).invoke("tell me something about chess").content
)

```

Copy to clipboard

get\_num\_tokens( _text:str_)→int [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.get_num_tokens "Link to this definition")

Get the number of tokens present in the text.

Useful for checking if an input fits in a model’s context window.

Parameters:

**text** ( _str_) – The string input to tokenize.

Returns:

The integer number of tokens in the text.

Return type:

int

get\_num\_tokens\_from\_messages( _messages:List\[ [BaseMessage](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage")\]_, _tools:Sequence\[Dict\[str,Any\]\|Type\|Callable\| [BaseTool](https://python.langchain.com/api_reference/core/tools/langchain_core.tools.base.BaseTool.html#langchain_core.tools.base.BaseTool "langchain_core.tools.base.BaseTool")\]\|None=None_)→int [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.get_num_tokens_from_messages "Link to this definition")

Calculate num tokens for gpt-3.5-turbo and gpt-4 with tiktoken package.

**Requirements**: You must have the `pillow` installed if you want to count
image tokens if you are specifying the image as a base64 string, and you must
have both `pillow` and `httpx` installed if you are specifying the image
as a URL. If these aren’t installed image inputs will be ignored in token
counting.

OpenAI reference: [openai/openai-cookbook](https://github.com/openai/openai-cookbook/blob/)
main/examples/How\_to\_format\_inputs\_to\_ChatGPT\_models.ipynb

Parameters:

- **messages** ( _List_ _\[_ [_BaseMessage_](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage") _\]_) – The message inputs to tokenize.

- **tools** ( _Sequence_ _\[_ _Dict_ _\[_ _str_ _,_ _Any_ _\]_ _\|_ _Type_ _\|_ _Callable_ _\|_ [_BaseTool_](https://python.langchain.com/api_reference/core/tools/langchain_core.tools.base.BaseTool.html#langchain_core.tools.base.BaseTool "langchain_core.tools.base.BaseTool") _\]_ _\|_ _None_) – If provided, sequence of dict, BaseModel, function, or BaseTools
to be converted to tool schemas.


Return type:

int

get\_token\_ids( _text:str_)→List\[int\] [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.get_token_ids "Link to this definition")

Get the tokens present in the text with tiktoken package.

Parameters:

**text** ( _str_)

Return type:

_List_\[int\]

invoke( _input:LanguageModelInput_, _config:[RunnableConfig](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") \|None=None_, _\*_, _stop:list\[str\]\|None=None_, _\*\*kwargs:Any_)→[BaseMessage](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage") [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.invoke "Link to this definition")

Transform a single input into an output. Override to implement.

Parameters:

- **input** ( _LanguageModelInput_) – The input to the Runnable.

- **config** ( _Optional_ _\[_ [_RunnableConfig_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") _\]_) – A config to use when invoking the Runnable.
The config supports standard keys like ‘tags’, ‘metadata’ for tracing
purposes, ‘max\_concurrency’ for controlling how much work to do
in parallel, and other keys. Please refer to the RunnableConfig
for more details.

- **stop** ( _Optional_ _\[_ _list_ _\[_ _str_ _\]_ _\]_)

- **kwargs** ( _Any_)


Returns:

The output of the Runnable.

Return type:

[BaseMessage](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage")

stream( _input:LanguageModelInput_, _config:[RunnableConfig](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") \|None=None_, _\*_, _stop:list\[str\]\|None=None_, _\*\*kwargs:Any_)→Iterator\[ [BaseMessageChunk](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessageChunk.html#langchain_core.messages.base.BaseMessageChunk "langchain_core.messages.base.BaseMessageChunk")\] [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.stream "Link to this definition")

Default implementation of stream, which calls invoke.
Subclasses should override this method if they support streaming output.

Parameters:

- **input** ( _LanguageModelInput_) – The input to the Runnable.

- **config** ( _Optional_ _\[_ [_RunnableConfig_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") _\]_) – The config to use for the Runnable. Defaults to None.

- **kwargs** ( _Any_) – Additional keyword arguments to pass to the Runnable.

- **stop** ( _Optional_ _\[_ _list_ _\[_ _str_ _\]_ _\]_)


Yields:

The output of the Runnable.

Return type:

Iterator\[ [BaseMessageChunk](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessageChunk.html#langchain_core.messages.base.BaseMessageChunk "langchain_core.messages.base.BaseMessageChunk")\]

with\_alisteners( _\*_, _on\_start:AsyncListener\|None=None_, _on\_end:AsyncListener\|None=None_, _on\_error:AsyncListener\|None=None_)→[Runnable](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[Input,Output\] [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.with_alisteners "Link to this definition")

Bind async lifecycle listeners to a Runnable, returning a new Runnable.

on\_start: Asynchronously called before the Runnable starts running.
on\_end: Asynchronously called after the Runnable finishes running.
on\_error: Asynchronously called if the Runnable throws an error.

The Run object contains information about the run, including its id,
type, input, output, error, start\_time, end\_time, and any tags or metadata
added to the run.

Parameters:

- **on\_start** ( _Optional_ _\[_ _AsyncListener_ _\]_) – Asynchronously called before the Runnable starts running.
Defaults to None.

- **on\_end** ( _Optional_ _\[_ _AsyncListener_ _\]_) – Asynchronously called after the Runnable finishes running.
Defaults to None.

- **on\_error** ( _Optional_ _\[_ _AsyncListener_ _\]_) – Asynchronously called if the Runnable throws an error.
Defaults to None.


Returns:

A new Runnable with the listeners bound.

Return type:

[Runnable](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[Input, Output\]

Example:

```
from langchain_core.runnables import RunnableLambda
import time

async def test_runnable(time_to_sleep : int):
    print(f"Runnable[{time_to_sleep}s]: starts at {format_t(time.time())}")
    await asyncio.sleep(time_to_sleep)
    print(f"Runnable[{time_to_sleep}s]: ends at {format_t(time.time())}")

async def fn_start(run_obj : Runnable):
    print(f"on start callback starts at {format_t(time.time())}
    await asyncio.sleep(3)
    print(f"on start callback ends at {format_t(time.time())}")

async def fn_end(run_obj : Runnable):
    print(f"on end callback starts at {format_t(time.time())}
    await asyncio.sleep(2)
    print(f"on end callback ends at {format_t(time.time())}")

runnable = RunnableLambda(test_runnable).with_alisteners(
    on_start=fn_start,
    on_end=fn_end
)
async def concurrent_runs():
    await asyncio.gather(runnable.ainvoke(2), runnable.ainvoke(3))

asyncio.run(concurrent_runs())
Result:
on start callback starts at 2024-05-16T14:20:29.637053+00:00
on start callback starts at 2024-05-16T14:20:29.637150+00:00
on start callback ends at 2024-05-16T14:20:32.638305+00:00
on start callback ends at 2024-05-16T14:20:32.638383+00:00
Runnable[3s]: starts at 2024-05-16T14:20:32.638849+00:00
Runnable[5s]: starts at 2024-05-16T14:20:32.638999+00:00
Runnable[3s]: ends at 2024-05-16T14:20:35.640016+00:00
on end callback starts at 2024-05-16T14:20:35.640534+00:00
Runnable[5s]: ends at 2024-05-16T14:20:37.640169+00:00
on end callback starts at 2024-05-16T14:20:37.640574+00:00
on end callback ends at 2024-05-16T14:20:37.640654+00:00
on end callback ends at 2024-05-16T14:20:39.641751+00:00

```

Copy to clipboard

with\_config( _config:[RunnableConfig](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") \|None=None_, _\*\*kwargs:Any_)→[Runnable](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[Input,Output\] [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.with_config "Link to this definition")

Bind config to a Runnable, returning a new Runnable.

Parameters:

- **config** ( [_RunnableConfig_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") _\|_ _None_) – The config to bind to the Runnable.

- **kwargs** ( _Any_) – Additional keyword arguments to pass to the Runnable.


Returns:

A new Runnable with the config bound.

Return type:

[_Runnable_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[ _Input_, _Output_\]

with\_fallbacks( _fallbacks:Sequence\[Runnable\[Input,Output\]\],\*,exceptions\_to\_handle:tuple\[type\[BaseException\],...\]=(<class'Exception'>,),exception\_key:Optional\[str\]=None_)→RunnableWithFallbacksT\[Input,Output\] [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.with_fallbacks "Link to this definition")

Add fallbacks to a Runnable, returning a new Runnable.

The new Runnable will try the original Runnable, and then each fallback
in order, upon failures.

Parameters:

- **fallbacks** ( _Sequence_ _\[_ [_Runnable_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable") _\[_ _Input_ _,_ _Output_ _\]_ _\]_) – A sequence of runnables to try if the original Runnable fails.

- **exceptions\_to\_handle** ( _tuple_ _\[_ _type_ _\[_ _BaseException_ _\]_ _,_ _..._ _\]_) – A tuple of exception types to handle.
Defaults to (Exception,).

- **exception\_key** ( _Optional_ _\[_ _str_ _\]_) – If string is specified then handled exceptions will be passed
to fallbacks as part of the input under the specified key. If None,
exceptions will not be passed to fallbacks. If used, the base Runnable
and its fallbacks must accept a dictionary as input. Defaults to None.


Returns:

A new Runnable that will try the original Runnable, and then each
fallback in order, upon failures.

Return type:

RunnableWithFallbacksT\[Input, Output\]

Example

```
from typing import Iterator

from langchain_core.runnables import RunnableGenerator

def _generate_immediate_error(input: Iterator) -> Iterator[str]:
    raise ValueError()
    yield ""

def _generate(input: Iterator) -> Iterator[str]:
    yield from "foo bar"

runnable = RunnableGenerator(_generate_immediate_error).with_fallbacks(
    [RunnableGenerator(_generate)]
    )
print(''.join(runnable.stream({}))) #foo bar

```

Copy to clipboard

Parameters:

- **fallbacks** ( _Sequence_ _\[_ [_Runnable_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable") _\[_ _Input_ _,_ _Output_ _\]_ _\]_) – A sequence of runnables to try if the original Runnable fails.

- **exceptions\_to\_handle** ( _tuple_ _\[_ _type_ _\[_ _BaseException_ _\]_ _,_ _..._ _\]_) – A tuple of exception types to handle.

- **exception\_key** ( _Optional_ _\[_ _str_ _\]_) – If string is specified then handled exceptions will be passed
to fallbacks as part of the input under the specified key. If None,
exceptions will not be passed to fallbacks. If used, the base Runnable
and its fallbacks must accept a dictionary as input.


Returns:

A new Runnable that will try the original Runnable, and then each
fallback in order, upon failures.

Return type:

RunnableWithFallbacksT\[Input, Output\]

with\_listeners( _\*_, _on\_start:Callable\[\[Run\],None\]\|Callable\[\[Run, [RunnableConfig](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig")\],None\]\|None=None_, _on\_end:Callable\[\[Run\],None\]\|Callable\[\[Run, [RunnableConfig](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig")\],None\]\|None=None_, _on\_error:Callable\[\[Run\],None\]\|Callable\[\[Run, [RunnableConfig](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig")\],None\]\|None=None_)→[Runnable](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[Input,Output\] [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.with_listeners "Link to this definition")

Bind lifecycle listeners to a Runnable, returning a new Runnable.

on\_start: Called before the Runnable starts running, with the Run object.
on\_end: Called after the Runnable finishes running, with the Run object.
on\_error: Called if the Runnable throws an error, with the Run object.

The Run object contains information about the run, including its id,
type, input, output, error, start\_time, end\_time, and any tags or metadata
added to the run.

Parameters:

- **on\_start** ( _Optional_ _\[_ _Union_ _\[_ _Callable_ _\[_ _\[_ _Run_ _\]_ _,_ _None_ _\]_ _,_ _Callable_ _\[_ _\[_ _Run_ _,_ [_RunnableConfig_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") _\]_ _,_ _None_ _\]_ _\]_ _\]_) – Called before the Runnable starts running. Defaults to None.

- **on\_end** ( _Optional_ _\[_ _Union_ _\[_ _Callable_ _\[_ _\[_ _Run_ _\]_ _,_ _None_ _\]_ _,_ _Callable_ _\[_ _\[_ _Run_ _,_ [_RunnableConfig_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") _\]_ _,_ _None_ _\]_ _\]_ _\]_) – Called after the Runnable finishes running. Defaults to None.

- **on\_error** ( _Optional_ _\[_ _Union_ _\[_ _Callable_ _\[_ _\[_ _Run_ _\]_ _,_ _None_ _\]_ _,_ _Callable_ _\[_ _\[_ _Run_ _,_ [_RunnableConfig_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.config.RunnableConfig.html#langchain_core.runnables.config.RunnableConfig "langchain_core.runnables.config.RunnableConfig") _\]_ _,_ _None_ _\]_ _\]_ _\]_) – Called if the Runnable throws an error. Defaults to None.


Returns:

A new Runnable with the listeners bound.

Return type:

[Runnable](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[Input, Output\]

Example:

```
from langchain_core.runnables import RunnableLambda
from langchain_core.tracers.schemas import Run

import time

def test_runnable(time_to_sleep : int):
    time.sleep(time_to_sleep)

def fn_start(run_obj: Run):
    print("start_time:", run_obj.start_time)

def fn_end(run_obj: Run):
    print("end_time:", run_obj.end_time)

chain = RunnableLambda(test_runnable).with_listeners(
    on_start=fn_start,
    on_end=fn_end
)
chain.invoke(2)

```

Copy to clipboard

with\_retry( _\*,retry\_if\_exception\_type:tuple\[type\[BaseException\],...\]=(<class'Exception'>,),wait\_exponential\_jitter:bool=True,stop\_after\_attempt:int=3_)→[Runnable](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[Input,Output\] [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.with_retry "Link to this definition")

Create a new Runnable that retries the original Runnable on exceptions.

Parameters:

- **retry\_if\_exception\_type** ( _tuple_ _\[_ _type_ _\[_ _BaseException_ _\]_ _,_ _..._ _\]_) – A tuple of exception types to retry on.
Defaults to (Exception,).

- **wait\_exponential\_jitter** ( _bool_) – Whether to add jitter to the wait
time between retries. Defaults to True.

- **stop\_after\_attempt** ( _int_) – The maximum number of attempts to make before
giving up. Defaults to 3.


Returns:

A new Runnable that retries the original Runnable on exceptions.

Return type:

[_Runnable_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[ _Input_, _Output_\]

Example:

```
from langchain_core.runnables import RunnableLambda

count = 0

def _lambda(x: int) -> None:
    global count
    count = count + 1
    if x == 1:
        raise ValueError("x is 1")
    else:
         pass

runnable = RunnableLambda(_lambda)
try:
    runnable.with_retry(
        stop_after_attempt=2,
        retry_if_exception_type=(ValueError,),
    ).invoke(1)
except ValueError:
    pass

assert (count == 2)

```

Copy to clipboard

Parameters:

- **retry\_if\_exception\_type** ( _tuple_ _\[_ _type_ _\[_ _BaseException_ _\]_ _,_ _..._ _\]_) – A tuple of exception types to retry on

- **wait\_exponential\_jitter** ( _bool_) – Whether to add jitter to the wait time
between retries

- **stop\_after\_attempt** ( _int_) – The maximum number of attempts to make before giving up


Returns:

A new Runnable that retries the original Runnable on exceptions.

Return type:

[_Runnable_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[ _Input_, _Output_\]

with\_structured\_output( _schema:Dict\[str,Any\]\|Type\[\_BM\]\|Type\|None=None_, _\*_, _method:Literal\['function\_calling','json\_mode','json\_schema'\]='function\_calling'_, _include\_raw:bool=False_, _strict:bool\|None=None_, _\*\*kwargs:Any_)→[Runnable](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[ [PromptValue](https://python.langchain.com/api_reference/core/prompt_values/langchain_core.prompt_values.PromptValue.html#langchain_core.prompt_values.PromptValue "langchain_core.prompt_values.PromptValue") \|str\|Sequence\[ [BaseMessage](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage") \|list\[str\]\|tuple\[str,str\]\|str\|dict\[str,Any\]\],Dict\|\_BM\] [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.with_structured_output "Link to this definition")

Model wrapper that returns outputs formatted to match the given schema.

Parameters:

- **schema** ( _Dict_ _\[_ _str_ _,_ _Any_ _\]_ _\|_ _Type_ _\[_ _\_BM_ _\]_ _\|_ _Type_ _\|_ _None_) –

The output schema. Can be passed in as:


  - an OpenAI function/tool schema,

  - a JSON Schema,

  - a TypedDict class (support added in 0.1.20),

  - or a Pydantic class.


If `schema` is a Pydantic class then the model output will be a
Pydantic instance of that class, and the model-generated fields will be
validated by the Pydantic class. Otherwise the model output will be a
dict and will not be validated. See [`langchain_core.utils.function_calling.convert_to_openai_tool()`](https://python.langchain.com/api_reference/core/utils/langchain_core.utils.function_calling.convert_to_openai_tool.html#langchain_core.utils.function_calling.convert_to_openai_tool "langchain_core.utils.function_calling.convert_to_openai_tool")
for more on how to properly specify types and descriptions of
schema fields when specifying a Pydantic or TypedDict class.

- **method** ( _Literal_ _\[_ _'function\_calling'_ _,_ _'json\_mode'_ _,_ _'json\_schema'_ _\]_) –

The method for steering model generation, one of:


  - ”function\_calling”:

    Uses OpenAI’s tool-calling (formerly called function calling)
    API: [https://platform.openai.com/docs/guides/function-calling](https://platform.openai.com/docs/guides/function-calling)

  - ”json\_schema”:

    Uses OpenAI’s Structured Output API: [https://platform.openai.com/docs/guides/structured-outputs](https://platform.openai.com/docs/guides/structured-outputs)
    Supported for “gpt-4o-mini”, “gpt-4o-2024-08-06”, “o1”, and later
    models.

  - ”json\_mode”:

    Uses OpenAI’s JSON mode. Note that if using JSON mode then you
    must include instructions for formatting the output into the
    desired schema into the model call:
    [https://platform.openai.com/docs/guides/structured-outputs/json-mode](https://platform.openai.com/docs/guides/structured-outputs/json-mode)


Learn more about the differences between the methods and which models
support which methods here:

  - [https://platform.openai.com/docs/guides/structured-outputs/structured-outputs-vs-json-mode](https://platform.openai.com/docs/guides/structured-outputs/structured-outputs-vs-json-mode)

  - [https://platform.openai.com/docs/guides/structured-outputs/function-calling-vs-response-format](https://platform.openai.com/docs/guides/structured-outputs/function-calling-vs-response-format)


- **include\_raw** ( _bool_) – If False then only the parsed structured output is returned. If
an error occurs during model output parsing it will be raised. If True
then both the raw model response (a BaseMessage) and the parsed model
response will be returned. If an error occurs during output parsing it
will be caught and returned as well. The final output is always a dict
with keys “raw”, “parsed”, and “parsing\_error”.

- **strict** ( _bool_ _\|_ _None_) –


  - True:

    Model output is guaranteed to exactly match the schema.
    The input schema will also be validated according to
    [https://platform.openai.com/docs/guides/structured-outputs/supported-schemas](https://platform.openai.com/docs/guides/structured-outputs/supported-schemas)

  - False:

    Input schema will not be validated and model output will not be
    validated.

  - None:

    `strict` argument will not be passed to the model.


- **kwargs** ( _Any_) – Additional keyword args aren’t supported.


Returns:

A Runnable that takes same inputs as a `langchain_core.language_models.chat.BaseChatModel`.

If `include_raw` is False and `schema` is a Pydantic class, Runnable outputs an instance of `schema` (i.e., a Pydantic object). Otherwise, if `include_raw` is False then Runnable outputs a dict.

If `include_raw` is True, then Runnable outputs a dict with keys:

- ”raw”: BaseMessage

- ”parsed”: None if there was a parsing error, otherwise the type depends on the `schema` as described above.

- ”parsing\_error”: Optional\[BaseException\]


Return type:

[_Runnable_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[ [_PromptValue_](https://python.langchain.com/api_reference/core/prompt_values/langchain_core.prompt_values.PromptValue.html#langchain_core.prompt_values.PromptValue "langchain_core.prompt_values.PromptValue") \| str \| _Sequence_\[ [_BaseMessage_](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html#langchain_core.messages.base.BaseMessage "langchain_core.messages.base.BaseMessage") \| list\[str\] \| tuple\[str, str\] \| str \| dict\[str, _Any_\]\], _Dict_ \| _\_BM_\]

Changed in version 0.1.20: Added support for TypedDict class `schema`.

Changed in version 0.1.21: Support for `strict` argument added.
Support for `method` = “json\_schema” added.

with\_types( _\*_, _input\_type:type\[Input\]\|None=None_, _output\_type:type\[Output\]\|None=None_)→[Runnable](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[Input,Output\] [#](https://python.langchain.com/api_reference/deepseek/chat_models/langchain_deepseek.chat_models.ChatDeepSeek.html#langchain_deepseek.chat_models.ChatDeepSeek.with_types "Link to this definition")

Bind input and output types to a Runnable, returning a new Runnable.

Parameters:

- **input\_type** ( _type_ _\[_ _Input_ _\]_ _\|_ _None_) – The input type to bind to the Runnable. Defaults to None.

- **output\_type** ( _type_ _\[_ _Output_ _\]_ _\|_ _None_) – The output type to bind to the Runnable. Defaults to None.


Returns:

A new Runnable with the types bound.

Return type:

[_Runnable_](https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html#langchain_core.runnables.base.Runnable "langchain_core.runnables.base.Runnable")\[ _Input_, _Output_\]

On this page