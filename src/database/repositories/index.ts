import BoardRepository from './boardRepository.js';
import ListRepository from './listRepository.js';
import CustomerRepository from './customerRepository.js';
import UserRepository from './userRepository.js';
import CardRepository from './cardRepository.js';

const boardRepository = new BoardRepository();
const listRepository = new ListRepository();
const customerRepository = new CustomerRepository();
const userRepository = new UserRepository();
const cardRepository = new CardRepository();

export { boardRepository, listRepository, customerRepository, userRepository, cardRepository };

type BoardRepoType = typeof BoardRepository;
type ListRepoType = typeof ListRepository;
type CustomerRepoType = typeof CustomerRepository;
type CardRepoType = typeof CardRepository;

export {
    BoardRepoType, ListRepoType, CustomerRepoType, CardRepoType
}


