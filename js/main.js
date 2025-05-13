/**
 * CyberWadaag - Somali Software & Cybersecurity Company
 * Main JavaScript File
 */

// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Handle loader
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('hidden');
                setTimeout(function() {
                    loader.style.display = 'none';
                }, 500);
            }, 1500); // Adjust the time as needed
        });
    }

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Add scrolled class to navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Interactive Somalia Map with Region Labels
    const somaliaMapObject = document.getElementById('somalia-map-object');
    const regionInfo = document.querySelector('.region-info');
    
    if (somaliaMapObject && regionInfo) {
        somaliaMapObject.addEventListener('load', function() {
            const svgDoc = somaliaMapObject.contentDocument;
            const svgRoot = svgDoc.querySelector('svg');
            const regions = svgDoc.querySelectorAll('[id^="SO"]');
            
            // تعديل viewBox لتصغير المحتوى (زوم للخلف)
            if (svgRoot) {
                // الحصول على أبعاد الـ SVG الأصلية
                const originalViewBox = svgRoot.getAttribute('viewBox');
                if (originalViewBox) {
                    const viewBoxValues = originalViewBox.split(' ');
                    // توسيع نطاق العرض للتصغير (زوم للخلف بنسبة 30%)
                    const x = parseFloat(viewBoxValues[0]) - parseFloat(viewBoxValues[2]) * 0.15;
                    const y = parseFloat(viewBoxValues[1]) - parseFloat(viewBoxValues[3]) * 0.15;
                    const width = parseFloat(viewBoxValues[2]) * 1.3;
                    const height = parseFloat(viewBoxValues[3]) * 1.3;
                    svgRoot.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
                } else {
                    // إذا لم يكن هناك viewBox أصلي، قم بإنشاء واحد
                    const width = svgRoot.getAttribute('width') || 600;
                    const height = svgRoot.getAttribute('height') || 600;
                    svgRoot.setAttribute('viewBox', `0 0 ${width} ${height}`);
                    svgRoot.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                }
            }
            
            regions.forEach(region => {
                region.addEventListener('mouseover', function() {
                    const regionName = this.getAttribute('name');
                    if (regionName) {
                        regionInfo.innerHTML = `<p>Region: <span class="region-name">${regionName}</span></p>`;
                    }
                });
                
                region.addEventListener('mouseout', function() {
                    regionInfo.innerHTML = '<p>Interactive map of Somalia - Hover over regions to see their names</p>';
                });
                
                // Add styling to regions
                region.setAttribute('fill', '#1793d1');
                region.setAttribute('fill-opacity', '0.7');
                region.setAttribute('stroke', 'white');
                region.setAttribute('stroke-width', '0.5');
                region.style.transition = 'fill-opacity 0.3s ease';
                
                region.addEventListener('mouseenter', function() {
                    this.setAttribute('fill-opacity', '1');
                    this.style.cursor = 'pointer';
                });
                
                region.addEventListener('mouseleave', function() {
                    this.setAttribute('fill-opacity', '0.7');
                });
            });
        });
    }
    
    // City markers for interactive map
    const cityMarkers = document.querySelectorAll('.city-marker');
    const cityInfo = document.querySelector('.city-info');
    
    if (cityMarkers.length > 0 && cityInfo) {
        // City service data
        const cityServices = {
            'Mogadishu': [
                'Web Design & Development',
                'Mobile App Development',
                'Cybersecurity',
                'Payment Gateway Integration',
                'Software Consulting'
            ],
            'Hargeisa': [
                'Web Design & Development',
                'Mobile App Development',
                'Software Consulting'
            ],
            'Bosaso': [
                'Web Design & Development',
                'Cybersecurity',
                'Software Consulting'
            ],
            'Galkayo': [
                'Web Design & Development',
                'Mobile App Development'
            ],
            'Kismayo': [
                'Web Design & Development',
                'Payment Gateway Integration'
            ]
        };
        
        cityMarkers.forEach(marker => {
            marker.addEventListener('mouseover', function() {
                const city = this.getAttribute('data-city');
                const services = cityServices[city];
                
                if (city && services) {
                    let servicesList = '';
                    services.forEach(service => {
                        servicesList += `<li>${service}</li>`;
                    });
                    
                    cityInfo.innerHTML = `
                        <h3>${city}</h3>
                        <ul class="city-services">
                            ${servicesList}
                        </ul>
                    `;
                    cityInfo.classList.add('active');
                }
            });
            
            marker.addEventListener('mouseout', function() {
                cityInfo.innerHTML = `
                    <h3>Our Services Across Somalia</h3>
                    <p>Hover over a city to see available services</p>
                `;
            });
        });
    }
    
    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Basic validation example - can be expanded
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;
            
            if (!name.value.trim()) {
                isValid = false;
                highlightField(name);
            } else {
                removeHighlight(name);
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                isValid = false;
                highlightField(email);
            } else {
                removeHighlight(email);
            }
            
            if (!message.value.trim()) {
                isValid = false;
                highlightField(message);
            } else {
                removeHighlight(message);
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    function highlightField(field) {
        field.style.borderColor = 'var(--danger-color)';
    }
    
    function removeHighlight(field) {
        field.style.borderColor = 'var(--border-color)';
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
