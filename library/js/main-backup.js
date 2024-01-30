$('body').fadeIn(600);

$(window).on("load scroll resize", function() {
    windowH = $(window).height();
    $('body').height(windowH);
});

$(document).ready(function() {
    $('#fsLegend150832072').hide();
    // help.me.aan@taylordesens.com


    $('body').on('click', '.radio-btn', function(){
        if( $('#email_address').val().length === 0 ){
            $('#email_address').addClass('warning');
        }else{ 
            $('#email_address').removeClass('warning');
            $(userStatusWrapper).attr('data-bs-target', '#questionnaire');
        }
    });

    $('body').on('click', '#fsSubmitButton5408173', function(){
        $('#questionnaire').modal('hide');
        if(getUsernameFromCookie()){
            setTimeout(function() {
                window.location.href = "https://allergyasthmanetwork.shinyapps.io/asthma-dashboard-v3-main/";
            }, 1000);
        }else{
            setReturningUserCookie();
        }
    });


    // Set a Cookie for Returning Users
    function setReturningUserCookie() {
        var expirationDate = new Date();
        var user = document.getElementById('email_address').value;
        var aeeRU = encodeURIComponent(user);
        expirationDate.setFullYear(expirationDate.getFullYear() + 10);
    
        document.cookie = "aeeRU=" + aeeRU + "; expires=" + expirationDate.toUTCString() + "; path=/";
    }
    
    // Check the Cookie for required values
    function getUsernameFromCookie() {
        var cookies = document.cookie.split(';');
        for(var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            var cookieParts = cookie.split('=');
            if(cookieParts[0] === 'aeeRU' ) {
                var aeeRUdecoded = decodeURIComponent(cookieParts[1]);
            }
            setReturningUserCookie(); // update the cookie
            console.log('cookie is being updated with new username: '+aeeRUdecoded);
        }
        return null; 
    }


    // Button & Field inputs -- add to FS form
    var formEmail = $("#field150832089");
    // var emailUsersWrapper = $("#fsSection151244438");
    // var emailWrapper = $("#fsRow5408173-2");
    var userStatusWrapper = $('#label150832072');
    var returning_user = $("input[value|='returning_user']");
    var new_user = $("input[value|='new_user']");
    var nextBtn = $('.fsNextButton');


    $("#email_address").keyup(function(){
        email = $(this).val();
        $(formEmail).val(email);
    });

    // Set up custom classes for field inputs
    $(returning_user).addClass('user_status returning_user');
    $(new_user).addClass('user_status new_user');
    $('.returning_user').parents('label').addClass('returning_user_btn radio-btn btn btn-large').append('<span>Returning User</span>');
    $('.new_user').parents('label').addClass('new_user_btn radio-btn btn btn-large btn-secondary').append('<span>New User</span>');
    
    // Append form elements to the login box
    // $(emailUsersWrapper).appendTo('#introFields');
    // $(emailWrapper).appendTo('#introFields');
    $(userStatusWrapper).appendTo('#introFields');
    $(userStatusWrapper).addClass('clickMe').attr('data-bs-toggle', 'modal');

});
