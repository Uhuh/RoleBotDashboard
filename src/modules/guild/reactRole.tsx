import * as React from 'react';
import styled from 'styled-components';
import Twemoji from 'react-twemoji';
import { IReactionRole } from './interfaces';

const RoleEmoji = styled.div`
  color: #718096;
  font-size: 18px;
  border: 2px solid ${props => props.color || '#718096'};
  padding: 8px;
  border-radius: 10%;
  height: fit-content;
  display: flex;
  margin: 5px;
  align-items: center;
  transition: none;
  img {
    transition: none;
    width: 18px !important;
    height: 18px !important;
    padding-left: 10px !important;
  }
`;

const ReactionRole = (props: {reactRole: IReactionRole}) => {
  const emojiUrl ='https://cdn.discordapp.com/emojis/';
  const { reactRole } = props;

  return (
    <RoleEmoji color={reactRole.role_color}>
      {reactRole.role_name || 'Role Name'}
      { 
        reactRole.emoji_id ? 
        !reactRole.isUnicode ? 
          <img 
            src={`${emojiUrl}${reactRole.emoji_id}${reactRole.animated ? '.gif': '.png'}`} 
            title={reactRole.emoji_name}
          /> :
          <Twemoji
            style={{display: 'inline'}}
          >
            {reactRole.emoji_name}
          </Twemoji>  
        :
        <img 
          src={'https://cdn.discordapp.com/avatars/493668628361904139/4785b50379b52116b3522e4533ce8396.webp'} 
        />
      }
    </RoleEmoji>
  );
}

export default ReactionRole;