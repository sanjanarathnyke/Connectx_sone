// Knight Rider theme profile page script

// CONFIGURATION: Replace with your profile information
const CONFIG = {
    // LinkedIn Information
    linkedIn: {
        name: "Sanjana Rathnayake",
        title: "FullStack Developer",
        location: "SWE | Undergraduate",
        connections: "500+",
        skills: "4",
        profileUrl: "https://www.linkedin.com/in/sanjana-rathnayake-a72238234/",
        pictureUrl: "images/WhatsApp Image 2025-04-08 at 20.23.20_983101ce.jpg"
    },
    
    // GitHub Information
    github: {
        username: "sanjanarathnyke",
        bio: "Tech Enthusiast",
        repos: "24",
        followers: "17",
        following: "8",
        profileUrl: "https://github.com/sanjanarathnyke",
        pictureUrl: "images/226a6021-4a9a-4524-a17d-aaae397f7217.png"
    }
};

// Knight Rider sound effects
const SOUNDS = {
    startup: {
        src: "sounds/futuristic-ui-sound-sensor-33-101soundboards.mp3", // Sound to play on page load
        volume: 0.3
    }
};

// Terminal typing effect for text elements
function typeWriterEffect(element, text, speed = 50) {
    if (!element) return;
    
    element.textContent = "";
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Function to play Knight Rider sound effects
function playSound(soundName) {
    const sound = SOUNDS[soundName];
    if (sound) {
        console.log(`Attempting to play: ${sound.src} at volume ${sound.volume}`);
        const audio = new Audio(sound.src);
        audio.volume = sound.volume;
        audio.play()
            .then(() => console.log(`Successfully played: ${sound.src}`))
            .catch(e => {
                console.error(`Error playing ${sound.src}:`, e.message);
                // Fallback: Play on first user interaction
                document.body.addEventListener('click', () => {
                    audio.play()
                        .then(() => console.log("Sound played on user interaction"))
                        .catch(e => console.error("Retry failed:", e.message));
                }, { once: true });
            });
    } else {
        console.error(`Sound not found for: ${soundName}`);
    }
}

// Function to populate LinkedIn profile information
function populateLinkedInProfile() {
    const nameEl = document.getElementById("linkedin-name");
    const titleEl = document.getElementById("linkedin-title");
    const locationEl = document.getElementById("linkedin-location");
    
    document.getElementById("linkedin-connections").textContent = CONFIG.linkedIn.connections;
    document.getElementById("linkedin-skills").textContent = CONFIG.linkedIn.skills;
    document.getElementById("linkedin-url").href = CONFIG.linkedIn.profileUrl;
    
    setTimeout(() => typeWriterEffect(nameEl, CONFIG.linkedIn.name, 70), 300);
    setTimeout(() => typeWriterEffect(titleEl, CONFIG.linkedIn.title, 50), 1200);
    setTimeout(() => typeWriterEffect(locationEl, CONFIG.linkedIn.location, 50), 2000);
    
    if (CONFIG.linkedIn.pictureUrl) {
        document.getElementById("linkedin-pic").src = CONFIG.linkedIn.pictureUrl;
    }
}

// Function to fetch GitHub profile using GitHub API (if enabled)
async function fetchGitHubProfile() {
    const nameEl = document.getElementById("github-name");
    const bioEl = document.getElementById("github-bio");
    
    try {
        populateGitHubProfile();
    } catch (error) {
        console.error("Error fetching GitHub profile:", error);
        populateGitHubProfile();
    }
}

// Function to populate GitHub profile with static configuration
function populateGitHubProfile() {
    const nameEl = document.getElementById("github-name");
    const bioEl = document.getElementById("github-bio");
    
    document.getElementById("github-repos").textContent = CONFIG.github.repos;
    document.getElementById("github-followers").textContent = CONFIG.github.followers;
    document.getElementById("github-following").textContent = CONFIG.github.following;
    document.getElementById("github-url").href = CONFIG.github.profileUrl;
    
    setTimeout(() => typeWriterEffect(nameEl, CONFIG.github.username, 70), 2500);
    setTimeout(() => typeWriterEffect(bioEl, CONFIG.github.bio, 50), 3200);
    
    if (CONFIG.github.pictureUrl) {
        document.getElementById("github-pic").src = CONFIG.github.pictureUrl;
    } else {
        document.getElementById("github-pic").src = "assets/profile.png";
    }
}

// Add Knight Rider button effects (no sound on buttons)
function addKnightRiderEffects() {
    const buttons = document.querySelectorAll('.kr-button, .qr-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (button.id === 'linkedin-url' || button.id === 'github-url') {
                showPopup(button.getAttribute('id') === 'linkedin-url' ? 'LinkedIn' : 'GitHub');
            } else if (button.id === 'linkedin-qr-btn' || button.id === 'github-qr-btn') {
                showQRPopup(button.id === 'linkedin-qr-btn' ? CONFIG.linkedIn.profileUrl : CONFIG.github.profileUrl);
            }
        });
    });
    
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('card-active');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('card-active');
        });
    });
}

// Add special visual effects
function addVisualEffects() {
    const krTexts = document.querySelectorAll('.kr-text');
    krTexts.forEach(text => {
        setInterval(() => {
            if (Math.random() > 0.97) {
                text.style.opacity = '0.7';
                setTimeout(() => {
                    text.style.opacity = '1';
                }, 100);
            }
        }, 500);
    });
    
    const background = document.querySelector('.kr-background');
    for (let i = 0; i < 50; i++) {
        const scanLine = document.createElement('div');
        scanLine.classList.add('scan-line');
        scanLine.style.top = `${i * 2}vh`;
        background.appendChild(scanLine);
    }
}

// Function to show initialization popup
function showPopup(type) {
    const popup = document.getElementById('popupOverlay');
    popup.style.display = 'flex';
    
    setTimeout(() => {
        popup.style.display = 'none';
        if (type === 'LinkedIn') {
            window.open(CONFIG.linkedIn.profileUrl, '_blank');
        } else {
            window.open(CONFIG.github.profileUrl, '_blank');
        }
    }, 2000);
}

// Function to show QR code popup
function showQRPopup(url) {
    const popup = document.getElementById('qrPopup');
    const qrContainer = document.getElementById('qr-container');
    qrContainer.innerHTML = '';

    new QRCode(qrContainer, {
        text: url,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    popup.style.display = 'flex';

    document.getElementById('close-qr-btn').addEventListener('click', () => {
        popup.style.display = 'none';
    });
}

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.kr-title');
    title.style.opacity = '0';
    
    setTimeout(() => {
        title.style.opacity = '1';
        title.style.transition = 'opacity 1s ease-in-out';
        
        // Play sound when page opens
        playSound('startup');
    }, 500);
    
    setTimeout(() => {
        populateLinkedInProfile();
        fetchGitHubProfile();
    }, 1000);
    
    addKnightRiderEffects();
    addVisualEffects();
    
    console.log("Knight Rider Profile System Online");
});