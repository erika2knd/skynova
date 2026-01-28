export type SkinRow = Record<string, unknown>;

export type SkinMapped<T extends SkinRow = SkinRow> = T & {
  statTrak: boolean;
  floatValue: string | null;
};

export function mapSkin<T extends SkinRow>(row: T): SkinMapped<T> {
  return {
    ...(row as T),

    statTrak: Boolean((row as any).stattrak ?? (row as any).statTrak),

    floatValue: ((row as any).float_value ?? (row as any).floatValue ?? null) as string | null,
  };
}
