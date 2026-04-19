"use client";

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
    <path
      d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
    />
    <circle
      cx="8"
      cy="8"
      r="2"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
    />
  </svg>
);

const HiddenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 13c0-2.5 1.5-4 5-4s5 1.5 5 4"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M4 5.5c0 1.5 1.5 3 4 3s4-1.5 4-3"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      fill="none"
      strokeDasharray="2 1.5"
    />
  </svg>
);

export interface ContactPerson {
  name: string;
  phone: string;
  email: string;
  visible?: boolean;
}

export interface ContactCardProps {
  primaryContact: ContactPerson;
  alternateContact: ContactPerson;
  primaryLabel?: string;
  alternateLabel?: string;
}

function ContactFields({
  contact,
  visible = true,
}: {
  contact: ContactPerson;
  visible?: boolean;
}) {
  const Icon = visible ? EyeIcon : HiddenIcon;

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-2">
      {[
        { label: visible ? "Name" : "Names", value: contact.name },
        { label: "Phone Number", value: contact.phone },
        { label: "Email Address", value: contact.email },
      ].map(({ label, value }) => (
        <div key={label}>
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-sm text-gray-400">{label}</span>
            <span className="text-gray-900">
              <Icon />
            </span>
          </div>
          <p className="text-base text-gray-800">{value}</p>
        </div>
      ))}
    </div>
  );
}

export default function ContactCard({
  primaryContact,
  alternateContact,
  primaryLabel = "First Parent (Primary Contact)",
  alternateLabel = "Second Parent (Alternate Contact)",
}: ContactCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-6 py-5">
      <p className="text-lg font-semibold text-gray-900 mb-3">{primaryLabel}</p>
      <ContactFields
        contact={primaryContact}
        visible={primaryContact.visible ?? true}
      />

      <hr className="border-t border-gray-100 my-4" />

      <p className="text-lg font-semibold text-gray-900 mb-3">
        {alternateLabel}
      </p>
      <ContactFields
        contact={alternateContact}
        visible={alternateContact.visible ?? false}
      />
    </div>
  );
}
