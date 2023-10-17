console.log("ok ok ");
const searchbar=document.querySelector(".search-Container")
const profilecontainer=document.querySelector(".profile-container")
const root=document.documentElement.style;
const get =(param)=>
    document.getElementById(`${param}`);


const url="https://api.github.com/users/";
const noresult=get("no-result");
const btnode=get("btn-mode");
const modetext=get("mode-text")
const modeicon=get("mode-icon")
const btnsubmit=get("submit")
const input=get("input");
const avatar=get("avator");
const userName=get("name");
const user=get("user");
const date=get("date")
const months=["Jan","Feb" ,"Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nev","Dec"];
const bio=get("bio");
const repos=get("repos")
const followers=get("follwers");
const followings=get("following");
const user_location=get("location");
const page=get("page");
const twitter=get("twitter")
const company=get("company");




let darkmode;

function init(){
    darkmode=false;
    const preferdarkMode=window.matchMedia && window.matchMedia("(prefers-color-scheme: dark )").matches;
    if(localStorage.getItem("dark-mode")){
darkmode=localStorage.getItem("dark-mode")
  //darkModeProperties();

    }else{
        localStorage.setItem("dark-mode",preferdarkMode);
        darkmode=preferdarkMode;
        lightmodeProperties();
    }

    lightmodeProperties()

    getUserData(url + "thepranaygupta");

}

init();

function lightmodeProperties(){
    root.setProperty("--lm-bg","#F6F8FF");
    root.setProperty("--lm-bg-content","#FEFEFE");
    root.setProperty("--lm-text","#486A9B");
    root.setProperty("--lm-bg","#2B3442");
    root.setProperty("--lm-bg","rgba(70,88,109,0.25)");
    modetext.innerText="dark"
    modeicon.src="./images/moon-icon.svg"
    root.setProperty("--lm-icon-bg", "brightness(100%)")
    darkmode=false;
    localStorage.setItem("dark-mode",false)

   // let a=document.getElementById("a");
  //  a.style.backgroundColor="antiquewhite";
  
    
}

function getUserData(getUrl){


    fetch(getUrl)
    .then((response)=>response.json())
    .then(   (data)=>
   {console.log(data)
    updateProfile(data);
})

 .catch((error)=>{
         throw error;
 })




 

}

getUserData(url+"thepranaygupta");


function updateProfile(data){

    if(data.message !=="Not Found"){
        noresult.style.display="none";


        function checknull(param1, param2){
            if(param1 =="" || param2 === ""){
                param2.style.opacity=0.5;
                param2.previousElementSibling.style.opacity=0.5;
                return false;
            }
            else{
                return true;
            }
        }

        avatar.src=`${data.avatar_url}`

        userName.innerText=data.name === null ? data.login : data.name;
        user.innerText=`${data.login}`;
        user.href=`${data.html_url}`;
        let dateSegment=data.created_at.split("T").shift().split("-");

         date.innerText=`Joined At  ${dateSegment[2]}  ${months[dateSegment[1]-1]}  ${dateSegment[0]}`
    bio.innerText=data.bio=== null ? "this profile has no bio ": `${data.bio}`
    repos.innerText=`${data.public_repos}`
     followers.innerText=`${data.followers}`
     followings.innerText=`${data.following}`



     user_location.innerText=checknull(data.location ,user_location) ? data.location :"NOT APPLICABLE";
     
     
     page.innerText = checknull(data.blog, page) ? data.blog : "Not Available";
    page.href = checknull(data.blog, page) ? data.blog : "#";






      twitter.href=checknull(data.twitter_username ,twitter) ? `https://twitter.com/${data.twitter_username}` :"#";
    
      twitter.innerText=checknull(data.twitter_username ,twitter) ? data.twitter_username :"OT AVILABLE";
    



      company.innerText=checknull(data.company ,company) ? data.company : "Not Available";
      searchbar.classList.toggle("active");

     }else{
         noresult.style.display="block";
     }
}

btnsubmit.addEventListener('click',function(){

    if(input.value != ""){
        getUserData(url+input.value);
    }
})


input.addEventListener("keydown" ,function(e){
    if(e.key =="Enter"){
        if(input.value !== ""){
            getUserData(url +input.value);
        }
    }
},false

)

btnode.addEventListener("click",function(){
    if(darkmode==false){
     darkModeProperties();
    }
    else{
 lightmodeProperties()
    }
})


function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modetext.innerText = "LIGHT";
    modeicon.src = "./images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkmode = true;
    
    console.log("darkmode changed to " + darkmode);
    localStorage.setItem("dark-mode", true);  console.log("setting dark mode to false");
  
    console.log("setting dark mode to true");
   // let a=document.getElementById("a");
  //  a.style.backgroundColor="rgb(117, 114, 110)";
  
  }

  input.addEventListener('input',function(){
    noresult.style.display="none";
  })

   