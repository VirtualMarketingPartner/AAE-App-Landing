$('body').fadeIn(600);

$(window).on("load scroll resize", function() {
    windowH = $(window).height();
    $('body').height(windowH);
});


/**** FORM VARS ****/
var newUserBtn = $('#new-user');
var newUserToggle = $('#field150832072_1');
var rUserBtn = $('#returning-user');
var rUserToggle = $('#field150832072_2');
var newEmail = $('#email_address');

var formEmail = $('#field150832089');
var formEmailV = formEmail.val();
var orgF = $('#field149752909');
var orgV = orgF.val();
var fnF = $('#field149752881-first');
var fnV = fnF.val();
var lnF = $('#field149752881-last');
var lnV = lnF.val();
var roleF = $('#field150832190');
var roleV = roleF.val();
var buseF = $('#field149752996');
var buseV = buseF.val();
var phoneF = $('#field149753000');
var phoneV = phoneF.val();
var dataF = $('#field149753014');
var dataV = dataF.val();
var orgTypeF = $('#field149752908');
var orgTypeV = orgTypeF.val();
var countryF = $('#field149752948');
var countryV = countryF.val();
var zipF = $('#field149752986');
var zipV = zipF.val();

var firstSection = $('#fsSection151244438');
var accessSection = $('#fsSection150832092');
var yourInfoSection = $('#fsSection149754138');
var orgInfoSection = $('#fsSection149754158');
var submit = $('#fsSubmitButton5408173');

var cookiesPresent = 0;


/**** REPLACE FS FORM ELEMENTS ****/
$(newUserBtn).on('click', function(){
    $('.fsNextButton').show();
    $(newUserToggle).prop("checked", true); 
});
$(rUserBtn).on('click', function(){
    $('.fsNextButton').hide();
    $(rUserToggle).prop("checked", true); 
});
$(newEmail).keyup(function(){
    email = $(this).val();
    $(formEmail).val(email);
    $(this).removeClass('warning');
    $('.user-choice-btn').attr('data-bs-target', '#questionnaire');
});


/**** FORM NAVIGATION ****/
// Force user to select new or returning; require email to proceed
$('.user-choice-btn').on('click', function(){
    checkForCookies();
    if( $(newEmail).val().length === 0 ){
        $(newEmail).addClass('warning');
    }else if( cookiesPresent === 0){
        // show the form
        $('.fsNextButton').show();
        $(orgF).add(fnF).add(lnF).add(roleF).add(buseF).add(phoneF).add(dataF).add(orgTypeF).add(countryF).add(zipF).prop('required', true).addClass('fsRequired');
        console.log('no cookies, show the form');
    }else if( cookiesPresent === 1){
        // submit form
        console.log('found some cookies, submit the form');
        $('#redirecting-msg').show();
        $(rUserToggle).prop("checked", true); 
        $('#fsForm5408173').submit();
        getCookieValue();
        setReturningUserCookie();

    }
    
});
// Hide the repeated form sections and advanced sections until needed
$(submit).appendTo('#hold');
$(firstSection).hide();
$(yourInfoSection).add(orgInfoSection).hide();


// advancing the form with next and previous clicks
$('.fsNextButton').on('click', function(){
    $(this).hide();
    $(accessSection).hide();
    $(submit).prependTo('.fsSubmit');
    $('.fsPreviousButton').show();
    $(yourInfoSection).add(orgInfoSection).show();
});

$('.fsPreviousButton').on('click', function(){
    $(this).hide();
    $(accessSection).show();
    $('.fsNextButton').show();
    $(yourInfoSection).add(orgInfoSection).hide();
});



/**** COOKIE SETUP ****/
// Set up a cookie to store basic info
function setReturningUserCookie() {
    var expirationDate = new Date();
    var user = document.getElementById('email_address').value;
    var fn = document.getElementById('field149752881-first').value;
    var ln = document.getElementById('field149752881-last').value;
    var org = document.getElementById('field149752909').value;
    
    var aeeRU = encodeURIComponent(user);
    var aeeRUfn = encodeURIComponent(fn);
    var aeeRUln = encodeURIComponent(ln);
    var aeeRUorg = encodeURIComponent(org);

    var expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 10);
    var expiresString = "expires=" + expirationDate.toUTCString();

    console.log("Email: "+aeeRU+", FN: "+aeeRUfn+", LN: "+aeeRUln+", ORG: "+aeeRUorg);

    document.cookie = "aeeRU=" + aeeRU + "; " + expiresString + "; path=/";
    document.cookie = "aeeRUfn=" + aeeRUfn + "; " + expiresString + "; path=/";
    document.cookie = "aeeRUln=" + aeeRUln + "; " + expiresString + "; path=/";
    document.cookie = "aeeRUorg=" + aeeRUorg + "; " + expiresString + "; path=/";
}

// Check Cookies
function checkForCookies() {
    // Function to get the value of a specific cookie by name
    function getCookieValue(cookieName) {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // Check for each cookie
    var aeeRU = getCookieValue('aeeRU');
    var aeeRUfn = getCookieValue('aeeRUfn');
    var aeeRUln = getCookieValue('aeeRUln');
    var aeeRUorg = getCookieValue('aeeRUorg');

    if (aeeRU && aeeRUfn && aeeRUln && aeeRUorg) {
        console.log("Found cookies: ", { aeeRU, aeeRUfn, aeeRUln, aeeRUorg });

        newEmail.val(aeeRU);
        formEmail.val(aeeRU);
        orgF.val(aeeRUorg);
        fnF.val(aeeRUfn);
        lnF.val(aeeRUln);

        cookiesPresent = 1;
        return { aeeRU, aeeRUfn, aeeRUln, aeeRUorg };

    } else {
        // console.log("No relevant cookies found");
         cookiesPresent = 0;
        // return null;
    }
}




/**** VALIDATE & SUBMIT ****/
// Submit & Store the Cookies
$(submit).on('click', function(){
    if( $('#email_address').val().length === 0 ){
        $(newEmail).addClass('warning');
        // do not update cookie
    }else{
        // check for cookies
        if( cookiesPresent === 1){
            // submit form
            // console.log('found some cookies, submit the form');
            $('#redirecting-msg').show();
            $('#fsForm5408173').submit();
            getCookieValue();
        }else if( cookiesPresent === 0){
            // require form entry & set the cookie
            // console.log('no cookies at final validation check');
            setReturningUserCookie();

        }
    }
});