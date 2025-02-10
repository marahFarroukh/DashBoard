import { createContext } from "react";

export const SearchContext = createContext({
  searchQuery: "",
  handleProductSearch: (query: string) => {
    console.log(query);
  },
});
