import React from "react";

const AzureSignInButton = ({
  children = "Sign in with Microsoft",
  onClick,
  loading = false,
  disabled = false,
  className = "",
}) => {
  const base =
    "w-full inline-flex items-center justify-center gap-2 rounded-2xl py-2 bg-black text-white text-base font-normal font-['Poppins'] shadow-sm transition hover:bg-zinc-800 active:bg-zinc-900 disabled:opacity-60 disabled:cursor-not-allowed";

  const spinner = (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      role="img"
      aria-label="Loading"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={[base, className].join(" ")}
      aria-label={
        typeof children === "string" ? children : "Sign in with Microsoft"
      }
    >
      {loading ? spinner : <MicrosoftLogo className="h-5 w-5" />}
      <span>{children}</span>
    </button>
  );
};

const MicrosoftLogo = ({ className = "h-5 w-5" }) => (
  <svg
    className={className}
    viewBox="0 0 23 23"
    aria-hidden="true"
    focusable="false"
  >
    <rect x="1" y="1" width="9.5" height="9.5" fill="#F25022" />
    <rect x="12.5" y="1" width="9.5" height="9.5" fill="#7FBA00" />
    <rect x="1" y="12.5" width="9.5" height="9.5" fill="#00A4EF" />
    <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900" />
  </svg>
);

export default AzureSignInButton;
