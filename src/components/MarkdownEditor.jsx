import { Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function MarkdownEditor({ value, setValue, isOpen, setIsOpen }) {
  const handleChange = async (newValue) => {
    setValue(newValue);
    await chrome.storage.local.set({ value: newValue });
  };

  return (
    <Transition
      show={isOpen}
      enter="transform transition ease-in-out duration-500 sm:duration-700"
      enterFrom="translate-y-full"
      enterTo="translate-y-0"
      leave="transform transition ease-in-out duration-500 sm:duration-700"
      leaveFrom="translate-y-0"
      leaveTo="translate-y-full"
      as={Fragment}
    >
      <textarea
        onChange={(ev) => handleChange(ev.target.value)}
        value={value}
        className="bg-zinc-900 fixed inset-0 outline-none p-5 resize-none"
        spellCheck={false}
      />
    </Transition>
  );
}
