import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-bold text-slate-900">
          Gia Nguyên Khánh Hòa
        </Link>
        <span className="text-xs text-slate-400">Header (Phase 2.3)</span>
      </div>
    </header>
  );
}
