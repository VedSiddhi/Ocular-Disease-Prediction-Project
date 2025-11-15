function createButterfly() {
    const butterfly = document.createElement('div');
    butterfly.className = 'butterfly';
    
    // Random starting position
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    
    // Random animation duration between 10 and 20 seconds
    const duration = 10 + Math.random() * 10;
    
    butterfly.style.setProperty('--start-x', `${startX}px`);
    butterfly.style.setProperty('--start-y', `${startY}px`);
    butterfly.style.setProperty('--duration', `${duration}s`);
    
    // Random size between 10px and 30px
    const size = 10 + Math.random() * 20;
    butterfly.style.width = `${size}px`;
    butterfly.style.height = `${size}px`;
    
    // Random color
    const hue = Math.random() * 360;
    butterfly.style.background = `hsla(${hue}, 70%, 70%, 0.7)`;
    
    return butterfly;
}

function initButterflies() {
    const background = document.createElement('div');
    background.className = 'butterfly-background';
    document.body.insertBefore(background, document.body.firstChild);
    
    // Create 20 butterflies
    for (let i = 0; i < 20; i++) {
        const butterfly = createButterfly();
        background.appendChild(butterfly);
    }
    
    // Add new butterflies periodically
    setInterval(() => {
        if (background.children.length < 30) {
            const butterfly = createButterfly();
            background.appendChild(butterfly);
        }
    }, 3000);
    
    // Remove butterflies that have completed their animation
    setInterval(() => {
        const butterflies = background.getElementsByClassName('butterfly');
        if (butterflies.length > 20) {
            background.removeChild(butterflies[0]);
        }
    }, 5000);
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', initButterflies); 