import Image from "../Other/Image";
import {useEffect, useState} from "react";

const Team = (props) => {
    const {team} = props
    const form = team.form.split(',')
    const [followedTeams, setFollowedTeams] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/team/list", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": window.localStorage.getItem('token')
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setFollowedTeams(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [followedTeams])

    function followTeam() {
        followedTeams.pop()
        fetch("http://localhost:8080/team/follow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": window.localStorage.getItem('token')
            },
            body: JSON.stringify({
                teamCode: team.team.id,
                teamName: team.team.name,
                teamEmblemLink: team.team.crest
            })
        })
            .then(resp => resp.text())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function unfollowTeam() {
        let teamId = 0
        followedTeams.forEach((el) => {
            if (+el.teamCode === team.team.id) {
                teamId = el.teamId
            }
        })

        fetch(`http://localhost:8080/team/delete/${teamId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": window.localStorage.getItem('token')
            }
        })
            .then(resp => resp.text())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                followedTeams.pop()
            })
    }

    const isFollowed = () => {
        let result = false
        followedTeams.forEach((el) => {
            if (+el.teamCode === team.team.id) {
                result = true
            }
        })
        return result
    }

    return (
        <div className="team">
            <p className="team__position">
                {team.position}
            </p>
            <Image src={team.team.crest} alt="team logo" className="team__emblem" />
            <p className={window.localStorage.getItem('token') ? "team__name" : "team__name-unauthorized"}>
                {team.team.name}
            </p>
            <ul className="team-stats__list">
                <li className="team-stats__item">{team.playedGames}</li>
                <li className="team-stats__item">{team.won}</li>
                <li className="team-stats__item">{team.draw}</li>
                <li className="team-stats__item">{team.lost}</li>
                <li className="team-stats__item">{team.goalsFor}</li>
                <li className="team-stats__item">{team.goalsAgainst}</li>
                <li className="team-stats__item">{team.goalDifference}</li>
                <li className="team-stats__item team-stats__item-bold">{team.points}</li>
            </ul>
            <ul className="team-form__list">
                {form.map((e, id) =>
                    e === 'W' ? <li key={id} className="team-form__item team-form__item-W">{e}</li> : (
                        e === 'D' ? <li key={id} className="team-form__item team-form__item-D">{e}</li> :
                            <li key={id} className="team-form__item team-form__item-L">{e}</li>
                    )
                )}
            </ul>
            {window.localStorage.getItem('token') ?
                <button className="team__follow-button"
                        onClick={ (followedTeams.length > 0 && isFollowed()) ? unfollowTeam : followTeam}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                         className={(followedTeams.length > 0 && isFollowed()) ? "team__followed-pic" : "team__follow-pic"} viewBox="0 0 122.88 107.68" x="0px" y="0px">
                        <path
                            d="M61.43,13.53C66.76,7.51,72.8,3.69,78.96,1.69c6.48-2.1,13.07-2.15,19.09-0.6c6.05,1.55,11.52,4.72,15.74,9.03 c5.58,5.7,9.09,13.36,9.09,22.02c0,13.7-6.6,26.75-17.42,39.37c-10.14,11.83-24.05,23.35-39.61,34.73 c-2.58,1.89-5.98,1.88-8.5,0.22l0,0.01l-0.03-0.02l0,0.01l-0.02-0.01l-0.21-0.15c-4.46-2.92-8.75-5.91-12.8-8.94 c-4.05-3.03-8.01-6.22-11.83-9.56C12.58,70.42,0,51.4,0,32.13c0-8.8,3.44-16.44,8.93-22.08c4.25-4.37,9.73-7.51,15.79-9.03V1.02 c5.99-1.5,12.57-1.4,19.05,0.69C49.99,3.71,56.09,7.54,61.43,13.53L61.43,13.53L61.43,13.53z M83.51,15.87 C78.02,17.65,72.51,22.02,68,29.78c-0.63,1.19-1.6,2.21-2.85,2.93c-3.56,2.05-8.11,0.82-10.15-2.74 c-4.5-7.82-10.14-12.27-15.78-14.08c-3.71-1.19-7.46-1.25-10.88-0.4l0,0l-0.02,0c-3.35,0.83-6.37,2.56-8.7,4.95 c-2.87,2.95-4.67,7-4.67,11.7c0,14.53,10.59,29.82,27.3,44.43c3.28,2.87,6.95,5.82,10.95,8.81c2.61,1.96,5.35,3.92,8.04,5.74 c13.03-9.76,24.53-19.53,32.9-29.3c8.58-10,13.8-19.92,13.8-29.68c0-4.55-1.84-8.58-4.76-11.57c-2.38-2.42-5.43-4.2-8.8-5.06 C90.98,14.63,87.23,14.67,83.51,15.87L83.51,15.87L83.51,15.87z"/>
                    </svg>
                </button> :
                <></>
            }
        </div>
    )
}

export default Team