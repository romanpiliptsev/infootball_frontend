import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Loader from "../Other/Loader";

const Profile = () => {
    const [data, setData] = useState({})
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
    const [followedTeams, setFollowedTeams] = useState([])

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            fetch("http://localhost:8080/user/get", {
                headers: {
                    "Content-Type": "application/json",
                    "AUTHORIZATION": window.localStorage.getItem('token')
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    setData(data)
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                    setErr(true)
                })
                .finally(() => {
                    setLoading(false)
                })
            fetch("http://localhost:8080/team/list", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "AUTHORIZATION": window.localStorage.getItem('token')
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    setFollowedTeams(data)
                })
                .catch(err => {
                    console.log(err)
                })
        }, 500)
    }, [])

    function logout() {
        window.localStorage.setItem('token', '')
        navigate("/login")
    }

    function goToEdit() {
        navigate("/edit-acc")
    }

    function goToDelete() {
        navigate("/delete-acc")
    }

    return (
        data.error || err ? navigate("/login") :
            loading ? <Loader/> :
                <div className="profile">

                    <div className="profile__card">
                        <h1 className="profile__username">Логин: {data.username}</h1>
                        <h2 className="profile__email">Почта: {data.email}</h2>
                    </div>
                    <div className="profile__edit">
                        <ul className="profile__edit-list">
                            <li className="profile__edit-item">
                                <div className="profile__edit-item-box">
                                    <h4 className="profile__edit-item-heading">
                                        Редактирование аккаунта
                                    </h4>
                                </div>
                                <button className="profile__edit-button" type="button" onClick={goToEdit}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="profile__edit-button-icon"
                                         viewBox="0 0 16 16">
                                        <path
                                            d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                        <path
                                            d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                                    </svg>
                                </button>
                            </li>
                            <li className="profile__edit-item-br"></li>
                            <li className="profile__edit-item">
                                <div className="profile__edit-item-box">
                                    <h4 className="profile__edit-item-heading">
                                        Удаление аккаунта
                                    </h4>
                                </div>
                                <button className="profile__edit-button" type="button" onClick={goToDelete}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="profile__edit-button-icon-d"
                                         viewBox="0 0 16 16">
                                        <path
                                            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <button className="profile__logout-button" type="button" onClick={logout}>Выйти</button>
                </div>
    )
}

export default Profile