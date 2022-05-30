import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
    constructor(
        private usersRespository: IUsersRepository,
        private mailProvider: IMailProvider
    ) { }
    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRespository.findbyEmail(data.email)

        if (userAlreadyExists) {
            return new Error('User already existis!')
        }

        const user = new User(data)
        await this.usersRespository.save(user)

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'TAprendendo SOLID com a equipe do meu app',
                email: 'test@email.com'
            },
            subject: 'Welcome to this',
            body: '<p>Hello mundo olá meu carro!</p>'
        })
        return user
    }
}