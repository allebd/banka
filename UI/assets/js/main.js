/* eslint-disable no-undef */
/* global document */
const adminlogin = document.getElementById('adminlogin');
const positiveDelete = document.getElementById('positiveDelete');
const negativeDelete = document.getElementById('negativeDelete');
const positiveActivate = document.getElementById('positiveActivate');
const negativeActivate = document.getElementById('negativeActivate');
const positiveDeactivate = document.getElementById('positiveDeactivate');
const negativeDeactivate = document.getElementById('negativeDeactivate');
const alertMessage = document.querySelector('.alert');

if (adminlogin) {
  adminlogin.addEventListener('click', (event) => {
    event.preventDefault();
    const adminrole = document.getElementById('adminrole').value;
    const adminemail = document.getElementById('adminemail').value;
    const adminpass = document.getElementById('adminpass').value;

    if (adminemail.trim('') !== '' && adminpass.trim('') !== '') {
      if (adminrole === 'staff') {
        window.location.href = 'staffdashboard.html';
      } else {
        window.location.href = 'admindashboard.html';
      }
    } else {
      alertMessage.innerHTML = "<div class='alert-message alert-error'><p> Incorrect email or password, kindly try again.</a></p</div>";
      setTimeout(() => { alertMessage.innerHTML = ''; }, 5000);
    }
  });
}

// eslint-disable-next-line no-plusplus
for (let i = 1; i < 6; i++) {
  const activateAccount = document.getElementById(`activateAccount${i}`);
  const deactivateAccount = document.getElementById(`deactivateAccount${i}`);
  const deleteAccount = document.getElementById(`deleteAccount${i}`);
  if (activateAccount) {
    activateAccount.addEventListener('click', () => {
      document.getElementById('activate-account').style.display = 'block';
    });
  }

  if (deactivateAccount) {
    deactivateAccount.addEventListener('click', () => {
      document.getElementById('deactivate-account').style.display = 'block';
    });
  }

  if (deleteAccount) {
    deleteAccount.addEventListener('click', () => {
      document.getElementById('delete-account').style.display = 'block';
    });
  }
}

if (positiveDelete) {
  positiveDelete.addEventListener('click', () => {
    document.getElementById('activate-account').style.display = 'none';
    document.getElementById('deactivate-account').style.display = 'none';
    document.getElementById('delete-account').style.display = 'none';
  });
}

if (negativeDelete) {
  negativeDelete.addEventListener('click', () => {
    document.getElementById('activate-account').style.display = 'none';
    document.getElementById('deactivate-account').style.display = 'none';
    document.getElementById('delete-account').style.display = 'none';
  });
}

if (positiveActivate) {
  positiveActivate.addEventListener('click', () => {
    document.getElementById('activate-account').style.display = 'none';
    document.getElementById('deactivate-account').style.display = 'none';
    document.getElementById('delete-account').style.display = 'none';
  });
}

if (negativeActivate) {
  negativeActivate.addEventListener('click', () => {
    document.getElementById('activate-account').style.display = 'none';
    document.getElementById('deactivate-account').style.display = 'none';
    document.getElementById('delete-account').style.display = 'none';
  });
}

if (positiveDeactivate) {
  positiveDeactivate.addEventListener('click', () => {
    document.getElementById('activate-account').style.display = 'none';
    document.getElementById('deactivate-account').style.display = 'none';
    document.getElementById('delete-account').style.display = 'none';
  });
}

if (negativeDeactivate) {
  negativeDeactivate.addEventListener('click', () => {
    document.getElementById('activate-account').style.display = 'none';
    document.getElementById('deactivate-account').style.display = 'none';
    document.getElementById('delete-account').style.display = 'none';
  });
}
