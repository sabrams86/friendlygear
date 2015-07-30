var xhr = new XMLHttpRequest;
xhr.open('get', '/categories');
xhr.addEventListener('load', function () {
  var categories = JSON.parse(xhr.response);
  var sidemenu = document.querySelector('.sidemenu');
  categories.forEach(function (category) {
    var a = document.createElement('a');
    var p = document.createElement('div');
    a.href = '/?category='+category.name;
    a.innerHTML = category.name;
    p.appendChild(a);
    sidemenu.appendChild(p);
  })
});
xhr.send();
