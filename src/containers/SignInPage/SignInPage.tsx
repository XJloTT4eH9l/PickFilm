import Form from "../../components/Form/Form";
import './SignInPage.scss';

const SignInPage = () => {
    return (
        <section className="login-page">
            <div className="container">
                <div className="login-page__inner">
                    <Form type='Signin' />
                </div>
            </div>
        </section>
    )
}

export default SignInPage