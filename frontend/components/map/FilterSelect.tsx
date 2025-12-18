import { ChevronDown } from 'lucide-react';
import { ComponentProps } from 'react';

interface FilterSelectProps extends ComponentProps<'select'> {
    label: string;
    icon?: React.ReactNode;
}

export function FilterSelect({ label, icon, children, className, ...props }: FilterSelectProps) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                {icon}
                {label}
            </label>
            <div className="relative group">
                <select
                    className="w-full appearance-none bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 rounded-xl px-3.5 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all cursor-pointer shadow-sm"
                    {...props}
                >
                    {children}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown size={14} className="text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
                </div>
            </div>
        </div>
    )
}