# School Discord Bot
Good for verifying a user's email before giving access to the server, and giving roles for 7th-12th grade.
### Instructions
1. Copy the repo
`git clone https://github.com/svalencia014/fcBot.git` 
or<br>
`gh repo clone svalencia014/schoolBot`

2. Go into the directory
`cd schoolBot`

3. Install packages<br>
* Linux & Mac:  `./setup.sh`
* Windows: `Coming soon`

4. Edit the last line of bot.js with your discord token ([discord.com/developers](https://discord.com/developers))<br>
`line 36, client.login("your token here");` 

5. Sign up for a sendgrid account and input your api token in /commands/verify.js(Found on the integration page, where you send your first email) <br>
`line 3, sgMail.setApiKey('Your api key here');`

6. Skim through verify.js and look for any "Discord name here" or "your email" and replace them accordingly <br>
`lines 18, 27, 51, 55, 58, 116, and 120`

7. Run with node <br>
`node .`

### Other Info

#### Features/Bugs
Put them in the [Issues](https://github.com/svalencia014/schoolBot/issues) Tab with the appropriate labels <br>
* Bugs - `bug` <br>
* Features - `enhancement` <br>
* Documentation suggestions - `documentation` <br>

#### Support me
* Checkout my the stuff on my [website](http://svalencia014.cf/) under the `MY PROJECTS`, `MY SITES`, or `MY SOCIALS` tabs.
* Use the [kofi](https://ko-fi.com/bifocalcanvas77) link on the side to donate
