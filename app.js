new Vue({
    el: '#app',
    data: {
        currentSection: 'login',
        username: '',
        userCode: '',
        points: 0,
        leaderboard: [], // New leaderboard data
        upgrades: [
            { id: 1, name: 'Upgrade Beer Production', cost: 10, multiplier: 2 },
            { id: 2, name: 'Increase Click Value', cost: 25, multiplier: 5 },
            { id: 3, name: 'Unlock New Beer Types', cost: 50, multiplier: 10 },
            { id: 4, name: 'Hire a Brewmaster', cost: 100, multiplier: 20 },
            { id: 5, name: 'Purchase a Brewery', cost: 200, multiplier: 50 },
            { id: 6, name: 'Beer Festival', cost: 500, multiplier: 100 },
        ],
        achievements: [
            { id: 1, name: "First Beer", pointsRequired: 1, unlocked: false },
            { id: 2, name: "10 Beers", pointsRequired: 10, unlocked: false },
            { id: 3, name: "50 Beers", pointsRequired: 50, unlocked: false },
            { id: 4, name: "100 Beers", pointsRequired: 100, unlocked: false },
            { id: 5, name: "200 Beers", pointsRequired: 200, unlocked: false },
            { id: 6, name: "500 Beers", pointsRequired: 500, unlocked: false },
            { id: 7, name: "1,000 Beers", pointsRequired: 1000, unlocked: false },
            { id: 8, name: "Beer Enthusiast", pointsRequired: 50, unlocked: false },
            { id: 9, name: "Brewmaster", pointsRequired: 200, unlocked: false },
            { id: 10, name: "Collector", pointsRequired: 100, unlocked: false },
            { id: 11, name: "Beer Festival Champion", pointsRequired: 1000, unlocked: false },
            { id: 12, name: "Ultimate Brewer", pointsRequired: 5000, unlocked: false }
        ],
        loggedIn: false,
        notification: '',
        showPopup: false,
        checkboxChecked: false,
        deleteCheckboxChecked: false, // New checkbox state for account deletion
        isLoading: false, // Loading state for async operations
    },
    mounted() {
        // Load saved user progress from local storage
        const savedData = JSON.parse(localStorage.getItem('userProgress'));
        if (savedData) {
            this.username = savedData.username;
            this.userCode = savedData.userCode;
            this.points = savedData.points;
            this.achievements = this.loadUserAchievements(savedData.achievements);
            this.loggedIn = true;
            this.showSection('game');
        }
    },
    methods: {
        showSection(section) {
            this.currentSection = section;
            this.notification = '';
            if (section === 'leaderboard') {
                this.fetchLeaderboard(); // Fetch leaderboard when this section is shown
            }
        },
        validateUserInput() {
            if (!this.username || !this.userCode) {
                alert('Please enter both username and unique ID!');
                return false;
            }
            return true;
        },
        registerUser() {
            if (!this.username) {
                alert('Please enter a username!');
                return;
            }

            const uniqueID = Math.floor(10000 + Math.random() * 90000).toString();

            const userData = {
                username: this.username,
                code: uniqueID,
                points: 0,
                achievements: [],
            };

            this.isLoading = true; // Show loading indicator

            fetch('saveProgress.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            .then(response => response.json())
            .then(data => {
                this.isLoading = false; // Hide loading indicator
                if (data.success) {
                    this.userCode = uniqueID; // Save unique ID
                    this.showPopup = true; // Show popup after registration
                    this.notification = 'Registration successful!';
                    this.showSection('login'); // Go to login after registration
                } else {
                    alert('Registration failed!');
                }
            });
        },
        loadUserProgress() {
            if (!this.validateUserInput()) {
                return;
            }

            this.isLoading = true; // Show loading indicator

            fetch(`getUserProgress.php?username=${this.username}`)
                .then(response => response.json())
                .then(data => {
                    this.isLoading = false; // Hide loading indicator
                    if (data.error) {
                        alert(data.error);
                    } else if (data.code === this.userCode) {
                        this.points = data.points || 0;
                        this.achievements = this.loadUserAchievements(data.achievements || []);
                        this.loggedIn = true;
                        this.showSection('game');
                        this.saveUserProgress(); // Save progress to local storage
                    } else {
                        alert('Unique ID does not match!');
                    }
                });
        },
        loadUserAchievements(userAchievements) {
            return this.achievements.map(achievement => ({
                ...achievement,
                unlocked: userAchievements.includes(achievement.name) // Check if the achievement is unlocked
            }));
        },
        clickBeer() {
            const clickValue = 1; // Base click value
            this.points += clickValue;
            this.checkAchievements();
            this.notification = 'You collected a beer!';
            this.saveUserProgress();
        },
        checkAchievements() {
            this.achievements.forEach(achievement => {
                if (this.points >= achievement.pointsRequired && !achievement.unlocked) {
                    achievement.unlocked = true; // Unlock the achievement
                    this.notification = `Achievement Unlocked: ${achievement.name}!`;
                    this.saveUserProgressWithAchievements(achievement.name); // Save achievements when unlocked
                }
            });
        },
        buyUpgrade(upgrade) {
            if (this.points >= upgrade.cost) {
                this.points -= upgrade.cost;
                this.notification = 'Upgrade purchased: ' + upgrade.name;
                // Apply the upgrade multiplier to the click value
                this.points += upgrade.multiplier; // Adjusted to add the multiplier
                this.saveUserProgress();
            } else {
                alert('Not enough beers!');
            }
        },
        saveUserProgress() {
            if (!this.username) {
                console.error('Cannot save progress: username is not defined');
                return;
            }

            const userData = {
                username: this.username,
                points: this.points,
                achievements: this.achievements.filter(a => a.unlocked).map(a => a.name), // Only save unlocked achievements as an array
                code: this.userCode,
            };

            fetch('saveProgress.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    console.error('Failed to save user progress');
                } else {
                    // Save user progress to local storage
                    localStorage.setItem('userProgress', JSON.stringify(userData));
                }
            });
        },
        saveUserProgressWithAchievements(achievementName) {
            if (!this.username) {
                console.error('Cannot save progress: username is not defined');
                return;
            }

            const userData = {
                username: this.username,
                points: this.points,
                achievements: [...new Set([...this.achievements.filter(a => a.unlocked).map(a => a.name), achievementName])], // Ensure no duplicates
                code: this.userCode,
            };

            fetch('saveProgress.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    console.error('Failed to save user progress with new achievement');
                }
            });
        },
        deleteAccount() {
            if (!this.deleteCheckboxChecked) {
                alert('Please confirm that you want to delete your account by checking the checkbox.');
                return;
            }

            if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                return;
            }

            // Proceed with account deletion
            this.isLoading = true; // Show loading indicator

            fetch(`deleteAccount.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: this.username }),
            })
            .then(response => response.json())
            .then(data => {
                this.isLoading = false; // Hide loading indicator
                if (data.success) {
                    this.notification = 'Your account has been permanently deleted.';
                    this.logout(); // Log the user out
                } else {
                    alert('Account deletion failed!');
                }
            })
            .catch(error => {
                this.isLoading = false; // Hide loading indicator
                console.error('Error deleting account:', error);
            });
        },
        closePopup() {
            if (this.showPopup) {
                this.showPopup = false;
                this.loggedIn = false;
            }
        },
        fetchLeaderboard() {
            fetch('getLeaderboard.php')
                .then(response => response.json())
                .then(data => {
                    this.leaderboard = data.leaderboard || [];
                });
        },
        logout() {
            // Clear local storage and reset data
            localStorage.removeItem('userProgress');
            this.username = '';
            this.userCode = '';
            this.points = 0;
            this.achievements = this.achievements.map(a => ({ ...a, unlocked: false })); // Reset achievements
            this.loggedIn = false;
            this.showSection('login'); // Go back to login
        }
    }
});
