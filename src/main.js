require('dotenv').config();
const kommando = require('discord-kommando.js');
const Discord = require('discord.js');
const os = require('os');
const { exec } = require('child_process');
const disbut = require('discord-buttons');

const client = new Discord.Client();

disbut(client);

const token = process.env.TOKEN;


kommando.setupKommando("src/commands", "c!");


client.on('ready', () => {
    console.log(`Bot ready! ${client.user.tag}`);
});

client.on('message', kommando.CommandHandler);

client.login(token);