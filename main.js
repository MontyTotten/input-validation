(function () {
    var nameEl = document.querySelector('#name');
    var descriptionEl = document.querySelector('#description');
    var hoursEl = document.querySelector('#hours');
    var skillEl = document.querySelector('#skill');
    var ingredientsEl = document.querySelector('#ingredients');
    var stepsEl = document.querySelector('#steps');
    var backButton = document.querySelector('#back');
    var nextButton = document.querySelector('#next');
    var steps = document.querySelectorAll('.step');
    // currentStep should keep track of the index of current step that is visible.
    var currentStep = 0;

    // `updateButtons` should add the `is-active` class to the back button if
    // the current step is beyond the first step, otherwise remove it. It should
    // also show the next button if the current step is before the last step,
    // otherwise hide it. We call this function at the bottom of the scope to do
    // an initial show/hide.
    function updateButtons() {
        if (currentStep <= 0) {
            backButton.classList.remove('is-active')
        } else {
            backButton.classList.add('is-active')
        };
        if (currentStep < steps.length -1) {
            nextButton.classList.add('is-active')
        } else {
            nextButton.classList.remove('is-active')
        };
    };

    // `hideCurrentStep` should hide the step that is currently visible using
    // the `currentStep` variable.
    function hideCurrentStep() {
        steps[currentStep].classList.remove('is-active');
    }

    // `next` should validate the inputs on the current step by calling
    // `validate()`.
    // * If `validate` returns true, increment the value of `currentStep`.
    // * If `validate` returns true, the current step should be hidden and
    // the next step should be shown (use the class `is-active`).
    // * `next` should also call `updateButtons` to display the appropriate
    // buttons.
    function next() {
        if (validate() === true) {
            hideCurrentStep();
            currentStep++;
            steps[currentStep].classList.add('is-active');
            updateButtons();
            removeValidationErrors();
        } 
    };

    
    // `back` should validate the inputs on the current step by calling
    // `validate()`.
    // * IF`validate` returns true, decrement the value of `currentStep`.
    // * IF`validate` returns true, the current step should be hidden and
    // the previous step should be shown (use the class `is-active`).
    // * `back` should also call `updateButtons` to display the appropriate
    // buttons.
    function back() {
        if (validate() === true) {
            hideCurrentStep();
            currentStep--;
            steps[currentStep].classList.add('is-active');
            updateButtons();
            removeValidationErrors();
        }  
    };
    
    // Validate should evaluate the input of the inputs in the current step.
    // * The function should start by clearing any errors that were
    // previously there.
    // * If the inputs have the proper input, the function should return
    // true.
    // * If an input does not have valid input, the function should set the
    // `data-error` attribute on the input's containing `.field` element to
    // an error message, add the class `is-error` to the field and
    // ultimately return false.
    function validate() {
        var valid = true;

        if (currentStep === 0) {
            if (nameEl.value.length < 3 || nameEl.value.length > 50) {
                nameEl.parentElement.dataset.error = 'Required: Between 3 & 50 characters.';
                nameEl.parentElement.classList.add('is-error');
                valid = false;
            }
            if (descriptionEl.value.length < 20 || descriptionEl.value.length > 255) {
                descriptionEl.parentElement.dataset.error = 'Required: Between 20 & 255 characters.';
                descriptionEl.parentElement.classList.add('is-error');
                valid = false;
            }
        } else if (currentStep === 1) {
            if (hoursEl.value.length === 0) {
                hoursEl.parentElement.dataset.error = 'Required';
                hoursEl.parentElement.classList.add('is-error');
                valid = false;
            }
            if (skillEl.value.length === 0) {
                skillEl.parentElement.dataset.error = 'Required';
                skillEl.parentElement.classList.add('is-error');
                valid = false;
            }
        } else if (currentStep === 2) {
            if (ingredientsEl.value.length === 0 || ingredientsEl.value.length > 255) {
                ingredientsEl.parentElement.dataset.error = 'Required';
                ingredientsEl.parentElement.classList.add('is-error');
                valid = false;
            }
            
        } else if (currentStep === 3) {
            if (stepsEl.value.length === 0 || stepsEl.value.length > 255) {
                stepsEl.parentElement.dataset.error = 'Required';
                stepsEl.parentElement.classList.add('is-error');
                valid = false;
            }
        }
        return valid;  
    };
    nextButton.addEventListener('click', function (e) {
        next();
        e.preventDefault(); 
    });
    backButton.addEventListener('click', function (e) {
        back();
        e.preventDefault(); 
    });

    function removeValidationErrors () {
            var elements = document.querySelectorAll('*');
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove('is-error');
                elements[i].dataset.error = '';
            }
        }
    // Register an event handler for the 'click' event on the next button.
    // The event handler should prevent any default functionality the
    // browser has for `<button>` elements and call the `next` function. 

    // Register an event handler for the 'click' event on the back button.
    // The event handler should prevent any default functionality the
    // browser has for `<button>` elements and call the `back` function. 

    // Call `updateButtons` initially to make sure the proper buttons are
    // visible.
    updateButtons();
})();