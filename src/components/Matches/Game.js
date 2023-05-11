import Image from "../Other/Image";
import MatchLoad from "./MatchLoad";
import moment from "moment";

const Game = (props) => {
    const {match} = props
    const time = moment(match.utcDate).utc(true).format("HH:mm")

    return (
        <div className="match">
            <p className="match__time">
                {time}
                {match.status === "FINISHED" ? <p className="match__status">Окончен</p> : null}
                {match.status === "PAUSED" ? <><MatchLoad status={match.status} /> <p className="match__status">Перерыв</p></>  : null}
                {match.status === "IN_PLAY" ? <MatchLoad status={match.status} /> : null}
            </p>
            <div className="match__teams-box">
                <p className="match__team">
                    <Image src={match.homeTeam.crest} alt="team crest" className="team__icon"/>
                    {match.homeTeam.name}
                </p>
                <p className="match__team">
                    <Image src={match.awayTeam.crest} alt="team crest" className="team__icon"/>
                    {match.awayTeam.name}
                </p>
            </div>
            <div className="match__score-box">
                <p className="match__score-home">
                    {match.score.fullTime.home !== null ? match.score.fullTime.home : '-'}
                </p>
                <p className="match__score-away">
                    {match.score.fullTime.away !== null ? match.score.fullTime.away : '-'}
                </p>
            </div>
        </div>
    )
}

export default Game