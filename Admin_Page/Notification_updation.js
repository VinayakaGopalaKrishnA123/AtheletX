function saveNotification() {
    const heading = document.getElementById('heading').value.trim();
    const message = document.getElementById('message').value.trim();
    const link = document.getElementById('link').value.trim();

    if (!heading || !message) {
        alert("Heading and content are required.");
        return;
    }

    const newNotification = {
        heading: heading,
        content: message,
        link: link || ""
    };

    const existing = JSON.parse(localStorage.getItem('notification')) || [];
    existing.push(newNotification);

    localStorage.setItem('notification', JSON.stringify(existing));
    alert("Notification saved successfully!");

    // Optionally, clear inputs after saving
    document.getElementById('heading').value = '';
    document.getElementById('message').value = '';
    document.getElementById('link').value = '';
}
