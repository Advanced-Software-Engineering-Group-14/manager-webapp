const config = {
    api: {
        base: process.env.NEXT_PUBLIC_BASE_API_URL || "https://wastify-server.onrender.com/api/",
        local: process.env.NEXT_PUBLIC_LOCAL_API_URL || "http://localhost:8000/api/",
    },
}

export default config