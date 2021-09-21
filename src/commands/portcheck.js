const kommando = require('discord-kommando.js');
const pidusage = require('pidusage');
const Discord = require('discord.js');
const os = require('os');
const find = require('find-process');

const command = new kommando.Command({
    name: "getport",
    description: "Port Available Checker",
    aliases: []
});

command.handle((message, args) => {
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();
    const date_time = `${date}  ${time}`;

    if(message.channel.id != "889800405515653130") return;

    if(!args[0]) {
        let embed = new Discord.MessageEmbed()
            .setColor(0xFF0000)
            .setFooter(date_time)
            .setTitle("An Error Occurred!")
            .setDescription("args[0] is null!")
            
        message.channel.send(" " , embed)
    } else {
        if(typeof parseInt(args[0]) != 'number') {
            let embed = new Discord.MessageEmbed()
                .setColor(0xFF0000)
                .setFooter(date_time)
                .setTitle("An Error Occurred!")
                .setDescription("Port number Must be number!")
                
            message.channel.send(" " , embed)
        } else {
            find('port', parseInt(args[0])).then(function(list) {
                if (!list.length) {
                    let embed = new Discord.MessageEmbed()
                        .setColor(0x399FFF)
                        .setFooter(date_time)
                        .setTitle("Port" + args[0])
                        .setDescription(`Port Number ${args[0]} not used`)
                        
                    message.channel.send(" " , embed)
                  } else {
                    let embed = new Discord.MessageEmbed()
                        .setColor(0x399FFF)
                        .setFooter(date_time)
                        .setTitle("Port" + args[0])
                        .setDescription(`${list[0].name} Using Port ${args[0]}`)
                        
                    message.channel.send(" " , embed)
                }
            });
        }
    }
});

module.exports = command;