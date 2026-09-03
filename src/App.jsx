import { useState, useEffect, useRef } from "react";

const C = {
  primary:"#1A3A5C", navDark:"#0F2340", accent:"#2E86AB",
  gold:"#C9A84C", white:"#FFFFFF", light:"#E8F1F8",
  softbg:"#F4F8FB", border:"#DDE6EF", dark:"#1C1C1C",
  grey:"#6B7A8D", greyLight:"#A0ADB8",
  e1:"#E8A838", e2:"#2E86AB", e3:"#1A3A5C", e4:"#C9A84C",
  green:"#2E7D32", red:"#C0392B",
  greenBg:"#EEF7EE", redBg:"#FDF0EE",
};

function useWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 800);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

const GROUPS = [
  { id:"modelo",      label:"Modelo de Juego",  icon:"⚽" },
  { id:"cultura",     label:"Cultura del Club", icon:"❤️" },
  { id:"metodologia", label:"Metodología",      icon:"📅" },
];

const SECTIONS = [
  { id:"jerarquia",  label:"La Arquitectura",        icon:"🏗️", group:"modelo" },
  { id:"quienes",    label:"Quiénes Somos",         icon:"🏡", group:"modelo" },
  { id:"principios", label:"Los 6 Principios",      icon:"🎯", group:"modelo" },
  { id:"cuadrado",   label:"El Cuadrado Interior",  icon:"🔷", group:"modelo" },
  { id:"fases",      label:"Las 5 Fases del Juego",           icon:"🔄", group:"modelo" },
  { id:"progresion", label:"Progresión por Etapas", icon:"📈", group:"modelo" },
  { id:"jugador",    label:"El Jugador Canet F.C.", icon:"🌟", group:"modelo" },
  { id:"valores",    label:"Valores del Club",      icon:"💎", group:"cultura" },
  { id:"decaleg",    label:"Decálogo Entrenador",   icon:"📋", group:"cultura" },
  { id:"inneg",      label:"Innegociables Jugador", icon:"⚡", group:"cultura" },
  { id:"ciclo",      label:"El Ciclo Canet",        icon:"🔁", group:"metodologia" },
  { id:"aprendizaje", label:"Cómo Aprendemos",        icon:"🧠", group:"metodologia" },
  { id:"tareas",      label:"Cómo Diseñamos Tareas",  icon:"⚙️", group:"metodologia" },
  { id:"macro",       label:"Macrociclo",            icon:"🗓️", group:"metodologia" },
  { id:"aval",       label:"Evaluación",            icon:"📊", group:"metodologia" },
];

const ETAPAS = [
  { id:1, label:"E1", sub:"INICIACIÓN",       cats:"Escoleta · S8 · S9",              color:C.e1, dark:false, principio:"Relación libre y positiva con el balón" },
  { id:2, label:"E2", sub:"FAMILIARIZACIÓN",  cats:"S10 · S11 A/B",                   color:C.e2, dark:false, principio:"El pase con intención de cara al receptor" },
  { id:3, label:"E3", sub:"DESARROLLO",       cats:"S12 · S14 · S16 · Fem. base",     color:C.e3, dark:false, principio:"Generar y reconocer superioridad numérica" },
  { id:4, label:"E4", sub:"EXPRESIÓN",        cats:"Juvenil Masc · Juvenil Fem",      color:C.e4, dark:true,  principio:"Búsqueda y ejecución autónoma de superioridad en el carril central" },
];

function Fade({ id, children }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(false);
  useEffect(() => {
    ref.current = true;
    const t = setTimeout(() => { if (ref.current) setVis(true); }, 12);
    return () => { ref.current = false; clearTimeout(t); setVis(false); };
  }, [id]);
  return (
    <div style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(8px)", transition:"opacity 0.22s ease, transform 0.22s ease" }}>
      {children}
    </div>
  );
}

// ── HELPERS ───────────────────────────────────────────────────
const PageTitle = ({ icon, title, subtitle, mob }) => (
  <div style={{ textAlign:"center", marginBottom:mob?20:28, paddingBottom:mob?16:22, borderBottom:`1px solid ${C.border}` }}>
    <div style={{ fontSize:mob?28:34, marginBottom:8 }}>{icon}</div>
    <h1 style={{ fontSize:mob?20:24, fontWeight:900, color:C.primary, margin:"0 0 8px", letterSpacing:-0.5, lineHeight:1.25 }}>{title}</h1>
    {subtitle && <p style={{ fontSize:mob?11:12, color:C.grey, margin:0, lineHeight:1.7 }}>{subtitle}</p>}
  </div>
);

const GoldBar = ({ text, mob }) => (
  <div style={{ background:C.primary, borderRadius:10, padding:mob?"14px 16px":"16px 24px", textAlign:"center", marginTop:18, borderLeft:`4px solid ${C.gold}` }}>
    <p style={{ fontSize:mob?12:13, color:C.gold, fontWeight:700, fontStyle:"italic", lineHeight:1.8, margin:0 }}>"{text}"</p>
  </div>
);

const InfoBox = ({ icon, label, children, mob }) => (
  <div style={{ background:C.softbg, borderRadius:10, padding:mob?"12px 14px":"12px 16px", display:"flex", gap:10, alignItems:"flex-start", border:`1px solid ${C.border}`, marginTop:14 }}>
    <span style={{ fontSize:18, flexShrink:0 }}>{icon}</span>
    <div style={{ fontSize:mob?11:12, color:C.grey, lineHeight:1.72 }}>
      {label && <strong style={{ color:C.primary }}>{label} </strong>}
      {children}
    </div>
  </div>
);

