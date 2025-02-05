export default function StepsCard({header, text}: {header: string, text: string}) {
    return (
        <div className="bg-gray-200 p-5 rounded-xl flex-1 text-center">
            <h2 className="font-bold text-2xl mb-4">
                {header}
            </h2>
            <p>
                {text}
            </p>
        </div>
    );
}