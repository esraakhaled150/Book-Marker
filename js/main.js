let siteName = document.getElementById("name")
let siteUrl = document.getElementById("url")
let submitBtn = document.getElementById("Submit")
let tableBody = document.getElementById('tableBody')
let bookMarkContainer=[]

if (localStorage.getItem('bookMarkContainer')!= null ) {
  bookMarkContainer =JSON.parse(localStorage.getItem('bookMarkContainer'))
  displyBookMark ()
}


function ValidsiteName() {
  var namRegex = /^[A-Za-z0-9 ]{2,}$/;
  if (!namRegex.test(siteName.value)) {
    return false;
  }
  else{
    return true;
  }
}




function validUrl() {
  var urlRegex = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/;

  if(!urlRegex.test(siteUrl.value) ){
return false;
  }
  else{
    return true;
  }
};



siteUrl.onkeyup= function(){
  if (validUrl() && ValidsiteName() ) {
    submitBtn.removeAttribute("disabled");
  }else{
    submitBtn.disabled ="true";
  }
};


siteName.onkeyup= function(){
  if (validUrl() && ValidsiteName() ) {
    submitBtn.removeAttribute("disabled");
  }else{
    submitBtn.disabled ="true";
  }
};


function addBookmark (){
  let bookMark={
    name: siteName.value,
    url: siteUrl.value
  }
  bookMarkContainer.push(bookMark)
 localStorage.setItem('bookMarkContainer', JSON.stringify(bookMarkContainer) )
 displyBookMark ()
 clearBookMark()
};



function displyBookMark (){
  let bookMarkBox = ''
  for (let i = 0; i < bookMarkContainer.length; i++) {
    bookMarkBox +=`       <tr>
        <td class="text-center"> ${bookMarkContainer[i].name}</td>
        <td> <a href= https://${bookMarkContainer[i].url}><button class="btn btn-success"> Visit</button></a> </td>
        <td> <button  onclick="setBookMarkValues(${i})" class='btn btn-warning'>  Update</button><td>
         <td> <button onclick="deleteBookMark(${i})" class='btn btn-danger'>  Delete</button><td>
  
       </tr>`
    
  }

tableBody.innerHTML = bookMarkBox
};

function clearBookMark(){
  siteName.value ='';
  siteUrl.value='';

  submitBtn.setAttribute =("disabled");
};


function deleteBookMark(index){
bookMarkContainer.splice(index ,1);
 localStorage.setItem('bookMarkContainer', JSON.stringify( bookMarkContainer))
displyBookMark ()

};
let superIndex;
function setBookMarkValues(index){
  superIndex= index;
  siteName.value = bookMarkContainer[index].name;
  siteUrl.value = bookMarkContainer[index].url;
  document.getElementById('updatBtn').style.display='block'
  document.getElementById('Submit').style.display='none'
};

function updateBookMark(){
    document.getElementById('updatBtn').style.display='none'
  document.getElementById('Submit').style.display='block'
  bookMarkContainer[superIndex].name = siteName.value;
  bookMarkContainer[superIndex].url=siteUrl.value;
  displyBookMark();
  localStorage.setItem('bookMarkContainer', JSON.stringify(bookMarkContainer) )
clearBookMark();

};



function searchBookmark(inputvalue){
// console.log(inputvalue);
let wantedBookMark =[];
for (let i = 0; i < bookMarkContainer.length; i++) {
  if (bookMarkContainer[i].name.toLowerCase().includes(inputvalue.toLowerCase()) ) {
    wantedBookMark+= `<tr>
        <td class="text-center"> ${bookMarkContainer[i].name}</td>
        <td> <a href=" ${bookMarkContainer[i].url}"><button class="btn btn-success"> Visit</button></a> </td>
        <td> <button  onclick="setBookMarkValues(${i})" class='btn btn-warning'>  Update</button><td>
         <td> <button onclick="deleteBookMark(${i})" class='btn btn-danger'>  Delete</button><td>
  
       </tr>
    `

  }
  tableBody.innerHTML = wantedBookMark

}


};


