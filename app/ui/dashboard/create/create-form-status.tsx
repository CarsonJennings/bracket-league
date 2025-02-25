import { CreateState } from "@/app/lib/definitions";

export default function CreateFormStatus({ state } : { state: CreateState }) {
    if (Object.keys(state.errors).length > 0) {
        return (
            <div className='bg-red-400 rounded-lg p-2 mt-6'>
                <h4 className="text-lg font-bold">
                    {state.message} <br /> <br />
                </h4>
                <p className="text-sm">
                { state.errors.league } { state.errors.league ? <br /> : null}
                { state.errors.bracket } { state.errors.bracket ? <br /> : null}
                { state.errors.name } { state.errors.name ? <br /> : null}
                { state.errors.description } { state.errors.description ? <br /> : null}
                { state.errors.start_date } { state.errors.start_date ? <br /> : null}
                { state.errors.end_date } { state.errors.end_date ? <br /> : null}
                </p>
            </div>
        );
    }
}