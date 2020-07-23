import React from "react";
import "./AuthForm.styl"

class AuthForm extends React.Component {
    render() {
        return (
            <div className="AuthForm-container">
                <div className="AuthForm-logo">Telepuz</div>
                <div className="AuthForm-slogan">Алё, ну чё там с деньгами?</div>
                <div className="AuthForm-form">
                    <div className="AuthForm-label">Никнейм</div>
                    <input className="AuthForm-input"
                           placeholder="Кто мы с тобой орлы или вороны?"/>
                </div>
                <div className="AuthForm-button">Войти</div>
            </div>
        );
    }
}

export default AuthForm;