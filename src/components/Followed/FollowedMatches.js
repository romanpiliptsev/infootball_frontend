import {useEffect, useState} from "react";
import ErrorPage from "../Other/ErrorPage";
import Loader from "../Other/Loader";
import Match from "../Matches/Match";

const FollowedMatches = (props) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [err, setErr] = useState(false)
    const [matchesArrayId, setId] = useState(0)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            fetch(`https://infootball-backend.onrender.com/teams/${props.code}`, {
                headers: {
                    "Content-Type": "application/json",
                    "AUTHORIZATION": window.localStorage.getItem('token')
                }
            })
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
    }, [props.code])

    return (
        <>
            {err || !data ? <ErrorPage /> :
                loading ? <Loader /> :
                    data.length > 0 ?
                        <div className="matches__page">
                            <ul className="matches__list">
                                {data ? data.map((e, id) => <Match match={e} setId={setId} id={id} currentId={matchesArrayId} key={id} isDate={true} />) : <p>Сегодня нет игр</p>}
                            </ul>
                        </div> :
                        <p>Расход</p>
            }
        </>
    )
}

export default FollowedMatches