function startAnimation() {
    let headline = document.getElementById('headline');
    headline.classList.add('wateranimation');
    setTimeout(openGameURL, 1900)
}

function openGameURL() {
    window.open('index.html', '_self');
}
