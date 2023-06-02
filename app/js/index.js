function showAllProduct(products) {
  $("#products").empty();
  total = localStorage.getItem("total");
  $(".total").text(`${Number(total).toFixed(2)} `);
  for (product of products) {
    $("#products").append(`
        <div class="card-child">
            <div class="image-card" style="background-color: ${product.color}">
                <img class="img-card"
                    src="${product.image}"
                    >
            </div>
            <div class="title">
                ${product.name}
            </div>
            <p class="description">
                ${product.description}
            </p>
            <div class="detail">
                <p class="price">$${product.price}</p>
                <button class="add-cart" data-id="${product.id}">ADD TO CARD</button>
            </div>
        </div>
        `);
  }
}

function showCart(items) {
  if (items) {
    for (item of items) {
      $("#cart").append(`
      <div class="item" data-id="${item.id}">
          <div class="left">
              <div class="image-cart" style="background-color: ${item.color}">
                  <img src="${item.image}" alt="">
              </div>
          </div>
          <div class="right">
              <p class="name">${item.name}</p>
              <p class="price">${item.price}</p>
              <div class="quantity">
                  <div class="control">
                      <div class="btn-ctl minus" data-id="${item.id}">-</div>
                      <div class="number" unitPrice="${item.price}">${item.count}</div>
                      <div class="btn-ctl plus" data-id="${item.id}">+</div>
                  </div>
                  <div class="btn-ctl remove" data-id="${item.id}">
                      <img src="assets/trash.png">
                  </div>
              </div>
          </div>
          <div>
          </div>
      </div>
      `);
    }
  }
}

$("#products").delegate(".add-cart", "click", function () {
  items = JSON.parse(localStorage.getItem("cart"));
  if (!items) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
  let currentItemId = $(this).attr("data-id");
  let productInfo = products.filter((el) => el.id == currentItemId)[0];
  empty = $(".total").text();
  items = JSON.parse(localStorage.getItem("cart"));
  flag = 0;
  for (item of items) {
    if (Number(currentItemId) == item.id) {
      flag = 1;
      break;
    }
  }
  if (Number(empty) >= 0.0) {
    $(".empty").text("");
  }
  if (flag) {
    alert("Already Added");
  } else {
    cart = JSON.parse(localStorage.getItem("cart"));
    productInfo["count"] = 1;
    cart.push(productInfo);
    localStorage.setItem("cart", JSON.stringify(cart));

    oldTotal = Number($(".total").text());
    newTotal = oldTotal + Number(productInfo.price);
    localStorage.setItem("total", JSON.stringify(newTotal));
    $(".total").text(`${Number(newTotal).toFixed(2)}`);
    $("#cart").append(`
        <div class="item" data-id="${productInfo.id}">
            <div class="left">
                <div class="image-cart" style="background-color: ${productInfo.color}">
                    <img src="${productInfo.image}" alt="">
                </div>
            </div>
            <div class="right">
                <p class="name">${productInfo.name}</p>
                <p class="price">${productInfo.price}</p>
                <div class="quantity">
                    <div class="control">
                        <div class="btn-ctl minus" data-id="${productInfo.id}">-</div>
                        <div class="number" unitPrice="${productInfo.price}">1</div>
                        <div class="btn-ctl plus" data-id="${productInfo.id}">+</div>
                    </div>
                    <div class="btn-ctl remove" data-id="${productInfo.id}">
                        <img src="assets/trash.png">
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    `);
  }
});

$("#cart").delegate(".btn-ctl.plus", "click", function () {
  let currentItemId = $(this).attr("data-id");
  let q = $(this).siblings(".number").text();
  let p = $(this).siblings(".number").attr("unitPrice");
  let newQ = Number(q) + 1;

  cart = JSON.parse(localStorage.getItem("cart"));
  for (item of cart) {
    if (currentItemId == item.id) {
      item.count += 1;
      break;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  $(this).siblings(".number").text(newQ);
  oldTotal = Number($(".total").text());
  newTotal = oldTotal + Number(p);
  localStorage.setItem("total", JSON.stringify(newTotal));
  $(".total").text(`${Number(newTotal).toFixed(2)} `);
});

$("#cart").delegate(".btn-ctl.minus", "click", function () {
  let currentItemId = $(this).attr("data-id");
  let p = $(this).siblings(".number").attr("unitPrice");
  cart = JSON.parse(localStorage.getItem("cart"));
  for (item of cart) {
    if (currentItemId == item.id && item.count > 1) {
      item.count -= 1;
      $(this).siblings(".number").text(item.count);
      break;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  oldTotal = Number($(".total").text());
  newTotal = oldTotal - Number(p);
  localStorage.setItem("total", JSON.stringify(newTotal));
  $(".total").text(`${Number(newTotal).toFixed(2)} `);
});

$("#cart").delegate(".btn-ctl.remove", "click", function () {
  let currentItemId = $(this).attr("data-id");
  count = $(this).siblings(".control").children()[1].innerHTML;
  price = $(this).parent().siblings(".price").text();
  oldTotal = Number($(".total").text());
  newTotal = oldTotal - Number(count) * Number(price);
  localStorage.setItem("total", JSON.stringify(newTotal));
  $(".total").text(`${Number(newTotal).toFixed(2)}`);
  cart = JSON.parse(localStorage.getItem("cart"));
  $(this).parentsUntil("#cart").remove();
  for (let i = 0; i < cart.length; i++) {
    console.log(currentItemId);
    console.log(cart[i].id);
    console.log(currentItemId == cart[i].id);
    if (currentItemId == cart[i].id) {
      cart.splice(i, 1);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  if (!cart.length) {
    localStorage.removeItem("cart");
  }
  checkEmpty();
});

function checkEmpty() {
  empty = $(".total").text();
  if (Number(empty) == 0.0) {
    $(".empty").text("Your cart is empty.");
  }
  return Number(empty) == 0.0;
}

$.get("data/shoes.json", function (data) {
  products = data.shoes;
  showAllProduct(products);
  checkEmpty();
});
items = JSON.parse(localStorage.getItem("cart"));

if (!items) {
  localStorage.setItem("cart", JSON.stringify([]));
}
showCart(items);
