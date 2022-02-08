const otherJob = document.getElementById('other-job-role'); 
const jobList = document.getElementById('title');
const colorMenu = document.getElementById('color')
const designMenu = document.getElementById('design')
const childColor = colorMenu.children; 
const activitiesTotal = document.getElementById('activities-cost'); 
const paymentValue = document.getElementById('payment').value
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



//RegEx Variables 
const nameRegEx = /^[A-Za-z]+$/ 
const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const cardRegEx = /^[0-9]{13,16}$/
const zipRegEx = /^[0-9]{5}$/
const cvvRegEx = /^[0-9]{3}$/



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
    for (let i = 0; i < jobList.length; i++){
        let other = jobList[i].value
        if(targ === 'other'){
            otherJob.style.display = 'inline-block'; 
        }
    }
})


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





//Detects Change on 'payment type'

paymentMethod.addEventListener('change', (e) => {
    let targ = e.target.value;

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


// Tests whether a checkbox is checked or not. If not, form submission is prevented.
function checkBoxFieldTest(event){
    for (let i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
            event.preventDefault()
            checkboxes[i].parentElement.classList.add('valid')
            activitiesField.lastElementChild.style.display = 'none'

        }else{
            event.preventDefault()
            activitiesField.lastElementChild.style.display = 'inline-block'

        }
    }
}





/** Function that accepts event, name, and regular expression to test inputs
 * event = form event
 * name = element selection from html
 * reg = regular expression variable OR regular expression 
 * **/
function regExTester(event, name, reg){
    let value = name.value; 
    let regEx = reg
    if(regEx.test(value)){
        event.preventDefault();
        console.log('gucci') 
        name.parentElement.classList.add('valid')
        name.parentElement.classList.remove('not-valid'); 
        name.parentElement.lastElementChild.style.display = "none"

    }else{
        event.preventDefault()
        name.parentElement.classList.add('not-valid')
        name.parentElement.classList.remove('valid'); 
        name.parentElement.lastElementChild.style.display = "inline-block"
    }
}








//Form Submission event listener for testing input fields. 

form.addEventListener('submit', (e) => {
    e.preventDefault();
    //Checkbox test
    checkBoxFieldTest(e);
    //Name test
    regExTester(e, nameField, nameRegEx )
    //Email test
    regExTester(e, emailField, emailRegEx)

    //Only validate credit card fields if "credit-card" is selected
    if (paymentMethod.value === 'credit-card'){
        //Credit Card Test
        regExTester(e, cardNumberField, cardRegEx)
        //ZipCode Test
        regExTester(e, zipCodeField, zipRegEx)
        //Cvv Test
        regExTester(e, cvvField, cvvRegEx)
    }

})







//Accessibility :::use "checkboxes" variable:::

for(let i = 0; i < checkboxes.length; i++){

    checkboxes[i].addEventListener('focus', (e) =>{
        checkboxes[i].parentElement.classList.add('focus');
        checkboxes[i].parentElement.classList.remove('blur');  
    })

    checkboxes[i].addEventListener('blur', (e) => {
        checkboxes[i].parentElement.classList.remove('focus'); 
        checkboxes[i].parentElement.classList.add('blur')

    })
}






//Fix Html spacing at the end



