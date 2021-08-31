const { MessageActionRow, MessageButton } = require('discord.js');
const Discord = require("discord.js");


module.exports.run = async (client, message, args) => {

    if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) return;

    const commands = new Discord.MessageEmbed()

    .setColor('#0099ff')
    .setTitle("Chat-log links")
    .addField("Bot invite link", "[Invite](https://discord.com/oauth2/authorize?client_id=879273611603619881&permissions=75792&scope=bot)", true)
    .addField("Support server", "[Formova team](https://discord.com/invite/ArfZWMhcqD)", true)
    .addField("Vote", "[Vote](https://top.gg/bot/879273611603619881/vote)", true)
    .setFooter('Chat-log', 'https://i.imgur.com/2GB0fgf.png');
    



    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel('Invite Bot')
            .setURL("https://discord.com/oauth2/authorize?client_id=879273611603619881&permissions=75792&scope=bot")
            .setStyle('LINK'),
    )
    .addComponents(
        new MessageButton()
            .setLabel('Support server')
            .setURL("https://discord.com/invite/ArfZWMhcqD")
            .setStyle('LINK'),
    )
    .addComponents(
        new MessageButton()
            .setLabel('Vote')
            .setURL("https://top.gg/bot/879273611603619881/vote")
            .setStyle('LINK'),
    )


await message.channel.send({ embeds: [commands], components: [row] });
    

}

module.exports.help = {
    name: "invite",
    help: "Get bot invite link/support server invite link",
    usage: ".invite"
}
