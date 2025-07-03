document.addEventListener('DOMContentLoaded', function() {
    // Menu hambúrguer para mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação de scroll para revelar elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos que devem aparecer com scroll
    document.querySelectorAll('.quality-card, .story-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Header com efeito de scroll
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Formulário de contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envio do formulário
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simular delay de envio
            setTimeout(() => {
                submitBtn.textContent = 'Enviado!';
                submitBtn.style.background = '#27ae60';
                
                // Reset form
                this.reset();
                
                // Reset button após 3 segundos
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
                
                // Mostrar mensagem de sucesso
                showNotification('História enviada com sucesso! Obrigado por compartilhar.', 'success');
            }, 2000);
        });
    }

    // Função para mostrar notificações
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos da notificação
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#3498db'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 1001;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Mostrar notificação
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover notificação após 5 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Efeito parallax suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }
    });

    // Contador animado para estatísticas
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        }
        
        updateCounter();
    }

    // Animar contadores quando ficarem visíveis
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target.querySelector('h3');
                const text = number.textContent;
                
                if (text.includes('50')) {
                    number.textContent = '0+';
                    animateCounter(number, 50);
                } else if (text.includes('100')) {
                    number.textContent = '0%';
                    setTimeout(() => {
                        let start = 0;
                        function updatePercent() {
                            start += 2;
                            if (start <= 100) {
                                number.textContent = start + '%';
                                requestAnimationFrame(updatePercent);
                            }
                        }
                        updatePercent();
                    }, 500);
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });

    // Easter egg: Konami code
    let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                showNotification('🎉 Easter egg encontrado! Lucas aprovaria essa descoberta!', 'success');
                konamiIndex = 0;
                
                // Adicionar confetti effect
                createConfetti();
            }
        } else {
            konamiIndex = 0;
        }
    });

    function createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'][Math.floor(Math.random() * 5)]};
                top: -10px;
                left: ${Math.random() * 100}vw;
                z-index: 1000;
                pointer-events: none;
                border-radius: 50%;
            `;
            
            document.body.appendChild(confetti);
            
            confetti.animate([
                { transform: 'translateY(0) rotateZ(0deg)', opacity: 1 },
                { transform: `translateY(100vh) rotateZ(720deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.5, 0, 0.5, 1)'
            }).onfinish = () => confetti.remove();
        }
    }

    // Melhorar acessibilidade - foco visível
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('using-keyboard');
    });

    // Lightbox para galeria de fotos - versão simplificada
    function createLightbox() {
        // Verificar se já existe um lightbox
        const existingLightbox = document.querySelector('.lightbox');
        if (existingLightbox) {
            return existingLightbox;
        }
        
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img src="" alt="Foto em tamanho maior">
        `;
        document.body.appendChild(lightbox);
        return lightbox;
    }

    const lightbox = createLightbox();
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    // Função para abrir lightbox
    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Função para fechar lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Adicionar eventos de lightbox para todas as imagens da galeria - versão simplificada
    function addLightboxEvents() {
        const images = document.querySelectorAll('.gallery-item img, .photo-item img');
        
        images.forEach((img) => {
            // Garantir que não há eventos duplicados
            img.removeEventListener('click', handleImageClick);
            img.addEventListener('click', handleImageClick);
            img.style.cursor = 'zoom-in';
        });
    }
    
    // Função para lidar com cliques nas imagens
    function handleImageClick(e) {
        e.preventDefault();
        e.stopPropagation();
        openLightbox(this.src, this.alt);
    }

    // Eventos para fechar lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Fechar lightbox com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Inicializar lightbox - apenas uma vez
    addLightboxEvents();
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Fechar lightbox com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Botão "Ver Mais Fotos" na galeria
    const loadMoreBtn = document.getElementById('load-more-photos');
    if (loadMoreBtn) {
        const additionalPhotos = [
            // Fotos do WhatsApp já existentes
            { src: 'images/IMG-20230614-WA0003.jpg', caption: 'Turminha fera' },
            { src: 'images/IMG-20230719-WA0081.jpg', caption: 'Eita lugar quente' },
            { src: 'images/IMG-20231004-WA0000.jpg', caption: 'Primeiro pedaço vai ...' },
            { src: 'images/IMG-20240403-WA0001.jpg', caption: 'Muita, muita brincadeira' },
            { src: 'images/IMG-20240727-WA0061.jpg', caption: 'Patinação' },
            { src: 'images/IMG-20250320-WA0006.jpg', caption: 'Liderança mirim' },
            
            // Novas fotos adicionadas
            { src: 'images/1000032618.jpg', caption: 'Na lancha' },
            { src: 'images/1000033456.jpg', caption: 'Enrico e nóix' },
            { src: 'images/1000050379.jpg', caption: 'Charlotita querida' },
            { src: 'images/1000075709.jpg', caption: 'Vai curintia !!!' },
            { src: 'images/1000075781.jpg', caption: 'Boca cheia' },
            { src: 'images/1000076866.jpg', caption: 'Um sonho realizado' },
            { src: 'images/20221219_135358.jpg', caption: 'Cavalo na praia?' },
            { src: 'images/20221224_215155.jpg', caption: 'Ah como amo !!!' },
            { src: 'images/20221224_215714.jpg', caption: 'Elas e eu' },
            { src: 'images/20221231_213416.jpg', caption: '+Elas e eu' },
            { src: 'images/20230101_014434.jpg', caption: 'Capotei' },
            { src: 'images/20231015_174232.jpg', caption: 'Uruguaiana' },
            { src: 'images/20240204_155908.jpg', caption: 'Aperto bom' },
            { src: 'images/20240622_174115.jpg', caption: '+Aperto bom' },
            { src: 'images/20250420_215559.jpg', caption: 'ELE está vivo' },
            { src: 'images/20250510_100846.jpg', caption: 'Motoca com o papito' },
            { src: 'images/IMG-20231019-WA0069.jpg', caption: 'Universal Studios' },
            { src: 'images/IMG-20231105-WA0014.jpg', caption: 'Amar, Crescer, Aprender' },
            { src: 'images/IMG-20240824-WA0036.jpeg', caption: 'A Isa' },
            { src: 'images/IMG-20250323-WA0009.jpg', caption: '70 do vovô' },
            { src: 'images/IMG-20250411-WA0004.jpg', caption: 'Arteiros' },
            { src: 'images/IMG-20250620-WA0023.jpg', caption: '10 de brigadeiro' },
            { src: 'images/IMG_20230611_133003_580.jpg', caption: 'Explorando' },
            { src: 'images/IMG_20231008_222817_755.jpg', caption: 'Trunfo' },
            { src: 'images/Screenshot_20230420-231710_Instagram~2.jpg', caption: 'Glória a Deus !!!' }
        ];

        let photosLoadedCount = 0; // Contador de fotos já carregadas
        const photosPerLoad = 6; // Número de fotos a carregar por vez

        loadMoreBtn.addEventListener('click', function() {
            const galleryGrid = document.querySelector('.gallery-grid');
            
            // Calcular quais fotos carregar nesta iteração
            const startIndex = photosLoadedCount;
            const endIndex = Math.min(startIndex + photosPerLoad, additionalPhotos.length);
            const photosToLoad = additionalPhotos.slice(startIndex, endIndex);
            
            // Adicionar as fotos selecionadas
            photosToLoad.forEach((photo, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <img src="${photo.src}" alt="${photo.caption}" loading="lazy">
                    <div class="gallery-overlay">
                        <div class="gallery-caption">${photo.caption}</div>
                    </div>
                `;
                
                // Adicionar animação de entrada
                galleryItem.style.opacity = '0';
                galleryItem.style.transform = 'translateY(50px)';
                galleryGrid.appendChild(galleryItem);
                
                // Animar entrada com delay progressivo
                setTimeout(() => {
                    galleryItem.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    galleryItem.style.opacity = '1';
                    galleryItem.style.transform = 'translateY(0)';
                }, 100 + (index * 100)); // Delay progressivo para cada foto

                // Adicionar evento de lightbox para nova imagem
                const newImg = galleryItem.querySelector('img');
                newImg.addEventListener('click', handleImageClick);
                newImg.style.cursor = 'zoom-in';
            });

            // Atualizar contador
            photosLoadedCount += photosToLoad.length;
            
            // Verificar se ainda há mais fotos para carregar
            if (photosLoadedCount >= additionalPhotos.length) {
                // Esconder botão se todas as fotos foram carregadas
                this.style.display = 'none';
                showNotification('Todas as fotos foram carregadas! 📸✨', 'success');
            } else {
                // Atualizar texto do botão para mostrar progresso
                const remaining = additionalPhotos.length - photosLoadedCount;
                this.textContent = `Ver Mais Fotos (${remaining} restantes)`;
                showNotification(`${photosToLoad.length} fotos adicionadas! 📸`, 'success');
            }
        });
    }

    // Lazy loading aprimorado para imagens (apenas para imagens com loading="lazy")
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });

        // Observar apenas imagens com data-src (lazy loading)
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Animação especial para a foto de perfil no hero
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // Efeito de hover nas fotos da galeria principal
    document.querySelectorAll('.photo-item, .gallery-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // Animação das seções ao aparecerem na tela (simplificada)
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Não desobs ervar para permitir re-animação se necessário
            }
        });
    }, {
        threshold: 0.05, // Reduzido para ativar mais cedo
        rootMargin: '50px 0px -20px 0px' // Margem mais generosa
    });

    // Observar seções, mas garantir que sejam visíveis por padrão
    document.querySelectorAll('.about, .qualities, .stories, .gallery, .contact').forEach(section => {
        // Tornar visível imediatamente
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        section.classList.add('visible');
        
        // Ainda observar para futuras animações
        sectionObserver.observe(section);
    });

    // Contador de fotos na galeria
    const gallerySection = document.querySelector('.gallery');
    if (gallerySection) {
        const updatePhotoCount = () => {
            const photoCount = document.querySelectorAll('.gallery-item').length;
            gallerySection.setAttribute('data-photo-count', photoCount);
        };
        
        updatePhotoCount();
        
        // Atualizar contador quando mais fotos forem carregadas
        const loadMoreBtn = document.getElementById('load-more-photos');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                setTimeout(updatePhotoCount, 500);
            });
        }
    }
});
