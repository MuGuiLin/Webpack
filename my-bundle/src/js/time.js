export function time() {
    const h1 = document.createElement('h1');
    h1.style.cssText = 'color: blue; font-size: 56px; text-align: center;';
    h1.innerHTML = new Date().toLocaleString();
    document.body.appendChild(h1);

    setInterval(function () {
        // document.write(new Date().toTimeString());
        // document.body.innerHTML = new Date().toTimeString();
        h1.innerHTML = new Date().toLocaleString();
    }, 1000);
}