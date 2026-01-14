import { useState } from "react";
import Button from "./Button";

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState("");

  function handleAdd() {
    if (enteredTask.trim() === "") return;
    onAdd(enteredTask);
    setEnteredTask("");
  }

  return (
    <div className="flex gap-3 mb-4">
      <input
        value={enteredTask}
        onChange={(e) => setEnteredTask(e.target.value)}
        placeholder="New task..."
        type="text"
        className="
          flex-1 px-4 py-3 rounded-full
          bg-white/10 border border-white/20
          text-white placeholder-white/50
          focus:outline-none focus:ring-1 focus:ring-white/30
          transition-all duration-200
        "
      />
      <Button
        onClick={handleAdd}
        className="
          px-5 py-3 rounded-full bg-[#131313] text-white
          hover:bg-black/70 transition-all duration-200
          font-semibold
        "
      >
        Add
      </Button>
    </div>
  );
}
