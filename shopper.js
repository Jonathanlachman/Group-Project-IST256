// Contributing Member: Ishaan Luitel — JavaScript & JSON integration

(function () {
    const form = document.getElementById('shopperForm');
    const jsonCard = document.getElementById('jsonCard');
    const jsonContent = document.getElementById('jsonContent');

    // Basic Bootstrap-style validation + JSON render
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // HTML5 constraint validation
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        // Get values (IDs must match HTML)
        const shopper = {
            email: document.getElementById('email').value.trim(),
            name: document.getElementById('name').value.trim(),
            "contact-phone": document.getElementById('contact-phone').value.trim() || null,
            age: Number(document.getElementById('age').value),
            address: document.getElementById('address').value.trim()
        };

        // Show pretty JSON
        jsonContent.textContent = JSON.stringify(shopper, null, 2);
        jsonCard.classList.remove('d-none');

        // Optional: clear the form for "new/update" flow
        form.reset();
        form.classList.remove('was-validated');
    });
})();
