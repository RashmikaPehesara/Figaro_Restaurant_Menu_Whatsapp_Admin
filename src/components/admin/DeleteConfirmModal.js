"use client";

import { Loader2 } from "lucide-react";

export default function DeleteConfirmModal({
  isOpen,
  title = "Delete Item?",
  message = "Are you sure you want to permanently delete this item?.",
  confirmText = "Confirm Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[110] flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-3xl shadow-2xl p-6 animate-in fade-in zoom-in duration-150">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
          {message}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all active:scale-95 cursor-pointer touch-manipulation select-none"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer touch-manipulation select-none"
          >
            {isLoading ? <Loader2 className="animate-spin" size={16} /> : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
