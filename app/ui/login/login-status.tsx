import { LoginState } from "@/app/lib/definitions";

export default function LoginStatus({ loginState }: {loginState: LoginState}) {
    // If there is errors display them. Otherwise user is redirected so no need to display anything else
    if (Object.keys(loginState.errors).length > 0) {
        return (
            <div className='bg-red-400 rounded-lg p-2 mt-6 text-sm'>
                <p>
                {loginState.message} <br /> <br />
                { loginState.errors.password } { loginState.errors.password ? <br /> : null}
                { loginState.errors.email } { loginState.errors.email ? <br /> : null}
                </p>
            </div>
        );
    }
}