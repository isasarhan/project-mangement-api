// src/types/joi-objectid.d.ts
declare module 'joi-objectid' {
  import { Root, StringSchema } from 'joi';

  function JoiObjectId(joi: Root): () => StringSchema;

  export default JoiObjectId;
}
