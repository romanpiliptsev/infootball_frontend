import warning from "../../images/warning.svg"
import Image from "../Other/Image";
import {useNavigate} from "react-router-dom";

const DeleteProfile = () => {
    const navigate = useNavigate();
    function deleteAccount() {
        fetch("http://localhost:8080/user/remove", {
            method: "DELETE",
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
        window.localStorage.setItem('token', '')
        navigate("/login")
    }

    function goToProfile() {
        navigate("/profile")
    }

    return (
        <div className="profile__delete-wrap">
            <div className="profile__delete-box">
                <div className="profile__delete-back">
                    <button className="profile__delete-back-button" type="button" onClick={goToProfile}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="profile__delete-back-icon" viewBox="0 0 16 16">
                            <path
                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                    </button>
                </div>
                <Image src={warning} alt="warning" className="profile__delete-image" />
                <h3 className="profile__delete-title">
                    Внимание
                </h3>
                <p className="profile__delete-text">
                    После удаления восстановить аккаунт будет нельзя
                </p>
                <button className="profile__delete-button" type="button" onClick={deleteAccount}>Удалить</button>
            </div>
        </div>
    )
}

export default DeleteProfile