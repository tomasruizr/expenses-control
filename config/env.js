module.exports = {
  devPort: 3000,
  distPort: 3000,
  entry: 'index.html',
  srcFolder: 'src',
  distFolder: 'dist',
  api: 'http://localhost:3001',
  staticData: '/',
  defaultAccount: 0,
  defaultBudget: 0,
  defaultCategory: 0,
  defaultHttpOptions: {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
  }
};
