let db;

const request = indexedDB.open('budget_db', 1);

request.onupgradeneeded = function(event) {

    const db = event.target.result;

    db.createObjectStore('new_item', {autoIncrement: true});
};

request.onsuccess = function(event) {

    db = event.target.result;

    if(navigator.onLine) {

    }
};

request.onerror = function(event) {

    console.log(event.target.errorCode);
};

function saveRecord(record) {
    const transaction = db.transaction(['new_item'], 'readwrite');

    const budgetObjectStore = transaction.objectStore('new_item');

    budgetObjectStore.add(record);
}

function uploadBudget() {

    const traansaction = db.transaction(['new_item'], 'readwrite');

    const budgetObjectStore = transaction.objectStore('new_item');

    const getAll = budgetObjectStore.getAll();

    getAll.onsuccess = function() {

        if(getAll.result.length > 0) {
            fetch('/api/transaction', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/play, */*',
                    'Content-Type': 'application/json'
                }
            })

            .then(response => response.json())
            .then(serverResponse => {
                if (serverResponse.message) {
                    throw new Error(serverResponse);
                }

                const transaction = db.transaction(['new_item'], 'readwrite');

                const budgetObjectStore = transaction.objectStore('new_item');

                budgetObjectStore.clear();

                alert('All saved budget items have been submitted!');
            })

            .catch(err => {
                
                console.log(err);

            });
        }
    };
}

window.addEventListener('online', uploadBudget);