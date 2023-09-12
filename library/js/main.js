$(document).ready(function(){
});

$(window).on("load scroll resize", function() {

    windowH = $(window).height();

    $('body').height( windowH );

});

$('body').fadeIn(600);

$(document).ready(function(){


    // Button & Field inputs -- add to FS form
    var email = $("#field150832089");
    var emailWrapper = $("#fsRow5408173-2");
    var userStatusWrapper = $('#label150832072');
    var returning_user = $("input[value|='returning_user']") ;
    var new_user = $("input[value|='new_user']") ;
    var nextBtn = $('.fsNextButton');

    // Set up custom classes for field inputs
    $(returning_user).addClass('user_status returning_user');
    $(new_user).addClass('user_status new_user');
    $('.returning_user').parents('label').addClass('returning_user_btn radio-btn btn btn-large').append('<span>Returning User</span>');
    $('.new_user').parents('label').addClass('new_user_btn radio-btn btn btn-large btn-secondary').append('<span>New User</span>');
    
    // Append form elements to the login box
    $(emailWrapper).appendTo('#introFields');
    $(userStatusWrapper).appendTo('#introFields');
    $(userStatusWrapper).addClass('clickMe').attr('data-bs-toggle', 'modal').attr('data-bs-target', '#questionnaire');


    // // Check User Status to confirm FS logic
    // $(nextBtn).on('click', function(){
    //     console.log( userStatus );
    //     if( userStatus == 'new_user'){
    //         // $(page4).remove();
    //     }else{
    //         // $(page2).remove();
    //         // $(page3).remove();

    //         // Set a cookie
    //         // document.cookie = "login=true; expires=Thu, 18 Dec 2023 12:00:00 UTC";

    //     }
    // });




});

/**
 * Login: Use the answers to the first 2 questions from FS to create your cookies
 * 
 * Check for a cookie. 
 * If login=true;
 *  Assume Returning User
 *  Check cookies again
 *  If date of last login is greater than 30 days
 *      Check cookies again
 *      If Last Login Date cookie exists
 *          Update Last Login Date cookie
 *          Redirect page
 *      Else
 *          Set Last Login Date cookie
 *          Show Returning User Form
 * 
 *  Else
 *      Update last login cookie
 *      Redirect Page
 * Else
 *  Assume New User
 *  Set a cookie "login=true"
 *  Show New User popup
 */