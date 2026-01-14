import noProjectImg from "../assets/logo.png";
import Button from "./Button";

export default function NoProjects({ onStartAddProject }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 ">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center shadow-lg border border-black/90">
        <img
          src={noProjectImg}
          alt="girl with no projects written on paper"
          className="w-32 h-32 object-contain mx-auto rounded-lg mb-6"
        />
        <h2 className="text-3xl font-bold text-white mb-3">
          No Project Selected
        </h2>
        <p className="text-white/70 mb-6 max-w-xs">
          Select a project from the sidebar or start a new one to get going!
        </p>
        <Button onClick={onStartAddProject} className="w-full max-w-xs">
          Create Project
        </Button>
      </div>
    </div>
  );
}
