"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const images = [
    "/img/snake1.png",
    "/img/fit1.png",
    "/img/fitbaby1.png",
    "/img/ancestor1.png",
    // Add all your image paths here
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      alert("Please accept the disclaimer to continue");
      return;
    }

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setError(null);
        e.target.reset();
        setIsChecked(false);
      } else {
        throw new Error("Subscription failed");
      }
    } catch (error) {
      setError("Sorry, there was an error. Please try again later.");
      console.error("Subscription error:", error);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.contentWrapper}>
          <div className={styles.imageSection}>
            <div className={styles.slideshow}>
              {images.map((src, index) => (
                <motion.div
                  key={src}
                  className={styles.slideImage}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    transition: {
                      duration: 1,
                      ease: [0.65, 0, 0.35, 1],
                    },
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: currentSlide === index ? 2 : 1,
                  }}
                >
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    priority={index === 0}
                  />
                </motion.div>
              ))}
              <div className={styles.dots}>
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.dot} ${
                      currentSlide === index ? styles.activeDot : ""
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h1 className={styles.heading}>
              Stay <span className={styles.wrapped}>Wrapped</span> in Community
            </h1>

            {!isSubmitted ? (
              <>
                <p className={styles.description}>
                  Sign up for our newsletter and be the first to receive special
                  offers on future collections and updates on upcoming events
                  and workshops.
                </p>

                {error && <p className={styles.errorMessage}>{error}</p>}

                <form className={styles.newsletterForm} onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className={styles.input}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className={styles.input}
                    required
                  />
                  <div className={styles.disclaimerWrapper}>
                    <label className={styles.disclaimer}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        className={styles.checkbox}
                      />
                      <span className={styles.disclaimerText}>
                        I agree to receive marketing communications from Àjẹ́.
                        You can unsubscribe at any time.
                      </span>
                    </label>
                  </div>
                  <button type="submit" className={styles.submitButton}>
                    Sign Up!
                  </button>
                </form>
              </>
            ) : (
              <div className={styles.successMessage}>
                <h2>Thank you for signing up!</h2>
                <p>We&apos;re excited to have you join our community.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
