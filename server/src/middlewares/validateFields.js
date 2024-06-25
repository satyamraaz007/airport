// src/middleware/validateFields.js

const validateFields = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = [];

        // Check if each required field is present in req.body
        requiredFields.forEach(field => {
            if (!(field in req.body)) {
                missingFields.push(field);
            }
        });

        // If any required fields are missing, send an error response
        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing field in body: ${missingFields.join(', ')}` });
        }

        // All required fields are present, proceed to the next middleware/route handler
        next();
    };
};

module.exports = validateFields;
