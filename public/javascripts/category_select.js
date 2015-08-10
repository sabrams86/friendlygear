$(document).ready(function() {
  $('#addcategory').on('click', function () {
    var span = document.createElement('span');
    var div = document.createElement('div');
    div.className = 'category_tag';
    var deletediv = document.createElement('div');
    deletediv.className = 'delete';
    deletediv.innerHTML = 'x';
    span.innerHTML = $('#categories option:selected').text() + ' ';
    div.appendChild(span);
    div.appendChild(deletediv);
    $('#catrow').append(div);
    var currentCategories = $('#categorylist').val();
    var categorylist = currentCategories + $('#categories').val() + ',';
    $('#categorylist').val(categorylist);
  });
  $('#catrow').on('click', '.delete', function () {
    var name = $(this).siblings('span').text();
    var id = $("option:contains("+name+")").val();
    var currentCategories = $('#categorylist').val();
    var categorylist = currentCategories.replace((id+','), '');
    $('#categorylist').val(categorylist);
    $(this).parent().remove();
  })
});
