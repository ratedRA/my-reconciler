let vDom = [];

function createElement(currentDOM, newDOM) {
    var parentElement = document.getElementById("mainArea");

    // getting children is also an expensive operation, removing it using virtual DOM
    //var currentChildren = Array.from(parentElement.children);

    // just update the dom with the changes instead of writing it whole again
    // parentElement.innerHTML = '';

    let added = 0, updated = 0, deleted = 0;

    newDOM.forEach(item => {
        var existingItem = currentDOM.find((child) => {
            return child.id === item.id;
        });

        if (existingItem) {
            updated++;
            var existingChild = document.querySelector(`[data-id='${item.id}']`);

            existingChild.children[0].innerHTML = item.title;
            existingChild.children[1].innerHTML = item.description;
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
        }
    });

    // Any item left in the existingDOM array no longer exist in the data, so remove them
    currentDOM.forEach(function (oldItem) {
        if (!newDOM.some(item => item.id === oldItem.id)) {
            deleted++;
            var childToRemove = document.querySelector(`[data-id='${oldItem.id}']`);
            parentElement.removeChild(childToRemove);
        }
    });
    console.log({
        updated: updated,
        added: added,
        deleted: deleted
    });
}

function updateVirtualDom(data) {
    let existingVDom = [...vDom];
    vDom = data.map((item) => {
        return {
            id: item.id,
            description: item.description,
            title: item.title
        }
    });
    createElement(existingVDom, vDom);

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
    updateVirtualDom(todos);
}, 5000);