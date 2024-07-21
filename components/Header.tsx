import Link from 'next/link';
import Image from 'next/image';
import Iconify from '@component/Iconify'

const linkClassName:string = "flex justify-center items-center gap-1"

export default function Header() {
  return (    
      <nav className="flex gap-20 w-full py-7 border justify-center items-center bg-white text-black">
        <Link href="/">
          <Image src='/mock-logo.svg' alt='mock logo' height={20} width={40} />
        </Link>
        <div className='flex gap-5'>
          <Link href="/" className={linkClassName}>
            <Iconify type='home' />
            Home
          </Link>
          <Link href="/dashboard" className={linkClassName}>
            <Iconify type='dashboard' />
            Dashboard
          </Link>
          <Link href="/dashboard/transactions" className={linkClassName}>
            <Iconify type='businessman' />
            Transactions
          </Link>
        </div>
      </nav>
  );
}
