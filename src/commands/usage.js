const kommando = require('discord-kommando.js');
const pidusage = require('pidusage');
const Discord = require('discord.js');
const os = require('os');
const find = require('find-process');
var ps = require('ps-node');

const command = new kommando.Command({
    name: "pidusage",
    description: "Get Resource Usage of process",
    aliases: []
});

function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

command.handle((message, args) => {

    if(message.channel.id != "889800405515653130") return;

    if (!args[0]) {
        pidusage(process.pid, function(err, stats) {
            if (err) throw err;

            find('pid', process.pid).then(function (list) {
                list.forEach((f) => {
                    const cpu_usage = stats.cpu.toFixed(1);
                    const memory_byte = parseInt(stats.memory);
                    const memory_mb = (memory_byte / 1048576).toFixed(1);
                    const totalmem_byte = os.totalmem()
                    const totalmem_gb = (totalmem_byte / 1073741824).toFixed(1);
        
                    const percent_mem = ((memory_mb / 100000) * (totalmem_gb * 1024)).toFixed(1);
                    const elapsed = stats.elapsed;
                    const pid = stats.pid;
        
                    const time = new Date().toLocaleTimeString();
                    const date = new Date().toLocaleDateString();
                    const date_time = `${date}  ${time}`;
        
                    let embed = new Discord.MessageEmbed()
                        .setColor(0x399FFF)
                        .setTitle(`Resource Usage of ${f.name}`)
                        .setDescription(`${pid}`)
                        .setFooter(date_time)
                        .addField("Process Name : " , f.name.toString() , true)
                        .addField("CPU Usage : " , `${cpu_usage}%` , true)
                        .addField("Total RAM : " , `${totalmem_gb}GB`, true)
                        .addField("Process RAM Usage(Percent) : ", `${percent_mem}%` , true)
                        .addField("Process RAM Usage(MB) : " , `${memory_mb}MB` , true)
                        .addField("Elapsed : " , `${msToTime(elapsed)}` , true );
        
                    message.channel.send(" " , embed );
                });
            }, function (err) {
                console.log(err);
            });
        });
    } else {

        if(typeof parseInt(args[0]) != 'number') {
            let embed = new Discord.MessageEmbed()
                .setColor(0xFF0000)
                .setFooter(date_time)
                .setTitle("An Error Occurred!")
                .setDescription("PID Must be number!")
                
            message.channel.send(" " , embed)
        } else {
            ps.lookup({ pid: args[0] }, function(err, resultList ) {
                if (err) {
                    throw new Error( err );
                }
             
                var process = resultList[ 0 ];
    
                const time = new Date().toLocaleTimeString();
                const date = new Date().toLocaleDateString();
                const date_time = `${date}  ${time}`;
    
                if(process){
                    pidusage(args[0], function(err, stats) {
                        if(err) throw err;
    
                        find('pid', parseInt(args[0])).then(function (list) {
                            list.forEach((f) => {
                                const cpu_usage = stats.cpu.toFixed(1);
                                const memory_byte = parseInt(stats.memory);
                                const memory_mb = (memory_byte / 1048576).toFixed(1);
                                const totalmem_byte = os.totalmem()
                                const totalmem_gb = (totalmem_byte / 1073741824).toFixed(1);
                    
                                const percent_mem = ((memory_mb / 100000) * (totalmem_gb * 1024)).toFixed(1);
                                const elapsed = stats.elapsed;
                                const pid = stats.pid;
                    
                                const time = new Date().toLocaleTimeString();
                                const date = new Date().toLocaleDateString();
                                const date_time = `${date}  ${time}`;
                    
                                let embed = new Discord.MessageEmbed()
                                    .setColor(0x399FFF)
                                    .setTitle(`Resource Usage of ${f.name}`)
                                    .setDescription(`${pid}`)
                                    .setFooter(date_time)
                                    .addField("Process Name : " , f.name.toString() , true)
                                    .addField("CPU Usage : " , `${cpu_usage}%` , true)
                                    .addField("Total RAM : " , `${totalmem_gb}GB`, true)
                                    .addField("Process RAM Usage(Percent) : ", `${percent_mem}%` , true)
                                    .addField("Process RAM Usage(MB) : " , `${memory_mb}MB` , true)
                                    .addField("Elapsed : " , `${msToTime(elapsed)}` , true );
                    
                                message.channel.send(" " , embed );
                            });
                        }, function (err) {
                            console.log(err);
                        });
                    });
                }
                else {
                    let embed = new Discord.MessageEmbed()
                        .setColor(0xFF0000)
                        .setFooter(date_time)
                        .setTitle("An Error Occurred!")
                        .setDescription("Process Not found")
                    
                    message.channel.send(" " , embed)
                }
            });
        }
    }
});

module.exports = command;