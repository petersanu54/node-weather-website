const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

//console.log(val)
//console.log(weatherForm)
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const loct = search.value
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    //console.log(location)
    fetch('http://localhost:3000/weather?address='+loct).then((response)=>{
        response.json().then((data)=>{
            console.log(data)
            // if (data.error){
            //     // console.log(data.error)
            //     messageOne.textContent = data.error
            // }else{
            //     messageOne.textContent = data.current.temperature
            //     messageTwo.textContent = data.location.name
            // }
        })
    })
})