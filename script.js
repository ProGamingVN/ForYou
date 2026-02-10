// Global variables
let currentPage = 1;
let noClickCount = 0;

// Password check function
function checkPassword() {
    const input = document.getElementById('passwordInput');
    const errorMsg = document.getElementById('errorMessage');
    const password = input.value.trim();
    
    if (password === 'mtieniuavi:>') {
        // Create confetti effect
        createConfetti();
        
        // Success - go to next page
        setTimeout(() => {
            goToPage(2);
        }, 500);
    } else {
        // Wrong password
        errorMsg.textContent = 'Ơ, sai rồi nè! Thử lại đi 😊';
        input.value = '';
        input.classList.add('shake');
        
        setTimeout(() => {
            input.classList.remove('shake');
        }, 500);
    }
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .shake {
        animation: shake 0.5s;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Allow Enter key for password
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
    
    // Initialize page 7 cute list animation when reaching that page
    observePageChanges();
});

// Page navigation
function goToPage(pageNumber) {
    const currentPageEl = document.querySelector('.page.active');
    const nextPageEl = document.getElementById('page' + pageNumber);
    
    if (currentPageEl) {
        currentPageEl.classList.remove('active');
    }
    
    if (nextPageEl) {
        nextPageEl.classList.add('active');
        currentPage = pageNumber;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Special animations for specific pages
        if (pageNumber === 2) {
            createConfetti();
        } else if (pageNumber === 6) {
            createHeartsRain();
        } else if (pageNumber === 7) {
            animateCuteList();
        } else if (pageNumber === 9) {
            createFinalHearts();
        }
    }
}

// Show result for page 3
function showResult() {
    const buttons = document.getElementById('checkButtons');
    const resultBox = document.getElementById('resultBox');
    
    buttons.style.display = 'none';
    resultBox.classList.remove('hidden');
}

// Handle "No" button clicks on page 5
function handleNoClick() {
    noClickCount++;
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const quizButtons = document.getElementById('quizButtons');
    const finalAnswer = document.getElementById('finalAnswer');
    
    if (noClickCount === 1) {
        // First click - buttons change text and size
        yesBtn.textContent = 'Hình như là...';
        noBtn.textContent = 'Ngày gì vậy tròi';
        
        yesBtn.style.transform = 'scale(1.1)';
        noBtn.style.transform = 'scale(0.9)';
        
    } else if (noClickCount === 2) {
        // Second click - buttons change again
        yesBtn.textContent = 'Khoan đã...!';
        noBtn.textContent = 'Không bít luôn';
        
        yesBtn.style.transform = 'scale(1.2)';
        noBtn.style.transform = 'scale(0.8)';
        
    } else if (noClickCount === 3) {
        // Third click - show final answer
        quizButtons.style.display = 'none';
        finalAnswer.classList.remove('hidden');
    }
}

// Confetti effect
function createConfetti() {
    const container = document.querySelector('.confetti-container');
    if (!container) return;
    
    const colors = ['#d946a6', '#b388b3', '#ffc0cb', '#d8b4d8', '#ff69b4'];
    const confettiCount = 80;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        
        container.appendChild(confetti);
        
        // Animate confetti falling
        const duration = 2000 + Math.random() * 2000;
        const endLeft = parseFloat(confetti.style.left) + (Math.random() - 0.5) * 100;
        
        confetti.animate([
            { 
                top: '-10px', 
                left: confetti.style.left,
                opacity: 1,
                transform: 'rotate(0deg)'
            },
            { 
                top: '100vh', 
                left: endLeft + '%',
                opacity: 0,
                transform: 'rotate(720deg)'
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, duration);
    }
}

// Hearts rain effect
function createHeartsRain() {
    const container = document.querySelector('.hearts-rain');
    if (!container) return;
    
    const hearts = ['💖', '💕', '💗', '💓', '💝'];
    const heartCount = 30;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'absolute';
            heart.style.fontSize = (20 + Math.random() * 20) + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '-50px';
            heart.style.opacity = '0.8';
            
            container.appendChild(heart);
            
            // Animate heart falling
            const duration = 3000 + Math.random() * 2000;
            
            heart.animate([
                { 
                    top: '-50px', 
                    opacity: 0.8,
                    transform: 'rotate(0deg) scale(1)'
                },
                { 
                    top: '50%',
                    opacity: 0.8,
                    transform: 'rotate(180deg) scale(1.2)'
                },
                { 
                    top: '100vh', 
                    opacity: 0,
                    transform: 'rotate(360deg) scale(0.8)'
                }
            ], {
                duration: duration,
                easing: 'linear'
            });
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, duration);
        }, i * 100);
    }
}

// Sparkles effect
function createSparkles() {
    const container = document.querySelector('.sparkles');
    if (!container) return;
    
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '20px';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.opacity = '0';
        
        container.appendChild(sparkle);
        
        sparkle.animate([
            { opacity: 0, transform: 'scale(0)' },
            { opacity: 1, transform: 'scale(1.5)' },
            { opacity: 0, transform: 'scale(0)' }
        ], {
            duration: 1500,
            easing: 'ease-in-out'
        });
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1500);
    }, 300);
}

// Animate cute list items one by one
function animateCuteList() {
    const items = document.querySelectorAll('#page7 .cute-item');
    
    items.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('show');
        }, index * 400);
    });
}

