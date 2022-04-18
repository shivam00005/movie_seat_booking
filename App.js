 const container=document.querySelector('.container');
 const seats= document.querySelectorAll('.row .seats:not(.occupied)');
 const count =document.querySelector('#count');
 const total =document.querySelector('#total');
 const selectMovie= document.querySelector('#movies');
 
 populateUI();
 let ticketprice= +selectMovie.value;
 
 container.addEventListener('click', (e) => {
   if(e.target.classList.contains('seats') && !e.target.classList.contains('occupied')){
     e.target.classList.toggle('selected');
     
     updateSelctedCounts();
   }
 });
 
 selectMovie.addEventListener('change',(e)=>{
   ticketprice =+ e.target.value;
   setMoviedata(e.target.selectedIndex, e.target.value);
   updateSelctedCounts();
 });
 
 function setMoviedata(movieindex,movieprice){
   localStorage.setItem('selectedmovie',movieindex);
   localStorage.setItem('movieprice',movieprice);
   
 }
function updateSelctedCounts(){
 const seatselcted= document.querySelectorAll('.row .seats.selected');
 
 const indexseats = [...seatselcted].map((seat) => {
   return [...seats].indexOf(seat);
   
 });
 
 localStorage.setItem('seatselcted',JSON.stringify(indexseats));
 
  const selectedseatscound=seatselcted.length;
  
  count.innerText=selectedseatscound;
  
  total.innerText= selectedseatscound * ticketprice;
}
//populateUI
function populateUI(){
  const slcSeats = JSON.parse(localStorage.getItem('seatselcted'));
  if(slcSeats !== null && slcSeats.length>0){
    seats.forEach(function (seat,index){
      if(slcSeats.indexOf(index)>-1){
        seat.classList.add('selected');
      }
    });
  }
  
  const selcmovie= localStorage.getItem('selectedmovie');
  
  selectMovie.selectedIndex=selcmovie;
}
updateSelctedCounts();