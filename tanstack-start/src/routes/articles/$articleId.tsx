import { createFileRoute, Link } from '@tanstack/react-router';
import { BeCraftHTMLRenderer, type ApiContentResponse, type ContentNode } from 'becraft-sdk';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getArticleWithNodes } from '@/api/articles.server';

type LoaderData = {
  content: ApiContentResponse;
  nodes: ContentNode[];
};

const articleLoader = async ({
  params,
}: {
  params: { articleId: string };
}): Promise<LoaderData> => {
  return getArticleWithNodes({ data: { id: params.articleId } });
};

export const Route = createFileRoute('/articles/$articleId')({
  head: ({ loaderData }: { loaderData?: LoaderData }) => {
    const data = loaderData;
    return {
      meta: [
        {
          title: `${data?.content?.title ?? '記事'} | becraft-sdk Example`,
        },
        {
          name: 'description',
          content: `「${data?.content?.title ?? 'この記事'}」- becraft-sdk サンプル`,
        },
      ],
    };
  },
  loader: articleLoader,
  component: ArticleDetailPage,
});

function ArticleDetailPage() {
  const { content, nodes } = Route.useLoaderData();

  return (
    <article className="max-w-3xl">
      <Button variant="ghost" asChild className="mb-4">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          一覧に戻る
        </Link>
      </Button>
      <h1 className="text-3xl font-bold tracking-tight">{content.title}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {content.publishedAt && (
          <span className="text-sm text-muted-foreground">
            {new Date(content.publishedAt).toLocaleDateString()}
          </span>
        )}
        {content.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {content.categories.map((category) => (
              <Link
                key={category.id}
                to="/"
                search={{ categoryId: category.id }}
                className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
        {content.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {content.tags.map((tag) => (
              <Link
                key={tag.id}
                to="/"
                search={{ tagId: tag.id }}
                className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-muted"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}
      </div>
      <hr className="my-6 border-border" />
      {/* prose でTypography関連のstyle を付与 */}
      <div className="prose prose-slate max-w-none">
        <BeCraftHTMLRenderer nodes={nodes} />
      </div>
    </article>
  );
}
