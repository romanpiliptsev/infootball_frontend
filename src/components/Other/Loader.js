import '../../style/loader.css'

const Loader = () => {
    return (
        <div className="loader">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 66" height="100px" width="100px"
                 className="spinner">
                <circle stroke="url(#gradient)" r="20" cy="33" cx="33" stroke-width="1" fill="transparent"
                        className="path"></circle>
                <linearGradient id="gradient">
                    <stop stop-opacity="1" stop-color="#fe0000" offset="0%"></stop>
                    <stop stop-opacity="0" stop-color="#af3dff" offset="100%"></stop>
                </linearGradient>
            </svg>
        </div>
    )
}

export default Loader