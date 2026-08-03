import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeHeroCanvas({ activeEvent }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // 3. Lighting (Minimalist Warm Architectural Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff7ed, 2.2); // Warm ivory light
    mainLight.position.set(5, 6, 6);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const rimLight = new THREE.SpotLight(0xd4af37, 2.5); // Champagne Gold rim light
    rimLight.position.set(-6, -4, 4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x94a3b8, 0.8); // Cool slate fill
    fillLight.position.set(0, -5, -3);
    scene.add(fillLight);

    // 4. 3D Object Group (Main Ticket Pass & Geometric Elements)
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Create 3D Event Pass Mesh
    const ticketWidth = 3.6;
    const ticketHeight = 2.1;
    const ticketDepth = 0.08;

    const ticketShape = new THREE.Shape();
    const x = -ticketWidth / 2;
    const y = -ticketHeight / 2;
    const w = ticketWidth;
    const h = ticketHeight;
    const r = 0.2; // Rounded corner radius
    const notchR = 0.18; // Side notch radius

    ticketShape.moveTo(x + r, y);
    ticketShape.lineTo(x + w - r, y);
    ticketShape.quadraticCurveTo(x + w, y, x + w, y + r);
    // Right side notch
    ticketShape.lineTo(x + w, y + h / 2 - notchR);
    ticketShape.absarc(x + w, y + h / 2, notchR, -Math.PI / 2, Math.PI / 2, true);
    ticketShape.lineTo(x + w, y + h - r);
    ticketShape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ticketShape.lineTo(x + r, y + h);
    ticketShape.quadraticCurveTo(x, y + h, x, y + h - r);
    // Left side notch
    ticketShape.lineTo(x, y + h / 2 + notchR);
    ticketShape.absarc(x, y + h / 2, notchR, Math.PI / 2, -Math.PI / 2, true);
    ticketShape.lineTo(x, y + r);
    ticketShape.quadraticCurveTo(x, y, x + r, y);

    const extrudeSettings = {
      depth: ticketDepth,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    };

    const ticketGeometry = new THREE.ExtrudeGeometry(ticketShape, extrudeSettings);
    ticketGeometry.center();

    // High End Physical Material for Ticket Body (Matte Slate / Charcoal)
    const ticketMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x18181b, // Matte Obsidian
      roughness: 0.25,
      metalness: 0.4,
      clearcoat: 0.4,
      clearcoatRoughness: 0.1,
      reflectivity: 0.8,
    });

    const ticketMesh = new THREE.Mesh(ticketGeometry, ticketMaterial);
    ticketMesh.castShadow = true;
    ticketMesh.receiveShadow = true;
    mainGroup.add(ticketMesh);

    // Golden Accent Frame / Strip on Ticket
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Champagne Gold
      metalness: 0.9,
      roughness: 0.2,
    });

    const stripGeometry = new THREE.BoxGeometry(0.06, ticketHeight - 0.2, ticketDepth + 0.04);
    const stripMesh = new THREE.Mesh(stripGeometry, goldMaterial);
    stripMesh.position.set(-ticketWidth / 2 + 0.5, 0, 0);
    mainGroup.add(stripMesh);

    // Decorative Holographic Ring behind Ticket
    const ringGeometry = new THREE.TorusGeometry(2.4, 0.015, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.8,
      roughness: 0.1,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 3;
    scene.add(ringMesh);

    // Second Subtle Inner Gold Ring
    const goldRingGeo = new THREE.TorusGeometry(1.9, 0.008, 16, 80);
    const goldRingMesh = new THREE.Mesh(goldRingGeo, goldMaterial);
    goldRingMesh.rotation.y = Math.PI / 4;
    scene.add(goldRingMesh);

    // 5. 3D Particles Field (Minimalist Geometric Dust)
    const particleCount = 70;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 6. Interactive Mouse & Motion State
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouseX = (x / width - 0.5) * 2;
      mouseY = -(y / height - 0.5) * 2;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // 7. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth Lerp Mouse Reactivity
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Base Floating Motion
      const floatY = Math.sin(elapsedTime * 1.5) * 0.15;
      const floatX = Math.cos(elapsedTime * 1.2) * 0.08;

      // Rotate Main Ticket Pass
      mainGroup.position.y = floatY;
      mainGroup.position.x = floatX;
      mainGroup.rotation.y = targetX * 0.45 + Math.sin(elapsedTime * 0.5) * 0.1;
      mainGroup.rotation.x = -targetY * 0.35 + Math.cos(elapsedTime * 0.5) * 0.05;

      // Rotate Rings in 3D Space
      ringMesh.rotation.z = elapsedTime * 0.08;
      goldRingMesh.rotation.x = elapsedTime * 0.12;
      goldRingMesh.rotation.z = elapsedTime * 0.05;

      // Gently Rotate Particles
      particleSystem.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      ticketGeometry.dispose();
      ticketMaterial.dispose();
      goldMaterial.dispose();
      stripGeometry.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      goldRingGeo.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[480px] flex items-center justify-center">
      {/* Three.js Render Target Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Subtle Minimalist Glass Backdrop Overlay */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-stone-900/40 backdrop-blur-md border border-stone-700/30 text-[11px] font-medium tracking-widest text-stone-300 uppercase flex items-center gap-2 shadow-xl">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        Interactive 3D Stage • Drag to Explore
      </div>
    </div>
  );
}
