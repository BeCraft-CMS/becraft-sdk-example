import { useMemo } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { getArticles, getCategories, getTags } from '@/api/articles.server';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArticleCard,
  ArticleFilter,
  isSortOption,
  sortArticles,
  sortOptions,
  type SortOption,
} from '@/features/articles';

type SearchParams = {
  categoryId?: string;
  tagId?: string;
  sort?: SortOption;
};

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      categoryId: typeof search.categoryId === 'string' ? search.categoryId : undefined,
      tagId: typeof search.tagId === 'string' ? search.tagId : undefined,
      sort: isSortOption(search.sort) ? search.sort : undefined,
    };
  },
  head: () => ({
    meta: [
      {
        title: '記事一覧 | becraft-sdk Example',
      },
      {
        name: 'description',
        content: 'becraft-sdk サンプルアプリケーションの記事一覧。',
      },
    ],
  }),
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ deps: { search } }) => {
    const [contents, categories, tags] = await Promise.all([
      getArticles({ data: { categoryId: search.categoryId, tagId: search.tagId } }),
      getCategories(),
      getTags(),
    ]);
    return { contents, categories, tags };
  },
  component: Index,
});

function Index() {
  const { contents, categories, tags } = Route.useLoaderData();
  const { categoryId, tagId, sort } = Route.useSearch();
  const navigate = useNavigate();

  const sortedContents = useMemo(() => sortArticles(contents, sort), [contents, sort]);

  const handleCategoryClick = (id: string | undefined) => {
    navigate({ to: '/', search: { categoryId: id, tagId, sort } });
  };

  const handleTagClick = (id: string | undefined) => {
    navigate({ to: '/', search: { categoryId, tagId: id, sort } });
  };

  const handleSortChange = (value: string) => {
    if (isSortOption(value)) {
      navigate({ to: '/', search: { categoryId, tagId, sort: value } });
    }
  };

  const handleClearFilters = () => {
    navigate({ to: '/', search: { sort } });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">記事一覧</h1>
        <Select value={sort ?? 'newest'} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ArticleFilter
        categories={categories}
        tags={tags}
        selectedCategoryId={categoryId}
        selectedTagId={tagId}
        onCategoryClick={handleCategoryClick}
        onTagClick={handleTagClick}
        onClearFilters={handleClearFilters}
      />

      {sortedContents.length === 0 ? (
        <p className="text-muted-foreground">記事が見つかりません。</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedContents.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
