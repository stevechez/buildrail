"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LeadData {
  name: string;
  email: string;
  phone: string;
}

export interface LeadFormProps {
  onSubmit: (data: LeadData) => void;
  onBack?: () => void;
  /** Require a phone number before submit. Default: false */
  requirePhone?: boolean;
  title?: string;
  subtitle?: string;
  submitLabel?: string;
  className?: string;
}

// ─── Validation ───────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
}

function validate(
  fields: LeadData,
  requirePhone: boolean
): FieldErrors {
  const errors: FieldErrors = {};
  if (fields.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL_RE.test(fields.email.trim())) errors.email = "Enter a valid email address.";
  if (requirePhone && fields.phone.replace(/\D/g, "").length < 7)
    errors.phone = "Enter a valid phone number.";
  return errors;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function IconLock() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M7 11V7a5 5 0 0 1 10 0v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconArrowLeft() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19 12H5M12 5l-7 7 7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface FieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (val: string) => void;
  autoComplete?: string;
  required?: boolean;
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
  autoComplete,
  required,
}: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {label}
        {required && <span className="ml-1 text-amber-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={[
          "w-full rounded-xl border px-4 py-3",
          "bg-white dark:bg-slate-800",
          "text-sm font-medium text-slate-900 dark:text-white",
          "placeholder:text-slate-400",
          "transition-all duration-150",
          "focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400",
          error
            ? "border-red-400 dark:border-red-500"
            : "border-slate-200 dark:border-slate-700",
        ].join(" ")}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs font-medium text-red-500 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}

// ─── LeadForm ─────────────────────────────────────────────────────────────────

export function LeadForm({
  onSubmit,
  onBack,
  requirePhone = false,
  title = "Where should we send your estimate?",
  subtitle = "Enter your details to unlock your instant cost range.",
  submitLabel = "Reveal My Estimate",
  className = "",
}: LeadFormProps) {
  const [fields, setFields] = useState<LeadData>({ name: "", email: "", phone: "" });
  const [attempted, setAttempted] = useState(false);

  const errors = attempted ? validate(fields, requirePhone) : {};
  const isValid = Object.keys(validate(fields, requirePhone)).length === 0;

  const set = (key: keyof LeadData) => (val: string) =>
    setFields((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    if (isValid) onSubmit({ ...fields });
  };

  const btnPrimary = [
    "inline-flex items-center gap-1.5 rounded-xl px-6 py-2.5",
    "text-sm font-semibold transition-all duration-150 ease-in-out",
    isValid
      ? "bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0"
      : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed",
  ].join(" ");

  const btnGhost = [
    "inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5",
    "text-sm font-medium",
    "border border-slate-200 dark:border-slate-700",
    "text-slate-600 dark:text-slate-300",
    "hover:border-amber-400/50 hover:text-slate-900 dark:hover:text-white",
    "transition-all duration-150 ease-in-out",
  ].join(" ");

  return (
    <div className={className}>
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-500 dark:text-amber-400">
        <IconLock />
        Almost there
      </div>

      {/* Heading */}
      <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>

      {/* Form */}
      <form className="mt-7 space-y-4" onSubmit={handleSubmit} noValidate>
        <Field
          id="lead-name"
          label="Full name"
          placeholder="Jane Contractor"
          value={fields.name}
          error={errors.name}
          onChange={set("name")}
          autoComplete="name"
          required
        />
        <Field
          id="lead-email"
          label="Email"
          type="email"
          placeholder="jane@company.com"
          value={fields.email}
          error={errors.email}
          onChange={set("email")}
          autoComplete="email"
          required
        />
        <Field
          id="lead-phone"
          label={requirePhone ? "Phone" : "Phone (optional)"}
          type="tel"
          placeholder="(555) 123-4567"
          value={fields.phone}
          error={errors.phone}
          onChange={set("phone")}
          autoComplete="tel"
          required={requirePhone}
        />

        {/* Actions */}
        <div
          className={[
            "flex items-center pt-2",
            onBack ? "justify-between" : "justify-end",
          ].join(" ")}
        >
          {onBack && (
            <button type="button" onClick={onBack} className={btnGhost}>
              <IconArrowLeft />
              Back
            </button>
          )}
          <button type="submit" disabled={attempted && !isValid} className={btnPrimary}>
            {submitLabel}
          </button>
        </div>
      </form>

      {/* Privacy note */}
      <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
        We respect your privacy. No spam, ever.
      </p>
    </div>
  );
}
