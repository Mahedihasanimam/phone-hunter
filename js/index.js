const loadPhone = async (searchText=0,isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones,isShowAll);
};
const displayPhones = (phones,isShowAll) => {
    // console.log(phones)
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  const show = document.getElementById("show-btn");
  if (phones.length > 10 && !isShowAll) {
    show.classList.remove("hidden");
  } else {
    show.classList.add("hidden");
  }
  console.log(isShowAll)
  if (!isShowAll) {
    phones = phones.slice(0, 9);
  }
  phones.forEach((phone) => {
    // console.log(phone.slug);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card  bg-base-100 shadow-xl p-6 rounded-lg`;
    phoneCard.innerHTML = `
    <figure class="bg-[#0D6EFD0D] p-5"><img src="${phone.image}" alt="phone" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <h3 class='text-3xl font-bold'>999$</h3>
                <div class="card-actions ">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn bg-[#0D6EFD] hover:bg-[#0D6EFD] text-white">Show details</button>
                </div>
            </div>
    `;
    phoneContainer.appendChild(phoneCard);
    isloading(false);
  });
};
const handleSearch = (isShowAll) => {
  isloading(true);
  const searchField = document.getElementById("searchField");
  let searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
//   searchField.value = "";
};

const isloading = (isloading) => {
  const loading = document.getElementById("loading-spenar");
  if (isloading) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
};


const handleShowDetails=async(id)=>{
    console.log('show clicked',id)
    const res= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data= await res.json()
    const phones=data.data;
    my_modal_5.showModal()
    
    const modalDetails=document.getElementById('modal-details');
    modalDetails.innerHTML=`
    <img class="block mb-8 mx-auto bg-[#0D6EFD0D] p-5" src="${phones.image}" alt="">
    <h3 class="text-3xl font-bold">${phones.name}</h3>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p><br>
    <div class="space-y-2">
    <p><span class="text-md font-bold">storeage : </span>${phones.mainFeatures?.storage}</p>
    <p><span class="text-md font-bold">displaySize : </span>${phones.mainFeatures?.displaySize}</p>
    <p><span class="text-md font-bold">chipSet : </span>${phones.mainFeatures?.chipSet}</p>
    <p><span class="text-md font-bold">memory : </span>${phones.mainFeatures?.memory}</p>
    <p><span class="text-md font-bold">releaseDat : </span>${phones.others?.releaseDate}</p>
    <p><span class="text-md font-bold">brand : </span>${phones.brand}</p>
    <p><span class="text-md font-bold">GPS : </span>${phones.others?.GPS || 'no gps'}</p>

    </div>
    `
    console.log(phones)
}


const handleShowAll = () => {
    handleSearch(true);
};

loadPhone();

