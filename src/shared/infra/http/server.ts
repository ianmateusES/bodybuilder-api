import { app } from './app';

const port = 3333;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Aplicação iniciada na porta ${port}`);
});
