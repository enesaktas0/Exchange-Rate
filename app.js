const apiKey = "c7bbd967a313aa39e87e7826";
const website = "https://v6.exchangerate-api.com/v6/"+ apiKey +"/codes";

const currency1List = document.getElementById('currency-one');
const currency2List = document.getElementById('currency-two');

const currency1Input = document.querySelector('.currency-one');
const currency2Input = document.querySelector('.currency-two');
const amout = document.querySelector('.amount');

const cevir = document.querySelector('.change');

const amountInfo = document.querySelector('.amount-info');
const resultTable = document.querySelector('.result-table');



fetch(website)
    .then(response => response.json())
    .then((reponse) => {
        let i = 0;
        for(let r of reponse.supported_codes){
            let datalist = `
                <option value="${r[0]}">${r[1]}</option>
            `;
            currency1List.innerHTML += datalist;
            currency2List.innerHTML += datalist;

        };
    })
        .catch(error => console.log('error', error));



cevir.addEventListener('click', () => {;
    if(amout.value == ''){
        let alert = `
            <div class="alert alert-danger" role="alert">
                Eksik Bilgi Girdiniz.
            </div>
        `
        document.querySelector('.col-6').insertAdjacentHTML('afterbegin',alert);
        setTimeout(() => {
           document.querySelector('.alert').remove();
        },3000);
    }
    const website2 = "https://v6.exchangerate-api.com/v6/"+ apiKey +"/latest/"+currency1Input.value;
    fetch(website2)
    .then(response => response.json())
    .then((reponse) => {
       let rate = reponse.conversion_rates[currency2Input.value];
       calculate(rate,reponse);
    })
        .catch(error => console.log('error', error));
});
const calculate = (rate,response) => {
    document.querySelector('.div').innerHTML = '';
    let result = rate * amout.value;
    document.querySelector('.div').innerHTML = `
    <div class="form-control border border-success mt-3 text-center result-table" style="height: 60px;font-size: 30px;">
        <div class="amount-info">${amout.value} ${currency1Input.value} = ${result.toFixed(2)} ${currency2Input.value}</div>
    </div>
     `;

    for(let r in response.conversion_rates){
        if (response.conversion_rates.hasOwnProperty(r)) {
            const website2 = "https://v6.exchangerate-api.com/v6/"+ apiKey +"/latest/"+currency1Input.value;
            fetch(website2)
                .then(response => response.json())
                .then((reponse) => {
                let rate = reponse.conversion_rates[r];
                console.log(r+" : "+rate);
                calculateOthers(r,rate);
                })
                    .catch(error => console.log('error', error));
        }
    }
} 

const calculateOthers = (r,rate) => {
    let result = rate * amout.value;
    document.querySelector('.div').innerHTML += `
        <div class="form-control border border-danger mt-3 text-center result-table" style="height: 60px;font-size: 30px;">
            <div class="amount-info">${amout.value} ${currency1Input.value} = ${result.toFixed(2)} ${r}</div>
        </div>
     `;
}