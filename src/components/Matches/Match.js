import Image from "../Other/Image";
import Game from "./Game";
import moment from "moment/moment";

const Match = (props) => {
    const {match, setId, id, currentId, isDate} = props
    moment.locale('ru', {
        months : 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
        weekdays : 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_')
    });
    const date = moment(match.utcDate).utc(true).format("dddd, DD MMMM")

    return(
        <li className="matches__item">
            {isDate ?
                <div className="match__date-box">
                    <p className="match__date">{date}</p>
                </div> :
                <></>
            }
            <div className="matches__item-box">
                <div className="matches__item-heading">
                    <Image src={match.area.flag} alt="competition emblem" className="matches__item-emblem" />
                    <h3 className="matches__item-title">
                        <span className="matches__item-subtitle">{match.area.name}</span>
                        {match.competition.name}
                    </h3>
                </div>
            </div>
            <Game match={match} />
        </li>
    )
}

export default Match