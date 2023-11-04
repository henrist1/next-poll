import fs from 'fs';
import path from 'path';

const answersFilePath = path.join(process.cwd(), 'data', 'answers.json');

function getAnswersData() {
    const fileData = fs.readFileSync(answersFilePath);
    return JSON.parse(fileData);
}

function saveAnswersData(data) {
    fs.writeFileSync(answersFilePath, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
    try {
        const answers = getAnswersData();

        if (req.method === "POST") {
            // Answer poll
            const { userId, pollId, selectedOption } = req.body;
            const answerId = Date.now().toString();
            const newAnswer = { answerId, userId, pollId, selectedOption };
            answers.push(newAnswer);
            saveAnswersData(answers);
            return res.status(200).json(newAnswer);
        } else {
            return res.status(405).json({ error: "Method not allowed" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
