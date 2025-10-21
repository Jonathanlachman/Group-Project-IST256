// Member: Ishaan Luitel - JavaScript, JSON, and jQuery Integration
// IDs used: productId, productDesc, productCategory, productUOM,
// productPrice, productWeight, searchProductId, searchBtn, saveBtn,
// jsonCard, jsonContent, productForm, updateBtn


// In-memory product list
var productList = [];

// Show JSON + reveal card and Update button
function showJSON(obj) {
    $("#jsonContent").text(JSON.stringify(obj, null, 4));
    $("#jsonCard").show();
    $("#updateBtn").show();
}

// Basic HTML5 validation
function validateForm() {
    const form = document.getElementById("productForm");
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }
    return true;
}

// SAVE (create or update)
$("#saveBtn").on("click", function (e) {
    e.preventDefault();
    if (!validateForm()) return;

    const id = $("#productId").val().trim();
    const desc = $("#productDesc").val().trim();
    const category = $("#productCategory").val();
    const uom = $("#productUOM").val();
    const price = $("#productPrice").val().trim();
    const weight = $("#productWeight").val().trim();

    if (isNaN(price) || parseFloat(price) <= 0) {
        alert("Please enter a valid price!");
        return;
    }

    const product = {
        productId: id,
        productDesc: desc,
        productCategory: category,
        productUOM: uom,
        productPrice: parseFloat(price),
        productWeight: weight === "" ? null : parseFloat(weight)
    };

    const existing = productList.find(p => p.productId === id);
    if (existing) {
        Object.assign(existing, product);
        alert("Product updated successfully!");
    } else {
        productList.push(product);
        alert("Product added successfully!");
    }

    // Always show JSON & Update after saving
    showJSON(productList);

    // Scroll to JSON section
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
});

// SEARCH (by ID)
$("#searchBtn").on("click", function () {
    const searchId = $("#searchProductId").val().trim();
    if (!searchId) { alert("Please enter a Product ID to search."); return; }

    const found = productList.find(p => p.productId === searchId);
    if (!found) { alert("No product found with that ID!"); return; }

    showJSON(found);

    // Prefill the form for editing
    $("#productId").val(found.productId);
    $("#productDesc").val(found.productDesc);
    $("#productCategory").val(found.productCategory);
    $("#productUOM").val(found.productUOM);
    $("#productPrice").val(found.productPrice);
    $("#productWeight").val(found.productWeight ?? "");
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// UPDATE = trigger Save
$("#updateBtn").on("click", function () {
    $("#saveBtn").trigger("click");
});
