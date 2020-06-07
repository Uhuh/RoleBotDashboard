import * as React from 'react';
import styled from 'styled-components';
import { Guild } from './interfaces';
import { Avatar } from '../nav/navbar';
import DiscordAPI from '../../api/api';
import emojis from './emojis';
import Twemoji from 'react-twemoji';
import { GuildEmojiManager, RoleManager, Role, Emoji } from 'discord.js';

const MissingGuild = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  .missingDialog {
    margin: auto;
    width: max-content;
    padding: 15px 30px 30px;
    color: #718096;
    font-size: 20px;
    border: solid 2px grey;
    text-align: center;
    background-color: #1a1c20;
    .center {
      display: flex;
      align-items: center;
    }
    .guildName {
      color: #e2e8f0;
    }
    a {
      text-decoration: none;
      color: #e2e8f0;
    }
  }
`;

const Area = styled.div`
  padding: 20px 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .title {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
  }
  span {
    color: #718096;
  }
  .missingGuild {
    ${MissingGuild} {
      justify-content: center;
    }
  }
`;

const ReactionRelation = styled.div`
  background-color: #1a1c20;
  padding: 25px;
  width: 45%;
  height: 45vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
  .header {
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
    justify-content: space-around;
    border-bottom: 2px solid grey;
    margin-bottom: 17px;
  }
  .content {
    display: flex;
    flex-direction: row;
    overflow-y: hidden;
    img {
      transition: transform 0.2s;
      margin: 5px;
      height: 32px;
      width: 32px;
    }
    img:hover {
      transform: scale(1.5);
    }
    .column {
      position: relative;
      overflow-y: auto;
      overflow-x: hidden;
      height: 100%;
      width: 50%;
    }
    .roles {
      display: flex;
      flex-wrap: wrap;
    }
    .emojis {
      margin-left: 10px;
    }
    .emojiTitle {
      font-size: 20px;
      display: flex;
      justify-content: center;
    }
    .twemoji {
      display: inline-block;
    }
  }
  .footer {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

const RoleName = styled.div`
  color: #718096;
  list-style-type: none;
  border: solid 2px ${props => props.color || '#718096' };
  border-radius: 10%;
  width: fit-content !important;
  margin: 5px;
  padding: 5px 10px;
  font-size: 18px;
  transition: transform 0.2s;
  &:hover {
    color: ${props => props.color || 'white' };
    background-color: #718096;
    transform: scale(1.2);
  }
`;

const RoleEmoji = styled.div`
  color: #718096;
  font-size: 18px;
  border: 2px solid ${props => props.color || '#718096'};
  padding: 8px;
  border-radius: 10%;
  img {
    width: 18px;
    height: 18px;
    padding-left: 10px;
  }
`;

const OutlineBtn = styled.button`
  color: #718096;
  border: 2px solid #718096;
  background-color: transparent;
  font-size: 18px;
  padding: 8px;
  border-radius: 10%;
  transition: background-color 0.3s;
  &:hover {
    background-color: grey;
    color: #e2e8f0;
    border: 2px solid #e2e8f0;
  }
`;

const GuildInfo = (props: {guild: Guild}) => {
  const { guild } = props;
  const [loading, setLoad] = React.useState(true);
  const [userGuild, setGuild] = React.useState<any>();
  const [guildEmojis, setEmojis] = React.useState<GuildEmojiManager | undefined>();
  const [guildRoles, setRoles] = React.useState<RoleManager | undefined>();
  const [reactRoles, setReactRoles] = React.useState<any>();
  const [role, setRole] = React.useState<Role>();
  const [emoji, setEmoji] = React.useState<Emoji | string>();
  const docUrl = 'https://app.gitbook.com/@duwtgb/s/rolebot/';
  const emojiUrl ='https://cdn.discordapp.com/emojis/';
  const inviteUrl = `https://discordapp.com/oauth2/authorize?client_id=493668628361904139&guild_id=${guild.id}&scope=bot&permissions=269315264`;

  React.useEffect(() => {
    setTimeout(() => {
      const botGuild = DiscordAPI.getGuild(guild.id);
      setGuild(botGuild);
      setRoles(botGuild?.roles);
      setEmojis(botGuild?.emojis);
      setLoad(false);
    }, 1000);
  }, []);

  if(loading) {
    return (
      <MissingGuild>Loading guild data....</MissingGuild>
    );
  }
    
  return (
    <>
      {
      userGuild ?
      <Area>
        <div className='title'>{guild.name}</div>
        <ReactionRelation>
          <div className='header'>
            <span>Roles</span>
            <span>Emojis</span>
          </div>
          <div className='content'>
            <div className='roles column'>
              {
                (guildRoles && guildRoles.cache.size) ? 
                guildRoles.cache.sort((r, rb) => r.position - rb.position).map(r => 
                  <RoleName 
                    color={r.hexColor} 
                    onClick={() => setRole(r)}
                    key={r.id}
                  >
                    {r.name}
                  </RoleName>
                ) 
                : 
                <span>No roles. :)</span>
              }
            </div>
            <div className='column emojis'>
              <>
              {(guildEmojis && guildEmojis.cache.size &&
                <>
                  <span className='emojiTitle'>Custom Emojis</span>
                  {
                    guildEmojis.cache.map(e => 
                      <img 
                        src={`${emojiUrl}${e.id}${e.animated ? '.gif': '.png'}`}
                        onClick={() => setEmoji(e)}
                        title={e.name}
                        key={e.id}
                      />
                    )
                  }
                </>
              )}
                <span className='emojiTitle'>Unicode Emojis</span>
                {
                  emojis.map((e, i) => 
                    <Twemoji
                      key={`${e}-${i}`}
                      className='twemoji'
                      onClick={() => {
                        setEmoji(e);
                      }}
                    >
                      {e}
                    </Twemoji>  
                  )
                }
              </>
            </div>
          </div>
          <div className='footer'>
            <RoleEmoji color={role?.hexColor}>
              {role ? role.name : 'Role Name'}
              { 
                emoji ? 
                (emoji instanceof Emoji) ? 
                  <img 
                    src={`${emojiUrl}${emoji.id}${emoji.animated ? '.gif': '.png'}`} 
                    title={emoji.name}
                  /> :
                  <Twemoji
                    style={{display: 'inline'}}
                  >
                    {emoji}
                  </Twemoji>  
                :
                <img 
                  src={'https://cdn.discordapp.com/avatars/493668628361904139/4785b50379b52116b3522e4533ce8396.webp'} 
                />
              }
            </RoleEmoji>
            <OutlineBtn disabled={!emoji || !role}>SUBMIT</OutlineBtn>
          </div>
        </ReactionRelation>

        <div>
          <p>Reaction Roles here :)</p>
        </div>
      </Area> :
      <MissingGuild>
        <div className='missingDialog'>
          <div className='missingGuild center'>
            <Avatar
              src={'https://cdn.discordapp.com/avatars/493668628361904139/4785b50379b52116b3522e4533ce8396.webp'}
            />
            <span>
              It seems I'm not in {' '}
              <span className='guildName'>
                {guild.name}
              </span>! 
              You should invite me.
            </span>
          </div>
          <div style={{}}>
            You can <a target='_blank' href={inviteUrl}>invite me here</a> and{' '}
            <a target='_blank' href={docUrl}>here is my documentation!</a>
          </div>
        </div>
      </MissingGuild>
    }
    </>
  );
};

export default GuildInfo;