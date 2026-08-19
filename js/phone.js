console.log("hunting")

const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const result = await res.json();
    displayPhone(result.data);
}

// have to call  loadPhone() from html or js function,so we call from js
loadPhone();

const displayPhone = phones => {
    // step-1 read where we want to see phone card
    const phoneContainer = document.getElementById('phone-container');
    // console.log(phones);
    phones.forEach(element => {
         console.log(element);//see all phone object
        //step -2 create a div that will show in display
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-orange-200 w-96 shadow-sm p-10 ` // class add 

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
