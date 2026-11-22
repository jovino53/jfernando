'use client';

interface ChartProps {
  type: 'line' | 'bar' | 'pie';
  data: any;
  title: string;
}

export default function Chart({ type, data, title }: ChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Gráfico {type} - {title}</p>
      </div>
    </div>
  );
}
