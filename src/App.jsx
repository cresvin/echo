import MarkdownPreview from "@uiw/react-markdown-preview";
import { useEffect, useState } from "react";
import MarkdownEditor from "./components/MarkdownEditor";
import Shortcut from "./components/Shortcut";
import { DEFAULT_MARKDOWN_TEMPLATE } from "./constants";

export default function App() {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") {
        setIsOpen(false);
      } else if (ev.key.toLocaleLowerCase() === "e" && ev.ctrlKey) {
        ev.preventDefault();
        setIsOpen(true);
      }
    });

    const setValueFromStorage = async () => {
      const result = await chrome.storage.local.get("value");
      setValue(result.value || DEFAULT_MARKDOWN_TEMPLATE);
    };
    setValueFromStorage();

    return () => document.removeEventListener("keydown", () => {});
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen p-10">
      <MarkdownPreview
        source={value}
        style={{
          fontFamily: '"DM Sans", "sans-serif"',
        }}
        className="bg-transparent flex-1 prose prose-invert lg:prose-xl"
      />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed font-medium bottom-5 text-sm left-5 z-10 bg-white text-black hover:bg-white/90 px-4 py-2 rounded-md"
      >
        {isOpen ? (
          <Shortcut keys={["Escape"]} name="Close" />
        ) : (
          <Shortcut keys={["Ctrl", "E"]} name="Edit" />
        )}
      </button>
      <MarkdownEditor
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        value={value}
        setValue={setValue}
      />
      <a
        href="https://www.paypal.com/paypalme/cresvinn"
        target="_blank"
        className="fixed text-sm font-medium bottom-5 right-5 text-red-400 hover:underline underline-offset-4"
      >
        ❤️ Support me
      </a>
    </div>
  );
}
