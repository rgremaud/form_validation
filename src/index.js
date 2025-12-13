import "./styles.css";

/*
Build a browser form which collects Email, Country, Postal Code, Password and Password Confirmation fields. 
It should use live inline validation to inform the user whether a field is properly filled in or not. 
That means validating as you type, not only upon form submission. 
When a field is invalid, it should be highlighted in red and show an error message to guide the user.

The form doesn’t need to actually submit, 
but you should give an error message if the button is pushed with any active errors or unfilled required fields. 
For the sake of this lesson, make sure the <form> element has the novalidate attribute which will allow you to do 
all of your validation in your JavaScript files. 
You can still use different <input> types, but you will need to use JavaScript to check and report their validity. 
If all is well and the form is “submitted”, give the user a high five.

Set up a blank HTML document
Think about how you would set up the different form elements and their accompanying validators. 
What objects and functions will you need? A few minutes of thought can save you from wasting an hour of coding. 
The best thing you can do is whiteboard the entire solution before even touching the computer.
Write the form elements.
Add the JavaScript code that checks validation as the user progresses through the form. When a user leaves a form field, it should automatically validate that field.
Test out all possible cases.
Don’t forget to style validations with CSS by using the :valid and :invalid pseudo-classes!
*/

// There are many ways to pick a DOM node; here we get the form itself and the email
// input box, as well as the span element into which we will place the error message.
const form = document.getElementsByTagName("form")[0];

const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");

email.addEventListener("input", (event) => {
  // Each time the user types something, we check if the
  // form fields are valid.

  if (email.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    emailError.innerHTML = ""; // Reset the content of the message
    emailError.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

form.addEventListener("submit", (event) => {
  // if the form contains valid data, we let it submit

  if (!email.validity.valid) {
    // If it isn't, we display an appropriate error message
    showError();
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();
  }
});

function showError() {
  if (email.validity.valueMissing) {
    // If the field is empty
    // display the following error message.
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    // If the field doesn't contain an email address
    // display the following error message.
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (email.validity.tooShort) {
    // If the data is too short
    // display the following error message.
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }

  // Set the styling appropriately
  emailError.className = "error active";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
