/*--=====Animate on scroll--==*/
AOS.init({
delay: 300,
duration: 1500,
});


/*--=====forget password-------==*/

function PasswordReset() {
$('form.reset-password-form').on('submit', function(e){
e.preventDefault();
$('.reset-form')
.removeClass('d-block')
.addClass('d-none');
$('.reset-confirmation').addClass('d-block');
});
}
window.addEventListener('load',function(){
PasswordReset();
});
/*--=======================--==*/