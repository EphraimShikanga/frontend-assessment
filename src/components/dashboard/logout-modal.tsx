"use client";

import { useEffect, useRef, useCallback } from "react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * Logout confirmation modal with blurred backdrop.
 * Uses the native <dialog> element for built-in accessibility
 * (focus trapping, Escape key, ARIA semantics).
 */
export default function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="
        m-auto max-w-md rounded-2xl border-none bg-transparent p-0
        backdrop:bg-black/40 backdrop:backdrop-blur-sm
      "
    >
      <div className="w-[min(28rem,90vw)] rounded-2xl bg-surface-elevated p-8 font-poppins shadow-2xl">
        {/* Title */}
        <h2 className="text-center text-xl font-bold text-text-primary">
          Log Out?
        </h2>

        {/* Icon */}
        <div className="my-6 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logout/log out - icon.svg"
            alt=""
            className="h-20 w-auto"
            aria-hidden="true"
          />
        </div>

        {/* Message */}
        <p className="mb-8 text-center text-sm text-text-muted">
          Are you sure you want to log out?
        </p>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="
              flex h-12 flex-1 items-center justify-center rounded-lg
              border-2 border-text-primary text-base font-semibold text-text-primary
              transition-colors duration-150
              hover:bg-interactive-hover
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary
            "
          >
            Back
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="
              flex h-12 flex-1 items-center justify-center rounded-lg
              bg-text-primary text-base font-semibold text-background
              transition-colors duration-150
              hover:opacity-85
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary
            "
          >
            Yes, log out
          </button>
        </div>
      </div>
    </dialog>
  );
}
