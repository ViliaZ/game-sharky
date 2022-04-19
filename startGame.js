/**
 * EventHandler: Click on start button in welcome.html
 * initializes Animation on start button
 * triggers OpenGameURL
 */
function startAnimation() {
    let headline = document.getElementById('headline');
    headline.classList.add('wateranimation');
    setTimeout(openGameURL, 1900)
}


/**
 * Starts Game by redirect to index.html in same browser window
 */
function openGameURL() {
    window.open('index.html', '_self');
}
