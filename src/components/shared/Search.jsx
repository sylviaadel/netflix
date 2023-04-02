import { useState } from "react";

export default function Search({ onChange }) {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  var classes = [];

  function onFocus() {
    setIsFocused(true);
    classes.push("input-focused");
  }
  function onBlur() {
    setIsFocused(false);
    classes.push("input-focused");
  }
  if (isFocused || query.trim() != "") {
    classes.push("input-focused");
  }
  function onQueryChange(event) {
    setQuery(event.target.value);
    onChange(query);
  }

  return (
    <div id="Search" className={classes.join(" ")}>
      <i className=" search-icon fa-solid fa-magnifying-glass"></i>
      <input
        placeholder="Search in Titles"
        type="search"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onQueryChange}
        value={query}
      />
    </div>
  );
}
