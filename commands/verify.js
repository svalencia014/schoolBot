

module.exports = {
    name: 'verify',
    description: 'Allows the User to verify',
    execute(message, args) {
        message.author.send("Thank you for joining the {discord name} server!");
        message.author.send("We need to verify a few things before we give you access.");
    }
}