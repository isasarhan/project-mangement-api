import Joi from 'joi';
import { ICustomer } from '../../interfaces/ICustomer.js';

export const validateCustomer = (customer: ICustomer) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        location: Joi.string(),
        number: Joi.string(),
        description: Joi.string(),
    });
    return schema.validate(customer);
};
