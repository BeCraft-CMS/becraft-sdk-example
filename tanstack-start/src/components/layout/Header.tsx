import { Link } from '@tanstack/react-router';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
        >
          BeCraft
        </Link>
      </div>
    </header>
  );
};
