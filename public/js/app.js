console.log('javascript is working')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const degree = '\u00B0'+'C';
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent = ''
    messageTwo.textContent = ''
    messageThree.textContent = ''

    //console.log(location)

    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
           if(data.error){
               messageOne.textContent =  data.error
           }
           else{
            messageOne.textContent = data.placename
            messageTwo.textContent = data.temperature
            messageTwo.append(degree)
            messageThree.textContent = data.weather
           }
        })
    })
    
})