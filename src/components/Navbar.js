import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logoLink}>
        <Image
          src="/img/logos/first.svg" // Make sure to add your logo to the public folder
          alt="Logo"
          width={88} // Adjust based on your logo size
          height={88} // Adjust based on your logo size
          priority
          className={styles.logo}
        />
      </Link>
    </nav>
  );
}
