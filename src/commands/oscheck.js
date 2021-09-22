const kommando = require('discord-kommando.js');
const pidusage = require('pidusage');
const Discord = require('discord.js');
const os = require('os');
const find = require('find-process');

const command = new kommando.Command({
    name: "getosinfo",
    description: "Get OS Info of Host Computer",
    aliases: []
});

command.handle((message, args) => {
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();
    const date_time = `${date}  ${time}`;

    if(message.channel.id != "889800405515653130") return;
    
    let embed = new Discord.MessageEmbed()
        .setColor(0x399FFF)
        .setFooter(date_time)
        .setTitle("OS Info")
        .addField('Platform : ' , os.platform() , true)
        .addField('OS Type : ' , os.type() , true)
        .addField('OS Kernel Version : ' , os.version() , true)
        .addField('Architecture : ' , os.arch() , true);

    message.channel.send(" " , embed)
});

module.exports = command;