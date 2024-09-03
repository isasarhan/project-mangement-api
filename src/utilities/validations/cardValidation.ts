import Joi, { object, string, array, date } from 'joi';
import JoiObjectId from 'joi-objectid';
import { ICard } from '../../interfaces/ICard.js';

const JoiObjectIdExtension = JoiObjectId(Joi);


const cardValidationSchema = object({
  title: string().min(1).max(100).required(),
  description: string().allow(''),
  labels: array().items(string().valid('urgent', 'important', 'other')),
  dueDate: date().optional(),
  comments: array().items(object({
    user: JoiObjectIdExtension().required(),
    text: string().required(),
    createdAt: date().default(Date.now)
  }))
});

const validateCard = (card: ICard) => {
  return cardValidationSchema.validate(card);
};

export default validateCard;
