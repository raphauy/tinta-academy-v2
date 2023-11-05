
import { GeistSans } from "geist/font";
import { GeistMono } from "geist/font";
import { Inter, Lusitana} from "next/font/google"

export const inter = Inter({ 
  subsets: ['latin'] 
});

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const geistSans = GeistSans.variable
export const geistMono = GeistMono.variable
