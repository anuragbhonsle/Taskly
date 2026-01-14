import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, textarea, ...props }, ref) {
  const classes =
    "w-full p-2 rounded-xl bg-white/10 border border-white/40 text-white placeholder-[#1D546D]/70 backdrop-blur-sm shadow-lg focus:outline-none focus:border-white";

  return (
    <div className="flex flex-col gap-1 my-4">
      <label className="text-l font-bold uppercase text-white">{label}</label>

      {textarea ? (
        <textarea ref={ref} className={classes + " resize-none"} {...props} />
      ) : (
        <input ref={ref} className={classes} {...props} />
      )}
    </div>
  );
});

export default Input;
