$(document).ready(function() {
  $('#addcategory').on('click', function () {
    var span = document.createElement('span');
    var div = document.createElement('div');
    span.innerHTML = $('#categories option:selected').text();
    div.appendChild(span)
    $('#catrow').append(div)
    var currentCategories = $('#categorylist').val();
    var categorylist = currentCategories + $('#categories').val() + ',';
    $('#categorylist').val(categorylist);
  })
});
