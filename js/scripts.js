/**
 * Creator: Mehul Joshi
 * For this project I am aiming for all of the meets expectations and some of the exceeds expectations feilds. 
 */

const $name = $("#name");
const $other = $("#other-title");
const $jobRoles = $("#title");
var JisOther = false; 
const $jobError = $("<p style='color: red'>Please Input A Valid Job Role</p>");
const $design = $("#design"); 
const $colorsDiv = $("#colors-js-puns"); 
const $colors = $("#colors-js-puns #color");
const $SelectTheme = $("#design option")[0]; 
const $total = $("<p>Total: $0.00</p>");
const $Feildactivities = $(".activities"); 
const $activities = $(".activities label");
var totalCost = 0.00;
const $paymentMethod = $("#payment");
const $selectMethod = $("#payment option")[0];
const $paypal = $("#paypal");
const $bitcoin = $("#bitcoin");
const $creditCard = $("#credit-card"); 
const er = $("<p style='color: red'>The legal name format: [first last]</p>");
const emailer = $("<p style='color:red'>Please enter a legal email</p>");
const $email = $("#mail"); 
const $creditCardInput = $("#cc-num");
const ccer = $("<p style='color:red'>Please enter a legal credit card number</p>");
const $cvv = $("#cvv");
const $zip = $("#zip");
const $submitButton = $('button');
console.log($submitButton);

ccer.hide();
ccer.insertBefore($creditCard);
emailer.hide(); 
emailer.insertBefore($email);
er.hide();
er.insertBefore($name);
$paypal.hide(); 
$bitcoin.hide(); 

$selectMethod.remove(); 

$total.hide(); 

$total.insertAfter($Feildactivities);
$jobError.insertAfter($jobRoles);
$jobError.hide(); 
//selected the name feild once the form is loaded
$name.select(); 
//hides the other field unless otherwise specified. 
$other.hide();
$colorsDiv.hide();


//checks for the other feild and tells the user of an error has been made
$jobRoles.on("change", (e) => {
    $jobError.hide(); 
    $other.hide(); 
    JisOther=false; 
    
    if(e.target.value === "other") {
        $other.show(); 
        $other.focus();
        JisOther=true;
        $other.on("keyup", () => {
            if($other.val().length === 0) {
                $jobError.text("Please Input A Valid Job Role");
                $jobError.css("color", "red");
                $other.css("border-color", "red");
                $jobError.show(); 
            } else {
                $jobError.text("OK!");
                $jobError.css("color", "green");
                $other.css("border-color", "green");
            }
        });
    }
}); 

//for the manipulation of the design features and colors. 
$design.on("change", () => {
    $SelectTheme.remove();
    $colorsDiv.show(); 
    if($design.val() === "js puns") {
        console.log("Hello World");
        console.log($colors);
        let str = ' <option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>';
        let s = '<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>';           
        let q = '<option value="gold">Gold (JS Puns shirt only)</option>';
        
        $colors.html(str + s + q) ;
    } else {
        console.log("Mehul look up");
        let str = '<option value="tomato">Tomato (I &#9829; JS shirt only)</option>';
        let s = '<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>';
        let q = '<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>';

        $colors.html(str + s + q);
    }
});

//for the manipulation of the activities section
$activities.on("change", (e)=> {
    $total.show();
    let name = e.target.name;
    let time =  "some time";
    $activities.each(function() {
        let s = $(this).html() + "";
        
        if(s.match(name)) {
            if(name !== "all") {
                time = s.substring(s.indexOf("— ") + 1, s.indexOf(","));
            }
            let price = parseInt(s.substring(s.indexOf("$") + 1, s.length), 10);
            if(e.target.checked) {
                totalCost += price;
            } else {
                totalCost -= price;
            }
            if(totalCost > 0) {
                $total.text("Total: $" + totalCost + ".00");
                $total.css("color", "black");
            } else {
                $total.text("Before proceeding select at least one of the activities");
                $total.css("color", "red");
               
            }
        }
    });

    if(name !== "all") {
        
        $activities.each(function() {

            let $elem = $(this).html();
            if($elem.match(time) && !$elem.match(name)) {
                if(e.target.checked) {
                    $(this).children().attr("disabled", true);
                    $(this).css("color", "grey");
                } else {
                    $(this).children().attr("disabled", false);
                    $(this).css("color", "black");
                }
            }
        });
    } 
});

$paymentMethod.on("change", (e) => {
    $creditCard.hide();
    $paypal.hide();
    $bitcoin.hide();  
    let value = e.target.value;
    if(value === "credit card") {
        $creditCard.show();
        
    
    
    } else if(value === "paypal") {
        $paypal.show();
    } else {
        //bitcoin
        $bitcoin.show();
    }
});


$name.on("keyup", () => {
    $name.css("border-color", "transparent");
    let rg = /^[a-z]+\s[a-z]+$/i;
    let name = $name.val(); 
    er.hide();
    //validate the name 
    if(!rg.test(name)) {
        $name.css("border-color", "red");
        er.show();
    } 
});

$email.on("keyup", () => {
    emailer.hide();
    $email.css("border-color", "transparent");
    let rg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let name = $email.val();
    if(!rg.test(name)) {
        emailer.show();
        $email.css("border-color", "red");
    } 
});

$creditCardInput.on("keyup", () => {
    $creditCardInput.css("border-color", "transparent");
    let rg = /^\d{13,16}$/;
    let nums=$creditCardInput.val();  
    ccer.hide();
    if(!rg.test(nums)) {
        ccer.show();
        $creditCardInput.css("border-color", "red");   
    } 
});



$zip.on("keyup", () => {
    $zip.css("border-color", "transparent");
    let rg = /^\d{5}$/;
    let nums=$zip.val(); 
    if(!rg.test(nums)) {
       
        $zip.css("border-color", "red");
    } 
});

$cvv.on("keyup", () => {
    $cvv.css("border-color", "transparent");
    let rg = /^\d{3}$/;
    let nums = $cvv.val();
    if(!rg.test(nums)) {
        $cvv.css("border-color", "red");
    } 
});



$submitButton.on("click", (e) => {
    //get all the form feilds starting with the name
    if(!/^[a-z]+\s[a-z]+$/i.test($name.val()) || 
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($email.val())
    || totalCost === 0  || ($paymentMethod.val() === "credit card" && (!/^\d{13,16}$/.test($creditCardInput.val()) 
    || !/^\d{5}$/.test($zip.val()) || !/^\d{3}$/.test($cvv.val()))) || $design.val() === "Select Theme" || ($jobRoles.val() === "other" && $other.val().length === 0)) {
        e.preventDefault();
    }
});