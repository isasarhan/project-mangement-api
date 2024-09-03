import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
import { ObjectId } from 'mongoose';
const JoiObjectIdExtension = JoiObjectId(Joi);

export interface User {
    id: ObjectId,
    name: string,
    email: string,
    password: string,
    role: 'admin' | 'user';
}

const userSchema = Joi.object({
    id: JoiObjectIdExtension().required(),
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('admin', 'user').required(),
});

function validateUser(data: User) {
    const { error, value } = userSchema.validate(data);
    if (error) throw new Error(error.details[0].message);
    return value;
}

export default validateUser