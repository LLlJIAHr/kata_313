let adminPanel = $('#nav-home');
let userPanel = $('#nav-profile');
let table = $('#usersTable');
let addUserForm = $('#addUserForm');
// let modal = document.getElementById('modalWindow');
let modal = $('#modalWindow');
$(document).ready(function () {
    table.html(`
        <table class="table table-striped">
            <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Age</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
            </thead>
            <tbody id="tbody">

            </tbody>
        </table>`
    );
    showAll();});




// let addForm = $('#addUserForm');
// let addForm = $('#addUserForm');

function showAll() {
    // userPanel.empty();
    if (adminPanel.hasClass('active') === false) {
        adminPanel.addClass('show active');
        // $('#nav-home-tab').addClass('active');
        // $('#nav-profile-tab').removeClass('active');
        userPanel.removeClass('show active');
    }
    // table.empty();


    $.getJSON('http://localhost:8080/api', function (json) {
        // $('#tbody').empty();
        let tr = [];

        for (let i = 0; i <json.length; i++) {
            let user = {
                id: json[i].id,
                name: json[i].name,
                surname: json[i].surname,
                age: json[i].age,
                email: json[i].email,
                password: json[i].password,
                roles: json[i].roles.map(role=> role.name)
                // roles: JSON.stringify(json[i].roles.map(role => role.name))
            }
            tr.push(`<tr id="${user.id}">`)
            tr.push(`<td>${user.id}</td>`)
            tr.push(`<td>${user.name}</td>`)
            tr.push(`<td>${user.surname}</td>`)
            tr.push(`<td>${user.age}</td>`)
            tr.push(`<td>${user.email}</td>`)
            tr.push(`<td>${user.roles}</td>`)
            tr.push(`<td><button class="btn btn-primary" onclick="editModalFunc(${user.id})">Edit</button></td>`)
            tr.push(`<td><button class="btn btn-danger" onclick="deleteModalFunc(${user.id})">Delete</button></td>`)
            tr.push(`</tr>`)

        }
        $('#tbody').empty();
        $('#tbody').append($(tr.join('')));


    });
}

function newUser() {
    // adminPanel.empty();
    // if (userPanel.hasClass('active') === false) {
    //     userPanel.addClass('active');
    //     // $('#nav-profile-tab').addClass('active');
    //     adminPanel.removeClass('active');
    //     // $('#nav-home-tab').removeClass('active');
    // }

    addUserForm.empty();
    addUserForm.append(`
    <div>
              <form class="text-sm-center" id="newUserForm" style="width: 200px; margin: 0 auto;">
                <div class="mb-1">
                  <label for="name_id" class="form-label "><b>First name </b></label>
                  <input type="text" id="name_id" class="form-control form-control-sm" required>
                </div>
                <div class="mb-1">
                  <label for="surname_id" class="form-label"><b>Second name</b></label>
                  <input type="text" id="surname_id" class="form-control  form-control-sm" required>
                </div>
                <div class="mb-1">
                  <label for="age_id" class="form-label"><b>Age</b></label>
                  <input type="text" id="age_id" class="form-control form-control-sm" value="0" required>
                </div>
                <div class="mb-1">
                  <label for="email_id" class="form-label"><b>Email</b></label>
                  <input type="email" class="form-control  form-control-sm" id="email_id" required>
                </div>
                <div class="mb-1">
                  <label for="password_id" class="form-label"><b>Password</b></label>
                  <input type="password" class="form-control form-control-sm" id="password_id" required>
                </div>
                <div class="mb-1">
                  <label >Roles
                    <select class="form-select form-select-sm" style="width: 200px; height: 45px" id="rolesSelect" multiple required>
                        <option value="1">ADMIN</option>
                        <option value="2">USER</option>
                    </select>
                  </label>
                </div>
                <button type="submit" class="btn btn-success" onclick="saveUser(); return false">Add new user</button>
              </form>
            </div>`
    )
}

function saveUser() {
    let rolesSelect = window.document.querySelectorAll('#rolesSelect option:checked');
    let roleSet = new Set();

    for (let i = 0; i < rolesSelect.length; i++) {
        rolesSelect[i].value === "1" ? roleSet.add({"id": 1, "authority": "ADMIN"}) : roleSet.add({"id": 2, "authority": "USER"});
    }

    let user = {
        name: $("#name_id").val(),
        surname: $("#surname_id").val(),
        age: $("#age_id").val(),
        email: $("#email_id").val(),
        password: $("#password_id").val(),
        roles: Array.from(roleSet)
    };

    if(!(Object.values(user)).includes(null)) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: 'http://localhost:8080/api',
            data: JSON.stringify(user),
            dataType: "json",
            cache: false,
            success: function () {
                showAll();
            }
        })
    }

}

