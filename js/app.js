console.log("script loaded");

const root = document.getElementById("root");

const rows = 10;
const cols = 10;


for(let i = 0; i < rows; i ++) {
    const row = document.createElement("div");
    row.classList.add("game-board__row");
    for(let j = 0; j < cols; j++) {
        const col = document.createElement("div");
        col.classList.add("game-board__col");
        row.append(col);
    }
    root.append(row);
}
console.log(root.innerHTML);