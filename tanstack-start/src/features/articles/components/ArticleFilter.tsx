import type { Category, Tag } from 'becraft-sdk';
import { Button } from '@/components/ui/button';

type ArticleFilterProps = {
  categories: Category[];
  tags: Tag[];
  selectedCategoryId?: string;
  selectedTagId?: string;
  onCategoryClick: (id: string | undefined) => void;
  onTagClick: (id: string | undefined) => void;
  onClearFilters: () => void;
};

export const ArticleFilter = ({
  categories,
  tags,
  selectedCategoryId,
  selectedTagId,
  onCategoryClick,
  onTagClick,
  onClearFilters,
}: ArticleFilterProps) => {
  const hasFilters = selectedCategoryId || selectedTagId;

  if (categories.length === 0 && tags.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
      <div className="space-y-4">
        {categories.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-medium">カテゴリ</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategoryId === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() =>
                    onCategoryClick(selectedCategoryId === category.id ? undefined : category.id)
                  }
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {tags.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-medium">タグ</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Button
                  key={tag.id}
                  variant={selectedTagId === tag.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onTagClick(selectedTagId === tag.id ? undefined : tag.id)}
                >
                  {tag.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            フィルターをクリア
          </Button>
        )}
      </div>
    </div>
  );
};
