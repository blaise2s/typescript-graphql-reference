export const buildSearch = (query: string) => {
  return "%".concat(query).concat("%");
};

export * from "./configureSequelize";
export * from "./loadDatabase";
