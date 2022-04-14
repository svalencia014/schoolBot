const { Client, Intents } = require("discord.js");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);
email = null;
userEmail = null;
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  name: "verify",
  description: "Allows the User to verify",
  execute(message, args) {
    let memberTarget = message.guild.members.cache.get(message.author.id);

    //define roles
    let flashRole = message.guild.roles.cache.find(
      (roles) => roles.name === "Flash"
    ); //main server role, if not given, user won't see the server
    let sevenRole = message.guild.roles.cache.find(
      (roles) => roles.name === "7th grade"
    );
    let eightRole = message.guild.roles.cache.find(
      (roles) => roles.name === "8th grade"
    );
    let freshRole = message.guild.roles.cache.find(
      (roles) => roles.name === "freshman"
    );
    let sophmoreRole = message.guild.roles.cache.find(
      (roles) => roles.name === "sophmore"
    );
    let juniorRole = message.guild.roles.cache.find(
      (roles) => roles.name === "junior"
    );
    let seniorRole = message.guild.roles.cache.find(
      (roles) => roles.name === "senior"
    );

    //intro stuff
    message.channel.send("Thank you for joining the FC Chat Discord.");
    sleep(15000);
    message.channel.send(
      "We need to veriy a few things before I give you access."
    );
    sleep(15000);
    message.channel.send("First, what is your **school** email?");
    sleep(5500);

    //collector stuff
    const filter = (message) =>
      !message.author.bot || message.author === memberTarget;
    const collector = message.channel.createMessageCollector({
      filter,
      max: 1,
      time: 15000,
    });
    collector.on("collect", (m) => {
      console.log(`Collected ${m.content}`);
    });
    collector.on("end", (collected) => {
      console.log(`Collected ${collected.size} items`);
      const email = collected.first();
      console.log(`Email for ${memberTarget} is ${email.content}`);
      const userEmail = email.content;
      message.channel.send(
        "Thank you. Please wait a moment while I email you a code."
      );

      //generate verification code
      const code = Math.floor(100000 + Math.random() * 900000);
      console.log(`Verification code is ${code}`);

      //check that domain is @ftstudent.org
      const checkEmail = userEmail.replace("@", " ");
      console.log(checkEmail);

      if (checkEmail.endsWith("ftstudent.org")) {
        const msg = {
          to: `${userEmail}`, // Change to your recipient
          from: "svalencia@ftstudent.org", // Change to your verified sender
          subject: "FT Students Discord Verification",
          text: `Here is your code: ${code}`,
          html: `<h1>Here is your code: ${code}</h1>`,
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });

        //Recieve code from user
        message.channel.send("Check your email and enter the code I sent you!");
        const collector2 = message.channel.createMessageCollector({
          filter,
          max: 1,
          time: 150000000,
        });
        collector2.on("collect", (m) => {
          console.log(`Collected ${m.content}`);
        });

        collector2.on("end", (collected) => {
          console.log(`Colelcted ${collected.size}`);
          const newCode = collected.first();
          console.log(`${memberTarget} entered ${newCode.content}`);
          const userCode = newCode.content;
          if (userCode === code) {
            message.channel.send("Thank you for verifying.");
            memberTarget.roles.add(flashRole);
            message.channel.send("What grade are you in? (# only please!)");
            const collector3 = message.channel.createMessageCollector({
              filter,
              max: 1,
              time: 15000,
            });
            collector3.on("collect", (m) => {
              console.log(`Collected ${m.content}`);
            });
            collector3.on("end", (collected) => {
              console.log(`Collected ${collected.size} items`);
              const grade = collected.first();
              console.log(`${memberTarget} is in ${grade.content} grade`);
              const userGrade = grade.content;
							//might switch to case statement
              if (userGrade === "7") {
                memberTarget.roles.add(sevenRole);
                message.channel.send(
                  "You have been given access to the server plus the 7th grade role!"
                );
              } else if (userGrade === "8") {
                memberTarget.roles.add(eightRole);
                message.channel.send(
                  "You have been given access to the server plus the 8th grade role!"
                );
              } else if (userGrade === "9") {
                memberTarget.roles.add(freshRole);
                message.channel.send(
                  "You have been given access to the server plus the freshman role!"
                );
              } else if (userGrade === "10") {
                memberTarget.roles.add(sophmoreRole);
                message.channel.send(
                  "You have been given access to the server plus the sophmore role!"
                );
              } else if (userGrade === "11") {
                memberTarget.roles.add(juniorRole);
                message.channel.send(
                  "You have been given access to the server plus the junior role!"
                );
              } else if (userGrade === "12") {
                memberTarget.roles.add(seniorRole);
                message.channel.send(
                  "You have been given access to the server plus the senior role!"
                );
              } else {
                message.channel.send(
                  "There was an error! Please message @BifocalCanvas#0701 for help."
                );
              }
            });
          } else {
            message.channel.send(
              "There was an error! Please message @BifocalCanvas#0701 for help."
            );
          }
        });
      }
    });
  },
};
