import Image from "./Image";
import errorImg from '../../images/error.svg'
const ErrorPage = () => {
    return (
        <div className="error">
            <Image src={errorImg} alt="Ошибка" className="error__image" />
            <p className="error__text">Что-то пошло не так...</p>
        </div>
    )
}

export default ErrorPage