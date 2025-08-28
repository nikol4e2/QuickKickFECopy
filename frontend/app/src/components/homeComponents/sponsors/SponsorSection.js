import React from "react";
import "./sponsorSection.css";

const sponsors = [
    { name: "Општина Чешиново-Облешево", img: "/sponsors/opstina.JPG" },
    { name: "Anthura", img:"/sponsors/anthura.JPG"},
    { name: "Клиника Љубомировски", img: "/sponsors/klinikaLjubomirovski.JPG" },
    { name: "Amphenol", img: "/sponsors/Amphenol.JPG" },
    { name: "Вулканизер Даро", img: "/sponsors/vulkanizerDaro.JPG"},
    { name: "Adient", img: "/sponsors/Adient.JPG" },
    { name: "Grga Trans", img: "/sponsors/Grga trans.JPG" },
    { name: "Пицерија Стефан Облешево", img: "/sponsors/Pic Stefan.JPG" },
    { name: "Nale Trans", img: "/sponsors/Nale Trans.JPG" },

    { name: "ME Vision Agency", img: "/sponsors/mevision2.JPG" }, 
   // { name: "Еко Зрно", img: "/sponsors/EkoZrno.JPG" },
    { name: "ОУ. Климент Охридски - Облешево", img: "/sponsors/klimentOhridski.JPG" },
    { name: "Пицерија Аквариум", img: "/sponsors/akvarium.JPG" },
    { name: "E-Stone", img:"/sponsors/eStone.JPG"},
    { name: "AutoWelt", img: "/sponsors/autowelt.JPG" },
    { name: "ТП Филип Александров", img: "/sponsors/prodavnica.JPG"},
    { name: "Ginger Fresh Bar", img: "/sponsors/ginger.JPG"},
    { name : "Маркет Сане Кучичино", img: "/sponsors/marketSane.JPG"},
    { name: "Trend", img:"/sponsors/trend.JPG"},
    { name: "Аминта", img: "/sponsors/aminta.JPG" },
    { name: "Исток Мермер", img : "/sponsors/istokMermer.JPG"},
    //{ name: "Inox Dizajn Oblesevo", img: "/sponsors/inoxDizajn.JPG" },
    { name: "Метало комерц Емирица", img: "/sponsors/metaloKomerc.JPG" },
    { name: "Авто Лакер Јане" , img : "/sponsors/avtoLakerJane.JPG"},
    { name: "Evina", img: "/sponsors/evina.JPG" },
     { name: "Infinity", img: "/sponsors/infinityCafe.JPG" },
    { name: "Оризарство Чешиново", img: "/sponsors/orizarstvoCesinovo.JPG"},
    { name: "Дабо АС", img: "/sponsors/daboAs.JPG" },
    { name: "Слога Чешиново", img: "/sponsors/sloga.JPG" },
    { name: "Бербер Зоки Облешево", img: "/sponsors/berberZoki.JPG" },
    { name: "Гостилница Мост", img: "/sponsors/most.JPG" },
    { name: "EuroPetrol", img: "/sponsors/euroPetrol.JPG" },
    



];

const SponsorSection = () => {
    return (
        <section className="sponsor-section">
            <div className="sponsor-container">
                <div className="sponsor-header">
                    <h2>Покровители</h2>
                    <p>Голема благодарност до следниве покровители за одржувањето на турнирот во 2025:</p>
                </div>
                <div className="sponsor-grid">
                    {sponsors.map((sponsor, index) => (
                        <div key={index} className="sponsor-card">
                            <img
                                src={sponsor.img}
                                alt={sponsor.name}
                                className="sponsor-image"
                            />
                            <span className="sponsor-name">{sponsor.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SponsorSection;
