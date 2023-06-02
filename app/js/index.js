function showAllProduct(products) {
  $("#products").empty();
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

$("#products").delegate(".add-cart", "click", function () {
  let currentItemId = $(this).attr("data-id");
  let productInfo = products.filter((el) => el.id == currentItemId)[0];
  empty = $(".total").text();
  if (Number(empty) >= 0.0) {
    $(".empty").text("");
  }
  if (
    $(".item")
      .toArray()
      .map((el) => el.getAttribute("data-id"))
      .includes(currentItemId)
  ) {
    alert("Already Added");
  } else {
    oldTotal = Number($(".total").text());
    newTotal = oldTotal + Number(productInfo.price);
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
                        <div class="btn-ctl minus">-</div>
                        <div class="number" unitPrice="${productInfo.price}">1</div>
                        <div class="btn-ctl plus">+</div>
                    </div>
                    <div class="btn-ctl remove">
                        <img src="assets/trash.png">
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    `);
  }

  //   cartTotal();
});

$("#cart").delegate(".btn-ctl.plus", "click", function () {
  let q = $(this).siblings(".number").text();
  let p = $(this).siblings(".number").attr("unitPrice");
  let newQ = Number(q) + 1;
  $(this).siblings(".number").text(newQ);
  oldTotal = Number($(".total").text());
  newTotal = oldTotal + Number(p);
  $(".total").text(`${Number(newTotal).toFixed(2)} `);
});

$("#cart").delegate(".btn-ctl.minus", "click", function () {
  let q = $(this).siblings(".number").text();
  let p = $(this).siblings(".number").attr("unitPrice");
  console.log(Number(q));
  if (Number(q) > 1) {
    let newQ = Number(q) - 1;
    $(this).siblings(".number").text(newQ);
    oldTotal = Number($(".total").text());
    newTotal = oldTotal - Number(p);
    $(".total").text(`${Number(newTotal).toFixed(2)} `);
  }
});

$("#cart").delegate(".btn-ctl.remove", "click", function () {
  count = $(this).siblings(".control").children()[1].innerHTML;
  price = $(this).parent().siblings(".price").text();
  oldTotal = Number($(".total").text());
  newTotal = oldTotal - Number(count) * Number(price);
  $(".total").text(`${Number(newTotal).toFixed(2)}`);
  $(this).parentsUntil("#cart").remove();
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
