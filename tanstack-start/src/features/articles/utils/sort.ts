import type { ApiContentResponse } from 'becraft-sdk';
import type { SortOption } from '../types';

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: '新しい順' },
  { value: 'oldest', label: '古い順' },
  { value: 'title-asc', label: 'タイトル (A-Z)' },
  { value: 'title-desc', label: 'タイトル (Z-A)' },
];

const validSortValues: Set<string> = new Set(sortOptions.map((option) => option.value));

export const isSortOption = (value: unknown): value is SortOption => {
  return typeof value === 'string' && validSortValues.has(value);
};

export const sortArticles = (articles: ApiContentResponse[], sort: SortOption | undefined): ApiContentResponse[] => {
  const sorted = [...articles];
  switch (sort) {
    case 'oldest':
      return sorted.sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateA - dateB;
      });
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title, 'ja'));
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title, 'ja'));
    case 'newest':
    default:
      return sorted.sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      });
  }
};
