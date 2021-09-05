const Discord = require("discord.js");
const fetch = require("node-fetch");
const fs = require("fs");

module.exports.run = async (client, oldMessage, newMessage) => {




    let channel = await oldMessage.guild.channels.cache.find(channel => channel.name === "chat-log");
    if (!channel) return;
    if (!channel.permissionsFor(client.user).has("SEND_MESSAGES")) return;


    const now = new Date();
    let date = now.toUTCString();


var oldmsg = "This message has more than 1024 letters!";
var newmsg = 'This message has more than 1024 letters!';


if (oldMessage.content.length < 1023) oldmsg = `**${oldMessage.content}**`
if (oldMessage.content.length < 1023) newmsg = `**${newMessage.content}**`


    const delEmbed = new Discord.MessageEmbed()
    .setColor('YELLOW')
    .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL())
    .setTitle(":writing_hand: Message edited")
    .addField("Old message content", `**${oldmsg}**`)
    .addField("New message content", `**${newmsg}**`)
    .addField("Date :", date, true)
    .addField("Channel", `${oldMessage.channel}`, true)
    .addField("Go to the message?", `[Redirect](https://discord.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id})`, true)
    .setFooter('chat-log', client.user.avatarURL());



    channel.send({embeds: [delEmbed]})



}
module.exports.help = {
    name : "messageUpdate",
    help: "skip"
}
