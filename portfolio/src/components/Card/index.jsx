import React, { useEffect, useState } from 'react';
import styles from './Card.module.css';
import { FaHtml5, FaCss3Alt, FaJs, FaReact } from 'react-icons/fa';
import { SiCplusplus, SiRuby, SiGo, SiPhp } from 'react-icons/si';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

// icones
const languageIcons = {
  JavaScript: <FaJs />,
  HTML: <FaHtml5 />,
  CSS: <FaCss3Alt />,
  React: <FaReact />,
  "C++": <SiCplusplus />,
  Ruby: <SiRuby />,
  Go: <SiGo />,
  PHP: <SiPhp />,
  //  ícones 
};


function Card({ name, description, html_url, repoName }) {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/samenezes/${repoName}/languages`);
        const data = await response.json();
        setLanguages(Object.keys(data));
      } catch (error) {
        console.error("Não foi achado a linguagem:", error);
      }
    };

    fetchLanguages();
  }, [repoName]);

  return (
    <section className={styles.card}>
      <h3>{name}</h3>
      <p>{description}</p>
      <div className={styles.card_footer}>
        <div className={styles.card_icones}>
          {languages.map(language => (
            <span key={language} title={language}>
              {languageIcons[language] || language}
            </span>
          ))}
        </div>
        <Link to={html_url} className={styles.botao}>
          <BsArrowRight />
        </Link>
      </div>
    </section>
  );
}

export default Card;