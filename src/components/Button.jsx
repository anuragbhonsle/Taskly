export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`
        px-5 py-2 md:px-6 md:py-3 text-sm md:text-base font-semibold
        rounded-full bg-[#131313] text-white
        backdrop-blur-sm shadow-lg shadow-[#061E29]/40
        hover:bg-black/70 hover:scale-105
        active:scale-95 active:shadow-inner
        transition-all duration-200
        ${className}
      `}
    >
      {children}
    </button>
  );
}
