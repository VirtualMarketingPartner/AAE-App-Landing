$('body').fadeIn(600);

$(window).on("load scroll resize", function() {
    windowH = $(window).height();
    $('body').height(windowH);
});

$(document).ready(function() {

    $('body').on('click', '.radio-btn', function(){
        if( $('#email_address').val().length === 0 ){
            $('#email_address').addClass('warning');
        }else{
            $(userStatusWrapper).attr('data-bs-target', '#questionnaire');
        }
    });

    // Function to check if the cookie exists
    function checkReturningUserCookie() {
        var cookies = document.cookie.split("; ");
        for (var i = 0; i < cookies.length; i++) {
            if (cookies[i].includes("returningUser=true")) {
                return true;
            }
        }
        return false;
    }

    // Function to set or update the cookie
    function setReturningUserCookie() {
        var expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 10);
        document.cookie = "returningUser=true; expires=" + expirationDate.toUTCString() + "; path=/";
    }

    // Handling the click event on the "Returning User" button
    $('body').on('click', '.returning_user_btn', function() {
        if (checkReturningUserCookie()) {
            setReturningUserCookie(); // Update the cookie's timestamp
            
            $('.fsBody.fsEmbed').hide(); // Hide the form
            
            if ($('#loadingMessage').length === 0) { 
                $('.fsBody.fsEmbed').before('<div id="loadingMessage"><b>You are now being redirected to the database, please wait...</b></div>'); 
            }
            
            setTimeout(function() {
                window.location.href = "https://allergyasthmanetwork.shinyapps.io/asthma-dashboard-v3-main/";
            }, 1000);
        }
    });

    // Handling the click event on the "Submit Form" button
    $('body').on('click', '#fsSubmitButton5408173', function() {
        // Check if one of the specified answers is selected
        if ($('#field150832136_1').prop('checked') || $('#field150832136_2').prop('checked')) {
            setReturningUserCookie(); // Set the cookie if criteria are met
        }
    });

    // Happy Coding :)

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
