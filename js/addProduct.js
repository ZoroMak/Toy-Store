var product = {
    "66666": {
        "cost": 2799,
    }
}

var basket = {};

$('document').ready(function(){
    checkGoods();
    loadGoods();
});

function loadGoods(){
    var out = '';

    var key = '66666';

    out += '<p class="Price">'+toCurrency(product[key]['cost'])+'</p>';
    out += '<button data-art="'+key+'" class="buy" onclick="changeButton(this)"><img src="img/basket.png" width="30" height="30"><span>Добавить в корзину</span></button>';

    $('.Cost').html(out);
    $('button.buy').click();
    $('button.buy').on('click', addToCart);
}


function changeButton(button) {
    var articul = $(button).attr('data-art')
    if (basket[articul] == undefined){
        button.style.background =  'linear-gradient(to right, #800080, #ffc0cb)';
        button.innerHTML = '<img src="img/basket.png" width="30" height="30"><span>Добавить в корзину</span>';
    }
    else{
        button.style.background = 'grey';
        button.innerHTML = '<span>Товар добавлен в корзину</span>';
    }
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
