interface SubmitButtonProps {
  submitting: boolean;
  disabled: boolean;
  onClick: () => void;
}

export default function SubmitButton({ submitting, disabled, onClick }: SubmitButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || submitting}
      className="btn btn-primary w-full justify-center text-[15px] py-3.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      {submitting ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Running Analysis…
        </>
      ) : (
        <>🔍 Run Tandem Repeat Finder</>
      )}
    </button>
  );
}
