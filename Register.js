$(document).ready(function() {
    $('#registerForm').on('submit', function(event) {
        event.preventDefault();

        var email = $('#email').val();
        var password = $('#password').val();

        var data = {
            UserName: email,
            password: password
        };

        $.ajax({
            url: 'https://www.fulek.com/data/api/user/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                console.log(response);
                alert('Registration successful!');
                window.location.href = "NewsPage.html";
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("HTTP Status: " + jqXHR.status); // Check the HTTP Status
                console.log("Error Thrown: " + errorThrown); // Check the Error Thrown
                console.log("Response Text: " + jqXHR.responseText); // Check the Response Text
                alert('Registration failed, please try again.');
            }
        });
    });
});
