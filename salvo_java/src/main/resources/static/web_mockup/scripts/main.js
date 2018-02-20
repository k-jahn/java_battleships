const emailRegEx = /^[A-Za-z0-9.\-_]+@[A-Za-z0-9.\-_]+\.[A-Za-z]{2,}$/
const pwLengthRegEx = /^.{6,}$/
const pwLetterRegEx = /^(?=.*[a-z])(?=.*[A-Z])/
const pwNumberRegEx = /\d/


function showPage(page) {
  $('.modal.active').removeClass('active');
  $(`.modal#${page}`).addClass('active');
}
function login(username, password) {
  // TODO: form validation
  if (!emailRegEx.test(username)){
    $('#login-form .error-display').text('not a valid email adress')
    return
  }
  if (!pwLengthRegEx.test(password)){
    $('#login-form .error-display').text('password min 6 char')
    return
  }



  $.post('/../api/login', { username: username, password: password })
    .done(r => {
      getGameList()
    })
    .fail(_ => $('#login-form .error-display').text('unkown email/password combination'))
}
function signup(username, password, passwordRepeat) {
  $('#signup-form .error-display').text('')
  let isValid = true
  if (!emailRegEx.test(username)) {
    $('#signup-form .username-error-display').text('not a valid email adress')
    isValid=false;
  }
  if (!pwLetterRegEx.test(password)) {
    $('#signup-form .password-error-display').text('password must contain a upper- and lowercase letter')
    isValid=false;
  }
  if (!pwLengthRegEx.test(password)) {
    $('#signup-form .password-error-display').text('password must contain number')
    isValid=false;
  }
  if (!pwLengthRegEx.test(password)) {
    $('#signup-form .password-error-display').text('password min 6 char')
    isValid=false;
  }
  if (password != passwordRepeat) {
    $('#signup-form .password-error-display').text('passwords do not match')
    isValid=false;
  }
  
  if (!isValid) {
    return
  }

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