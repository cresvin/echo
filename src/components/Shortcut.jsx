export default function Shortcut({ name, keys }) {
  return (
    <>
      <span className="mr-2">{name}</span>
      <kbd>{keys.join("+")}</kbd>
    </>
  );
}
