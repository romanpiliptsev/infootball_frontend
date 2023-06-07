import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

const Registration = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [password, setPassword] = useState("")
    const [passwordEnable, setPasswordEnable] = useState(true)
    const [usernameEnable, setUsernameEnable] = useState(true)
    const navigate = useNavigate();

    function checkUsername(username) {
        fetch(`http://localhost:8080/user/check/${username}`)
            .then(resp => resp.text())
            .then(data => {
                if (data === "") {
                    setUsernameEnable(true)
                } else {
                    setUsernameEnable(false)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    function checkPassword(password1, password2) {
        if (password1 === password2) {
            setPasswordEnable(true)
        } else {
            setPasswordEnable(false)
        }
    }

    function registrationFun(e) {
        e.preventDefault()

        fetch("http://localhost:8080/user/registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                console.log(JSON.stringify(userData))
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setUserData({
                    username: '',
                    email: '',
                    password: ''
                })
                setPassword("")
                setPasswordEnable(true)
                setUsernameEnable(true)
                navigate("/activation/mail")
            })
    }

    function registrationDummy(e) {
        e.preventDefault()
    }

    return (
        <div className="sign-in">
            <div className="sign-in__box">
                <h3 className="sign-in__title">
                    Регистрация аккаунта
                </h3>
                <form
                    onSubmit={(passwordEnable === true && usernameEnable === true) ? registrationFun : registrationDummy}
                    className="sign-in__form">
                    <input required
                           className={usernameEnable ? "sign-in__input" : "sign-in__input sign-in__input-error"}
                           type="text"
                           name="username"
                           value={userData.username}
                           onChange={(el) => {
                               checkUsername(el.target.value)
                               setUserData(prevState => ({...prevState, username: el.target.value}))
                           }}
                           placeholder="Введите логин"/>
                    {usernameEnable ? <></> :
                        <p className="sign-in__error-message">Пользователь с таким именем уже существует</p>}
                    <input required className="sign-in__input"
                           type="email"
                           name="email"
                           value={userData.email}
                           onChange={(el) =>
                               setUserData(prevState => ({...prevState, email: el.target.value})
                               )}
                           placeholder="Введите email адрес"/>
                    <input required
                           className={passwordEnable ? "sign-in__input" : "sign-in__input sign-in__input-error"}
                           type="password"
                           name="password"
                           value={password}
                           onChange={(el) => {
                               setPassword(el.target.value)
                               if (userData.password !== "") {
                                   checkPassword(el.target.value, userData.password)
                               }
                           }}
                           placeholder="Введите пароль"/>
                    <input required
                           className={passwordEnable ? "sign-in__input" : "sign-in__input sign-in__input-error"}
                           type="password"
                           name="password"
                           value={userData.password}
                           onChange={(el) => {
                               // checkPassword(el.target.value)
                               setUserData(prevState => ({...prevState, password: el.target.value}))
                               if (password !== "") {
                                   checkPassword(password, el.target.value)
                               }
                           }}
                           placeholder="Введите пароль еще раз"/>
                    {passwordEnable ? <></> : <p className="sign-in__error-message">Пароли не совпали</p>}
                    <button className="sign-in__button" type="submit">Регистрация</button>
                </form>
                <p className="sign-in__text">
                    <Link className="sign-in__link" to={"/profile"}>Вход</Link>
                </p>
            </div>
        </div>
    )
}

export default Registration