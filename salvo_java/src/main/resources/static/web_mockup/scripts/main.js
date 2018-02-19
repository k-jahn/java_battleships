const emailRegEx = /^[A-Za-z0-9.\-_]+@[A-Za-z0-9.\-_]+\.[A-Za-z]{2,}$/
const pwLengthRegEx = /^.{6,}$/
const pwLetterRegEx = /[A-Za-z]/
const pwNumberRegEx = /\d/


function showPage(page) {
  $('.modal.active').removeClass('active');
  $(`.modal#${page}`).addClass('active');
}
function login(username, password) {
  // TODO: form validation

  $.post('/../api/login', { username: username, password: password })
    .done(r => {
      getGameList()
    })
    .fail($('#login-form .error-display').text('bad input'))
}
function signup(username, password, passwordRepeat) {
  let isValid = true
  // TODO validate shit
  $.post('/../api/players', { username: username, password: password })
    .done(_ => login(username, password))
    .fail(r => {
      console.log(r)
      $('#signup-form .server-error-display').text(r.responseJSON.error)
    })
}

function logout() {
  $.post('/../api/logout', {})
    .done(r => {
      $('#login-form .error-display').text('')
      getGameList()
    })
}

function showLoginLogout(name) {
  $('.auth-form.active').removeClass('active')
  console.log(name)
  if (name) {
    $('#logout-form .user-name').text(name)
    $('.auth-form#logout-form').addClass('active')
  } else $('.auth-form#login-form').addClass('active')
}



// on dom load
$(_ => {
  $(".js-nav-link").on("click", function () { showPage($(this).data().page) })
  $(`#button-login`).on('click', evt => login(
    evt.target.form.loginUsername.value,
    evt.target.form.loginPassword.value
  ))
  $(`#button-logout`).on('click', _ => logout())
  $(`#button-signup`).on('click', evt => signup(
    evt.target.form.signupUsername.value,
    evt.target.form.signupPassword.value,
    evt.target.form.signupPasswordRepeat.value
  ))
})