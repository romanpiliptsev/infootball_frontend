import Image from "../Other/Image";

const Player = ({player, position}) => {
    return (
        <div className="player">
            <p className="player__position">
                {position}
            </p>
            <p className="player__name">
                {player.player.name}
            </p>
            <div className="player__team">
                <Image src={player.team.crest} alt="team emblem" className="team__emblem"/>
                <p className="player__team-name">
                    {player.team.shortName}
                </p>
            </div>
            <p className="player__goals">
                {player.goals ? player.goals : 0}
            </p>
            <p className="player__goals">
                {player.assists ? player.assists : 0}
            </p>
            <p className="player__goals">
                {player.penalties ? player.penalties : 0}
            </p>
        </div>
    )
}

export default Player