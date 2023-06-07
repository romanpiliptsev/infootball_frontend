import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const EditProfile = () => {
    const [password, setPassword] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [username, setUsername] = useState("")
    const [newUsername, setNewUsername] = useState("")
    const [email, setEmail] = useState("")
    const [passwordEnable, setPasswordEnable] = useState(true)
    const [usernameEnable, setUsernameEnable] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/user/get", {
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": window.localStorage.getItem('token')
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setUsername(data.username)
                setNewUsername(data.username)
                setEmail(data.email)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    function checkUsername(newUsername) {
        if (newUsername !== "")
            fetch(`http://localhost:8080/user/check/${newUsername}`)
                .then(resp => resp.text())
                .then(data => {
                    if (data === "" || username === newUsername) {
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

    function changeUsername(e) {
        e.preventDefault()

        fetch(`http://localhost:8080/user/update-username/${newUsername}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": window.localStorage.getItem('token')
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                goToProfile()
            })
    }

    function changeEmail(e) {
        e.preventDefault()

        fetch(`http://localhost:8080/user/update-email/${email}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": window.localStorage.getItem('token')
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                goToProfile()
            })
    }

    function changePassword(e) {
        fetch(`http://localhost:8080/user/update-password/${userPassword}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": window.localStorage.getItem('token')
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                goToProfile()
            })
    }

    function editDummy(e) {
        e.preventDefault()
    }

    function goToProfile() {
        navigate("/profile")
    }

    return (
        <div className="profile-edit">
            <div className="profile-edit__wrap">
                <h3 className="profile-edit__title">Изменение логина</h3>
                <form onSubmit={(usernameEnable === true) ? changeUsername : editDummy} className="profile-edit__form">
                    <input required className={usernameEnable && newUsername !== "" ? "sign-in__input" : "sign-in__input sign-in__input-error"}
                           type="text"
                           name="username"
                           value={newUsername}
                           onChange={(el) => {
                               checkUsername(el.target.value)
                               setNewUsername(el.target.value)
                           }}
                           placeholder="Введите логин"/>
                    {newUsername !== "" ? <></> : <p className="sign-in__error-message">Имя пользователя не может быть пустым</p>}
                    {usernameEnable ? <></> : <p className="sign-in__error-message">Пользователь с таким логином уже существует</p>}
                    <button className="profile-edit__button" type="submit">Изменить</button>
                </form>
                <h3 className="profile-edit__title">Изменение почты</h3>
                <form onSubmit={changeEmail} className="profile-edit__form">
                    <input required className="sign-in__input"
                           type="email"
                           name="email"
                           value={email}
                           onChange={(el) => {
                               setEmail(el.target.value)
                           }}
                           placeholder="Введите email"/>
                    <button className="profile-edit__button" type="submit">Изменить</button>
                </form>
                <h3 className="profile-edit__title">Изменение пароля</h3>
                <form onSubmit={(passwordEnable === true) ? changePassword : editDummy} className="profile-edit__form">
                    <input required className={passwordEnable ? "sign-in__input" : "sign-in__input sign-in__input-error"}
                           type="password"
                           name="password"
                           value={password}
                           onChange={(el) => {
                               setPassword(el.target.value)
                               if (userPassword !== "") {
                                   checkPassword(el.target.value, userPassword)
                               }
                           }}
                           placeholder="Введите пароль"/>
                    <input required className={passwordEnable ? "sign-in__input" : "sign-in__input sign-in__input-error"}
                           type="password"
                           name="password"
                           value={userPassword}
                           onChange={(el) => {
                               // checkPassword(el.target.value)
                               setUserPassword(el.target.value)
                               if (password !== "") {
                                   checkPassword(password, el.target.value)
                               }
                           }}
                           placeholder="Повторите пароль"/>
                    {passwordEnable ? <></> : <p className="sign-in__error-message">Разные пароли</p>}
                    <button className="profile-edit__button" type="submit">Изменить</button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile