import {Navigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ErrorPage from "../Other/ErrorPage";
import Loader from "../Other/Loader";
import Team from "./Team";
import Image from "../Other/Image";

const Standings = () => {
    const {code} = useParams()
    const allowedLeagues = ['BL1', 'PD', 'DED', 'PL', 'FL1', 'SA', 'PPL']
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [err, setErr] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            fetch(`http://localhost:8080/standings/${code}`)
                .then(resp => resp.json())
                .then(data => {
                    setData(data.standings[0].table)
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
        return (<Navigate to={'/leagues/BL1'}/>)
    }

    return (
        <>
            {
                err ? <ErrorPage/> :
                    loading ? <Loader/> :
                        <div className="standings__box">
                            <div className="standings__titles-box">
                                <div className="standings__titles">
                                    <p className="team__position">№</p>
                                    <Image className="team__emblem"/>
                                    <p className={window.localStorage.getItem('token') ? "team__name" : "team__name-unauthorized"}>
                                        КОМАНДА
                                    </p>
                                    <ul className="team-stats__list">
                                        <li className="team-stats__item">И</li>
                                        <li className="team-stats__item">В</li>
                                        <li className="team-stats__item">Н</li>
                                        <li className="team-stats__item">П</li>
                                        <li className="team-stats__item">ГЗ</li>
                                        <li className="team-stats__item">ГП</li>
                                        <li className="team-stats__item">РГ</li>
                                        <li className="team-stats__item team-stats__item-bold">О</li>
                                    </ul>
                                    <div className="team__form">ФОРМА</div>
                                    {window.localStorage.getItem('token') ?
                                        <div className="team__follow-button">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                 className="team__follow-pic-h" x="0px" y="0px"
                                                 viewBox="0 0 122.88 107.68">
                                                <path
                                                    d="M61.43,13.53C66.76,7.51,72.8,3.69,78.96,1.69c6.48-2.1,13.07-2.15,19.09-0.6c6.05,1.55,11.52,4.72,15.74,9.03 c5.58,5.7,9.09,13.36,9.09,22.02c0,13.7-6.6,26.75-17.42,39.37c-10.14,11.83-24.05,23.35-39.61,34.73 c-2.58,1.89-5.98,1.88-8.5,0.22l0,0.01l-0.03-0.02l0,0.01l-0.02-0.01l-0.21-0.15c-4.46-2.92-8.75-5.91-12.8-8.94 c-4.05-3.03-8.01-6.22-11.83-9.56C12.58,70.42,0,51.4,0,32.13c0-8.8,3.44-16.44,8.93-22.08c4.25-4.37,9.73-7.51,15.79-9.03V1.02 c5.99-1.5,12.57-1.4,19.05,0.69C49.99,3.71,56.09,7.54,61.43,13.53L61.43,13.53L61.43,13.53z M83.51,15.87 C78.02,17.65,72.51,22.02,68,29.78c-0.63,1.19-1.6,2.21-2.85,2.93c-3.56,2.05-8.11,0.82-10.15-2.74 c-4.5-7.82-10.14-12.27-15.78-14.08c-3.71-1.19-7.46-1.25-10.88-0.4l0,0l-0.02,0c-3.35,0.83-6.37,2.56-8.7,4.95 c-2.87,2.95-4.67,7-4.67,11.7c0,14.53,10.59,29.82,27.3,44.43c3.28,2.87,6.95,5.82,10.95,8.81c2.61,1.96,5.35,3.92,8.04,5.74 c13.03-9.76,24.53-19.53,32.9-29.3c8.58-10,13.8-19.92,13.8-29.68c0-4.55-1.84-8.58-4.76-11.57c-2.38-2.42-5.43-4.2-8.8-5.06 C90.98,14.63,87.23,14.67,83.51,15.87L83.51,15.87L83.51,15.87z"/>
                                            </svg>
                                        </div> :
                                        <></>
                                    }
                                </div>
                            </div>
                            {data.map((e, id) => <Team team={e} key={id}/>)}
                        </div>
            }
        </>
    )
}

export default Standings