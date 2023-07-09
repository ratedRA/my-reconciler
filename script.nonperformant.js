function createElement(data) {
    var parentElement = document.getElementById("mainArea");
    console.log(data);
    parentElement.innerHTML = '';

    var added = 0;
    data.forEach(item => {
        added++;
        var childDoc = document.createElement('div')
        childDoc.dataset.id = item.id;

        var grandChild1 = document.createElement("span");
        grandChild1.innerHTML = item.title;

        var grandChild2 = document.createElement("span");
        grandChild1.innerHTML = item.description;

        var grandChild3 = document.createElement("button");
        grandChild3.innerHTML = "DELETE";
        grandChild3.setAttribute("onClick", "deleteTodo(" + item.id + ")");

        childDoc.appendChild(grandChild1);
        childDoc.appendChild(grandChild2);
        childDoc.appendChild(grandChild3);

        parentElement.appendChild(childDoc);
    });
}

window.setInterval(() => {
    let todos = [];
    console.log("about to enter the loop..")
    for (let i = 0; i<Math.floor(Math.random() * 100); i++) {
        console.log("entered")
        todos.push({
            id: i+1,
            title: "hello",
            description: "first try"
        });
    }
    createElement(todos);
}, 2000)