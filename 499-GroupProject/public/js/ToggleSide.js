document.querySelector('.expand-menu').addEventListener('click', function() {
  const sidebar = document.querySelector('.sidebar');
  const main = document.querySelector('main');

  
  if (sidebar.style.width === '0px') {
      sidebar.style.width = '250px';
      main.style.marginLeft = '250px';
  } else{
    sidebar.style.width = '0';
    main.style.marginLeft = '0';
  }
});