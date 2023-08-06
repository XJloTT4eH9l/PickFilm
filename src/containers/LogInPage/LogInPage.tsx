import Form from "../../components/Form/Form";
import './LogInPage.scss';

const LogInPage = () => {
    return (
        <section className="login-page">
            <div className="container">
                <div className="login-page__inner">
                    <Form type='Login' />
                </div>
            </div>
        </section>
    )
}

export default LogInPage