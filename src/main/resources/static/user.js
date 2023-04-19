let tbody = $('#current-user-table');
$(document).ready(function () {
    showCurrent();
});

function showCurrent() {
    $.getJSON('http://localhost:8080/api/user', function (json) {

        let current = {
            id: json.id,
            name: json.name,
            surname: json.surname,
            age: json.age,
            email: json.email,
            roles: json.roles.map(role=> role.name)
        }
        let tr = [];
        tr.push(`<tr id="${current.id}">`)
        tr.push(`<td>${current.id}</td>`)
        tr.push(`<td>${current.name}</td>`)
        tr.push(`<td>${current.surname}</td>`)
        tr.push(`<td>${current.age}</td>`)
        tr.push(`<td>${current.email}</td>`)
        tr.push(`<td>${current.roles}</td>`)
        tr.push(`</tr>`)

        tbody.empty();
        tbody.append($(tr.join('')));
    });
}