import { Poppins, Montserrat } from 'next/font/google';

export const poppins = Poppins({
  weight: ['400', '600'],
  subsets: ['latin'],
});

export const montserrat = Montserrat({
  weight: ['400'],
  subsets: ['latin'],
});