import { useState, useMemo } from 'react';
import type { ApiContentResponse, Category, Tag } from '@becraft/sdk';
import { isSortOption, sortArticles } from '../utils';
import type { SortOption } from '../types';
import { ArticleCard } from './ArticleCard';
import { ArticleFilter } from './ArticleFilter';

type Props = {
  articles: ApiContentResponse[];
  categories: Category[];
  tags: Tag[];
};

const getInitialParams = () => {
  if (typeof window === 'undefined') {
    return { categoryId: undefined, tagId: undefined, sort: 'newest' as SortOption };
  }
  const params = new URLSearchParams(window.location.search);
  const sortParam = params.get('sort');
  return {
    categoryId: params.get('categoryId') ?? undefined,
    tagId: params.get('tagId') ?? undefined,
    sort: (isSortOption(sortParam) ? sortParam : 'newest') as SortOption,
  };
};

const updateUrl = (params: { categoryId?: string; tagId?: string; sort: string }) => {
  const searchParams = new URLSearchParams();
  if (params.categoryId) searchParams.set('categoryId', params.categoryId);
  if (params.tagId) searchParams.set('tagId', params.tagId);
  if (params.sort !== 'newest') searchParams.set('sort', params.sort);
  const query = searchParams.toString();
  const url = query ? `/?${query}` : '/';
  history.replaceState(null, '', url);
};

export const ArticleList = ({ articles, categories, tags }: Props) => {
  const [{ categoryId, tagId, sort }, setFilters] = useState(getInitialParams);

  const filteredAndSorted = useMemo(() => {
    let filtered = articles;
    if (categoryId) {
      filtered = filtered.filter((a) => a.categories.some((c) => c.id === categoryId));
    }
    if (tagId) {
      filtered = filtered.filter((a) => a.tags.some((t) => t.id === tagId));
    }
    return sortArticles(filtered, sort);
  }, [articles, categoryId, tagId, sort]);

  const handleCategoryClick = (id: string) => {
    const newCategoryId = categoryId === id ? undefined : id;
    setFilters((prev) => ({ ...prev, categoryId: newCategoryId }));
    updateUrl({ categoryId: newCategoryId, tagId, sort });
  };

  const handleTagClick = (id: string) => {
    const newTagId = tagId === id ? undefined : id;
    setFilters((prev) => ({ ...prev, tagId: newTagId }));
    updateUrl({ categoryId, tagId: newTagId, sort });
  };

  const handleSortChange = (value: string) => {
    if (!isSortOption(value)) return;
    setFilters((prev) => ({ ...prev, sort: value }));
    updateUrl({ categoryId, tagId, sort: value });
  };

  const handleClearFilters = () => {
    setFilters((prev) => ({ ...prev, categoryId: undefined, tagId: undefined }));
    updateUrl({ categoryId: undefined, tagId: undefined, sort });
  };

  return (
    <div className="space-y-6">
      <ArticleFilter
        categories={categories}
        tags={tags}
        categoryId={categoryId}
        tagId={tagId}
        sort={sort}
        onCategoryClick={handleCategoryClick}
        onTagClick={handleTagClick}
        onSortChange={handleSortChange}
        onClearFilters={handleClearFilters}
      />

      {filteredAndSorted.length === 0 ? (
        <p className="text-muted-foreground">記事が見つかりません。</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSorted.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};
