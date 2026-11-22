'use client';

export default function Header({ title }: { title?: string }) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {title && <h1 className="text-lg font-semibold">{title}</h1>}
        <input
          type="text"
          placeholder="Buscar..."
          className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:text-gray-700">
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          🔔
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          ⚙️
        </button>
      </div>
    </header>
  );
}
