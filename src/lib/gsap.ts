import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

if (typeof window !== 'undefined') {
  gsap.defaults({ ease: 'power3.out' });
}

export { gsap, useGSAP };
