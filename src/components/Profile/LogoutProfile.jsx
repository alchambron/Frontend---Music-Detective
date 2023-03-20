import React from 'react'

export default function LogoutProfile({handleClickLogOut}) {
    return (
      <div className="account__logged__buttons__logout">
        <button onClick={handleClickLogOut}>Se déconnecter</button>
      </div>
    );
}