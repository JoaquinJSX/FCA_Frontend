import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Styles/dashboard.module.css";
import image1 from "./../Images/finances_control.png";
import image2 from "./../Images/expense_image.png";
import image3 from "./../Images/goal_image.png";

const images = [
  { src: image1, caption: "Manage your finances." },
  { src: image2, caption: "Have control over your expenses." },
  { src: image3, caption: "Achieve your financial goals." },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000); // Cambia la imagen cada 2s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Financial Control App</h1>
          <nav className={styles.nav}>
            <button onClick={() => navigate("#/log-in")}>Log In</button>
            <button onClick={() => navigate("#/sign-up")}>Sign Up</button>
          </nav>
        </div>
        <p>
          Are you looking for an app that will give you full control over your finances?
          Well, you are in the right place.
        </p>
      </header>

      {/* 📌 Sección de imágenes: Mantiene diseño de PC y cambia automáticamente en móviles */}
      <section className={styles.about}>
        <div className={styles.aboutDesktop}>
          <figure>
            <img src={image2} alt="Expenses" />
            <figcaption>Have control over your expenses.</figcaption>
          </figure>
          <figure>
            <img src={image1} alt="Finance Management" />
            <figcaption>Manage your finances.</figcaption>
          </figure>
          <figure>
            <img src={image3} alt="Financial Goals" />
            <figcaption>Achieve your financial goals.</figcaption>
          </figure>
        </div>

        <div className={styles.aboutMobile}>
          <figure>
            <img src={images[currentImage].src} alt="Dynamic Content" />
            <figcaption>{images[currentImage].caption}</figcaption>
          </figure>
        </div>

        <h3>
          <em>To control your finances is to control your life; every penny counts.</em>
        </h3>
      </section>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Limitless
      </footer>
    </div>
  );
}
