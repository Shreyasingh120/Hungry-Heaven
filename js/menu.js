document.addEventListener("DOMContentLoaded", function () {
    // Function to extract query parameters from the URL
    function getQueryParam(name) {
        const url = new URL(window.location.href);
        return url.searchParams.get(name);
    }

    // Get the restaurant ID from the URL
    const selectedRestaurantId = getQueryParam("restaurant_id");


    // Function to create a menu card for a dish
    function createMenuCard(dish) {
        // Same function as in the previous example
        const menuCard = document.createElement("div");
        menuCard.classList.add("sd-card");

        const imgDiv = document.createElement("div");
        imgDiv.classList.add("img");
        const img = document.createElement("img");
        img.src = dish.image_source;
        img.alt = dish.dish_name;
        imgDiv.appendChild(img);

        const textDiv = document.createElement("div");
        textDiv.classList.add("sd-text");

        const nameDiv = document.createElement("div");
        nameDiv.classList.add("sd-name");
        const dishName = document.createElement("h4");
        dishName.textContent = dish.dish_name;
        const price = document.createElement("p");
        price.classList.add("Price");
        price.textContent = "₹" + dish.price;

        nameDiv.appendChild(dishName);
        nameDiv.appendChild(price);

        textDiv.appendChild(nameDiv);

        menuCard.appendChild(imgDiv);
        menuCard.appendChild(textDiv);

        return menuCard;
    }

    // Function to display menu cards for the selected restaurant
    function displayMenu(selectedRestaurantId, jsonData) {
        const menuContainer = document.getElementById("menu-container");

        if (menuContainer) {
            const selectedRestaurant = jsonData[selectedRestaurantId];

            if (selectedRestaurant) {
                document.title = selectedRestaurant.restaurant_name; // Set the page title
                const menu = selectedRestaurant.menu;

                menu.forEach((dish) => {
                    const menuCard = createMenuCard(dish);
                    menuContainer.appendChild(menuCard);
                });
            } else {
                console.error(`Restaurant with ID ${selectedRestaurantId} not found.`);
            }
        } else {
            console.error("menuContainer is null. Check your HTML structure.");
        }
    }

    // Fetch the JSON data from "restaurant.json"
    fetch("restaurant.json")
        .then((response) => response.json())
        .then((jsonData) => {
            // Call the displayMenu function with the selectedRestaurantId (from the URL)
            displayMenu(selectedRestaurantId, jsonData);
        })
        .catch((error) => {
            console.error("Error fetching JSON data: " + error);
        });
});
