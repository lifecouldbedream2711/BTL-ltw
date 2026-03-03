export default function SelectInput({Options=[],Id,ClassName=""}){
    return (
            <select
                className={
                    "border w-[90%] focus:outline-none focus:border-[#0EA4B5] h-11.5 mb-3 border-gray-300 p-1 shadow-md rounded-md px-[2%] "
                + ClassName} id={Id}>
                {Options.map((value) =>(
                    <option value={value} key={value}>{value}</option>
                ))
                }
                </select>
    );
}