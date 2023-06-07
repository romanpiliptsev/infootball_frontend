import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Loader from "../Other/Loader";
import Image from "../Other/Image";
import success from "../../images/success.svg";
import warning from "../../images/warning.svg";

// https://infootball-backend.onrender.com/user/activate/${currentPathName}

const ActivateAccount = () => {
    const location = useLocation()
    const currentPathName = location.pathname.toString().split("/")[2]
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            fetch(`https://infootball-backend.onrender.com/user/activate/${currentPathName}`, {
                method: 'PUT'
            })
                .then(resp => resp.json())
                .then(data => {
                    setData(data)
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }, 800)
    }, [currentPathName])
    return (
        loading ? <Loader/> :
            data.error || data === false ?
                <div className="activate__box">
                    <Image src={warning} className="activate__image" alt="Warning"/>
                    <h2 className="activate__heading">
                        Код активации не найден
                    </h2>
                </div> :
                <div className="activate__box">
                    <Image src={success} className="activate__image" alt="Success"/>
                    <h2 className="activate__heading">
                        Ваш аккаунт успешно активирован
                    </h2>
                </div>
    )
}

export default ActivateAccount