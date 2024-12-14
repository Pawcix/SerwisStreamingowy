const year = document.querySelector('#year')

const handleYear = () => {
    const data = new Date().getFullYear()
    year.innerText = data
}

handleYear()