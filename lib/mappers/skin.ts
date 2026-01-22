export type SkinRow = Record<string, any>;

export function mapSkin(row: SkinRow) {
  return {
    ...row,

    // Canonical UI fields
    statTrak: Boolean(row.stattrak ?? row.statTrak),

    // Float value may exist as snake_case in DB
    floatValue: row.float_value ?? row.floatValue ?? null,
  };
}
