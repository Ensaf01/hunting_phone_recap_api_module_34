console.log("hunting")
// search load phone
const loadPhone1 = async (searchTextFromInputFiled) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchTextFromInputFiled}`);//searchTextFromInputFiled base kore search korbe
    const result = await res.json();
    displayPhone(result.data);
}
// we want to show all phone display then base on search show if user search
const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');//searchTextFromInputFiled base kore search korbe
    const result = await res.json();
    displayPhone(result.data);
}

// have to call  loadPhone() from html or js function,so we call from js


const displayPhone = phones => {
    // step-1 read where we want to see phone card
    const phoneContainer = document.getElementById('phone-container');
    // clear container before new phone card
    phoneContainer.textContent='';// search iphone then search samsung,so iphone do not show now show samsung
     //console.log(phones.length);// search kore je fetch korche segula koyta object ache ba array ache

    // show all button if result if gather then 5
    const showButtonContainer=document.getElementById('show-all-result');
    if(phones.length>5){
        showButtonContainer.classList.remove('hidden')
    }
    else{
        showButtonContainer.classList.add('hidden');
    }
    // console.log(phones);
    phones=phones.slice(0,5); // all phones or elements na dekhai just 1st 5 ta dekhabo
     console.log(phones.length);// after search show koyta dekhache
    phones.forEach(element => {
         console.log(element);//see all phone object
        //step -2 create a div that will show in display
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-orange-200  shadow-sm p-10 ` // class add 

        //step -3 ,inner html create
        phoneCard.innerHTML = `
           <figure>
                <img src="${element.image}"
                 alt="Shoes" />
            </figure>
                <div class="card-body">
                        <h2 class="card-title">${element.phone_name}</h2>
                        <h2 class="card-title">${element.brand}</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts
                        </p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                </div>
        `
        // step-4 append child

        phoneContainer.appendChild(phoneCard)

    });
}

// search phone

const SearchPhone =() =>{
    const searchFiled=document.getElementById('inputFiledText');
    const searchText=searchFiled.value;// this is input that why value use
    console.log(searchText);
    loadPhone1(searchText); // after search we want load. now load function call with argument 'searchText'

}
loadPhone();// all time display show all phone 

