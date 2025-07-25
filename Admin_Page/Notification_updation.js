function saveNotification() {
        const heading = document.getElementById('heading').value;
        const message = document.getElementById('message').value;
        const pdfFile = document.getElementById('pdf').files[0];
        const link = document.getElementById('link').value;

        // Debug Output (Replace with backend saving logic)
        console.log("Heading:", heading);
        console.log("Message:", message);
        console.log("PDF File:", pdfFile ? pdfFile.name : "No file selected");
        console.log("Link:", link ? link : "No link provided");

        alert("Notification saved (You can connect this to backend)");
    }