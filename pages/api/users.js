import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

function getUsersData() {
    const fileData = fs.readFileSync(usersFilePath);
    return JSON.parse(fileData);
}

function saveUsersData(data) {
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
    try {
        const { email, action } = req.body; 

        const users = getUsersData();

        if (req.method === "POST") {
            // Separate registration and login
            if (action === 'register') {
                // Register
                if (users.some(u => u.email === email)) {
                    // User already exists
                    return res.status(409).json({ error: "Email already registered" });
                }
                const userId = Date.now().toString();
                const newUser = { userId, email };
                users.push(newUser);
                saveUsersData(users);
                return res.status(200).json(newUser);
            } else if (action === 'login') {
                // Login
                const user = users.find(u => u.email === email);
                if (!user) {
                    // User does not exist
                    return res.status(404).json({ error: "Email not registered" });
                }
                return res.status(200).json(user);
            } else {
                // Action not recognized
                return res.status(400).json({ error: "Invalid action" });
            }
        } else {
            return res.status(405).json({ error: "Method not allowed" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
