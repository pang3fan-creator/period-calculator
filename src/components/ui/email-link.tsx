"use client";

import { useState } from "react";
import { EmailModal } from "./email-modal";

interface EmailLinkProps {
  email: string;
  className?: string;
  children: React.ReactNode;
  subject?: string;
  body?: string;
}

export function EmailLink({
  email,
  className,
  children,
  subject,
  body,
}: EmailLinkProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {children}
      </button>

      <EmailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        email={email}
        subject={subject}
        body={body}
      />
    </>
  );
}
