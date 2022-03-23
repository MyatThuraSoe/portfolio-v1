
const toplines = document.querySelectorAll('.top-line');

toplines.forEach((topline) => {
    topline.addEventListener('click', () => {
        event.target.parentNode.nextElementSibling.classList.toggle('appear');
    });
});
