const mode = ref("light");
function darkMode() {
  const colorMode = useColorMode();
  colorMode.preference = mode.value;
  mode.value = mode.value == "light" ? "dark" : "light";
}

export { mode, darkMode };
