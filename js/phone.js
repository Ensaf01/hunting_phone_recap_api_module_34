console.log("hunting")
// search load phone
const loadPhone1 = async (searchTextFromInputFiled, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchTextFromInputFiled}`);//searchTextFromInputFiled base kore search korbe
    const result = await res.json();
    displayPhone(result.data, isShowAll);
}
// we want to show all phone display then base on search show if user search
const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');//searchTextFromInputFiled base kore search korbe
    const result = await res.json();
    displayPhone(result.data);
}

// have to call  loadPhone() from html or js function,so we call from js


const displayPhone = (phones, isShowAll) => {
    // step-1 read where we want to see phone card
    const phoneContainer = document.getElementById('phone-container');
    // clear container before new phone card
    phoneContainer.textContent = '';// search iphone then search samsung,so iphone do not show now show samsung

    //console.log(phones.length);// search kore je fetch korche segula koyta object ache ba array ache

    // no data found
    if (phones.length === 0) { // that means no data found is true
        NoDataFound(true);
    }
    else {
        NoDataFound(false);
    }
    // show all button if result if gather then 5
    const showButtonContainer = document.getElementById('show-all-result');
    if (phones.length > 5 && !isShowAll)// isShowAll na thakle and 5 besi hole
    {
        showButtonContainer.classList.remove('hidden')
    }
    else {
        showButtonContainer.classList.add('hidden');
    }
    console.log("ishowAll check", isShowAll)
    if (!isShowAll) {
        phones = phones.slice(0, 5); // all phones or elements na dekhai just 1st 5 ta dekhabo
    }
    // console.log(phones);

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
                        <div class="card-actions justify-center">
                            <button onclick="MoreDetails('${element.slug}')" class="btn btn-primary">More Deatils</button>
                        </div>
                </div>
        `
        // step-4 append child

        phoneContainer.appendChild(phoneCard)

    });

    // hidden spinner ui after append phone
    Toggoleloading_spinner(false);
    
}

// search phone

const SearchPhone = (isShowAll) => {
    Toggoleloading_spinner(true);
    // NoDataFound(false);
    const searchFiled = document.getElementById('inputFiledText');
    const searchText = searchFiled.value;// this is input that why value use
    console.log(searchText);
    loadPhone1(searchText, isShowAll); // after search we want load. now load function call with argument 'searchText' and isshowall true or not

}


//loading-spinner function

const Toggoleloading_spinner = (isLoading) => {
    const lodingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        lodingSpinner.classList.remove('hidden');
    }
    else {
        lodingSpinner.classList.add('hidden')
    }

}
// no data found logic
const NoDataFound = (isDataFound) => {
    const dataNotFound = document.getElementById('dataNotFoundHereID');
    if (isDataFound) {
        dataNotFound.classList.remove('hidden');
        dataNotFound.innerHTML = `
        <h1 class="text-center text-2xl font-bold m-20"> Not Found Data</h1>
        `
    }
    else {
        dataNotFound.classList.add('hidden');
    }

}

// show all data if gather then result 5
const HandleShowAll = () => {
    SearchPhone(true);// again search korbe but abar sob dekhabe 5 ta na,sob dekhabe,so parameter pass korbo

}

// More details button

const MoreDetails = async (id) => {
    console.log("each phone id :", id);
    // now load more data have api link programming hero hunter phone github
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const result = await res.json();
    console.log(result);
    DetailsDisplay(result.data)
    // need open modal mane click kore popup hobe and show korbe
}

// display details

const DetailsDisplay = (PhoneDetailsData) => {
    console.log(PhoneDetailsData);
    show_details_modal.showModal(); // id soho function call .html theke neya daisy ui

    //iamge show
    const showDeatilsImage = document.getElementById('show-deatils_phone_image');
    showDeatilsImage.innerHTML = `
    <img src="${PhoneDetailsData.image}" alt="" />
    `
    // name show
    const showDetailsPhoneName = document.getElementById('show-deatils_phone_name');
    showDetailsPhoneName.innerText = PhoneDetailsData.name;
    // storage show
    const showDetailsPhoneStorage = document.getElementById('show-deatils_phone_storage');
    showDetailsPhoneStorage.innerHTML = `
    <p> <span class="font-bold text-2xl">Storage:</span> ${PhoneDetailsData?.mainFeatures?.storage} </p>
    `
    //displaySize
    const showDetailsPhonedisplaySize = document.getElementById('show-deatils_phone_displaySize');
    showDetailsPhonedisplaySize.innerHTML = `
    <p> <span class="font-bold text-2xl">displaySize:</span> ${PhoneDetailsData?.mainFeatures?.displaySize} </p>
    `
    //releaseDate
    const showDetailsPhoneReleaseDate = document.getElementById('show-deatils_phone_releaseDate');
    showDetailsPhoneReleaseDate.innerHTML = `
    <p> <span class="font-bold text-2xl">ReleaseDate:</span> ${PhoneDetailsData?.releaseDate || 'No release date'} </p>
    `
}
loadPhone();// all time display show all phone 

