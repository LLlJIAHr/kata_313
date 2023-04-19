let adminPanel = $('#nav-home');
let userPanel = $('#nav-profile');
let body = $('#body');
// let select = $('#rolesSelect')
let modal = $('.modal-content');
let allRoles = [];
$(document).ready(function () {showAll();});
$.getJSON('http://localhost:8080/api/admin/roles', function (json) {
    for (let i = 0; i <json.length; i++) {
        allRoles.push({
            id: json[i].id,
            name: json[i].name,//WITHOUT ROLE_
            authority: json[i].authority//WITH ROLE_
        });
    }
});



function addRolesInSelect(select) {

    if(select.children().length <= 0) {
        $.each(allRoles, function(index, value) {
            select.append("<option value='" + value.id + "'>" + value.name + "</option>");
        });
    }
}

function showAll() {
    if (adminPanel.hasClass('active') === false) {
        adminPanel.addClass('show active');
        userPanel.removeClass('show active');
    }



    $.getJSON('http://localhost:8080/api/admin', function (json) {
        let trr = [];

        for (let i = 0; i <json.length; i++) {
            let user = {
                id: json[i].id,
                name: json[i].name,
                surname: json[i].surname,
                age: json[i].age,
                email: json[i].email,
                password: json[i].password,
                roles: json[i].roles.map(role=> role.name)
            };


            trr.push(`<tr id="${user.id}">`);
            trr.push(`<td>${user.id}</td>`);
            trr.push(`<td>${user.name}</td>`);
            trr.push(`<td>${user.surname}</td>`);
            trr.push(`<td>${user.age}</td>`);
            trr.push(`<td>${user.email}</td>`);
            trr.push(`<td>${user.roles}</td>`);
            trr.push(`<td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalWindow" onclick="editModalFunc(${user.id})">Edit</button></td>`);
            trr.push(`<td><button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalWindow" onclick="deleteModalFunc(${user.id})">Delete</button></td>`);
            trr.push(`</tr>`);

        }
        body.empty();
        body.append( $( trr.join('') ))
    });



}


function newUser() {
    addRolesInSelect($("#rolesSelect"));
}

function saveUser() {
    let roles = $('#rolesSelect option:selected').map(function() {
        let roleId = $(this).val();
        let role = allRoles.find(function(r) {
            return r.id == roleId;
        });
        return {
            id: role.id,
            name: role.name
        };
    }).get();

    let user = {
        name: $("#name_id").val(),
        surname: $("#surname_id").val(),
        age: $("#age_id").val(),
        email: $("#email_id").val(),
        password: $("#password_id").val(),
        roles: roles
    };

    if(!(Object.values(user)).includes(null)) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: 'http://localhost:8080/api/admin',
            data: JSON.stringify(user),
            dataType: "json",
            cache: false,
            success: function () {
                showAll();
            }
        })
    }

}

function editModalFunc(id) {

    $.getJSON('http://localhost:8080/api/admin/' + id, function(json) {
        let user = {
            id: json.id,
            name: json.name,
            surname: json.surname,
            age: json.age,
            email: json.email,
            password: json.password,
            roles: json.roles.map(role => role.name)
        };

        modal.html(`
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="editModalLable">Edit user</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
              </div>
              <div class="modal-body">
    
                <div class="mb-1">
                  <label for="edit_id" class="form-label "><b>ID</b></label>
                  <input type="number" value="${user.id}" id="edit_id" name="id" class="form-control form-control-sm disabled" disabled readOnly>
                </div>
    
                <div class="mb-1">
                  <label for="edit_name" class="form-label "><b>First name </b></label>
                  <input type="text"  id="edit_name" class="form-control form-control-sm" name="name" value="${user.name}" required>
                </div>
    
                <div class="mb-1">
                  <label for="edit_surname" class="form-label"><b>Second name</b></label>
                  <input type="text"  id="edit_surname" class="form-control  form-control-sm"  name="surname" value="${user.surname}" required>
                </div>
    
                <div class="mb-1">
                  <label for="edit_age" class="form-label"><b>Age</b></label>
                  <input type="text" id="edit_age" class="form-control form-control-sm"  name="age" value="${user.age}" required>
                </div>
    
                <div class="mb-1">
                  <label for="edit_email" class="form-label"><b>Email</b></label>
                  <input type="email" class="form-control  form-control-sm" id="edit_email" name="email" value="${user.email}" required>
                </div>
                <div class="mb-1">
                  <label for="edit_password" class="form-label"><b>Password</b></label>
                  <input type="password" class="form-control form-control-sm" id="edit_password" name="password" value="" required>
                </div>
                <div class="mb-1">
                  <label for="edit_roles" >Roles
                    <select  name="rolesSelect[]" id="edit_roles" class="form-select form-select-sm" style="width: 200px; height: 45px" multiple="" required>
                    </select>
                  </label>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" onclick="updateUser(); return false" data-bs-dismiss="modal">Edit</button>
              </div>`);

        addRolesInSelect(modal.find('.form-select'));
    });
}

