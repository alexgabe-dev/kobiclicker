🍻 Kőbányai Clicker Game 🍺
Welcome to Beer Clicker Game, a fun and interactive game built using Vue.js. Click your way to brew more beers, unlock achievements, and climb the leaderboard! 🍻

🚀 Features
Click to Collect Beers: Tap away to brew more beer!
Achievements: Unlock cool achievements as you reach new milestones! 🎯
Upgrades: Boost your beer production with exciting upgrades! 🛠️
Leaderboard: Compete with others to see who’s the ultimate brewer! 🏆
Save & Load Progress: Your progress is saved in the local storage and server. Never lose your brewing empire! 💾
🎮 Gameplay
1. Login or Register 🚪
Create a username and get a unique code. You'll need both to log back in and continue your journey to beer stardom! 🍺✨
2. Start Clicking! 👆
Click the beer to earn points. The more points you earn, the closer you get to unlocking achievements and upgrades.
3. Upgrade Your Brewery 💰
Use your points to purchase powerful upgrades like:
Upgrade Beer Production: Produce beer faster!
Increase Click Value: Each click gives you more points.
Hire a Brewmaster: Get help in brewing more beers! 👨‍🍳
And more! Each upgrade increases your brewing power.
4. Unlock Achievements 🏅
Achievements will be unlocked as you hit certain milestones. From brewing your first beer to becoming the Ultimate Brewer!
5. Compete on the Leaderboard 🏆
Check out the global leaderboard and see how you rank against other brewers. Are you the Beer Festival Champion?
🔧 Installation
Want to run the game on your local machine? Follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/your-username/beer-clicker-game.git
cd beer-clicker-game
Open index.html in your favorite browser or run it via a local server to fully enjoy the experience:

bash
Copy code
open index.html
📂 File Structure
Here's a breakdown of the most important files:

index.html: The main structure of the game UI.
app.js: The Vue.js logic that powers the game (points system, upgrades, achievements).
saveProgress.php & getUserProgress.php: Handles saving and retrieving user progress.
deleteAccount.php: Allows users to delete their accounts.
📝 Code Overview
The app is built with Vue.js and features:

Data Binding for real-time updates to your points, upgrades, and achievements.
LocalStorage to save your progress directly in your browser, and backend integration to save and fetch data with PHP.
Responsive UI to fit both desktop and mobile gameplay.
Example Code
js
Copy code
clickBeer() {
    const clickValue = 1; // Base click value
    this.points += clickValue;
    this.checkAchievements();
    this.notification = 'You collected a beer!';
    this.saveUserProgress();
},
As you collect points, achievements are unlocked, and your progress is saved.

🌟 Upgrades & Achievements
The game features various upgrades and achievements to enhance gameplay:

Upgrades:
Upgrade	Cost	Multiplier
Upgrade Beer Production	10	2
Increase Click Value	25	5
Unlock New Beer Types	50	10
Hire a Brewmaster	100	20
Purchase a Brewery	200	50
Beer Festival	500	100
Achievements:
Achievement	Points Required
First Beer	1
10 Beers	10
50 Beers	50
100 Beers	100
1,000 Beers	1000
Beer Festival Champion	1000
Ultimate Brewer	5000
Each achievement unlocks a notification and further motivates you to keep clicking! 🎉

🤝 Contributing
We welcome contributions! If you'd like to improve the game, add new features, or report issues, follow these steps:

Fork the repo.
Create a branch for your feature or bug fix:
bash
Copy code
git checkout -b feature-name
Make changes and commit:
bash
Copy code
git commit -m "Added new feature"
Push to your fork and create a pull request!
❓ FAQ
Q: How do I save my progress?
A: Progress is saved automatically both in your browser and on the server.

Q: What happens if I lose my unique ID?
A: You'll need both your username and unique ID to log back in, so make sure to note it down!

Q: Can I delete my account?
A: Yes! Simply go to the account section, check the deletion confirmation box, and your account will be deleted permanently.

🛠️ Built With
Vue.js: The framework that powers the game.
PHP: Handles saving/loading data from the server.
HTML/CSS: Simple yet effective frontend design.
👏 Acknowledgments
Thanks to all beer lovers out there! This project was inspired by classic clicker games like Cookie Clicker and is dedicated to all fans of good beer and fun games. 🍻

🍻 Enjoy Brewing & Clicking! 🎮
Feel free to reach out if you have any questions, suggestions, or just want to share your high score! 🤩

By Alex Gabe

License
This project is licensed under the MIT License. Feel free to fork and improve it!

Let me know if you'd like to add or modify anything in the README! Cheers! 🍻
