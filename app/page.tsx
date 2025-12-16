'use client';

import Button from '@/src/components/Button/Button';
import Mascot from '@/src/components/Mascot/Mascot';
import styles from './page.module.css';

const handlePlay = () => {
  console.log('Navegar para a página do jogo...');
  alert('Iniciando o Jogo!');
};

const handleHowToPlay = () => {
  console.log('Navegar para a página de regras...');
  alert('Exibindo as Regras do Jogo!');
};

export default function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>MimiShow</h1>
      </header>

      <div className={styles.mascotWrapper}>
        <Mascot speechText="Prontos para o show?" />
      </div>

      <main className={styles.mainContent}>
        <Button onClick={handlePlay} icon={<span className="text-xl">🎭</span>}>
          Jogar
        </Button>

        <Button
          onClick={handleHowToPlay}
          icon={<span className="text-xl text-red-400">❓</span>}
        >
          Como jogar
        </Button>
      </main>

      <footer className={styles.footer}>Feito por Pedro Amaral Chapelin</footer>
    </div>
  );
}
