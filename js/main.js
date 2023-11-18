const doc = document;

const userForm = doc.forms.userForm;
const fields = userForm.fields.elements;
const sendBtn = userForm.sendBtn;

const isValid = {
  name: false,
  age: false
};

Array.from(fields).forEach(function(field) {
  isValid[field.name] = false;

  field.addEventListener('input', function() {
    const value = this.value;
    const fieldName = this.name;
    const parent = this.parentElement;

    if (value.length >= 5) {
      console.log(`[${fieldName}] is valid`);
      isValid[fieldName] = true;
      parent.classList.remove('error');
      delete parent.dataset.helperText;
    } else {
      console.log(`[${fieldName}] is not valid`);
      isValid[fieldName] = false;
      parent.classList.add('error');
      parent.dataset.helperText = 'Is not valid data !!!';
    }

    updateButtonStyle();
  });
});

function updateButtonStyle() {
  let isValidForm = true;

  Array.from(fields).forEach(function(field) {
    if (field.name in isValid && !isValid[field.name]) {
      isValidForm = false;
    }
  });

  sendBtn.classList.toggle('form-valid', isValidForm);
  sendBtn.classList.toggle('form-notvalid', !isValidForm);
}

userForm.addEventListener('submit', function(event) {
  event.preventDefault();

  let isFormEmpty = true;

  Array.from(fields).forEach(function(field) {
    const value = field.value;
    const parent = field.parentElement;

    if (value.trim() === '') {
      parent.classList.add('error');
      parent.dataset.helperText = 'Field cannot be empty!';
      isFormEmpty = false;
    }
  });

  if (!isFormEmpty) {
    console.log('Form has empty fields!');
    sendBtn.classList.remove('form-valid');
    sendBtn.classList.add('form-notvalid');
  } else {
    console.log('Send');
    userForm.reset();
    sendBtn.classList.remove('form-notvalid');
    sendBtn.classList.add('form-valid');
  }
});
