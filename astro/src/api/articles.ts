import { parseHtmlOnServer } from 'becraft-sdk/server';
import type { ContentNode } from 'becraft-sdk';
import { client } from './client';

type GetArticlesParams = {
  categoryId?: string;
  tagId?: string;
};

export const getArticles = async (params: GetArticlesParams = {}) => {
  return client.content().get({
    offset: 0,
    limit: 100,
    categoryId: params.categoryId,
    tags: params.tagId,
    statusKeys: 'Published',
  });
};

export const getArticleById = async (id: string) => {
  return client.content().find({ id });
};

export const getArticleWithNodes = async (id: string) => {
  const content = await client.content().find({ id });
  const nodes = parseHtmlOnServer(content.html);
  return {
    content,
    nodes: JSON.parse(JSON.stringify(nodes)) as ContentNode[],
  };
};

export const getCategories = async () => {
  return client.category().get({
    offset: 0,
    limit: 100,
  });
};

export const getTags = async () => {
  return client.tag().get({
    offset: 0,
    limit: 100,
  });
};
