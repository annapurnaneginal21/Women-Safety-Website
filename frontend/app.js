// 🌍 Store user location
let userLocation = "";

// 📍 Get Location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      userLocation = `https://www.google.com/maps?q=${lat},${lon}`;
      console.log("Location:", userLocation);
    });
  } else {
    alert("Geolocation not supported");
  }
}


// ✅ SAVE CONTACT
function saveContact() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  // 🔴 Empty validation
  if (!name || !phone) {
    alert("Please enter both Name and Phone ❗");
    return;
  }

  // 🔴 Duplicate check
  fetch("http://localhost:5000/contacts")
    .then(res => res.json())
    .then(data => {
      const exists = data.find(c => c.phone === phone);

      if (exists) {
        alert("Contact already exists ❌");
        return;
      }

      // ✅ Save contact
      return fetch("http://localhost:5000/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, phone })
      });
    })
    .then(() => {
      alert("✅ Contact added successfully");

      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";

      document.getElementById("name").focus();

      loadContacts();
    })
    .catch(err => console.log(err));
}


// 🔥 LOAD CONTACTS
function loadContacts() {
  fetch("http://localhost:5000/contacts")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("contactList");
      list.innerHTML = "";

      data.forEach(c => {
        const li = document.createElement("li");

        li.className = "list-group-item d-flex justify-content-between align-items-center mb-2 rounded";

        li.innerHTML = `
          <div>
            <strong>${c.name}</strong><br>
            <small>${c.phone}</small>
          </div>
          <button class="btn btn-sm btn-danger" onclick="deleteContact('${c._id}')">✖</button>
        `;

        list.appendChild(li);
      });
    })
    .catch(err => console.log(err));
}


// 🔥 DELETE CONTACT
function deleteContact(id) {
  fetch(`http://localhost:5000/contacts/${id}`, {
    method: "DELETE"
  })
    .then(() => {
      alert("Contact Deleted ❌");
      loadContacts();
    })
    .catch(err => console.log(err));
}


// 🚨 SOS (UPDATED with location)

function sendSOS() {
  if (!navigator.geolocation) {
    alert("Your browser does not support location.");
    return;
  }

  if (!confirm("Do you want to send an SOS alert with your current location?")) {
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const location = `https://www.google.com/maps?q=${lat},${lon}`;

      try {
        const response = await fetch("http://localhost:5000/sos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ location })
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to send SOS.");
        }

        alert("SOS alert processed successfully!");
      } catch (error) {
        console.error("SOS error:", error);
        alert("SOS failed. Check that the backend and email settings are working.");
      }
    },
    (error) => {
      console.error("Geolocation error:", error);

      if (error.code === 1) {
        alert("Location permission denied. Allow location access in your browser.");
      } else if (error.code === 2) {
        alert("Your location is unavailable. Please try again.");
      } else {
        alert("Location request timed out. Please try again.");
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    }
  );
}



// 🚪 LOGOUT
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}


// 👉 PAGE LOAD
window.onload = () => {
  loadContacts();
  getLocation();

  // 👇 Welcome User
  const user = localStorage.getItem("currentUser");
  if (user) {
    const welcome = document.getElementById("welcomeUser");
    if (welcome) {
      welcome.innerText = "Hello " + user + " 👋";
    }
  }
};