import '../../style/matchLoadStyle.css'

const MatchLoad = (props) => {
    const {status} = props
    let style = ''
    if (status === 'IN_PLAY') {
        style = 'loader-pulse green'
    } else {
        style = 'loader-pulse orange'
    }
    return (
        <div className="item">
            <div className={style}></div>
        </div>
    )
}

export default MatchLoad