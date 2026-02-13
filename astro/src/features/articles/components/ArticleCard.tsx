import type { ApiContentResponse } from '@becraft/sdk';

type ArticleCardProps = {
  article: ApiContentResponse;
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const hasCategories = article.categories && article.categories.length > 0;
  const hasTags = article.tags && article.tags.length > 0;

  return (
    <a href={`/articles/${article.id}`}>
      <div className="group h-full overflow-hidden rounded-lg border border-border/50 bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg">
        <div className="aspect-video overflow-hidden bg-muted">
          {article.thumbnail?.url ? (
            <img
              src={article.thumbnail.url}
              alt={article.thumbnail.alt ?? article.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-sm text-muted-foreground">画像なし</span>
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-1.5 p-6 pb-2">
          <div className="line-clamp-2 text-lg font-semibold leading-none tracking-tight transition-colors group-hover:text-primary">
            {article.title}
          </div>
          {article.publishedAt && (
            <div className="text-sm text-muted-foreground">
              {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
            </div>
          )}
        </div>
        {(hasCategories || hasTags) && (
          <div className="p-6 pt-0">
            <div className="flex flex-wrap gap-1">
              {article.categories?.map((category) => (
                <span
                  key={category.id}
                  className="rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary"
                >
                  {category.name}
                </span>
              ))}
              {article.tags?.map((tag) => (
                <span
                  key={tag.id}
                  className="rounded border border-border bg-muted/50 px-1.5 py-0.5 text-xs text-muted-foreground"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </a>
  );
};
