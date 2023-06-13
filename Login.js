window.onload = function CheckUser() {
    

    if(localStorage.getItem('userLoggedIn') === 'true') {
        // Show additional content
        $('.additional-content').css('display', 'block');
        $('#LoginText').html("Odjava " + "<span style='color: orange;'>" + sessionStorage.getItem('username') + "</span>");

    } else {

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

        if (username.trim() === "" || password.trim() === "" || username.trim() === null || password.trim() ===null) {
            alert('Both username and password fields must be filled out.');
            return;
        }

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
                localStorage.setItem('userLoggedIn', 'true');
                
                alert('Login sucessful');
                setTimeout(() => {
                    window.location.href = "HomePage.html";
                }, 500);
            }else{
                alert('Login failed, please try again.');
            }
        })
        .catch(error => console.log(error));
    });

    $('#LoginText').click(function() {
        if(localStorage.getItem('userLoggedIn') === 'true') {

            localStorage.removeItem('userLoggedIn');
            sessionStorage.removeItem('uspijesnaPrijava');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('token');


            $('.additional-content').css('display', 'none');

            $('#LoginText').text("Prijava");
        } else {

            window.location.href = "HomePage.html"; // 
        }
    });
});
