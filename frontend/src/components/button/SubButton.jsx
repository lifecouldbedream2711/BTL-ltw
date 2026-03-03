export default function SubButton({ text, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={
        "bg-[#0EA4B5] h-12 w-[80%] text-white mx-[10%] rounded-md mb-1 " +
        className
      } 
    >
      {text}
    </button>
  );
}