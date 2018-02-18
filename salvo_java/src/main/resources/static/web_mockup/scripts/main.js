function openModal(page) {
  $('.modal.active').removeClass('active');
  $(`.modal#${page}`).addClass('active');
}


$(_ => {
  $(".nav-link").on("click",function(){openModal($(this).data().page)})

})