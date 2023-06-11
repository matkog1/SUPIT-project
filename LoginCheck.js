window.onload = function () {
    // check if the user is logged in
    if(localStorage.getItem('userLoggedIn') === 'true') {
        // Show additional content
        $('.additional-content').css('display', 'block');
        $('#LoginText').text("logout")
    } else {
        // Hide additional content
        $('.additional-content').css('display', 'none');
    }
}