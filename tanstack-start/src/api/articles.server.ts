import { createServerFn } from '@tanstack/react-start';
import { parseHtmlOnServer } from 'becraft-sdk/server';
import type { ContentNode } from 'becraft-sdk';
import { client } from './client.server';

type GetArticlesParams = {
  categoryId?: string;
  tagId?: string;
};

export const getArticles = createServerFn({ method: 'GET' })
  .inputValidator((data: GetArticlesParams) => data)
  .handler(async ({ data }) => {
    return client.content().get({
      offset: 0,
      limit: 20,
      categoryId: data.categoryId,
      tags: data.tagId,
      statusKeys: 'Published',
    });
  });

export const getArticleById = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    return client.content().find({
      id: data.id,
    });
  });

export const getArticleWithNodes = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const content = await client.content().find({
      id: data.id,
    });
    const nodes = parseHtmlOnServer(content.html);
    // Serialize nodes for client transport
    return {
      content,
      nodes: JSON.parse(JSON.stringify(nodes)) as ContentNode[],
    };
  });

export const getCategories = createServerFn({ method: 'GET' }).handler(async () => {
  return client.category().get({
    offset: 0,
    limit: 100,
  });
});

export const getTags = createServerFn({ method: 'GET' }).handler(async () => {
  return client.tag().get({
    offset: 0,
    limit: 100,
  });
});
