import React from "react";
import "./sponsorSection.css";

const sponsors = [
    { name: "Општина Чешиново-Облешево", img: "/sponsors/opstina.JPG" },
    { name: "Amphenol", img: "/sponsors/Amphenol.JPG" },
    { name: "Adient", img: "/sponsors/Adient.JPG" },
    { name: "Anthura", img: "/sponsors/anthura.JPG" },
    { name: "Nale Trans", img: "/sponsors/Nale Trans.JPG" },
    { name: "Клиника Љубомировски", img: "/sponsors/klinikaLjubomirovski.JPG" },
    { name: "Агрохемикал", img: "/sponsors/ahrohemikal.jpg" },
    { name: "Пицерија Стефан Облешево", img: "/sponsors/picstefam.jpg" },

    { name: "ПЗУ Д-Р. Сашо Панов", img: "/sponsors/panovkrug.jpg" },
    { name: "MB Home Engineering", img: "/sponsors/mbhome.jpg" },


    { name: "ОУ. Климент Охридски - Облешево", img: "/sponsors/klimentOhridski.JPG" },

    { name: "Пицерија Аквариум", img: "/sponsors/akvarium2.jpg" },
    { name: "Auto Solution", img: "/sponsors/auto2.JPG" },
    { name: "El-Bo Ko-Pro Teks", img: "/sponsors/elbo.jpg" },
    {name: "Ресторан Аминта",img: "/sponsors/aminta.JPG" },
    {name: "Boutique Angels",img: "/sponsors/angels.jpg" },
    {name: "Balkan Trans",img: "/sponsors/balkantrans.jpg" },
    {name: "Ресторан Детелинка",img: "/sponsors/detelinka.jpg" },
    {name: "Mihajlo Detailing",img: "/sponsors/mihajlo.jpg" },
    { name: "ME Vision Agency", img: "/sponsors/mevision2.JPG" },
    { name: "Ресторан Преслап", img: "/sponsors/preslap.jpg" },
    { name: "Певеце Алуминиум", img: "/sponsors/pvc.jpg" },
    { name: "ТП Филип Александров", img: "/sponsors/tpfilip.jpg" },
    { name: "E-Stone desing", img: "/sponsors/eStone.JPG" },
    { name: "Eko Bilding", img: "/sponsors/eko.jpg" },
    { name: "Pace Garden", img: "/sponsors/pace garden.jpg" },
    { name: "VI Motors Kocani", img: "/sponsors/vimotors.jpg" },

    { name: "AutoWelt", img: "/sponsors/autowelt.JPG" },
    { name: "Mak Rent", img: "/sponsors/makren.jpg" },
    { name: "Park Fly Skopje", img: "/sponsors/park.jpg" },
    { name: "Ginger Fresh Bar", img: "/sponsors/ginger.JPG"},

    { name: "Пиљара Драган Паунов (Раде)", img: "/sponsors/piljara.jpg" },

   // { name: "Trend", img:"/sponsors/trend.JPG"},
   // { name: "Метало комерц Емирица", img: "/sponsors/metaloKomerc.JPG" },
   // { name: "Evina", img: "/sponsors/evina.JPG" },


   // { name: "EuroPetrol", img: "/sponsors/euroPetrol.JPG" },
   // { name: "Infinity", img: "/sponsors/infinityCafe.JPG" },


];

const SponsorSection = () => {
    return (
        <section className="sponsor-section">
            <div className="sponsor-container">
                <div className="sponsor-header">
                    <h2>Покровители</h2>
                    <p>Голема благодарност до следниве покровители за одржувањето на турнирот во 2026:</p>
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
