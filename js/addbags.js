function toCurrency(num) {
  const format = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(num);
  return format;
}

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
}/*JSON.parse(localStorage.getItem('sortedCart'));*/

var basket = {};//Корзина

$('document').ready(function(){
  checkCart();
  showGoods();
});

//Загрузка товаров на страницу
function showGoods(){
  var out = '';
  var total = 0;
  for (var key in basket){
      out += '<li>';
      out += '<a href="'+cart[key].link+'">';
      out += '<img class="Photo" src="'+cart[key].image+'">';
      out += '</a>';
      out += '<div class="internal">';
      out += '<p>'+cart[key]['name']+'</p>';
      out += '<div class="remove">';
      out += '<p class="Cost"><b>'+toCurrency(basket[key]*cart[key]['cost'])+'</b></p>'
      out += '<div class="add">';
      out += '<button class="minus" data-art='+key+'>–</button>'
      out += '<p class="quantity">'+basket[key]+'</p>'
      out += '<button class="plus" data-art='+key+'>+</button>'
      out += '</div>';
      out +=  '<button class="delete" data-art='+key+'><img src="img/rubbishbin.png"></button>';
      out += '</div>';
      out += '</div>';
      out += '</li>';
      total += basket[key]*cart[key]['cost'];
  }

  /*localStorage.setItem('basket', JSON.stringify(basket));*/
  $('.price').html(toCurrency(total))
  $('.List').html(out);
  $('.plus').on('click', plusGoods);
  $('.minus').on('click', minusGoods);
  $('.delete').on('click', deleteGoods);
}

function plusGoods(){
  var articul = $(this).attr('data-art');
  basket[articul]++;
  localStorage.setItem('basket', JSON.stringify(basket));
  showGoods();
}

function minusGoods(){
  var articul = $(this).attr('data-art');
  basket[articul]--;
  if (basket[articul] == 0){
    delete basket[articul];
  }
  localStorage.setItem('basket', JSON.stringify(basket));
  showGoods();
}

function deleteGoods(){
  var articul = $(this).attr('data-art');
  delete basket[articul];
  localStorage.setItem('basket', JSON.stringify(basket));
  showGoods();
}

function checkCart(){
  if (localStorage.getItem('basket') != null)
      basket = JSON.parse(localStorage.getItem('basket'))
}