// edit modal window
function editModalFunc(id) {
    $.getJSON('http://localhost:8080/api/' + id, function(json) {
        let user = {
            id: json.id,
            name: json.name,
            surname: json.surname,
            age: json.age,
            email: json.email,
            password: json.password,
            roles: json.roles.map(role => role.authority)
        };

        // modal.empty();
        modal.innerHTML = `
                 <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLable" aria-hidden="true" >
                    <form class="text-sm-center needs-validation" id="editForm" style="width: 350px; margin: 0 auto;">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="editModalLable">Edit user</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                          </div>
                          <div class="modal-body">

                            <div class="mb-1">
                              <label for="edit_id" class="form-label "><b>ID</b></label>
                              <input type="number" value="${user.id}" id="edit_id" name="id" class="form-control form-control-sm" readOnly>
                            </div>

                            <div class="mb-1">
                              <label for="name" class="form-label "><b>First name </b></label>
                              <input type="text"  id="name" class="form-control form-control-sm" name="name" value="${user.name}" required>
                            </div>

                             <div class="mb-1">
                              <label for="edit_surname" class="form-label"><b>Second name</b></label>
                              <input type="text"  id="edit_surname" class="form-control  form-control-sm"  name="surname" value="${user.surname}" required>
                            </div>

                            <div class="mb-1">
                              <label for="edit_age" class="form-label"><b>Age</b></label>
                              <input type="text" id="edit_age" class="form-control form-control-sm"  name="age" th:value="${user.age}" required>
                            </div>

                            <div class="mb-1">
                              <label for="edit_email" class="form-label"><b>Email</b></label>
                              <input type="email" class="form-control  form-control-sm" id="edit_email" name="email" th:value="${user.email}" required>
                            </div>
                            <div class="mb-1">
                              <label for="edit_password" class="form-label"><b>Password</b></label>
                              <input type="password" class="form-control form-control-sm" id="edit_password" name="password" value="" required>
                            </div>
                             <div class="mb-1">
                              <label for="edit_roles" >Roles
                                <select  name="rolesSelect[]" id="edit_roles" class="form-select form-select-sm" style="width: 200px; height: 45px" multiple="" required>
                                  <option value="1">ADMIN</option>
                                  <option value="2">USER</option>
                                </select>
                              </label>
                            </div>
                            </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" onclick="updateUser(); return false" data-dismiss="modal">Edit</button>
                          </div>
                        </div>
                      </div>
                    </form>
                 </div>`;

        // $('#editModal').modal();
        modal.modal();
    });
}

function updateUser() {
    let rolesSelect = window.document.querySelectorAll('#edit_roles');
    let roleSet = new Set();

    for (let i = 0; i < rolesSelect.length; i++) {
        rolesSelect[i].value === "1" ?roleSet.add({"id": 1, "role": "ADMIN"}) : roleSet.add({"id": 2, "role": "USER"})
    }
    let user = {
        id: $('#edit_id').val(),
        name: $('#edit_name').val(),
        surname: $('#edit_surname').val(),
        age: $('#edit_age').val(),
        email: $('#edit_email').val(),
        password: $('#edit_password').val(),
        roles: Array.from(roleSet)

    };

    $.ajax({
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        url: 'http://localhost:8080/api/' + user.id,
        data: JSON.stringify(user),
        dataType: 'json',
        cache: false,
        success: function () {
            showAll();
        }
    })
}


function deleteModalFunc(id) {
    $.getJSON('http://localhost:8080/api/' + id,function (json) {
        let user = {
            id:json.id,
            name: json.name,
            surname: json.surname,
            age: json.age,
            email: json.email,
            password: json.password,
            roles: json.roles.map(role=> role.authority)
        };
        // modal.empty();
        modal.innerHTML = `
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" >
            <form class="text-sm-center" id="deleteForm" style="width: 350px; margin: 0 auto;">
    
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="deleteModalLabel">Delete user</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                  </div>
                  <div class="modal-body">
    
                    <div class="mb-1">
                      <label for="del_id" class="form-label disabled"><b>ID</b></label>
                      <input type="text"  placeholder="${user.id}" value="${user.id}" id="id" name="del_id" class="form-control form-control-sm" disabled>
                    </div>
                    <!--                                                th:field="*{name}"   -->
                    <div class="mb-1">
                      <label for="del_name" class="form-label "><b>First name </b></label>
                      <input type="text"  id="name" class="form-control form-control-sm disabled" name="name" placeholder="${user.name}" disabled>
                    </div>
    
                    <div class="mb-1">
                      <label for="del_surname" class="form-label"><b>Second name</b></label>
                      <input type="text"  id="del_surname" class="form-control  form-control-sm disabled"  name="surname" placeholder="${user.surname}" disabled>
                    </div>
    
                    <div class="mb-1">
                      <label for="del_age" class="form-label"><b>Age</b></label>
                      <input type="text" id="del_age" class="form-control form-control-sm disabled"  name="age" placeholder="${user.age}" disabled>
                    </div>
    
                    <div class="mb-1">
                      <label for="del_email" class="form-label"><b>Email</b></label>
                      <input type="email" class="form-control  form-control-sm disabled" id="del_email" name="email" placeholder=${user.email}" disabled>
                    </div>
                    <div class="mb-1">
                      <label for="del_roles" >Roles
                        <select  name="rolesSelect[]" id="del_roles" class="form-select form-select-sm disabled" style="width: 200px; height: 45px" multiple="" disabled>
                          <option value="1" disabled>ADMIN</option>
                          <option value="2" disabled>USER</option>
                        </select>
                      </label>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <input class="btn btn-danger" onclick="deleteUser(); return false;" data-dismiss="modal" type="button" value="Delete"/>
                  </div>
                </div>
              </div>
            </form>
        </div>
            `;
        $('modalDelete').modal();
    });
}

function deleteUser() {
    let id =$("#del_id").val();

    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        url: 'http://localhost:8080/api/delete' + id,
        data: JSON.stringify(id),
        dataType: 'json',
        cache: false,
        success: $('#' + id).remove()
    })
}