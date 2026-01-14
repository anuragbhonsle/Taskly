import Input from "./Input.jsx";
import { useRef } from "react";
import Modal from "./Modal.jsx";
import Button from "./Button.jsx";

export default function NewProject({ onAdd, onCancel }) {
  const modal = useRef();
  const input = useRef();
  const description = useRef();
  const duedate = useRef();

  function handleSave() {
    const enteredTitle = input.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = duedate.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      duedate: enteredDueDate,
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Close">
        <h2 className="text-xl font-bold text-[#061E29] mt-2 mb-2">
          Invalid Input
        </h2>
        <p className="text-[#000000] mb-2">
          Looks like you forgot to enter a value.
        </p>
        <p className="text-[#000000] mb-3">
          Make sure you provide a valid value for every input field.
        </p>
      </Modal>

      <div className="w-[35rem] mt-12 p-6 rounded-2xl bg-white/10 backdrop-blur-sm shadow-xl border border-black/90">
        <Input type="text" ref={input} label="Title" textarea={false} />
        <Input ref={description} label="Description" textarea={true} />
        <Input type="date" ref={duedate} label="Due Date" textarea={false} />

        <div className="flex justify-end gap-4 mt-4">
          <Button
            className="px-5 py-2 md:px-6 md:py-3 text-sm md:text-base font-semibold
        rounded-full bg-white/30 text-[#061E29] hover:bg-white/40 hover:scale-102
        active:scale-98 active:shadow-inner
        transition-all duration-200"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            className="px-4 py-2 rounded-full bg-[#131313] text-white hover:bg-black/70"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
