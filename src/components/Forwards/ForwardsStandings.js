import {Navigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ErrorPage from "../Other/ErrorPage";
import Loader from "../Other/Loader";
import Image from "../Other/Image";
import Player from "./Player";
import logo from "../../images/infootball_logo.png"

const ForwardsStandings = () => {
    const {code} = useParams()
    const allowedLeagues = ['BL1', 'PD', 'DED', 'PL', 'FL1', 'SA', 'PPL']
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [err, setErr] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            fetch(`http://localhost:8080/scorers/${code}`)
                .then(resp => resp.json())
                .then(data => {
                    setData(data.scorers)
                })
                .catch(err => {
                    setErr(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }, 1000)
    }, [code])

    if (allowedLeagues.indexOf(code) === -1) {
        return (<Navigate to={'/forwards/BL1'} />)
    }

    return (
        <>
            {
                err ? <ErrorPage/> :
                    loading ? <Loader/> :
                        <div className="forwards__box">
                            <div className="forwards__header">
                                <div className="player player__titles">
                                    <p className="player__position">№</p>
                                    <p className="player__name">ИМЯ ИГРОКА</p>
                                    <div className="player__team">
                                        <Image src={logo} alt="team emblem" className="team__emblem"/>
                                        <p className="player__team-name">КОМАНДА</p>
                                    </div>
                                    <p className="player__goals">Г</p>
                                    <p className="player__goals">А</p>
                                    <p className="player__goals">ПЕН</p>
                                </div>
                            </div>
                            {data.map((e, id) => <Player key={id} player={e} position={id+1} />)}
                        </div>
            }
        </>
    )
}

export default ForwardsStandings