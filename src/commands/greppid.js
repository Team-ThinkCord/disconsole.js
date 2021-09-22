const kommando = require('discord-kommando.js');
const pidusage = require('pidusage');
const Discord = require('discord.js');
const os = require('os');
const find = require('find-process');
const { exec } = require('child_process');

const command = new kommando.Command({
    name: "greppid",
    description: "Port Available Checker",
    aliases: []
});

command.handle((message, args) => {
    
    if(message.channel.id != "889800405515653130") return;

    if(!args[0]) {
        let embed = new Discord.MessageEmbed()
            .setColor(0xFF0000)
            .setFooter(date_time)
            .setTitle("An Error Occurred!")
            .setDescription("args[0] is null")
        
        message.channel.send(" " , embed)
    } else {
        exec(`tasklist | findstr ${args[0]}`, (err, stdout, stderr) => {
            if(err) throw err;
            if(stderr) {
                let embed = new Discord.MessageEmbed()
                    .setColor(0xFF0000)
                    .setFooter(date_time)
                    .setTitle("An Error Occurred!")
                    .setDescription(`Error Code : ${stderr}`)
                
                message.channel.send(" " , embed)
            }

            message.channel.send('```\n' + 
            '  NAME                        PID | Session              Session# | RAM Usage\n' +
            '------------------------------------------------------------------------------\n' +
             stdout + 
             '\n' +
              '```')
        });
    }
});

module.exports = command;