const YesNo = ({ si, no, mob }) => (
  <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":"1fr 1fr", gap:12 }}>
    {[
      { bg:C.greenBg, border:C.green, icon:"✅", label:"LO QUE QUEREMOS VER",     items:si, color:C.green },
      { bg:C.redBg,   border:C.red,   icon:"❌", label:"LO QUE NO QUEREMOS VER",  items:no, color:C.red },
    ].map((col, ci) => (
      <div key={ci} style={{ background:col.bg, borderRadius:10, padding:"14px 16px", borderLeft:`3px solid ${col.border}` }}>
        <div style={{ fontSize:10, fontWeight:800, color:col.color, marginBottom:10, letterSpacing:0.5 }}>{col.icon} {col.label}</div>
        {col.items.map((item, i) => (
          <div key={i} style={{ display:"flex", gap:7, marginBottom:6 }}>
            <span style={{ color:col.color, fontWeight:700, flexShrink:0 }}>·</span>
            <span style={{ fontSize:mob?11:12, color:C.dark, lineHeight:1.65 }}>{item}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

const EtapaHeader = ({ etapa, extra, mob }) => (
  <div style={{ background:etapa.color, borderRadius:12, padding:mob?"14px 16px":"18px 22px", marginBottom:mob?16:20, display:"flex", justifyContent:"space-between", alignItems:mob?"flex-start":"center", flexDirection:mob?"column":"row", gap:10 }}>
    <div>
      <div style={{ fontSize:9, fontWeight:800, color:etapa.dark?C.primary:"rgba(255,255,255,0.65)", letterSpacing:2, textTransform:"uppercase", marginBottom:3 }}>{etapa.sub}</div>
      <div style={{ fontSize:mob?15:18, fontWeight:900, color:etapa.dark?C.primary:C.white }}>{etapa.label} · {etapa.cats}</div>
    </div>
    {extra || (
      <div style={{ background:etapa.dark?C.primary:"rgba(255,255,255,0.18)", borderRadius:8, padding:"8px 12px", width:mob?"100%":"auto" }}>
        <div style={{ fontSize:9, fontWeight:700, color:etapa.dark?C.gold:"rgba(255,255,255,0.65)", letterSpacing:1, marginBottom:2 }}>PRINCIPIO DOMINANTE</div>
        <div style={{ fontSize:11, color:C.white, fontWeight:600, lineHeight:1.5 }}>{etapa.principio}</div>
      </div>
    )}
  </div>
);

// ══════════════════════════════════════════════════════════════
// MODELO DE JUEGO
// ══════════════════════════════════════════════════════════════

// ── JERARQUÍA DEL MODELO ─────────────────────────────────────
const JerarquiaSection = ({ mob }) => {
  const niveles = [
    { label:"IDENTIDAD",       sub:"¿Qué club queremos ser?",              color:C.primary,   icon:"🏡" },
    { label:"PRINCIPIOS",      sub:"¿Cómo queremos jugar?",                color:C.accent,    icon:"🎯" },
    { label:"COMPORTAMIENTOS", sub:"¿Qué debe aparecer en el campo?",      color:"#6D28D9",   icon:"🔷" },
    { label:"CONTENIDOS",      sub:"¿Qué trabajamos cada mes?",            color:C.green,     icon:"📈" },
    { label:"TAREAS",          sub:"¿Qué situaciones diseñamos?",          color:C.gold,      icon:"⚙️" },
    { label:"EVALUACIÓN",      sub:"¿Cómo sabemos si está aprendiendo?",   color:C.red,       icon:"📊" },
  ];
  return (
    <div>
      <PageTitle mob={mob} icon="🏗️" title="La Arquitectura del Modelo" subtitle="Seis niveles conectados entre sí. Cada uno responde a una pregunta diferente. Todos forman un sistema." />
      <div style={{ background:C.primary, borderRadius:14, padding:mob?"16px":"24px 28px", marginBottom:20 }}>
        <div style={{ fontSize:mob?10:11, fontWeight:800, color:C.gold, marginBottom:18, letterSpacing:1.5, textAlign:"center" }}>CÓMO SE CONECTAN LAS PIEZAS</div>
        <div style={{ display:"flex", flexDirection:"column", gap:8, maxWidth:520, margin:"0 auto" }}>
          {niveles.map((n, i) => (
            <div key={i}>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:mob?36:42, height:mob?36:42, borderRadius:10, background:n.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:mob?16:20, flexShrink:0 }}>{n.icon}</div>
                <div style={{ flex:1, background:"rgba(255,255,255,0.08)", borderRadius:8, padding:"8px 14px", borderLeft:`3px solid ${n.color}` }}>
                  <div style={{ fontSize:mob?12:14, fontWeight:900, color:"#FFFFFF" }}>{n.label}</div>
                  <div style={{ fontSize:mob?10:11, color:"rgba(255,255,255,0.6)", marginTop:2 }}>{n.sub}</div>
                </div>
              </div>
              {i < niveles.length-1 && <div style={{ display:"flex", justifyContent:"flex-start", paddingLeft:mob?18:21, paddingTop:4, paddingBottom:4 }}><div style={{ width:2, height:10, background:"rgba(255,255,255,0.2)", borderRadius:1 }} /></div>}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":"repeat(3,1fr)", gap:12, marginBottom:20 }}>
        {[
          { q:"¿Qué club queremos ser?",            a:"Lo define la Identidad y los Valores del Club.", icon:"🏡", color:C.primary },
          { q:"¿Qué jugador queremos formar?",       a:"Lo define el perfil del Jugador Canet F.C.", icon:"🌟", color:C.accent },
          { q:"¿Cómo queremos jugar?",               a:"Lo definen los 6 Principios y el Cuadrado Interior.", icon:"🎯", color:"#6D28D9" },
          { q:"¿Cómo queremos enseñar?",             a:"Lo define el Ciclo Canet y la Metodología.", icon:"🔁", color:C.green },
          { q:"¿Cómo progresa el jugador?",          a:"Lo define la Progresión por Etapas E1-E4.", icon:"📈", color:C.gold },
          { q:"¿Cómo sabemos si está aprendiendo?",  a:"Lo define el sistema de Evaluación trimestral.", icon:"📊", color:C.red },
        ].map((item, i) => (
          <div key={i} style={{ background:C.softbg, borderRadius:12, padding:mob?"12px":"14px 16px", borderLeft:`3px solid ${item.color}` }}>
            <div style={{ fontSize:mob?10:11, fontWeight:800, color:item.color, marginBottom:6 }}>{item.icon}  {item.q}</div>
            <div style={{ fontSize:mob?11:12, color:C.grey, lineHeight:1.65 }}>{item.a}</div>
          </div>
        ))}
      </div>
      <InfoBox mob={mob} icon="💡" label="Cómo leer el modelo:">No son bloques independientes. La identidad determina los principios. Los principios determinan los comportamientos. Los comportamientos orientan los contenidos. Los contenidos se trabajan mediante tareas. Las tareas se evalúan. La evaluación ajusta la siguiente planificación. Y el ciclo vuelve a empezar.</InfoBox>
    </div>
  );
};

const QuienesSomos = ({ mob }) => (
  <div>
    <PageTitle mob={mob} icon="🏡" title="Quiénes Somos" subtitle="La identidad del Canet F.C. en tres ideas fundamentales que guían todas las decisiones del club." />
    <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":"repeat(3,1fr)", gap:12, marginBottom:18 }}>
      {[
        { icon:"🌱", color:C.accent, title:"Un club de pueblo",
          body:"No somos una academia de élite en recursos o estructura, pero aspiramos a aplicar criterios de máxima calidad en la formación de nuestros jugadores. Somos un club de pueblo que cree profundamente que el fútbol bien enseñado forma mejores jugadores y, sobre todo, mejores personas." },
        { icon:"🎯", color:C.gold, title:"Formamos primero",
          body:"Competimos para ganar porque competir es parte del aprendizaje, pero nunca sacrificamos el desarrollo del jugador ni los valores del club por el resultado a corto plazo. Los resultados son consecuencia del proceso, nunca el objetivo." },
        { icon:"🔷", color:C.primary, title:"Un modelo, no un sistema",
          body:"Imponemos un modelo de juego con coherencia vertical y reconocible desde Escoleta hasta Juvenil. No buscamos que todos ocupen las mismas posiciones, sino que todos comprendan los mismos principios. En F11, el cuadrado interior es el comportamiento colectivo que identifica nuestro modelo." },
      ].map((item, i) => (
        <div key={i} style={{ background:C.softbg, borderRadius:12, padding:mob?"14px":"20px", borderTop:`4px solid ${item.color}` }}>
          <div style={{ width:38, height:38, borderRadius:9, background:item.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, marginBottom:10 }}>{item.icon}</div>
          <div style={{ fontSize:mob?12:13, fontWeight:800, color:C.primary, marginBottom:6 }}>{item.title}</div>
          <div style={{ fontSize:mob?11:12, color:C.grey, lineHeight:1.8 }}>{item.body}</div>
        </div>
      ))}
    </div>
    <YesNo mob={mob}
      si={["Los resultados son consecuencia del proceso, nunca el objetivo","Todos los equipos del club juegan de forma reconociblemente coherente","Las etapas representan niveles de desarrollo, no simplemente edades. La categoría orienta la etapa; el nivel real del jugador determina la exigencia dentro de ella.","El error no se castiga: se comprende y se utiliza como aprendizaje"]}
      no={["Ganar a cualquier precio en categorías de formación","El pelotazo como solución habitual ante la presión","El físico como sustituto de la técnica y la táctica","Quemar etapas por impaciencia del entrenador o del club"]}
    />
    <GoldBar mob={mob} text="El modelo no se entrena explicándolo, sino diseñando situaciones donde aparezca de forma natural. Si el entrenador tiene que corregir constantemente un comportamiento, el problema no es del jugador, sino del diseño de la tarea." />
  </div>
);

const principiosData = [
  { n:"01", icon:"⚽", color:C.accent,
    title:"El balón es nuestra herramienta", short:"Jugamos CON el balón, no a través del físico",
    desc:"El primer objetivo en cada categoría es que los jugadores desarrollen una relación de confianza y comodidad con el balón en cualquier situación y bajo cualquier tipo de presión. Sin esa base técnica, ningún concepto táctico puede funcionar de forma sostenida.",
    campo:"¿El jugador se siente cómodo con el balón cuando lo recibe con presión encima?",
    no:"Rechazar el balón por miedo · Golpear sin control · Jugar largo ante cualquier presión" },
  { n:"02", icon:"🎯", color:C.gold,
    title:"Todo pase tiene una intención", short:"El pase coloca al compañero en ventaja",
    desc:"El pase no es deshacerse del balón. Es una decisión táctica. Cada vez que alguien pasa está respondiendo a una pregunta: ¿dónde necesita recibir mi compañero para tener ventaja? Ese principio, interiorizado desde pequeño, es la base de la inteligencia táctica colectiva.",
    campo:"¿Cuándo pasa, deja el balón donde su compañero puede jugar hacia adelante?",
    no:"Pasar para deshacerse · Pase sin mirar dónde está el compañero · Reciclar sin criterio" },
  { n:"03", icon:"🔄", color:C.primary,
    title:"Atraemos para filtrar, filtramos para atacar", short:"Pausa para atraer · Verticalidad para atacar",
    desc:"Cuando tenemos el balón, buscamos atraer al rival hacia nosotros para generar el espacio que necesita nuestro compañero en una zona más avanzada. Cuando ese espacio aparece, el balón progresa sin dudar. Ese ciclo es el ADN ofensivo del club.",
    campo:"¿El equipo espera el momento de filtrar o juega siempre con urgencia?",
    no:"Verticalidad sin pausa previa · Posesión sin progresión · Pausa sin verticalidad después" },
  { n:"04", icon:"⚡", color:C.e1,
    title:"El 1vs1 en banda como desequilibrio", short:"El desequilibrio individual como ventaja táctica",
    desc:"El jugador que supera a su defensor en el 1vs1 en banda genera situaciones de ventaja que ningún sistema puede crear artificialmente. Por eso el 1vs1 se trabaja en todas las etapas, desde la Escoleta como juego libre hasta el Juvenil como herramienta táctica específica.",
    campo:"¿El jugador intenta superar al defensor en banda con intención real de hacerlo?",
    no:"Pasar siempre ante el 1vs1 · No intentarlo por miedo · 1vs1 sin ningún recurso de superación" },
  { n:"05", icon:"🔷", color:"#6D28D9",
    title:"Superioridad en el carril central", short:"Superioridad central mediante el cuadrado (solo F11)",
    desc:"El objetivo colectivo del modelo en fútbol 11 es generar una superioridad en el carril central que permita progresar. Esta superioridad puede ser numérica, posicional o dinámica. No importa el sistema ni la posición de partida: siempre buscamos generarla mediante el movimiento colectivo.",
    campo:"¿El equipo consigue generar una superioridad en el carril central —numérica, posicional o dinámica— que le permita progresar?",
    no:"Jugar solo por bandas · No buscar el interior · Acumulación sin criterio de superioridad" },
  { n:"06", icon:"🛡️", color:C.red,
    title:"Defendemos para recuperar, no para proteger", short:"Defensa con intención ofensiva: recuperar para atacar",
    desc:"Defendemos para recuperar el balón lo antes posible y volver a atacar en ventaja. Intentamos recuperar el balón de forma inmediata tras la pérdida, adaptando la presión a las capacidades del equipo y a la situación del juego. Presionamos alto y orientamos la presión en función de nuestras virtudes y las debilidades del rival.",
    campo:"¿El equipo reacciona de forma colectiva e inmediata tras perder el balón?",
    no:"Replegarse sin intentar recuperar · Defender pasivamente esperando al rival · Presionar sin criterio de orientación" },
];

const gruposPrincipios = [
  { label:"Base Ofensiva",   desc:"Cómo construimos y atacamos", color:C.accent,  indices:[0,1,2] },
  { label:"Desequilibrio",   desc:"Cómo generamos ventaja",      color:"#6D28D9", indices:[3,4]   },
  { label:"Defensivo",       desc:"Cómo recuperamos el balón",   color:C.red,     indices:[5]     },
];

const PrincipiosSection = ({ mob }) => {
  const [active, setActive] = useState(null);
  const p = active !== null ? principiosData[active] : null;
  return (
    <div>
      <PageTitle mob={mob} icon="🎯" title="Los 6 Principios Invariables" subtitle="Estos principios se aplican en todas las categorías desde el primer día. La complejidad varía. Los principios, nunca." />

      {/* Los 3 grupos con los 6 principios visibles */}
      <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom: p ? 18 : 4 }}>
        {gruposPrincipios.map((g, gi) => (
          <div key={gi} style={{ borderRadius:12, overflow:"hidden", border:`1px solid ${C.border}` }}>
            {/* Cabecera del grupo */}
            <div style={{ background:g.color, padding:"10px 16px", display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ fontSize:mob?12:13, fontWeight:900, color:C.white, letterSpacing:0.3 }}>{g.label}</div>
              <div style={{ fontSize:mob?10:11, color:"rgba(255,255,255,0.7)", fontStyle:"italic" }}>{g.desc}</div>
            </div>
            {/* Principios del grupo */}
            <div style={{ background:C.white, display:"grid", gridTemplateColumns:mob?"1fr":`repeat(${g.indices.length},1fr)` }}>
              {g.indices.map((idx, ii) => {
                const pr = principiosData[idx];
                const isActive = active === idx;
                return (
                  <button key={idx} onClick={() => setActive(isActive ? null : idx)} style={{
                    border:"none", background:isActive ? pr.color : C.white,
                    borderRight: ii < g.indices.length-1 ? `1px solid ${C.border}` : "none",
                    borderBottom: mob && ii < g.indices.length-1 ? `1px solid ${C.border}` : "none",
                    cursor:"pointer", padding:mob?"12px 14px":"14px 18px",
                    textAlign:"left", transition:"all 0.18s",
                  }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:mob?32:36, height:mob?32:36, borderRadius:8, background:isActive?"rgba(255,255,255,0.22)":pr.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:mob?16:18, flexShrink:0 }}>{pr.icon}</div>
                      <div style={{ textAlign:"left" }}>
                        <div style={{ fontSize:9, fontWeight:700, color:isActive?"rgba(255,255,255,0.65)":C.greyLight, letterSpacing:1.5, textTransform:"uppercase", marginBottom:2 }}>PRINCIPIO {pr.n}</div>
                        <div style={{ fontSize:mob?11:12, fontWeight:800, color:isActive?C.white:C.primary, lineHeight:1.3 }}>{pr.title}</div>
                        <div style={{ fontSize:mob?10:11, color:isActive?"rgba(255,255,255,0.75)":C.grey, marginTop:2, fontStyle:"italic" }}>{pr.short}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Detalle del principio seleccionado */}
      {p && (
        <div style={{ marginTop:4 }}>
          <div style={{ background:p.color, borderRadius:14, padding:mob?"16px":"22px 26px", marginBottom:14, color:C.white, boxShadow:"0 4px 18px rgba(0,0,0,0.12)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
              <div style={{ width:mob?44:52, height:mob?44:52, borderRadius:12, background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:mob?22:26, flexShrink:0 }}>{p.icon}</div>
              <div>
                <div style={{ fontSize:9, fontWeight:700, opacity:0.65, letterSpacing:2.5, textTransform:"uppercase", marginBottom:2 }}>PRINCIPIO {p.n}</div>
                <div style={{ fontSize:mob?16:20, fontWeight:900, lineHeight:1.2, marginBottom:3 }}>{p.title}</div>
                <div style={{ fontSize:mob?11:12, opacity:0.8, fontStyle:"italic" }}>{p.short}</div>
              </div>
            </div>
            <div style={{ fontSize:mob?12:13, opacity:0.9, lineHeight:1.85, borderTop:"1px solid rgba(255,255,255,0.18)", paddingTop:12 }}>{p.desc}</div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":"1fr 1fr", gap:12, marginBottom:14 }}>
            <div style={{ background:C.greenBg, borderRadius:10, padding:"14px 16px", borderLeft:`3px solid ${C.green}` }}>
              <div style={{ fontSize:10, fontWeight:800, color:C.green, marginBottom:9, letterSpacing:0.5 }}>✅ OBSERVABLE EN CAMPO</div>
              <p style={{ fontSize:mob?11:12, color:C.dark, lineHeight:1.75, margin:0, fontStyle:"italic" }}>"{p.campo}"</p>
            </div>
            <div style={{ background:C.redBg, borderRadius:10, padding:"14px 16px", borderLeft:`3px solid ${C.red}` }}>
              <div style={{ fontSize:10, fontWeight:800, color:C.red, marginBottom:9, letterSpacing:0.5 }}>❌ LO QUE NO QUEREMOS</div>
              {p.no.split(" · ").map((n, i) => <div key={i} style={{ display:"flex", gap:7, marginBottom:5 }}><span style={{ color:C.red, flexShrink:0 }}>·</span><span style={{ fontSize:mob?11:12, color:C.dark, lineHeight:1.65 }}>{n}</span></div>)}
            </div>
          </div>
          <InfoBox mob={mob} icon="💡" label="Regla de oro:">Si el entrenador tiene que recordar constantemente este principio, el problema no es del jugador. Es del diseño de la tarea. La tarea debe favorecer que el comportamiento aparezca con la mínima dependencia posible de la instrucción constante.</InfoBox>
        </div>
      )}
    </div>
  );
};

// ── CUADRADO INTERIOR ─────────────────────────────────────────
const gruposCuadrado = [
  { id:"tres", label:"Con 3 en el centro", color:C.accent,
    desc:"Cuando el equipo tiene tres jugadores en la zona central, el cuadrado se puede generar a través de tres movimientos distintos. Cualquiera de los tres produce el mismo resultado: cuatro jugadores en el carril central.",
    formas:[
      { icon:"↗️", color:C.accent, title:"La entrada del lateral",
        desc:"El lateral del carril exterior entra al centro del campo como cuarto jugador. Los tres del centro mantienen sus posiciones y el lateral se incorpora al cuadrado desde abajo.",
        dilema:"El rival debe decidir quién le sigue. Si nadie le sigue, el lateral recibe libre entre líneas. Si le sigue el mediocampista rival, deja libre a uno de los tres centrocampistas.",
        clave:"El extremo mantiene la amplitud y fija al lateral rival. El lateral entra al espacio que el rival no puede cubrir." },
      { icon:"↙️↗️", color:"#6D28D9", title:"El extremo entra, el lateral sube",
        desc:"El extremo corta desde su carril exterior hacia el interior. En el mismo momento, el lateral ocupa la banda que el extremo ha liberado. El extremo se convierte en el cuarto hombre del cuadrado.",
        dilema:"Si el lateral rival sigue al extremo hacia dentro, deja la banda libre para la subida del lateral. Si no le sigue, el extremo recibe libre frente a portería.",
        clave:"El extremo corta hacia el interior. El lateral ocupa la banda liberada. La sincronía entre ambos movimientos es la clave." },
      { icon:"⬆️", color:C.e1, title:"El central sube al mediocampo",
        desc:"Un central se proyecta hasta la zona de mediocampo generando el cuarto hombre del cuadrado desde la línea más retrasada. Los otros dos defensas cubren el espacio que ha dejado.",
        dilema:"Los rivales no esperan que un central llegue al mediocampo. Su aparición desde una línea diferente puede alterar las referencias defensivas y generar una ventaja antes de que el rival reaccione.",
        clave:"Es el movimiento más sorpresivo. Su aparición desde una línea diferente puede alterar las referencias defensivas del rival y generar una ventaja que no esperaba cubrir." },
    ],
  },
  { id:"dos", label:"Con 2 en el centro", color:C.gold,
    desc:"Cuando el equipo tiene solo dos jugadores en la zona central, el cuadrado se genera a través del descenso coordinado de la pareja delantera.",
    formas:[
      { icon:"⬇️⬇️", color:C.gold, title:"El descenso de la doble punta",
        desc:"Los dos delanteros bajan simultáneamente entre las líneas rivales. Junto a los dos del centro forman el cuadrado de cuatro. Los extremos se abren dando amplitud y profundidad por fuera.",
        dilema:"Los dos del centro rival solo pueden marcar a uno de los dos delanteros que bajan. El otro queda libre. Si los centrales rivales salen, dejan el espacio libre para los extremos.",
        clave:"Los DOS delanteros bajan al mismo tiempo. No uno solo. Los extremos no entran: dan la anchura por fuera." },
    ],
  },
];

const CuadradoSection = ({ mob }) => {
  const [gIdx, setGIdx] = useState(0);
  const [fIdx, setFIdx] = useState(0);
  const g = gruposCuadrado[gIdx];
  const f = g.formas[fIdx];
  const handleG = (i) => { setGIdx(i); setFIdx(0); };

  const evo = [
    { e:"E1", color:C.e1, ic:"🌱", title:"No existe como concepto",
      exp:"Los niños se juntan alrededor del balón de forma natural. No se corrige. El juego libre ya genera situaciones de superioridad espontánea que irán comprendiendo con los años.",
      queVe:"Los niños van todos al balón · No interferir" },
    { e:"E2", color:C.e2, ic:"💡", title:"Noción: la superioridad genera ventaja",
      exp:"A través del 2vs1 y el 3vs2 (en F7), el jugador entiende que si somos más, uno está libre. El cuadrado interior no se trabaja en formato F7. La noción de superioridad es el punto de partida.",
      queVe:"El jugador busca al compañero libre en el 2vs1 (solo F7)" },
    { e:"E3", color:C.e3, ic:"🔧", title:"Cuadrado básico (solo F11)",
      exp:"En los equipos que juegan en F11, el entrenador ya puede nombrar el cuadrado interior y trabajar el 4vs3 explícitamente. En los equipos de F7 se sigue trabajando superioridad simple.",
      queVe:"El jugador reconoce situaciones donde puede contribuir a generar superioridad mediante el cuadrado (F11). El entrenador guía y nombra el concepto." },
    { e:"E4", color:C.e4, ic:"⭐", title:"Lo genera de forma autónoma y adaptativa",
      exp:"El equipo genera superioridad mediante el cuadrado desde diferentes movimientos y posiciones de partida, sin instrucción del banquillo. Sabe cuándo activarlo, quién participa y cuándo debe modificarlo o abandonarlo si no genera ventaja.",
      queVe:"El equipo lo genera, lo adapta y sabe cuándo no forzarlo" },
  ];

  return (
    <div>
      <PageTitle mob={mob} icon="🔷" title="El Cuadrado Interior" subtitle="El concepto central del modelo en fútbol 11. La misma idea generada siempre a través de movimientos colectivos." />

      <div style={{ background:"#FFF8E1", borderRadius:10, padding:"11px 16px", marginBottom:16, border:`1px solid #F0C040`, display:"flex", gap:10, alignItems:"center" }}>
        <span style={{ fontSize:18, flexShrink:0 }}>⚠️</span>
        <div style={{ fontSize:mob?11:12, color:"#7A5800", lineHeight:1.7 }}>
          <strong>Solo para fútbol 11.</strong> El cuadrado interior no se trabaja en formato F7. En esos equipos se desarrolla la comprensión de la superioridad numérica a través del 2vs1 y el 3vs2 hasta que la categoría lo permita.
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":"1fr 1fr", gap:12, marginBottom:18 }}>
        <div style={{ background:C.primary, borderRadius:12, padding:mob?"16px":"20px 22px" }}>
          <div style={{ fontSize:10, fontWeight:800, color:C.gold, marginBottom:10, letterSpacing:1.5 }}>¿QUÉ ES?</div>
          <p style={{ fontSize:mob?12:13, color:C.white, lineHeight:1.8, margin:"0 0 10px" }}>La <strong style={{ color:C.gold }}>superioridad numérica en el carril central</strong> generada a través del movimiento colectivo. No es una posición fija: es una situación que el equipo provoca activamente.</p>
          <p style={{ fontSize:mob?11:12, color:"rgba(255,255,255,0.65)", lineHeight:1.75, margin:0 }}>Cualquier jugador puede ser el cuarto hombre, no necesariamente siempre el mismo ni desde la misma línea. <strong style={{ color:C.gold }}>El movimiento cambia. El objetivo nunca cambia.</strong></p>
        </div>
        <div style={{ background:C.primary, borderRadius:12, padding:mob?"16px":"20px 22px" }}>
          <div style={{ fontSize:10, fontWeight:800, color:C.gold, marginBottom:10, letterSpacing:1.5 }}>¿QUÉ PROBLEMA GENERAMOS AL RIVAL?</div>
          {["El rival debe decidir qué espacio prioriza proteger: el interior o el exterior.","Si protege el interior, puede liberar espacios exteriores para los extremos.","Si protege el exterior, puede aparecer la superioridad interior con un jugador libre."].map((item, i) => (
            <div key={i} style={{ display:"flex", gap:8, marginBottom:8 }}>
              <span style={{ color:C.gold, fontWeight:700, flexShrink:0 }}>→</span>
              <span style={{ fontSize:mob?11:12, color:"rgba(255,255,255,0.82)", lineHeight:1.65 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize:mob?13:14, fontWeight:800, color:C.primary, marginBottom:12 }}>Cómo se genera</div>
      <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
        {gruposCuadrado.map((gr, i) => (
          <button key={i} onClick={() => handleG(i)} style={{ border:"none", cursor:"pointer", padding:mob?"9px 14px":"10px 18px", borderRadius:10, fontSize:mob?11:12, fontWeight:700, background:gIdx===i?gr.color:C.softbg, color:gIdx===i?(gr.color===C.gold?C.primary:C.white):C.grey, flexShrink:0, transition:"all 0.18s" }}>
            {gr.label}
          </button>
        ))}
      </div>
      <div style={{ background:C.softbg, borderRadius:10, padding:"12px 14px", marginBottom:12, borderLeft:`3px solid ${g.color}`, fontSize:mob?11:12, color:C.grey, lineHeight:1.75 }}>{g.desc}</div>

      {g.formas.length > 1 && (
        <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
          {g.formas.map((fo, i) => (
            <button key={i} onClick={() => setFIdx(i)} style={{ border:"none", cursor:"pointer", padding:"7px 13px", borderRadius:8, fontSize:mob?10:11, fontWeight:700, background:fIdx===i?fo.color:C.softbg, color:fIdx===i?C.white:C.grey, flexShrink:0, display:"flex", alignItems:"center", gap:5, transition:"all 0.18s" }}>
              <span style={{ fontSize:14 }}>{fo.icon}</span> {fo.title}
            </button>
          ))}
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":"1fr 1fr 1fr", gap:12, marginBottom:20 }}>
        <div style={{ background:C.softbg, borderRadius:12, padding:"16px", borderLeft:`4px solid ${f.color}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:10 }}>
            <div style={{ width:36, height:36, borderRadius:8, background:f.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{f.icon}</div>
            <div style={{ fontSize:mob?12:13, fontWeight:800, color:C.primary, lineHeight:1.3 }}>{f.title}</div>
          </div>
          <p style={{ fontSize:mob?11:12, color:C.grey, lineHeight:1.8, margin:0 }}>{f.desc}</p>
        </div>
        <div style={{ background:C.white, borderRadius:12, padding:"16px", border:`1px solid ${C.border}`, borderTop:`3px solid ${f.color}` }}>
          <div style={{ fontSize:10, fontWeight:800, color:f.color, marginBottom:8, letterSpacing:0.5 }}>DILEMA PARA EL RIVAL</div>
          <p style={{ fontSize:mob?11:12, color:C.dark, lineHeight:1.8, margin:0 }}>{f.dilema}</p>
        </div>
        <div style={{ background:C.primary, borderRadius:12, padding:"16px" }}>
          <div style={{ fontSize:10, fontWeight:800, color:C.gold, marginBottom:8, letterSpacing:0.5 }}>CLAVE DEL MOVIMIENTO</div>
          <p style={{ fontSize:mob?11:12, color:C.white, lineHeight:1.8, margin:0 }}>{f.clave}</p>
        </div>
      </div>

      <div style={{ height:1, background:C.border, margin:"4px 0 18px" }} />
      <div style={{ fontSize:mob?13:14, fontWeight:800, color:C.primary, marginBottom:6 }}>Cómo evoluciona por etapas</div>
      <p style={{ fontSize:mob?11:12, color:C.grey, marginBottom:14, marginTop:4 }}>La misma idea, cuatro niveles de comprensión. Lo que cambia es la exigencia, no el objetivo.</p>
      <div style={{ display:"grid", gridTemplateColumns:mob?"1fr 1fr":"repeat(4,1fr)", gap:10, marginBottom:14 }}>
        {evo.map((item, i) => (
          <div key={i} style={{ borderRadius:12, boxShadow:"0 1px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ background:item.color, padding:"12px 12px 10px" }}>
              <div style={{ fontSize:20, marginBottom:4 }}>{item.ic}</div>
              <div style={{ fontSize:9, fontWeight:800, color:i===3?C.primary:"rgba(255,255,255,0.65)", letterSpacing:1.5, textTransform:"uppercase" }}>{item.e}</div>
              <div style={{ fontSize:mob?10:11, fontWeight:900, color:i===3?C.primary:C.white, lineHeight:1.3, marginTop:2 }}>{item.title}</div>
            </div>
            <div style={{ background:C.white, padding:"12px" }}>
              <p style={{ fontSize:mob?10:11, color:C.grey, lineHeight:1.7, margin:"0 0 8px" }}>{item.exp}</p>
              <div style={{ background:item.color+(i===3?"44":"22"), borderRadius:7, padding:"6px 9px" }}>
                <div style={{ fontSize:9, fontWeight:800, color:i===3?"#A07820":item.color }}>🔍 EL ENTRENADOR VE</div>
                <div style={{ fontSize:mob?10:11, color:C.dark, marginTop:2, fontStyle:"italic" }}>{item.queVe}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background:C.primary, borderRadius:12, padding:mob?"16px":"18px 24px", marginBottom:14, marginTop:14 }}>
        <div style={{ fontSize:mob?13:14, fontWeight:800, color:C.gold, marginBottom:10, textAlign:"center" }}>El cuadrado no es el objetivo final</div>
        <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":"1fr 1fr", gap:14 }}>
          <div style={{ background:C.redBg, borderRadius:9, padding:"12px 14px" }}>
            <div style={{ fontSize:10, fontWeight:800, color:C.red, marginBottom:6 }}>❌ NO EVALUAMOS ESTO</div>
            <div style={{ fontSize:mob?11:12, color:C.dark, lineHeight:1.75 }}>¿Ha aparecido el cuadrado? El cuadrado puede aparecer y no generar ninguna ventaja. Si cuatro jugadores se meten en el centro sin espacio ni progresión, no hemos conseguido nada.</div>
          </div>
          <div style={{ background:C.greenBg, borderRadius:9, padding:"12px 14px" }}>
            <div style={{ fontSize:10, fontWeight:800, color:C.green, marginBottom:6 }}>✅ EVALUAMOS ESTO</div>
            <div style={{ fontSize:mob?11:12, color:C.dark, lineHeight:1.75 }}>¿El cuadrado ha generado una ventaja que ha permitido progresar? Si el rival ha tenido que tomar una decisión defensiva por nuestra superioridad interior, el cuadrado ha funcionado.</div>
          </div>
        </div>
        <p style={{ fontSize:mob?12:13, color:"rgba(255,255,255,0.75)", margin:"12px 0 0", textAlign:"center", fontStyle:"italic" }}>El objetivo no es formar cuatro jugadores dentro. El objetivo es generar una ventaja que permita progresar.</p>
      </div>
      <InfoBox mob={mob} icon="💡" label="Para el entrenador:">En E1 y E2 no uses el nombre 'cuadrado interior'. Trabaja el 2vs1 y el 3vs2. En E3 ya puedes nombrarlo en los equipos de F11. En E4 el equipo lo genera sin que tú lo pidas.</InfoBox>
    </div>
  );
};

const fasesData = [
  { n:"01", icon:"🏗️", color:C.accent,  title:"Construcción",        sub:"Salir desde atrás con criterio",
    principio:"Pausa en primera línea antes de progresar",
    si:["El portero como primer jugador de campo","Pausa del portador hasta que los compañeros están posicionados","Control orientado hacia el juego","Cambio de orientación si el rival orienta el pressing"],
    no:["Pelotazo ante cualquier presión","Pasar rápido sin mirar dónde está el compañero","El portero como último recurso en vez de primero"],
    pregunta:"¿El equipo construye con criterio o con urgencia?" },
  { n:"02", icon:"⚡",  color:"#6D28D9", title:"Ataque",              sub:"Verticalidad al filtrar",
    principio:"Atraemos para filtrar, filtramos para atacar",
    si:["Verticalidad inmediata cuando el balón supera una línea rival","Llegadas desde segunda línea al área rival","El cuadrado interior activo en zona de creación (F11)","1vs1 en banda como herramienta de desequilibrio"],
    no:["Posesión sin progresión: circular sin avanzar","Llegar al área solo por banda y centrar sin más opciones","Ser vertical sin haber generado superioridad previa"],
    pregunta:"¿El equipo es vertical cuando filtra o recicla innecesariamente?" },
  { n:"03", icon:"🔁",  color:C.green,   title:"Transición Positiva", sub:"Aprovechar la ventaja antes de que el rival se reorganice",
    principio:"Tras recuperar, buscamos la ventaja inmediata antes de que el rival se reorganice.",
    si:["Ataque inmediato al espacio disponible","Decisión tomada en los primeros segundos tras recuperar","Si no hay espacio: proteger y reorganizar","Velocidad de decisión, no solo de ejecución"],
    no:["Celebrar la recuperación en lugar de atacar","Esperar a que todos estén posicionados antes de progresar","Perder la ventaja temporal por indecisión"],
    pregunta:"¿El equipo aprovecha la ventaja inmediata tras recuperar antes de que el rival se reorganice?" },
  { n:"04", icon:"🛡️", color:C.red,     title:"Transición Negativa", sub:"Reacción inmediata para recuperar o impedir la progresión rival",
    principio:"Tras perder, reaccionamos de inmediato. Si no recuperamos, nos reorganizamos.",
    si:["Pressing inmediato de todos los jugadores cercanos al balón","Orientar al portador hacia el lateral del campo","Si no se recupera en los primeros segundos: repliegue organizado","Un jugador de referencia organiza verbalmente el repliegue cuando sea necesario"],
    no:["Quedarse parado ante la pérdida","La reacción queda limitada al jugador más cercano mientras el resto no acompaña","Repliegue desordenado que deja espacios entre líneas"],
    pregunta:"¿El equipo reacciona de forma inmediata y colectiva tras perder el balón?" },
  { n:"05", icon:"🔒", color:C.grey,    title:"Defensa Organizada",   sub:"Recuperar el balón, no proteger el área",
    principio:"Defendemos con intención ofensiva. El objetivo siempre es recuperar para volver a atacar, no simplemente frenar al rival.",
    si:["Presión alta proactiva cuando el contexto lo permite: recuperar rápido para tener el balón el máximo tiempo posible","Si el rival no lo permite: bloque medio organizado con trampas y triggers definidos por el entrenador según el rival y el momento del partido","Orientar al rival hacia zonas donde queremos que llegue el balón","El equipo defiende junto: compacto y con referencias claras entre líneas"],
    no:["Bloque bajo pasivo sin intención de recuperar","Esperar el error del rival sin buscarlo activamente","Defender cada uno por su cuenta sin referencias colectivas","Replegarse sin criterio de cuándo y dónde queremos recuperar"],
    pregunta:"¿El equipo defiende con intención de recuperar o simplemente aguanta sin buscar el balón?" },
];

const FasesSection = ({ mob }) => {
  const [active, setActive] = useState(0);
  const f = fasesData[active];
  return (
    <div>
      <PageTitle mob={mob} icon="🔄" title="Las 5 Fases del Juego" subtitle="Cinco momentos del juego. En cada uno, el equipo tiene una respuesta clara con intención." />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:mob?8:10, marginBottom:18 }}>
        {fasesData.map((fa, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ border:"none", cursor:"pointer", padding:mob?"10px 4px":"16px 10px", borderRadius:10, textAlign:"center", background:active===i?fa.color:C.softbg, color:active===i?C.white:C.grey, transition:"all 0.18s", boxShadow:active===i?"0 4px 14px rgba(0,0,0,0.15)":"none" }}>
            <div style={{ fontSize:mob?20:26, marginBottom:4 }}>{fa.icon}</div>
            <div style={{ fontSize:9, fontWeight:800, letterSpacing:0.5, marginBottom:1 }}>FASE {fa.n}</div>
            <div style={{ fontSize:mob?9:11, fontWeight:700, lineHeight:1.2 }}>{fa.title}</div>
          </button>
        ))}
      </div>
      <div style={{ background:f.color, borderRadius:12, padding:mob?"14px":"18px 24px", marginBottom:14, color:C.white, boxShadow:"0 4px 16px rgba(0,0,0,0.12)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
          <div style={{ width:mob?42:50, height:mob?42:50, borderRadius:10, background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:mob?22:26, flexShrink:0 }}>{f.icon}</div>
          <div>
            <div style={{ fontSize:mob?16:20, fontWeight:900, marginBottom:2 }}>FASE {f.n} · {f.title}</div>
            <div style={{ fontSize:mob?11:12, opacity:0.8, fontStyle:"italic" }}>{f.sub}</div>
          </div>
        </div>
        <div style={{ background:"rgba(255,255,255,0.14)", borderRadius:8, padding:"9px 14px", fontSize:mob?11:12, fontWeight:700, display:"flex", alignItems:"center", gap:7 }}>
          <span>🔑</span> {f.principio}
        </div>
      </div>
      <YesNo mob={mob} si={f.si} no={f.no} />
      <div style={{ background:C.softbg, borderRadius:10, padding:"13px 16px", marginTop:12, borderLeft:`4px solid ${f.color}`, display:"flex", alignItems:"center", gap:10 }}>
        <span style={{ fontSize:18 }}>👁️</span>
        <div>
          <div style={{ fontSize:9, fontWeight:800, color:C.primary, marginBottom:3, letterSpacing:0.8 }}>PREGUNTA DEL ENTRENADOR EN PARTIDO</div>
          <div style={{ fontSize:mob?12:13, color:C.grey, fontStyle:"italic" }}>"{f.pregunta}"</div>
        </div>
      </div>
    </div>
  );
};

const progData = [
  { p:"Balón como herramienta",      e1:"Descubre",  e2:"Comprende",  e3:"Aplica",       e4:"Adapta"     },
  { p:"Control orientado",           e1:"—",         e2:"Descubre",   e3:"Comprende",    e4:"Aplica"     },
  { p:"Pase con intención",          e1:"—",         e2:"Descubre",   e3:"Comprende",    e4:"Aplica"     },
  { p:"1vs1 en banda",               e1:"Descubre",  e2:"Comprende",  e3:"Aplica",       e4:"Adapta"     },
  { p:"Desmarque de apoyo",          e1:"—",         e2:"Descubre",   e3:"Comprende",    e4:"Aplica"     },
  { p:"Desmarque de ruptura",        e1:"—",         e2:"—",          e3:"Comprende",    e4:"Aplica"     },
  { p:"2vs1",                        e1:"—",         e2:"Descubre",   e3:"Comprende",    e4:"Aplica"     },
  { p:"3vs2",                        e1:"—",         e2:"Descubre",   e3:"Comprende",    e4:"Aplica"     },
  { p:"Atraer para filtrar",         e1:"—",         e2:"—",          e3:"Comprende",    e4:"Aplica"     },
  { p:"Verticalidad al filtrar",     e1:"—",         e2:"—",          e3:"Comprende",    e4:"Aplica"     },
  { p:"Tercer hombre",               e1:"—",         e2:"—",          e3:"Descubre",     e4:"Comprende"  },
  { p:"Cuadrado interior",           e1:"—",         e2:"Noción",     e3:"Solo F11",     e4:"Adapta F11" },
  { p:"Construcción desde atrás",    e1:"—",         e2:"—",          e3:"Comprende",    e4:"Aplica"     },
  { p:"Pressing básico",             e1:"—",         e2:"Descubre",   e3:"Comprende",    e4:"Aplica"     },
  { p:"Pressing tras pérdida",       e1:"—",         e2:"—",          e3:"—",            e4:"Descubre"   },
  { p:"Transiciones",                e1:"—",         e2:"—",          e3:"Descubre",     e4:"Comprende"  },
  { p:"Superioridades Z2-Z3",        e1:"—",         e2:"—",          e3:"—",            e4:"Descubre"   },
  { p:"Gestión del partido",         e1:"—",         e2:"—",          e3:"—",            e4:"Comprende"  },
];
const cst = (v) => {
  if (v === "—")              return { bg:"#F2F4F7", color:"#BCC4CC" };
  if (v === "Noción")         return { bg:"#FFF3E0", color:"#E65100" };
  if (["Solo F11","Adapta F11"].includes(v)) return { bg:"#EDE7F6", color:"#5E35B1" };
  if (v === "Descubre")       return { bg:"#E3F2FD", color:"#1565C0" };
  if (v === "Comprende")      return { bg:"#E8F5E9", color:"#2E7D32" };
  if (v === "Aplica")         return { bg:"#FFF8E1", color:"#C07000" };
  if (v === "Adapta")         return { bg:"#F3E8FF", color:"#6D28D9" };
  return { bg:"#F2F4F7", color:"#BCC4CC" };
};

const ProgresionSection = ({ mob }) => (
  <div>
    <PageTitle mob={mob} icon="📈" title="Progresión del Modelo por Etapas" subtitle="La etapa establece el contexto de aprendizaje del grupo. La intervención se adapta al nivel, experiencia y necesidades de cada jugador." />
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:mob?8:10, marginBottom:18 }}>
      {ETAPAS.map(e => (
        <div key={e.id} style={{ background:e.color, borderRadius:10, padding:mob?"10px 8px":"14px", textAlign:"center" }}>
          <div style={{ fontSize:9, fontWeight:800, color:e.dark?C.primary:"rgba(255,255,255,0.65)", letterSpacing:mob?1:1.5, marginBottom:2 }}>{e.label}</div>
          <div style={{ fontSize:mob?10:12, fontWeight:900, color:e.dark?C.primary:C.white }}>{e.sub}</div>
          {!mob && <div style={{ fontSize:9, color:e.dark?C.primary:"rgba(255,255,255,0.75)", marginTop:3, marginBottom:8 }}>{e.cats}</div>}
          <div style={{ marginTop:mob?4:0, background:e.dark?C.primary:"rgba(255,255,255,0.18)", borderRadius:5, padding:"4px 6px", fontSize:9, fontWeight:700, color:e.dark?C.gold:C.white, lineHeight:1.4 }}>{e.principio}</div>
        </div>
      ))}
    </div>
    <div style={{ overflowX:"auto", borderRadius:12, boxShadow:"0 2px 10px rgba(0,0,0,0.07)", WebkitOverflowScrolling:"touch" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:mob?10:11, minWidth:480 }}>
        <thead>
          <tr>
            <th style={{ background:C.primary, color:C.white, padding:mob?"8px 10px":"11px 16px", textAlign:"left", fontWeight:700, fontSize:mob?10:11 }}>CONTENIDO</th>
            {[C.e1,C.e2,C.e3,C.e4].map((col, i) => (
              <th key={i} style={{ background:col, color:i===3?C.primary:C.white, padding:mob?"8px 6px":"11px 12px", textAlign:"center", fontSize:9, fontWeight:800, letterSpacing:0.5, minWidth:mob?80:105 }}>
                {mob ? ["E1","E2","E3","E4"][i] : ["E1 · INICIACIÓN","E2 · FAMILIAR","E3 · DESARROLLO","E4 · EXPRESIÓN"][i]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {progData.map((row, i) => (
            <tr key={i} style={{ background:i%2===0?C.white:C.softbg }}>
              <td style={{ padding:mob?"6px 10px":"8px 16px", fontWeight:600, color:C.primary, borderBottom:`1px solid ${C.border}`, fontSize:mob?10:11 }}>{row.p}</td>
              {[row.e1,row.e2,row.e3,row.e4].map((val, j) => { const s = cst(val); return (
                <td key={j} style={{ padding:mob?"6px 4px":"8px 12px", textAlign:"center", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ background:s.bg, color:s.color, borderRadius:5, padding:mob?"2px 5px":"3px 8px", fontSize:mob?9:10, fontWeight:700, display:"inline-block" }}>{val}</span>
                </td>
              ); })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div style={{ background:C.softbg, borderRadius:9, padding:"10px 14px", marginTop:12, marginBottom:10, border:`1px solid ${C.border}` }}>
      <p style={{ fontSize:mob?10:11, color:C.grey, margin:0, lineHeight:1.7 }}><strong style={{ color:C.primary }}>Nota: </strong>La progresión de cada contenido no representa el nivel global del jugador. Un jugador E4 puede seguir profundizando en conceptos introducidos en etapas anteriores. Lo que cambia es el grado de exigencia y autonomía con el que se trabajan.</p>
    </div>
    <div style={{ display:"grid", gridTemplateColumns:mob?"1fr 1fr":"repeat(6,1fr)", gap:8, marginTop:0 }}>
      {[
        { bg:"#F2F4F7", color:"#BCC4CC", label:"— No se trabaja" },
        { bg:"#E3F2FD", color:"#1565C0", label:"Descubre" },
        { bg:"#E8F5E9", color:"#2E7D32", label:"Comprende" },
        { bg:"#FFF8E1", color:"#C07000", label:"Aplica" },
        { bg:"#F3E8FF", color:"#6D28D9", label:"Adapta" },
        { bg:"#FFF3E0", color:"#E65100", label:"Solo F11 / Adapta F11" },
      ].map((item, i) => (
        <div key={i} style={{ background:item.bg, borderRadius:7, padding:"7px 8px", textAlign:"center" }}>
          <div style={{ fontSize:9, fontWeight:700, color:item.color }}>{item.label}</div>
        </div>
      ))}
    </div>
  </div>
);

const JugadorSection = ({ mob }) => (
  <div>
    <PageTitle mob={mob} icon="🌟" title="El Jugador del Canet F.C." subtitle="No el más alto ni el más rápido. El más inteligente tácticamente. El más autónomo. El mejor formado como persona." />
    <div style={{ background:C.primary, borderRadius:14, padding:mob?"16px":"24px 26px", marginBottom:18, boxShadow:"0 4px 16px rgba(0,0,0,0.12)" }}>
      <div style={{ fontSize:10, fontWeight:800, color:C.gold, marginBottom:14, letterSpacing:1.5 }}>EL PERFIL QUE BUSCAMOS CONSTRUIR</div>
      <div style={{ display:"grid", gridTemplateColumns:mob?"1fr 1fr":"repeat(3,1fr)", gap:mob?10:14 }}>
        {[
          { icon:"🧠", title:"Inteligente tácticamente",  desc:"Lee el juego antes de que ocurra. Toma decisiones basadas en lo que ve, no en lo que le dicen." },
          { icon:"🔄", title:"Comprende el juego desde cualquier posición", desc:"Comprende los principios del juego desde diferentes posiciones y sabe adaptar su comportamiento al contexto. El sistema cambia; los principios permanecen." },
          { icon:"⚡", title:"Autónomo en el campo",       desc:"Organiza a sus compañeros cuando la situación lo requiere, sin depender de instrucción del banquillo." },
          { icon:"💪", title:"Técnicamente sólido",        desc:"Control orientado, pase con intención, 1vs1 en banda y juego de espaldas ejecutados con fluidez y bajo presión, para liberar atención y poder centrarla en el juego." },
          { icon:"🤝", title:"Líder positivo",             desc:"Dentro y fuera del campo. Comunica y exige sin que el entrenador se lo pida." },
          { icon:"📈", title:"Mentalidad de mejora",       desc:"Identifica sus propios errores y trabaja para corregirlos. La autocrítica como motor de crecimiento." },
        ].map((item, i) => (
          <div key={i} style={{ background:"rgba(255,255,255,0.07)", borderRadius:10, padding:mob?"12px":"14px 16px" }}>
            <div style={{ fontSize:mob?18:22, marginBottom:7 }}>{item.icon}</div>
            <div style={{ fontSize:mob?11:12, fontWeight:800, color:C.gold, marginBottom:4 }}>{item.title}</div>
            <div style={{ fontSize:mob?10:11, color:"rgba(255,255,255,0.72)", lineHeight:1.7 }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":"1fr 1fr", gap:14 }}>
      <div style={{ background:C.softbg, borderRadius:12, padding:mob?"14px":"20px" }}>
        <div style={{ fontSize:13, fontWeight:800, color:C.primary, marginBottom:12 }}>✅ Al llegar al senior, sabe...</div>
        {["Ejecutar los fundamentos técnicos con fluidez para poder centrar su atención en el juego","Leer el juego antes de recibir y tener la decisión tomada al controlar","Generar superioridad mediante el cuadrado interior desde diferentes posiciones y situaciones de juego (F11)","Organizar a los compañeros durante el partido sin instrucción","Gestionar la presión del resultado sin que afecte a sus decisiones","Identificar por sí mismo qué ha hecho bien y qué puede mejorar"].map((item, i) => (
          <div key={i} style={{ display:"flex", gap:8, marginBottom:7 }}><span style={{ color:C.green, fontWeight:700, flexShrink:0 }}>✓</span><span style={{ fontSize:mob?11:12, color:C.dark, lineHeight:1.65 }}>{item}</span></div>
        ))}
      </div>
      <div style={{ background:C.softbg, borderRadius:12, padding:mob?"14px":"20px" }}>
        <div style={{ fontSize:13, fontWeight:800, color:C.primary, marginBottom:12 }}>🌱 El camino formativo</div>
        {[
          { e:"E1", color:C.e1, texto:"Se enamora del fútbol y del balón" },
          { e:"E2", color:C.e2, texto:"Aprende a pasar con intención y a usar la superioridad simple" },
          { e:"E3", color:C.e3, texto:"Entiende el juego: genera superioridad y lee las situaciones" },
          { e:"E4", color:C.e4, texto:"Expresa el modelo con autonomía progresiva, criterio y sello propio" },
        ].map((item, i) => (
          <div key={i} style={{ display:"flex", gap:9, marginBottom:10, alignItems:"flex-start" }}>
            <div style={{ background:item.color, borderRadius:6, padding:"3px 9px", fontSize:10, fontWeight:800, color:i===3?C.primary:C.white, flexShrink:0 }}>{item.e}</div>
            <div style={{ fontSize:mob?11:12, color:C.dark, lineHeight:1.7 }}>{item.texto}</div>
          </div>
        ))}
        <div style={{ marginTop:12, background:C.primary, borderRadius:9, padding:"11px 14px", fontSize:11, color:C.light, lineHeight:1.75 }}>
          Esto no ocurre en un año. Es el resultado de <strong style={{ color:C.gold }}>8-10 años de proceso coherente</strong>, con los mismos principios, en todas las categorías, todos los días.
        </div>
      </div>
    </div>
    <GoldBar mob={mob} text="El mejor jugador del Canet F.C. no es el que más goles marca en benjamines. Es el que a los 18 años entiende el juego mejor que nadie, comprende los principios desde cualquier posición en el campo y cuando pierde el balón ya está presionando." />
  </div>
);

// ══════════════════════════════════════════════════════════════
// CULTURA
// ══════════════════════════════════════════════════════════════

const ValoresSection = ({ mob }) => (
  <div>
    <PageTitle mob={mob} icon="💎" title="Los 7 Valores del Club" subtitle="No son palabras decorativas. Son criterios de decisión reales. Cuando no sabes cómo actuar, estos valores te dan la respuesta." />
    <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":"repeat(auto-fill,minmax(280px,1fr))", gap:12 }}>
      {[
        { icon:"🤝", color:C.primary,  name:"RESPETO",      desc:"Al compañero, al rival, al árbitro, al entrenador y a la familia. Es la condición necesaria para que exista confianza colectiva. Sin respeto no hay equipo posible." },
        { icon:"😄", color:C.accent,   name:"DISFRUTE",     desc:"El fútbol es un juego y debe sentirse así en todas las categorías. Un jugador que no disfruta no aprende, no rinde y no se queda." },
        { icon:"🏡", color:C.e1,       name:"PERTENENCIA",  desc:"Somos un club de pueblo. El jugador representa a su comunidad y juega con sus vecinos. Ese arraigo es una fortaleza diferencial que ninguna academia puede replicar." },
        { icon:"📚", color:"#6D28D9",  name:"APRENDIZAJE",  desc:"El error no se castiga: se comprende y se utiliza. Un jugador que intenta y falla aprende más que uno que no intenta por miedo." },
        { icon:"📈", color:C.green,    name:"SUPERACIÓN",   desc:"No comparamos jugadores entre sí. Cada jugador se compara con su versión anterior. La superación no busca ser mejor que el compañero: busca ser mejor que ayer." },
        { icon:"💪", color:C.red,      name:"ESFUERZO",     desc:"El talento sin esfuerzo no llega lejos. El esfuerzo sin talento llega más lejos de lo que nadie espera. Pedimos el máximo compromiso que cada jugador puede ofrecer de acuerdo con su edad, posibilidades y las exigencias de la tarea." },
        { icon:"🔷", color:C.gold,     name:"IDENTIDAD",    desc:"Todos los equipos del club juegan de forma reconociblemente coherente. Un observador externo debe ver los mismos principios en los benjamines y en el juvenil." },
      ].map((v, i) => (
        <div key={i} style={{ background:C.softbg, borderRadius:11, padding:mob?"14px 16px":"16px 18px", borderLeft:`4px solid ${v.color}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
            <div style={{ width:36, height:36, borderRadius:8, background:v.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{v.icon}</div>
            <div style={{ fontSize:13, fontWeight:800, color:C.primary }}>{v.name}</div>
          </div>
          <div style={{ fontSize:mob?11:12, color:C.grey, lineHeight:1.78 }}>{v.desc}</div>
        </div>
      ))}
    </div>
    <InfoBox mob={mob} icon="💡" label="Orden deliberado:">El Respeto es el fundamento sin el que todo lo demás se derrumba. El Disfrute es el motor. La Identidad es la consecuencia de vivir todos los valores con coherencia durante años.</InfoBox>
  </div>
);

const DecalegSection = ({ mob }) => (
  <div>
    <PageTitle mob={mob} icon="📋" title="Decálogo del Entrenador" subtitle="10 compromisos. No son recomendaciones. Son la forma de entender y ejercer la profesión en este club." />
    <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":"1fr 1fr", gap:10, marginBottom:16 }}>
      {[
        { n:"01", title:"Formas personas, no jugadores",           desc:"Eres el adulto de referencia durante 10 meses. Tu influencia va mucho más allá del fútbol. Actúa siempre con la responsabilidad que eso implica." },
        { n:"02", title:"El proceso es el objetivo",               desc:"El resultado del partido es información útil pero secundaria. El desarrollo real del jugador es el objetivo único de tu trabajo. Nunca los confundas." },
        { n:"03", title:"Diseña situaciones. Pregunta antes de corregir. Habla lo necesario", desc:"La enseñanza guiada —crear situaciones donde el jugador encuentre la solución— es el enfoque prioritario. Pero hay momentos en los que la instrucción directa es necesaria: cuando se introduce un concepto por primera vez, cuando el grupo está bloqueado, o cuando la corrección debe ser rápida y clara. El criterio es: primero diseña, luego pregunta, luego corrige. Y si tienes que corregir, que sea lo importante." },
        { n:"04", title:"Todo lo que enseñas tiene un por qué",    desc:"Antes de cada tarea debes poder responder: ¿qué quiero que aparezca hoy? Si no tienes respuesta, la tarea no está preparada. Cada tarea tiene un objetivo claro vinculado al modelo del club. Si no lo tienes claro, pregunta al coordinador." },
        { n:"05", title:"El error es una oportunidad",             desc:"Cuando un jugador se equivoca tienes la señal más precisa de lo que necesita aprender. No es una razón para castigar." },
        { n:"06", title:"Conoce a tus jugadores individualmente",  desc:"Sabe el nombre de todos, sus puntos fuertes y sus miedos. Un jugador que siente que su entrenador le conoce de verdad tiene mayor compromiso y mayor tolerancia al error." },
        { n:"07", title:"Aspira a ser absolutamente justo",        desc:"Las decisiones de alineación deben basarse exclusivamente en criterio de desarrollo. Nunca en amistad ni en presión de familias. La justicia es la base de tu autoridad moral." },
        { n:"08", title:"Las familias son aliadas",                desc:"Explícales el modelo desde el primer día. Gestiona sus expectativas con honestidad. Un conflicto familiar no gestionado a tiempo puede destruir la temporada de un jugador. Norma de obligado cumplimiento: después del partido no se realizan análisis tácticos ni valoraciones emocionales en caliente con familias ni con jugadores. El feedback en profundidad se hace en S1 de la semana siguiente, con distancia emocional y dentro del contexto de entrenamiento." },
        { n:"09", title:"El coordinador es tu recurso principal",  desc:"Las reuniones mensuales no son un control. Son tu apoyo profesional. Comparte tus dudas, dificultades y éxitos. El plan se construye y mejora entre todos." },
        { n:"10", title:"El fútbol es un privilegio, no un castigo", desc:"Quedan prohibidos los castigos físicos por errores en el juego. Si un equipo no está atento, pierde tiempo de juego libre o realiza una tarea de recogida de material. El castigo es perder tiempo de juego, nunca ganar tiempo de atletismo." },
      ].map((d, i) => (
        <div key={i} style={{ background:d.n==="10"?C.redBg:C.softbg, borderRadius:10, padding:mob?"12px 14px":"14px 16px", display:"flex", gap:12, alignItems:"flex-start", borderLeft:d.n==="10"?`3px solid ${C.red}`:"none" }}>
          <div style={{ width:34, height:34, borderRadius:8, background:d.n==="10"?C.red:C.gold, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:900, color:C.white, flexShrink:0 }}>{d.n}</div>
          <div>
            <div style={{ fontSize:mob?12:12, fontWeight:800, color:d.n==="10"?C.red:C.primary, marginBottom:4 }}>{d.title}</div>
            <div style={{ fontSize:mob?11:11, color:C.grey, lineHeight:1.65 }}>{d.desc}</div>
          </div>
        </div>
      ))}
    </div>
    <GoldBar mob={mob} text="El modelo no se evalúa por lo que el entrenador explica, sino por lo que el jugador hace sin que nadie le diga nada." />
  </div>
);

const InnegSection = ({ mob }) => {
  const innegociables = [
    { icon:"💪", title:"Máximo compromiso en cada entrenamiento y partido", desc:"No pedimos que todos tengan el mismo nivel. Pedimos el máximo que cada jugador puede dar según su edad y posibilidades. El jugador que no se implica no falta al entrenador: falta a sus compañeros que sí lo hacen." },
    { icon:"🤝", title:"Respeto absoluto y sin condiciones",               desc:"Al compañero, al rival, al árbitro y al entrenador. Sin excepción. La primera vez: conversación directa y privada. La segunda vez: consecuencias concretas." },
    { icon:"📈", title:"Actitud de mejora permanente",                     desc:"El jugador que cree que ya sabe suficiente ha dejado de aprender. Pregunta cuando no entiende, intenta cosas nuevas y acepta la corrección como una oportunidad de mejorar." },
    { icon:"👥", title:"Compromiso real con el equipo",                    desc:"Los entrenamientos y los partidos son compromisos con los compañeros. Las ausencias sin avisar con antelación afectan al grupo y no son aceptables." },
    { icon:"⚖️", title:"Juego limpio siempre",                           desc:"Competimos para ganar pero nunca a cualquier precio. La trampa, la simulación deliberada y el juego violento no tienen cabida en el Canet F.C." },
  ];
  const normas = [
    { icon:"👕", title:"Vestimenta oficial del club",     desc:"Se entrena y se compite siempre con la equipación oficial del Canet F.C." },
    { icon:"🖐️", title:"Respetar a todos los entrenadores del club", desc:"Saludar y dar la mano a todos los entrenadores del club, no solo al propio. Todos representan el mismo proyecto." },
    { icon:"🚿", title:"Ducha e higiene después de cada sesión",  desc:"La ducha es obligatoria después del entrenamiento y del partido. Hábito de respeto hacia uno mismo y hacia los compañeros." },
    { icon:"⏰", title:"Puntualidad: 10-15 minutos antes",         desc:"Llegar 10 o 15 minutos antes de cada entrenamiento y partido. El que llega justo llega tarde." },
  ];
  const CardItem = ({ item, color }) => (
    <div style={{ background:C.softbg, borderRadius:10, padding:mob?"14px":"15px 18px", display:"flex", gap:14, alignItems:"flex-start", borderLeft:`4px solid ${color}` }}>
      <div style={{ width:mob?34:40, height:mob?34:40, borderRadius:9, background:color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:mob?17:19, flexShrink:0 }}>{item.icon}</div>
      <div>
        <div style={{ fontSize:mob?12:13, fontWeight:800, color:C.primary, marginBottom:4 }}>{item.title}</div>
        <div style={{ fontSize:mob?11:12, color:C.grey, lineHeight:1.72 }}>{item.desc}</div>
      </div>
    </div>
  );
  return (
    <div>
      <PageTitle mob={mob} icon="⚡" title="Innegociables y Normas del Jugador" subtitle="Los innegociables son de carácter y actitud: no tienen excepción. Las normas son de organización: definen cómo funcionamos como club." />

      <div style={{ fontSize:mob?12:13, fontWeight:800, color:C.primary, marginBottom:10, paddingBottom:6, borderBottom:`2px solid ${C.primary}` }}>⚡ INNEGOCIABLES — Actitud y valores</div>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
        {innegociables.map((item, i) => <CardItem key={i} item={item} color={C.primary} />)}
      </div>

      <div style={{ fontSize:mob?12:13, fontWeight:800, color:C.grey, marginBottom:10, paddingBottom:6, borderBottom:`2px solid ${C.border}` }}>📋 NORMAS DEL CLUB — Organización y hábitos</div>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
        {normas.map((item, i) => <CardItem key={i} item={item} color={C.grey} />)}
      </div>

      <GoldBar mob={mob} text="El Canet F.C. forma jugadores con criterio y personas con valores. Los dos van siempre juntos." />
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// METODOLOGÍA
// ══════════════════════════════════════════════════════════════

const ESTRUCTURA_SEMANAL = `S1 · Lunes / Martes — Charla post partido (si procede) + Técnica con contexto táctico
S2 · Miércoles — FGL (Fundamento Global de Juego) colectivo + Partido condicionado · Día de mayor carga de la semana
S3 · Viernes — Finalización + Activación pre-partido · Carga física reducida`;


// ── EL CICLO CANET ────────────────────────────────────────────
const CicloCanetSection = ({ mob }) => {
  const pasos = [
    { n:"01", icon:"🔷", label:"MODELO",       desc:"Partimos siempre de un principio del modelo. El comportamiento que queremos desarrollar es el punto de partida, nunca el ejercicio en sí.", color:C.primary },
    { n:"02", icon:"🎯", label:"CONCEPTO",     desc:"Identificamos el concepto concreto que queremos trabajar esa sesión. ¿Qué queremos que aparezca hoy?", color:C.accent },
    { n:"03", icon:"⚽", label:"TAREA",        desc:"Diseñamos o elegimos una tarea que provoque ese comportamiento. La tarea es el medio, nunca el objetivo.", color:C.green },
    { n:"04", icon:"👁️", label:"OBSERVACIÓN",  desc:"Durante la tarea observamos: ¿está apareciendo el comportamiento que buscamos? ¿Genera la ventaja que esperamos?", color:"#6D28D9" },
    { n:"05", icon:"🔧", label:"ADAPTACIÓN",   desc:"Si no aparece, modificamos la tarea antes de cambiarla. Si aparece con facilidad, la hacemos más compleja. El mismo ejercicio en tres niveles.", color:C.gold },
  ];
  return (
    <div>
      <PageTitle mob={mob} icon="🔁" title="El Ciclo Canet" subtitle="El entrenador del Canet F.C. trabaja siempre con este ciclo. No importa la categoría ni el nivel de formación: el proceso es siempre el mismo." />
      <div style={{ background:C.primary, borderRadius:14, padding:mob?"16px":"22px 26px", marginBottom:20 }}>
        <div style={{ fontSize:mob?11:12, fontWeight:800, color:C.gold, marginBottom:16, letterSpacing:1.5, textAlign:"center" }}>EL CICLO DEL ENTRENADOR CANET</div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:mob?6:10, flexWrap:"wrap" }}>
          {pasos.map((p, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:mob?6:10 }}>
              <div style={{ background:p.color, borderRadius:10, padding:mob?"10px 12px":"12px 16px", textAlign:"center", minWidth:mob?60:80 }}>
                <div style={{ fontSize:mob?16:20, marginBottom:4 }}>{p.icon}</div>
                <div style={{ fontSize:mob?9:10, fontWeight:800, color:p.color===C.gold?C.primary:C.white, letterSpacing:0.5 }}>{p.label}</div>
              </div>
              {i < pasos.length - 1 && <div style={{ fontSize:mob?16:22, color:C.gold, fontWeight:700, flexShrink:0 }}>→</div>}
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:14, fontSize:mob?11:12, color:"rgba(255,255,255,0.6)", fontStyle:"italic" }}>
          ... y vuelve al inicio. El ciclo se repite cada sesión, cada semana, toda la temporada.
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":"repeat(5,1fr)", gap:12, marginBottom:20 }}>
        {pasos.map((p, i) => (
          <div key={i} style={{ borderRadius:12, boxShadow:"0 1px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ background:p.color, padding:"12px 14px" }}>
              <div style={{ fontSize:9, fontWeight:800, color:p.color===C.gold?C.primary:"rgba(255,255,255,0.65)", letterSpacing:1.5, textTransform:"uppercase", marginBottom:4 }}>PASO {p.n}</div>
              <div style={{ fontSize:mob?13:14, fontWeight:900, color:p.color===C.gold?C.primary:C.white }}>{p.label}</div>
            </div>
            <div style={{ background:C.white, padding:"12px 14px" }}>
              <p style={{ fontSize:mob?11:12, color:C.grey, lineHeight:1.75, margin:0 }}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background:C.gold, borderRadius:12, padding:mob?"16px":"18px 24px", textAlign:"center", marginBottom:16 }}>
        <p style={{ fontSize:mob?15:18, fontWeight:900, color:C.primary, margin:"0 0 8px" }}>¿Qué quiero que aparezca hoy?</p>
        <p style={{ fontSize:mob?12:13, color:C.primary, margin:0, opacity:0.8 }}>Esta es la pregunta que debe hacerse el entrenador antes de cada sesión. Si no tiene respuesta, la sesión no está preparada.</p>
      </div>
      <div style={{ background:C.softbg, borderRadius:12, padding:mob?"14px":"16px 20px" }}>
        <div style={{ fontSize:mob?10:11, fontWeight:800, color:C.grey, marginBottom:14, letterSpacing:1.2, textAlign:"center" }}>EL CICLO COMPLETO — SEMANA A SEMANA</div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:mob?4:8, flexWrap:"wrap" }}>
          {[
            { label:"PLANIFICAR",  sub:"¿Qué principio y concepto?",     color:C.primary },
            { label:"ENTRENAR",    sub:"Diseño y ejecución de la tarea",  color:C.accent },
            { label:"OBSERVAR",    sub:"¿Está apareciendo el comportamiento?", color:"#6D28D9" },
            { label:"EVALUAR",     sub:"¿Ha generado ventaja real?",      color:C.red },
            { label:"ADAPTAR",     sub:"Ajustar el siguiente ciclo",      color:C.green },
          ].map((step, i, arr) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:mob?4:8 }}>
              <div style={{ textAlign:"center" }}>
                <div style={{ background:step.color, borderRadius:8, padding:mob?"6px 8px":"8px 12px", marginBottom:4 }}>
                  <div style={{ fontSize:mob?9:10, fontWeight:900, color:C.white, whiteSpace:"nowrap" }}>{step.label}</div>
                </div>
                <div style={{ fontSize:mob?8:9, color:C.grey, lineHeight:1.3, maxWidth:mob?60:80 }}>{step.sub}</div>
              </div>
              {i < arr.length-1 && <div style={{ fontSize:mob?12:16, color:C.gold, fontWeight:700, flexShrink:0, marginBottom:16 }}>→</div>}
            </div>
          ))}
        </div>
        <p style={{ fontSize:mob?10:11, color:C.grey, textAlign:"center", margin:"12px 0 0", fontStyle:"italic" }}>La evaluación no cierra el ciclo: lo reinicia. Los datos de observación y evaluación alimentan la siguiente planificación.</p>
      </div>
    </div>
  );
};

// ── CÓMO APRENDEMOS ──────────────────────────────────────────
const AprendizajeSection = ({ mob }) => {
  const si = [
    { icon:"🎮", t:"Participa y decide",    d:"El jugador aprende cuando es él quien resuelve el problema, no cuando escucha la solución. Cuantas más decisiones toma, más aprende." },
    { icon:"❌", t:"Se equivoca y prueba",   d:"El error en un entorno diseñado correctamente es información, no fracaso. Un jugador que nunca se equivoca probablemente no está siendo suficientemente desafiado." },
    { icon:"🎯", t:"Entiende el propósito",  d:"El jugador aprende mejor cuando entiende por qué hace lo que hace. No necesita saber todo el modelo: necesita entender el objetivo de la tarea." },
    { icon:"📈", t:"Gana autonomía",         d:"El objetivo a largo plazo es que el jugador tome decisiones sin el entrenador. Cada tarea debe dar un paso en esa dirección." },
    { icon:"🗣️", t:"Recibe instrucción directa cuando la necesita", d:"Hay situaciones donde la instrucción directa es la herramienta correcta: un concepto completamente nuevo, un grupo bloqueado que no progresa, o una corrección que debe ser rápida y clara. El entrenador elige cuándo guiar y cuándo decir." },
  ];
  const no = [
    { icon:"🗣️", t:"Filas esperando",       d:"El tiempo de actividad es tiempo de aprendizaje. Las filas largas son tiempo perdido." },
    { icon:"📋", t:"Explicaciones que sustituyen la experiencia", d:"Las explicaciones deben ser breves y funcionales. Si el entrenador necesita explicar durante largos periodos para que la tarea funcione, debe revisar el diseño." },
    { icon:"🤖", t:"Ejecuta sin entender",   d:"El jugador que solo ejecuta lo que le dicen acaba dependiendo del entrenador. Queremos jugadores que piensen." },
    { icon:"😰", t:"Miedo al error",         d:"Si el jugador tiene miedo a equivocarse, no intentará cosas nuevas. Y sin intentarlo, no aprenderá." },
  ];
  return (
    <div>
      <PageTitle mob={mob} icon="🧠" title="Cómo Aprendemos en el Canet F.C." subtitle="El jugador aprende mejor cuando participa, decide, se equivoca y entiende el propósito de lo que hace. No cuando escucha y ejecuta." />
      <div style={{ background:C.primary, borderRadius:12, padding:mob?"16px":"20px 24px", marginBottom:18 }}>
        <p style={{ fontSize:mob?14:16, fontWeight:800, color:C.gold, margin:"0 0 10px", textAlign:"center" }}>La enseñanza guiada es el enfoque prioritario, no el único.</p>
        <p style={{ fontSize:mob?12:13, color:C.white, margin:0, textAlign:"center", lineHeight:1.8 }}>El objetivo es crear situaciones donde el jugador encuentre la solución. Pero hay momentos —concepto nuevo, grupo bloqueado, corrección urgente— donde la instrucción directa es la herramienta correcta.</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":"1fr 1fr", gap:14, marginBottom:18 }}>
        <div style={{ background:C.greenBg, borderRadius:12, padding:mob?"14px":"16px 18px", borderLeft:`3px solid ${C.green}` }}>
          <div style={{ fontSize:11, fontWeight:800, color:C.green, marginBottom:12, letterSpacing:0.5 }}>✅ EL JUGADOR APRENDE CUANDO</div>
          {si.map((item, i) => (
            <div key={i} style={{ display:"flex", gap:10, marginBottom:i<si.length-1?10:0, paddingBottom:i<si.length-1?10:0, borderBottom:i<si.length-1?`1px solid ${C.border}`:"none" }}>
              <span style={{ fontSize:18, flexShrink:0 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize:mob?11:12, fontWeight:700, color:C.green, marginBottom:3 }}>{item.t}</div>
                <div style={{ fontSize:mob?11:11, color:C.grey, lineHeight:1.65 }}>{item.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background:C.redBg, borderRadius:12, padding:mob?"14px":"16px 18px", borderLeft:`3px solid ${C.red}` }}>
          <div style={{ fontSize:11, fontWeight:800, color:C.red, marginBottom:12, letterSpacing:0.5 }}>❌ LO QUE EVITAMOS COMO MÉTODO PRINCIPAL</div>
          {no.map((item, i) => (
            <div key={i} style={{ display:"flex", gap:10, marginBottom:i<no.length-1?10:0, paddingBottom:i<no.length-1?10:0, borderBottom:i<no.length-1?`1px solid ${C.border}`:"none" }}>
              <span style={{ fontSize:18, flexShrink:0 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize:mob?11:12, fontWeight:700, color:C.red, marginBottom:3 }}>{item.t}</div>
                <div style={{ fontSize:mob?11:11, color:C.grey, lineHeight:1.65 }}>{item.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <InfoBox mob={mob} icon="💡" label="Para el entrenador:">La pregunta y el silencio bien gestionado son herramientas poderosas. Pero no son las únicas. Cuando introduces un concepto nuevo, cuando el grupo lleva tiempo bloqueado sin avanzar, o cuando necesitas una corrección rápida antes de que se fije un error, la instrucción directa y clara es lo correcto. El criterio no es "nunca instruir": es no hacerlo de forma constante y sin propósito.</InfoBox>
    </div>
  );
};

// ── CÓMO DISEÑAMOS TAREAS ─────────────────────────────────────
const TareasSection = ({ mob }) => {
  const puedoModificar = [
    { label:"Espacio",      desc:"Más espacio → más fácil · Menos espacio → más exigente" },
    { label:"Jugadores",    desc:"Superioridad → más fácil · Igualdad o inferioridad → más difícil" },
    { label:"Reglas",       desc:"Añadir o quitar condiciones cambia el comportamiento que aparece" },
    { label:"Tiempo",       desc:"Más tiempo para decidir → más fácil · Límite de toques → más exigente" },
    { label:"Oposición",    desc:"Defensores pasivos → más fácil · Defensores activos → más difícil" },
    { label:"Dirección",    desc:"Cambiar hacia dónde se juega cambia los problemas que aparecen" },
  ];
  return (
    <div>
      <PageTitle mob={mob} icon="⚙️" title="Cómo Diseñamos una Tarea" subtitle="Antes de plantear cualquier tarea, el entrenador responde a estas preguntas. Si no puede responderlas, la tarea no está lista." />
      <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>
        {[
          { n:"01", q:"¿Qué quiero que aparezca?", e:"Generación de superioridad interior · pase con intención · Pressing tras pérdida...", color:C.primary },
          { n:"02", q:"¿Qué problema tiene que resolver el jugador?", e:"El rival cierra el centro · no hay espacio en banda · se pierde el balón bajo presión...", color:C.accent },
          { n:"03", q:"¿Qué tarea provoca ese comportamiento?", e:"Elige de la biblioteca o diseña una situación donde el problema aparezca de forma natural.", color:C.green },
          { n:"04", q:"¿Qué voy a observar?", e:"Define antes de empezar qué señal te dice que el comportamiento está apareciendo.", color:"#6D28D9" },
          { n:"05", q:"Si no aparece, ¿qué voy a modificar?", e:"Piensa antes en cómo simplificar. No cambies de ejercicio: cambia una condición.", color:C.gold },
          { n:"06", q:"¿Es adecuada para este grupo?", e:"Una tarea puede estar bien diseñada y ser incorrecta para esta etapa o nivel real del grupo. Verifica que el reto sea alcanzable con esfuerzo.", color:C.grey },
        ].map((item, i) => (
          <div key={i} style={{ background:C.softbg, borderRadius:10, padding:mob?"12px 14px":"14px 18px", display:"flex", gap:14, alignItems:"flex-start", borderLeft:`4px solid ${item.color}` }}>
            <div style={{ width:36, height:36, borderRadius:8, background:item.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:900, color:item.color===C.gold?C.primary:C.white, flexShrink:0 }}>{item.n}</div>
            <div>
              <div style={{ fontSize:mob?13:14, fontWeight:800, color:C.primary, marginBottom:5 }}>{item.q}</div>
              <div style={{ fontSize:mob?11:12, color:C.grey, lineHeight:1.7, fontStyle:"italic" }}>Ejemplo: {item.e}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom:18 }}>
        <div style={{ fontSize:mob?13:14, fontWeight:800, color:C.primary, marginBottom:12 }}>Qué puedo modificar en una tarea</div>
        <div style={{ display:"grid", gridTemplateColumns:mob?"1fr 1fr":"repeat(3,1fr)", gap:10 }}>
          {puedoModificar.map((item, i) => (
            <div key={i} style={{ background:C.white, borderRadius:10, padding:"12px 14px", border:`1px solid ${C.border}`, borderTop:`3px solid ${C.accent}` }}>
              <div style={{ fontSize:mob?12:13, fontWeight:800, color:C.primary, marginBottom:5 }}>{item.label}</div>
              <div style={{ fontSize:mob?10:11, color:C.grey, lineHeight:1.65 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background:C.primary, borderRadius:12, padding:mob?"16px":"18px 24px", marginBottom:14 }}>
        <div style={{ fontSize:mob?13:14, fontWeight:800, color:C.gold, marginBottom:10 }}>Primero modifica la tarea. Después cambia el ejercicio. Siempre que la tarea siga siendo adecuada para el objetivo.</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <div style={{ background:C.redBg, borderRadius:8, padding:"12px 14px" }}>
            <div style={{ fontSize:10, fontWeight:800, color:C.red, marginBottom:6 }}>❌ NO HAGAS</div>
            <div style={{ fontSize:mob?11:12, color:C.dark, lineHeight:1.7 }}>"Este ejercicio no funciona" y cambias de ejercicio antes de haber intentado modificarlo.</div>
          </div>
          <div style={{ background:C.greenBg, borderRadius:8, padding:"12px 14px" }}>
            <div style={{ fontSize:10, fontWeight:800, color:C.green, marginBottom:6 }}>✅ HAZ ESTO</div>
            <div style={{ fontSize:mob?11:12, color:C.dark, lineHeight:1.7 }}>"No aparece la superioridad. Voy a dar más espacio o añadir un comodín para que el comportamiento emerja."</div>
          </div>
        </div>
      </div>
      <InfoBox mob={mob} icon="🔑" label="El mantra:">La tarea debe favorecer que el comportamiento aparezca con la mínima instrucción posible. Si tienes que parar constantemente para corregir, revisa el diseño. Y si la tarea deja de ser adecuada para el objetivo, sustitúyela; no la defiendas a toda costa.</InfoBox>
    </div>
  );
};


const macroData = {
  1: {
    razonCognitiva:"El niño en estadio preoperacional (Piaget) ve el juego desde su propia perspectiva y aún no puede ponerse en el lugar del compañero — no es un defecto, es su momento evolutivo. En S8 priorizamos el juego libre y la relación afectiva con el balón sin más. En S9, sin salir del trabajo individual, podemos introducir los primeros fundamentos técnicos de forma lúdica: el control orientado, el 1vs1 y la protección del balón son contenidos sobre 'yo y el balón' que no exigen comprensión colectiva. La cooperación táctica espera a S10.",
    sessions:[
      { s:"S1", t:"Juego libre con balón + retos individuales", o:"S8: conducción libre, juegos de persecución, 1vs1 espontáneo · S9: añadir control orientado y protección del balón de forma lúdica · Sin análisis del partido anterior" },
      { s:"S2", t:"Juegos individuales + partido libre", o:"S8: partido en espacio amplio con pocas reglas · S9: situaciones de 1vs1 con finalización + partido libre · El niño descubre, no recibe táctica explicada" },
      { s:"S3", t:"Finalización lúdica + activación", o:"Disparos a portería libres · S9 puede añadir situaciones de regate y protección · Alta actividad, baja instrucción · Sin carga física elevada" },
    ],
    plan:[
      { b:"Sep-Oct", e:"Relación afectiva con el balón",   p:"Balón como herramienta", i:["Conducción libre y con cambios de dirección","Juegos de persecución con balón","1vs1 espontáneo · S9: primeras situaciones de protección"] },
      { b:"Nov-Dic", e:"Control orientado y golpeo (S9)",  p:"Balón como herramienta", i:["Control orientado hacia espacio libre · S8: control rodando","Golpeo a portería desde distintos ángulos","S9: 1vs1 con finalización · S8: disparo libre"] },
      { b:"Ene-Feb", e:"El 1vs1 como juego central",       p:"1vs1 en banda como desequilibrio", i:["1vs1 en espacios delimitados","Robo de balón","Protección del balón"] },
      { b:"Mar-Abr", e:"Orientación y dirección",          p:"Todo pase tiene una intención", i:["Juegos con dos porterías","2vs2 y 3vs3 libres","Pie no dominante"] },
      { b:"May-Jun", e:"Integración y celebración",        p:"Relación libre y positiva con el balón", i:["Torneos internos","Retos individuales","Fiesta del aprendizaje"] },
    ],
    diaPartido:[
      { momento:"Antes", items:["Llegada libre con balón · Sin charla táctica estructurada","Para S8 y S9: una instrucción sencilla de posición si el entrenador lo ve necesario · No más"] },
      { momento:"Durante", items:["El entrenador anima y observa desde fuera","Instrucciones simples y puntuales si un jugador lo necesita · No correcciones colectivas constantes"] },
      { momento:"Descanso", items:["Agua, descanso y un momento positivo del entrenador con el grupo","Una sola idea muy concreta y entendible · máximo 1 minuto","Refuerzo positivo: qué han hecho bien · nada de correcciones tácticas"] },
      { momento:"Después", items:["Una pregunta: ¿Lo habéis pasado bien? Nada más","El análisis del juego no es para esta edad"] },
    ],
  },
  2: {
    razonCognitiva:"El niño entra en el estadio operacional concreto (Piaget): empieza a descentrarse, puede tomar en cuenta al compañero y entender causa-efecto en situaciones simples. Es el momento de introducir el 2vs1 y el 3vs2: no como táctica abstracta, sino como juego concreto donde descubren que ser más genera ventaja. La vivencia sigue siendo el motor; la explicación, solo un apoyo puntual.",
    sessions:[
      { s:"S1", t:"Repaso vivencial + Técnica individual", o:"Sin análisis táctico largo · Corrección técnica puntual a través del juego · Fundamento del mes en situaciones reales" },
      { s:"S2", t:"FGL colectivo + Partido condicionado", o:"FGL (Fundamento Global de Juego): 2vs1 / 3vs2 con progresión · Partido condicionado donde la regla provoca el comportamiento" },
      { s:"S3", t:"Finalización + Activación pre-partido", o:"Situaciones de finalización con oposición básica · Partido pequeño de activación · Carga física reducida" },
    ],
    plan:[
      { b:"Sep", e:"Control orientado + Pase con intención",     p:"Todo pase tiene una intención", i:["Control sin presión","Control con oponente","2vs1 simple"] },
      { b:"Oct", e:"1vs1 en banda + 2vs1",                       p:"1vs1 en banda como desequilibrio", i:["1vs1 recurso 1: cambio de ritmo","1vs1 recurso 2: cambio de dirección","2vs1 portador y apoyo"] },
      { b:"Nov", e:"Pase con intención + 2vs1 variantes",        p:"Todo pase tiene una intención", i:["Pase corto/medio con intención","2vs1 variantes de ángulo","2vs1 + finalización"] },
      { b:"Dic", e:"Protección del balón + Pressing básico",     p:"Defendemos para recuperar", i:["Protección en 1vs1","Pressing inmediato tras pérdida","Pérdida + pressing"] },
      { b:"Ene", e:"Desmarque de apoyo + 3vs2",                  p:"Atraemos para filtrar", i:["Desmarque de apoyo","3vs2 en espacio amplio","3vs2 con presión"] },
      { b:"Feb", e:"Construcción desde el portero",              p:"El balón es nuestra herramienta", i:["Salida del portero 3vs1","Construcción con presión","Construcción + finalización"] },
      { b:"Mar", e:"Amplitud + Superioridades numéricas",        p:"Atraemos para filtrar, filtramos para atacar", i:["Juego de posición con amplitud","3vs2 con amplitud · ¿quién está libre?","4vs3 libre · buscan al jugador libre"] },
      { b:"Abr", e:"Integración del modelo",                     p:"Todos los principios", i:["Revisión fundamentos más débiles","Partido con todas las condiciones","Paradas y correcciones"] },
    ],
    diaPartido:[
      { momento:"Antes", items:["Posesión de activación corta · principio dominante de la etapa","1 idea táctica concreta · no más"] },
      { momento:"Durante", items:["El entrenador observa y da instrucciones cortas y concretas","Evitar la instrucción constante desde fuera: el equipo debe gestionar las situaciones"] },
      { momento:"Descanso", items:["1 ajuste colectivo concreto + 1 refuerzo positivo","Máximo 5 minutos · dejar que los jugadores respiren"] },
      { momento:"Después", items:["El entrenador hace el registro post partido (2 min): 1 🟢 + 1 🔴","El análisis real se hace en S1 de la semana siguiente"] },
    ],
  },
  3: {
    razonCognitiva:"El jugador consolida el pensamiento operacional concreto y empieza a desarrollar el razonamiento lógico (Piaget, inicio del estadio formal). Ya puede entender por qué hacemos lo que hacemos si se le explica con referencias concretas del partido. La pertenencia al grupo y la identidad de equipo son motores clave a esta edad (Erikson): el jugador quiere formar parte de algo y sentirse reconocido dentro del colectivo.",
    sessions:[
      { s:"S1", t:"Análisis breve + Técnica contextualizada", o:"Charla corta guiada por el entrenador (máx. 5 min) con referencias al partido · Fundamento técnico del mes en situaciones con oposición" },
      { s:"S2", t:"FGL colectivo + Partido condicionado", o:"FGL (Fundamento Global de Juego) del mes con complejidad progresiva · Partido condicionado donde la regla obliga a aplicar el comportamiento buscado" },
      { s:"S3", t:"Finalización + Activación pre-partido", o:"Situaciones de finalización con contexto táctico · máx. 2 referencias al rival si procede · Carga física reducida" },
    ],
    plan:[
      { b:"Sep", e:"Control orientado + 2vs1 revisión (70% E2)",      p:"El balón es nuestra herramienta", i:["Control bajo presión","2vs1 todas las variantes","Proporción 70% E2"] },
      { b:"Oct", e:"Juego de espaldas + 3vs2",                        p:"Atraemos para filtrar", i:["Juego de espaldas en 1vs1","3vs2 defensa activa","3vs2 construcción-finalización"] },
      { b:"Nov", e:"Pase filtrado + Tercer hombre",                   p:"Todo pase tiene una intención", i:["Pase filtrado oponente pasivo","Pase filtrado oponente activo","Tercer hombre: A→B, B→C, C→A"] },
      { b:"Dic", e:"1vs1 elección + Pressing por zonas",              p:"Defendemos para recuperar", i:["1vs1: elegir el recurso según el defensor","Pressing colectivo por zonas","Pressing + recuperación + transición"] },
      { b:"Ene", e:"Desmarque de ruptura + Cuadrado Interior (F11)",  p:"Superioridad en el carril central", i:["Desmarque de ruptura con timing exacto","Cuadrado interior 4vs3 (solo F11)","Cuadrado + extremos simultáneos (F11)"] },
      { b:"Feb", e:"Conducción en velocidad + Tercer hombre + Pared", p:"Atraemos para filtrar", i:["Conducción con cambio de ritmo","Pared a alta velocidad","Tercer hombre con presión real"] },
      { b:"Mar", e:"Remate + Cambio de orientación",                  p:"Verticalidad al filtrar", i:["Remate en movimiento con ambos pies","Cambio de orientación en máx. 3 toques","Cambio de orientación + cuadrado (F11)"] },
      { b:"Abr", e:"Integración modelo completo E3",                  p:"Todos los principios", i:["Fundamentos más débiles del grupo","Partido con todas las condiciones","Paradas y correcciones específicas"] },
    ],
    diaPartido:[
      { momento:"Antes", items:["Posesión de activación · principio dominante de la etapa","1 idea táctica + máximo 2 situaciones concretas del rival"] },
      { momento:"Durante", items:["El entrenador observa el principio dominante","Instrucciones puntuales y concretas · evitar la instrucción constante desde fuera"] },
      { momento:"Descanso", items:["2 min de agua · el entrenador organiza sus ideas antes de hablar","Análisis guiado por el entrenador con referencias a situaciones concretas del partido","Correcciones colectivas e individuales con detalle · es el momento pedagógico más valioso del partido","El entrenador dirige y estructura la charla · los jugadores escuchan y responden","Cierre con un mensaje táctico claro y alcanzable para la segunda parte"] },
      { momento:"Después", items:["El entrenador hace el registro post partido (2 min): 1 🟢 + 1 🔴","El análisis en profundidad se hace en S1 de la semana siguiente"] },
    ],
  },
  4: {
    razonCognitiva:"El jugador ha alcanzado el pensamiento formal (Piaget): puede razonar en abstracto, anticipar situaciones y entender el juego sin necesitar vivirlo primero. La formación de identidad (Erikson) es el reto central: el jugador necesita autonomía real, reconocimiento y sentido de propósito dentro del equipo. El análisis táctico detallado, la participación en decisiones y la autoevaluación son herramientas pedagógicas de primer orden a esta edad.",
    sessions:[
      { s:"S1", t:"Análisis guiado + Técnico / táctico", o:"Análisis estructurado del partido (10-12 min) guiado por el entrenador · participación activa del jugador · fundamento técnico-táctico de la semana" },
      { s:"S2", t:"FGL colectivo + Partido condicionado", o:"FGL (Fundamento Global de Juego) del mes con alta complejidad · últimos 14 min autogestionados por el equipo · partido condicionado" },
      { s:"S3", t:"Finalización + Activación pre-partido", o:"Finalización con contexto táctico real · máx. 2 situaciones del rival · si hay alta intensidad: sesión corta con recuperación suficiente" },
    ],
    plan:[
      { b:"Sep", e:"Diagnóstico + Cuadrado interior base",            p:"Superioridad en el carril central", i:["Semanas iniciales: diagnóstico real del grupo","Segunda quincena: cuadrado interior consolidado","Cierre del mes: primera variante según nivel observado"] },
      { b:"Oct", e:"Construcción bajo pressing alto",                 p:"El balón es nuestra herramienta", i:["Rombo de construcción pressing ×1","Salida en tercera pressing ×2","Cambio de orientación pressing ×3"] },
      { b:"Nov", e:"Pressing orientado + disparadores",               p:"Defendemos para recuperar", i:["Disparador 1: pase atrás del rival","Disparador 2: control interior del lateral","Trampa de pressing"] },
      { b:"Dic", e:"Superioridades y relaciones Z2-Z3",              p:"Superioridad en el carril central", i:["Z2: cuadrado interior + extremos abiertos","Z3: superioridad desde 3 ángulos distintos","Encadenamiento Z2 → Z3"] },
      { b:"Ene", e:"Transiciones: atacar y defender",                p:"Defendemos para recuperar", i:["Transición positiva: primeros segundos tras recuperar","Pressing tras pérdida: primeros segundos tras perder","Pressing tras pérdida + transición encadenadas"] },
      { b:"Feb", e:"Pressing avanzado y trampas tácticas",           p:"Defendemos para recuperar", i:["Trampa en banda: orientar y cerrar","Trampa en construcción: dejar el pivote","El equipo diseña su propia trampa"] },
      { b:"Mar", e:"Gestión del partido según el resultado",         p:"Todos los principios", i:["Gestionar la ventaja","Gestionar el empate","Gestionar el marcador adverso"] },
      { b:"Abr", e:"Autonomía progresiva del equipo",                p:"Todos los principios", i:["Reducir progresivamente las intervenciones del banquillo","El grupo identifica sus propios errores y propone ajustes","El entrenador interviene solo cuando la situación lo requiere"] },
    ],
    diaPartido:[
      { momento:"Antes", items:["Posesión de activación · principio dominante de la etapa","1 idea táctica concreta · el entrenador cierra el mensaje"] },
      { momento:"Durante", items:["El entrenador observa el principio dominante de la etapa","Instrucciones puntuales y concretas · evitar la instrucción constante desde fuera"] },
      { momento:"Descanso", items:["2 min de agua y recuperación · el entrenador organiza sus ideas","Análisis guiado con referencias a situaciones concretas del partido","Correcciones individuales y colectivas con detalle · es el momento pedagógico más valioso del partido","El entrenador guía y estructura · en E4 también escucha al jugador","Cierre con el mensaje táctico claro para la segunda parte"] },
      { momento:"Después", items:["El entrenador puede decir algo breve si lo considera necesario","El análisis real y en profundidad se hace en S1 de la semana siguiente","Registro post partido del entrenador: 1 🟢 + 1 🔴 (2 min)"] },
    ],
  },
};

const MacroSection = ({ etapaId, mob }) => {
  const e = ETAPAS.find(x => x.id === etapaId);
  const d = macroData[etapaId];
  return (
    <div>
      <EtapaHeader mob={mob} etapa={e} />

      {/* Estructura semanal: referencia general */}
      <div style={{ background:C.primary, borderRadius:12, padding:mob?"12px 14px":"14px 18px", marginBottom:18, display:"flex", alignItems:"center", gap:14 }}>
        <div style={{ fontSize:mob?22:26, flexShrink:0 }}>📅</div>
        <div>
          <div style={{ fontSize:10, fontWeight:800, color:C.gold, marginBottom:4, letterSpacing:1 }}>ESTRUCTURA SEMANAL RECOMENDADA · 3 SESIONES</div>
          <div style={{ fontSize:mob?11:12, color:"rgba(255,255,255,0.75)", lineHeight:1.7 }}>S1 (Lun/Mar) · S2 (Mié) · S3 (Vie). Es una <b>guía de referencia</b>, no una norma rígida. El entrenador la adapta a su realidad: días disponibles, número de jugadores, instalaciones y necesidades del grupo.</div>
        </div>
      </div>

      {/* Razón cognitiva */}
      {d.razonCognitiva && (
        <div style={{ background:C.softbg, borderRadius:10, padding:mob?"12px 14px":"14px 18px", marginBottom:18, borderLeft:`3px solid ${e.color}` }}>
          <div style={{ fontSize:10, fontWeight:800, color:e.color, marginBottom:6, letterSpacing:0.5 }}>🧠  POR QUÉ PLANIFICAMOS ASÍ EN ESTA ETAPA</div>
          <p style={{ fontSize:mob?11:12, color:C.grey, lineHeight:1.75, margin:0 }}>{d.razonCognitiva}</p>
        </div>
      )}

      {/* Sesiones específicas de la etapa */}
      <div style={{ marginBottom:18 }}>
        <div style={{ fontSize:13, fontWeight:800, color:C.primary, marginBottom:12 }}>Sesiones · {e.sub}</div>
        <div style={{ display:"grid", gridTemplateColumns:mob?"1fr":"repeat(3,1fr)", gap:10 }}>
          {d.sessions.map((s, i) => (
            <div key={i} style={{ background:C.softbg, borderRadius:10, padding:mob?"12px":"14px", borderTop:`3px solid ${e.color}` }}>
              <div style={{ background:e.color, borderRadius:6, padding:"2px 9px", fontSize:10, fontWeight:800, color:e.dark?C.primary:C.white, display:"inline-block", marginBottom:8 }}>{s.s}</div>
              <div style={{ fontSize:mob?12:13, fontWeight:700, color:C.primary, marginBottom:4 }}>{s.t}</div>
              <div style={{ fontSize:mob?11:11, color:C.grey, lineHeight:1.65 }}>{s.o}</div>
            </div>
          ))}
        </div>
        {etapaId === 1 && (
          <InfoBox mob={mob} icon="💡" label="S8 vs S9:">En S8 el foco es exclusivamente la relación afectiva con el balón: juego libre, descubrimiento, diversión. En S9 podemos introducir de forma lúdica los primeros fundamentos técnicos individuales —control orientado, 1vs1 y protección del balón— porque son contenidos sobre 'yo y el balón' que no exigen entender al compañero todavía. La cooperación táctica y el pase con intención esperan a E2.</InfoBox>
        )}
        {etapaId === 3 && (
          <InfoBox mob={mob} icon="⚠️" label="Primer trimestre S12-S14-S16:">El 70% de las tareas deben consolidar fundamentos de E2 antes de introducir contenidos de E3. Si los jugadores no dominan el control orientado y el pase con intención, el resto del modelo no se sostiene.</InfoBox>
        )}
        {etapaId === 4 && (
          <InfoBox mob={mob} icon="💡" label="S3 · Finalización pre-partido:">Si se incluyen situaciones de alta intensidad física, deben ser cortas y con recuperación suficiente entre repeticiones. El objetivo es llegar al partido activado mentalmente, no fatigado físicamente.</InfoBox>
        )}
      </div>

      {/* Progresión flexible */}
      <div style={{ background:C.softbg, borderRadius:10, padding:mob?"12px 14px":"13px 18px", marginBottom:14, borderLeft:`3px solid ${C.gold}` }}>
        <div style={{ fontSize:10, fontWeight:800, color:C.gold, marginBottom:5, letterSpacing:0.5 }}>📌  PROGRESIÓN FLEXIBLE</div>
        <p style={{ fontSize:mob?11:12, color:C.grey, lineHeight:1.75, margin:0 }}>El plan mensual marca una <b>prioridad de aprendizaje, no una secuencia cerrada obligatoria</b>. Si el grupo no ha consolidado el contenido del mes anterior, no se avanza al siguiente. Es preferible trabajar bien un concepto más tiempo que acumular contenidos sin consolidar.</p>
      </div>

      {/* Planificación mensual */}
      <div style={{ marginBottom:18 }}>
        <div style={{ fontSize:13, fontWeight:800, color:C.primary, marginBottom:12 }}>
          {etapaId === 1 ? "Planificación Bimensual" : "Planificación Mensual"}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:mob?"1fr 1fr":"repeat(auto-fill,minmax(185px,1fr))", gap:10 }}>
          {d.plan.map((b, i) => (
            <div key={i} style={{ background:C.white, borderRadius:10, padding:mob?"11px":"13px", border:`1px solid ${C.border}`, borderLeft:`3px solid ${e.color}` }}>
              <div style={{ marginBottom:6 }}><span style={{ background:e.color, color:e.dark?C.primary:C.white, borderRadius:6, padding:"2px 8px", fontSize:9, fontWeight:700 }}>{b.b}</span></div>
              {b.p && <div style={{ background:C.softbg, borderRadius:5, padding:"3px 8px", fontSize:mob?8:9, fontWeight:700, color:e.color === C.e4 ? "#A07820" : e.color, display:"inline-block", marginBottom:6, border:`1px solid ${e.color}22` }}>🔑 {b.p}</div>}
              <div style={{ fontSize:mob?10:11, fontWeight:700, color:C.primary, marginBottom:7, lineHeight:1.4 }}>{b.e}</div>
              {b.i.map((item, j) => <div key={j} style={{ fontSize:mob?10:11, color:C.grey, display:"flex", gap:5, lineHeight:1.6 }}><span style={{ color:e.color, fontWeight:700 }}>·</span><span>{item}</span></div>)}
            </div>
          ))}
        </div>
      </div>

      {/* Día de partido */}
      <div>
        <div style={{ fontSize:13, fontWeight:800, color:C.primary, marginBottom:12 }}>⚽ Día de Partido</div>
        <div style={{ display:"grid", gridTemplateColumns:mob?"1fr 1fr":"repeat(4,1fr)", gap:10 }}>
          {d.diaPartido.map((dp, i) => (
            <div key={i} style={{ background:C.softbg, borderRadius:10, padding:mob?"10px":"13px", borderTop:`3px solid ${e.color}` }}>
              <div style={{ fontSize:10, fontWeight:800, color:e.color, marginBottom:8, textTransform:"uppercase", letterSpacing:0.8 }}>{dp.momento}</div>
              {dp.items.map((item, j) => (
                <div key={j} style={{ display:"flex", gap:6, marginBottom:5 }}>
                  <span style={{ color:e.color, fontWeight:700, flexShrink:0 }}>·</span>
                  <span style={{ fontSize:mob?10:11, color:C.grey, lineHeight:1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const avalData = {
  1:{ format:"Conversación informal con las familias. Máximo 5 minutos. Sin documento escrito.", dest:"Entrenador → Familia (conversación)", periodo:"Noviembre · Febrero · Mayo",
    preguntas:["¿El jugador llega al entrenamiento con ganas?","¿Se relaciona con el balón con confianza y sin miedo?","¿Disfruta durante la sesión?","¿Quiere seguir la próxima temporada?"],
    trimestres:[{t:"T1 · Nov",obs:["¿Disfruta?","¿Quiere volver?","¿Balón sin miedo?","¿Buena actitud?"]},{t:"T2 · Feb",obs:["¿Disfruta?","¿Quiere volver?","¿Balón sin miedo?","¿Buena actitud?"]},{t:"T3 · May",obs:["¿Disfruta?","¿Quiere volver?","¿Balón sin miedo?","¿Buena actitud?"]}] },
  2:{ format:"Documento trimestral con colores enviado a las familias. El entrenador habla con el jugador antes de enviarlo.", dest:"Entrenador → Jugador → Familia", periodo:"Noviembre · Febrero · Mayo",
    obs:[{id:"O1 ⚠️",label:"PRINCIPIO DOMINANTE",q:"¿Cuándo pasa, deja el balón donde su compañero puede jugar hacia adelante?",w:"50% Técnica"},{id:"O2",label:"CONTROL ORIENTADO",q:"¿Su primer toque le deja el balón en posición de jugar hacia adelante?",w:""},{id:"O3",label:"2VS1",q:"¿Cuándo son dos contra uno, busca al compañero libre?",w:"30% Táctica"},{id:"ACT",label:"ACTITUDINAL",q:"¿Se esfuerza y acepta la corrección?",w:"20%"}],
    trimestres:[{t:"T1 · Nov",obs:["O1 Pase con intención ⚠️","O2 Control orientado","O3 2vs1 decisión correcta","Actitudinal"]},{t:"T2 · Feb",obs:["O1 Pase con intención ⚠️","O2 3vs2 · busca al libre","O3 Pressing básico","Actitudinal comunicación"]},{t:"T3 · May",obs:["O1 Pase con intención ⚠️","O2 Superioridades · las reconoce","O3 Amplitud y orientación","Liderazgo positivo emergente"]}] },
  3:{ format:"Documento trimestral con colores. El entrenador comparte la ficha con el jugador en una conversación de 10 minutos antes de enviarla a las familias.", dest:"Entrenador → Jugador → Familia", periodo:"Noviembre · Febrero · Mayo",
    obs:[{id:"O1 ⚠️",label:"PRINCIPIO DOMINANTE",q:"¿El jugador ve y usa la superioridad cuando está disponible: 2vs1, 3vs2, cuadrado interior (F11)?",w:"45% Táctica"},{id:"O2",label:"PRESSING",q:"¿Tras perder el balón, los jugadores cercanos reaccionan de inmediato intentando recuperar o impedir la progresión rival?",w:""},{id:"O3",label:"AUTONOMÍA",q:"¿El jugador toma decisiones coherentes con la situación sin necesitar instrucción del entrenador?",w:"35% Técnica"},{id:"ACT",label:"ACTITUDINAL",q:"¿Lidera positivamente y se comunica con el grupo?",w:"20%"}],
    trimestres:[{t:"T1 · Nov",obs:["O1 Ve y usa superioridad ⚠️","O2 Pressing inmediato tras pérdida","O3 Toma alguna decisión solo","Actitudinal comunicación"]},{t:"T2 · Feb",obs:["O1 Cuadrado interior básico (F11) ⚠️","O2 Pressing + transición","O3 Autonomía creciente","Liderazgo positivo emergente"]},{t:"T3 · May",obs:["O1 Cuadrado con criterio (F11) ⚠️","O2 Cambio de orientación colectivo","O3 Criterio real de decisión","Competitividad con criterio"]}] },
  4:{ format:"Documento entregado directamente al jugador. Las familias reciben nota general del equipo. Evaluación conjunta entrenador + coordinador.", dest:"Entrenador + Coordinador → Jugador (directo)", periodo:"Noviembre · Febrero · Mayo",
    obs:[{id:"O1 ⚠️",label:"PRINCIPIO DOMINANTE · EQUIPO",q:"¿El equipo genera superioridad mediante el cuadrado de forma autónoma y consigue crear una ventaja real que permita progresar?",w:"30% Táctica"},{id:"O1b ⚠️",label:"PRINCIPIO DOMINANTE · JUGADOR",q:"¿El jugador reconoce cuándo puede contribuir a generar la superioridad y adapta su movimiento al contexto?",w:"20% Táctica"},{id:"O2",label:"PRESSING",q:"¿El equipo presiona de forma coordinada buscando recuperar, no solo persiguiendo el balón?",w:""},{id:"O3",label:"AUTOCRÍTICA",q:"¿El jugador identifica por sí mismo qué ha hecho bien y qué puede mejorar sin necesitar que el entrenador lo señale?",w:"30% Técnica"},{id:"ACT ⭐",label:"ACTITUDINAL",q:"¿Lidera dentro y fuera del campo con autonomía real?",w:"20%"}],
    trimestres:[{t:"T1 · Nov",obs:["O1 Cuadrado interior autónomo ⚠️","O2 Pressing orientado: disparadores","O3 Liderazgo en el campo","Autocrítica inicial"]},{t:"T2 · Feb",obs:["O1 Cuadrado: cualquier movimiento ⚠️","O2 Transiciones completas","O3 Autonomía: sin banquillo","Autocrítica real"]},{t:"T3 · May",obs:["O1 Cuadrado: referente del modelo ⚠️","O2 Gestión del partido","O3 Equipo sin instrucción del banquillo","Liderazgo real en el vestuario"]}] },
};

const AvalSection = ({ etapaId, mob }) => {
  const e = ETAPAS.find(x => x.id === etapaId);
  const d = avalData[etapaId];
  const isE1 = etapaId === 1;
  return (
    <div>
      <EtapaHeader mob={mob} etapa={e} extra={
        <div style={{ width:mob?"100%":"auto" }}>
          <div style={{ fontSize:11, color:e.dark?C.primary:"rgba(255,255,255,0.8)", fontWeight:700 }}>{d.periodo}</div>
          <div style={{ fontSize:10, color:e.dark?C.primary:"rgba(255,255,255,0.65)" }}>{d.dest}</div>
        </div>
      }/>
      <div style={{ background:C.softbg, borderRadius:10, padding:"12px 14px", marginBottom:16, borderLeft:`3px solid ${e.color}`, fontSize:mob?11:12, color:C.grey, lineHeight:1.75 }}>
        <strong style={{ color:C.primary }}>Formato: </strong>{d.format}
      </div>
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:13, fontWeight:800, color:C.primary, marginBottom:12 }}>Sistema de Evaluación</div>
        <div style={{ display:"grid", gridTemplateColumns:mob?"1fr 1fr":"repeat(auto-fill,minmax(195px,1fr))", gap:9 }}>
          {[
            { e:"🟢", l:"ADQUIRIDO",   d:"Lo aplica de forma consistente en situaciones adecuadas de juego, con poca o ninguna ayuda del entrenador." },
            { e:"🟡", l:"EN PROCESO",  d:"Aparece, pero todavía necesita ayuda o no es consistente en partido real." },
            { e:"🔴", l:"EN TRABAJO",  d:"Todavía no aparece de forma suficiente. Será prioridad de desarrollo el próximo trimestre." },
            ...(etapaId===4 ? [{ e:"⭐", l:"REFERENTE DE APRENDIZAJE", d:"Muestra un dominio que puede utilizarse para ayudar a otros compañeros a comprenderlo. No es una etiqueta de estatus." }] : []),
          ].map((c, i) => (
            <div key={i} style={{ background:C.white, borderRadius:9, padding:"10px 12px", border:`1px solid ${C.border}`, display:"flex", gap:9 }}>
              <div style={{ fontSize:20 }}>{c.e}</div>
              <div>
                <div style={{ fontSize:11, fontWeight:800, color:C.primary }}>{c.l}</div>
                <div style={{ fontSize:10, color:C.grey, lineHeight:1.5, marginTop:2 }}>{c.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isE1 ? (
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:13, fontWeight:800, color:C.primary, marginBottom:12 }}>Las 4 preguntas del entrenador</div>
          {d.preguntas.map((p, i) => (
            <div key={i} style={{ background:C.softbg, borderRadius:9, padding:"10px 14px", marginBottom:8, display:"flex", gap:10, alignItems:"center", borderLeft:`3px solid ${e.color}` }}>
              <div style={{ width:24, height:24, borderRadius:6, background:e.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:C.white, flexShrink:0 }}>{i+1}</div>
              <div style={{ fontSize:mob?11:12, color:C.dark, fontStyle:"italic" }}>{p}</div>
            </div>
          ))}
          <div style={{ background:C.primary, borderRadius:10, padding:"13px 16px", textAlign:"center", fontSize:mob?12:13, color:C.gold, fontWeight:700 }}>Si las 4 respuestas son Sí → El trabajo está hecho ✓</div>
        </div>
      ) : (
        <>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:13, fontWeight:800, color:C.primary, marginBottom:12 }}>
              Observables de campo <span style={{ fontSize:10, fontWeight:400, color:C.grey }}>· Visibles en 5 min de partido sin parar el juego</span>
            </div>
            {d.obs.map((obs, i) => {
              const isP = obs.id.includes("⚠️");
              return (
                <div key={i} style={{ background:isP?C.softbg:C.white, borderRadius:10, padding:"12px 14px", marginBottom:8, border:`1px solid ${isP?e.color:C.border}`, borderLeft:`3px solid ${isP?e.color:C.border}`, display:"flex", gap:12, alignItems:"flex-start" }}>
                  <div style={{ background:isP?e.color:C.light, borderRadius:6, padding:"3px 8px", flexShrink:0, fontSize:9, fontWeight:800, color:isP?(e.dark?C.primary:C.white):C.grey, whiteSpace:"nowrap" }}>{obs.id}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:10, fontWeight:800, color:C.primary, marginBottom:3, letterSpacing:0.3 }}>{obs.label}</div>
                    <div style={{ fontSize:mob?11:11, color:C.grey, lineHeight:1.65, fontStyle:"italic" }}>"{obs.q}"</div>
                  </div>
                  {obs.w && <div style={{ background:C.primary, borderRadius:6, padding:"3px 8px", fontSize:9, fontWeight:700, color:C.gold, flexShrink:0 }}>{obs.w}</div>}
                </div>
              );
            })}
          </div>
          <div style={{ background:C.primary, borderRadius:10, padding:"12px 16px", marginBottom:16, display:"flex", gap:10, alignItems:"flex-start" }}>
            <span style={{ fontSize:18, flexShrink:0 }}>⚠️</span>
            <div style={{ fontSize:mob?11:12, color:C.light, lineHeight:1.75 }}>
              <strong style={{ color:C.gold }}>Principio de prioridad: </strong>"El principio dominante no puede darse por adquirido mientras permanezca en 🔴. Si sigue en 🔴, continuará siendo la prioridad de desarrollo del siguiente periodo."
            </div>
          </div>
        </>
      )}
      <div>
        <div style={{ fontSize:13, fontWeight:800, color:C.primary, marginBottom:12 }}>Ítems por trimestre</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:mob?8:12 }}>
          {d.trimestres.map((t, i) => (
            <div key={i} style={{ background:C.softbg, borderRadius:10, padding:mob?"10px":"13px", borderTop:`3px solid ${e.color}` }}>
              <div style={{ fontSize:mob?9:11, fontWeight:800, color:e.color, marginBottom:8, textTransform:"uppercase", letterSpacing:0.5 }}>{t.t}</div>
              {t.obs.map((o, j) => (
                <div key={j} style={{ fontSize:mob?9:10, color:o.includes("⚠️")?C.primary:C.grey, fontWeight:o.includes("⚠️")?700:400, padding:"3px 0", borderBottom:j<t.obs.length-1?`1px solid ${C.border}`:"none", lineHeight:1.5 }}>
                  {o.includes("⚠️") ? "⚠️ " : "· "}{o.replace("⚠️","").trim()}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {!isE1 && (
        <div style={{ marginTop:14, background:C.softbg, borderRadius:10, padding:mob?"12px":"14px 18px", border:`1px solid ${C.border}` }}>
          <div style={{ fontSize:12, fontWeight:800, color:C.primary, marginBottom:10 }}>📝 Registro Post-Partido · 2 minutos</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:mob?8:10 }}>
            {[
              { i:"🟢", l:"1 Punto Fuerte",     d:"Lo que mejor ha salido" },
              { i:"🔴", l:"1 Punto de Mejora",  d:"Lo que necesita trabajo" },
              { i:"❓", l:"Principio Dominante", d:"¿Ha aparecido y ha generado la ventaja que buscábamos? Sí / A veces / No" },
            ].map((r, i) => (
              <div key={i} style={{ background:C.white, borderRadius:9, padding:mob?"10px 8px":"12px", textAlign:"center", border:`1px solid ${C.border}` }}>
                <div style={{ fontSize:mob?20:22, marginBottom:4 }}>{r.i}</div>
                <div style={{ fontSize:mob?10:11, fontWeight:700, color:C.primary }}>{r.l}</div>
                <div style={{ fontSize:9, color:C.greyLight, marginTop:2 }}>{r.d}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// APP PRINCIPAL
// ══════════════════════════════════════════════════════════════
export default function App() {
  const w = useWidth();
  const mob = w < 640;

  const [group,   setGroup]   = useState("modelo");
  const [section, setSection] = useState("quienes");
  const [etapaId, setEtapaId] = useState(1);

  const visibleSections = SECTIONS.filter(s => s.group === group);
  const needsEtapa = ["macro","aval"].includes(section);

  const handleGroup = (g) => {
    if (g === group) return;
    setGroup(g);
    const first = SECTIONS.find(s => s.group === g);
    if (first) setSection(first.id);
  };

  const renderSection = () => {
    const props = { mob };
    switch (section) {
      case "jerarquia":  return <JerarquiaSection {...props} />;
      case "quienes":    return <QuienesSomos    {...props} />;
      case "principios": return <PrincipiosSection {...props} />;
      case "cuadrado":   return <CuadradoSection  {...props} />;
      case "fases":      return <FasesSection     {...props} />;
      case "progresion": return <ProgresionSection {...props} />;
      case "jugador":    return <JugadorSection   {...props} />;
      case "valores":    return <ValoresSection   {...props} />;
      case "decaleg":    return <DecalegSection   {...props} />;
      case "inneg":      return <InnegSection     {...props} />;
      case "ciclo":      return <CicloCanetSection {...props} />;
      case "aprendizaje": return <AprendizajeSection  {...props} />;
      case "tareas":      return <TareasSection       {...props} />;
      case "macro":       return <MacroSection         {...props} etapaId={etapaId} />;
      case "aval":       return <AvalSection      {...props} etapaId={etapaId} />;
      default:           return null;
    }
  };

  return (
    <div style={{ fontFamily:"'Segoe UI', system-ui, sans-serif", background:"#EEF2F7", minHeight:"100vh" }}>

      {/* CABECERA */}
      <div style={{ background:C.primary, padding:mob?"12px 16px":"14px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:mob?36:44, height:mob?36:44, borderRadius:9, background:C.gold, display:"flex", alignItems:"center", justifyContent:"center", fontSize:mob?18:22, flexShrink:0 }}>⚽</div>
          <div>
            <div style={{ fontSize:mob?15:18, fontWeight:900, color:C.white, letterSpacing:-0.3 }}>Canet F.C.</div>
            {!mob && <div style={{ fontSize:10, color:"rgba(255,255,255,0.45)", letterSpacing:1.8, textTransform:"uppercase", marginTop:1 }}>Modelo de Juego y Guía Metodológica · 2026-27</div>}
          </div>
        </div>
        {!mob && (
          <div style={{ background:"rgba(255,255,255,0.08)", borderRadius:8, padding:"7px 14px", fontSize:11, color:C.gold, fontWeight:700, fontStyle:"italic", border:"1px solid rgba(255,255,255,0.1)" }}>
            "El sistema es la forma. El modelo es la idea."
          </div>
        )}
      </div>

      {/* NAV GRUPOS */}
      <div style={{ background:C.navDark, borderBottom:`3px solid ${C.gold}` }}>
        <div style={{ display:"flex", overflowX:"auto", padding:mob?"0 8px":"0 20px", gap:2, WebkitOverflowScrolling:"touch", scrollbarWidth:"none" }}>
          {GROUPS.map(g => {
            const on = group === g.id;
            return (
              <button key={g.id} onClick={() => handleGroup(g.id)} style={{
                border:"none", cursor:"pointer", flexShrink:0,
                padding:mob?"11px 14px":"13px 22px",
                fontSize:mob?11:12, fontWeight:on?800:400,
                background: on ? C.gold : "transparent",
                color: on ? C.primary : "rgba(255,255,255,0.55)",
                borderRadius: on ? "7px 7px 0 0" : 0,
                display:"flex", alignItems:"center", gap:mob?5:7,
                transition:"all 0.2s",
                marginBottom: on ? -3 : 0,
              }}>
                <span style={{ fontSize:mob?13:15 }}>{g.icon}</span>
                <span>{mob && g.label.length > 10 ? g.label.split(" ")[0] : g.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* NAV SECCIONES */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, boxShadow:"0 2px 6px rgba(0,0,0,0.06)" }}>
        <div style={{ display:"flex", overflowX:"auto", padding:mob?"0 8px":"0 20px", WebkitOverflowScrolling:"touch", scrollbarWidth:"none" }}>
          {visibleSections.map(s => {
            const on = section === s.id;
            return (
              <button key={s.id} onClick={() => setSection(s.id)} style={{
                border:"none", background:"none", cursor:"pointer", flexShrink:0,
                padding:mob?"10px 12px":"11px 18px",
                fontSize:mob?11:12,
                fontWeight: on ? 700 : 400,
                color: on ? C.primary : C.greyLight,
                borderBottom: on ? `2px solid ${C.accent}` : "2px solid transparent",
                whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:mob?4:6,
                transition:"all 0.18s",
              }}>
                <span style={{ fontSize:mob?12:14 }}>{s.icon}</span>
                {mob ? s.label.split(" ")[0] : s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* SELECTOR ETAPA */}
      {needsEtapa && (
        <div style={{ background:"#EBF1F7", borderBottom:`1px solid ${C.border}`, padding:mob?"8px 12px":"10px 24px", display:"flex", gap:mob?6:8, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ fontSize:9, fontWeight:800, color:C.greyLight, letterSpacing:1.5, textTransform:"uppercase", flexShrink:0 }}>Etapa:</div>
          {ETAPAS.map(e => (
            <button key={e.id} onClick={() => setEtapaId(e.id)} style={{
              border: etapaId===e.id ? "none" : `1px solid ${C.border}`,
              cursor:"pointer", flexShrink:0,
              padding:mob?"5px 10px":"6px 14px",
              borderRadius:20, fontSize:mob?10:11, fontWeight:700,
              background: etapaId===e.id ? e.color : C.white,
              color: etapaId===e.id ? (e.dark?C.primary:C.white) : C.grey,
              boxShadow: etapaId===e.id ? "0 2px 8px rgba(0,0,0,0.14)" : "none",
              transition:"all 0.18s",
            }}>
              {e.label} · {e.sub}
            </button>
          ))}
        </div>
      )}

      {/* CONTENIDO */}
      <div style={{ padding:mob?"16px 14px 40px":"28px 28px 48px", maxWidth:1020, margin:"0 auto" }}>
        <Fade id={section}>
          {renderSection()}
        </Fade>
      </div>

      {/* PIE */}
      <div style={{ background:C.navDark, padding:mob?"10px 16px":"14px 28px", textAlign:"center", fontSize:mob?9:10, color:"rgba(255,255,255,0.28)", letterSpacing:0.8, textTransform:"uppercase", borderTop:`3px solid ${C.gold}` }}>
        Canet F.C. · Modelo de Juego y Guía Metodológica · Temporada 2026-27 · Documento Oficial del Club
      </div>
    </div>
  );
}
