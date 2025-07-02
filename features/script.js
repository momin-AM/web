 // ✅ Debugging: Check if script runs
    console.log("Script Loaded!");

    // 🛠 Import Firebase SDK
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
    import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

    // 🔥 Firebase Configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDqJE28QQCt0KovRewpFWxgXd_7WIqmFEM",
        authDomain: "momin-chat-33997.firebaseapp.com",
        projectId: "momin-chat-33997",
        storageBucket: "momin-chat-33997.appspot.com",
        appId: "1:583120424404:web:79a60a30d07afadf5c9a41"
    };

    console.log("Firebase Config:", firebaseConfig);

    // 🚀 Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // 🕒 Function to Get Current Date and Time (Now Includes Seconds)
    function getCurrentDateTime() {
        let now = new Date();
        let dateParts = now.toISOString().split("T")[0].split("-");
        let formattedDate = `${dateParts[1]}-${dateParts[2]}`; // MM-DD format

        // Get time WITH seconds
        let options = { hour: "numeric", minute: "numeric", second: "numeric", hour12: true };
        let formattedTime = now.toLocaleTimeString(undefined, options); // HH:MM:SS AM/PM

        return { date: formattedDate, time: formattedTime };
    }

    // ✍️ Function to Save Messages to Firestore
    window.showMessage = async function () {
        let msg = document.getElementById("msgInput").value;
        let { date, time } = getCurrentDateTime(); // Get date & time separately

        if (msg.trim() === "") {
            alert("Please enter a message!");
            return;
        }

        try {
            await addDoc(collection(db, "messages"), {
                text: msg,
                date: date,  // ✅ Adding a separate date field
                time: time   // ✅ Storing time **with seconds** separately
            });

            console.log("✅ Message saved:", date, time, msg);
            document.getElementById("msgInput").value = ""; // Clear input box
        } catch (error) {
            console.error("❌ Error saving message:", error);
        }
    };