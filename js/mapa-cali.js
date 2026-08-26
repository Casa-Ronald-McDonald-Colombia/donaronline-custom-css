/* CRMD · Casa Cali · Mapa interactivo (Apadrina un espacio)
   JS externo para evitar el WAF de Cloudflare (que bloquea JS inline).
   El HTML+CSS van en el widget; este archivo se llama con <script src>. */
(function () {
  function init() {
    const casa = document.getElementById('crmdCasa');
    const modal = document.getElementById('crmdModal');
    if (!casa || !modal) return;

    const ANCLA_DONAR = '#formulario-donacion';

    const ESPACIOS = [
      { nombre: '13 Habitaciones privadas', tab: 'Habitaciones', impacto: 'Alojamos a más de 20 familias al mes.',
        desc: 'Reparar las habitaciones nos permite devolverles privacidad, dignidad y un descanso seguro.',
        donarTxt: 'Apadrinar una habitación', link: ANCLA_DONAR, x: 21, y: 47 },
      { nombre: 'Cocina totalmente equipada', tab: 'Cocina', impacto: 'Facilita la preparación de más de 1.900 raciones de comida casera al mes.',
        desc: 'El corazón de la Casa. Permite a los padres preparar alimentos caseros y nutritivos para sus hijos, conservando el calor de hogar y ahorrando costos diarios.',
        donarTxt: 'Apadrinar la Cocina', link: ANCLA_DONAR, x: 42, y: 48 },
      { nombre: 'Baños equipados con ducha', tab: 'Baños', impacto: 'Servicio para más de 1.200 personas al mes.',
        desc: 'Instalaciones sanitarias adaptadas, limpias y seguras para el aseo diario de los pequeños y sus familias.',
        donarTxt: 'Apadrinar la zona de baños', link: ANCLA_DONAR, x: 59, y: 50 },
      { nombre: 'Zona de lavandería', tab: 'Lavandería', impacto: 'Utilizada en más de 90 ciclos de lavado al mes.',
        desc: 'Equipada con lavadoras y secadoras para que las familias mantengan la higiene y ropa limpia de sus hijos en todo momento sin gastos adicionales.',
        donarTxt: 'Apadrinar la lavandería', link: ANCLA_DONAR, x: 16, y: 76 },
      { nombre: 'Zona de juegos', tab: 'Juegos', impacto: 'Beneficia a 18 niños en promedio en actividades recreativas al mes (pacientes y acompañantes).',
        desc: 'Un rincón lleno de color y juguetes donde los niños siguen siendo niños, olvidándose por un momento de los procedimientos médicos.',
        donarTxt: 'Apadrinar la zona de juegos', link: ANCLA_DONAR, x: 38, y: 77 },
      { nombre: 'Zona de descanso', tab: 'Descanso', impacto: 'Brinda apoyo emocional a 30 cuidadores en promedio al mes.',
        desc: 'Un espacio de tranquilidad y apoyo emocional para que los cuidadores recarguen fuerzas, compartan sus vivencias con otros padres y reduzcan su nivel de estrés.',
        donarTxt: 'Apadrinar la zona de descanso', link: ANCLA_DONAR, x: 59, y: 79 },
    ];

    const $ = (id) => document.getElementById(id);
    const tabsWrap = $('crmdTabs');

    ESPACIOS.forEach((e) => {
      const b = document.createElement('button');
      b.className = 'crmd-hotspot';
      b.style.left = e.x + '%'; b.style.top = e.y + '%';
      b.setAttribute('aria-label', 'Ver ' + e.nombre);
      b.textContent = '+';
      b.addEventListener('click', () => abrir(e));
      casa.appendChild(b);

      const tab = document.createElement('button');
      tab.className = 'crmd-tab';
      tab.textContent = e.tab || e.nombre;
      tab.addEventListener('click', () => abrir(e));
      if (tabsWrap) tabsWrap.appendChild(tab);
    });

    function abrir(e) {
      $('crmdTitulo').textContent = e.nombre || '';
      $('crmdImpacto').textContent = e.impacto || '';
      $('crmdDesc').textContent = e.desc || '';
      $('crmdBtn').href = e.link || '#';
      $('crmdBtnTxt').textContent = e.donarTxt || ('Apadrinar ' + (e.nombre || ''));
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
    function cerrar() { modal.hidden = true; document.body.style.overflow = ''; }

    modal.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', cerrar));
    $('crmdBtn').addEventListener('click', cerrar);
    document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') cerrar(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
