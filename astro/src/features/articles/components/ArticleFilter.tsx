import type { Category, Tag } from '@becraft/sdk';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sortOptions } from '../utils';
import type { SortOption } from '../types';

const buttonBase =
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-9 px-3 cursor-pointer';
const buttonDefault = `${buttonBase} bg-primary text-primary-foreground hover:bg-primary/90`;
const buttonOutline = `${buttonBase} border border-input bg-background hover:bg-accent hover:text-accent-foreground`;
const buttonGhost = `${buttonBase} hover:bg-accent hover:text-accent-foreground`;

type ArticleFilterProps = {
  categories: Category[];
  tags: Tag[];
  categoryId: string | undefined;
  tagId: string | undefined;
  sort: SortOption;
  onCategoryClick: (id: string) => void;
  onTagClick: (id: string) => void;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
};

export const ArticleFilter = ({
  categories,
  tags,
  categoryId,
  tagId,
  sort,
  onCategoryClick,
  onTagClick,
  onSortChange,
  onClearFilters,
}: ArticleFilterProps) => {
  const hasFilters = categoryId || tagId;

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">記事一覧</h1>
        <Select value={sort} onValueChange={onSortChange}>
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

      {(categories.length > 0 || tags.length > 0) && (
        <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
          <div className="space-y-4">
            {categories.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-sm font-medium">カテゴリ</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => onCategoryClick(category.id)}
                      className={categoryId === category.id ? buttonDefault : buttonOutline}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {tags.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-sm font-medium">タグ</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => onTagClick(tag.id)}
                      className={tagId === tag.id ? buttonDefault : buttonOutline}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {hasFilters && (
              <button type="button" onClick={onClearFilters} className={buttonGhost}>
                フィルターをクリア
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