function updateUser() {
    let roles = $('#edit_roles option:selected').map(function() {
        let roleId = $(this).val();
        let role = allRoles.find(function(r) {
            return r.id == roleId;
        });
        return {
            id: role.id,
            name: role.name
        };
    }).get();

    let user = {
        id: $("#edit_id").val(),
        name: $("#edit_name").val(),
        surname: $("#edit_surname").val(),
        age: $("#edit_age").val(),
        email: $("#edit_email").val(),
        password: $("#edit_password").val(),
        roles: roles

    };

    if(!(Object.values(user)).includes(null)) {
        $.ajax({
            type: "PUT",
            contentType: "application/json; charset=utf-8",
            url: 'http://localhost:8080/api/admin',
            data: JSON.stringify(user),
            dataType: 'json',
            cache: false,
            success: function () {
                showAll();
            }
        })
    }
}


function deleteModalFunc(id) {
    $.getJSON('http://localhost:8080/api/admin/' + id,function (json) {
        let user = {
            id:json.id,
            name: json.name,
            surname: json.surname,
            age: json.age,
            email: json.email,
            roles: json.roles.map(role=> role.name)
        };
        modal.html( `
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalLabel">Delete user</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                  </div>
                  <div class="modal-body">
    
                    <div class="mb-1">
                      <label for="del_id" class="form-label disabled"><b>ID</b></label>
                      <input type="text"  placeholder="${user.id}" value="${user.id}" id="del_id" name="id" class="form-control form-control-sm" disabled>
                    </div>
                    
                    <div class="mb-1">
                      <label for="del_name" class="form-label "><b>First name </b></label>
                      <input type="text"  id="del_name" class="form-control form-control-sm disabled" name="name" placeholder="${user.name}" disabled>
                    </div>
    
                    <div class="mb-1">
                      <label for="del_surname" class="form-label"><b>Second name</b></label>
                      <input type="text"  id="del_surname" class="form-control  form-control-sm disabled"  name="surname" placeholder="${user.surname}" disabled>
                    </div>
    
                    <div class="mb-1">
                      <label for="del_age" class="form-label"><b>Age</b></label>
                      <input type="number" id="del_age" class="form-control form-control-sm disabled"  name="age" placeholder="${user.age}" disabled>
                    </div>
    
                    <div class="mb-1">
                      <label for="del_email" class="form-label"><b>Email</b></label>
                      <input type="email" class="form-control  form-control-sm disabled" id="del_email" name="email" placeholder="${user.email}" disabled>
                    </div>
                    <div class="mb-1">
                      <label for="del_roles" >Roles
                        <select  name="rolesSelect[]" id="del_roles" class="form-select form-select-sm disabled" style="width: 200px; height: 45px" multiple="" disabled>

                        </select>
                      </label>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <input class="btn btn-danger" onclick="deleteUser(); return false;" data-bs-dismiss="modal" type="button" value="Delete"/>
                  </div>
            `);


        $.each(user.roles, function(index1, value1) {
            $.each(allRoles, function(index, value) {
                if (value1 == value.name){
                    modal.find('.form-select').append("<option value='" + value.id + "'>" + value.name + "</option>");
                }

            })


        })

    });
}
function deleteUser() {
    let id =$("#del_id").val();

    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        url: 'http://localhost:8080/api/admin/' + id,
        data: JSON.stringify(id),
        dataType: 'json',
        cache: false,
        success: $('#' + id).remove()
    })
}