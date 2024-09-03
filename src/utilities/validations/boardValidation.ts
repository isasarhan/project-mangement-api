import Joi, { object, string, array } from 'joi';
import JoiObjectId from 'joi-objectid';
import { IBoard } from '../../interfaces/IBoard.js';
const JoiObjectIdExtension = JoiObjectId(Joi);


const boardValidationSchema = object({
  id: JoiObjectIdExtension(),
  title: string().min(1).max(100).required(),
  lists: array().items(JoiObjectIdExtension()),
  customers: array().items(JoiObjectIdExtension())
});

const validateBoard = (board: IBoard) => {
  return boardValidationSchema.validate(board);
};

export default validateBoard;
