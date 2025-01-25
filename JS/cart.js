// Funcion para contador
const minusButton = document.querySelector(".btn-quantity.minus");
const plusButton = document.querySelector(".btn-quantity.plus");
const quantityElement = document.querySelector(".quantity");

//con esto aumento el contado
minusButton.addEventListener("click", () => {
  let quantity = parseInt(quantityElement.textContent);
  if (quantity > 1) {
    quantity -= 1;
    quantityElement.textContent = quantity;
  }
});
//dismunuyo el contador
plusButton.addEventListener("click", () => {
  let quantity = parseInt(quantityElement.textContent);
  quantity += 1;
  quantityElement.textContent = quantity;
});