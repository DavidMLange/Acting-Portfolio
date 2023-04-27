/********w************
    
	Project 4 Javascript
    Name: David Lange 
    Date: 2023-04-09
    Description: WEBD-1008 Project 4 

*********************/


function load(){
    hideErrors();

    document.getElementById("contactform").addEventListener("submit", validate);
    document.getElementById("contactform").addEventListener("reset", resetForm);
}

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
	// Hides all error elements on the page
	hideErrors();

	// Determine if the form has errors
	if (formHasErrors()) {
		// Prevents the form from submitting
		e.preventDefault();

		// When using onSubmit="validate()" in markup, returning false would prevent
		// the form from submitting
		return false;
	}

	// When using onSubmit="validate()" in markup, returning true would allow
	// the form to submit
	return true;
}

/*
 * Handles the reset event for the form.
 * 
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Reset?')) {
		// Ensure all error fields are hidden
		hideErrors();

		// Set focus to the first text field on the page
		document.getElementById("fullname").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {

	let errorFlag = false;
	let requiredFields = ["fullname", "phone", "email"];

	//	Complete the validations below
	// Checking to see if all inputs have text.
	for(let i = 0; i < requiredFields.length; i++)
	{
		let textField = document.getElementById(requiredFields[i]);
		let emailValue = document.getElementById("email").value;
		let phoneValue = document.getElementById("phone").value;
		let regexPhone = new RegExp;
		let regexEmail = new RegExp;


		// Verifying the text fields have input. If not, display error and do not submit form.
		if(!hasInput(textField))
		{
			document.getElementById(requiredFields[i] + "_error").style.display = "block";
			if(!errorFlag)
			{
				textField.focus();
				textField.select();
			}

			errorFlag = true;
		}
		
		// Creating a Regular Expression to check for a valid format in the postal code input field.
		regexPhone = /^\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$/;
		if(!regexPhone.test(phoneValue))
		{
			document.getElementById("phoneformat_error").style.display = "block";
			if(!errorFlag)
			{
				document.getElementById("phone").focus();
				document.getElementById("phone").select();
				errorFlag = true;
			}
		}

		// Creating a Regular Expression to check for a valid format in the email input field.
		regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(!regexEmail.test(emailValue))
		{
			document.getElementById("emailformat_error").style.display = "block";
			if(!errorFlag)
			{
				document.getElementById("email").focus();
				document.getElementById("email").select();
				errorFlag = true;
			}
		}
    }
	// Returns true or false.
	return errorFlag;
}

/*
 * Hides all of the error elements.
 */
function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Determines if the text field has input.
 *
 * param field A text field input element object
 * return True if the field contains input, false if not.
 */
function hasInput(field)
{
	if(field.value == null || trim(field.value) == "")
	{
		return false;
	}

	return true;
}

document.addEventListener("DOMContentLoaded", load);
