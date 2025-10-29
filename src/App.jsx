import React, { useState, useEffect, useRef } from "react";
import clouds from './assets/clouds.jpg';
import terraform from './assets/terraform.jpg';
import cloudCompute from './assets/cloud_compute.jpg';
import k8 from './assets/k8.jpg';
import earth from './assets/earth.png';
import intro from './assets/intro2.avif';
import grass from './assets/grass.png';
import server from './assets/server.png';
import folder from './assets/folder-icon.svg';
import sprite from './assets/blond-guy-sprite-detailed.png';


const vw = (v) => window.innerWidth * (v / 100);
const vh = (v) => window.innerHeight * (v / 100);

// 🧩 Storyline connected to resume + DevOps worlds
const RESUME_SNIPPETS = [
  {
    level: 0,
    title: "Jordan Smith — Senior Cloud Engineer",
    text: "7+ years of experience optimizing AWS infrastructures and automating DevOps pipelines. " + 
    "I specialize in designing and optimizing cloud infrastructures for both performance and cost-efficiency. " + 
    "At Peraton, I implemented AWS cloud optimization strategies that cut costs by 50% while maintaining high " + 
    "availability and disaster recovery readiness. My approach integrates monitoring, automated scaling, and " + 
    "resource optimization to ensure operational excellence in dynamic cloud environments.",
  },
  {
    level: 1,
    title: "Infrastructure as Code",
    text: "I have a proven track record of leveraging Terraform, Ansible, and AWS CloudFormation to automate infrastructure provisioning and management. " + 
    "At Peraton, I automated complex AWS deployments using Terraform, which bolstered consistency, scalability, and security across environments. " + 
    "This initiative reduced manual intervention, ensured reproducible infrastructure, and aligned with best practices in modular, reusable cloud architecture.",
    projectName: "Terraform-aws-infrastructure",
    href: "https://github.com/jordansmith04/terraform-aws-infrastructure",
  },
  {
    level: 2,
    title: "Experience with CI/CD",
    text: "I have extensive experience designing and optimizing CI/CD pipelines to streamline software delivery and enhance operational efficiency. " + 
    "My experience includes building and maintaining Gitlab pipelines, Github Action pipelines, AWS CodeBuild and Deploy, and Jenkins. My goal is always to ensure high service availability and " + 
    "scalable deployments across cloud environments. My work consistently reduced deployment times and supported rapid feature rollouts, " + 
    "reinforcing a culture of continuous integration and continuous delivery within agile teams.",
  },
  {
    level: 3,
    title: "Kubernetes on AWS (EKS)",
    text: "I have designed and deployed containerized applications on AWS using Kubernetes, implementing scalable, highly available architectures. " + 
    "At Charter Communications, I orchestrated Kubernetes clusters with Helm charts, enabling secure and efficient application rollouts. " + 
    "My experience includes managing EKS clusters, optimizing resource utilization, and integrating monitoring tools to ensure operational excellence " + 
    "in cloud-native environments.",
  },
  {
    level: 4,
    title: "Observability Stack",
    text: "I am skilled in implementing comprehensive monitoring and observability solutions to support incident response and proactive system management. " + 
    "I engineered monitoring solutions at Peraton using AWS CloudWatch and Datadog, which provided real-time insights into infrastructure performance and" + 
    " application health. These solutions enhanced incident response times and improved overall system reliability across complex cloud environments.",
  },
  {
    level: 5,
    title: "Chaos & Reliability Engineering",
    text: "I have actively contributed to building resilient and reliable cloud infrastructures by applying chaos and reliability engineering principles. " + 
    "At Peraton, I implemented monitoring solutions with AWS CloudWatch and Datadog, allowing rapid detection and resolution of incidents in " + 
    "dynamic cloud environments. By automating infrastructure workflows and enforcing best practices in high availability and disaster recovery, " + 
    "I strengthened system resilience, ensured service continuity, and reduced the likelihood of outages in production systems.",
  },
  {
    level: 6,
    title: "Ansible Automation",
    text: "I have leveraged Ansible to streamline repetitive infrastructure tasks and enforce consistent configurations across environments. " + 
    "By integrating Ansible into deployment workflows, I automated processes that were previously manual, improving deployment speed and " + 
    "reducing human error. This automation reinforced Infrastructure as Code practices, ensured reliable provisioning, and enabled my " + 
    "teams to focus on higher-value engineering tasks.",
  },
  {
    level: 7,
    title: "Multi-Environment Deployment",
    text: "I have extensive experience deploying applications across multiple environments, from development to production, " + 
    "while maintaining consistency and reliability. At Charter Communications, I orchestrated CI/CD pipelines and containerized " + 
    "deployments that seamlessly promoted applications across staging and production environments. " + 
    "These workflows ensured environment parity, minimized deployment risk, and allowed rapid iteration without compromising system" + 
    " stability or security.",
  },
];

