export default function StepsCard({header, text, borderColor = ""}: {header: string, text: string, borderColor?: string}) {
    if (borderColor !== "red" && borderColor !== "blue") {
        return (
            <div className="bg-gray-200 p-5 rounded-xl flex-1 text-center">
                <h2 className="font-bold text-2xl mb-4">
                    {header}
                </h2>
                <p>
                    {text}
                </p>
            </div>
        )
    }

    return (
        <div className={borderColor === "red" ? "bg-gray-200 p-5 rounded-xl flex-1 text-center border-4 border-red-500" : "bg-gray-200 p-5 rounded-xl flex-1 text-center border-4 border-blue-500"}>
            <h2 className="font-bold text-2xl mb-4">
                {header}
            </h2>
            <p>
                {text}
            </p>
        </div>
    );
}