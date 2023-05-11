import './style/reset.css';
import './style/App.css';
import logo from './images/infootball_logo.png'
import Image from "./components/Other/Image";
import MainNav from "./components/MainNav";
import {Link, Route, Routes} from "react-router-dom";
import ErrorPage from "./components/Other/ErrorPage";
import Leagues from "./components/Leagues/Leagues";
import MatchesPage from "./components/Matches/MatchesPage";
import SignIn from "./components/Auth/SignIn";
import Registration from "./components/Auth/Registration";
import Forwards from "./components/Forwards/Forwards";
import Profile from "./components/Profile/Profile";
import DeleteProfile from "./components/Profile/DeleteProfile";
import EditProfile from "./components/Profile/EditProfile";
import ActivateAccount from "./components/Auth/ActivateAccount";
import FollowedPage from "./components/Followed/FollowedPage";
import ActivationCodePage from "./components/Auth/ActivationCodePage";

function App() {
  return (
    <div className="App">
        <header className="header">
            <div className="header__logo-box">
                <Image src={logo} className="header__image" alt="Infootball logo"/>
                <h1 className="header__title">INFootball</h1>
            </div>
            <MainNav />
        </header>
        <main className="main">
            <Routes>
                <Route path="/" element={<MatchesPage />} />
                <Route path="/leagues" element={<Leagues />}>
                    <Route path=":code" element={<Leagues />} />
                </Route>
                <Route path="/followed" element={<FollowedPage />}>
                    <Route path=":code" element={<FollowedPage />} />
                </Route>
                <Route path="/forwards" element={<Forwards />}>
                    <Route path=":code" element={<Forwards />} />
                </Route>
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/user/*" element={<ActivateAccount />} />
                <Route path="/activation/mail" element={<ActivationCodePage />} />
                <Route path="/delete-acc" element={<DeleteProfile />} />
                <Route path="/edit-acc" element={<EditProfile />} />

                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </main>
    </div>
  );
}

export default App;
