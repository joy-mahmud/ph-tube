const loadAllCatagory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json()
    const catagories = data.data
   // console.log(catagories)
    displayCatagory(catagories)
    //for initial load
   showCatagory(1000)
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
 const showCatagory = async (catagoryId)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${catagoryId}`)
    const data = await res.json()
    const catagoryData = data.data
   const catagorylength = catagoryData.length
    console.log(catagoryData)
    console.log(catagorylength)
    displayDetails(catagoryData,catagorylength)

 }
 

 const displayDetails = (catagoryData,catagorylength) =>{
    const cardContainer= document.getElementById('card-container')
    cardContainer.innerHTML ="";
    const notFoundContainer = document.getElementById('not-found-container')
    notFoundContainer.innerHTML=''
    
    catagoryData.forEach(content => {
        const card = document.createElement('div')
        const verifiedIcon = `<img class="w-[20px] h-[20px]" src="icon/verify.png" alt=""></img>`
        card.innerHTML =  ` 
        <img class="rounded-lg mb-5 h-[200px] w-full" src="${content.thumbnail}" alt="">
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