export default function Background({ children, className = "" }){
    return (
        <div className={"bg-[#C7EBEE] w-full"+className}>
                {children}
        </div>
    );
}