import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

export default function Navigation() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/meals', label: 'Meals' },
    // ... any other navigation links
  ];

  return (
    <nav>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        
        return (
          <Link 
            key={link.href} 
            href={link.href}
            className={`${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
} 