document.addEventListener('mousemove', event => {
const x = (event.clientX / window.innerWidth) * 100;
const y = (event.clientY / window.innerHeight) * 100;
document.body.style.setProperty('--cursor-x', `${x}%`);
document.body.style.setProperty('--cursor-y', `${y}%`);
});

