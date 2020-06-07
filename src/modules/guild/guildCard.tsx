import * as React from 'react';
import styled from 'styled-components';
import { Guild } from './interfaces';
import { Link } from 'react-router-dom';

const GuildImg = styled.img`
  border-radius: 50%;
  height: 80px;
  width: 80px;
  margin: 5px;
`;

const Card = styled.div`
  margin: 25px;
  width: 180px;
  padding: 25px;
  transition: background-color 0.35s ease-in-out;
  border-radius: 20%;
  div {
    font-size: 22px;
    padding-top: 10px;
    color: #718096;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:hover {
    background-color: #1a1c20;
  }
`;

const GuildIcon = (props: { guild: Guild }) => {
  const { guild } = props;

  return (
    <Link to={`/guild/${guild.id}`}>
      <Card>
        <GuildImg src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`} />
        <div>{guild.name}</div>
      </Card>
    </Link>
  )
};

export default GuildIcon;