import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">ページが見つかりません</p>
      <p className="mt-2 text-muted-foreground">お探しのページは存在しません。</p>
      <Button asChild className="mt-6">
        <Link to="/">ホームに戻る</Link>
      </Button>
    </div>
  );
};
