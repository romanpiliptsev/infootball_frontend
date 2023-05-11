import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

const SignIn = () => {
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    })
    const [error, setError] = useState(false)
    const navigate = useNavigate();
    let fetchResponse = {}

    function signInFun(e) {
        e.preventDefault()

        fetch("https://infootball-backend.onrender.com/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })
            .then(resp => resp.json())
            .then(data => {
                // setRes(data)
                fetchResponse = data
                console.log(data)
                console.log(fetchResponse)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setUserData({
                    username: '',
                    password: ''
                })
                if (fetchResponse.error) {
                    setError(true)
                } else {
                    window.localStorage.setItem('token', fetchResponse.token);
                    navigate("/profile")
                }
            })
    }

    return (
        <div className="sign-in">
            <div className="sign-in__box">
                <h3 className="sign-in__title">
                    Вход в аккаунт
                </h3>
                {!error ? <></> : <p className="sign-in__error-message">Неверный логин или пароль</p>}
                <form onSubmit={signInFun} className="sign-in__form">
                    <input required className="sign-in__input"
                           type="text"
                           name="username"
                           value={userData.username}
                           onChange={(el) => {
                               setUserData(prevState => ({...prevState, username: el.target.value}))
                           }}
                           placeholder="Введите логин"/>
                    <input required className="sign-in__input"
                           type="password"
                           name="password"
                           value={userData.password}
                           onChange={(el) => {
                               setUserData(prevState => ({...prevState, password: el.target.value}))
                           }}
                           placeholder="Введите пароль"/>
                    <button className="sign-in__button" type="submit">Вход</button>
                </form>
                <p className="sign-in__text">
                    <Link className="sign-in__link" to={"/registration"}>Зарегистрироваться</Link>
                </p>
            </div>
        </div>
    )
}

export default SignIn