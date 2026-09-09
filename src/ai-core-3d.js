import * as THREE from 'three';

/**
 * WebloqAI — Interactive 3D AI Core & Automation Network
 * 
 * Features:
 * - Floating central AI Core with dual-layer geometric wireframe + emissive pulsing inner core
 * - 8 Orbiting Automation Nodes representing business systems
 * - Dynamic animated data streams (Bezier splines) with traveling energy packets
 * - Interactive raycasting: hover highlights node and updates DOM tooltip
 * - Mouse parallax and camera depth easing
 * - Graceful fallback when WebGL is unavailable or prefers-reduced-motion is active
 */
export function initAICore3D() {
    const canvas = document.getElementById('ai-core-canvas');
    const container = document.getElementById('ai-core-container');
    const tooltipEl = document.getElementById('ai-core-tooltip');
    
    if (!canvas || !container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Node configuration
    const nodesData = [
        {
            id: 'whatsapp',
            label: 'WhatsApp AI',
            category: 'Customer Conversations',
            desc: 'Autonomous 24/7 conversations, lead qualification, and instant appointment booking.',
            color: 0x22D3EE, // Bright Cyan
            radius: 4.8,
            speed: 0.28,
            orbitAngle: 0.2,
            orbitTilt: 0.15,
            scale: 0.65
        },
        {
            id: 'leads',
            label: 'Lead Engine',
            category: 'Inbound Intelligence',
            desc: 'Captures, enriches, qualifies, and scores inbound leads across all channels.',
            color: 0x38BDF8, // Light Blue
            radius: 5.6,
            speed: -0.22,
            orbitAngle: 1.5,
            orbitTilt: -0.25,
            scale: 0.6
        },
        {
            id: 'crm',
            label: 'CRM Sync',
            category: 'Data Hygiene',
            desc: 'Converts unstructured conversations into clean HubSpot/Salesforce pipeline records.',
            color: 0x60A5FA, // Sky Blue
            radius: 4.2,
            speed: 0.35,
            orbitAngle: 2.8,
            orbitTilt: 0.3,
            scale: 0.58
        },
        {
            id: 'voice',
            label: 'Voice Agent',
            category: 'Autonomous Calling',
            desc: 'Sub-400ms latency natural voice agents for inbound triage and outbound follow-ups.',
            color: 0x2563EB, // Electric Blue
            radius: 6.2,
            speed: -0.18,
            orbitAngle: 3.9,
            orbitTilt: -0.12,
            scale: 0.62
        },
        {
            id: 'calendar',
            label: 'Scheduling',
            category: 'Autonomous Booking',
            desc: 'Zero-back-and-forth appointment booking with timezone and conflict resolution.',
            color: 0x22D3EE,
            radius: 5.0,
            speed: 0.24,
            orbitAngle: 4.7,
            orbitTilt: 0.35,
            scale: 0.55
        },
        {
            id: 'agent',
            label: 'Digital Worker',
            category: 'Internal Reasoning',
            desc: 'Multi-step autonomous agent executing research, reporting, and operational ETL.',
            color: 0x818CF8, // Indigo
            radius: 6.8,
            speed: -0.15,
            orbitAngle: 5.6,
            orbitTilt: -0.2,
            scale: 0.65
        },
        {
            id: 'database',
            label: 'Knowledge Base',
            category: 'Proprietary RAG',
            desc: 'Secure vector database storing your company FAQs, SOPs, pricing, and documentation.',
            color: 0x38BDF8,
            radius: 4.5,
            speed: 0.31,
            orbitAngle: 1.0,
            orbitTilt: -0.3,
            scale: 0.56
        },
        {
            id: 'email',
            label: 'Omnichannel',
            category: 'Outreach & Follow-up',
            desc: 'Context-aware email and SMS sequences triggered dynamically by prospect intent.',
            color: 0x2563EB,
            radius: 5.9,
            speed: -0.26,
            orbitAngle: 2.3,
            orbitTilt: 0.18,
            scale: 0.58
        }
    ];

    // Setup Scene, Camera & Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070D, 0.04);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 18 : 14);

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: !isMobile,
            powerPreference: 'high-performance'
        });
    } catch (e) {
        console.warn('WebGL initialization failed:', e);
        if (container) container.classList.add('webgl-fallback');
        return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));

    // Group to hold all 3D objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ==========================================
    // 1. CENTRAL AI CORE
    // ==========================================
    const coreGroup = new THREE.Group();
    mainGroup.add(coreGroup);

    // Inner glowing sphere
    const innerSphereGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const innerSphereMat = new THREE.MeshBasicMaterial({
        color: 0x22D3EE,
        wireframe: false,
        transparent: true,
        opacity: 0.85
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    coreGroup.add(innerSphere);

    // Middle geometric icosahedron (wireframe lattice)
    const icoGeo = new THREE.IcosahedronGeometry(1.7, 1);
    const icoMat = new THREE.MeshBasicMaterial({
        color: 0x38BDF8,
        wireframe: true,
        transparent: true,
        opacity: 0.45
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    // Outer geometric dodecahedron
    const dodecGeo = new THREE.DodecahedronGeometry(2.1, 0);
    const dodecMat = new THREE.MeshBasicMaterial({
        color: 0x2563EB,
        wireframe: true,
        transparent: true,
        opacity: 0.25
    });
    const dodecMesh = new THREE.Mesh(dodecGeo, dodecMat);
    coreGroup.add(dodecMesh);

    // Rotating Orbital Data Rings around Core
    const createRing = (radius, tiltX, tiltY, color, opacity) => {
        const ringGeo = new THREE.RingGeometry(radius - 0.02, radius + 0.02, 64);
        const ringMat = new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: opacity
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = tiltX;
        ring.rotation.y = tiltY;
        coreGroup.add(ring);
        return ring;
    };

    const ring1 = createRing(2.6, Math.PI / 3, 0.2, 0x22D3EE, 0.4);
    const ring2 = createRing(3.0, -Math.PI / 4, 0.5, 0x2563EB, 0.3);
    const ring3 = createRing(3.4, Math.PI / 6, -0.4, 0x38BDF8, 0.2);

    // ==========================================
    // 2. ORBITING AUTOMATION NODES & DATA STREAMS
    // ==========================================
    const nodeMeshes = [];
    const streamCurves = [];
    const dataPackets = [];

    // Particle sprite generator for node glow
    function createGlowTexture(colorStr = '#22D3EE') {
        const c = document.createElement('canvas');
        c.width = 64;
        c.height = 64;
        const ctx = c.getContext('2d');
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, colorStr);
        grad.addColorStop(0.3, colorStr);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
        const tex = new THREE.CanvasTexture(c);
        return tex;
    }

    const nodeGlowTex = createGlowTexture('#22D3EE');

    nodesData.forEach((data, index) => {
        const nodeHolder = new THREE.Group();

        // Central node sphere
        const sphereGeo = new THREE.SphereGeometry(data.scale * 0.5, 24, 24);
        const sphereMat = new THREE.MeshBasicMaterial({
            color: data.color,
            transparent: true,
            opacity: 0.9
        });
        const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
        sphereMesh.userData = data; // store metadata for raycasting
        nodeHolder.add(sphereMesh);

        // Surrounding orbital wireframe ring
        const ringGeo = new THREE.RingGeometry(data.scale * 0.65, data.scale * 0.72, 32);
        const ringMat = new THREE.MeshBasicMaterial({
            color: data.color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5
        });
        const nodeRing = new THREE.Mesh(ringGeo, ringMat);
        nodeRing.rotation.x = Math.PI / 2.5;
        nodeHolder.add(nodeRing);

        // Glowing billboard halo sprite
        const spriteMat = new THREE.SpriteMaterial({
            map: nodeGlowTex,
            color: data.color,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.scale.set(data.scale * 2.2, data.scale * 2.2, 1);
        nodeHolder.add(sprite);

        mainGroup.add(nodeHolder);
        nodeMeshes.push({ holder: nodeHolder, hitMesh: sphereMesh, data: data, ring: nodeRing });

        // Create Stream Line between Core (0,0,0) and Node position
        const streamGeo = new THREE.BufferGeometry();
        const streamCount = 40;
        const positions = new Float32Array(streamCount * 3);
        streamGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const streamMat = new THREE.LineBasicMaterial({
            color: data.color,
            transparent: true,
            opacity: 0.28,
            linewidth: 1
        });
        const streamLine = new THREE.Line(streamGeo, streamMat);
        mainGroup.add(streamLine);

        streamCurves.push({
            line: streamLine,
            nodeIndex: index,
            count: streamCount
        });

        // Add traveling energy packets along this curve
        for (let p = 0; p < (isMobile ? 1 : 2); p++) {
            const packetGeo = new THREE.SphereGeometry(0.08, 8, 8);
            const packetMat = new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                transparent: true,
                opacity: 0.95
            });
            const packetMesh = new THREE.Mesh(packetGeo, packetMat);
            mainGroup.add(packetMesh);

            dataPackets.push({
                mesh: packetMesh,
                nodeIndex: index,
                progress: (p * 0.5 + index * 0.12) % 1,
                speed: 0.008 + (index % 3) * 0.003
            });
        }
    });

    // ==========================================
    // 3. BACKGROUND ENERGY PARTICLES
    // ==========================================
    const particleCount = isMobile ? 80 : 200;
    const particleGeo = new THREE.BufferGeometry();
    const particleCoords = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        particleCoords[i] = (Math.random() - 0.5) * 26;
        particleCoords[i + 1] = (Math.random() - 0.5) * 20;
        particleCoords[i + 2] = (Math.random() - 0.5) * 16 - 2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particleCoords, 3));

    const particleMat = new THREE.PointsMaterial({
        color: 0x22D3EE,
        size: 0.12,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ==========================================
    // 4. INTERACTIVITY & RAYCASTING
    // ==========================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let targetMouse = { x: 0, y: 0 };
    let currentMouse = { x: 0, y: 0 };
    let hoveredNode = null;

    const onPointerMove = (e) => {
        const rect = container.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

        targetMouse.x = (clientX / window.innerWidth - 0.5) * 2;
        targetMouse.y = (clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    // Handle Resize
    const onResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.position.z = window.innerWidth < 768 ? 18 : 14;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ==========================================
    // 5. ANIMATION LOOP
    // ==========================================
    let clock = new THREE.Clock();
    let isRunning = true;

    function animate() {
        if (!isRunning) return;
        requestAnimationFrame(animate);

        const delta = clock.getDelta();
        const elapsed = clock.getElapsedTime();

        currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
        currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;

        if (!prefersReducedMotion) {
            mainGroup.rotation.y = currentMouse.x * 0.35 + elapsed * 0.05;
            mainGroup.rotation.x = -currentMouse.y * 0.25;

            // Core rotations
            innerSphere.rotation.y += delta * 0.6;
            icoMesh.rotation.y -= delta * 0.4;
            icoMesh.rotation.x += delta * 0.2;
            dodecMesh.rotation.z += delta * 0.3;

            // Core Pulse
            const pulse = 1 + Math.sin(elapsed * 2.5) * 0.06;
            innerSphere.scale.set(pulse, pulse, pulse);

            // Ring rotations
            ring1.rotation.z += delta * 0.25;
            ring2.rotation.z -= delta * 0.3;
            ring3.rotation.z += delta * 0.15;
        }

        // Update Orbital Nodes
        nodeMeshes.forEach((item, idx) => {
            const d = item.data;
            let currentAngle = d.orbitAngle;
            if (!prefersReducedMotion) {
                currentAngle += elapsed * d.speed * 0.8;
            }

            const x = Math.cos(currentAngle) * d.radius;
            const z = Math.sin(currentAngle) * d.radius;
            const y = Math.sin(currentAngle + idx) * (d.radius * d.orbitTilt);

            item.holder.position.set(x, y, z);
            item.ring.rotation.z += delta * 0.5;

            // Update Stream Line (Bezier curve from core 0,0,0 to node position)
            const stream = streamCurves[idx];
            const positions = stream.line.geometry.attributes.position.array;
            const count = stream.count;

            const midX = x * 0.5 + (Math.sin(elapsed + idx) * 0.4);
            const midY = y * 0.5 + 1.2;
            const midZ = z * 0.5;

            for (let i = 0; i < count; i++) {
                const t = i / (count - 1);
                const invT = 1 - t;
                const px = 2 * invT * t * midX + t * t * x;
                const py = 2 * invT * t * midY + t * t * y;
                const pz = 2 * invT * t * midZ + t * t * z;

                positions[i * 3] = px;
                positions[i * 3 + 1] = py;
                positions[i * 3 + 2] = pz;
            }
            stream.line.geometry.attributes.position.needsUpdate = true;
        });

        // Update Data Packets
        dataPackets.forEach(packet => {
            if (!prefersReducedMotion) {
                packet.progress = (packet.progress + packet.speed) % 1;
            }
            const nodeMesh = nodeMeshes[packet.nodeIndex];
            const targetPos = nodeMesh.holder.position;

            const t = packet.progress;
            const invT = 1 - t;
            const midX = targetPos.x * 0.5;
            const midY = targetPos.y * 0.5 + 1.2;
            const midZ = targetPos.z * 0.5;

            packet.mesh.position.x = 2 * invT * t * midX + t * t * targetPos.x;
            packet.mesh.position.y = 2 * invT * t * midY + t * t * targetPos.y;
            packet.mesh.position.z = 2 * invT * t * midZ + t * t * targetPos.z;
        });

        // Raycasting for Node Hover
        raycaster.setFromCamera(mouse, camera);
        const hitObjects = nodeMeshes.map(n => n.hitMesh);
        const intersects = raycaster.intersectObjects(hitObjects);

        if (intersects.length > 0) {
            const hit = intersects[0].object;
            const nodeInfo = hit.userData;

            if (hoveredNode !== nodeInfo.id) {
                hoveredNode = nodeInfo.id;
                document.body.style.cursor = 'pointer';
                hit.scale.set(1.4, 1.4, 1.4);

                if (tooltipEl) {
                    tooltipEl.innerHTML = `
                        <div class="hud-tag"><span></span>${nodeInfo.category.toUpperCase()}</div>
                        <div class="hud-title">${nodeInfo.label}</div>
                        <div class="hud-desc">${nodeInfo.desc}</div>
                        <div class="hud-status">STATUS: <span class="active-pulse">● LIVE RUNTIME</span></div>
                    `;
                    tooltipEl.classList.add('visible');
                }
            }

            if (tooltipEl) {
                const screenPos = hit.getWorldPosition(new THREE.Vector3());
                screenPos.project(camera);
                const screenX = (screenPos.x * 0.5 + 0.5) * container.clientWidth;
                const screenY = (-(screenPos.y * 0.5) + 0.5) * container.clientHeight;

                tooltipEl.style.transform = `translate(${Math.min(container.clientWidth - 280, Math.max(20, screenX - 140))}px, ${Math.min(container.clientHeight - 160, Math.max(20, screenY - 120))}px)`;
            }
        } else {
            if (hoveredNode) {
                nodeMeshes.forEach(n => n.hitMesh.scale.set(1, 1, 1));
                hoveredNode = null;
                document.body.style.cursor = 'default';
                if (tooltipEl) tooltipEl.classList.remove('visible');
            }
        }

        renderer.render(scene, camera);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isRunning = entry.isIntersecting;
            if (isRunning) {
                clock.start();
                requestAnimationFrame(animate);
            } else {
                clock.stop();
            }
        });
    }, { threshold: 0.05 });

    observer.observe(container);
    requestAnimationFrame(animate);
}
