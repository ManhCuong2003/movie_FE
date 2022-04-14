let button = document.getElementById("btn-signup");
let emailElement = document.getElementById("txt-email");
let userNameElement = document.getElementById("txt-username");
let passwordElement = document.getElementById("txt-password");
let rePasswordElement = document.getElementById("txt-repassword");

const checkEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        emailElement.style.borderColor = "green"
        return true;
    }else{
        emailElement.style.borderColor = "red"
        return false;
    }
}

const checkUserName = (userName) => {
    if (userName.length > 7 && !userName.includes(" ")){
        userNameElement.style.borderColor = "green"
        return true;
    }else{
        userNameElement.style.borderColor = "red"
        return false;
    }
    
}

const checkPassword = (password) => {
    if (password.length > 7 && !password.includes(" ")){
        passwordElement.style.borderColor = "green"
        return true;
    } else {
        passwordElement.style.borderColor = "red"
        return false;
    }
}

const checkRePassword = (rePassword) => {
    if (rePassword == passwordElement.value) {
        rePasswordElement.style.borderColor = "green"
        return true;
    }else{
        rePasswordElement.style.borderColor = "red"
        return false;
    }
}

emailElement.addEventListener("input", (event) => {
    checkEmail(event.target.value)
})

userNameElement.addEventListener("input", (event) => {
    checkUserName(event.target.value)
})
passwordElement.addEventListener("input", (event) => {
    checkPassword(event.target.value)
})
rePasswordElement.addEventListener("input", (event) => {
    checkRePassword(event.target.value)
})

const signup = () => {
   if(checkEmail(emailElement.value) && checkUserName(userNameElement.value) && checkPassword(passwordElement.value) && checkRePassword(rePasswordElement.value)) {
       let newAccount = {
           email: emailElement.value,
           username: userNameElement.value,
           password: passwordElement.value,
       };
       axios({
           url: 'http://localhost:8080/account',
           method: 'POST',
           data: newAccount,
       }).then((response) =>{
           console.log(response.data);
           const {status, message} = response.data;
           if(status === 200) {
            Swal.fire("Notification",
             message,
             "success");
           } else{
            Swal.fire({
                icon: "error",
                title: "Error",
                text: message,
            });
           }
       }).catch((error) =>{
           console.log(error);
       })
   }
}

button.addEventListener("click",signup);



