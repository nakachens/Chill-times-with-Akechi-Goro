        const soundSystem = {
            // audios
            homeMusic: document.getElementById('home-music'),
            hangoutMusic: document.getElementById('hangout-music'),
            studyMusic:  document.getElementById('study-music'),
            workMusic:  document.getElementById('work-music'),
            breakMusic: document.getElementById('break-music'),
            endMusic: document.getElementById('end-music'),
            completeMusic: document.getElementById('complete-music'),
            clickSound: document.getElementById('click-sound'),
            
            
            currentMusic: null,
            
            
            volume: 0.5,
            muted: false,

            init: function() {
                this.setVolume(this.volume);

                document.getElementById('mute-btn').addEventListener('click', () => {
                    this.toggleMute();
                });

                const volumeSlider = document.getElementById('volume-slider');
                volumeSlider.value = this.volume;
                volumeSlider.addEventListener('input', (e) => {
                    this.setVolume(parseFloat(e.target.value));
                });

                document.getElementById('volume-toggle-btn').addEventListener('click', () => {
                    document.getElementById('volume-control').classList.toggle('visible');
                });
            },

            setVolume: function(volume) {
                this.volume = volume;
                this.homeMusic.volume = volume;
                this.studyMusic.volume = volume;
                this.workMusic.volume = volume;
                this.hangoutMusic.volume = volume;
                this.breakMusic.volume = volume;
                this.endMusic.volume = volume;
                this.completeMusic.volume = volume;
                this.clickSound.volume = volume;
                
                document.getElementById('mute-btn').textContent = volume === 0 ? '🔇' : '🔊';
            },
            
            toggleMute: function() {
                this.muted = !this.muted;
                if (this.muted) {
                    this.setVolume(0);
                    document.getElementById('volume-slider').value = 0;
                } else {
                    this.setVolume(0.5);
                    document.getElementById('volume-slider').value = 0.5;
                }
            },
            
            // playin specific music track
            playMusic: function(musicType) {
                this.stopMusic();

                switch(musicType) {
                    case 'home':
                        this.homeMusic.currentTime = 0;
                        this.homeMusic.play().catch(e => console.log("Audio play error:", e));
                        this.currentMusic = this.homeMusic;
                        break;
                    case 'study':
                        this.studyMusic.currentTime = 0;
                        this.studyMusic.play().catch(e => console.log("Audio play error:", e));
                        this.currentMusic = this.studyMusic;
                        break;
                    case 'work':
                        this.workMusic.currentTime = 0;
                        this.workMusic.play().catch(e => console.log("Audio play error:", e));
                        this.currentMusic = this.workMusic;
                        break;
                    case 'hangout':
                        this.hangoutMusic.currentTime = 0;
                        this.hangoutMusic.play().catch(e => console.log("Audio play error:", e));
                        this.currentMusic = this.hangoutMusic;
                        break;    
                    case 'break':
                        this.breakMusic.currentTime = 0;
                        this.breakMusic.play().catch(e => console.log("Audio play error:", e));
                        this.currentMusic = this.breakMusic;
                        break;
                    case 'end':
                        this.endMusic.currentTime = 0;
                        this.endMusic.play().catch(e => console.log("Audio play error:", e));
                        this.currentMusic = this.endMusic;
                        break;
                    case 'complete':
                        this.completeMusic.currentTime = 0;
                        this.completeMusic.play().catch(e => console.log("Audio play error:", e));
                        this.currentMusic = this.completeMusic;
                        break;
                }
            },
            
            stopMusic: function() {
                if (this.currentMusic) {
                    this.currentMusic.pause();
                    this.currentMusic.currentTime = 0;
                    this.currentMusic = null;
                }
            },
            
            playClick: function() {
                this.clickSound.currentTime = 0;
                this.clickSound.play().catch(e => console.log("Click sound error:", e));
            }
        };
        
        soundSystem.init();

        const state = {
            currentScreen: 'home',
            selectedActivity: null,
            selectedTimer: 25,
            timerInterval: null,
            remainingTime: 0,
            breakCount: 0,
            sessionStarted: false,
            breakStarted: false,
            sessionRemainingTime: 0  
        };

        // dialogues
        const sessionDialogues = {
            study: [
                "hmm...now thats.. interesting..",
                "i feel my brain's sharper already",
                "thats too easy..",
                "do people find this hard?",
                "Let's solve this problem",
                "is that all?",
                "i did this last month..",
            ],
            work: [
                "They don't think of me like a high-schooler do they?",
                "This report needs more attention",
                "I'm making good progress",
                "Almost done with this",
                "Need to stay organized",
                "they could've handled it better..",
                "I wish i also had free time like other people my age.."
            ],
            hangout: [
                "Really?",
                "Phantom Theives?",
                "i know a good place for pancakes",
                "A perfect break isnt it?",
                "Can you play chess?",
                "what books i read? hmm depends..",
                "m-my blog? what do you mean?",
                "Sweet food or spicy food? i'd say sweet..."
            ]
        };

        const breakDialogues = {
            study: [
                "what? are you recording?",
                "dont you think focusing would be better?",
                "its great to take breaks while working you know? if only i had more time..",
                "It's so peaceful here",
                "I'm a regular here.. with some.. connections",
                "What scent! Such perfect coffee!",
                "a good mental reset isnt it?"
            ],
            work: [
                "Hmm I wonder what Joker is up to now..",
                "I love coming here after a tiring day",
                "Just a quick coffee break",
                "you can do some quick stretches",
                "Checking my messages quickly",
                "Hope we finish all our tasks for today",
                "its getting cloudy isnt it?"
            ],
            hangout: [
                "The music here is amazing",
                "What are you looking at?",
                "a beautiful view isnt it?",
                "Life's good moments like these",
                "Perfect weather for hanging out",
                "is that so?"
            ]
        };

        // DOM elements
        const screens = {
            home: document.getElementById('home-screen'),
            activity: document.getElementById('activity-screen'),
            timer: document.getElementById('timer-screen'),
            studySession: document.getElementById('study-session'),
            workSession: document.getElementById('work-session'),
            hangoutSession: document.getElementById('hangout-session'),
            studyBreak: document.getElementById('study-break'),
            workBreak: document.getElementById('work-break'),
            hangoutBreak: document.getElementById('hangout-break'),
            endScreen: document.getElementById('end-screen'),
            completeScreen: document.getElementById('complete-screen'),
            returnHome: document.getElementById('return-home-screen')
        };

        const timers = {
            study: document.getElementById('study-timer'),
            work: document.getElementById('work-timer'),
            hangout: document.getElementById('hangout-timer'),
            studyBreak: document.getElementById('study-break-timer'),
            workBreak: document.getElementById('work-break-timer'),
            hangoutBreak: document.getElementById('hangout-break-timer')
        };
        const progressCircles = document.querySelectorAll('.progress-ring-circle');

        // functions
        function showScreen(screenName) {
            Object.values(screens).forEach(screen => {
                screen.classList.remove('active');
            });
            screens[screenName].classList.add('active');
            state.currentScreen = screenName;
            switch(screenName) {
                case 'home':
                case 'activity':
                case 'timer':
                    if (soundSystem.currentMusic !== soundSystem.homeMusic) {
                        soundSystem.playMusic('home');
                    }
                    break;
                case 'studySession':
                    soundSystem.playMusic('study');
                    break;
                case 'workSession':
                    soundSystem.playMusic('work');
                    break;
                case 'hangoutSession':
                    soundSystem.playMusic('hangout');
                    break;
                case 'studyBreak':
                case 'workBreak':
                case 'hangoutBreak':
                    soundSystem.playMusic('break');
                    break;
                case 'endScreen':
                    soundSystem.playMusic('end');
                    break;
                case 'completeScreen':
                    soundSystem.playMusic('complete');
                    break;
                default:
                    soundSystem.stopMusic();
    }
}

        function startTimer(duration, display, circle, isBreak = false, initialTime = null) {
            let timer = initialTime !== null ? initialTime : duration * 60;
            state.remainingTime = timer;
            const circumference = 2 * Math.PI * 50;
            
            if (state.timerInterval) {
                clearInterval(state.timerInterval);
            }
            
            state.timerInterval = setInterval(() => {
                const minutes = Math.floor(timer / 60);
                const seconds = timer % 60;
                
                display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

                const progress = circumference - (timer / (duration * 60)) * circumference;
                circle.style.strokeDashoffset = progress;
                
                if (--timer < 0) {
                    clearInterval(state.timerInterval);
                    if (isBreak) {
                        showBreakEndDialogue();
                        setTimeout(() => {
                            state.breakStarted = false;
                            state.sessionStarted = true;
                            
                            if (state.selectedActivity === 'study') {
                                showScreen('studySession');
                                document.getElementById('start-btn').classList.add('btn-hidden');
                                const circle = progressCircles[0];
                                startTimer(state.selectedTimer, timers.study, circle, false, state.sessionRemainingTime);
                            }
                            else if (state.selectedActivity === 'work') {
                                showScreen('workSession');
                                document.getElementById('work-start-btn').classList.add('btn-hidden');
                                const circle = progressCircles[1];
                                startTimer(state.selectedTimer, timers.work, circle, false, state.sessionRemainingTime);
                            }
                            else {
                                showScreen('hangoutSession');
                                document.getElementById('hangout-start-btn').classList.add('btn-hidden');
                                const circle = progressCircles[2];
                                startTimer(state.selectedTimer, timers.hangout, circle, false, state.sessionRemainingTime);
                            }
                        }, 3000);
                    } else {
                        // sessh finish
                        showScreen('completeScreen');
                    }
                }
                
                state.remainingTime = timer;
            }, 1000);
        }

        function showRandomDialogue() {
            if (!state.sessionStarted && !state.breakStarted) return;
            
            const dialogueContainer = document.createElement('div');
            dialogueContainer.className = 'random-dialogue';
            
            let dialogues;
            if (state.breakStarted) {
                dialogues = breakDialogues[state.selectedActivity];
            } else {
                dialogues = sessionDialogues[state.selectedActivity];
            }
            
            const randomDialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
            dialogueContainer.textContent = randomDialogue;
            
            const currentScreen = screens[state.currentScreen];
            currentScreen.appendChild(dialogueContainer);
            
            setTimeout(() => {
                dialogueContainer.remove();
            }, 3000);
        }

        function showBreakEndDialogue() {
            const textBox = document.createElement('div');
            textBox.className = 'text-box';
            textBox.style.bottom = '100px';
            textBox.style.left = '50%';
            textBox.style.transform = 'translateX(-50%)';
            textBox.style.maxWidth = '80%';
            
            const akechiPic = document.createElement('div');
            akechiPic.className = 'akechi';
            akechiPic.style.backgroundImage = "url('./assetso/smiling.webp')";
            akechiPic.style.backgroundSize = 'contain';
            akechiPic.style.backgroundRepeat = 'no-repeat';
            textBox.appendChild(akechiPic);
            
            const textContent = document.createElement('div');
            textContent.className = 'text-content';
            textContent.textContent = "I'm all charged up! Let's begin!";
            textBox.appendChild(textContent);
            
            const breakScreen = screens[state.currentScreen];
            breakScreen.appendChild(textBox);
            
            setTimeout(() => {
                textBox.remove();
            }, 3000);
        }

        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                soundSystem.playClick();
            });
        });

        // events 
        screens.home.addEventListener('click', () => {
            soundSystem.playClick();
            document.getElementById('start-text').style.display = 'none';
            showScreen('activity');
        });


        document.querySelectorAll('.activity').forEach(activity => {
            activity.addEventListener('click', (e) => {
                soundSystem.playClick();
                state.selectedActivity = e.currentTarget.dataset.activity;
                showScreen('timer');

                document.getElementById('timer-dialogue').textContent = 
                    `So ${state.selectedActivity} today?`;
            });
        });

        document.getElementById('back-to-home').addEventListener('click', () => {
            soundSystem.playClick();
            showScreen('home');
            document.getElementById('start-text').style.display = 'block';
        });

        document.querySelectorAll('.timer-option').forEach(option => {
            option.addEventListener('click', (e) => {
                soundSystem.playClick();
                state.selectedTimer = parseInt(e.currentTarget.dataset.time);
                

                const dialogues = {
                    15: "15 minutes? really?",
                    30: "30 minutes? just a breeze!",
                    45: "45 minutes? alright!",
                    60: "60 minutes? I'm afraid that's all I can give you"
                };
                document.getElementById('timer-dialogue').textContent = dialogues[state.selectedTimer];
            });
        });

        document.getElementById('timer-done').addEventListener('click', () => {
            if (state.selectedActivity === 'study') {
 
                document.getElementById('start-btn').classList.remove('btn-hidden');
                showScreen('studySession');
            }
            else if (state.selectedActivity === 'work') {
                document.getElementById('work-start-btn').classList.remove('btn-hidden');
                showScreen('workSession');
            }
            else {
                document.getElementById('hangout-start-btn').classList.remove('btn-hidden');
                showScreen('hangoutSession');
            }
        });


        document.getElementById('timer-think').addEventListener('click', () => {
            showScreen('activity');
        });

        document.getElementById('start-btn').addEventListener('click', function() {
            state.sessionStarted = true;
            const circle = progressCircles[0];
            startTimer(state.selectedTimer, timers.study, circle);

            this.classList.add('btn-hidden');
        });

        document.getElementById('work-start-btn').addEventListener('click', function() {
            state.sessionStarted = true;
            const circle = progressCircles[1];
            startTimer(state.selectedTimer, timers.work, circle);

            this.classList.add('btn-hidden');
        });

        document.getElementById('hangout-start-btn').addEventListener('click', function() {
            state.sessionStarted = true;
            const circle = progressCircles[2];
            startTimer(state.selectedTimer, timers.hangout, circle);

            this.classList.add('btn-hidden');
        });

        document.getElementById('break-btn').addEventListener('click', () => {
            document.getElementById('break-confirm').style.display = 'block';
        });

        document.getElementById('work-break-btn').addEventListener('click', () => {
            document.getElementById('break-confirm').style.display = 'block';
        });

        document.getElementById('hangout-break-btn').addEventListener('click', () => {
            document.getElementById('break-confirm').style.display = 'block';
        });

  
        document.getElementById('confirm-break').addEventListener('click', () => {
            document.getElementById('break-confirm').style.display = 'none';
            state.breakCount++;
            state.sessionStarted = false;
            state.breakStarted = true;
            

            state.sessionRemainingTime = state.remainingTime;
            
            const elapsed = (state.selectedTimer * 60) - state.remainingTime;
            let dialogue;
            
            if (elapsed < 300) { // 5 min
                dialogue = "Already? Alright!";
            } else if (elapsed > 600) { // 10 min
                dialogue = "Yeah let's take a break!";
            } else {
                dialogue = "Break time!";
            }
            
            // Show break dialogue
            const textBox = document.createElement('div');
            textBox.className = 'text-box';
            textBox.style.bottom = '100px';
            textBox.style.left = '50%';
            textBox.style.transform = 'translateX(-50%)';
            textBox.style.maxWidth = '80%';
            
            const akechiPic = document.createElement('div');
            akechiPic.className = 'akechi';
            akechiPic.style.backgroundImage = "url('./assetso/normal.webp')";
            akechiPic.style.backgroundSize = 'contain';
            akechiPic.style.backgroundRepeat = 'no-repeat';
            textBox.appendChild(akechiPic);
            
            const textContent = document.createElement('div');
            textContent.className = 'text-content';
            textContent.textContent = dialogue;
            textBox.appendChild(textContent);
            
            const currentScreen = screens[state.currentScreen];
            currentScreen.appendChild(textBox);
            
            setTimeout(() => {
                textBox.remove();
                
                // break screen
                if (state.selectedActivity === 'study') showScreen('studyBreak');
                else if (state.selectedActivity === 'work') showScreen('workBreak');
                else showScreen('hangoutBreak');
                
                const breakCircle = state.selectedActivity === 'study' ? progressCircles[3] : 
                                  state.selectedActivity === 'work' ? progressCircles[4] : progressCircles[5];
                                  
                const breakTimer = state.selectedActivity === 'study' ? timers.studyBreak : 
                                 state.selectedActivity === 'work' ? timers.workBreak : timers.hangoutBreak;
                
                startTimer(5, breakTimer, breakCircle, true);
            }, 2000);
        });

        // Cancel break
        document.getElementById('cancel-break').addEventListener('click', () => {
            document.getElementById('break-confirm').style.display = 'none';
        });

        // continu btnss (breaks)
        document.getElementById('continue-study').addEventListener('click', () => {

            const textBox = document.createElement('div');
            textBox.className = 'text-box';
            textBox.style.bottom = '100px';
            textBox.style.left = '50%';
            textBox.style.transform = 'translateX(-50%)';
            textBox.style.maxWidth = '80%';
            
            const akechiPic = document.createElement('div');
            akechiPic.className = 'akechi';
            akechiPic.style.backgroundImage = "url('./assetso/normal.webp')";
            akechiPic.style.backgroundSize = 'contain';
            akechiPic.style.backgroundRepeat = 'no-repeat';
            textBox.appendChild(akechiPic);
            
            const textContent = document.createElement('div');
            textContent.className = 'text-content';
            textContent.textContent = "Alright let's continue then";
            textBox.appendChild(textContent);
            
            const breakScreen = screens[state.currentScreen];
            breakScreen.appendChild(textBox);
            
            setTimeout(() => {
                textBox.remove();
                showScreen('studySession');
                state.breakStarted = false;
                state.sessionStarted = true;

                document.getElementById('start-btn').classList.add('btn-hidden');

                const circle = progressCircles[0];
                startTimer(
                    state.selectedTimer, 
                    timers.study, 
                    circle, 
                    false, 
                    state.sessionRemainingTime
                );
            }, 2000);
        });

        document.getElementById('continue-work').addEventListener('click', () => {
            const textBox = document.createElement('div');
            textBox.className = 'text-box';
            textBox.style.bottom = '100px';
            textBox.style.left = '50%';
            textBox.style.transform = 'translateX(-50%)';
            textBox.style.maxWidth = '80%';
            
            const akechiPic = document.createElement('div');
            akechiPic.className = 'akechi';
            akechiPic.style.backgroundImage = "url('./assetso/smiling.webp')";
            akechiPic.style.backgroundSize = 'contain';
            akechiPic.style.backgroundRepeat = 'no-repeat';
            textBox.appendChild(akechiPic);
            
            const textContent = document.createElement('div');
            textContent.className = 'text-content';
            textContent.textContent = "After you!";
            textBox.appendChild(textContent);
            
            const breakScreen = screens[state.currentScreen];
            breakScreen.appendChild(textBox);
            
            setTimeout(() => {
                textBox.remove();
                showScreen('workSession');
                state.breakStarted = false;
                state.sessionStarted = true;

                document.getElementById('work-start-btn').classList.add('btn-hidden');

                const circle = progressCircles[1];
                startTimer(
                    state.selectedTimer, 
                    timers.work, 
                    circle, 
                    false, 
                    state.sessionRemainingTime
                );
            }, 2000);
        });

        document.getElementById('continue-hangout').addEventListener('click', () => {
            // dialogue
            const textBox = document.createElement('div');
            textBox.className = 'text-box';
            textBox.style.bottom = '100px';
            textBox.style.left = '50%';
            textBox.style.transform = 'translateX(-50%)';
            textBox.style.maxWidth = '80%';
            
            const akechiPic = document.createElement('div');
            akechiPic.className = 'akechi';
            akechiPic.style.backgroundImage = "url('./assetso/normal.webp')";
            akechiPic.style.backgroundSize = 'contain';
            akechiPic.style.backgroundRepeat = 'no-repeat';
            textBox.appendChild(akechiPic);
            
            const textContent = document.createElement('div');
            textContent.className = 'text-content';
            textContent.textContent = "Let's go!";
            textBox.appendChild(textContent);
            
            const breakScreen = screens[state.currentScreen];
            breakScreen.appendChild(textBox);
            
            setTimeout(() => {
                textBox.remove();
                showScreen('hangoutSession');
                state.breakStarted = false;
                state.sessionStarted = true;
                
                document.getElementById('hangout-start-btn').classList.add('btn-hidden');
                
                const circle = progressCircles[2];
                startTimer(
                    state.selectedTimer, 
                    timers.hangout, 
                    circle, 
                    false, 
                    state.sessionRemainingTime
                );
            }, 2000);
        });

        // end sesh btns (main)
        document.getElementById('end-session').addEventListener('click', () => {
            document.getElementById('end-confirm').style.display = 'block';
        });

        document.getElementById('work-end-session').addEventListener('click', () => {
            document.getElementById('end-confirm').style.display = 'block';
        });

        document.getElementById('hangout-end-session').addEventListener('click', () => {
            document.getElementById('end-confirm').style.display = 'block';
        });

        // end sesh btns (breaks)
        document.getElementById('end-study-break').addEventListener('click', () => {
            document.getElementById('end-confirm').style.display = 'block';
        });

        document.getElementById('end-work-break').addEventListener('click', () => {
            document.getElementById('end-confirm').style.display = 'block';
        });

        document.getElementById('end-hangout-break').addEventListener('click', () => {
            document.getElementById('end-confirm').style.display = 'block';
        });

    
        document.getElementById('confirm-end').addEventListener('click', () => {
            document.getElementById('end-confirm').style.display = 'none';
            clearInterval(state.timerInterval);
            showScreen('endScreen');
        });

       
        document.getElementById('cancel-end').addEventListener('click', () => {
            document.getElementById('end-confirm').style.display = 'none';
        });

        
        document.getElementById('thank-btn').addEventListener('click', () => {
            showScreen('returnHome');
        });

        document.getElementById('complete-thank-btn').addEventListener('click', () => {
            showScreen('returnHome');
        });

        document.getElementById('return-home-btn').addEventListener('click', () => {
            state.currentScreen = 'home';
            state.selectedActivity = null;
            state.selectedTimer = 25;
            state.breakCount = 0;
            state.sessionStarted = false;
            state.breakStarted = false;
            clearInterval(state.timerInterval);
            
            timers.study.textContent = '25:00';
            timers.work.textContent = '25:00';
            timers.hangout.textContent = '25:00';
            timers.studyBreak.textContent = '5:00';
            timers.workBreak.textContent = '5:00';
            timers.hangoutBreak.textContent = '5:00';
            
            progressCircles.forEach(circle => {
                circle.style.strokeDashoffset = 314; // Full circle
            });

            document.getElementById('start-btn').classList.remove('btn-hidden');
            document.getElementById('work-start-btn').classList.remove('btn-hidden');
            document.getElementById('hangout-start-btn').classList.remove('btn-hidden');
            
            document.getElementById('start-text').style.display = 'block';
            showScreen('home');
        });

        // random dialogue
        document.querySelectorAll('.session-screen, .break-screen').forEach(screen => {
            screen.addEventListener('click', (e) => {
            
                if (!e.target.closest('.btn') && !e.target.closest('.timer-circle-container')) {
                    showRandomDialogue();
                }
            });
        });

        progressCircles.forEach(circle => {
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = circumference;
        });