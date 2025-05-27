(function () {
    let preTag = document.getElementById('donut')

    let A = 1;
    let B = 1;
    let R1 = 1;
    let R2 = 2;
    let K1 = 150;
    let K2 = 5;

    // function to render ASCII frame
    function renderAsciiFrame() {
        let b = [];
        let z = [];

        let width = 280;
        let height = 160;

        A += 0.07;
        B += 0.03;
        let cA = Math.cos(A);
        let sA = Math.sin(A);
        let cB = Math.cos(B);
        let sB = Math.sin(B);

        // Initialize array with default angles
        for (let k = 0; k < width * height; k++) {
            // Set default ascii char
            b[k] = k % width == width - 1 ? '\n' : ' ';
            // Set default depth
            z[k] = 0;
        }

        // Generate the ascii frame
        for (let j = 0; j < 6.28; j+= 0.07) {
            let ct = Math.cos(j);
            let st = Math.sin(j);

            for (let i = 0; i < 6.28; i += 0.02) {
                let sp = Math.sin(i);
                let cp = Math.cos(i);
                let h = ct + 2
                // Distance calculation
                let D = 1 / (sp * h * sA + st * cA + 5);
                // Temporary variable
                let t = sp * h * cA - st * sA;

            // Calculate cordfinates of ascii char
            let x = Math.floor(width / 2 + (width / 4) * D * (cp * h * cB - t * sB));
            let y = Math.floor(height / 2 + (height / 4) * D * (cp * h * sB + t * cB));

            // Calculate the index in the array
            let o = x + width * y;
            // Calculate the ascii char index
            let N = Math.floor(8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
            
            // Update ascii char and depth if condition are met
            if (y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
                z[o] = D;
                b[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0];
            }
            }
        }

        // Update html element with the ascii frame
        preTag.innerHTML = b.join('');
    }

    // Function to start the animation
    function startAsciiAnimation() {
        // Start it by calling renderAsciiAnimation every 50ms
        window.asciiIntervalId = setInterval(renderAsciiFrame, 50);
    }

    renderAsciiFrame(); // Initial render
    // Add event listener to start animation when the page loads
    if(document.all) {
        // For older browsers
        window.attachEvent('onload', startAsciiAnimation);
    } else {
        // For modern browsers
        window.addEventListener('load', startAsciiAnimation);
    }

    // Add event listener to update ascii frame on resize
    window.addEventListener('resize', renderAsciiFrame);
})();