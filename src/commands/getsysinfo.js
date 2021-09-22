const kommando = require('discord-kommando.js');
const pidusage = require('pidusage');
const Discord = require('discord.js');
const os = require('os');
const find = require('find-process');

const command = new kommando.Command({
    name: "getsysinfo",
    description: "Get System Info of Host Computer",
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
            .setTitle("System Info")
            .addField('OS Info' , `${os.version()} ${os.arch}` , true)
            .addField('CPU Name' , `${os.cpus()[0].model}` , false)
            .addField('Total RAM' , `${(parseInt(os.totalmem) / 1073741824).toFixed(1)}GB` , false)

        message.channel.send(" " , embed)
    
});

module.exports = command;