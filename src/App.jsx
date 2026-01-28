// App.jsx
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

import NewProject from "./components/NewProject";
import NoProject from "./components/NoProjects";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";
import UserMenu from "./components/UserMenu";
import cat from "/public/bg.gif";

function App() {
  const navigate = useNavigate();

  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) navigate("/login");
      else fetchProjects(data.user.id);
    };
    checkUser();
  }, []);

  // Fetch projects & tasks for the user
  const fetchProjects = async (userId) => {
    const { data: projectsData } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    setProjectState((prev) => ({ ...prev, projects: projectsData || [] }));

    const projectIds = projectsData?.map((p) => p.id) || [];
    if (projectIds.length > 0) {
      const { data: tasksData } = await supabase
        .from("tasks")
        .select("*")
        .in("project_id", projectIds)
        .order("created_at", { ascending: true });

      setProjectState((prev) => ({ ...prev, tasks: tasksData || [] }));
    }
  };

  // Project Handlers
  const handleStartAddProject = () =>
    setProjectState((prev) => ({ ...prev, selectedProjectId: null }));

  const handleCancelAddProject = () =>
    setProjectState((prev) => ({ ...prev, selectedProjectId: undefined }));

  const handleAddProject = async (projectData) => {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user.id;

    const { data, error } = await supabase
      .from("projects")
      .insert([{ ...projectData, user_id: userId }])
      .select()
      .single();

    if (error) return alert(error.message);

    setProjectState((prev) => ({
      ...prev,
      projects: [...prev.projects, data],
      selectedProjectId: undefined,
    }));
  };

  const handleSelectProject = (id) =>
    setProjectState((prev) => ({ ...prev, selectedProjectId: id }));

  const handleDeleteProject = async () => {
    const projectId = projectState.selectedProjectId;
    if (!projectId) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);
    if (error) return alert(error.message);

    await supabase.from("tasks").delete().eq("project_id", projectId);

    setProjectState((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== projectId),
      tasks: prev.tasks.filter((t) => t.project_id !== projectId),
      selectedProjectId: undefined,
    }));
  };

  // Task Handlers
  const handleAddTask = async (text) => {
    const projectId = projectState.selectedProjectId;
    if (!projectId) return;

    //  Fetch current user ID
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user.id;

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        { text, project_id: projectId, user_id: userId, completed: false },
      ])
      .select()
      .single();

    if (error) return alert(error.message);

    setProjectState((prev) => ({
      ...prev,
      tasks: [...prev.tasks, data],
    }));
  };

  const handleDeleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) return alert(error.message);

    setProjectState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((t) => t.id !== id),
    }));
  };

  // Derived Data
  const selectedProject = projectState.projects.find(
    (p) => p.id === projectState.selectedProjectId,
  );

  const projectTasks = projectState.tasks.filter(
    (t) => t.project_id === projectState.selectedProjectId,
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
          src={cat}
          className="w-full h-full object-cover filter contrast-125 saturate-120 brightness-90"
        />
        <div className="absolute w-full h-full bg-black/40"></div>
      </div>
      <div className="absolute top-4 right-4 z-20">
        <UserMenu />
      </div>
      {/* Sidebar */}
      <ProjectsSidebar
        projects={projectState.projects}
        selectedProjectId={projectState.selectedProjectId}
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
      />

      {/* Main Content */}
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
