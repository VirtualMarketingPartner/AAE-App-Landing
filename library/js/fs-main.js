$('body').fadeIn(600);

$(window).on("load scroll resize", function() {
    windowH = $(window).height();
    $('body').height(windowH);
});

/**** FORM VARS ****/
var newEmail = $('#sf_email_address');
var formEmail = $('#field163865448');
var formEmailV = newEmail.val();
var formEmailWrapper = $('#label-field163865448')
var firstSection = $('#fsSection163865444');
var accessSection = $('#fsSection163865452');
var yourInfoSection = $('#fsSection163865545');
var orgInfoSection = $('#fsSection163865567');
var submit = $('#fsSubmitButton5728648');

// Element where the buttons should be added
const formFooter = document.getElementById('fsSubmit5728648');

// 'Next' button
const nextButton = document.createElement('button');
nextButton.id = 'fsNextButton5408173';
nextButton.className = 'fsNextButton';
nextButton.type = 'button';
nextButton.value = 'Next Page';
nextButton.setAttribute('aria-label', 'Next');
nextButton.innerHTML = '<span class="fsFull">Next</span>';

// 'Previous' button
const previousButton = document.createElement('button');
previousButton.id = 'fsPreviousButton5408173';
previousButton.className = 'fsPreviousButton';
previousButton.type = 'button';
previousButton.value = 'Previous Page';
previousButton.setAttribute('aria-label', 'Previous');
previousButton.innerHTML = '<span class="fsFull">Previous</span>';

// Append the buttons to the form footer
formFooter.appendChild(previousButton);
formFooter.appendChild(nextButton);

// Email Validation
function validateEmail(formEmailV) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(formEmailV);
}

$(newEmail).keyup(function(){
    formEmailV = $(this).val();
    $(formEmail).val(formEmailV).keyup();

    if (formEmailV.length === 0) {
        $(this).addClass('warning');
    } else {
        $(this).removeClass('warning');
    }
});

// Hide the repeated form sections and advanced sections until needed
$(submit).appendTo('#hold');
$(firstSection).hide();
$(yourInfoSection).add(orgInfoSection).hide();
$('.fsPreviousButton').hide();
$(submit).hide();
$(formEmailWrapper).hide();

// advancing the form with next and previous clicks
$('.fsNextButton').on('click', function(){
    $(this).hide();
    $(accessSection).hide();
    $(submit).prependTo('.fsSubmit');
    $('.fsPreviousButton').show();
    $(yourInfoSection).add(orgInfoSection).show();
    $(submit).show();
});

$('.fsPreviousButton').on('click', function(){
    $(this).hide();
    $(accessSection).show();
    $('.fsNextButton').show();
    $(yourInfoSection).add(orgInfoSection).hide();
    $(submit).hide();
});

// POST call to Salesforce Database Endpoint
$('#submitEmail').on('click', function(){
    
    if (formEmailV && validateEmail(formEmailV)) {
        $('#result').html("");  // Clear any error messages
        $.ajax({
            url: 'jwt_auth.php', // Make sure this points to your PHP script that checks Salesforce
            type: 'POST',
            data: { email: formEmailV },
            success: function(response) {
                console.log("Received response:", response); 
                if (response === "Email exists in Salesforce DB") {
                    $('#result').html("Please wait while we redirect you to our database ...");
                    window.location.href = 'https://allergyasthmanetwork.shinyapps.io/asthma-dashboard-v3-main/';
                } else if (response === "Email does not exist in Salesforce DB") {
                    $('#questionnaire').modal('show'); 
                    $(firstSection).show();
                    $('.fsNextButton').show(); 
                } else {
                    console.error("Unexpected response:", response);
                    $('#result').html("Unexpected error occurred. Please refresh the page and try again.");
                }
            },
            error: function() {
                $('#result').html("Failed to check the email. Please try again.");
            }
        });
    } else {
        // $('#result').html("Please provide your email address to access the database");
        $(newEmail).addClass('warning');
    }
});

$(submit).on('click', function(e){
    e.preventDefault();
    $(formEmail).val(formEmailV);
    $('form#fsForm5728648').submit();
});