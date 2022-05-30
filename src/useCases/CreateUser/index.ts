import { MailTrapMailProvider } from "../../providers/implementations/MailTrapMailProvider";
import { PostgressUserRepository } from "../../repositories/implementations/PostgressUserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const postgressUserRepository = new PostgressUserRepository()
const mailTrapMailProvider = new MailTrapMailProvider()

const createUserUseCase = new CreateUserUseCase(
    postgressUserRepository,
    mailTrapMailProvider
)

const createUserController = new CreateUserController(
    createUserUseCase
)

export {CreateUserUseCase, createUserController}