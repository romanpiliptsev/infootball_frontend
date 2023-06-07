import {useEffect, useState} from "react";
import Match from "./Match";
import Loader from "../Other/Loader";
import ErrorPage from "../Other/ErrorPage";

const MatchesPage = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [err, setErr] = useState(false)
    const allowedLeagues = ['CL', 'BL1', 'PD', 'EC', 'DED', 'PL', 'FL1', 'SA', 'PPL']
    const validMatches = []
    const [matchesArrayId, setId] = useState(0)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            fetch("https://infootball-backend.onrender.com/matches")
                .then(resp => resp.json())
                .then(data => {
                    setData(data.matches)
                    console.log(data.matches)
                })
                .catch(err => {
                    setErr(err)
                    // console.log(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }, 500)
    }, [])

    data.forEach((item) => {
        if (allowedLeagues.indexOf(item.competition.code) !== -1) {
            validMatches.push(item)
        }
    })

    return(
        <>
            {err ? <ErrorPage /> :
                loading ? <Loader /> :
                    validMatches.length > 0 ?
                        <div className="matches__page">
                            <ul className="matches__list">
                                {validMatches ? validMatches.map((e, id) => <Match match={e} setId={setId} id={id} key={id} />) : <p>Сегодня нет игр</p>}
                            </ul>
                        </div> :
                        <p>Матчей нет</p>
            }
        </>
    )
}

export default MatchesPage