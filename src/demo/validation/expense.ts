import * as rt from "runtypes";

export enum TaxCategory {
  GST = "GST",
  HST = "HST",
  PST = "PST",
}
export const CreateExpenseRequestBody = rt.Object({
  name: rt.String,
  amount: rt.Number,
  date: rt.String,
  taxCategory: rtEnum(TaxCategory),
});

function rtEnum<T>(enumObj: T): rt.Union<any> {
  const values = Object.keys(enumObj as any)
    .filter((key) => isNaN(Number(key)))
    .map((key) => (enumObj as any)[key]);

  const literals = values.map((value) => rt.Literal(value));

  return rt.Union(...literals);
}
