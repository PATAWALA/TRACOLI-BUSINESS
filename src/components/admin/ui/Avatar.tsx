interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: "size-7 text-[10px]",
  md: "size-9 text-[11px]",
  lg: "size-11 text-sm",
};

export default function Avatar({ name, size = "md" }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`grid shrink-0 place-items-center rounded-xl bg-tracoli-500 font-bold text-white ${SIZES[size]}`}
    >
      {initials}
    </div>
  );
}
