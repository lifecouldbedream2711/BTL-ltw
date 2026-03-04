export default function SubButton({ text, children, onClick, disabled = false, className = "" }) {
  return (
    <button

      onClick={onClick}
      disabled={disabled}
      className={
        "bg-[#0EA4B5] h-12 w-[80%] text-white mx-[10%] rounded-md mb-1 hover:cursor-pointer " +
        className
      } 
    >
      {text}{children}
    </button>
  );
}