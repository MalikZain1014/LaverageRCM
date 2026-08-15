import { type ReactNode, type ButtonHTMLAttributes, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, useEffect } from 'react';
import { X, Loader2, ChevronLeft, ChevronRight, Search, AlertTriangle } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm',
  secondary: 'bg-navy-800 text-white hover:bg-navy-700 shadow-sm',
  ghost: 'text-slatey-700 hover:bg-slatey-100 dark:text-slatey-300 dark:hover:bg-navy-700',
  danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
  outline: 'border border-slatey-200 text-slatey-700 hover:bg-slatey-50 dark:border-white/10 dark:text-slatey-300 dark:hover:bg-navy-700',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({ variant = 'primary', size = 'md', loading, icon, children, className = '', disabled, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      {children}
    </button>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`admin-card ${className}`}>{children}</div>;
}

export function Badge({ children, color = 'slate' }: { children: ReactNode; color?: 'green' | 'amber' | 'red' | 'blue' | 'slate' | 'teal' }) {
  const colors: Record<string, string> = {
    green: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400',
    amber: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
    red: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400',
    slate: 'bg-slatey-100 text-slatey-600 dark:bg-white/5 dark:text-slatey-400',
    teal: 'bg-accent-100 text-accent-700 dark:bg-accent-500/15 dark:text-accent-400',
  };
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[color]}`}>{children}</span>;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, className = '', ...props }: InputProps) {
  return (
    <div>
      {label && <label className="admin-label">{label}</label>}
      <input className={`admin-input ${error ? 'border-red-500' : ''} ${className}`} {...props} />
      {hint && !error && <p className="mt-1 text-xs text-slatey-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div>
      {label && <label className="admin-label">{label}</label>}
      <textarea className={`admin-input resize-y ${className}`} {...props} />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: ReactNode;
}

export function Select({ label, error, className = '', children, ...props }: SelectProps) {
  return (
    <div>
      {label && <label className="admin-label">{label}</label>}
      <select className={`admin-input ${className}`} {...props}>
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const modalSizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-6">
      <div className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative z-10 w-full ${modalSizes[size]} my-8`}>
        <div className="admin-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-slatey-100 px-6 py-4 dark:border-white/10">
            <h3 className="text-lg font-bold text-slatey-800 dark:text-white">{title}</h3>
            <button onClick={onClose} className="rounded-lg p-1.5 text-slatey-400 hover:bg-slatey-100 dark:hover:bg-navy-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="max-h-[calc(100vh-12rem)] overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  loading?: boolean;
}

export function ConfirmDialog({ open, onClose, onConfirm, title, message, loading }: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/15">
          <AlertTriangle className="h-5 w-5 text-red-600" />
        </div>
        <p className="text-sm text-slatey-600 dark:text-slatey-300">{message}</p>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>Delete</Button>
      </div>
    </Modal>
  );
}

export function EmptyState({ icon, title, description, action }: { icon?: ReactNode; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      {icon && <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slatey-100 dark:bg-navy-700 text-slatey-400">{icon}</div>}
      <h3 className="text-base font-semibold text-slatey-700 dark:text-slatey-200">{title}</h3>
      {description && <p className="mt-1 text-sm text-slatey-500 max-w-sm">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder = 'Search...' }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slatey-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="admin-input pl-10"
      />
    </div>
  );
}

export function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (p: number) => void }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between border-t border-slatey-100 px-4 py-3 dark:border-white/10">
      <p className="text-sm text-slatey-500">Page {page} of {totalPages}</p>
      <div className="flex gap-1">
        <button onClick={() => onPageChange(page - 1)} disabled={page <= 1} className="rounded-lg p-2 text-slatey-500 hover:bg-slatey-100 disabled:opacity-40 dark:hover:bg-navy-700">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} className="rounded-lg p-2 text-slatey-500 hover:bg-slatey-100 disabled:opacity-40 dark:hover:bg-navy-700">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-slatey-200 dark:bg-navy-700 ${className}`} />;
}

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slatey-800 dark:text-white">{title}</h1>
        {description && <p className="mt-1 text-sm text-slatey-500">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-primary-600' : 'bg-slatey-300 dark:bg-navy-600'}`}
      >
        <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
      </button>
      {label && <span className="text-sm text-slatey-600 dark:text-slatey-300">{label}</span>}
    </label>
  );
}

export function StatusBadge({ status }: { status: string }) {
  if (status === 'published') return <Badge color="green">Published</Badge>;
  if (status === 'draft') return <Badge color="amber">Draft</Badge>;
  if (status === 'unread') return <Badge color="blue">New</Badge>;
  if (status === 'contacted') return <Badge color="teal">Contacted</Badge>;
  if (status === 'in_progress') return <Badge color="amber">In Progress</Badge>;
  if (status === 'completed') return <Badge color="green">Completed</Badge>;
  return <Badge>{status}</Badge>;
}
