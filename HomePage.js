$(document).ready(function() {
    const text = "This is a typing effect."; // Your desired text
const delay = 100; // Time delay between each letter (in milliseconds)

let index = 0;
function typeWriter() {
  if (index < text.length) {
    const typingTextElement = document.getElementById("text");
    typingTextElement.textContent += text.charAt(index);
    index++;
    setTimeout(typeWriter, delay);
  }
}

typeWriter();
  });