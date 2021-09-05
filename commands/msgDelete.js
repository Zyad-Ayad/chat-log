const Discord = require("discord.js");
const fetch = require("node-fetch");
const fs = require("fs");

module.exports.run = async (client, message, args) => {


    let channel = await message.guild.channels.cache.find(channel => channel.name === "chat-log");
    if (!channel) return;
    if (!channel.permissionsFor(client.user).has("SEND_MESSAGES")) return;
    


    const now = new Date();
    let date = now.toUTCString();

    var msg = "This message has more than 1024 letters!";    
    
    if (message.content.length < 1000) msg = `**${message.content}**`


    const delEmbed = new Discord.MessageEmbed()
    .setColor('RED')
    .setAuthor(message.author.username, message.author.avatarURL())
    .setTitle(":x: Message deleted")
    .addField("Message content", `-\n***${message.content}***\n-`)
    .addField("Date :", date, true)
    .addField("Channel", `${message.channel}`, true)
    .addField("Go to the message place?", `[Redirect](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`, true)
    .setFooter('chat-log', client.user.avatarURL());



    channel.send({embeds: [delEmbed]})



}
module.exports.help = {
    name : "messageDelete",
    help: "skip"
}
