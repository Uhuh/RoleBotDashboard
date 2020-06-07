import * as DiscordOauth from 'discord-oauth2';
import * as Discord from 'discord.js';

export class DiscordAPI {
  private userInfo: Map<string, any>;
  discord_oauth = new DiscordOauth({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
  });

  bot_client = new Discord.Client();
  
  constructor() {
    this.userInfo = new Map();
    this.bot_client.login(process.env.TOKEN);
    if(this.userInfo) {}
  }

  getUserData = async (code: string) => {
    const userInfo = await this.authorizeUser(code)
      .catch(() => console.error(`Failed to get user access_token.`));
    const user = await this.getUser(userInfo.access_token)
      .catch(() => console.error(`Failed to fetch user info.`));
    const userGuilds = await this.userGuilds(userInfo.access_token)
      .catch(() => console.error(`Failed to fetch user guilds`));

    return {
      access_token: userInfo.access_token, 
      user: user, 
      guilds: userGuilds ? userGuilds.filter((g: any) => (g.permissions & 0x00000020) === 0x00000020) : []
    }
  }

  getUser = async (token: string) => {
    return this.discord_oauth.getUser(token);
  }

  userGuilds = async (token: string) => {
    const guilds = await this.discord_oauth.getUserGuilds(token);

    return guilds ? guilds.filter((g: any) => (g.permissions & 0x00000020) === 0x00000020) : [];
  }

  getGuild = (guildId: string) => {
    return this.bot_client.guilds.cache.get(guildId); 
  }

  authorizeUser = (code: string) => {
    return this.discord_oauth.tokenRequest({
      grantType: 'authorization_code',
      scope: 'identify guilds',
      code
    });
  }
}

export default new DiscordAPI();