// let current;
// let tbody = $('#tbody');
// $(document).ready(function () {
//     $.getJSON('http://localhost:8080/api/admin', function (json) {
//         for (let i = 0; i <json.length; i++) {
//             let user = {
//                 id: json[i].id,
//                 name: json[i].name,
//                 surname: json[i].surname,
//                 age: json[i].age,
//                 email: json[i].email,
//                 password: json[i].password,
//                 roles: json[i].roles.map(role=> role.name)
//             }
//
//             if ($('current-mail').text() === user.email) {
//                 current = user;
//             }
//         }
//     });
//     showCurrent()
// })
//
//
// function showCurrent() {
//         let tr = [];
//         tr.push(`<tr id="${current.id}">`)
//         tr.push(`<td>${current.id}</td>`)
//         tr.push(`<td>${current.name}</td>`)
//         tr.push(`<td>${current.surname}</td>`)
//         tr.push(`<td>${current.age}</td>`)
//         tr.push(`<td>${current.email}</td>`)
//         tr.push(`<td>${current.roles}</td>`)
//         tr.push(`</tr>`)
//
//         tbody.empty();
//         tbody.append($(tr.join('')));
// }