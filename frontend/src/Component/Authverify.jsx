const Authverify = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return null; // Return null if no token is found
    }

    try {
        const url = "http://localhost:8000/auth/userverify";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("User verification failed");
        }

        const jsonData = await response.json();
        return jsonData; // Return the fetched user data
    

    } catch (error) {
        console.error("Verification Error:", error);
        return null;
    }
};

export default Authverify;
