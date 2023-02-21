import middy from '@middy/core'
import middyJsonBodyParser from '@middy/http-json-body-parser'
import httpEventNormalizer from '@middy/http-event-normalizer'
import httpHeaderNormalizer from '@middy/http-header-normalizer'

export const middyfy = (handler) => {
  return middy(handler)
      .use(httpHeaderNormalizer())
      .use(httpEventNormalizer())
      .use(middyJsonBodyParser());
}
