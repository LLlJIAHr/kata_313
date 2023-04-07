// /* global bootstrap: false */
// (() => {
//   'use strict'
//   const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
//   tooltipTriggerList.forEach(tooltipTriggerEl => {
//     new bootstrap.Tooltip(tooltipTriggerEl)
//   })
// })() // https://github.com/KindsonTheGenius/ThymeleafApp/blob/master/src/main/java/com/kindsonthegenius/thymeleafapp/controllers/StudentController.java
$('document').ready(function () {
  $('.table .btn').on('click',function(event) {
    event.preventDefault();

    let href= $(this).attr('href');
    $.get(href, function (user, status) {
      $('#idEdit').val(user.id);
      $('#nameEdit').val(user.name);
      $('#surnameEdit').val(user.surname);
      $('#ageEdit').val(user.age);
      $('#emailEdit').val(user.email);
      $('#roleEdit').val(user.roles);

    });

    $('#editModal').modal();
  });
});
