import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (    
      <nav className="flex gap-10 w-full py-7 border justify-center items-center bg-white text-black">
        <Link href="/">
          <Image src='/mock-logo.svg' alt='mock logo' height={20} width={40} />
        </Link>
        <div className='flex gap-2'>
          <Link href="/">
            Home
          </Link>
          <Link href="/dashboard">
            Dashboard
          </Link>
          <Link href="/dashboard/transactions">
            Transactions
          </Link>
        </div>
      </nav>
  );
}
