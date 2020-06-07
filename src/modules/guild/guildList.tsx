import * as React from 'react';
import styled from 'styled-components';
import { Guild } from './interfaces';
import GuildIcon from './guildCard';

const Body = styled.div`
  text-align: center;
  .header {
    width: 100%;
    margin: 25px 0;
  }
`;

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 50px;
  flex-wrap: wrap;
  span {
    color: #718096;
  }
`;

const GuildList = (props: {guilds: Guild[]}) => {
  const { guilds } = props;
  return (
    <Body>
      {guilds && <div className='header'>Your servers</div>}
      <List>
        { guilds ? 
          guilds.map(g => 
              <GuildIcon guild={g} key={g.id} />
            ) :
          <span>Are you in any guilds?</span>
        }
      </List>
    </Body>
  )
};

export default GuildList;