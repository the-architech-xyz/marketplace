module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'git add'],
  '*.{json,md}': ['prettier --write', 'git add'],
};
