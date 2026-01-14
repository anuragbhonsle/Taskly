import Tasks from "./Tasks";
import Button from "./Button";

export default function SelectedProject({
  project,
  tasks,
  onDelete,
  onAddTask,
  onDeleteTask,
}) {
  const formattedDate = new Date(project.duedate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <section className="flex-1 p-10 text-white">
      <header className="border-b border-white/20 pb-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <button
            onClick={onDelete}
            className="px-2 py-2 md:px-5 md:py-3 text-sm md:text-base font-semibold
        rounded-full bg-red-600 hover:bg-red-800 text-white hover:scale-105
        active:scale-95 active:shadow-inner
        transition-all duration-200"
          >
            Delete
          </button>
        </div>

        <p className="text-sm text-white/70 mt-1">{formattedDate}</p>

        <p className="mt-4 text-white/90 leading-relaxed">
          {project.description}
        </p>
      </header>

      <Tasks tasks={tasks} onAdd={onAddTask} onDelete={onDeleteTask} />
    </section>
  );
}
