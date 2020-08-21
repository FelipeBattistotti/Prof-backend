import connection from '../database/connection';
import generateUniqueId from '../utils/generateUniqueId';
import encryptPWD from '../utils/encryptPWD';

//module.exports = {

    async function index(request: any, response: { json: (arg0: any) => any; }) {
        const user = await connection('user').select('*');

        console.log('GET user - OK');

        return response.json(user);
    };

    async function create(request: { body: { pwd?: any; name?: any; email?: any; }; }, response: { json: (arg0: { id: string; }) => any; }) {

        const { name, email } = request.body;

        const id = generateUniqueId(); // generates unique ID for the user

        const pwd = encryptPWD(request.body.pwd); // encrypts the password

        await connection('user').insert({
            id,
            name,
            email,
            pwd,
        });

        console.log('CREATE user - OK');

        return response.json({ id });
    };

    async function del(request: { params: { id: any; }; }, response: { status: (arg0: number) => { (): any; new(): any; send: { (): any; new(): any; }; }; }) {
        const { id } = request.params;

        await connection('user').where('id', id).delete();

        console.log('DELETE user - OK');

        return response.status(204).send();
    };
//};

export default { index, create, del };
