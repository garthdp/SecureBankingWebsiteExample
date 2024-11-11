let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')


//darkmode activator and disabler
if(darkmode === "active") enableDarkmode()

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    if(darkmode !== "active"){
        enableDarkmode()
    }
    else{
        disableDarkmode()
    }
})

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}
const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}