const plans = {
    home: [
        {name:"Basic", sub:"Perfect for browsing & social media", speed:"30 Mbps", price:"399", features:["Unlimited Data","Wi-Fi Router","24/7 Customer Support"]},
        {name:"Standard", sub:"Ideal for streaming & work from home", speed:"50 Mbps", price:"479", features:["Unlimited Data","Dual-band Wi-Fi Router","24/7 Customer Support"], featured:true},
        {name:"Premium", sub:"For gamers & heavy users", speed:"100 Mbps", price:"699", features:["Unlimited Data","High-performance Router","Priority Support"]},
        {name:"Ultra", sub:"For businesses & large families", speed:"150 Mbps", price:"899", features:["Unlimited Data","Premium Router","Priority Support"]}
    ],
    business: [
        {name:"Business Start", sub:"For small teams & shops", speed:"30 Mbps", price:"399", features:["Unlimited Data","Business Router","Priority Support"]},
        {name:"Business Pro", sub:"For growing businesses", speed:"50 Mbps", price:"499", features:["Unlimited Data","Static IP option","Priority Support"], featured:true},
        {name:"Business Max", sub:"For high-demand offices", speed:"100 Mbps", price:"699", features:["Unlimited Data","Static IP option","Dedicated Support"]},
        {name:"Enterprise", sub:"Custom connectivity", speed:"1 Gbps", price:"Custom", features:["Dedicated Bandwidth","Static IP","Managed Support"]}
    ]
};

const grid = document.getElementById("plansGrid");

function renderPlans(category="home"){
    grid.innerHTML = plans[category].map(p => `
        <article class="plan-card ${p.featured ? "featured":""}">
            ${p.featured ? '<span class="popular">MOST POPULAR</span>' : ""}
            <h3>${p.name}</h3>
            <p class="plan-sub">${p.sub}</p>
            <div class="plan-speed">${p.speed}</div>
            <div class="plan-price">₹ ${p.price} <small>${p.price === "Custom" ? "" : "/ month"}</small></div>
            <ul class="plan-features">${p.features.map(f => `<li>${f}</li>`).join("")}</ul>
            <a class="btn plan-btn" href="#connection" onclick="setPlan('${p.name}')">Get Started →</a>
        </article>
    `).join("");
}

function setPlan(name){
    const select = document.querySelector('select[name="plan"]');
    if(!select) return;
    [...select.options].forEach(option => {
        if(option.textContent.toLowerCase().includes(name.toLowerCase().replace("business ","").replace("business",""))){
            select.value = option.value;
        }
    });
}

renderPlans();

document.querySelectorAll(".switch-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".switch-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderPlans(btn.dataset.category);
    });
});

const header = document.getElementById("siteHeader");
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
    backTop.classList.toggle("show", window.scrollY > 500);

    const sections = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll(".nav a[href^='#']");
    let current = "";
    sections.forEach(section => {
        if(window.scrollY >= section.offsetTop - 160) current = section.id;
    });
    links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
});

backTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add("visible");
    });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelectorAll(".faq-item button").forEach(button => {
    button.addEventListener("click", () => {
        const item = button.parentElement;
        document.querySelectorAll(".faq-item").forEach(i => {
            if(i !== item) i.classList.remove("open");
        });
        item.classList.toggle("open");
    });
});

const form = document.getElementById("connectionForm");
const msg = document.getElementById("formMessage");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    msg.textContent = "Thank you! Your connection request has been submitted.";
    msg.style.color = "#0c9b68";

    form.reset();
});
