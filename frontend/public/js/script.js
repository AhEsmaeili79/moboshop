$(document).ready(function() {
    var msg="";
    var elements = document.getElementsByTagName("INPUT");
    
    for (var i = 0; i < elements.length; i++) {
       elements[i].oninvalid =function(e) {
            if (!e.target.validity.valid) {
            switch(e.target.id){
                case 'password' : 
                e.target.setCustomValidity("لطفا کلمه عبور را وارد کنید");break;
                case 'email' : 
                e.target.setCustomValidity("لطفا ایمیل را وارد کنید");break;
                case 'phonenumber' : 
                e.target.setCustomValidity("لطفا شماره تلفن همراه را وارد کنید");break;
                case 'name' : 
                e.target.setCustomValidity("لطفا نام را وارد کنید");break;
            default : e.target.setCustomValidity("");break;
    
            }
           }
        };
       elements[i].oninput = function(e) {
            e.target.setCustomValidity(msg);
        };
    } 
    })