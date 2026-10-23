export type MenuItem = {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
};

const aliases: Record<string, string[]> = {
  id: ["id", "item id", "itemid"],
  name: ["name", "item name", "itemname"],
  category: ["category", "type"],
  stock: ["stock", "quantity", "available"],
  price: ["price", "cost"],
};

function field(record: Record<string, unknown>, name: keyof typeof aliases) {
  for (const [key, value] of Object.entries(record)) {
    if (aliases[name].includes(key.trim().toLowerCase())) return value;
  }
  return undefined;
}

function finiteNumber(value: unknown, label: string, row: number) {
  const number = typeof value === "number" ? value : typeof value === "string" && value.trim() ? Number(value) : NaN;
  if (!Number.isFinite(number) || number < 0 || !Number.isSafeInteger(number) && label === "stock") {
    throw new Error(`Item row ${row} has an invalid ${label}.`);
  }
  return number;
}

export function validateItems(payload: unknown): MenuItem[] {
  let rows: unknown = payload;
  if (rows && typeof rows === "object" && !Array.isArray(rows)) {
    const envelope = rows as Record<string, unknown>;
    if (envelope.success === false || (typeof envelope.status === "string" && /^(error|failed)$/i.test(envelope.status))) {
      throw new Error(typeof envelope.error === "string" ? envelope.error : typeof envelope.message === "string" ? envelope.message : "The menu source reported an error.");
    }
    if (typeof envelope.error === "string" && envelope.error.trim()) throw new Error(envelope.error);
    rows = envelope.data ?? envelope.items ?? envelope.records ?? envelope.result;
    if (rows && typeof rows === "object" && !Array.isArray(rows)) {
      const nested = rows as Record<string, unknown>;
      rows = nested.items ?? nested.records ?? nested.data;
    }
  }
  if (!Array.isArray(rows)) throw new Error("The menu API returned an unexpected response. Expected a list of items.");

  const items = rows.map((entry, index) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      throw new Error(`Item row ${index + 1} is not a valid record.`);
    }
    const record = entry as Record<string, unknown>;
    const rawId = field(record, "id");
    const rawName = field(record, "name");
    const rawCategory = field(record, "category");
    if (rawId === undefined || rawName === undefined || rawCategory === undefined) {
      throw new Error(`Item row ${index + 1} is missing its id, name, or category.`);
    }
    const id = String(rawId).trim();
    const name = String(rawName).trim();
    const category = String(rawCategory).trim();
    if (!id || !name || !category) throw new Error(`Item row ${index + 1} has an empty id, name, or category.`);
    return {
      id,
      name,
      category,
      stock: finiteNumber(field(record, "stock"), "stock", index + 1),
      price: finiteNumber(field(record, "price"), "price", index + 1),
    };
  });
  const ids = new Set<string>();
  for (const item of items) {
    if (ids.has(item.id)) throw new Error(`The menu contains duplicate item id ${item.id}.`);
    ids.add(item.id);
  }
  return items;
}
