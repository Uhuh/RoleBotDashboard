import * as React from 'react';
import styled from 'styled-components';
import { User } from './interfaces';
import { Link } from 'react-router-dom';
import DAPI from '../../api/api';

export const Avatar = styled.img`
  border-radius: 50%;
  height: 64px;
  width: 64px;
  margin: 12px;
`;

const NavBar = styled.div`
  z-index: 1;
  background-color: #1a1c20;
  position: fixed;
  width: 100%;
  display: inline-block;
  transition: color 0.3s ease-in-out;
  ${Avatar}, a{
    float: right;
  }
  .username {
    float: right;
    padding: 32px 10px;
    font-size: 25px;
  }
  .pulse {
    transform: scale(1);
	  animation: pulse 2s infinite;
  }
  a {
    color: #718096;
    font-size: 25px;
    text-decoration: none;
    margin: 7px;
  }
  a:hover {
    color: #4b5666;
  }
`;

const NavBarItem = styled.div`
  float: left;
  text-transform: uppercase;
  a {
    margin: 0;
  }
  .navLink {
    display: block;
    text-align: center;
    font-size: 22px;
    padding: 32px 10px;
  }
`;

const Nav = (props: { user: User | undefined, token: string}) => {
  const { user, token } = props;
  const voteUrl = 'https://top.gg/bot/493668628361904139/vote';
  const supportUrl = 'https://discord.gg/nJBubXy';
  const docUrl = 'https://app.gitbook.com/@duwtgb/s/rolebot/';
  const inviteUrl = 'https://discordapp.com/oauth2/authorize?client_id=493668628361904139&scope=bot&permissions=269315264';
  const url = DAPI.discord_oauth.generateAuthUrl({
    scope: ["identify", "guilds"],
    state: crypto.getRandomValues(new Int16Array).toString(), // Be aware that randomBytes is sync if no callback is provided
  });

  return (
    <NavBar id='navbar'>
      <NavBarItem>
        <Link to='/'>
          <Avatar
            src={'https://cdn.discordapp.com/avatars/493668628361904139/4785b50379b52116b3522e4533ce8396.webp'}
          />
        </Link>
      </NavBarItem>
      <NavBarItem>
        <a className='navLink' target='_blank' href={inviteUrl}>
          Invite
        </a>
      </NavBarItem>
      <NavBarItem>
        <a className='navLink' target='_blank' href={supportUrl}>
          Support
        </a>
      </NavBarItem>
      <NavBarItem>
        <a className='navLink' target='_blank' href={docUrl}>
          Documentation
        </a>
      </NavBarItem>
      <NavBarItem>
        <a className='navLink' target='_blank' href={voteUrl}>
          Vote
        </a>
      </NavBarItem>
      { (token && user) ? 
        <>
          <Avatar
            className='pulse'
            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
          />
          <span className='username'>{user.username}</span>
        </>
        :
        <NavBarItem style={{float: 'right'}}>
          <a className='navLink' href={url}>Login</a>
        </NavBarItem>
      }
    </NavBar>
  )
};

export default Nav;