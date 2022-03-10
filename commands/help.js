const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'provides the user with all commands',
    execute(message, args) {
        const helpEmbed = new MessageEmbed()
            .setColor('#0049fd')
            .setTitle('VATSIM Roles')
            .setDescription('Here are the commands available');
        
        helpEmbed.addField("Verify", "Gives user access to the server", true);

        message.channel.send({ embeds: [helpEmbed] });
    }
}