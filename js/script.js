const otherJob = document.getElementById('other-job-role'); 
const jobList = document.getElementById('title');
const colorMenu = document.getElementById('color')
const designMenu = document.getElementById('design')
const childColor = colorMenu.children; 
const activitiesTotal = document.getElementById('activities-cost'); 

const paymentMethod = document.getElementById('payment');
const paymentChild = paymentMethod.children; 
const creditCardOpt = document.getElementById('credit-card');
const paypalOpt = document.getElementById('paypal')
const bitcoinOpt = document.getElementById('bitcoin')

const activitiesField = document.getElementById('activities'); 
const nameField = document.getElementById("name")
const emailField = document.getElementById('email')
const cardNumberField = document.getElementById('cc-num'); 
const zipCodeField = document.getElementById('zip')
const cvvField = document.getElementById('cvv')

const form = document.querySelector('form')

const checkboxes = document.querySelectorAll('.activities input');








console.log(form)


paypalOpt.style.display = 'none'
bitcoinOpt.style.display = 'none'

paymentChild[1].setAttribute('selected', '')


 





window.onload = () => {
    nameField.focus(); 

}; 

//Hides "Other Job Role?" on page load
otherJob.style.display = 'none'; 







// Event listener for "change" in "Job Role" select box.  Displays "Other Job Role?" input box when "Other" option is selected.
jobList.addEventListener('change',  (e) => {
    let targ = e.target.value
    // console.log(targ);
    for (let i = 0; i < jobList.length; i++){
        let other = jobList[i].value
        // console.log(other);
        
        if(targ === 'other'){
            otherJob.style.display = 'inline-block'; 
        }
    }
})

//console.log(designMenu);
 

//if 'js puns' is selected display correct color options 
//if 'heart js' is selected else 

//Hides "Color" menu on page load
colorMenu.disabled = true; 


// Click handler for T-shirt design/color menus
// When t-shirt theme is selected, the color menu displays the available colors. 
designMenu.addEventListener('change', (e) => {
    colorMenu.disabled = false;

    for(let i = 1; i < childColor.length; i++){
        let targ = e.target.value
        let child = childColor[i];
        let dataTheme = child.getAttribute('data-theme');

        if(dataTheme === targ){
            child.hidden = false; 
            child.setAttribute('data-theme', dataTheme)
        }else{
            child.hidden = true;
        }
    }
});


/*
Detects change in Register for Activities" and updates the "total cost"
based on which activities are clicked/unclicked
*/

let totalCost = 0

activitiesField.addEventListener('change', (e) => {
    let targ = parseInt(e.target.getAttribute('data-cost')); 

    if (e.target.checked){
        totalCost += targ;
    }else{
        totalCost -= targ;
    }
    activitiesTotal.innerHTML = `Total: $${totalCost}`   
})







paymentMethod.addEventListener('change', (e) => {
    let targ = e.target.value;
    console.log(targ);

        if (targ === 'paypal'){
            paypalOpt.style.display = 'block';
            creditCardOpt.style.display = 'none'; 
            bitcoinOpt.style.display = 'none'
        }else if(targ === 'bitcoin'){
            paypalOpt.style.display = 'none'
            creditCardOpt.style.display = 'none'
            bitcoinOpt.style.display = 'block'
        }else{
            paypalOpt.style.display = 'none'
            creditCardOpt.style.display = 'block'
            bitcoinOpt.style.display = 'none'
        }

})



//FORM VALIDATION


// function nameFieldTest(event){
//     const nameValue = nameField.value;
//     const regExTest = /^[A-Za-z]+$/
//     if (regExTest.test(nameValue)){
//         console.log('Name test passed')

//     }else{
//         event.preventDefault();
//         // console.log('holy shit turds')
//         // alert('Must enter valid name')
//     };  
// }



// function emailFieldTest(event){
//     const emailValue = emailField.value;
//     const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//     if (emailRegExp.test(emailValue)){
//         console.log('Email test passed')
//     }else{
//         event.preventDefault();
//     };  
// }



function checkBoxFieldTest(event){
    for (let i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
            event.preventDefault()
            console.log('Checkbox test passed')
        }else{
            event.preventDefault()
        }
    }
}


// function creditCardTest(event){
//     const creditCardRegEx = /^[0-9]{13,16}$/
//     const credCardValue = cardNumberField.value
//     const targ = event.target.value; 
//         if (creditCardRegEx.test(credCardValue)){
//             event.preventDefault()
//             console.log("Credit-Card test passed")
//         }else{
//             event.preventDefault()
//             console.log('FAIL')
//         }
    
//  }

//  function zipTest (event){
//      const zipValue = zipCodeField.value
//      const zipRegEx = /^[0-9]{5}$/ 
//      if(zipRegEx.test(zipValue)){
//         event.preventDefault()
//         console.log("ZipCode test passed")
//      }else{
//         event.preventDefault()
//         console.log("FAIL")
//      }
//  }

// function cvvTest(event){
//     const cvvValue = cvvField.value
//     const cvvRegEx = /^[0-9]{3}$/ 
//     if(cvvRegEx.test(cvvValue)){
//        event.preventDefault()
//        console.log("cvv test passed")
//     }else{
//        event.preventDefault()
//        console.log("FAIL")
//     }
// }





function regExTester(event, name, reg){
    let value = name.value; 
    let regEx = reg
    if(regEx.test(value)){
        event.preventDefault();
        console.log('gucci')
    }else{
        event.preventDefault()
    }
}








form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    //Test functions
    //nameFieldTest(e);
    //emailFieldTest(e);
    checkBoxFieldTest(e);
    //creditCardTest(e); 
    //zipTest(e);
    //cvvTest(e);
    //Name test
    regExTester(e, nameField, /^[A-Za-z]+$/ )
    //Email test
    regExTester(e, emailField, /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    //Credit Card Test
    regExTester(e, cardNumberField, /^[0-9]{13,16}$/)
    //ZipCode Test
    regExTester(e, zipCodeField, /^[0-9]{5}$/)
    //Cvv Test
    regExTester(e, cvvField, /^[0-9]{3}$/)

})





//credit card selection for later
//console.log(paymentChild[1]);













//turn name regex into func
//Fix Html spacing at the end



