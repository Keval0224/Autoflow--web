document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // 2. Typing Animation for Hero Terminal
    const heroTerminal = document.getElementById('hero-terminal');
    if (heroTerminal) {
        const commands = [
            { text: 'autoflow init', type: 'input', delay: 800 },
            { text: '✔ Framework detected: Next.js + React', type: 'output', delay: 400 },
            { text: '✔ Configuration generated gracefully', type: 'output', delay: 400 },
            { text: '<br>', type: 'html', delay: 200 },
            { text: 'autoflow deploy --production', type: 'input', delay: 600 },
            { text: '⠙ Building optimized application...', type: 'output', delay: 1200 },
            { text: '✔ Compiled static assets efficiently', type: 'output', delay: 400 },
            { text: '✔ SSL certificates bound securely', type: 'output', delay: 300 },
            { text: '✔ Atomic traffic swap completed', type: 'output', delay: 300 },
            { text: '🚀 Deployed to production at https://myapp.com', type: 'success', delay: 0 }
        ];

        let index = 0;

        function renderNextCommand() {
            if (index >= commands.length) return;
            const cmd = commands[index];
            const line = document.createElement('span');
            line.className = 'terminal-line';

            if (cmd.type === 'input') {
                const prompt = document.createElement('span');
                prompt.className = 'terminal-prompt';
                line.appendChild(prompt);
                
                const typedText = document.createElement('span');
                typedText.className = 'terminal-type';
                line.appendChild(typedText);
                heroTerminal.appendChild(line);

                let charIndex = 0;
                const typingInterval = setInterval(() => {
                    typedText.textContent += cmd.text.charAt(charIndex);
                    charIndex++;
                    if (charIndex >= cmd.text.length) {
                        clearInterval(typingInterval);
                        typedText.classList.remove('terminal-type');
                        index++;
                        setTimeout(renderNextCommand, cmd.delay);
                    }
                }, 50); // Typing speed
            } else if (cmd.type === 'output') {
                line.textContent = cmd.text;
                heroTerminal.appendChild(line);
                index++;
                setTimeout(renderNextCommand, cmd.delay);
            } else if (cmd.type === 'success') {
                line.textContent = cmd.text;
                line.className = 'terminal-line terminal-success';
                heroTerminal.appendChild(line);
                index++;
                setTimeout(renderNextCommand, cmd.delay);
            } else if (cmd.type === 'html') {
                line.innerHTML = cmd.text;
                heroTerminal.appendChild(line);
                index++;
                setTimeout(renderNextCommand, cmd.delay);
            }
        }
        
        // Start animation after a short delay
        setTimeout(renderNextCommand, 500);
    }

    // 3. Smooth Scrolling for In-Page Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Docs Sidebar Highlight Active Link
    const docsSidebar = document.querySelector('.docs-sidebar');
    if (docsSidebar) {
        const sections = document.querySelectorAll('.docs-content h2');
        const navLinks = document.querySelectorAll('.docs-sidebar a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === `#${current}`) {
                    a.classList.add('active');
                }
            });
        });
    }

    // 5. Intersection Observer for Fade-up Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ensure the animation class remains applied initially on load
                // The CSS opacity handles the default state
                entry.target.style.animationPlayState = 'running';
                
                // If it doesn't already have an animation delay class applied via HTML,
                // we could dynamically add it, but since they are in HTML, we just trigger it.
                // Resetting animation to trigger the fade-up
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-fade-up').forEach(el => {
        // Pausing inline is not required since CSS animations run on load,
        // but to re-trigger or only play when observed, we need to toggle a class.
        // For simplicity, let's just add an 'in-view' class instead, or adjust CSS.
        // Actually, CSS keyframes will trigger once parsed, so for perfect scroll behavior:
        
        el.style.opacity = '0'; // force hide initially
        observer.observe(el);
    });
    
    // We update the observer logic to use a simple class addition
    const modernObserver = new IntersectionObserver((entries, modernObserver) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.style.animation = entry.target.style.animation; // restart animation logic
                entry.target.style.opacity = ''; // let keyframes take over
                modernObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-fade-up').forEach(el => {
        modernObserver.observe(el);
    });
});

// 6. Copy NPM Command Function
window.copyNpmCmd = function() {
    const code = document.getElementById('npm-code').innerText;
    navigator.clipboard.writeText(code).then(() => {
        const copyBtn = document.querySelector('.btn-copy');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i data-feather="check"></i> Copied';
        if (typeof feather !== 'undefined') feather.replace();
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            if (typeof feather !== 'undefined') feather.replace();
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
// 7. Back to Top Button Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Create button element
    const backBtn = document.createElement('a');
    backBtn.href = "#";
    backBtn.className = 'back-to-top';
    backBtn.setAttribute('title', 'Back to Top');
    backBtn.innerHTML = '<i data-feather="arrow-up"></i>';
    document.body.appendChild(backBtn);
    
    // Refresh icons for the new button
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // Show/Hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backBtn.classList.add('show');
        } else {
            backBtn.classList.remove('show');
        }
    });

    // Smooth scroll to top on click
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
