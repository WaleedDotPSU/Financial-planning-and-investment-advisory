document.querySelector('.expand-menu').addEventListener('click', function() {
  document.querySelector('.sidebar').style.width = '250px';
});

document.querySelector('.sidebar').addEventListener('click', function() {
  this.style.width = '0';
});
