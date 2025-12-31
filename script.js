const hero = document.querySelector(".hero")
const heroTitle = hero.querySelectorAll(".hero_title > .ofh > h1") // .ofh corrected

const settings = {
    isEnabled: false,
    count: 1,
    time: 50,
}

const images = [
    "./assets/img1.png",
    "./assets/img2.png",
    "./assets/img3.png",
    "./assets/img4.png",
    "./assets/img5.png",
    "./assets/img6.png",
    "./assets/img7.png",
]

const initHero = () => {
    gsap.set(heroTitle, { x: '-101%' })
    showHero()
}

const showHero = () => {
    gsap.to(heroTitle, {
        duration: 1.75,
        x: 0,
        ease: "expo.inOut",
        stagger: 0.025
    })
}

const preloadImages = () => {
    for (let i = 0; i < images.length; i++) {
        let link = document.createElement('link')
        link.rel = 'preload'
        link.as = "image"
        link.href = images[i]
        document.head.appendChild(link)
    }
}

const calcIndex = (length) => {
    settings.count++;
    if (settings.count == length) settings.count = 0
    return settings.count
}

const animateImages = (e) => {
    const image = document.createElement('img')
    
    // --- SIZE SETTINGS ---
    // Yahan pixel mein size set kiya hai taaki confusion na ho
    const imageSize = 250; // 350px (Adjust this number to make it bigger/smaller)
    
    const countIndex = calcIndex(images.length)
    image.classList.add('hero_media')
    image.setAttribute('src', images[countIndex])

    // Size apply karna
    image.style.width = `${imageSize}px`
    image.style.height = `${imageSize}px` // Square shape ke liye height bhi same

    // --- CENTERING LOGIC ---
    // Image ko mouse ke center mein laane ke liye size ka aadha minus karna padta hai
    image.style.top = (e.pageY - imageSize / 2) + 'px';
    image.style.left = (e.pageX - imageSize / 2) + 'px';

    hero.appendChild(image)

    const randomDeg = Math.floor(Math.random() * 15)

    // Animation Steps
    window.setTimeout(() => {
        image.style.transform = `scale(1) rotate(${randomDeg}deg)`
    }, 50)

    window.setTimeout(() => {
        image.style.opacity = 0
        image.style.filter = "blur(5px)"
        image.style.transform = 'scale(0.25)'
    }, 1500)

    window.setTimeout(() => {
        if(image.parentNode === hero){
            hero.removeChild(image)
        }
    }, 2500)
}

// Event listener
window.addEventListener("mousemove", (e) => {
    if (!settings.isEnabled) {
        settings.isEnabled = true
        
        // Pass event 'e' explicitly
        animateImages(e)

        setTimeout(() => {
            settings.isEnabled = false
        }, settings.time)
    }
})

window.onload = () => {
    preloadImages()
    initHero()
}