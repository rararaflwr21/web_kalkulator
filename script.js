document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (/[0-9+\-*/.%]/.test(key)) {
        appendCharacter(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

function appendCharacter(char) {
    let display = document.getElementById('display');

    if (display.value === '0' && char !== '.') {
        display.value = char; 
    } else {
        display.value += char;
    }
    
    updateResult();
}


function clearDisplay() {
    document.getElementById('display').value = '0';
    document.getElementById('result').value = '';
}

function deleteLast() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);

    if (display.value === '') {
        display.value = '0';
    }

    updateResult();
}


function updateResult() {
    try {
        let expression = document.getElementById('display').value;
        if (expression) {
            document.getElementById('result').value = eval(expression);
        } else {
            document.getElementById('result').value = '';
        }
    } catch {
        document.getElementById('result').value = 'ERR#://';
    }
}

function calculateResult() {
    let resultField = document.getElementById('result');
    let displayField = document.getElementById('display');
    
    if (resultField.value !== 'ERR#://' && resultField.value !== '') {
        let expression = displayField.value;
        let result = resultField.value;
        
        let historyList = document.getElementById('history-list');
        let listItem = document.createElement('li');
        listItem.innerHTML = `${expression} = ${result} <button onclick="removeHistoryItem(this)">X</button>`;
        historyList.appendChild(listItem);
        
        displayField.value = result;
        resultField.value = '';
    }
}

function removeHistoryItem(button) {
    button.parentElement.remove();
}

function toggleHistory() {
    const historyDiv = document.getElementById('history');
    const toggleButton = document.querySelector('.history-container button');
    
    if (historyDiv.style.display === 'none') {
        historyDiv.style.display = 'block';
    } else {
        historyDiv.style.display = 'none';
    }
}