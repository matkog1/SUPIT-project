document.addEventListener('DOMContentLoaded', (event) => {
    fetch('https://www.fulek.com/data/api/supit/curriculum-list/hr', {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const subjects = data.data.map(item => item.kolegij);
        const inputField = document.getElementById("odabirKolegija");
        new Awesomplete(inputField, { list: subjects });

        const totals = { ects: 0, sati: 0, predavanja: 0, vjezbe: 0 };
        const tbody = document.querySelector('#tableKolegij tbody');

        function createCell(value) {
            const cell = document.createElement('td');
            cell.textContent = value;
            return cell;
        }

        function createDeleteButton(subject) {
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Remove";
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteButton.onclick = function() {
                totals.ects -= subject.ects;
                totals.sati -= subject.sati;
                totals.predavanja -= subject.predavanja;
                totals.vjezbe -= subject.vjezbe;
                this.parentElement.parentElement.remove();
                updateTotalsRow();
            }
            return deleteButton;
        }

        function createSubjectRow(subject) {
            const row = document.createElement('tr');
            const cells = [
                subject.kolegij,
                subject.ects,
                subject.sati,
                subject.predavanja,
                subject.vjezbe,
                subject.tip,
                subject.semester
            ].map(createCell);

            const cell8 = document.createElement('td');
            cell8.appendChild(createDeleteButton(subject));

            row.append(...cells, cell8);
            return row;
        }

        function updateTotalsRow() {
            let totalsRow = document.querySelector('#totalsRow');
            if (!totalsRow) {
                totalsRow = document.createElement('tr');
                totalsRow.id = 'totalsRow';

                for (let i = 0; i < 8; i++) {
                    totalsRow.appendChild(document.createElement('td'));
                }
                tbody.appendChild(totalsRow);
            }

            totalsRow.cells[0].textContent = 'Totals:';
            totalsRow.cells[1].textContent = totals.ects;
            totalsRow.cells[2].textContent = totals.sati;
            totalsRow.cells[3].textContent = totals.predavanja;
            totalsRow.cells[4].textContent = totals.vjezbe;
        }

        inputField.addEventListener('awesomplete-selectcomplete', function() {
            const selectedSubject = data.data.find(item => item.kolegij === this.value);
            if (selectedSubject) {
                const newRow = createSubjectRow(selectedSubject);
                tbody.insertBefore(newRow, document.querySelector('#totalsRow'));

                totals.ects += selectedSubject.ects;
                totals.sati += selectedSubject.sati;
                totals.predavanja += selectedSubject.predavanja;
                totals.vjezbe += selectedSubject.vjezbe;
                updateTotalsRow();

                inputField.value = '';
            }
        });
    })
    .catch(error => console.error('Error:', error));
});
