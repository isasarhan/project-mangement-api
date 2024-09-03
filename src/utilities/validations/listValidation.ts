import Joi, { object, string, array } from 'joi';
import JoiObjectId from 'joi-objectid';
import { IList } from '../../interfaces/IList.js';
const JoiObjectIdExtension = JoiObjectId(Joi);

const listValidationSchema = object({
  title: string().min(1).max(100).required(),
  cards: array().items(JoiObjectIdExtension())
});

const validateList = (list: IList) => {
  return listValidationSchema.validate(list);
};

export default validateList;
