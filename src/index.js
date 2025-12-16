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

const password = document.getElementById("password");
const passwordError = document.querySelector("#password + span.error");

const passwordConfirm = document.getElementById("passConfirm");
const passwordConfirmError = document.querySelector("#passwordConfirm + span.error");

const country = document.getElementById("country");
const countryError = document.querySelector("#country + span.error");

const postal = document.getElementById("postal");
const postalError = document.querySelector("#postal + span.error");

postal.addEventListener("input", (event) => {
  if (country.value = "United States") {
    const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/
    postal.setAttribute('pattern', regex.source)
  }

  if (postal.validity.valid) {
    postalError.innerHTML = "";
    postalError.className = "error";
  } else {
    showPostalError();
  }
})

country.addEventListener("select", (event) => {

  if (country.validity.valid) {
    countryError.innerHTML = "";
    countryError.className = "error";
  } else {
    showCountryError();
  }
})

password.addEventListener("input", (event) => {

  if (password.validity.valid) {
    passwordError.innerHTML = "";
    passwordError.className = "error";
  } else {
    showPassError();
  }
})

passwordConfirm.addEventListener("input", (event) => {
  const password = document.getElementById("password");
  const passwordValue = password.value;
  password.setAttribute('pattern', passwordValue);

  if (passwordConfirm.validity.valid) {
    passwordConfirmError.innerHTML = "";
    passwordConfirmError.className = "error";
  } else {
    showPassConfirmError();
  }
})

email.addEventListener("input", (event) => {

  if (email.validity.valid) {
    emailError.innerHTML = ""; // Reset the content of the message
    emailError.className = "error"; // Reset the visual state of the message
  } else {
    showEmailError();
  }
});

form.addEventListener("submit", (event) => {

  if (!email.validity.valid) {
    showEmailError();
    event.preventDefault();
  }

  if (!password.validity.valid) {
    showPassError();
    event.preventDefault();
  }

  if (!passwordConfirm.validity.valid) {
    showPassConfirmError();
    event.preventDefault();
  }

  if (!country.validity.valid) {
    showCountryError();
    event.preventDefault();
  }

  if (!postal.validity.valid) {
    showPostalError();
    event.preventDefault();
  }
});

function showEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }

  emailError.className = "error active";
}

function showPassError() {
  if (password.validity.tooShort) {
    passwordError.textContent = "Password must have a length of 8.";
    // triggers but doesn't show error text
  }

  passwordError.className = "error active";
}

function showCountryError() {
  if (country.validity.valueMissing) {
    countryError.textContent = "Don't forget to select your country!"
  }

  countryError.className = "error active";
}

function showPostalError() {
  if (postal.validity.patternMismatch) {
    postalError.textContent = `Postal code does not pattern for ${country.value}`
  }
}

function showPassConfirmError() {
  if (passwordConfirm.validity.patternMismatch) {
    passwordConfirmError.textContent = "Password doesn't match!";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const button = document.getElementById("Submit")

button.addEventListener("click", () => {
  if (email.validity.valid && password.validity.valid && passwordConfirm.validity.valid && country.validity.valid && postal.validity.valid) {
    alert("High five!  Your form is valid!")
  } else {
    alert("Try again fool!")
  }
})