// Final hearts effect
function createFinalHearts() {
    const container = document.querySelector('.final-hearts');
    if (!container) return;
    
    const hearts = ['💖', '💕', '💗', '💓', '💝', '💘'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'absolute';
            heart.style.fontSize = '30px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.opacity = '0';
            
            container.appendChild(heart);
            
            heart.animate([
                { opacity: 0, transform: 'scale(0) rotate(0deg)' },
                { opacity: 0.8, transform: 'scale(1.5) rotate(180deg)' },
                { opacity: 0, transform: 'scale(0) rotate(360deg)' }
            ], {
                duration: 2000,
                easing: 'ease-in-out'
            });
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }, i * 200);
    }
}

// Smile button function
function makeSmile() {
    const overlay = document.getElementById('smileOverlay');
    overlay.classList.add('show');
}

function closeSmile() {
    const overlay = document.getElementById('smileOverlay');
    overlay.classList.remove('show');
}

// Save memory function
function saveMemory() {
    // Create a download link for the webpage
    const message = `
🎉 Kỷ niệm Valentine đầu tiên! 🎉

Dành cho: Nguyễn Anh Vy
Biệt danh: Gà nhỏ vĩ đại, Eve, Chiến sĩ nhỏ, Pudding, Đậu đỏ

Bạn dễ thương thiệt đó! 💖

Hãy luôn cười nhiều nhé!
`;
    
    // Create a blob with the message
    const blob = new Blob([message], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Valentine_Đầu_Tiên_💖.txt';
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    
    // Show a nice message
    alert('Đã lưu kỷ niệm! 💖\n\nHãy giữ nó thật tốt nha! 😊');
}

// Observe page changes for special effects
function observePageChanges() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const page = mutation.target;
                if (page.classList.contains('active')) {
                    // Trigger page-specific effects
                    const pageId = page.id;
                    
                    if (pageId === 'page4') {
                        setTimeout(createSparkles, 500);
                    }
                }
            }
        });
    });
    
    // Observe all pages
    document.querySelectorAll('.page').forEach(page => {
        observer.observe(page, { attributes: true });
    });
}

// Add floating elements dynamically
function addFloatingElements() {
    // Add more floating hearts randomly
    setInterval(() => {
        const floatingHearts = document.querySelector('.floating-hearts');
        if (!floatingHearts || !document.querySelector('.page.active')) return;
        
        const heart = document.createElement('div');
        heart.textContent = Math.random() > 0.5 ? '💖' : '💕';
        heart.style.position = 'absolute';
        heart.style.fontSize = '25px';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '-50px';
        heart.style.opacity = '0.3';
        heart.style.pointerEvents = 'none';
        
        floatingHearts.appendChild(heart);
        
        const duration = 10000 + Math.random() * 5000;
        
        heart.animate([
            { 
                top: '-50px',
                opacity: 0,
                transform: 'rotate(0deg)'
            },
            { 
                top: '20%',
                opacity: 0.3
            },
            { 
                top: '100vh',
                opacity: 0,
                transform: 'rotate(360deg)'
            }
        ], {
            duration: duration,
            easing: 'linear'
        });
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, duration);
    }, 3000);
}

// Initialize floating elements
setTimeout(addFloatingElements, 1000);

// Add cursor trail effect (hearts following cursor)
let cursorHearts = [];
document.addEventListener('mousemove', (e) => {
    // Only on pages 6 and 9 (Valentine reveal and final page)
    if (currentPage !== 6 && currentPage !== 9) return;
    
    // Limit number of hearts
    if (Math.random() > 0.92) {
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = '15px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '999';
        heart.style.opacity = '0.6';
        
        document.body.appendChild(heart);
        cursorHearts.push(heart);
        
        heart.animate([
            { 
                opacity: 0.6,
                transform: 'translate(0, 0) scale(1)'
            },
            { 
                opacity: 0,
                transform: 'translate(0, -50px) scale(0.5)'
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
            cursorHearts = cursorHearts.filter(h => h !== heart);
        }, 1000);
    }
});

// Prevent right-click and text selection for a more app-like feel (optional)
document.addEventListener('contextmenu', (e) => {
    // Allow right-click on input fields
    if (e.target.tagName !== 'INPUT') {
        // Comment out the line below if you want to allow right-click
        // e.preventDefault();
    }
});

// Add some Easter eggs
let secretClickCount = 0;
document.addEventListener('click', (e) => {
    // Click on title 5 times for secret message
    if (e.target.classList.contains('title')) {
        secretClickCount++;
        
        if (secretClickCount === 5) {
            const messages = [
                'Bạn thật sự rất đặc biệt đó! 💖',
                'Cảm ơn vì đã đọc kỹ đến vậy! 😊',
                'Hy vọng bạn thích món quà này! 🎁',
                'Bạn tìm thấy tin nhắn bí mật rồi! 🌟'
            ];
            
            alert(messages[Math.floor(Math.random() * messages.length)]);
            secretClickCount = 0;
        }
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'N' for next page (except on password input)
    if (e.key === 'n' && document.activeElement.type !== 'password') {
        if (currentPage < 9) {
            goToPage(currentPage + 1);
        }
    }
    
    // Press 'P' for previous page
    if (e.key === 'p' && currentPage > 1) {
        goToPage(currentPage - 1);
    }
    
    // Press 'H' for home (page 1)
    if (e.key === 'h' && currentPage !== 1) {
        goToPage(1);
    }
});

console.log('💖 Website được làm với rất nhiều yêu thương! 💖');
console.log('Dành tặng: Nguyễn Anh Vy');
console.log('Valentine đầu tiên của tụi mình! 🎉');
