import {Link, useLocation} from "react-router-dom";

const MainNav = () => {
    const location = useLocation()
    const currentPathName = location.pathname.toString().split("/")[1]

    return (
        <nav className="header__nav container" id="myNav">
            <Link className={(currentPathName === "") ? "header__text header__text-current" : "header__text"} to={"/"}>Сегодня</Link>
            <Link className={(currentPathName === "leagues") ? "header__text header__text-current" : "header__text"} to={"/leagues/BL1"}>Таблицы</Link>
            <Link className={(currentPathName === "forwards") ? "header__text header__text-current" : "header__text"} to={"/forwards/BL1"}>Голеадоры</Link>
            <Link className={(currentPathName === "followed") ? "header__text header__text-current" : "header__text"} to={"/followed"}>Избранное</Link>
            <Link className={(currentPathName === "profile" || currentPathName === "login" || currentPathName === "registration") ?
                "header__text header__text-current" : "header__text"} to={"/profile"}>Аккаунт</Link>
        </nav>
    )
}

export default MainNav