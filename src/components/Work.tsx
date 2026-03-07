import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up (optional, good practice)
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {/* Project 1 */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>
                <div>
                  <h4>Automated CCTV Monitoring</h4>
                  <p>AI / Computer Vision</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Python, YOLO AI, OpenCV, Flask, React</p>
            </div>
            <WorkImage image="https://res.cloudinary.com/dywen807s/image/upload/v1772875149/images_hacpnf.jpg" alt="Automated CCTV Monitoring" link="https://github.com/cobrasanjay1/" />
          </div>
          {/* Project 2 */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>Electricity Billing System</h4>
                  <p>Desktop App / GUI</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Python, MySQL, Tkinter, Matplotlib</p>
            </div>
            <WorkImage image="https://res.cloudinary.com/dywen807s/image/upload/v1772875273/download_pmzcl8.jpg" alt="Electricity Billing System" link="https://github.com/cobrasanjay1/" />
          </div>
          {/* Project 3 */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>
                <div>
                  <h4>BMI Calculator</h4>
                  <p>Mobile App / Flutter</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Flutter, Dart, Android</p>
            </div>
            <WorkImage image="https://res.cloudinary.com/dywen807s/image/upload/v1772875360/download_m2njgi.png" alt="BMI Calculator App" link="https://github.com/cobrasanjay1/" />
          </div>
          {/* Project 4 */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>04</h3>
                <div>
                  <h4>Portfolio Website</h4>
                  <p>Web / Full Stack</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>React, TypeScript, Three.js, GSAP, Vite</p>
            </div>
            <WorkImage image="https://res.cloudinary.com/dywen807s/image/upload/v1772875447/ed67d548-33fd-45d5-b05f-7bd9d609dbdf.png" alt="Portfolio Website" link="https://github.com/cobrasanjay1/" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
