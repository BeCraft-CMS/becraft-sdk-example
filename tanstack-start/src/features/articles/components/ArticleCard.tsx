import { Link } from '@tanstack/react-router';
import type { ApiContentResponse } from 'becraft-sdk';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

type ArticleCardProps = {
  article: ApiContentResponse;
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const hasCategories = article.categories && article.categories.length > 0;
  const hasTags = article.tags && article.tags.length > 0;

  return (
    <Link to="/articles/$articleId" params={{ articleId: article.id }}>
      <Card className="group h-full overflow-hidden border-border/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg">
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
        <CardHeader className="pb-2">
          <CardTitle className="line-clamp-2 text-lg transition-colors group-hover:text-primary">
            {article.title}
          </CardTitle>
          {article.publishedAt && (
            <CardDescription>{new Date(article.publishedAt).toLocaleDateString()}</CardDescription>
          )}
        </CardHeader>
        {(hasCategories || hasTags) && (
          <CardContent className="pt-0">
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
          </CardContent>
        )}
      </Card>
    </Link>
  );
};
