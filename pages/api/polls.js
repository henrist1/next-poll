import fs from 'fs';
import path from 'path';

const pollsFilePath = path.join(process.cwd(), 'data', 'polls.json');

function getPollsData() {
    const fileData = fs.readFileSync(pollsFilePath);
    return JSON.parse(fileData);
}

function savePollsData(data) {
    fs.writeFileSync(pollsFilePath, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
    try {
        const polls = getPollsData();

        if (req.method === "POST") {
            // Create poll
            const { question, options } = req.body;
            const pollId = Date.now().toString();
            const newPoll = { pollId, question, options };
            polls.push(newPoll);
            savePollsData(polls);
            return res.status(200).json(newPoll);
        } else if (req.method === "GET") {
            // Get all polls
            return res.status(200).json(polls);
        } else {
            return res.status(405).json({ error: "Method not allowed" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
