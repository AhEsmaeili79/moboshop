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
                case 'confirmPassword' : 
                e.target.setCustomValidity("لطفا کلمه عبور را دوباره وارد کنید");break;
            default : e.target.setCustomValidity("");break;
    
            }
           }
        };
       elements[i].oninput = function(e) {
            e.target.setCustomValidity(msg);
        };
    } 
    })

    let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }
}
