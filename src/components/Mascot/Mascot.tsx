import React from 'react';
import Image from 'next/image';
import styles from './Mascot.module.css';

interface MascotProps {
  speechText: string;
}

export default function Mascot({ speechText }: MascotProps) {
  return (
    <div className={styles.mascotContainer}>
      <div className={styles.mascotImageWrapper}>
        <Image
          src="/showrunner.svg"
          alt="Mascote Showrunner"
          width={100}
          height={100}
          className={styles.mascotImage}
        />
      </div>

      <div className={styles.speechBubble}>
        {speechText}
        <div className={styles.speechBubblePointer} />
      </div>
    </div>
  );
}
