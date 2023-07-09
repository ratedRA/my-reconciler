function createElement(data) {
    var parentElement = document.getElementById("mainArea");
    console.log(data);

    var currentChildren = Array.from(parentElement.children);

    // just update the dom with the changes instead of writing it whole again
    // parentElement.innerHTML = '';

    let added = 0, updated = 0, deleted = 0;

    data.forEach(item => {
        var existingChildren = currentChildren.find((child) => {
            return child.dataset.id = item.id;
        });

        if (existingChildren) {
            updated++;
            existingChildren.children[0].innerHTML = item.title;
            existingChildren.children[1].innerHTML = item.description;

            // to find the number of deletes
            currentChildren = currentChildren.filter((child) => {
                return child != existingChildren;
            })
        } else {

            added++;
            var childDoc = document.createElement('div')
            childDoc.dataset.id = item.id;

            var grandChild1 = document.createElement("span");
            grandChild1.innerHTML = item.title;

            var grandChild2 = document.createElement("span");
            grandChild2.innerHTML = item.description;

            var grandChild3 = document.createElement("button");
            grandChild3.innerHTML = "DELETE";
            grandChild3.setAttribute("onClick", "deleteTodo(" + item.id + ")");

            childDoc.appendChild(grandChild1);
            childDoc.appendChild(grandChild2);
            childDoc.appendChild(grandChild3);

            parentElement.appendChild(childDoc);
        }});

        // get total number of deletes, any element left in the currentChildren should get 
        // deleted
        currentChildren.forEach((item) => {
            deleted++;
            parentElement.removeChild(item);
        });
        console.log({
            updated: updated,
            added: added,
            deleted: deleted
        });
}

window.setInterval(() => {
    let todos = [];
    for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
        todos.push({
            id: i + 1,
            title: "hello",
            description: "first try"
        });
    }
    createElement(todos);
}, 5000);