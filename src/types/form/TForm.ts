import type {TField} from "@/types/form/TField.ts";

export type TForm = {
  attrs: {
    [name: string]: string;
  }
  options: {
    [name: string]: any;
  }
  fields: {
    [name: string]: TField;
  }
}
