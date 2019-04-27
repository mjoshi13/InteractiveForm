/* Please feel free to leave comments on what I should improve upon. 
 * For this project I am going for some of the exceeds expectations 
 * but most of the meets expectations criterion.
 */ 


$(":input:first").focus();
const $otherFeild = $('#other-title');
const $jobFeild = $("#title");
$otherFeild.hide();
const $optionsDiv = $("#colors-js-puns");
$optionsDiv.hide();
const $design = $("#design");
const $options = $("#color option");
const $activities = $("fieldset.activities label");
var totalCost = 0;
const $costDiv = $("fieldset.activities p");
$costDiv.hide(); 
const $creditCardDiv = $("#credit-card"); 
const $payPalDiv = $("#payPal");
$payPalDiv.hide();
const $bitcoinDiv = $("#bitcoin"); 
$bitcoinDiv.hide(); 
const $nameInput = $("#name"); 
const $email = $("#mail"); 
const $creditCardInput = $("#cc-num");
const $zip = $("#zip");
const $paymentMethod = $("#payment"); 
const $cvv = $("#cvv");
const $button = $("button");
const $errorMessage = $("#error");
console.log($errorMessage);
$errorMessage.hide();

const $sel = $("select");
console.log($sel);

var isLegalDesign = false; 
var isLegalActivities = false; 
var isLegalPM = false; 
var isLegalName=false;
var isLegalEmail=false;
var isLegalCCNumber=false; 
var isLegalCVV=false;
var isLegalZip=false;  
var isCC=false; 


$design.on("change", () => {
    $optionsDiv.show();
    let $opt = $design.val();
    if($opt === "heart js") {
        $options.each(function() {
            $(this).attr("disabled", false);
            if($(this).text().match(/Puns/)) {
                $(this).attr("disabled", true);
            } 
        });
        isLegalDesign=true;
    } else if($opt === "js puns")  {
         $options.each(function() {
            // console.log($(this).text());
             $(this).attr("disabled", false);
             if($(this).text().match(/JS shirt/)) {
              //   console.log($(this).text());
                 $(this).attr("disabled", true);
             } 
         });
         isLegalDesign=true;
    } else {
        $optionsDiv.hide();
         isLegalDesign=false; 
    }

    console.log("IS LEGAL DESIGN: " + isLegalDesign);
});



$jobFeild.on("change", () => {
    $otherFeild.hide();
    if($jobFeild.val() === 'other') {
        $otherFeild.show();
    }
});

$activities.on("change", (e) => {
    $costDiv.show(); 
    let name = e.target.name;
    let time = "hi";
  
    $activities.each(function() {
        //it is the element
        
        let s = $(this).html() + "";   
        if(s.match(name)) {
            if(name !== "all") {
              time =   s.substring(s.search(/[0-9]/), s.indexOf(","));
            }  
            let price = parseInt(s.substring(s.indexOf("$") + 1, s.length), 10);
            if(e.target.checked) {
                totalCost += price;     
            } else {
                totalCost -= price; 
            }  
            //console.log($costDiv);
            if(totalCost > 0) {
                $costDiv.text("Total: $" + totalCost + ".00");
                $costDiv.css("color", "black");
                isLegalActivities=true;
                    
            } else {
                $costDiv.text("Before proceeding select at least one of the activities");
                $costDiv.css("color", "red");
                isLegalActivities=false;
               
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
    console.log("IS LEGAL ACTIVITIES: " + isLegalActivities);
});


$paymentMethod.on("change", (e) => {
    $creditCardDiv.hide(); 
    $payPalDiv.hide(); 
    $bitcoinDiv.hide(); 
    if(e.target.value === "credit card") {
        $creditCardDiv.show(); 
        isLegalPM=true;
        isCC=true;
    } else if(e.target.value === "paypal") {
        $payPalDiv.show();
        isLegalPM=true;
    } else if(e.target.value === "bitcoin") {
        $bitcoinDiv.show();
        isLegalPM=true;
    } else {
        isLegalPM=false;
    }
});

$nameInput.on("keyup", () => {
    $nameInput.css("border-color", "transparent");
    let rg = /^[a-z]+\s[a-z]+$/i;
    let name = $nameInput.val(); 
    //validate the name 
    if(!rg.test(name)) {
         isLegalName=false;
        $nameInput.css("border-color", "red");
    } else {
         isLegalName=true;
    }
});

$email.on("keyup", () => {
    
    $email.css("border-color", "transparent");
    let rg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let name = $email.val();
    if(!rg.test(name)) {
        isLegalEmail=false; 
        $email.css("border-color", "red");
    } else {
        isLegalEmail=true;
    }
});

$creditCardInput.on("keyup", () => {
    $creditCardInput.css("border-color", "transparent");
    let rg = /^\d{13,16}$/;
    let nums=$creditCardInput.val();  
    if(!rg.test(nums)) {
        isLegalCCNumber=false; 
        $creditCardInput.css("border-color", "red");   
    } else {
        isLegalCCNumber=true;
    }
});

$zip.on("keyup", () => {
    $zip.css("border-color", "transparent");
    let rg = /^\d{5}$/;
    let nums=$zip.val(); 
    if(!rg.test(nums)) {
        isLegalZip=false; 
        $zip.css("border-color", "red");
    } else {
        isLegalZip=true;
    }
});

$cvv.on("keyup", () => {
    $cvv.css("border-color", "transparent");
    let rg = /^\d{3}$/;
    let nums = $cvv.val();
    if(!rg.test(nums)) {
        isLegalCVV=false; 
        $cvv.css("border-color", "red");
    } else {
        isLegalCVV=true;
    }
});



$button.on("click", (e) => {
    $errorMessage.show();
    if(!isLegalDesign || !isLegalActivities || !isLegalPM || !isLegalName || !isLegalEmail) {
        e.preventDefault(); 
    } else if(isCC) {
        if(!isLegalCCNumber || !isLegalCVV || !isLegalZip) {
            e.preventDefault();
        }
    } else {
        $errorMessage.hide();
    }
});


