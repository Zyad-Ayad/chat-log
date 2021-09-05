const Discord = require("discord.js");
const fetch = require("node-fetch");
const fs = require("fs");

module.exports.run = async (client, oldMessage, newMessage) => {




    let channel = await oldMessage.guild.channels.cache.find(channel => channel.name === "chat-log");
    if (!channel) return;
    if (!channel.permissionsFor(client.user).has("SEND_MESSAGES")) return;


    const now = new Date();
    let date = now.toUTCString();



    const delEmbed = new Discord.MessageEmbed()
    .setColor('YELLOW')
    .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL())
    .setTitle(":writing_hand: Message edited")
    .addField("Old message content", `**${oldMessage.content}**`)
    .addField("New message content", `**${newMessage.content}**`)
    .addField("Date :", date, true)
    .addField("Channel", `${oldMessage.channel}`, true)
    .setFooter('chat-log', client.user.avatarURL());



    channel.send({embeds: [delEmbed]})



}
module.exports.help = {
    name : "messageUpdate",
    help: "skip"
}
