// App.jsx
import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProject from "./components/NoProjects";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleStartAddProject() {
    setProjectState((prev) => ({
      ...prev,
      selectedProjectId: null,
    }));
  }

  function handleCancelAddProject() {
    setProjectState((prev) => ({
      ...prev,
      selectedProjectId: undefined,
    }));
  }

  function handleAddProject(projectData) {
    setProjectState((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...projectData, id: Math.random() }],
      selectedProjectId: undefined,
    }));
  }

  function handleSelectProject(id) {
    setProjectState((prev) => ({
      ...prev,
      selectedProjectId: id,
    }));
  }

  function handleDeleteProject() {
    setProjectState((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== prev.selectedProjectId),
      tasks: prev.tasks.filter((t) => t.projectId !== prev.selectedProjectId),
      selectedProjectId: undefined,
    }));
  }

  function handleAddTask(text) {
    setProjectState((prev) => ({
      ...prev,
      tasks: [
        ...prev.tasks,
        {
          id: Math.random(),
          text,
          projectId: prev.selectedProjectId,
        },
      ],
    }));
  }

  function handleDeleteTask(id) {
    setProjectState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((t) => t.id !== id),
    }));
  }

  const selectedProject = projectState.projects.find(
    (p) => p.id === projectState.selectedProjectId
  );

  const projectTasks = projectState.tasks.filter(
    (t) => t.projectId === projectState.selectedProjectId
  );

  const isNoProject = projectState.selectedProjectId === undefined;
  const isAddingProject = projectState.selectedProjectId === null;

  let content = <NoProject onStartAddProject={handleStartAddProject} />;

  if (isAddingProject) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (selectedProject) {
    content = (
      <SelectedProject
        project={selectedProject}
        tasks={projectTasks}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
      />
    );
  }

  return (
    <div className="w-screen h-screen relative flex">
      {/* Background GIF with filter */}
      <div className="absolute w-full h-full overflow-hidden">
        <img
          src="https://i.pinimg.com/originals/fe/e9/55/fee955a4c443424dd55cf8239698291f.gif"
          className="w-full h-full object-cover filter contrast-125 saturate-120 brightness-90"
        />
        {/* Overlay for dim / tint */}
        <div className="absolute w-full h-full bg-black/40"></div>
      </div>

      {/* Content */}
      <ProjectsSidebar
        projects={projectState.projects}
        selectedProjectId={projectState.selectedProjectId}
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
      />

      <div className="flex-1 p-6 overflow-auto relative z-10">
        {isNoProject ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-md">{content}</div>
          </div>
        ) : (
          <div className="w-full max-w-4xl">{content}</div>
        )}
      </div>
    </div>
  );
}

export default App;
