function changeButtonColor(button) {
    var articul = $(button).attr('data-art')
    if (basket[articul] == undefined){
        button.style.background =  'linear-gradient(to right, #800080, #ffc0cb)';
        button.innerHTML = '<img src="img/basket.png"></img>';
    }
    else{
        button.style.background = 'grey';
        button.innerHTML = '<img src="img/checkmark.png"></img>';
    }
  }

function changeButtonColor1(button) {
    var articul = $(button).attr('data-art')
    if (basket[articul] == undefined){
        button.style.background =  'linear-gradient(to right, #800080, #ffc0cb)';
        button.innerHTML = 'Корзина';
    }
    else{
        button.style.background = 'grey';
        button.innerHTML = 'Добавлено';
    }
  }

$('document').ready(function(){
    checkLocalStirage();
    checkGoods();
    loadGoods();
});

//Список товаров
var cart = {
    "11111": {
        "name": "Детский паровозик",
        "cost": 1499,
        "image": "img/train.jpg",
        "link": "product_page.html",
        "data-art": "11111"
    },
    "22222": {
        "name": "Cортер забавные фигурки",
        "cost": 2999,
        "image": "img/sorter.jpg",
        "link": "product_page.html",
        "data-art": "22222"
    },
    "33333": {
        "name": "Кран из дерева",
        "cost": 799,
        "image": "img/crane.jpg",
        "link": "product_page.html",
        "data-art": "33333"
    },
    "44444": {
        "name": "Квадроцикл Wincars",
        "cost": 999,
        "image": "img/wincars.jpg",
        "link": "product_page.html",
        "data-art": "44444"
    },
    "55555": {
        "name": "Мстители Война бесконечности ...",
        "cost": 1999,
        "image": "img/lego.jpg",
        "link": "product_page.html",
        "data-art": "55555"
    },
    "66666": {
        "name": "Настольная игра Шакал: Остров сокровищ",
        "cost": 2799,
        "image": "img/shakal.jpg",
        "link": "product_page.html",
        "data-art": "66666"
    }
}

var sortedCart;

function checkLocalStirage(){
    if (localStorage.getItem('sortedCart') != null)
        sortedCart = JSON.parse(localStorage.getItem('sortedCart'))
    else
        sortedCart = Object.assign({}, cart);
}

var special = {
    "66666": {
        "name": "Настольная игра Шакал: Остров сокровищ",
        "cost": 2799,
        "image": "img/shakal.jpg",
        "link": "product_page.html",
        "data-art": "66666"
    }
}

var basket = {};//Корзина

//Загрузка товаров на страницу
function loadGoods(){
    var out = '';

    var key = '66666';

    for (let i = 0; i < 6; i++){
        out += '<li>';
        out += '<a href="'+special[key].link+'">';
        out += '<img src="'+special[key].image+'" alt="Игрушки" width="200" height="200">';
        out += '</a>';
        out += '<div id="Price">';
        out += '<p>'+special[key]['name']+'</p>';
        out += '<p><b>'+toCurrency(special[key]['cost'])+'</b></p>'
        out += '<button data-art="'+key+'" class="buy" onclick="changeButtonColor1(this)">Корзина</button>';
        out += '</div>';
        out += '</li>';
    }

    $('.species').html(out);
    out = '';

    for (var key in sortedCart){
        out += '<li class="pic-container" draggable="true">';
        out += '<a href="'+sortedCart[key].link+'">';
        out += '<img src="'+sortedCart[key].image+'" alt="Игрушки" width="200" height="200">';
        out += '</a>';
        out += '<div class="Inform">';
        out += '<p>'+sortedCart[key]['name']+'</p>';
        out += '<div class="toy">';
        out += '<p><b>'+toCurrency(sortedCart[key]['cost'])+'</b></p>'
        out += '<button data-art="'+sortedCart[key]['data-art']+'" class="buy" onclick="changeButtonColor(this)"><img src="img/basket.png"></button>';
        out += '</div>';
        out += '</div>';
        out += '</li>';
    }

    $('#product_list').html(out);
    $('button.buy').click();
    $('button.buy').on('click', addToCart);
}

function toCurrency(num) {
    const format = new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(num);
    return format;
  }

//Добавление в корзину с помощью localStorage
function addToCart(){
    var articul = $(this).attr('data-art')

    if (articul == undefined)
        return;

    if (basket[articul] == undefined){
        basket[articul] = 1;
    }
    else{
        delete basket[articul];
    }

    localStorage.setItem('basket', JSON.stringify(basket));
    loadGoods();
}

function checkGoods(){
    if (localStorage.getItem('basket') != null)
        basket = JSON.parse(localStorage.getItem('basket'))
  }

var dropdowList = document.getElementById("typeSorting");

function onChange() {
  var value = dropdowList.value;

  if (value === "increase"){
    sortCartByCost(true);
  }
  else if(value === "decrease"){
    sortCartByCost(false);
  }
  else{
    sortedCart = Object.assign({}, cart);
  }

  localStorage.setItem('sortedCart', JSON.stringify(sortedCart));
  loadGoods();
}

function sortCartByCost(flag) {
    var keyArray = Object.keys(sortedCart);
    let Cost;
    for (let i = 0; i < keyArray.length - 1; i++){
        Cost = keyArray[i];
        for (let j = i + 1; j < keyArray.length; j++){
            if (flag){
                if (sortedCart[Cost].cost > sortedCart[keyArray[j]].cost)
                    Cost = keyArray[j];
            }else{
                if (sortedCart[Cost].cost < sortedCart[keyArray[j]].cost)
                    Cost = keyArray[j];
            }
        }
        
        if (Cost != keyArray[i])
            swap(sortedCart, Cost, keyArray[i]);
    }
  }

function swap(sortedCart, key1, key2){
    [sortedCart[key1], sortedCart[key2]] = [sortedCart[key2], sortedCart[key1]]
}

dropdowList.onchange = onChange;
onChange();

/*Драгон дроп*/

var total = 0;
var elem;
  
  const dragAndDrop = () => {

    $(document).ready(function(){
        const items = document.querySelectorAll('.pic-container');

        items.forEach((item) =>{
            item.addEventListener("dragstart", dragStart);
        })

        cell = $(".basket")

        cell.on("dragover", dragOver)
        cell.on("drop", dragDrop)
    });

  };
  
  function dragStart(){
    elem = this
  }

  function dragOver(evt){
    evt.preventDefault();
  }

  function dragDrop(){
    var childElement = $(elem).find(".buy");
    addToCartDragonDrop(childElement);
  }

  function addToCartDragonDrop(product){
    var articul = $(product).attr('data-art')

    if (articul == undefined)
        return;

    if (basket[articul] == undefined){
        basket[articul] = 1;
    }

    localStorage.setItem('basket', JSON.stringify(basket));
    loadGoods();
}

  dragAndDrop();