import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, Minus, Plus, Search, ShoppingBag, X, Zap, ShieldCheck, PackageCheck, Headphones, Dumbbell, Footprints, Watch, Heart } from "lucide-react";
import "./style.css";

const products = [
  { id: 1, name: "Fone Sport Air", category: "Acessórios", price: 89.9, oldPrice: 119.9, tag: "MAIS VENDIDO", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85", tone: "sand" },
  { id: 2, name: "Garrafa Active 750ml", category: "Treino", price: 49.9, oldPrice: 59.9, tag: "ESSENCIAL", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85", tone: "green" },
  { id: 3, name: "Relógio Pulse Fit", category: "Acessórios", price: 129.9, oldPrice: 159.9, tag: "NOVO", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85", tone: "gray" },
  { id: 4, name: "Training Bag Pro", category: "Treino", price: 99.9, oldPrice: null, tag: "", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85", tone: "dark" },
  { id: 5, name: "Runner Performance", category: "Corrida", price: 179.9, oldPrice: 219.9, tag: "PERFORMANCE", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85", tone: "red" },
  { id: 6, name: "Luvas Grip Training", category: "Treino", price: 39.9, oldPrice: null, tag: "", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=85", tone: "black" },
];
const money = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [category, setCategory] = useState("Todos");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");
  const [liked, setLiked] = useState([]);
  const filtered = useMemo(() => products.filter(p => (category === "Todos" || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase())), [category, query]);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const add = product => {
    setCart(prev => prev.some(i => i.id === product.id) ? prev.map(i => i.id === product.id ? {...i, qty:i.qty+1} : i) : [...prev, {...product, qty:1}]);
    setNotice(product.name + " adicionado à sacola");
    window.setTimeout(() => setNotice(""), 2400);
  };
  const changeQty = (id, delta) => setCart(prev => prev.map(i => i.id === id ? {...i, qty:i.qty+delta} : i).filter(i => i.qty > 0));
  const scrollProducts = () => document.getElementById("produtos")?.scrollIntoView({behavior:"smooth"});
  return <div className="app">
    <div className="announcement"><Zap size={13} fill="currentColor"/> <span>SEU PRÓXIMO NÍVEL COMEÇA AQUI</span><i/> FRETE GRÁTIS EM PEDIDOS ACIMA DE R$ 199</div>
    <header className="header">
      <button className="icon-btn mobile-toggle" onClick={()=>setMobileMenu(!mobileMenu)} aria-label="Abrir menu">{mobileMenu?<X/>:<Menu/>}</button>
      <a className="brand" href="#inicio" aria-label="Pulse Sport início"><span className="brand-mark"><Zap size={20} fill="currentColor"/></span><span>PULSE<span className="brand-light">SPORT</span><small>MOVE WITH PURPOSE</small></span></a>
      <nav className={mobileMenu?"nav nav-open":"nav"}>
        <a href="#inicio" onClick={()=>setMobileMenu(false)}>Início</a><a href="#categorias" onClick={()=>setMobileMenu(false)}>Categorias</a><a href="#produtos" onClick={()=>setMobileMenu(false)}>Produtos</a><a href="#sobre" onClick={()=>setMobileMenu(false)}>Nossa essência</a>
      </nav>
      <div className="header-actions">
        <button className="icon-btn" aria-label="Buscar produtos" onClick={()=>setSearchOpen(!searchOpen)}><Search size={19}/></button>
        <button className="bag-btn" aria-label="Abrir sacola" onClick={()=>setCartOpen(true)}><ShoppingBag size={19}/><span className="bag-label">Sacola</span><b>{count}</b></button>
      </div>
    </header>
    {searchOpen && <div className="search-bar"><Search size={18}/><input autoFocus value={query} onChange={e=>{setQuery(e.target.value);scrollProducts()}} placeholder="Busque por produtos..."/><button onClick={()=>{setSearchOpen(false);setQuery("")}}><X size={18}/></button></div>}
    <main>
      <section className="hero" id="inicio">
        <img className="hero-img" src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2200&q=90" alt="Academia com equipamentos de treino" />
        <div className="hero-overlay"/>
        <div className="hero-content"><div className="eyebrow"><span/> EQUIPAMENTO PARA QUEM NÃO PARA</div><h1>SUA FORÇA.<br/><em>SEU JOGO.</em></h1><p>Equipamentos e acessórios para quem transforma esforço em evolução. Encontre o que acompanha você em cada conquista.</p><button className="primary-btn" onClick={scrollProducts}>EXPLORE A COLEÇÃO <ArrowUpRight size={18}/></button><div className="hero-foot"><span>01 — PERFORMANCE</span><span>DESAFIE SEU LIMITE <ArrowDownRight size={14}/></span></div></div>
        <div className="hero-side">MOVE WITH PURPOSE · PULSE SPORT · MOVE WITH PURPOSE ·</div>
      </section>
      <section className="benefits" aria-label="Benefícios"><div><ArrowUpRight/><span><b>FEITO PARA EVOLUIR</b><small>Produtos para sua rotina ativa</small></span></div><div><ShieldCheck/><span><b>COMPRA SEGURA</b><small>Seus dados protegidos</small></span></div><div><PackageCheck/><span><b>ENVIO CUIDADOSO</b><small>Seu pedido bem preparado</small></span></div><div><Headphones/><span><b>SUPORTE PRÓXIMO</b><small>Estamos aqui para ajudar</small></span></div></section>
      <section className="categories section-wrap" id="categorias"><div className="section-head"><div><span className="eyebrow lime">ENCONTRE SEU PRÓXIMO NÍVEL</span><h2>ESCOLHA SEU <em>MOVIMENTO.</em></h2></div><p>O equipamento certo muda<br/>a forma como você chega lá.</p></div><div className="category-grid">
        <button className="category-card category-training" onClick={()=>{setCategory("Treino");scrollProducts()}}><img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=85" alt="Treino de força"/><span className="category-index">01 / TREINO</span><span className="category-title">FORÇA EM<br/>MOVIMENTO <ArrowUpRight/></span></button>
        <button className="category-card category-running" onClick={()=>{setCategory("Corrida");scrollProducts()}}><img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=85" alt="Pessoa correndo"/><span className="category-index">02 / CORRIDA</span><span className="category-title">VÁ ALÉM<br/>DA LINHA <ArrowUpRight/></span></button>
        <button className="category-card category-accessories" onClick={()=>{setCategory("Acessórios");scrollProducts()}}><img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=85" alt="Acessórios esportivos e treino"/><span className="category-index">03 / ACESSÓRIOS</span><span className="category-title">DETALHES QUE<br/>FAZEM A DIFERENÇA <ArrowUpRight/></span></button>
      </div></section>
      <section className="products-section section-wrap" id="produtos"><div className="section-head products-head"><div><span className="eyebrow lime">SELECIONADOS PARA VOCÊ</span><h2>OS FAVORITOS <em>DA PULSE.</em></h2></div><span className="product-count">{filtered.length.toString().padStart(2,"0")} PRODUTOS</span></div><div className="filters">{["Todos","Treino","Corrida","Acessórios"].map(c=><button key={c} className={category===c?"filter active":"filter"} onClick={()=>setCategory(c)}>{c}<span>{c==="Todos"?"06":String(products.filter(p=>p.category===c).length).padStart(2,"0")}</span></button>)}</div><div className="product-grid">{filtered.map((p,i)=><article className="product-card" key={p.id}><div className={"product-photo "+p.tone}><img src={p.image} alt={p.name} loading="lazy"/>{p.tag&&<span className="product-tag">{p.tag}</span>}<button className={"heart-btn "+(liked.includes(p.id)?"liked":"")} aria-label="Favoritar produto" onClick={()=>setLiked(prev=>prev.includes(p.id)?prev.filter(x=>x!==p.id):[...prev,p.id])}><Heart size={17} fill={liked.includes(p.id)?"currentColor":"none"}/></button><button className="quick-add" onClick={()=>add(p)}><Plus size={16}/> ADICIONAR À SACOLA</button></div><div className="product-info"><span>{p.category.toUpperCase()}</span><h3>{p.name}</h3><div className="price-row"><b>{money(p.price)}</b>{p.oldPrice&&<del>{money(p.oldPrice)}</del>}</div></div></article>)}</div>{filtered.length===0&&<div className="empty-state">Nenhum produto encontrado. Tente outra busca.</div>}<div className="all-products"><button className="outline-btn" onClick={()=>{setCategory("Todos");setQuery("")}}>VER TODOS OS PRODUTOS <ArrowRight size={16}/></button></div></section>
      <section className="manifesto" id="sobre"><img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=85" alt="Espaço de treino" loading="lazy"/><div className="manifesto-shade"/><div className="manifesto-content"><span className="eyebrow lime">NÃO É SÓ SOBRE CHEGAR.</span><h2>É SOBRE QUEM<br/>VOCÊ SE <em>TORNA.</em></h2><p>Disciplina no processo. Presença em cada movimento. A próxima versão de você começa na próxima escolha.</p><button className="primary-btn" onClick={scrollProducts}>ENCONTRE SEU EQUIPAMENTO <ArrowUpRight size={18}/></button></div><span className="manifesto-stamp">P / S<br/><small>EST. 2026</small></span></section>
      <section className="newsletter section-wrap"><div><span className="eyebrow lime">ENTRE PARA O MOVIMENTO</span><h2>MAIS FOCO.<br/><em>MENOS DESCULPAS.</em></h2><p>Receba novidades, lançamentos e inspiração para seguir evoluindo.</p></div><form onSubmit={e=>{e.preventDefault();setNotice("Cadastro demonstrativo recebido. Obrigado!");setEmail("");window.setTimeout(()=>setNotice(""),3000)}}><label htmlFor="email">SEU MELHOR E-MAIL</label><div className="email-field"><input id="email" type="email" required placeholder="voce@email.com" value={email} onChange={e=>setEmail(e.target.value)}/><button aria-label="Cadastrar e-mail"><ArrowRight/></button></div><small>Ao se cadastrar, você concorda em receber novidades da PULSE SPORT.</small></form></section>
    </main>
    <footer className="footer"><div className="footer-top"><a className="brand" href="#inicio"><span className="brand-mark"><Zap size={20} fill="currentColor"/></span><span>PULSE<span className="brand-light">SPORT</span><small>MOVE WITH PURPOSE</small></span></a><p>Feito para quem escolhe evoluir.<br/>Um movimento de cada vez.</p><a className="back-top" href="#inicio">VOLTAR AO TOPO <ArrowUpRight size={15}/></a></div><div className="footer-bottom"><span>© 2026 PULSE SPORT. TODOS OS DIREITOS RESERVADOS.</span><span>PERFORMANCE COM PROPÓSITO.</span><span>LOJA DEMONSTRATIVA</span></div></footer>
    {notice&&<div className="toast"><Check size={17}/>{notice}</div>}
    {cartOpen&&<div className="drawer-backdrop" onClick={()=>setCartOpen(false)}><aside className="cart-drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><span className="eyebrow lime">SUA SELEÇÃO</span><h2>SACOLA <em>({count})</em></h2></div><button className="icon-btn" onClick={()=>setCartOpen(false)} aria-label="Fechar sacola"><X/></button></div>{cart.length===0?<div className="cart-empty"><ShoppingBag size={34}/><h3>Sua sacola está vazia.</h3><p>Seu próximo nível está esperando por você.</p><button className="primary-btn" onClick={()=>setCartOpen(false)}>CONTINUAR COMPRANDO</button></div>:<><div className="cart-items">{cart.map(i=><div className="cart-item" key={i.id}><img src={i.image} alt={i.name}/><div className="cart-item-main"><span>{i.category}</span><h3>{i.name}</h3><b>{money(i.price)}</b><div className="qty-control"><button onClick={()=>changeQty(i.id,-1)} aria-label="Diminuir quantidade"><Minus size={13}/></button><span>{i.qty}</span><button onClick={()=>changeQty(i.id,1)} aria-label="Aumentar quantidade"><Plus size={13}/></button></div></div><button className="remove-item" onClick={()=>setCart(prev=>prev.filter(x=>x.id!==i.id))}>REMOVER</button></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><b>{money(subtotal)}</b></div><small>Frete e pagamento seriam calculados na etapa de checkout.</small><button className="primary-btn checkout-btn" onClick={()=>setNotice("Checkout ainda não configurado nesta demonstração.")}>CONTINUAR PARA PAGAMENTO <ArrowRight size={17}/></button><button className="continue-btn" onClick={()=>setCartOpen(false)}>CONTINUAR COMPRANDO</button></div></>}</aside></div>}
  </div>;
}
createRoot(document.getElementById("root")).render(<App/>);
