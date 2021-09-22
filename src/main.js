require('dotenv').config();
const kommando = require('discord-kommando.js');
const Discord = require('discord.js');
const os = require('os');
const { exec } = require('child_process');
const disbut = require('discord-buttons');
disbut(client);

const token = process.env.TOKEN;

const client = new Discord.Client();

kommando.setupKommando("src/commands", "c!");


client.on('ready', () => {
    console.log(`Bot ready! ${client.user.tag}`);
});

client.on('message', kommando.CommandHandler);

client.on('clickButton', async(btn) => {
    const btn_args = btn.id.split(".");
    if(btn_args[0] == "refresh_resource" ) {
        
    }
});

client.login(token);