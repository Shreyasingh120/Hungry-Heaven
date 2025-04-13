// Function to extract query parameters from the URL
document.addEventListener("DOMContentLoaded", function () {
    function getQueryParam(name) {
        const url = new URL(window.location.href);
        return url.searchParams.get(name);
    }

    // Get the selected category from the URL
    const selectedCategory = getQueryParam("category");

    // Function to create a menu card based on the template
    function createMenuCard(dish) {
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

        const restaurantName = document.createElement("p");
        restaurantName.textContent = dish.restaurant_name;

        const price = document.createElement("p");
        price.classList.add("sub-title");
        price.textContent = "Price: ₹" + dish.price.toFixed(2);

        nameDiv.appendChild(dishName);
        nameDiv.appendChild(restaurantName);
        nameDiv.appendChild(price);

        textDiv.appendChild(nameDiv);

        menuCard.appendChild(imgDiv);
        menuCard.appendChild(textDiv);

        return menuCard;
    }

    // Function to display menu cards 
    function displayMenu(selectedCategory) {
        const menuContainer = document.getElementById("menu-container");

        if (menuContainer) {
            // Fetch the JSON data
            fetch("restaurant.json")
                .then((response) => response.json())
                .then((jsonData) => {
                    for (const restaurantId in jsonData) {
                        const restaurant = jsonData[restaurantId];
                        const menu = restaurant.menu;

                        // Filter menu items by category
                        const filteredMenu = menu.filter((dish) => {
                            return dish.category === selectedCategory;
                        });

                        if (filteredMenu.length > 0) {
                            // Create menu cards for the filtered menu items
                            filteredMenu.forEach((dish) => {
                                const menuCard = createMenuCard(dish);
                                menuContainer.appendChild(menuCard);
                            });
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error fetching JSON data: " + error);
                });
        } else {
            console.error("menuContainer is null. Check your HTML structure.");
        }
    }

    // Call the displayMenu function with the selected category
    displayMenu(selectedCategory);
});

