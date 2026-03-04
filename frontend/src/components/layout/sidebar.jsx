export default function SideBar({children,className=""}){
    return (
        <div className={"bg-white   ml-10 mt-10 p-3 rounded-2xl h-full  shadow-md "+className}>
            {children}

        </div>
    )
}