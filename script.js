document.addEventListener('DOMContentLoaded', () => {
    
    // FAQ Accordion (If exists)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => { if (otherItem !== item) otherItem.classList.remove('active'); });
            item.classList.toggle('active');
        });
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileBtn.classList.toggle('open');
        });
    }

    // Scroll to Top
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) scrollToTopBtn.classList.add('visible');
            else scrollToTopBtn.classList.remove('visible');
        });
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ================= BLOG LOGIC ================= */
    const blogData = [
        { id: 1, title: "Exploring the Hidden Temples of Kyoto", category: "Culture", date: "Jan 15, 2024", url: "blog-detail-1.html", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop" },
        { id: 2, title: "10 Best Beaches in South East Asia", category: "Beach", date: "Jan 20, 2024", url: "blog-detail-2.html", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" },
        { id: 3, title: "A Backpacker's Guide to the Swiss Alps", category: "Adventure", date: "Jan 25, 2024", url: "blog-detail-3.html", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop" },
        { id: 4, title: "Modern Architecture in Singapore", category: "City", date: "Feb 01, 2024", url: "#", img: "https://images.unsplash.com/photo-1525596662741-e94ff9f26de1?q=80&w=2070&auto=format&fit=crop" },
        { id: 5, title: "The Culinary Wonders of Lyon, France", category: "Culture", date: "Feb 05, 2024", url: "#", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop" },
        { id: 6, title: "Surfing at Gold Coast, Australia", category: "Adventure", date: "Feb 10, 2024", url: "#", img: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2070&auto=format&fit=crop" },
        { id: 7, title: "Night Market Vibes in Taipei", category: "City", date: "Feb 15, 2024", url: "#", img: "https://images.unsplash.com/photo-1534329535363-57c9634e3515?q=80&w=2070&auto=format&fit=crop" },
        { id: 8, title: "Sustainable Travel in Costa Rica", category: "Nature", date: "Feb 20, 2024", url: "#", img: "https://images.unsplash.com/photo-1518349619113-03114f06ac3a?q=80&w=2070&auto=format&fit=crop" },
        { id: 9, title: "The Golden Hour in desert Dubai", category: "Adventure", date: "Feb 25, 2024", url: "#", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop" }
    ];

    let currentPage = 1;
    let filteredData = [...blogData];
    const postsPerPage = 6;

    const blogGrid = document.getElementById('blogGrid');
    const blogSearch = document.getElementById('blogSearch');
    const pageNumbers = document.getElementById('pageNumbers');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    function renderBlogPosts() {
        if (!blogGrid) return;
        
        blogGrid.innerHTML = '';
        const start = (currentPage - 1) * postsPerPage;
        const end = start + postsPerPage;
        const pagePosts = filteredData.slice(start, end);

        if (pagePosts.length === 0) {
            blogGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No stories found matching your search.</p>`;
            return;
        }

        pagePosts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'blog-card';
            card.innerHTML = `
                <div class="blog-img-wrapper" onclick="window.location.href='${post.url}'">
                    <img src="${post.img}" alt="${post.title}">
                    <span class="blog-tag" style="position: absolute; top: 15px; right: 15px; background: var(--accent-color); color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; z-index: 2;">${post.category}</span>
                    <span class="blog-date">${post.date}</span>
                </div>
                <h3 onclick="window.location.href='${post.url}'">${post.title}</h3>
                <a href="${post.url}" class="read-more">Read More ↗</a>
            `;
            blogGrid.appendChild(card);
        });

        updatePagination();
    }

    function updatePagination() {
        if (!pageNumbers) return;
        
        const totalPages = Math.ceil(filteredData.length / postsPerPage);
        pageNumbers.innerHTML = '';

        if (totalPages <= 1) {
            pageNumbers.style.display = 'none';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        } else {
            pageNumbers.style.display = 'flex';
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            btn.innerText = i;
            btn.addEventListener('click', () => {
                currentPage = i;
                renderBlogPosts();
                window.scrollTo({ top: 400, behavior: 'smooth' });
            });
            pageNumbers.appendChild(btn);
        }

        prevBtn.classList.toggle('disabled', currentPage === 1);
        nextBtn.classList.toggle('disabled', currentPage === totalPages);
    }

    if (blogSearch) {
        blogSearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            filteredData = blogData.filter(post => 
                post.title.toLowerCase().includes(term) || 
                post.category.toLowerCase().includes(term)
            );
            currentPage = 1;
            renderBlogPosts();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderBlogPosts();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredData.length / postsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderBlogPosts();
            }
        });
    }

    /* ================= BLOG DETAIL LOGIC ================= */
    const tocHeader = document.querySelector('.toc-header');
    const tocBox = document.querySelector('.toc-box');
    const tocList = document.querySelector('.toc-list');
    const articleBody = document.querySelector('.article-body');

    if (tocHeader && tocBox) {
        tocHeader.addEventListener('click', () => {
            tocBox.classList.toggle('closed');
        });
    }

    if (articleBody && tocList) {
        const headings = articleBody.querySelectorAll('h2, h3');
        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;
            
            const li = document.createElement('li');
            li.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-h3' : 'toc-h2';
            
            const a = document.createElement('a');
            a.href = `#${id}`;
            a.textContent = heading.textContent;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth' });
            });
            
            li.appendChild(a);
            tocList.appendChild(li);
        });
    }

    // FAQ Accordion (Universal)
    const allFaqs = document.querySelectorAll('.faq-item');
    allFaqs.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        }
    });

    /* ================= SHARE LOGIC ================= */
    const shareBtns = document.querySelectorAll('.share-btn');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            if (btn.classList.contains('share-fb')) {
                btn.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            } else if (btn.classList.contains('share-wa')) {
                btn.href = `https://api.whatsapp.com/send?text=${title}%20${url}`;
            } else if (btn.classList.contains('share-tw')) {
                btn.href = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
            }
        });
    });

    renderBlogPosts();
});
