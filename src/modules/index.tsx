import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DAPI from '../api/api';
import Nav from './nav/navbar';
import GuildList from './guild/guildList';
import GuildInfo from './guild/guild';
import Cookies from 'universal-cookie';
import styled from 'styled-components';
import { Guild } from './guild/interfaces';
const cookies = new Cookies();

const Body = styled.div`
  background-color: #22252a;
  height: 100%;
  width: 100vw;
  color: #e2e8f0;
  font-family: Roboto;
  font-size: 32px;
  .missing {
    width: 100%;
    text-align: center;
  }

  overflow-x: hidden;
  overflow-y: auto;

  a { text-decoration: none; }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }
  
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
  
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
  .mainBody {
    padding-top: 11vh;
  }
`;

const Missing = styled.div`
  text-align: center;
  padding: 250px;
`;

const App = () => {
  const [user, setUser] = React.useState<any>();
  const [guilds, setGuilds] = React.useState<any>();
  const [token, setToken] = React.useState<any>();
  const access_token = cookies.get('access_token');
  
  React.useEffect(() => {
    setToken(access_token);
    DAPI.getUser(access_token)
      .then((u: any) => setUser(u))
      .catch(() => console.error(`Couldn't fetch user from access_token.`));
    DAPI.userGuilds(access_token)
      .then((g: any) => setGuilds(g))
      .catch(() => console.error(`Couldn't fetch guild from access_token.`));
  }, [access_token]);

  return (
   <Body>
    <Nav user={user} token={token}/>
    <div className='mainBody'>
      <Switch>
        <Route
          exact
          path='/'
          key='home'
          render={({}) => {
            return (
              <>
                {
                  guilds ? <GuildList guilds={guilds} /> :
                  <Missing>Are you in any guilds?</Missing>
                }
              </>
            );
          }}
        />
        <Route
          exact
          path='/guild/:guildId'
          key='guildinfo'
          render={({match}) => {
            const gId = match.params.guildId;
            const guild = guilds ? guilds.find((g: Guild) => g.id == gId) : undefined;
            return (
              <>
                {
                  guild ? <GuildInfo guild={guild} /> :
                  <Missing>Unable to find guild!</Missing>
                }
              </>
            );
          }}
        />
        <Route
          path='/auth'
          key='auth'
          render={({match, location}) => {
            console.log(match, location);
            console.log()
            if(!access_token && !token) {
              DAPI.getUserData(location.search.substring(6))
                .then(info => {
                  setToken(info.access_token);
                  setUser(info.user);
                  setGuilds(info.guilds);
                  cookies.set(`access_token`, info.access_token, { path: '/' });
                  console.log(`Loaded data!`);
                });
            }

            return <Redirect to='/' />;
          }}
        />
      </Switch>
    </div>
   </Body>
  );
};

export default App;