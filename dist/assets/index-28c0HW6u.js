(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();function l(){const r=Array.from(document.querySelectorAll(".reveal"));if(!r.length)return;if(document.querySelectorAll(".hero .reveal").forEach(t=>t.classList.add("visible")),!("IntersectionObserver"in window)){r.forEach(t=>t.classList.add("visible"));return}const e=new IntersectionObserver(t=>{for(const i of t)i.isIntersecting&&(i.target.classList.add("visible"),e.unobserve(i.target))},{root:null,rootMargin:"0px 0px -10% 0px",threshold:.01});r.forEach(t=>e.observe(t)),setTimeout(()=>{document.querySelectorAll(".reveal:not(.visible)").forEach(t=>t.classList.add("visible"))},2e3)}function c(){const r=document.querySelector("nav");r&&window.addEventListener("scroll",()=>{r.style.background=window.scrollY>60?"rgba(5,13,31,0.97)":"rgba(5,13,31,0.85)"})}const d=[{icon:"📊",title:"Data Analytics Program",body:"Transform raw data into actionable insights. Master SQL, Python, Power BI, and Tableau while developing the analytical thinking that drives business decisions.",tags:["SQL","Python","Power BI","Tableau"],ctaText:"Learn more",ctaHref:"#"},{icon:"⚙️",title:"Data Engineering Program",body:"Build and maintain the infrastructure that powers data products. Design scalable pipelines, orchestrate workflows, and work with cloud-native data platforms.",tags:["Pipelines","Cloud","ETL","Orchestration"],ctaText:"Learn more",ctaHref:"#"},{icon:"🤖",title:"Data Science & AI Program",body:"Go beyond analysis into prediction and automation. Build machine learning models, deploy AI solutions, and work at the intersection of data and intelligence.",tags:["ML","AI","Modeling","Deployment"],ctaText:"Learn more",ctaHref:"#"}],u=[{icon:"🔗",title:"Data Pipelines",body:"End-to-end pipeline design, build, and optimisation. From ingestion to transformation to delivery — reliable, scalable, and observable."},{icon:"📈",title:"BI & Reporting",body:"Unified reporting layers and interactive dashboards that give leadership real-time visibility across the entire organisation."},{icon:"🧠",title:"AI & Advanced Analytics",body:"Predictive models, NLP solutions, and AI-powered decision tools tailored to your specific business context and data assets."},{icon:"☁️",title:"Cloud Data Architecture",body:"Modern cloud-native data platforms on AWS, Azure, or GCP. Architected for performance, governance, and cost efficiency."}],f=[{title:"Programmes",links:[{label:"Data Analytics",href:"#programs"},{label:"Data Engineering",href:"#programs"},{label:"Data Science & AI",href:"#programs"}]},{title:"Company",links:[{label:"About Us",href:"#about"},{label:"Consulting",href:"#consulting"},{label:"Contact",href:"#contact"}]},{title:"Contact",links:[{label:"hello@rivadata.co.uk",href:"mailto:hello@rivadata.co.uk"},{label:"LinkedIn",href:"https://www.linkedin.com/company/riva-data/"}]}],m={columns:f};function o(r=""){return String(r).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function p(){const r=document.getElementById("program-cards");r&&(r.innerHTML=d.map(e=>`
      <div class="program-card reveal">
        <div class="program-icon">${o(e.icon)}</div>
        <h3>${o(e.title)}</h3>
        <p>${o(e.body)}</p>

        <div class="program-tags">
          ${(e.tags||[]).map(t=>`<span class="tag">${o(t)}</span>`).join("")}
        </div>

        <a class="btn-card" href="${o(e.ctaHref||"#")}">
          ${o(e.ctaText||"Learn more")}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    `).join(""))}function g(){const r=document.getElementById("consulting-cards");r&&(r.innerHTML=u.map((e,t)=>`
      <div class="consult-card reveal ${t?`reveal-delay-${t}`:""}">
        <span class="consult-card-icon">${o(e.icon)}</span>
        <h3>${o(e.title)}</h3>
        <p>${o(e.body)}</p>
      </div>
    `).join(""))}function h(){const r=document.getElementById("footer-links");if(!r)return;const e=m?.columns||[];r.innerHTML=e.map(t=>`
      <div class="footer-col">
        <h5>${o(t.title)}</h5>
        ${(t.links||[]).map(i=>`<a href="${o(i.href)}">${o(i.label)}</a>`).join("")}
      </div>
    `).join("")}window.addEventListener("DOMContentLoaded",()=>{p(),g(),h(),l(),c()});
