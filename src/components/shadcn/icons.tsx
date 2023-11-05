import { LucideIcon, LucideProps, Moon, SunMedium, Twitter } from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,

  google2: (props: LucideProps) => (
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3">
      <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4"/>
      <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853"/>
      <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9C10.2 188.6 0 229.6 0 272.1s10.2 83.5 28.9 122.1l90.4-70.1z" fill="#fbbc04"/>
      <path d="M272.1 107.6c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 340.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.5 152.8-112.5z" fill="#ea4335"/>
    </svg>
  ),

}

