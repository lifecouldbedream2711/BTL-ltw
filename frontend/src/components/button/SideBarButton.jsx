export default function SideBarButton({
  children,
  className = "",
  onClick,
  active = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex w-full items-center gap-3 p-3 rounded-md hover:text-blue-500 " +
        (active ? "bg-[#C7EBEE] " : "") +
        className
      }
    >
      {children}
    </button>
  );
}