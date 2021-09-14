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

  let arrow = document.querySelectorAll(".link-menu");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e)=>{
 let arrowParent = e.target.parentElement.parentElement.parentElement;//selecting main parent of arrow
 arrowParent.classList.toggle("showMenu");
  });
}

var replaceDigits = function() {
  var map =  arabicNumbers = '\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669';
  return new String(num).replace(/[0123456789]/g, (d)=>{return arabicNumbers[d]});
 }

window.onload = replaceDigits;