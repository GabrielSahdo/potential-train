import { IUserDAO } from './user.dao';
import { User } from './user.entity';


export default class UsersService {

    constructor(private dao: IUserDAO) {}

    async findByEmail(email: string): Promise<User | null> {
        const userFound = await this.dao.findByEmail(email);

        return userFound.length === 0
            ? null
            : User.fromDAO(userFound[0]);
    }

    async create(email: string, password: string): Promise<string> {
        const userFound = await this.findByEmail(email);

        if (userFound)
            throw new Error('User already exists');

        const user = await User.build(email, password);

        await this.dao.create(user.toDAO());

        return user.toDTO().id;
    }

    async login(email: string, password: string) {
        const userFound = await this.findByEmail(email);

        if (!userFound)
            throw new Error('User not found');

        const validLogin = await userFound.login(password);

        if (!validLogin)
            throw new Error('Invalid password');

        return userFound.toDTO();
    }
}