console.log("hunting")

const loadPhone=async () => {
    const res=await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const result= await res.json();
    console.log(result.data);
}

// have to call  loadPhone() from html or js function,so we call from js
loadPhone();
