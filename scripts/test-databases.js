import { execa } from 'execa';

try {
  await execa('npx', ['vitest', 'run'], {
    stdio: 'inherit',
    shell: true,
    env: { VITEST_DIR: 'src/infrastructure/database/__tests__' }
  });
} catch (err) {
  console.error('Erro ao rodar os testes:', err);
  process.exit(1);
}
