window.onload = function CheckUser() {
    
    // check if the user is logged in
    if(localStorage.getItem('userLoggedIn') === 'true') {
        // Show additional content
        $('.additional-content').css('display', 'block');
        $('#LoginText').html("Odjava " + "<span style='color: orange;'>" + sessionStorage.getItem('username') + "</span>");

    } else {
        // Hide additional content
        $('.additional-content').css('display', 'none');
        sessionStorage.setItem('uspijesnaPrijava', false);
        sessionStorage.setItem('username', null);
        sessionStorage.setItem('token', null);
    }
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

        fetch('https://www.fulek.com/data/api/user/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
          .then(data => {
            if(data.statusCode === 200 && data.data.username === username) {
                sessionStorage.setItem('uspijesnaPrijava', true);
                sessionStorage.setItem('username', data.data.username);
                sessionStorage.setItem('token', data.data.token);
                // Set a flag in localStorage to indicate the user is logged in
                localStorage.setItem('userLoggedIn', 'true');
                
                alert('Uspješna prijava :) Na početnu stranicu za 3,2,1...');
                setTimeout(() => {
                    window.location.href = "HomePage.html";
                }, 3000);
            }else{
                alert('Login failed, please try again.');
            }
        })
        .catch(error => console.log(error));
    });

    $('#LoginText').click(function() {
        if(localStorage.getItem('userLoggedIn') === 'true') {
            // The user is logged in, so log them out
            localStorage.removeItem('userLoggedIn');
            sessionStorage.removeItem('uspijesnaPrijava');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('token');

            // Hide additional content
            $('.additional-content').css('display', 'none');
            // Change text back to "Prijava"
            $('#LoginText').text("Prijava");
        } else {
            // The user is not logged in, so redirect them to the login page
            window.location.href = "HomePage.html"; // Replace with your actual login page URL
        }
    });
});
