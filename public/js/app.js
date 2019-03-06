console.log('Clinet side javascript file is loaded!');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then(res=>{
    res.json().then((data)=>{
        if(data.error){
            messageOne.textContent = date.error
            return
        }
        messageOne.textContent = data.location
        messageTwo.textContent = `${data.forecast.daily} ${data.forecast.temperature} `
    }).catch(err=>{
        messageOne.textContent = error
    })
})


    
})