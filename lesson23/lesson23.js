// Создать страницу которая через prompt будет получать строку и выводить ее в центр экрана.
// Строка должна менять свой цвет на случайный каждые 10 секунд и и счезнуть через 30 секунд.

function sayHi() {
    let name = prompt("Enter your name");
    let result = `Hello ${name}!!!`;
    return result;
}
let message = sayHi();
let div = document.createElement("div");

div.innerHTML = message;
document.body.append(div);
div.style.cssText = `color: lime;
    font-size: 40px;
    display: flex;
    justify-content: center;
    padding-top: calc(25% - 40px);
  `;
let colors = ["grey", "yellow", "red", "blue", "Pink", "Violet", "Indigo", "Salmon", "Coral", "Green", "Aqua", "Olive"];
function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
async function showMessage() {
    for (let i = 0; i < 10; i++) {
        const color = new Promise((resolve) => {
            setTimeout(() => resolve((div.style.color = colors[random(0, colors.length - 1)])), 3 * 1000);
            // сделал изменение цвета каждые 3 секунды вместо 10
        });
        await color;
    }
    div.remove();
}
showMessage();
