"use client";

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-16 w-16 text-xl",
};

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ProfileAvatar({
  name,
  picture,
  size = "md",
}: {
  name: string;
  picture?: string;
  size?: "sm" | "md" | "lg";
}) {
  if (picture) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={picture}
        alt={name}
        className={`shrink-0 rounded-full object-cover ${sizeClasses[size]}`}
      />
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${sizeClasses[size]}`}
      style={{
        background: "var(--secondary-bg-dashboard)",
        color: "var(--secondary-text-dashboard)",
      }}
    >
      {initialsOf(name)}
    </div>
  );
}