const ENDGAME_LINKS = [
  { name: "Resume", url: "https://jordansmith04.github.io/website/" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/jordan-asmith/" },
  { name: "GitHub", url: "https://github.com/jordansmith04" },
  { name: "Email", url: "mailto:Jordan.asmith04@gmail.com" },
];

const STORYLINE = [
  "Welcome! Collect all files to save Production and learn about me.",
  "Step 1: Recreate Infrastructure using Terraform",
  "Step 2: Build and deploy apps using CI/CD Pipelines",
  "Step 3: Deploy apps using Kubernetes on AWS (EKS)",
  "Step 4: Observability Stack — Implement metrics, logs, and tracing.",
  "Step 5: Chaos & Reliability Engineering — Break things safely and validate resilience.",
  "Step 6: Manage EC2 configurations using Ansible",
  "Step 7: Multi-Environment Cloud Deployment",
  "🏆 You saved Production! All systems are green — your DevOps resume is complete!",
];

// 🗺️ Resume-inspired levels
const LEVELS = [
  {
    title: "Intro",
    background: clouds,
    objects: [
      { x: 15, width: 8, height: 10 },
      { x: 45, width: 6, height: 12 },
      { x: 75, width: 4, height: 8 },
    ],
    coins: [
      { x: 20, y: 65, collected: false },
      { x: 48, y: 55, collected: false },
      { x: 78, y: 68, collected: false },
    ],
  },
  {
    title: "Terraform AWS Infrastructure",
    background: terraform,
    objects: [
      { x: 15, width: 8, height: 10 },
      { x: 45, width: 6, height: 12 },
      { x: 75, width: 4, height: 8 },
    ],
    coins: [
      { x: 20, y: 65, collected: false },
      { x: 48, y: 55, collected: false },
      { x: 78, y: 68, collected: false },
    ],
  },
  {
    title: "CI/CD Pipeline with Docker + GitHub Actions",
    background: cloudCompute,
    objects: [
      { x: 25, width: 10, height: 12 },
      { x: 55, width: 10, height: 10 },
      { x: 80, width: 8, height: 12 },
    ],
    coins: [
      { x: 20, y: 65, collected: false },
      { x: 48, y: 55, collected: false },
      { x: 78, y: 68, collected: false },
    ],
  },
  {
    title: "Kubernetes on AWS (EKS)",
    background: k8,
    objects: [
      { x: 20, width: 10, height: 12 },
      { x: 60, width: 10, height: 10 },
      { x: 90, width: 10, height: 12 },
    ],
    coins: [
      { x: 20, y: 65, collected: false },
      { x: 48, y: 55, collected: false },
      { x: 78, y: 68, collected: false },
    ],
  },
  {
    title: "Kubernetes on AWS (EKS)",
    background: k8,
    objects: [
      { x: 20, width: 10, height: 12 },
      { x: 60, width: 10, height: 10 },
      { x: 90, width: 10, height: 12 },
    ],
    coins: [
      { x: 20, y: 65, collected: false },
      { x: 48, y: 55, collected: false },
      { x: 78, y: 68, collected: false },
    ],
  },
  {
    title: "Kubernetes on AWS (EKS)",
    background: k8,
    objects: [
      { x: 20, width: 10, height: 12 },
      { x: 60, width: 10, height: 10 },
      { x: 90, width: 10, height: 12 },
    ],
    coins: [
      { x: 20, y: 65, collected: false },
      { x: 48, y: 55, collected: false },
      { x: 78, y: 68, collected: false },
    ],
  },
  {
    title: "Kubernetes on AWS (EKS)",
    background: k8,
    objects: [
      { x: 20, width: 10, height: 12 },
      { x: 60, width: 10, height: 10 },
      { x: 90, width: 10, height: 12 },
    ],
    coins: [
      { x: 20, y: 65, collected: false },
      { x: 48, y: 55, collected: false },
      { x: 78, y: 68, collected: false },
    ],
  },
  {
    title: "ending",
    background: earth,
    objects: [],
    coins: [],
  },
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [levelIndex, setLevelIndex] = useState(0);
  const [player, setPlayer] = useState({
    x: vw(5),
    y: vh(70),
    width: 4,
    height: 10,
    vx: 0,
    vy: 0,
    grounded: false,
  });
  const [keys, setKeys] = useState({});
  const [cameraX, setCameraX] = useState(0);
  const [score, setScore] = useState(0);
  const [story, setStory] = useState(STORYLINE[0]);
  const [showStory, setShowStory] = useState(true);
  const [direction, setDirection] = useState("right");
  const [isRunning, setIsRunning] = useState(false);
  const [fade, setFade] = useState(true);
  const [showResumeBox, setShowResumeBox] = useState(true);
  const [showCompletedScreen, setShowCompletedScreen] = useState(false);

  const worldRef = useRef(null);
  const gravity = vh(0.18);
  const jumpStrength = vh(2.5);
  const speed = vw(0.8);
  const levelWidth = vw(100);
  const currentLevel = LEVELS[levelIndex];

  // 🎮 Keyboard listeners
  useEffect(() => {
    const handleDown = (e) => {
      if (["ArrowLeft", "ArrowRight", "a", "d"].includes(e.key)) setIsRunning(true);
      setKeys((k) => ({ ...k, [e.key]: true }));
    };
    const handleUp = (e) => {
      if (["ArrowLeft", "ArrowRight", "a", "d"].includes(e.key)) setIsRunning(false);
      setKeys((k) => ({ ...k, [e.key]: false }));
    };
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

  // 🕹️ Game loop
  useEffect(() => {
    if (!started) return;
    const loop = setInterval(() => {
      setPlayer((prev) => {
        let { x, y, vx, vy, grounded } = prev;

        // Movement
        if (keys["ArrowRight"] || keys["d"]) {
          vx = speed;
          setDirection("right");
        } else if (keys["ArrowLeft"] || keys["a"]) {
          vx = -speed;
          setDirection("left");
        } else vx = 0;

        // Jump
        if ((keys["ArrowUp"] || keys["w"] || keys[" "]) && grounded) {
          vy = -jumpStrength;
          grounded = false;
        }

        vy += gravity;
        let newX = x + vx;
        let newY = y + vy;

        const groundY = vh(90);
        if (newY + vh(prev.height) > groundY) {
          newY = groundY - vh(prev.height);
          vy = 0;
          grounded = true;
        }

        // 🧱 Block physics
        const objects = currentLevel.objects.map((o) => ({
          x: vw(o.x),
          y: groundY - (vh(o.height) - vh(4)),
          width: vw(o.width),
          height: vh(o.height),
        }));

        for (const o of objects) {
          const playerBottom = newY + vh(prev.height);
          const playerRight = newX + vh(prev.width);
          const objectBottom = o.y + o.height;
          const objectRight = o.x + o.width;

          if (
            playerBottom >= o.y &&
            newY <= objectBottom &&
            playerRight >= o.x &&
            newX <= objectRight
          ) {
            if (prev.y + vh(prev.height) <= o.y) {
              newY = o.y - vh(prev.height);
              vy = 0;
              grounded = true;
            } else if (prev.y >= objectBottom) {
              newY = objectBottom;
              vy = 0;
            } else if (prev.x + vh(prev.width) <= o.x) {
              newX = o.x - vh(prev.width);
            } else if (prev.x >= objectRight) {
              newX = o.x + o.width;
            }
          }
        }

        // 💾 Coin (file folder) collection
        currentLevel.coins.forEach((coin) => {
          if (coin.collected) return;
          const cx = vw(coin.x);
          const cy = vh(coin.y);
          const cw = vw(2.5);
          const ch = vh(4);
          if (
            newX < cx + cw &&
            newX + vh(prev.width) > cx &&
            newY < cy + ch &&
            newY + vh(prev.height) > cy
          ) {
            coin.collected = true;
            setScore((s) => s + 1);
          }
        });

        // 🌍 Level transitions
        if (newX < 0 && levelIndex > 0) {
          transitionLevel(levelIndex - 1, levelWidth - vw(10));
          setStory(STORYLINE[levelIndex - 1]);
          setShowResumeBox(true);
          setShowStory(true);
          return { ...prev, x: levelWidth - vw(10), y: vh(70), vx: 0, vy: 0 };
        } else if (newX > levelWidth - vh(prev.width)) {
          if (levelIndex < STORYLINE.length - 1) {
            transitionLevel(levelIndex + 1, vw(5));
            setStory(STORYLINE[levelIndex + 1]);
            setShowStory(true);
            setShowResumeBox(true);
            return { ...prev, x: vw(5), y: vh(70), vx: 0, vy: 0 };
          }
        }

        if(newX < vw(30)){
          setShowStory(true);
        } else {
          setShowStory(false);
        }

        setCameraX(Math.min(Math.max(newX - vw(50), 0), levelWidth - vw(100)));
        return { ...prev, x: newX, y: newY, vx, vy, grounded };
      });
    }, 30);

    return () => clearInterval(loop);
  }, [started, keys, currentLevel, levelIndex]);

  const transitionLevel = (nextIndex, startX) => {
    setFade(false);
    setTimeout(() => {
      setLevelIndex(nextIndex);
      setStory(STORYLINE[nextIndex]);
      setFade(true);
    }, 500);
  };

  // 🎵 Running bounce animation
  const bounceOffset = isRunning ? Math.sin(Date.now() / 80) * vh(1) : 0;
  const resumeSnippet = RESUME_SNIPPETS.find((s) => s.level === levelIndex);
  
  return (
    <div
      className="game"
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        background: intro,
      }}
    >
      {/* Start Screen */}
      {!started && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
            background: "rgba(0,0,0,0.6)",
            padding: "2rem",
            borderRadius: "1rem",
          }}
        >
          <h1>🚀 Jordan Smith's Portfolio Quest</h1>
          <h2>“Save the Production Environment”</h2>
          <p>Collect file folders to restore order while uncovering my DevOps journey.</p>
          <button
            onClick={() => setStarted(true)}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              background: "gold",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            Start Game
          </button>
        </div>
      )}

      {/* Game Screen */}
      {started && (
        <>
          {/* Backgrounds */}
          <img
              src={`${currentLevel.background}`}
              alt="background"
              style={{
                position: "absolute",
                left: `-${cameraX * (0.2)}px`,
                top: 0,
                width: `${levelWidth}px`,
                height: "100%",
                background: `url(${currentLevel.background}) repeat-x center`,
                backgroundSize: "cover",
                zIndex: 1
              }}
            />

          {/* Foreground */}
          <div
            ref={worldRef}
            style={{
              position: "absolute",
              left: -cameraX,
              top: 0,
              width: `${levelWidth}px`,
              height: "100%",
              zIndex: 5,
            }}
          >
            {/* Ground */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "10vh",
                background: `url(${grass}) repeat-x bottom`,
                backgroundSize: "contain",
                zIndex: 7
              }}
            />

            {/* Objects */}
            {currentLevel.objects.map((obj, i) => (
              <img
                key={i}
                src={server}
                alt="object"
                style={{
                  position: "absolute",
                  left: vw(obj.x),
                  top: vh(90) - (vh(obj.height) - vh(4)), //want 708px, have 678.4px = 
                  width: vw(obj.width),
                  height: vh(obj.height),
                  zIndex: 6
                }}
              />
            ))}

            {/* Coins */}
            {currentLevel.coins.map(
              (coin, i) =>
                !coin.collected && (
                  <img
                    key={i}
                    src={folder}
                    alt="coin"
                    style={{
                      position: "absolute",
                      left: vw(coin.x),
                      top: vh(coin.y),
                      width: vw(2.5),
                      height: vh(4),
                      borderRadius: "1rem",
                    }}
                  />
                )
            )}

            {/* Player */}
            <img
              src={sprite}
              alt="player"
              style={{
                position: "absolute",
                left: player.x,
                top: player.y - bounceOffset,
                width: vw(player.width),
                height: vh(player.height),
                transform: direction === "left" ? "scaleX(-1)" : "none",
                zIndex: 10,
                transition: "top 0.05s linear",
              }}
            />
          </div>

          {/* Storyline */}
          {showStory && (
          <div
            style={{
              position: "absolute",
              bottom: "1vh",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              background: "rgba(0,0,0,0.8)",
              padding: "1rem 2rem",
              borderRadius: "1rem",
              fontSize: "1.1rem",
              textAlign: "center",
              zIndex: 15,
              maxWidth: "100%",
              whiteSpace: "nowrap",
            }}
          >
            {story}
          </div>) }

          {/* Resume snippet box */}
          {/*showResumeBox && */}
          {resumeSnippet && (
            <div
              style={{
                position: "absolute",
                top: "10vh",
                left: "50%",
                transform: "translateX(-50%)",
                // background: "rgba(255,255,255,0.1)",
                background: "grey",
                color: "white",
                border: "1px solid gold",
                borderRadius: "1rem",
                padding: "1rem 2rem",
                width: "60vw",
                textAlign: "center",
                animation: "fadeInUp 1s ease-out forwards",
                zIndex: 15
              }}
            >
              <h3 style={{ color: "gold" }}>{resumeSnippet.title}</h3>
              <p>{resumeSnippet.text}</p>
              {resumeSnippet.href && resumeSnippet.projectName && (
              <><p> Example project link: </p><a target="_blank"
                style={{
                  color: "black"
                }} 
                href={resumeSnippet.href}>{resumeSnippet.projectName}</a></>
              )}
            </div>
          )}


          {/* score */}
          <div
            style={{
              position: "absolute",
              top: "2vh",
              left: "2vw",
              color: "gold",
              fontSize: "1.5rem",
              fontWeight: "bold",
              textShadow: "1px 1px 2px black",
              zIndex: 20,
            }}
          >
            📁 Files Collected: {score}
          </div>

          {levelIndex === STORYLINE.length - 1 && (
            <div
              style={{
                position: "absolute",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "rgba(9, 9, 9, 0.9)",
                padding: "2rem",
                borderRadius: "1rem",
                color: "white",
                textAlign: "center",
                zIndex: 20
              }}
            >
              <h2>🏆 You Saved Production!</h2>
              <p>Thank you for exploring my DevOps journey.</p>
              {ENDGAME_LINKS.map((link, i) => (
                <div key={i} style={{ margin: "0.5rem 0" }}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "gold",
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    {link.name}
                  </a>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Endgame Links
      {started && levelIndex == LEVELS.length && (
        <div style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0,0,0,0.9)",
            padding: "2rem",
            borderRadius: "1rem",
            color: "white",
            textAlign: "center",
          }}>
          <h2>🏆 You Saved Production!</h2>
          <p>Thank you for exploring my DevOps journey.</p>
          {ENDGAME_LINKS.map((link, i) => (
            <div key={i} style={{ margin: "0.5rem 0" }}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "gold",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                {link.name}
              </a>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}