interface HeaderProps {
  title: string;
  description: string;
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <header className="mb-4">
      <h1 className="mb-2 text-2xl font-semibold">{title}</h1>
      <p className="mb-6 text-zinc-700 dark:text-zinc-400">{description}</p>
    </header>
  );
}
