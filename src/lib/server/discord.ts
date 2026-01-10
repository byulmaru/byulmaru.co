import { Client, GatewayIntentBits } from 'discord.js';
import { env } from '$env/dynamic/private';

export const discordClient = new Client({
  intents: [GatewayIntentBits.Guilds]
});

export const getDiscordMember = async (userId: string) => discordClient.guilds.fetch(env.DISCORD_GUILD_ID).then((guild) => guild.members.fetch(userId));
