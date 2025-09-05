const pbut=document.getElementsByClassName("playb")[0];
const rbut=document.getElementsByClassName("resetb")[0];
const lbut=document.getElementsByClassName("lapb")[0];
const minu=document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("second")[0];
const msec = document.getElementsByClassName("msec")[0];
const lap = document.getElementsByClassName("lap")[0];
const clearButton = document.getElementsByClassName("clear")[0];
const bg= document.getElementsByClassName("out-circle")[0];
// const time_stamp= document.getElementsByClassName("time-stamp")[0];


 
let min;
let sec;
let misec;
let minc=0;
let secc=0;
let misecc=0;
let isplay=false
let isreset=false
let lapitem=0

const togglebut=() =>{
    lbut.classList.remove("hidden");
    rbut.classList.remove("hidden");
}
const play=()=>{
    if(!isplay && !isreset){
        pbut.innerHTML='pause';
        bg.classList.add("animation-bg");
        
        misec=setInterval(()=>{
            if(misecc===100){
                misecc=0;
            }
            msec.innerHTML=`&nbsp${++misecc}` ;
        },10);
        sec = setInterval(() => {
             if (secc === 60) {
               secc = 0;
             }
           second.innerHTML = `&nbsp${++secc} :`;
        }, 1000);
        min = setInterval(() => {
             if (minc === 60) {
               minc = 0;
             }
           minu.innerHTML = `&nbsp${++minc} :`;
         },60*1000);
         isplay = true;
         isreset = true;


    }
    else{
        pbut.innerHTML='play';
       
        clearInterval(misec)
        clearInterval(sec)
        clearInterval(min);
        isplay = false;
        isreset = false;
        bg.classList.remove("animation-bg");


    } 
    togglebut();
}
const reset=() =>{
    isreset = true;
    play();
    lbut.classList.add("hidden");
    rbut.classList.add("hidden");
    msec.innerHTML=`&nbsp;0`
    second.innerHTML = `&nbsp;0 :`;
    minute.innerHTML = `&nbsp;0 :`;

}
const laps=()=>{
  const li=document.createElement("li");
  const number=document.createElement("span");
  const timestamp=document.createElement("span");

  li.setAttribute("class","lap-item")
  number.setAttribute("class","num")
  timestamp.setAttribute("class", "time-stamp");
  
number.innerText=`#${++lapitem}`;
timestamp.innerHTML=`${minc} : ${secc} : ${misecc}`

li.append(number,timestamp);
lap.append(li);

clearButton.classList.remove("hidden");

}
const clearall=()=>{
  lap.innerHTML='';
  lap.append(clearButton);

  clearButton.classList.add("hidden");

}
pbut.addEventListener("click",play);
rbut.addEventListener("click",reset);
lbut.addEventListener("click",laps);
clearButton.addEventListener("click",clearall);