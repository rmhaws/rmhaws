// Dish detail functionality on the main page
function showDishDetails(name, description, price, element) {
    // Hide all other dish details
    document.querySelectorAll('.dish-details').forEach(detail => {
        detail.style.display = 'none'; // Hide previous details
    });

    // Reset all dish containers
    document.querySelectorAll('.dish-container').forEach(container => {
        container.classList.remove('selected');
    });

    // Set the selected class for the clicked dish
    element.classList.add('selected');

    // Create or update the dish details container
    let dishDetails = element.querySelector('.dish-details');
    if (!dishDetails) {
        dishDetails = document.createElement('div');
        dishDetails.classList.add('dish-details');
        element.appendChild(dishDetails);
    }

    // Update the dish details content and display it
    dishDetails.innerHTML = `<h4>${name}</h4><p>${description}</p><p>Price: ${price}</p>`;
    dishDetails.style.display = 'block'; // Show the selected details
}

// Meal plan functionality on the meal plan page
let totalCost = 0;

function addToMealPlan(dish, price) {
    const mealPlanList = document.getElementById('meal-plan-list');
    const listItem = document.createElement('li');
    listItem.innerHTML = `${dish} - $${price.toFixed(2)} <button onclick="removeFromMealPlan(this, ${price})">Remove</button>`;
    mealPlanList.appendChild(listItem);

    totalCost += price;
    document.getElementById('total-cost').textContent = `$${totalCost.toFixed(2)}`;
}

function removeFromMealPlan(element, price) {
    element.parentElement.remove(); // Remove the clicked list item

    totalCost -= price;
    document.getElementById('total-cost').textContent = `$${totalCost.toFixed(2)}`;
}
