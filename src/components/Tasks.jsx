import Button from "./Button";
import NewTask from "./NewTask";

export default function Tasks({ tasks, onAdd, onDelete }) {
  return (
    <section className="text-white">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>

      {/* New task input */}
      <NewTask onAdd={onAdd} />

      {/* No tasks message */}
      {tasks.length === 0 && (
        <p className="mt-4 text-white/70 italic">No tasks yet. Chill 😌</p>
      )}

      {/* Task list */}
      {tasks.length > 0 && (
        <ul className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-2 shadow-lg space-y-1">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-transparent px-4 py-2 hover:bg-white/10 transition rounded-md"
            >
              <span className="text-white">{task.text}</span>
              <Button
                onClick={() => onDelete(task.id)}
                className="px-5 py-3 rounded-full bg-[#131313] text-white hover:bg-black/70 shadow-md transition-all duration-200 font-semibold"
              >
                Clear
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
