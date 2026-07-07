document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ヘッダーのスクロール変化
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. ハンバーガーメニュー
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        nav.classList.toggle('mobile-active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            nav.classList.remove('mobile-active');
        });
    });

    // 3. スクロールフェードイン (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));

    // 4. 残り16品のメニュー動的生成
    const dummyMenus = [
        { name: "季節の天ぷら盛り合わせ", price: "850円", desc: "旬の地元野菜をサクサクに揚げました。", img: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { name: "しじみ汁と割子そば", price: "1,100円", desc: "宍道湖産しじみの旨味が詰まったお汁とともに。", img: "https://images.unsplash.com/photo-1583225214476-857e4e16447e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { name: "鴨南蛮そば", price: "1,300円", desc: "旨味たっぷりの鴨肉とネギの相性が抜群です。", img: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { name: "とろろそば", price: "950円", desc: "粘り強い大和芋を使用。のどごし滑らか。", img: "https://images.unsplash.com/photo-1512776856094-1188339598c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { name: "おろしそば", price: "900円", desc: "さっぱりとした辛味大根がそばの香りを引き立てます。", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { name: "山菜そば", price: "850円", desc: "地元の山で採れた新鮮な山菜をたっぷり乗せて。", img: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { name: "特選刺身定食", price: "1,500円", desc: "日本海の鮮度抜群の刺身盛り合わせ。", img: "https://images.unsplash.com/photo-1583225214476-857e4e16447e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { name: "煮魚定食", price: "1,300円", desc: "浜田港水揚げの魚をふっくらと煮付けました。", img: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { name: "だし巻き卵", price: "600円", desc: "そばつゆを隠し味に使ったふんわり卵焼き。", img: "https://images.unsplash.com/photo-1512776856094-1188339598c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { name: "そばがき", price: "700円", desc: "そば粉本来の風味と甘み、もっちり食感。", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { name: "季節の炊き込みご飯", price: "400円", desc: "旬の味覚を詰め込んで丁寧に炊き上げました。", img: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { name: "白エビの唐揚げ", price: "750円", desc: "サクサク食感と上品な甘みがたまらない一品。", img: "https://images.unsplash.com/photo-1583225214476-857e4e16447e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { name: "おにぎり（梅・鮭・昆布）", price: "各200円", desc: "ふっくら炊き上げた地元米を使用。", img: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { name: "自家製漬物盛り合わせ", price: "450円", desc: "お食事の箸休めにぴったりの自家製浅漬け。", img: "https://images.unsplash.com/photo-1512776856094-1188339598c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { name: "出雲ぜんざい", price: "600円", desc: "縁結びの地の甘味。食後におすすめです。", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { name: "抹茶アイス", price: "400円", desc: "濃厚な抹茶の香りとスッキリとした甘さ。", img: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
    ];

    const menuGrid = document.getElementById('menu-grid');
    
    dummyMenus.forEach(menu => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = `
            <div class="menu-img-wrapper">
                <img src="${menu.img}" alt="${menu.name}" loading="lazy">
            </div>
            <div class="menu-info">
                <h5 class="menu-name">${menu.name}</h5>
                <p class="menu-price">${menu.price}</p>
                <p class="menu-desc">${menu.desc}</p>
            </div>
        `;
        menuGrid.appendChild(card);
    });


    // 5. 店内紹介スライダー (5秒ごとにクロスフェード)
    const slides = document.querySelectorAll('.interior-slider .slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5秒

    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, slideInterval);


    // 6. FAQアコーディオン
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-q');
        questionBtn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // 全て閉じる
            faqItems.forEach(i => {
                i.classList.remove('open');
                i.querySelector('.faq-a').style.maxHeight = null;
            });

            // クリックされたものが開いていなかったら開く
            if (!isOpen) {
                item.classList.add('open');
                const answer = item.querySelector('.faq-a');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

});
