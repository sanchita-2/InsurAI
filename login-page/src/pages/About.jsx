import teamImg from "../assets/team.jpg";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <h2>About Us</h2>
      <p>
        At <strong>InsurePro</strong>, we believe in securing the things that matter most.  
        Founded in 2025, we offer transparent, reliable insurance solutions across life,
        health, and property sectors.
      </p>
      <img src={teamImg} alt="Our Team" className="about-img" />
      <p>
        Our dedicated team of professionals is committed to delivering peace of mind
        through innovation, integrity, and care.
      </p>
    </div>
  );
}
