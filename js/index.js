
let counterId
//const sortByView = document.getElementById('sort-by-btn')
function sortByView(){
    showCatagory(counterId,true)

}
const loadAllCatagory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json()
    const catagories = data.data
   console.log(catagories)
    displayCatagory(catagories)
    //for initial load
   showCatagory(1000,false)
}

loadAllCatagory()

const displayCatagory = (catagories)=>{
    const catagoryContainer = document.getElementById('catagory-container')
    for (const catagory of catagories) {
       const catagoryButton = document.createElement('div')
       catagoryButton.innerHTML = `
       <button onclick="showCatagory('${catagory.category_id}')" class= "bg-[#D3D3D3] rounded-md font-medium px-5 py-2">${catagory.category}</button>`
       catagoryContainer.appendChild(catagoryButton)
    }
    

}
 const showCatagory = async (catagoryId,isSort)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${catagoryId}`)
    const data = await res.json()
    const catagoryData = data.data
   const catagorylength = catagoryData.length
    console.log(catagoryData)
   counterId = catagoryId
   if(isSort){
        for (let i =0;i<catagorylength;i++) {
            let element = catagoryData[i].others.views.slice(0,-1)
            for(let j=0;j<(catagorylength-i-1);j++){
                if((parseInt(catagoryData[j].others.views.slice(0,-1)))<(parseInt(catagoryData[j+1].others.views.slice(0,-1)))){
                    let temp = catagoryData[j]
                    catagoryData[j] = catagoryData[j+1]
                    catagoryData[j+1] = temp
                }
            } 
            
    }
   }
  
   console.log(catagoryData)

//    viewArray.sort(function(x, y){return y-x});
   
   displayDetails(catagoryData,catagorylength)
    

 }
 

 const displayDetails = (catagoryData,catagorylength) =>{
    const cardContainer= document.getElementById('card-container')
    cardContainer.innerHTML ="";
    const notFoundContainer = document.getElementById('not-found-container')
    notFoundContainer.innerHTML=''
    
    catagoryData.forEach(content => {
        const card = document.createElement('div')
        const postDateContainer = document.createElement('div')
        const verifiedIcon = `<img class="w-[20px] h-[20px]" src="icon/verify.png" alt=""></img>`
        let postedDate = parseInt(content.others.posted_date)
        let min = parseInt((postedDate%3600)/60)
        let hour = parseInt(postedDate/3600)
        let days
        let year
        if(hour>24){
           days = parseInt(hour/24)
           if(days>365){
             year = parseInt(days/365)
            days= parseInt(year%365)
           }
            hour = hour%24
        }
        
        let timeshow =`<p class = "absolute bottom-3 right-3 text-white p-[5px] bg-black rounded-md">${year?year+'y ':""}${days?days+'days':""} ${hour}hrs ${min}mins ago</p>`
        
        card.innerHTML =  ` 
        <div class ="relative"><img class="rounded-lg mb-5 h-[200px] w-full" src="${content.thumbnail}" alt="">${postedDate?timeshow:""}</div>
        <div class="mb-[10px] flex gap-2">
            <img class="rounded-full h-[40px] w-[40px]" src="${content.authors[0].profile_picture}">
            <h3 class="font-bold text-[20px]">${content.title}</h3>
        </div>
        <div class="flex gap-2 items-center mb-[10px]">
            <p class="text-[18px] font-normal">${content.authors[0].profile_name}</p>
            ${content.authors[0].verified?verifiedIcon:""}
            
        </div>
        <p>${content.others.views}</p>`
        cardContainer.appendChild(card)
    })

    if(catagorylength===0){
        display404()
    }
    
    //console.log(catagoryData.length)
 
 }
 const display404 = ()=>{
    const notFoundContainer = document.getElementById('not-found-container')
    notFoundContainer.innerHTML=''
    const notFound = document.createElement('div')
    notFound.classList =`mx-3 h-[300px] flex flex-col justify-center items-center gap-5`
    notFound.innerHTML = `
        <img src="images/Icon.png" alt="">
        <h3 class="text-3xl font-bold">Oops!! Sorry, There is no content here</h3>

    `
    notFoundContainer.appendChild(notFound)
 }