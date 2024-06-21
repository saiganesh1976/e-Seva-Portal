const texts = ["Need Ambulance!", "Fastag Recharge!","Emergency Blood!","Need Petrol!", "Need Police!"];
const typingSpeed = 100;
const pauseDuration = 1000;
const typingContainer = document.getElementById('typing-container');
const cursor = document.getElementById('cursor');

let textIndex = 0;
let charIndex = 0;

function typeText() {
    if (textIndex < texts.length) {
        if (charIndex < texts[textIndex].length) {
            typingContainer.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        } else {
            setTimeout(eraseText, pauseDuration);
        }
    }
}

function eraseText() {
    if (charIndex > 0) {
        typingContainer.textContent = texts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, typingSpeed / 2);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeText, typingSpeed);
    }
}

typeText();
