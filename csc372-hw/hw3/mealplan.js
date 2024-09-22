let totalPrice = 0;

function addToMealPlan(dish, price) {
    const mealPlan = document.getElementById('selected-dishes');
    const listItem = document.createElement('li');
    listItem.textContent = `${dish} - $${price.toFixed(2)}`;
    listItem.onclick = function() {
        mealPlan.removeChild(listItem);
        totalPrice -= price;
        updateTotal();
    };
    mealPlan.appendChild(listItem);
    totalPrice += price;
    updateTotal();
}

function updateTotal() {
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}
