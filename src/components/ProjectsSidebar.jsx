import Button from "./Button";

export default function ProjectsSidebar({
  projects,
  selectedProjectId,
  onStartAddProject,
  onSelectProject,
}) {
  return (
    <aside className="w-80 bg-white/10 backdrop-blur-sm text-white p-6 rounded-r-3xl shadow-lg flex flex-col border border-black/90">
      <h2 className="mb-6 text-xl font-bold uppercase tracking-wider text-white text-center">
        Your Projects
      </h2>

      <Button
        onClick={onStartAddProject}
        className="mb-6 w-full bg-[#131313] text-white hover:bg-black/70 transition shadow-sm"
      >
        Add Project
      </Button>

      <ul className="flex-1 space-y-3 overflow-y-auto px-2">
        {projects.map((project) => {
          const active = project.id === selectedProjectId;

          return (
            <li key={project.id}>
              <Button
                onClick={() => onSelectProject(project.id)}
                className={`
    w-full text-left px-4 py-2 rounded-full font-medium
    ${
      active
        ? "bg-[#010101] text-white"
        : "bg-[#000000] text-white hover:bg-[#41485e]"
    }
  `}
              >
                {project.title}
              </Button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
