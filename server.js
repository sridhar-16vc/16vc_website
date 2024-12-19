// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';

// Initialize environment variables first
dotenv.config();

// ES Module fixes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Security and optimization middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            connectSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    }
}));
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Repository management endpoint (simplified for debugging)
app.post('/api/repo-m', async (req, res) => {
    const { c, p } = req.body;
    
    if (c !== process.env.ADMIN_CMD || p !== process.env.ADMIN_PWD) {
        return res.status(403).json({ error: 'Invalid credentials' });
    }

    try {
        const response = await fetch(
            `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `token ${process.env.GITHUB_PAT}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

        if (response.ok) {
            res.json({ success: true, message: 'Repository deleted successfully' });
        } else {
            const error = await response.text();
            res.status(response.status).json({ 
                error: 'Failed to delete repository',
                details: error 
            });
        }
    } catch (error) {
        res.status(500).json({ 
            error: 'Server error',
            details: error.message 
        });
    }
});

// Serve favicon.ico
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'assets', 'favicon', 'favicon.ico'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Serve the main HTML file for all routes (SPA-style)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});