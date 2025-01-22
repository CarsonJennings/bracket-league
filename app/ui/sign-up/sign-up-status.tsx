import { State } from '@/app/lib/actions';

export default function SignUpStatus({ signUpState }: {signUpState: State}) {
    // Check if there were any errors
    if (Object.keys(signUpState.errors).length === 0) {
        if (signUpState.message) {
            return (
                <div className='text-center bg-green-300 rounded-lg p-2 mt-6'>
                    <p>
                        {signUpState.message}
                    </p>
                </div>
            );
        }
        // If no error and no message don't return anything
        return;
    }
    
    return (
        <div className='bg-red-400 rounded-lg p-2 mt-6 text-sm'>
            <p>
                {signUpState.message} <br /> <br />
                { signUpState.errors.password } { signUpState.errors.password ? <br /> : null}
                { signUpState.errors.confirmPassword } { signUpState.errors.confirmPassword ? <br /> : null}
                { signUpState.errors.firstName } { signUpState.errors.firstName ? <br /> : null}
                { signUpState.errors.lastName } { signUpState.errors.lastName ? <br /> : null}
                { signUpState.errors.email } { signUpState.errors.email ? <br /> : null}

            </p>
        </div>
    );
}