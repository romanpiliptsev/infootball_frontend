import Image from "../Other/Image";

const Team = (props) => {
    const {team} = props

    return (
        <div className="live-score__team">
            <p className="live-score__team-name">
                {team.shortName}
            </p>
            <Image src={team.crest} alt="team logo" className="live-score__team-logo" />
        </div>
    )
}

export default Team