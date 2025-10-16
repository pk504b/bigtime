import Link from 'next/link'
import { Rubik_Mono_One } from "next/font/google";

const rubikMono = Rubik_Mono_One({ weight: '400', subsets: ['latin'] })
 
export default function NotFound() {
  return (
    <div className='flex-1 h-full flex flex-col justify-center items-center'>
      <h2 className={`${rubikMono.className} text-9xl`}>404</h2>
      <p className='text-6xl font-thin mb-10'>Bad Timing</p>
      <p className="">Something went wrong. Please try again later.</p>
    </div>
  )
}