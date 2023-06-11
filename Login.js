window.onload = function() {
    document.getElementById("registerButton").onclick = function () {
        location.href = "Register.html";
    };
}

$(document).ready(function() {
    $('#loginForm').on('submit', function(event) {
        event.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();

        var data = {
            username: username,
            password: password
        };

        $.ajax({
            url: 'https://www.fulek.com/data/api/user/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                console.log(response);
                if(response.statusCode === 200 && response.data.username === username) {
                    sessionStorage.setItem('username', response.data.username);
                    sessionStorage.setItem('token', response.data.token);
                    alert('Login successful!');
                    window.location.href = "HomePage.html";  // replace with your actual home page url
                } else {
                    alert('Login failed, please try again.');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("HTTP Status: " + jqXHR.status); // Check the HTTP Status
                console.log("Error Thrown: " + errorThrown); // Check the Error Thrown
                console.log("Response Text: " + jqXHR.responseText); // Check the Response Text
                alert('Login failed, please try again.');
            }
        });
    });
});
