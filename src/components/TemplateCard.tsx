import { TemplateId, TEMPLATES } from '../lib/types';
import { CheckCircle } from 'lucide-react';

const THUMBNAIL_COLORS: Record<TemplateId, { bg: string; accent: string; text: string }> = {
  modern: { bg: 'bg-slate-800', accent: 'bg-blue-500', text: 'text-white' },
  classic: { bg: 'bg-white', accent: 'bg-gray-800', text: 'text-gray-900' },
  minimal: { bg: 'bg-white', accent: 'bg-gray-300', text: 'text-gray-800' },
  bold: { bg: 'bg-gray-900', accent: 'bg-amber-500', text: 'text-white' },
  elegant: { bg: 'bg-stone-50', accent: 'bg-stone-700', text: 'text-stone-800' },
};

interface TemplateCardProps {
  templateId: TemplateId;
  selected: boolean;
  onSelect: () => void;
}

export default function TemplateCard({ templateId, selected, onSelect }: TemplateCardProps) {
  const info = TEMPLATES.find((t) => t.id === templateId)!;
  const colors = THUMBNAIL_COLORS[templateId];

  return (
    <button
      onClick={onSelect}
      className={`relative card p-0 overflow-hidden text-left transition-all duration-300 hover:-translate-y-1 ${
        selected ? 'ring-2 ring-primary-500 ring-offset-2 shadow-lg' : ''
      }`}
    >
      {/* Mini preview */}
      <div className={`${colors.bg} ${colors.text} p-4 h-48 flex flex-col`}>
        {/* Header area */}
        <div className={`${colors.accent} h-2 w-16 rounded mb-3`} />
        <div className={`${colors.accent} h-1.5 w-24 rounded mb-1 opacity-60`} />
        <div className={`${colors.accent} h-1 w-20 rounded mb-4 opacity-40`} />

        {/* Body lines */}
        <div className="space-y-2 flex-1">
          <div className={`${colors.accent} h-1 w-full rounded opacity-30`} />
          <div className={`${colors.accent} h-1 w-4/5 rounded opacity-20`} />
          <div className={`${colors.accent} h-1 w-3/5 rounded opacity-20`} />
          <div className="mt-3" />
          <div className={`${colors.accent} h-1 w-full rounded opacity-30`} />
          <div className={`${colors.accent} h-1 w-3/4 rounded opacity-20`} />
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900">{info.name}</h3>
          {selected && <CheckCircle className="w-5 h-5 text-primary-600" />}
        </div>
        <p className="text-sm text-gray-600">{info.description}</p>
        <span className="inline-block mt-2 px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
          {info.category}
        </span>
      </div>
    </button>
  );
}
