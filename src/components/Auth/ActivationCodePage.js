import Image from "../Other/Image";
import email from "../../images/email.svg";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const ActivationCodePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/login")
        }, 2000)
    }, [navigate])
    return (
        <div className="activate__box">
            <Image src={email} className="activate__image" alt="Success"/>
            <h2 className="activate__heading">
                Код активации отправлен
            </h2>
        </div>
    )
}

export default ActivationCodePage