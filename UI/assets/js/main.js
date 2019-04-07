const adminlogin = document.getElementById("adminlogin");
const positiveDelete = document.getElementById("positiveDelete");
const negativeDelete = document.getElementById("negativeDelete");
const positiveActivate = document.getElementById("positiveActivate");
const negativeActivate = document.getElementById("negativeActivate");
const positiveDeactivate = document.getElementById("positiveDeactivate");
const negativeDeactivate = document.getElementById("negativeDeactivate");

if(adminlogin){
    adminlogin.addEventListener("click", (event) => {
        event.preventDefault();
        const adminrole = document.getElementById("adminrole").value;
        if(adminrole === "staff"){
            window.location.href = "staffdashboard.html";
        }else{
            window.location.href = "admindashboard.html";
        }
    });
}

for(let i = 1; i < 6; i++){
    let activateAccount = document.getElementById("activateAccount"+i);
    let deactivateAccount = document.getElementById("deactivateAccount"+i);
    let deleteAccount = document.getElementById("deleteAccount"+i);
    if(activateAccount){
        activateAccount.addEventListener("click", () =>{
            document.getElementById('activate-account').style.display='block';
        });
    }

    if(deactivateAccount){
        deactivateAccount.addEventListener("click", () => {
            document.getElementById('deactivate-account').style.display='block';
        });
    }

    if(deleteAccount){
        deleteAccount.addEventListener("click", () => {
            document.getElementById('delete-account').style.display='block';
        });
    }
}

if(positiveDelete){
    positiveDelete.addEventListener("click", () => {
        document.getElementById('activate-account').style.display='none';
        document.getElementById('deactivate-account').style.display='none';
        document.getElementById('delete-account').style.display='none';
    });
}

if(negativeDelete){
    negativeDelete.addEventListener("click", () => {
        document.getElementById('activate-account').style.display='none';
        document.getElementById('deactivate-account').style.display='none';
        document.getElementById('delete-account').style.display='none';
    });
}

if(positiveActivate){
    positiveActivate.addEventListener("click", () => {
        document.getElementById('activate-account').style.display='none';
        document.getElementById('deactivate-account').style.display='none';
        document.getElementById('delete-account').style.display='none';
    });
}

if(negativeActivate){
    negativeActivate.addEventListener("click", () => {
        document.getElementById('activate-account').style.display='none';
        document.getElementById('deactivate-account').style.display='none';
        document.getElementById('delete-account').style.display='none';
    });
}

if(positiveDeactivate){
    positiveDeactivate.addEventListener("click", () => {
        document.getElementById('activate-account').style.display='none';
        document.getElementById('deactivate-account').style.display='none';
        document.getElementById('delete-account').style.display='none';
    });
}

if(negativeDeactivate){
    negativeDeactivate.addEventListener("click", () => {
        document.getElementById('activate-account').style.display='none';
        document.getElementById('deactivate-account').style.display='none';
        document.getElementById('delete-account').style.display='none';
    });
}