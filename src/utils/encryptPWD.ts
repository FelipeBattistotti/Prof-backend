import crypto from 'crypto';

function encryptPWD(pwdPar: crypto.BinaryLike) {
    return crypto.createHash('sha256').update(pwdPar).digest('hex');
};

export default encryptPWD;
