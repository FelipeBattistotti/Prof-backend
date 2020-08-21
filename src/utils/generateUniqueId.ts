import crypto from 'crypto';

function generateUniqueId() {
    return crypto.randomBytes(4).toString('hex');
};

export default generateUniqueId;
