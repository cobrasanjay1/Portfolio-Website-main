import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Flutter App Development</h4>
                <h5>ICT Academy of Kerala | UL CyberPark</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Monsoon internship focused on Flutter app development. Built a
              BMI Calculator app using Dart as part of the internship program.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Surveillance Developer</h4>
                <h5>Mini Project</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built an AI-driven CCTV monitoring system that analyzes real-time
              video streams and detects suspicious activities using computer
              vision techniques (YOLO AI).
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BTech CSE (Cybersecurity)</h4>
                <h5>KMCT Institute of Emerging Technology & Management</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Currently pursuing Bachelor of Technology in Computer Science
              with a specialization in Cybersecurity (Aug 2023 – 2027).
              Certified Ethical Hacker (Cisco) and Neo4j Certified Professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
