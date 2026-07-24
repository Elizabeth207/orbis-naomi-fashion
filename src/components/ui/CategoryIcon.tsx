interface CategoryIconProps {
  name: "shirt" | "jeans" | "jacket" | "bag" | "dress" | "gala" | "suit" | "gem";
  className?: string;
}

export default function CategoryIcon({ name, className = "w-6 h-6" }: CategoryIconProps) {
  const icons = {
    shirt: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 21v-10l-3-1v-4l7-3 7 3v4l-3 1v10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v17" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h8" />
      </>
    ),
    jeans: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 22v-4l2-12h8l2 12v4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18v4M18 18v4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 6l-2 4M16 6l2 4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h8" />
      </>
    ),
    jacket: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l4 4 4-4 4 4 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v16M19 3v16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7v12M15 7v12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7l-4 4M15 7l4 4" />
      </>
    ),
    bag: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 0 0-8 0v4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 9h14l1 12H4L5 9Z" />
      </>
    ),
    dress: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h3l3 6-1.5 9h-3l-1.5-9 1.5-6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12c1.5 0 1.5-3 3-3s1.5 3 3 3" />
      </>
    ),
    gala: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 5h5l4 7-2 10h-7l-2-10 2-7Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12c2 0 2-4 5-4s3 4 5 4" />
      </>
    ),
    suit: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 21V6l4-3 4 3v15" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h8l1 2h-10l1-2Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h.01" />
      </>
    ),
    gem: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2 2 2 2-4 4-4-4 2-2 2-2Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v4M10 5l2 2 2-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7l-4 4 4 4 4-4-4-4Z" />
      </>
    )
  };

  return (
    <svg
      className={className}
      stroke="currentColor"
      fill="none"
      strokeWidth={1.6}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {icons[name]}
    </svg>
  );
}
