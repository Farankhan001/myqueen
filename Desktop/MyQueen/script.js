$(document).ready(function() {
    
    // --- Configuration (Birthday is TODAY!) ---
    const BIRTHDAY_TODAY = "October 8"; 
    
    // Love Notes Data (Simulates server/API response)
    const allWishes = [
        { title: "My Princess Alizayy 👑", text: "You shine brighter than any jewel. The world is a better place because you're in it. You're my destiny. Happy Birthday!", color: "#ff69b4" }, // Hot Pink
        { title: "My Bestie, My Confidante 🫂", text: "Thank you for the laughter, the adventures, and for just being you. The best part of my day is always talking to you. Happy Birthday, Best Friend!", color: "#34d399" }, // Emerald Green
        { title: "My Queen, My Everything ❤️", text: "You rule my heart completely. Your strength inspires me every single day. I'll spend a lifetime making you feel like the royalty you are. Happy Birthday, Queen.", color: "#ef4444" }, // Red
        { title: "My Jaan, My Soul 💫", text: "My heart is full because of you. You are the warmth in my cold days and the music in my silence. My Jaan, I love you more than words can say. Happy Birthday!", color: "#a78bfa" }, // Violet
        { title: "My World, My Future 🌍", text: "You are the center of my universe. Every goal I have includes you. I can't wait to see what amazing things we do this year! Happy Birthday, my love.", color: "#facc15" }, // Amber Yellow
        { title: "My Baby, My Sweetheart 💖", text: "To the cutest, kindest soul I know. You deserve all the cuddles, chocolates, and happiness today. Stay beautiful, inside and out. Happy Birthday!", color: "#f9a8d4" }, // Light Pink
        { title: "Just For You 💕", text: "No note is long enough to express the depth of my love. You are pure magic. Thank you for choosing me. Happy Birthday, Alizayy!", color: "#f87171" } // Rose Red
    ];
    let wishesLoaded = 0;
    const wishesPerLoad = 3;

    // --- Initial Load & Hero Animation ---
    
    // Animate the hero card to fly in
    $("#birthday-card").animate({ opacity: 1, scale: 1 }, 1500, function() {
        // Start the celebration immediately!
        triggerConfetti(100); 
    });


    // --- 1. AJAX & Wish Loading Simulation ---
    const loadWishes = () => {
        // Show a loading indicator if you were using a real API
        
        setTimeout(() => {
            const start = wishesLoaded;
            const end = Math.min(wishesLoaded + wishesPerLoad, allWishes.length);
            let htmlContent = '';

            for (let i = start; i < end; i++) {
                const wish = allWishes[i];
                
                // Note structure with inline style for the border color
                htmlContent += `
                    <div class="wish-note opacity-0" style="border-left: 5px solid ${wish.color};" data-delay="${i * 150}">
                        <h3 class="text-3xl font-extrabold mb-3" style="color: ${wish.color};">${wish.title}</h3>
                        <p class="text-xl font-light text-gray-200">${wish.text}</p>
                    </div>
                `;
            }

            $("#wish-container").append(htmlContent);

            // Animate notes to fade in with a small lift (staggered)
            $("#wish-container").find('.wish-note.opacity-0').each(function(index) {
                 $(this).delay(index * 200).animate({ opacity: 1 }, 800);
            });

            wishesLoaded = end;

        }, 500); // 0.5 second delay for transition feel
    };


    // --- 2. Event Handlers & Transitions ---
    
    $("#start-journey").on("click", function() {
        // Disable button to prevent multiple clicks
        $(this).attr('disabled', true).text('Loading Love...'); 
        
        // 1. Smooth scroll to the wishes section
        $('html, body').animate({
            scrollTop: $("#wishes").offset().top
        }, 1200, function() {
            // 2. Reveal sections with a fade-in effect
            $("#wishes").removeClass('hidden').animate({ opacity: 1 }, 800);
            
            // 3. Load the initial wishes
            loadWishes();
        });
    });


    // --- 3. Confetti/Particle Effect ---
    function triggerConfetti(num) {
        const colors = ['#ff69b4', '#ff007f', '#ffc0cb', '#facc15', '#f87171', '#a78bfa'];
        const numConfetti = num || 50; 
        const container = $("#confetti-container");

        for (let i = 0; i < numConfetti; i++) {
            const size = Math.random() * 8 + 4; // 4px to 12px
            const confetti = $('<div></div>')
                .css({
                    position: 'absolute',
                    width: size + 'px',
                    height: size + 'px',
                    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                    borderRadius: '50%', 
                    left: Math.random() * 100 + 'vw',
                    top: -20 + 'px', 
                    opacity: 1,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    zIndex: 1000 // Ensure it's above everything
                });

            container.append(confetti);

            // Animation for falling and drifting
            confetti.animate({
                top: '100vh',
                left: `+=${(Math.random() - 0.5) * 500}px`, 
                opacity: 0.1
            }, {
                duration: 4000 + Math.random() * 4000, 
                easing: 'linear',
                complete: function() {
                    $(this).remove();
                }
            });
        }
        
        // Keep the celebration going with small bursts
        if (num > 20) {
            setTimeout(() => triggerConfetti(20), 3000); 
        }
    }
});