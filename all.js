// week 6 LV2 - AXIOS 取得遠端資料
let data = [];
// 增加可讀性，把url獨立出來
const url = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json';

// 顯示搜尋筆數
const searchIntro = document.querySelector('.search-intro');

// LV 1
function renderTickets(ticket) {
  const ticketCardArea = document.querySelector('.ticketCard-area');
  let ticketList = '';
  ticket.forEach(function (ticket) {
    ticketList += `<li class="col-md-4 align-items-stretch d-flex flex-column mb-5">
        <div class="position-relative img-h">
          <a href="#">
            <img src="${ticket.imgUrl}" alt="" class="rounded-top w-100 h-100 object-fit-cover">
          </a>
          <div class="position-absolute top-0 start-0 text-white bg-pri-300 fs-5 px-3 py-2 rounded-end translate-middle-y">${ticket.area}</div>
          <div class="text-white bg-pri-400 position-absolute px-3 py-1 rounded-end translate-middle-y">${ticket.rate}</div>
        </div>
        <div class="px-6 py-4 bg-white d-flex justify-content-between flex-column h-100 shadow-sm rounded-bottom">
          <div>
            <h3 class="mb-3">
              <a href="#" class="fs-4 bdb-3-pri-400 fc-pri-400 text-decoration-none">${ticket.name}</a>
            </h3>
            <p class="fs-6 fc-neu-600">
              ${ticket.description}
            </p>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <p class="fc-pri-400 fs-6 m-0">
              <span><i class=""></i></span>
              剩下最後 <span id="ticketCard-num"> ${ticket.group} </span> 組
            </p>
            <p class="fc-pri-400 fs-6 m-0 d-flex align-items-center">
              TWD <span id="ticketCard-price" class="ps-1 fs-2 d-inline-block">$${ticket.price}</span>
            </p>
          </div>
        </div>
      </li>`;
  });

  ticketCardArea.innerHTML = ticketList;
  searchIntro.textContent = `本次搜尋共 ${ticket.length} 筆資料`;
};

renderTickets(data);

// LV 3
// 取得選單的值
const searchSelect = document.querySelector('.search-select');
searchSelect.addEventListener('change', function () {
  if (searchSelect.value === '') {
    renderTickets(data);
  } else {
    // 把資料篩選
    let filterData = [];
    data.forEach(function (ticket) {
      if (searchSelect.value === ticket.area) {
        filterData.push(ticket);
      }
    })
    // 渲染畫面
    renderTickets(filterData);
  }
});

// 新增旅遊套票
const ticketName = document.querySelector('#ticketName');
const ticketImgUrl = document.querySelector('#ticketImgUrl');
const ticketArea = document.querySelector('#ticketArea');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketNum = document.querySelector('#ticketNum');
const ticketRate = document.querySelector('#ticketRate');
const ticketDescription = document.querySelector('#ticketDescription');
const addTicketBtn = document.querySelector('.add-ticket-btn');
const addTicketForm = document.querySelector('.add-ticket-form');

addTicketBtn.addEventListener('click', function () {
  const obj = {
    id: data.length,
    name: ticketName.value.trim(),
    imgUrl: ticketImgUrl.value.trim(),
    area: ticketArea.value,
    description: ticketDescription.value.trim(),
    group: Number(ticketNum.value),
    price: Number(ticketPrice.value),
    rate: Number(ticketRate.value)
  }
  data.push(obj);
  searchSelect.value = '';
  addTicketForm.reset();
  renderTickets(data);
});

// week 6 LV 2 - AXIOS 取得遠端資料
// function getData() {
//   axios.get(url).then(function (response) {
//     data = response.data['data'];
//     renderTickets(data);
//   }).catch(function(){
//     console.log('資料有誤，無法取得資料');
//   });
// };

// 助教補充： async/await 寫法
async function getData() {
  try {
    const response = await axios.get(url);
    data = response.data['data'];
    renderTickets(data);
  } catch (error) {
    console.log('資料有誤，無法取得資料');
  }
};
getData();