fetch('/home/getData')
    .then(res => res.json())
    .then(data => {
        if (data.count) {
            let countEl = document.getElementById("count");
            countEl.textContent = `Count: ${data.count}`;
        }

        if (data.sum) {
            let sumEl = document.getElementById("sum");

            if (data.sum == 0) {
                return;
            }

            sumEl.textContent = `Sum: ${data.sum}`;
        }
        
        if (data.numbers) {
            let numsEl = document.getElementById("nums");

            data.numbers.forEach((num) => {
                let newEl = document.createElement('button');

                newEl.type = 'button';
                newEl.classList.add('btn', 'btn-secondary');
                newEl.textContent = num;

                numsEl.appendChild(newEl);
            });
        }
    });

function clearNumbers() {
    fetch('/home/ClearNumbers').then(() => {
        let countEl = document.getElementById("count");
        countEl.textContent = 'Count: ';

        let sumEl = document.getElementById("sum");
        sumEl.textContent = 'Sum: Not summed';

        let numsEl = document.getElementById("nums");
        numsEl.textContent = '';
    });
}

function addNumber() {
    fetch('/home/addNumber')
        .then(res => res.json())
        .then(data => {
            let countEl = document.getElementById("count");
            countEl.textContent = `Count: ${data.count}`;

            let numsEl = document.getElementById("nums");

            let newEl = document.createElement('button');

            newEl.type = 'button';
            newEl.classList.add('btn', 'btn-secondary');
            newEl.textContent = data.number;

            numsEl.appendChild(newEl);
        })
        .catch(err => console.error('Error:', err));
}

function sumNumbers() {
    fetch('/home/sumNumbers')
        .then(res => res.json())
        .then(data => {
            let sumEl = document.getElementById("sum");

            if (data == 0) {
                return;
            }

            sumEl.textContent = `Sum: ${data}`;
        })
        .catch(err => console.error('Error:', err));
}