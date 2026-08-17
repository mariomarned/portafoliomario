/**
 * PORTAFOLIO MARIO MARTÍNEZ & NED SYSTEM — DESARROLLO DE SOFTWARE FULL STACK
 * Lógica e interactividad: Partículas ambientales, Filtro de proyectos,
 * Modales de detalles, y Enlaces dinámicos a WhatsApp, Correo y Tiendas oficiales.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initNavbarScroll();
  initMobileMenu();
  initScrollReveal();
  initProjectFilters();
  initProjectModals();
  initContactForm();
  initCurrentYear();
});

/* ==========================================================================
   1. Canvas Ambiental con Malla de Puntos & Conexiones Sutiles
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambientCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  const particleCount = 45;
  const maxDistance = 140;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.5 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(79, 70, 229, 0.28)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const opacity = (1 - dist / maxDistance) * 0.12;
          ctx.strokeStyle = `rgba(79, 70, 229, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Barra de Navegación Dinámica en Scroll
   ========================================================================== */
function initNavbarScroll() {
  const header = document.querySelector('.header-nav');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   3. Menú Móvil Hamburguesa
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

/* ==========================================================================
   4. Scroll Reveal Animations (Intersection Observer)
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Disparar animación de barras de habilidad
        const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
        skillBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width') || '85%';
          bar.style.width = targetWidth;
        });
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. Filtro de Proyectos
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   6. Base de Datos & Modales de Proyectos
   ========================================================================== */
const projectsData = {
  ned: {
    title: "NED System & NED Leal",
    subtitle: "Red Social Tipo Marketplace & Ecosistema de Fidelización",
    image: "assets/proyectos/appned.png",
    category: "Móvil (Android & iOS) · Web Full Stack · Desarrollado por Mario & NED System",
    description: "Plataforma integral de lealtad y marketplace comercial desarrollada y operada por Mario Martínez y el equipo de NED System. Conecta a miles de consumidores con comercios aliados permitiendo acumular puntos, canjear recompensas, acceder a descuentos y participar en sorteos automáticos.",
    architecture: [
      "Desarrollado y publicado por Mario Martínez & equipo NED System en Google Play Store y Apple App Store.",
      "Backend transaccional de alta concurrencia con arquitectura de microservicios y REST APIs.",
      "Base de datos relacional optimizada para auditoría de transacciones de puntos y lealtad.",
      "Sistema de notificaciones push en tiempo real y geolocalización de comercios aliados.",
      "Panel de administración web para comerciantes y analítica de clientes en tiempo real."
    ],
    stack: ["React Native / Flutter", "Node.js / Express", "PostgreSQL", "Firebase Cloud Messaging", "AWS / Docker", "REST APIs"],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.nedsystem.movil",
      appStore: "https://apps.apple.com/app/nedleal/id6760373778",
      web: "https://ned.mobi"
    }
  },
  admiris: {
    title: "ADMIRIS S.A.S.",
    subtitle: "Plataforma Institucional & Soluciones en Gestión de Riesgos",
    image: "assets/proyectos/admiris.png",
    category: "Desarrollo Web Full Stack · Diseño UI/UX · Desarrollado por Mario & NED System",
    description: "Portal digital corporativo desarrollado por Mario Martínez y el equipo de NED System para la firma de consultoría en sistemas de protección contra incendios (bajo normas NFPA y FM Global), auditorías técnicas y gestión integral de riesgos industriales.",
    architecture: [
      "Arquitectura Frontend moderna, responsiva y orientada a la conversión corporativa.",
      "Diseño UI/UX sobrio y corporativo que transmite solidez y autoridad técnica.",
      "Optimización avanzada de Core Web Vitals, velocidad de carga (LCP/CLS) y SEO semántico.",
      "Integración de canales de atención y acceso unificado al software ADMI-RISK."
    ],
    stack: ["HTML5 Semántico", "CSS3 Moderno", "JavaScript ES6+", "Arquitectura Modular", "SEO Optimization"],
    links: {
      web: "https://admiris.co/index.html"
    }
  },
  admirisk: {
    title: "WebAdmirisk",
    subtitle: "Software Empresarial de Gestión de Riesgos (ISO 31000)",
    image: "assets/proyectos/admirisk.png",
    category: "Software Empresarial / Cloud · Dashboards · Desarrollado por Mario & NED System",
    description: "Software corporativo desarrollado a medida por Mario Martínez y el equipo de NED System para la valoración técnica de riesgos industriales (Risk Assessment), cálculo de estudios PML/EML y auditorías en tiempo real con parametrización total.",
    architecture: [
      "Entorno web/escritorio seguro con control de acceso basado en roles (RBAC) y cifrado de datos.",
      "Motor analítico para generación de matrices de riesgo dinámicas según estándares internacionales.",
      "Generación automatizada de reportes técnicos ejecutivos y auditoría de siniestros.",
      "Dashboards interactivos con métricas de vulnerabilidad, impacto y planes de mitigación."
    ],
    stack: ["JavaScript Avanzado", "RESTful Backend", "Motor de Matrices ISO 31000", "Data Visualization", "SQL Database"],
    links: {
      web: "https://webadmirisk.admiris.co"
    }
  },
  perlad: {
    title: "PERLAD",
    subtitle: "Aplicación Web Moderna — Innovación Sostenible en Cartón Panal",
    image: "assets/proyectos/perlad.png",
    category: "Desarrollo Web Next.js · UI/UX · Desarrollado por Mario & NED System",
    description: "Aplicación web de alto rendimiento desarrollada en Next.js por Mario Martínez y el equipo de NED System para la presentación interactiva y cotización de empaques ecológicos y estructuras sustentables de cartón panal.",
    architecture: [
      "Construido sobre Next.js con Server-Side Rendering (SSR) y optimización de imágenes Next Image.",
      "Diseño UI/UX con estética hexagonal representativa de la marca y micro-animaciones fluidas.",
      "Módulo interactivo de exploración de productos (Packingboard, Graphicboard, Papel Panal).",
      "Cotizador dinámico de especificaciones técnicas para clientes industriales."
    ],
    stack: ["Next.js", "React", "TailwindCSS / CSS Custom", "Vercel Edge Deployment", "Web Performance"],
    links: {
      web: "https://perlad.vercel.app"
    }
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const closeBtn = document.querySelector('.modal-close-btn');
  const triggerBtns = document.querySelectorAll('.open-project-modal');

  if (!modalOverlay) return;

  function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    const modalImg = document.getElementById('modalImg');
    if (modalImg && data.image) {
      modalImg.src = data.image;
      modalImg.alt = data.title;
      if (modalImg.parentElement) modalImg.parentElement.style.display = 'block';
    } else if (modalImg && modalImg.parentElement) {
      modalImg.parentElement.style.display = 'none';
    }

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalSubtitle').textContent = data.subtitle;
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalDesc').textContent = data.description;

    // Arquitectura
    const archList = document.getElementById('modalArchList');
    archList.innerHTML = '';
    data.architecture.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${item}</span>
      `;
      archList.appendChild(li);
    });

    // Tech Stack
    const stackWrap = document.getElementById('modalStackPills');
    stackWrap.innerHTML = '';
    data.stack.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'stack-pill';
      span.textContent = tech;
      stackWrap.appendChild(span);
    });

    // Action Links
    const actionsWrap = document.getElementById('modalActionButtons');
    actionsWrap.innerHTML = '';

    if (data.links.playStore) {
      const aPlay = document.createElement('a');
      aPlay.href = data.links.playStore;
      aPlay.target = '_blank';
      aPlay.rel = 'noopener';
      aPlay.className = 'store-btn';
      aPlay.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a1.986 1.986 0 0 1-.22-.924V2.738c0-.348.08-.669.22-.924zm11.241 11.244l2.57 2.57-11.45 6.552 8.88-9.122zm0-2.116L5.97 1.82l11.45 6.552-2.57 2.57zm1.48 1.48l3.785 2.166a1.32 1.32 0 0 0 0-2.316L16.33 12.422z"/></svg>
        <span>Google Play</span>
      `;
      actionsWrap.appendChild(aPlay);
    }

    if (data.links.appStore) {
      const aApp = document.createElement('a');
      aApp.href = data.links.appStore;
      aApp.target = '_blank';
      aApp.rel = 'noopener';
      aApp.className = 'store-btn';
      aApp.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.56.64-1.04 1.7-0.92 2.72 1.02.08 2.05-.48 2.65-1.22z"/></svg>
        <span>App Store</span>
      `;
      actionsWrap.appendChild(aApp);
    }

    if (data.links.web) {
      const aWeb = document.createElement('a');
      aWeb.href = data.links.web;
      aWeb.target = '_blank';
      aWeb.rel = 'noopener';
      aWeb.className = 'btn btn-primary btn-sm';
      aWeb.innerHTML = `
        <span>Visitar Sitio / App</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      `;
      actionsWrap.appendChild(aWeb);
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. Cotizador / Estimador de Proyectos Interactivo
   ========================================================================== */
function initEstimatorCalculator() {
  const choices = document.querySelectorAll('.estimator-choice');
  const priceDisplay = document.getElementById('estimatedPrice');
  const timeDisplay = document.getElementById('estimatedTimeline');
  const scopeDisplay = document.getElementById('estimatedScope');
  const whatsappCta = document.getElementById('estimatorWhatsappBtn');

  if (!priceDisplay || !whatsappCta) return;

  function calculate() {
    let basePriceMin = 1200;
    let basePriceMax = 2500;
    let baseWeeksMin = 3;
    let baseWeeksMax = 6;
    let selectedPlatform = "Plataforma Web";
    let selectedFeatures = [];

    // Tipo de Plataforma
    const platformActive = document.querySelector('.estimator-choice[data-type="platform"].selected');
    if (platformActive) {
      const platformVal = platformActive.getAttribute('data-value');
      if (platformVal === 'mobile') {
        basePriceMin = 1800;
        basePriceMax = 3800;
        baseWeeksMin = 4;
        baseWeeksMax = 8;
        selectedPlatform = "App Móvil (Android & iOS)";
      } else if (platformVal === 'fullstack') {
        basePriceMin = 2400;
        basePriceMax = 4900;
        baseWeeksMin = 5;
        baseWeeksMax = 10;
        selectedPlatform = "Ecosistema Full Stack (Web + Backend + Móvil)";
      } else if (platformVal === 'desktop') {
        basePriceMin = 1600;
        basePriceMax = 3200;
        baseWeeksMin = 4;
        baseWeeksMax = 7;
        selectedPlatform = "Software de Escritorio / Cloud Empresarial";
      } else {
        basePriceMin = 1000;
        basePriceMax = 2200;
        baseWeeksMin = 2;
        baseWeeksMax = 5;
        selectedPlatform = "Aplicación Web SaaS / E-commerce";
      }
    }

    // Funcionalidades adicionales
    const featureActives = document.querySelectorAll('.estimator-choice[data-type="feature"].selected');
    featureActives.forEach(f => {
      const cost = parseInt(f.getAttribute('data-cost') || '0', 10);
      const weeks = parseInt(f.getAttribute('data-weeks') || '0', 10);
      basePriceMin += cost;
      basePriceMax += Math.round(cost * 1.35);
      baseWeeksMin += weeks;
      baseWeeksMax += Math.round(weeks * 1.3);
      selectedFeatures.push(f.querySelector('.choice-label').textContent.trim());
    });

    // Actualizar UI
    priceDisplay.textContent = `$${basePriceMin.toLocaleString()} - $${basePriceMax.toLocaleString()} USD`;
    timeDisplay.textContent = `${baseWeeksMin} a ${baseWeeksMax} semanas`;
    scopeDisplay.textContent = selectedPlatform;

    // Generar enlace personalizado de WhatsApp
    const phone = "573024647165"; // Número de contacto directo profesional
    const featuresText = selectedFeatures.length > 0 ? `\n• Funcionalidades clave: ${selectedFeatures.join(', ')}` : '';
    const message = `Hola Mario! 👋 Estuve revisando tu portafolio y coticé un proyecto con el siguiente alcance:\n\n• Tipo: ${selectedPlatform}${featuresText}\n• Estimado estimado: $${basePriceMin.toLocaleString()} - $${basePriceMax.toLocaleString()} USD (${baseWeeksMin}-${baseWeeksMax} semanas).\n\n¿Podemos conversar para revisar los detalles técnicos y fecha de inicio?`;

    whatsappCta.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  choices.forEach(choice => {
    choice.addEventListener('click', () => {
      const type = choice.getAttribute('data-type');
      if (type === 'platform') {
        document.querySelectorAll(`.estimator-choice[data-type="platform"]`).forEach(c => c.classList.remove('selected'));
        choice.classList.add('selected');
      } else {
        choice.classList.toggle('selected');
      }
      calculate();
    });
  });

  calculate();
}

/* ==========================================================================
   8. Formulario de Contacto Directo (Email a mmartinez@ned.mobi & WhatsApp)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const btnSendWhatsapp = document.getElementById('btnSendWhatsappDirect');
  const statusMsg = document.getElementById('formStatusMsg');
  if (!form) return;

  const phone = "573011631422";
  const recipientEmail = "mmartinez@ned.mobi";

  // Envío por Correo Electrónico (AJAX directo a FormSubmit / mmartinez@ned.mobi)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('btnSubmitForm') || form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
      <span>Enviando mensaje a Mario &amp; NED System...</span>
    `;

    try {
      const formData = new FormData(form);
      const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        submitBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>¡Mensaje Enviado con Éxito!</span>
        `;
        submitBtn.classList.remove('btn-primary');
        submitBtn.classList.add('btn-emerald');

        if (statusMsg) {
          statusMsg.style.display = 'block';
          statusMsg.style.background = '#ecfdf5';
          statusMsg.style.color = '#059669';
          statusMsg.style.border = '1px solid rgba(5, 150, 105, 0.2)';
          statusMsg.textContent = '¡Gracias por contactarnos! Mario y el equipo de NED System hemos recibido tu mensaje y te responderemos en breve.';
        }

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.classList.add('btn-primary');
          submitBtn.classList.remove('btn-emerald');
          submitBtn.disabled = false;
          form.reset();
          if (statusMsg) statusMsg.style.display = 'none';
        }, 5000);
      } else {
        throw new Error('Error al enviar formulario');
      }
    } catch (err) {
      // Si ocurre algún bloqueo de red, redirigir a WhatsApp como fallback garantizado
      const name = document.getElementById('formName').value;
      const email = document.getElementById('formEmail').value;
      const phoneInput = document.getElementById('formPhone') ? document.getElementById('formPhone').value : '';
      const projectType = document.getElementById('formProjectType').value;
      const message = document.getElementById('formMessage').value;

      const waText = `Hola Mario y equipo NED System! 👋 Mi nombre es *${name}* (${email}${phoneInput ? ` - Tel: ${phoneInput}` : ''}).\nMe gustaría cotizar un desarrollo de tipo *${projectType}*:\n\n"${message}"`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(waText)}`, '_blank');

      submitBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>Redirigiendo a WhatsApp...</span>
      `;
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 4000);
    }
  });

  // Botón directo para enviar por WhatsApp
  if (btnSendWhatsapp) {
    btnSendWhatsapp.addEventListener('click', () => {
      const name = document.getElementById('formName').value || 'Un cliente potencial';
      const email = document.getElementById('formEmail').value || 'No especificado';
      const phoneInput = document.getElementById('formPhone') ? document.getElementById('formPhone').value : '';
      const projectType = document.getElementById('formProjectType').value;
      const message = document.getElementById('formMessage').value || 'Hola Mario y equipo NED System, me gustaría consultar sobre el desarrollo de un proyecto.';

      const waText = `Hola Mario y equipo NED System! 👋 Mi nombre es *${name}* (${email}${phoneInput ? ` - Tel: ${phoneInput}` : ''}).\nMe interesa cotizar un proyecto de tipo *${projectType}*:\n\n"${message}"`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(waText)}`, '_blank');
    });
  }
}

/* ==========================================================================
   9. Año actual dinámico
   ========================================================================== */
function initCurrentYear() {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
