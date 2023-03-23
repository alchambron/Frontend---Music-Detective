import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Sign from "../components/Log/Sign";
import DeleteProfile from "../components/Profile/DeleteProfil";
import LogoutProfile from "../components/Profile/LogoutProfile";
import { getUserProfile } from "../services/userService";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { logoutUser } from "../actions/userAction";
import UserStats from "../components/Profile/UserStats";

export default function Profile() {
  const dispatch = useDispatch();
  const token = Cookies.get("user_token");;
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const loggedUser = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    if (loggedUser?.id) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [loggedUser]);

  const fetchData = async () => {
    try {
      const user = await getUserProfile();
      setNickname(user.nickname);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickLogOut = () => {
    Cookies.remove("user_token");
    dispatch(logoutUser());
    const fetchDelete = async () => {
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/users/sign_out",
        params
      );
      const data = await response.json();
    };
    fetchDelete();
  };

  return (
    <>
      <div className="leave">
        <NavLink to="/">
          <p>Retour</p>
        </NavLink>
      </div>
      <div className="account">
        {!userLoggedIn ? (
          <>
            <div className="account__title">
              <h1>Inscrivez et sauvegarder vos progressions !</h1>
            </div>
            <Sign />
          </>
        ) : (
          <>
            <div className="account__logged">
              <div className="account__logged__subtitle">
                <p>Bienvenue sur votre profil {nickname}</p>
              </div>
              <div className="account__logged__buttons">
                <div className="account__logged__buttons__up">
                  <NavLink
                    className="account__logged__buttons__up__edit"
                    to="/profile/edit"
                  >
                    <button>Editer votre profil</button>
                  </NavLink>
                  <LogoutProfile handleClickLogOut={handleClickLogOut} />
                  <UserStats />
                </div>
                <div className="account__logged__buttons_down">
                  <DeleteProfile handleClickLogOut={handleClickLogOut} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="orange-background"></div>
    </>
  );
}
