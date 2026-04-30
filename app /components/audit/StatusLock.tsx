// Example Logic for Sequential Locking
export default function StatusLock({ currentStatus, requiredStatus, children }) {
  if (currentStatus !== requiredStatus) {
    return (
      <div className="opacity-50 pointer-events-none grayscale">
        <div className="bg-red-50 text-red-700 p-2 text-xs font-bold rounded flex items-center gap-2">
          <Lock size={12} /> Awaiting {requiredStatus} Validation
        </div>
        {children}
      </div>
    );
  }
  return <>{children}</>;
}
