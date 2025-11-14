let timeRemaining = 30 * 60; // 30 minutes in seconds
        let timerInterval;
        let missionActive = true;
        let refreshRequested = false;
        let attemptsRemaining = 3;

        const countdownDisplay = document.getElementById('countdown');
        const passwordInput = document.getElementById('password');
        const submitBtn = document.getElementById('submitBtn');
        const statusMessage = document.getElementById('statusMessage');
        const confirmationOverlay = document.getElementById('confirmationOverlay');
        const confirmRefreshBtn = document.getElementById('confirmRefresh');
        const cancelRefreshBtn = document.getElementById('cancelRefresh');
        const crashAnimation = document.getElementById('crashAnimation');

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }

        function updateCountdown() {
            countdownDisplay.textContent = formatTime(timeRemaining);
            
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                missionFailed();
                return;
            }
            
            timeRemaining--;
        }

        function startCountdown() {
            timerInterval = setInterval(updateCountdown, 1000);
        }

        function checkPassword() {
            if (!missionActive) return;
            
            const enteredPassword = passwordInput.value.trim().toLowerCase();
            const correctPassword = 'asclepias';
            
            if (enteredPassword === correctPassword) {
                missionSuccess();
            } else if (enteredPassword !== '') {
                showWrongPassword();
            }
        }

        function showWrongPassword() {
            attemptsRemaining--;
            
            if (attemptsRemaining <= 0) {
                missionFailed();
                return;
            }
            
            statusMessage.textContent = `Access Denied! Incorrect emergency code. ${attemptsRemaining} attempts remaining.`;
            statusMessage.className = "status-message failure";
            statusMessage.style.display = "block";
            
            // Flash the input field red
            passwordInput.style.borderColor = "#ff6b6b";
            passwordInput.style.boxShadow = "0 0 15px rgba(255, 107, 107, 0.5)";
            
            // Clear the input
            passwordInput.value = "";
            
            // Reset input styling after 2 seconds
            setTimeout(() => {
                if (missionActive) {
                    passwordInput.style.borderColor = "#00ff88";
                    passwordInput.style.boxShadow = "none";
                    statusMessage.style.display = "none";
                }
            }, 2000);
        }

        function missionSuccess() {
            missionActive = false;
            clearInterval(timerInterval);
            
            statusMessage.textContent = "Asclepias is a genus of plants, commonly known as milkweeds, and btw you just saved the astronauts' lives.";
            statusMessage.className = "status-message success";
            statusMessage.style.display = "block";
            
            document.querySelector('.control-panel').style.borderColor = "#00ff88";
            document.querySelector('.control-panel').style.boxShadow = "0 0 30px rgba(0, 255, 136, 0.6)";
            
            submitBtn.disabled = true;
            passwordInput.disabled = true;
        }

        function missionFailed() {
            missionActive = false;
            clearInterval(timerInterval);
            
            statusMessage.textContent = "Mission failed. Your spacecraft has crashed.";
            statusMessage.className = "status-message failure";
            statusMessage.style.display = "block";
            
            document.querySelector('.control-panel').style.borderColor = "#ff6b6b";
            document.querySelector('.control-panel').style.boxShadow = "0 0 30px rgba(255, 107, 107, 0.6)";
            
            submitBtn.disabled = true;
            passwordInput.disabled = true;
            
            // Show crash animation
            showCrashAnimation();
        }

        function showCrashAnimation() {
            crashAnimation.style.display = "flex";
            
            // Hide animation after 5 seconds
            setTimeout(() => {
                crashAnimation.style.display = "none";
            }, 5000);
        }

        function showConfirmation() {
            confirmationOverlay.style.display = "flex";
        }

        function hideConfirmation() {
            confirmationOverlay.style.display = "none";
        }

        // Event listeners
        submitBtn.addEventListener('click', checkPassword);
        
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
/*
        // Refresh confirmation system
        window.addEventListener('beforeunload', function(e) {
            if (missionActive && !refreshRequested) {
                e.preventDefault();
                showConfirmation();
                return '';
            }
        });

        confirmRefreshBtn.addEventListener('click', function() {
            refreshRequested = true;
            hideConfirmation();
            window.location.reload();
        });

        cancelRefreshBtn.addEventListener('click', function() {
            hideConfirmation();
        });
*/
        // Start the mission
        startCountdown();
        passwordInput.focus();

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'99e6573ec27eddce',t:'MTc2MzEyMTU0Ni4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();