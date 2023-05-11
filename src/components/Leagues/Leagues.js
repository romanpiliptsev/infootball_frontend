import {Link, useLocation} from "react-router-dom";
import Standings from "./Standings";
import Image from "../Other/Image";

const Leagues = () => {
    const location = useLocation()
    const currentPathName = location.pathname.toString().split("/")[2]

    const allowedLeagues = [
        {
            code: "BL1",
            name: "Bundesliga",
            flag: "https://crests.football-data.org/759.svg"
        },
        {
            code: "PD",
            name: "Primera Division",
            flag: "https://crests.football-data.org/760.svg"
        },
        {
            code: "DED",
            name: "Eredivisie",
            flag: "https://crests.football-data.org/8601.svg"
        },
        {
            code: "PL",
            name: "Premier League",
            flag: "https://crests.football-data.org/770.svg"
        },
        {
            code: "FL1",
            name: "Ligue 1",
            flag: "https://crests.football-data.org/773.svg"
        },
        {
            code: "SA",
            name: "Serie A",
            flag: "https://crests.football-data.org/784.svg"
        },
        {
            code: "PPL",
            name: "Primeira Liga",
            flag: "https://crests.football-data.org/765.svg"
        }
    ]

    return (
        <div className="leagues">
            <div className='leagues__list'>
                {
                    allowedLeagues.map((e, id) =>
                        <Link key={id} className={(currentPathName === e.code) ? "leagues__item leagues__item-current" : "leagues__item"} to={`${e.code}`}>
                            <Image src={e.flag} alt="flag" className="leagues__item-flag" />
                            {e.name}
                        </Link>
                    )
                }
            </div>
            <Standings />
        </div>
    )
}

export default Leagues