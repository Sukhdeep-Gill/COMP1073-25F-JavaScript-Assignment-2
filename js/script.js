// Attribution:This JavaScript code for Smoothie and PremiumSmoothie objects,
//price calculation was inspired by online tutorials and documentation, including MDN Web Docs ,W3Schools.

const output = document.getElementById('outputArea');
const smoothieReady = document.getElementById('smoothieReadyMessage');

var ingredientCheckboxes = document.querySelectorAll("input[name='ingredient']");


// Smoothie constructor
function Smoothie(customer, size, base, ingredients, extras, qty) {
    // Properties of a regular smoothie
    this.customer = customer;   // Customer name
    this.size = size; // Smoothie size (small, medium, large)
    this.base = base;// Base type
    this.ingredients = ingredients;// Array of selected ingredients
    this.extras = extras;// Array of selected extras 
    this.qty = qty; // Quantity ordered
}

//  Price calculation
Smoothie.prototype.calculatePrice = function () {
    // Base prices for each size
    var sizePrice = { small: 4, medium: 6, large: 8 };
    var basePrice = 1;
    var ingredientPrice = 0.5;
    var extraPrice = 0.75;
// Total price = (size + base + ingredients + extras) * quantity
    return (
        (sizePrice[this.size] || 0) +
        basePrice +
        (this.ingredients.length * ingredientPrice) +// Multiply ingredient count by unit price
        (this.extras.length * extraPrice) // Multiply extras count by unit price
    ) * this.qty;
};

Smoothie.prototype.describe = function () {
     // Creates a box to display the smoothie bill
    var box = document.createElement("div");
    box.style.border = "1px solid #ddd";
    box.style.padding = "10px";
    box.style.margin = "10px 0";
    box.style.background = "#fff";

    
// Attribution:
// Ingredient images are a "Take It Further" enhancement inspired by MDN/W3Schools examples.

    var ingredientImages = {
        Pineapple: "images/pineapple.jpg",
        Raspberry: "images/raspberry.jpeg",
        Kiwi: "images/kiwi.jpg",
        Coconut: "images/coconut.jpg",
        Acai: "images/acai.jpeg",
        Papaya: "images/papaya.jpg",
        Matcha: "images/matcha.jpg",
        "Almond Butter": "images/almond.jpg"
    };

    var ingHTML = "";
    for (var i = 0; i < this.ingredients.length; i++) {
        var ing = this.ingredients[i];
        if (ingredientImages[ing]) {
            ingHTML += "<img src='" + ingredientImages[ing] +
                       "' alt='" + ing + "' title='" + ing + 
                       "' style='width:40px;margin-right:5px'>";
        } else {
            ingHTML += ing + " ";
        }
    }
    // Add smoothie order details inside the box
    box.innerHTML = ""
        + "<h3>Bill for " + this.customer + "</h3>"
        + "<p>Size: " + this.size + "</p>"
        + "<p>Base: " + this.base + "</p>"
        + "<p>Ingredients: " + (ingHTML || "None") + "</p>"
        + "<p>Extras: " + (this.extras.join(", ") || "None") + "</p>"
        + "<p>Quantity: " + this.qty + "</p>"
        + "<strong>Total Price: $" + this.calculatePrice().toFixed(2) + "</strong>";

        // Add the box to the output area in the HTML

    output.appendChild(box);
};


//Premium Smoothie
function PremiumSmoothie(customer, size, base, ingredients, extras, qty, sweetness) {
    Smoothie.call(this, customer, size, base, ingredients, extras, qty);// Call parent constructor
    this.sweetness = sweetness;
}

// Set up inheritance
PremiumSmoothie.prototype = Object.create(Smoothie.prototype);
PremiumSmoothie.prototype.constructor = PremiumSmoothie;

PremiumSmoothie.prototype.describe = function () {
    Smoothie.prototype.describe.call(this);
    var lastBox = output.lastChild;
    var sw = document.createElement("p");
    sw.innerHTML = "Sweetness Level: " + this.sweetness; // Display sweetness
    lastBox.appendChild(sw);
};

//Form Submission
document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();
// Collect user input from form
    var customer = document.getElementById('customerName').value.trim();
    var size = document.querySelector("input[name='size']:checked").value;
    var base = document.querySelector("input[name='base']:checked").value;
    var ingredients = Array.from(document.querySelectorAll("input[name='ingredient']:checked"))
                           .map(function (i) { return i.value; });
    var extras = Array.from(document.querySelectorAll("input[name='extra']:checked"))
                       .map(function (i) { return i.value; });
    var qty = parseInt(document.getElementById('qty').value, 10);
    var sweetness = document.getElementById('sweetness').value;

  // Creates a new PremiumSmoothie instance
    var smoothie = new PremiumSmoothie(customer, size, base, ingredients, extras, qty, sweetness);
// Display the smoothie order
    smoothie.describe();
// Show "Smoothie Ready!" message 
    smoothieReady.style.display = "block";
    setTimeout(function () {
        smoothieReady.style.display = "none";
    }, 2000);

    e.target.reset();
    ingredientCheckboxes.forEach(function (b) { b.disabled = false; });
});
