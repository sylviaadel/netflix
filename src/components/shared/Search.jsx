import { useState } from "react";

export default function Search() {
  const [isFocused, setIsFocused] = useState(false);
  var classes = [];

  function onFocus() {
    setIsFocused(true);
    classes.push("input-focused");
  }
  function onBlur() {
    setIsFocused(false);
    classes.push("input-focused");
  }
  if (isFocused) {
    classes.push("input-focused");
  }

  return (
    <div id="Search" className={classes.join(" ")}>
      <i className=" search-icon fa-solid fa-magnifying-glass"></i>
      <input
        placeholder="Titles.."
        type="search"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
}
